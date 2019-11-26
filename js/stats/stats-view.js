import AbstractView from '../view';
import footer from '../footer';
import header from '../header';
import {rules} from '../data/data';
import stats from '../ingame-stats';

export default class StatsView extends AbstractView {
  constructor(data) {
    super();
    this.state = data[data.length - 1];
    this.data = data;
    this.bonuses = {
      fast: `Бонус за скорость`,
      slow: `Штраф за медлительность`,
      heart: `Бонус за жизни`
    };
    this.results = this._otherResultsTemplate(this.data);
  }

  _bonus(state, bonusName) {
    if (bonusName === `heart`) {
      return state.lives;
    }
    return state.results.reduce((acc, result) => result === bonusName
      ? acc + 1 : acc, 0);
  }

  _points({results}) {
    return results.reduce((acc, result) => result === `wrong` || result === `unknown`
      ? acc : acc + rules.points.correct, 0);
  }

  _title({lives}) {
    return (lives > 0 ? `Победа` : `Поражение`).toUpperCase();
  }

  _bonusTemplate(currentBonus, bonusName) {
    return `\
      <tr>
        <td></td>
        <td class="result__extra">${this.bonuses[bonusName]}:</td>
        <td class="result__extra">${currentBonus}&nbsp;<span class="stats__result stats__result--${bonusName}"></span></td>
        <td class="result__points">×&nbsp;${rules.points[bonusName]}</td>
        <td class="result__total">${currentBonus * rules.points[bonusName]}</td>
      </tr>`;
  }

  _bonusNumbers(state) {
    return Object.keys(this.bonuses).reduce((acc, item) => {
      return Object.assign({}, acc, {[item]: this._bonus(state, item)});
    }, {});
  }

  _pointsBeforeBonuses(state) {
    return this._points(state);
  }

  _totalPoints(state) {
    return this._pointsBeforeBonuses(state) + Object.keys(this._bonusNumbers(state))
      .reduce((acc, bonusName) => acc + this._bonusNumbers(state)[bonusName] * rules.points[bonusName], 0);
  }

  _statsTemplate(state) {

    return `\
      <div class="result">
        <h1>${this._title(state)}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">${this._currentIndex + 1}.</td>
            <td colspan="2">
              ${stats(state.results)}
            </td>
            <td class="result__points">×&nbsp;${rules.points.correct}</td>
            <td class="result__total">${this._pointsBeforeBonuses(state)}</td>
          </tr>
          ${(Object.keys(this._bonusNumbers(state)).map((currentBonus) => this._bonusTemplate(this._bonusNumbers(state)[currentBonus], currentBonus)).join(``))}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${this._totalPoints(state)}</td>
          </tr>
        </table>
      </div>
    `;
  }

  _otherPlayerStatsTemplate(state, index) {
    return `\
    <div class="result">
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
            ${stats(state.results)}
          </td>
          <td class="result__points">×&nbsp;${rules.points.correct}</td>
          <td class="result__total">${this._pointsBeforeBonuses(state)}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this._totalPoints(state)}</td>
        </tr>
      </table>
    </div>
    `;
  }

  _otherResultsTemplate(data) {
    return data.slice().sort((state1, state2) => {
      return this._totalPoints(state2) - this._totalPoints(state1);
    }).map((currentState, index) => {
      if (currentState === this.state) {
        this._currentIndex = index;
      }
      return this._otherPlayerStatsTemplate(currentState, index);
    }).join(``);
  }

  get template() {
    return `\
    ${header()}
    ${this._statsTemplate(this.state)}
    ${this.results}
    ${footer()}`;
  }

  bind() {
    const element = this.element;
    const backButton = element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;

    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

  }


  onBackButtonClick() {

  }
}
