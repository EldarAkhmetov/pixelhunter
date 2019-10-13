(() => {
  const getScreens = (items) => {
    return items.map((item) => {
      const template = document.getElementById(item).content.querySelector(`.central`);

      const arrowsWrapper = document.createElement(`div`);
      arrowsWrapper.classList.add(`arrows__wrap`);
      arrowsWrapper.style.cssText = `position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      `;

      const arrowButton = document.createElement(`button`);
      arrowButton.classList.add(`arrows__btn`);
      arrowButton.style.cssText = `background: none;
        border: 2px solid black;
        padding: 5px 20px;
      `;

      const arrowButtonLeft = arrowButton.cloneNode();
      arrowButtonLeft.textContent = `<-`;
      arrowButtonLeft.addEventListener(`click`, () => {
        shiftScreen(-1);
      });
      const arrowButtonRight = arrowButton.cloneNode();
      arrowButtonRight.textContent = `->`;
      arrowButtonRight.addEventListener(`click`, () => {
        shiftScreen(1);
      });

      arrowsWrapper.appendChild(arrowButtonLeft);
      arrowsWrapper.appendChild(arrowButtonRight);

      template.appendChild(arrowsWrapper);

      return template;
    });
  };

  const screensIds = [
    `loading`,
    `greeting`,
    `rules`,
    `game-1`,
    `game-2`,
    `game-3`,
    `stats`
  ];

  const main = document.querySelector(`.viewport`);

  const screens = getScreens(screensIds);

  let screenIndex = 0;

  const showScreen = (index) => {
    if (main.hasChildNodes()) {
      main.replaceChild(screens[index], main.firstChild);
    } else {
      main.appendChild(screens[index]);
    }
  };

  const shiftScreen = (offset = 0) => {
    screenIndex = ((screenIndex + offset) < 0)
    ? screens.length - 1
    : (screenIndex + offset) % screens.length;
    showScreen(screenIndex);
  };

  showScreen(screenIndex);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 37) {
      shiftScreen(-1);
    }
    if (evt.keyCode === 39) {
      shiftScreen(1);
    }
  });
})();
