// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const checkAnotherComment = (userComment, maxCommentLenght) => userComment.length <= maxCommentLenght;

checkAnotherComment('');


const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

const photoDescription = [
  'Я и Кекс',
  'Кекс на пляже',
  'Кекс спит',
  'Кекс завтракает',
  'Кекс на прогулке',
  'Кекс играет',
];

const commentsText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const OBJECT_COUNT = 25;

//get random positive integer
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

const createComment = () => ({
  id: getRandonNum(1, 25),
  avatar: `img/avatar-${getRandonNum(1, 6)}.svg`,
  message: getRandomArrayElement(commentsText),
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
});

// create 1 object
const createPhoto = (id) => ({
  id,
  url: `photos/${getRandonNum(1, 25)}.jpg`,
  description: getRandomArrayElement(photoDescription), // string
  likes: getRandonNum(15, 200),
  comment: createComment(),
});


//create 25 objects
const createPhotos = () => Array.from({length: OBJECT_COUNT},(_, i) => createPhoto(i));

createPhotos();


