import { isEscapeKey } from './utile.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const scrollBackground = document.querySelector('body');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const showMoreCommentsButton = bigPicture.querySelector('.comments-loader');


const onBigPuctureEscpaeKey = (evt) => {
  if (isEscapeKey(evt)) {
    userBigPictureCloseElement(evt);
  }
};

function userBigPictureCloseElement(evt) {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  scrollBackground.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPuctureEscpaeKey);
}

const renderComment = ({avatar, name, message}) => {
  const commentBlock = commentTemplate.cloneNode(true);
  commentBlock.querySelector('img').src = avatar;
  commentBlock.querySelector('img').alt = name;
  commentBlock.querySelector('.social__text').textContent = message;
  return commentBlock;
};

const renderComments = (comments) => commentsList.append(...comments.map(renderComment));

const renderBigPicture = (url, likes, comments, description) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  showMoreCommentsButton.classList.remove('hidden');
  renderComments(comments);
};

const showBigPicture = (url, likes, comments, description) => {
  commentsList.innerHTML = '';
  scrollBackground.classList.add('modal-open');

  renderBigPicture(url, likes, comments, description);

  document.addEventListener('keydown', onBigPuctureEscpaeKey);
  bigPicture.classList.remove('hidden');
};


bigPictureCancel.addEventListener('click', (evt) => {
  userBigPictureCloseElement(evt);
});


export {renderComment, renderComments, showBigPicture};
