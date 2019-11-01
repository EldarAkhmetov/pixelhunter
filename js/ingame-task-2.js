import getElementFromTemplate from './utils';
import renderScreen, {finishLevel} from './game';
import greeting from './greeting';
import header from './ingame-header';
import footer from './footer';
import stats from './ingame-stats';


const questionTemplate = (question) => `\
  <div class="game__option">
  <img src="${question.src}" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const taskTemplate = (state, options) => `\
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      ${questionTemplate(options[0])}
    </form>
    ${stats(state.results)}
  </div>`;

const template = (state, options) => `\
  ${header(state)}
  ${taskTemplate(state, options)}
  ${footer()}`;

const ingameTask2 = (state, options) => {
  const task = getElementFromTemplate(template(state, options));
  const form = task.querySelector(`.game__content`);
  const backButton = task.querySelector(`.header__back`);
  backButton.style.cursor = `pointer`;

  backButton.addEventListener(`click`, () => {
    renderScreen(greeting());
  });

  const isChecked = (question) => {
    const answers = form.elements[question];
    return Array.from(answers).some((answer) => answer.checked);
  };

  form.addEventListener(`change`, () => {
    if (isChecked(`question1`)) {
      const isTaskCorrect = options.every((option, index) => option.answer === form.elements[`question${index + 1}`].value);
      finishLevel(state, isTaskCorrect);
    }
  });

  return task;

};

export default ingameTask2;
