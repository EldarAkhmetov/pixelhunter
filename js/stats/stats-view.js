import AbstractView from '../view';
import footer from '../footer';
import header from '../header';
import {rules} from '../game';
import stats from '../ingame-stats';

export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.bonuses = {
      fast: `Бонус за скорость`,
      slow: `Штраф за медлительность`,
      heart: `Бонус за жизни`
    };
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

  _statsTemplate() {
    const bonusNumbers = Object.keys(this.bonuses).reduce((acc, item) => {
      return Object.assign({}, acc, {[item]: this._bonus(this.state, item)});
    }, {});

    const pointsBeforeBonuses = this._points(this.state);
    const totalPoints = pointsBeforeBonuses + Object.keys(bonusNumbers)
      .reduce((acc, bonusName) => acc + bonusNumbers[bonusName] * rules.points[bonusName], 0);

    return `\
      <div class="result">
        <h1>${this._title(this.state)}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${stats(this.state.results)}
            </td>
            <td class="result__points">×&nbsp;${rules.points.correct}</td>
            <td class="result__total">${pointsBeforeBonuses}</td>
          </tr>
          ${(Object.keys(bonusNumbers).map((currentBonus) => this._bonusTemplate(bonusNumbers[currentBonus], currentBonus)).join(``))}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">2.</td>
            <td>
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--wrong"></li>
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">3.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>
      </div>`;
  }

  get template() {
    return `\
    ${header()}
    ${this._statsTemplate()}
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
