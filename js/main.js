// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const isNumber = (...values) => typeof values === 'number';
isNumber();


const getRandonNum = (min, max) => {
  // если не числа
  if(!isNumber(min) || !isNumber(max)) {
    throw new Error('I can\'t compare different types');

  }
  // если оба меньше 0
  if(min < 0 && max < 0) {
    return 'Sorry just positive numbers';
  }

  min = Math.floor(min);
  max = Math.floor(max);

  // если только min меньше 0
  if(min < 0 && max >= 0) {
    min = 0;
  }

  // если оба больше 0
  if(min >= 0 && max >= 0) {
    if(min === max) {
      return Math.floor(min); // если одинаковые числа
    }

    if(min > max) {
      [min, max] = [max, min]; // если max меньше min, то меняю их местами
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

};

getRandonNum();
