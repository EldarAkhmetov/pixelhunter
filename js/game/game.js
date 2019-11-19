import GameView from './game-view';
import renderScreen, {getNewAnswer, rules, tasks} from '../data/data';
import levels from '../data/data-levels';
import {state as initState} from '../data/data';
import Application from '../application';

export default class GamePresenter {
  constructor(state = initState) {
    this.state = state;
    this.levelTimer = null;

    this._createGameView();
  }

  _createGameView() {
    this.level = levels[this.state.level];
    this.view = new GameView(this.state, Object.assign({}, this.level, tasks[this.level.task]));
  }

  _nextLevel(isTaskCorrect, levelTime) {
    clearInterval(this.levelTimer);
    this.state.results[this.state.level] = getNewAnswer(isTaskCorrect, levelTime);
    this.state.lives = isTaskCorrect ? this.state.lives : this.state.lives - 1;
    this.state.level += 1;

    if (this.state.lives <= 0 || this.state.level >= levels.length) {
      Application.showStats(this.state);
    } else {
      this._createGameView();
      this.init();
    }
  }

  _startLevel() {
    const TIMER_DELAY = 1000;
    let timerTicks = rules.levelTime;
    this.levelTimer = setInterval(() => {
      if (!timerTicks) {
        this._nextLevel();
      } else {
        this.view.levelTime = --timerTicks;
      }
    }, TIMER_DELAY);
  }

  init() {
    this._startLevel();
    renderScreen(this.view);

    this.view.onAnswered = (isTaskCorrect, levelTime) => {

      this._nextLevel(isTaskCorrect, levelTime);
    };


    this.view.onBackButtonClick = () => {
      clearInterval(this.levelTimer);
      Application.showGreeting();
    };
  }

}
