// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const isNumber = (value) => typeof value === 'number';

const getRandonNum = (min, max) => {
  // если не числа
  if(!isNumber(min) || !isNumber(max)) {
    return -1;
  }

  min = Math.floor(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if(min === max) {
    return Math.floor(min); // если одинаковые числа
  }

  if(min > max) {
    [min, max] = [max, min]; // если max меньше min, то меняю их местами
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandonNum();

// option 1. есть константа length (140)
const MAX_LENGTH = 140;

const checkCommentLength = (userComment) => userComment.length <= MAX_LENGTH;

checkCommentLength();


// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит
const checkAnotherComment = (userComment, maxCommentLenght) => {
  maxCommentLenght = 140;
  return userComment.length <= maxCommentLenght;
};

checkAnotherComment();
