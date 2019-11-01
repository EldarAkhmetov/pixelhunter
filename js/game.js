import levels from './data-levels';
import ingameTask1 from './ingame-task-1';
import ingameTask2 from './ingame-task-2';
import ingameTask3 from './ingame-task-3';
import gameStats from './stats';

export const tasks = {
  "task-1": ingameTask1,
  "task-2": ingameTask2,
  "task-3": ingameTask3
};

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
  viewport.appendChild(screen);
  return viewport;
};

export const renderLevel = (currentState) => {
  if (currentState.level >= levels.length || currentState.lives <= 0) {
    renderScreen(gameStats(currentState));
  } else {
    const currentLevel = levels[currentState.level];
    const currentOptions = currentLevel.options;
    const newTask = tasks[currentLevel.task](currentState, currentOptions);
    renderScreen(newTask);
  }
};

export const start = (initialState, userName) => {
  const newState = Object.assign({}, initialState, {
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
