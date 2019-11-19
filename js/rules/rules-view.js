import AbstractView from '../view';
import footer from '../footer';
import header from '../header';
import {rules} from '../data/data';

export default class RulesView extends AbstractView {
  get template() {
    return `\
    ${header()}
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай ${rules.levelsCount} раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится ${rules.levelTime} секунд.<br>
        Ошибиться можно не более ${rules.maxLives} раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
      </div>
      ${footer()}`;
  }

  bind() {
    const element = this.element;
    const rulesInput = element.querySelector(`.rules__input`);
    const submitButton = element.querySelector(`.rules__button`);
    const submitForm = element.querySelector(`.rules__form`);
    const backButton = element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;
    rulesInput.addEventListener(`input`, ({target}) => {
      submitButton.disabled = target.value.length === 0;
    });

    submitForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onContinueButtonClick(rulesInput.value);
    });

    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

  }

  onContinueButtonClick(userName) {

  }

  onBackButtonClick() {

  }
}
