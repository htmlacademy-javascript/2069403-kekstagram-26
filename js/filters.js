import { getData } from './api.js';
import { showErrorUploadMessage } from './error-messages.js';
import { renderPhotos } from './thumbnails.js';
import { debounce, shuffleArrayPictures } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const photoFiltersElement = document.querySelector('.img-filters');
const defaultFilterElement = photoFiltersElement.querySelector('#filter-default');
const randomFilterElement = photoFiltersElement.querySelector('#filter-random');
const discussedFilterElement = photoFiltersElement.querySelector('#filter-discussed');
const photoFiltersFormElement = photoFiltersElement.querySelector('.img-filters__form');


const getRandomPhotos = (photos) => {
  const photosCopy = photos.slice();
  shuffleArrayPictures(photosCopy);
  return photosCopy.slice(0, RANDOM_PHOTOS_COUNT);
};

const sortPhotosByCommentsNumber = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const clearPhotosContainer = () => {
  const renderedPhotos = document.querySelectorAll('.picture');
  renderedPhotos.forEach((photo) => {
    photo.remove();
  });
};

const highlightChosenFilter = (evt) => {
  const filterActiveElement = document.querySelectorAll('.img-filters__button--active');
  filterActiveElement.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const filterPhotos = (evt, photos) => {
  if (evt.target === defaultFilterElement && !evt.target.classList.contains('img-filters__button--active')) {
    highlightChosenFilter(evt);
    clearPhotosContainer();
    renderPhotos(photos);
  }
  if (evt.target === randomFilterElement && !evt.target.classList.contains('img-filters__button--active')) {
    highlightChosenFilter(evt);
    clearPhotosContainer();
    renderPhotos(getRandomPhotos(photos));
  }
  if (evt.target === discussedFilterElement && !evt.target.classList.contains('img-filters__button--active')) {
    highlightChosenFilter(evt);
    clearPhotosContainer();
    renderPhotos(sortPhotosByCommentsNumber(photos));
  }
};

const startFiltering = (photos) => {
  photoFiltersFormElement.addEventListener('click', debounce((evt) => filterPhotos(evt, photos)));
};

const initRendering = (photos) => {
  renderPhotos(photos);
  startFiltering(photos);
};

const showFilteredGallery = () => {
  getData(initRendering, showErrorUploadMessage);
};

export { showFilteredGallery };
