import getElementFromTemplate from './utils';
import renderScreen from './game';
import greeting from './greeting';
import footer from './footer';

const template = `\
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
  ${footer()}`;

const intro = getElementFromTemplate(template);

const asteriskButton = intro.querySelector(`.intro__asterisk`);

asteriskButton.addEventListener(`click`, () => {
  renderScreen(greeting());
});

export default intro;
