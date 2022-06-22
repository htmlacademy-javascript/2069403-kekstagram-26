import { createPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotoFragment = document.createDocumentFragment();

const randomPhotos = createPhotos();

randomPhotos.forEach(({url, likes, comments}) => {
  const photoItem = thumbnailTemplateContainer.cloneNode(true);
  photoItem.src = url;
  photoItem.querySelector('.picture__likes').textContent = likes;
  photoItem.querySelector('.picture__comments').textContent = comments;
  similarPhotoFragment.appendChild(photoItem);
});
picturesContainer.appendChild(similarPhotoFragment);


export {randomPhotos};
