import StatsView from './stats-view';
import Application from '../application';
import renderScreen from '../data/data';

export default class StatsPresenter {
  constructor(data) {
    this.state = data;
    this.view = new StatsView(data);
  }

  init() {
    renderScreen(this.view);
    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}
