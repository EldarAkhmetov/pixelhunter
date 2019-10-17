const getElementFromTemplate = (string) => {
  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);
  wrapper.insertAdjacentHTML(`afterbegin`, string);
  return wrapper;
};

export default getElementFromTemplate;


