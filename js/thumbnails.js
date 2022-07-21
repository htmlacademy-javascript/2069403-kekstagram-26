import { showBigPicture } from './show-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');


const renderPhoto = ({url, likes, comments, description}) => {
  const photoItem = thumbnailTemplateContainer.cloneNode(true); // клониурем
  photoItem.querySelector('img').src = url;
  photoItem.querySelector('.picture__likes').textContent = likes;
  photoItem.querySelector('.picture__comments').textContent = comments.length;
  photoItem.addEventListener('click', () => showBigPicture(url, likes, comments, description));
  return photoItem;
};


const renderPhotos = (photos) => {
  const similarPhotoFragment = document.createDocumentFragment();
  photos.slice().forEach((photo) => {
    const onePhoto = renderPhoto(photo);
    similarPhotoFragment.appendChild(onePhoto);
  });
  picturesContainer.appendChild(similarPhotoFragment);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};


export {renderPhotos};
