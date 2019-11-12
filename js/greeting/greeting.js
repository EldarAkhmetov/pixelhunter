import GreetingView from './greeting-view';
import renderScreen from '../game';
import rules from '../rules/rules';

export default () => {
  const greeting = new GreetingView();

  greeting.onContinueButtonClick = () => {
    renderScreen(rules());
  };

  return greeting;
};
