import LevelView from './level-view';
import renderScreen, {finishLevel} from '../game';
import greeting from '../greeting/greeting';

const tasks = [
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    formClass: `game__content`,
    frame: {width: 468, height: 458},
    questions: [`question1`, `question2`]
  },
  {
    title: `Угадай, фото или рисунок?`,
    formClass: `game__content  game__content--wide`,
    frame: {width: 705, height: 455},
    questions: [`question1`]
  }, {
    formClass: `game__content  game__content--triple`,
    frame: {width: 304, height: 455}
  }];

export default (state, level) => {
  const newLevel = Object.assign({}, level, tasks[level.task]);

  const currentLevel = new LevelView(state, newLevel);

  currentLevel.onContinueButtonClick = (currentState, isTaskCorrect) => {
    finishLevel(currentState, isTaskCorrect);
  };

  currentLevel.onBackButtonClick = () => {
    renderScreen(greeting());
  };

  return currentLevel;
};
