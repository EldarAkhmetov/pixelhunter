import getElementFromTemplate from './utils';
import renderScreen, * as game from './game';
import gameTwo from './game-2';
import greeting from './greeting';
import header from './ingame-header';
import footer from './footer';


const template = `\
  ${header(game.state)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
  ${footer()}`;

const gameOne = getElementFromTemplate(template);
const form = gameOne.querySelector(`.game__content`);
const questions = [`question1`, `question2`];
const backButton = gameOne.querySelector(`.header__back`);
backButton.style.cursor = `pointer`;

backButton.addEventListener(`click`, () => {
  renderScreen(greeting);
});

const isChecked = (question) => {
  const answers = form.elements[question];
  return Array.from(answers).some((answer) => answer.checked);
};

form.addEventListener(`change`, () => {
  if (questions.every((question) => isChecked(question))) {
    renderScreen(gameTwo);
  }
});

export default gameOne;
