// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const checkAnotherComment = (userComment, maxCommentLenght) => userComment.length <= maxCommentLenght;

checkAnotherComment();


function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// choose random elements from arrays
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


export {checkAnotherComment, getRandomPositiveInteger, getRandomArrayElement};