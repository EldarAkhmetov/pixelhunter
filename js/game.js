import levels from './data-levels';
import ingameLevel from './level/level';
import gameStats from './stats/stats';

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

export const renderLevel = (currentState) => {
  if (currentState.level >= levels.length || currentState.lives <= 0) {
    renderScreen(gameStats(currentState));
  } else {
    const currentLevel = levels[currentState.level];
    renderScreen(ingameLevel(currentState, currentLevel));
  }
};

export const start = (userName) => {
  const newState = Object.assign({}, state, {
    name: userName
  });
  renderLevel(newState);
};

export const finishLevel = (currentState, isTaskCorrect) => {
  const getNewAnswer = () => {
    return isTaskCorrect ? `correct` : `wrong`;
  };

  const newState = Object.assign({}, currentState, {
    level: currentState.level + 1,
    lives: isTaskCorrect ? currentState.lives : currentState.lives - 1,
    results: currentState.results.slice()
  });

  newState.results[currentState.level] = getNewAnswer();

  renderLevel(newState);
};

export default renderScreen;
