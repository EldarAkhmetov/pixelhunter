import getElementFromTemplate from './utils';
import renderScreen, {rules} from './game';
import greeting from './greeting';
import header from './header';
import footer from './footer';
import stats from './ingame-stats';

const bonuses = {
  fast: `Бонус за скорость`,
  slow: `Штраф за медлительность`,
  heart: `Бонус за жизни`
};

const title = ({lives}) => (lives > 0 ? `Победа` : `Поражение`).toUpperCase();

const points = ({results}) => results.reduce((acc, result) => result === `wrong` || result === `unknown`
  ? acc : acc + rules.points.correct, 0);

const bonus = (state, bonusName) => {
  if (bonusName === `heart`) {
    return state.lives;
  }
  return state.results.reduce((acc, result) => result === bonusName
    ? acc + 1 : acc, 0);
};

const bonusTemplate = (currentBonus, bonusName) => {
  return `\
    <tr>
      <td></td>
      <td class="result__extra">${bonuses[bonusName]}:</td>
      <td class="result__extra">${currentBonus}&nbsp;<span class="stats__result stats__result--${bonusName}"></span></td>
      <td class="result__points">×&nbsp;${rules.points[bonusName]}</td>
      <td class="result__total">${currentBonus * rules.points[bonusName]}</td>
    </tr>`;
};


const statsTemplate = (state) => {
  const bonusNumbers = {
    fast: bonus(state, `fast`),
    slow: bonus(state, `slow`),
    heart: bonus(state, `heart`)
  };

  const pointsBeforeBonuses = points(state);
  const totalPoints = pointsBeforeBonuses + Object.keys(bonusNumbers)
    .reduce((acc, bonusName) => acc + bonusNumbers[bonusName] * rules.points[bonusName], 0);

  return `\
    <div class="result">
      <h1>${title(state)}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${stats(state.results)}
          </td>
          <td class="result__points">×&nbsp;${rules.points.correct}</td>
          <td class="result__total">${pointsBeforeBonuses}</td>
        </tr>
        ${(Object.keys(bonusNumbers).map((currentBonus) => bonusTemplate(bonusNumbers[currentBonus], currentBonus)).join(``))}
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
};

const template = (state) => `\
  ${header()}
  ${statsTemplate(state)}
  ${footer()}`;

const gameStats = (state) => {
  const templateStats = getElementFromTemplate(template(state));
  const backButton = templateStats.querySelector(`.header__back`);
  backButton.style.cursor = `pointer`;

  backButton.addEventListener(`click`, () => {
    renderScreen(greeting());
  });

  return templateStats;
};

export default gameStats;
