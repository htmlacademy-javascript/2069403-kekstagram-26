// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
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
