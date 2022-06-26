const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const commentList = (comments) => {
  const commentBlock = bigPicture.querySelector('.social__comments');
  comments.forEach((comment) => {
    commentBlock.querySelector('img').src = comment.avatar;
    commentBlock.querySelector('img').alt = comment.name;
    commentBlock.querySelector('.social__text').textContent = comment.message;
  });
};

const showBigPicture = (url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');
  const loadNewPic = bigPicture.querySelector('.comments-loader');
  loadNewPic.classList.add('hidden');
  const scrollBackground = document.querySelector('body');
  scrollBackground.classList.add('modal-open');

  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  commentList(comments);

};

const renderPhoto = ({url, likes, comments, description}) => {
  const photoItem = thumbnailTemplateContainer.cloneNode(true); // клониурем
  photoItem.querySelector('img').src = url;
  photoItem.querySelector('.picture__likes').textContent = likes;
  photoItem.querySelector('.picture__comments').textContent = comments.length;
  photoItem.addEventListener('click', () => showBigPicture(url, likes, comments, description));
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
