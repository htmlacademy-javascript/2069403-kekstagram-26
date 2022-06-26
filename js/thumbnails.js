const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const scrollBackground = document.querySelector('body');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');

const renderComment = ({avatar, name, message}) => {
  const commentBlock = commentTemplate.cloneNode(true);
  commentBlock.querySelector('img').src = avatar;
  commentBlock.querySelector('img').alt = name;
  commentBlock.querySelector('.social__text').textContent = message;
  return commentBlock;
};
const renderComments = (comments) => {
  const commentsList = bigPicture.querySelector('.social__comments');
  comments.forEach((comment) => {
    const oneComment = renderComment(comment);
    commentsList.appendChild(oneComment);
  });
};

const showBigPicture = (url, likes, comments, description) => {
  const commentCount = bigPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');
  const loadNewPic = bigPicture.querySelector('.comments-loader');
  loadNewPic.classList.add('hidden');
  scrollBackground.classList.add('modal-open');

  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  renderComments(comments);
  bigPicture.classList.remove('hidden');
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
  scrollBackground.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    scrollBackground.classList.remove('modal-open');
  }
});

export {renderPhotos};
