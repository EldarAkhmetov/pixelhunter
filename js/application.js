import IntroPresenter from './intro/intro';
import GreetingPresenter from './greeting/greeting';
import RulesPresenter from './rules/rules';
import GamePresenter from './game/game';
import StatsPresenter from './stats/stats';
import Loader from './loader';

export default class Application {
  static showIntro() {
    (new IntroPresenter()).init();
  }

  static showGreeting() {
    (new GreetingPresenter()).init();
  }

  static showRules() {
    (new RulesPresenter()).init();
  }

  static showGame(state) {
    Loader.loadData().then((levels) => {
      return (new GamePresenter(state, levels)).init();
    });
  }

  static showStats(state) {
    Loader.saveResults(state, state.name)
      .then(() => Loader.loadResults(state.name))
      .then((data) => {
        (new StatsPresenter(data)).init();
      });
  }
}
