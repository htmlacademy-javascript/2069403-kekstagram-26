function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// choose random elements from arrays
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const ESCAPE_KEY = 'Escape';
const isEscapeKey = (evt) =>  evt.key === ESCAPE_KEY;

export {getRandomPositiveInteger, getRandomArrayElement, isEscapeKey};
