import IntroView from './intro-view';
import renderScreen from '../game';
import greeting from '../greeting/greeting';

export default () => {
  const intro = new IntroView();

  intro.onContinueButtonClick = () => {
    renderScreen(greeting());
  };

  return intro;
};
