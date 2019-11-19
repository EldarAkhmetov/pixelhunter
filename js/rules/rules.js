import RulesView from './rules-view';
import renderScreen, {state} from '../data/data';
import Application from '../application';

export default class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    renderScreen(this.view);

    this.view.onContinueButtonClick = (userName) => {
      Application.showGame(Object.assign({}, state, {
        name: userName,
        results: state.results.slice()
      }));
    };

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}
