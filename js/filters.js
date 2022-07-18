import { getData } from './api.js';
import { showErrorUploadMessage } from './error-messages.js';
import { renderPhotos } from './thumbnails.js';
import { debounce } from './utile.js';

const photoFilters = document.querySelector('.img-filters');
const defaultFilter = photoFilters.querySelector('#filter-default');
const randomFilter = photoFilters.querySelector('#filter-random');
const discussedFilter = photoFilters.querySelector('#filter-discussed');
const photoFiltersForm = photoFilters.querySelector('.img-filters__form');

const RANDOM_PHOTOS_COUNT = 10;

let serverPhotoData;
let checkedFilter = defaultFilter;

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

const compareCommentsNumber = (a, b) => b.comments.length - a.comments.length;
const sortPhotosByCommentsNumber = (photos) => photos.slice().sort(compareCommentsNumber);

const clearPhotosContainer = () => {
  const renderedPhotos = document.querySelectorAll('.picture');
  renderedPhotos.forEach((photo) => {
    photo.remove();
  });
};

const filterPhotos = (evt) => {
  clearPhotosContainer();

  if (evt.target === defaultFilter) {
    renderPhotos(serverPhotoData);
  }
  if (evt.target === randomFilter) {
    renderPhotos(getRandomPhotos(serverPhotoData));
  }
  if (evt.target === discussedFilter) {
    renderPhotos(sortPhotosByCommentsNumber(serverPhotoData));
  }
};


const startFiltering = (photos) => {
  serverPhotoData = photos;

  photoFiltersForm.addEventListener('click', (debounce(filterPhotos)));

  photoFiltersForm.addEventListener('click', (evt) => {
    checkedFilter.classList.remove('img-filters__button--active');
    checkedFilter = evt.target;
    checkedFilter.classList.add('img-filters__button--active');
  });
};

const initRerendering = (photos) => {
  renderPhotos(photos);
  startFiltering(photos);
};

const showFilteredGallery = () => {
  getData(initRerendering, showErrorUploadMessage);
};

export { showFilteredGallery };
