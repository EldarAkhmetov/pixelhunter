import RulesView from './rules-view';
import renderScreen, {start} from '../game';
import greeting from '../greeting/greeting';

export default () => {
  const rules = new RulesView();

  rules.onContinueButtonClick = (userName) => {
    start(userName);
  };

  rules.onBackButtonClick = () => {
    renderScreen(greeting());
  };

  return rules;
};
