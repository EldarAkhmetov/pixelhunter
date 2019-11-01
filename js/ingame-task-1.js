import getElementFromTemplate from './utils';
import renderScreen, {finishLevel} from './game';
import greeting from './greeting';
import header from './ingame-header';
import footer from './footer';
import stats from './ingame-stats';


const questionTemplate = (question, index) => `\
  <div class="game__option">
    <img src="${question.src}" alt="Option ${index + 1}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const taskTemplate = (state, options) => `\
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${options.map((option, index) => questionTemplate(option, index)).join(``)}
    </form>
    ${stats(state.results)}
  </div>`;

const template = (state, options) => `\
  ${header(state)}
  ${taskTemplate(state, options)}
  ${footer()}`;

const ingameTask1 = (state, options) => {
  const task = getElementFromTemplate(template(state, options));
  const form = task.querySelector(`.game__content`);
  const questions = [`question1`, `question2`];
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
    if (questions.every((question) => isChecked(question))) {
      const isTaskCorrect = options.every((option, index) => option.answer === form.elements[`question${index + 1}`].value);
      finishLevel(state, isTaskCorrect);
    }
  });

  return task;

};

export default ingameTask1;
