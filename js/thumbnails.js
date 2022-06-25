const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').src = photo.url;

};

const renderPhoto = ({url, likes, comments}) => {
  const photoItem = thumbnailTemplateContainer.cloneNode(true); // клониурем
  photoItem.querySelector('img').src = url;
  photoItem.querySelector('.picture__likes').textContent = likes;
  photoItem.querySelector('.picture__comments').textContent = comments.length;
  photoItem.addEventListener('click', showBigPicture);
  return photoItem;
};

const renderPhotos = (photos) => {
  const similarPhotoFragment = document.createDocumentFragment(); // создаём фрагмент
  photos.forEach((photo) => {
    const onePhoto = renderPhoto(photo);
    similarPhotoFragment.appendChild(onePhoto); // прикрепляем к фагменту
  });
  picturesContainer.appendChild(similarPhotoFragment); // приркепляем фото в контейнер
};


bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

export {renderPhotos};
