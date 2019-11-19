import AbstractView from '../view';
import footer from '../footer';
import header from './game-header';
import stats from '../ingame-stats';
import {rules} from '../data/data';

const TRIPLE_TASK = 2;

export default class GameView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  _questionTemplate(question, index) {
    return `\
    <div class="game__option">
      <img src="${question.src}" alt="Option ${index + 1}" width=${this.level.frame.width} height=${this.level.frame.height}>
      <label class="game__answer game__answer--photo">
        <input name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${index + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
  }

  _tripleQuestionTemplate(question, index) {
    return `\
      <div class="game__option">
        <img src="${question.src}" alt="Option ${index + 1}" width=${this.level.frame.width} height=${this.level.frame.height}>
      </div>
    `;
  }

  _optionTemplate(option, index) {
    return this.level.task === TRIPLE_TASK
      ? this._tripleQuestionTemplate(option, index)
      : this._questionTemplate(option, index);
  }

  _taskTemplate() {
    return `\
      <div class="game">
        <p class="game__task">${this.title}</p>
        <form class="${this.level.formClass}">
          ${this.level.options.map((option, index) => this._optionTemplate(option, index)).join(``)}
        </form>
        ${stats(this.state.results)}
      </div>`;
  }

  _findCorrectAnswer(options) {
    return options.reduce((acc, {answer}) => answer === `paint` ? acc + 1 : acc, 0) === 1 ? `paint` : `photo`;
  }

  get correctAnswer() {
    return this._findCorrectAnswer(this.level.options);
  }

  get title() {
    if (this.level.task !== TRIPLE_TASK) {
      return this.level.title;
    }
    return this.correctAnswer === `paint` ? `Найдите рисунок среди изображений` : `Найдите фото среди изображений`;
  }

  get template() {
    return `\
    ${header(this.state)}
    ${this._taskTemplate()}
    ${footer()}`;
  }

  get levelTime() {
    return rules.levelTime - parseInt(this.levelTimer.textContent, 10);
  }

  set levelTime(time) {
    this.levelTimer.textContent = time;
  }

  bind() {
    const element = this.element;
    const form = element.querySelector(`.game__content`);
    this.levelTimer = element.querySelector(`.game__timer`);

    const backButton = element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;

    const isChecked = (question) => {
      const answers = form.elements[question];
      return Array.from(answers).some((answer) => answer.checked);
    };

    if (this.level.task === TRIPLE_TASK) {
      const questions = form.querySelectorAll(`.game__option`);
      Array.from(questions).forEach((question, i) => {
        question.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const isTaskCorrect = this.level.options[i].answer === this.correctAnswer;
          this.onAnswered(isTaskCorrect, this.levelTime);
        });
      });
    } else {
      form.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        if (this.level.questions.every(isChecked)) {
          const isTaskCorrect = this.level.options.every((option, index) => option.answer === form.elements[`question${index + 1}`].value);
          this.onAnswered(isTaskCorrect, this.levelTime);
        }

      });
    }

    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

  }

  onAnswered(isTaskCorrect, levelTime) {

  }

  onBackButtonClick() {

  }
}
