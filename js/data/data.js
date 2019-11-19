import levels from './data-levels';

export const rules = Object.freeze({
  levelTime: 30,
  slowTime: 20,
  quickTime: 10,
  points: Object.freeze({
    correct: 100,
    fast: 50,
    slow: -50,
    wrong: 0,
    unknown: 0,
    heart: 50
  }),
  maxLives: 3,
  levelsCount: levels.length
});

export const tasks = [
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

export const state = Object.freeze({
  level: 0,
  lives: rules.maxLives,
  name: `Unknown`,
  results: Object.freeze(new Array(rules.levelsCount).fill(`unknown`))
});

const renderScreen = (screen) => {
  const viewport = document.querySelector(`.viewport`);
  viewport.innerHTML = ``;
  viewport.appendChild(screen.element);
  return viewport;
};


export const getNewAnswer = (isTaskCorrect, levelTime) => {
  const getCorrectStatus = () => {
    if (levelTime < rules.quickTime) {
      return `fast`;
    }
    if (levelTime > rules.slowTime) {
      return `slow`;
    }
    return `correct`;
  };
  return isTaskCorrect ? getCorrectStatus() : `wrong`;
};


export default renderScreen;
