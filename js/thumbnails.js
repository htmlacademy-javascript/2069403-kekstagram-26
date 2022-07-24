import { showBigPicture } from './show-big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const thumbnailTemplateContainerElement = document.querySelector('#picture').content.querySelector('.picture');


const renderPhoto = ({url, likes, comments, description}) => {
  const photoItemElement = thumbnailTemplateContainerElement.cloneNode(true); // клониурем
  photoItemElement.querySelector('img').src = url;
  photoItemElement.querySelector('.picture__likes').textContent = likes;
  photoItemElement.querySelector('.picture__comments').textContent = comments.length;
  photoItemElement.addEventListener('click', () => showBigPicture(url, likes, comments, description));
  return photoItemElement;
};


const renderPhotos = (photos) => {
  const similarPhotoFragmentElement = document.createDocumentFragment();
  photos.slice().forEach((photo) => {
    const onePhoto = renderPhoto(photo);
    similarPhotoFragmentElement.appendChild(onePhoto);
  });
  picturesContainerElement.appendChild(similarPhotoFragmentElement);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};


export {renderPhotos};
