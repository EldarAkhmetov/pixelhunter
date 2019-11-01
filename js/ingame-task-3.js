import getElementFromTemplate from './utils';
import renderScreen, {finishLevel} from './game';
import greeting from './greeting';
import header from './ingame-header';
import footer from './footer';
import stats from './ingame-stats';


const questionTemplate = (question, index) => `\
  <div class="game__option">
    <img src="${question.src}" alt="Option ${index + 1}" width="304" height="455">
  </div>
`;

const findCorrectAnswer = (options) => options
  .reduce((acc, {answer}) => answer === `paint` ? acc + 1 : acc, 0) === 1 ? `paint` : `photo`;

const taskText = (correctAnswer) => correctAnswer === `paint`
  ? `Найдите рисунок среди изображений` : `Найдите фото среди изображений`;


const taskTemplate = (state, options, correctAnswer) => `\
  <div class="game">
    <p class="game__task">${taskText(correctAnswer)}</p>
    <form class="game__content game__content--triple">
      ${options.map((option, index) => questionTemplate(option, index)).join(``)}
    </form>
    ${stats(state.results)}
  </div>`;

const template = (state, options) => `\
  ${header(state)}
  ${taskTemplate(state, options)}
  ${footer()}`;

const ingameTask3 = (state, options) => {
  const correctAnswer = findCorrectAnswer(options);
  const task = getElementFromTemplate(template(state, options, correctAnswer));
  const questions = task.querySelectorAll(`.game__option`);
  const backButton = task.querySelector(`.header__back`);
  backButton.style.cursor = `pointer`;

  backButton.addEventListener(`click`, () => {
    renderScreen(greeting());
  });

  Array.from(questions).forEach((question, i) => {
    question.addEventListener(`click`, (evt) => {
      const isTaskCorrect = options[i].answer === correctAnswer;
      finishLevel(state, isTaskCorrect);
    });
  });

  return task;

};

export default ingameTask3;
