import StatsView from './stats-view';
import renderScreen from '../game';
import greeting from '../greeting/greeting';

export default (state) => {
  const stats = new StatsView(state);


  stats.onBackButtonClick = () => {
    renderScreen(greeting());
  };

  return stats;
};
