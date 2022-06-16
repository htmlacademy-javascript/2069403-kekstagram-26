// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const checkAnotherComment = (userComment, maxCommentLenght) => userComment.length <= maxCommentLenght;

checkAnotherComment();


const isNumber = (value) => typeof value === 'number';

const getRandonNum = (min, max) => {
  if(!isNumber(min) || !isNumber(max)) {
    return -1;
  }

  min = Math.floor(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if(min === max) {
    return Math.floor(min);
  }

  if(min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// choose random elements from arrays
const getRandomArrayElement = (elements) => elements[getRandonNum(0, elements.length - 1)];


export {checkAnotherComment, getRandonNum, getRandomArrayElement};
