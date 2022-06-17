import {getRandonNum, getRandomArrayElement} from './utile.js';

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

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandonNum(1, 6)}.svg`,
  message: getRandomArrayElement(commentsText),
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
});

const createComments = (number) => Array.from({length: number}, (_, i) => createComment(i));

// create 1 object
const createPhoto = (id) => ({
  id,
  url: `photos/${getRandonNum(1, 25)}.jpg`,
  description: getRandomArrayElement(photoDescription), // string
  likes: getRandonNum(15, 200),
  comments: createComments(getRandonNum(1, 5)),
});


//create 25 objects
const createPhotos = () => Array.from({length: OBJECT_COUNT},(_, i) => createPhoto(i));


export {createComment, createComments, createPhoto, createPhotos};
