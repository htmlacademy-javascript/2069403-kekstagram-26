import { getData } from './api.js';
import { showErrorUploadMessage } from './error-messages.js';
import { renderPhotos } from './thumbnails.js';
import { debounce } from './utile.js';

const RANDOM_PHOTOS_COUNT = 10;

const photoFilters = document.querySelector('.img-filters');
const defaultFilter = photoFilters.querySelector('#filter-default');
const randomFilter = photoFilters.querySelector('#filter-random');
const discussedFilter = photoFilters.querySelector('#filter-discussed');
const photoFiltersForm = photoFilters.querySelector('.img-filters__form');


const shuffleArrayPictures = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

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

const filterPhotos = (evt, photos) => {
  clearPhotosContainer();

  if (evt.target === defaultFilter) {
    renderPhotos(photos);
  }
  if (evt.target === randomFilter) {
    renderPhotos(getRandomPhotos(photos));
  }
  if (evt.target === discussedFilter) {
    renderPhotos(sortPhotosByCommentsNumber(photos));
  }
};


const startFiltering = (photos) => {
  photoFiltersForm.addEventListener('click', debounce((evt) => filterPhotos(evt, photos)));

  photoFiltersForm.addEventListener('click', (evt) => {
    const filterActive = document.querySelectorAll('.img-filters__button--active');
    filterActive.forEach((element) => element.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
  });
};

const initRendering = (photos) => {
  renderPhotos(photos);
  startFiltering(photos);
};

const showFilteredGallery = () => {
  getData(initRendering, showErrorUploadMessage);
};

export { showFilteredGallery };
