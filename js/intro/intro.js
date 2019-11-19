import IntroView from './intro-view';
import renderScreen from '../data/data';
import Application from '../application';

export default class IntroPresenter {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    renderScreen(this.view);

    this.view.onContinueButtonClick = () => {
      Application.showGreeting();
    };
  }

}
