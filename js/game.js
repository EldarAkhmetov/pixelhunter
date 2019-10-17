const viewport = document.querySelector(`.viewport`);

const renderScreen = (screen) => {
  viewport.innerHTML = ``;
  viewport.appendChild(screen);
  return viewport;
};

export default renderScreen;
