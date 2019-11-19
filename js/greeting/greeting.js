import GreetingView from './greeting-view';
import renderScreen from '../data/data';
import Application from '../application';

export default class GreetingPresenter {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    renderScreen(this.view);
    this.view.onContinueButtonClick = () => {
      Application.showRules();
    };
  }
}
