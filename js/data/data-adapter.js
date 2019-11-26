const types = {
  'two-of-two': 0,
  'tinder-like': 1,
  'one-of-three': 2
};

const adaptAnswers = {
  photo: `photo`,
  painting: `paint`
};

const adaptOptions = (options) => options
  .map((option) => {
    return {src: option.image.url, answer: adaptAnswers[option.type]};
  });

export default (items) => items.map((item) => {
  return {task: types[item.type], options: adaptOptions(item.answers)};
});


