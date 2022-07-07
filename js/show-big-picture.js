import { isEscapeKey } from './utile.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const scrollBackground = document.querySelector('body');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const displayedCommentNumber = bigPicture.querySelector('.displayed-comment-number');
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

let Comments = [];
let currentDisplayedComments = 0;

const showMoreComments = () => {
  if (Comments.length <= 5) {
    showMoreCommentsButton.classList.add('hidden');
  }
  const forRendering = Comments.slice(0, 5);
  Comments = Comments.slice(5);
  renderComments(forRendering);

  currentDisplayedComments += forRendering.length;
  displayedCommentNumber.textContent = currentDisplayedComments;
};

const renderBigPicture = (url, likes, comments, description) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  showMoreCommentsButton.classList.remove('hidden');
  Comments = comments;
  showMoreComments(Comments);
};

const showBigPicture = (url, likes, comments, description) => {
  currentDisplayedComments = 0;
  commentsList.innerHTML = '';
  scrollBackground.classList.add('modal-open');

  renderBigPicture(url, likes, comments, description);

  document.addEventListener('keydown', onBigPuctureEscpaeKey);
  bigPicture.classList.remove('hidden');
};


bigPictureCancel.addEventListener('click', (evt) => {
  userBigPictureCloseElement(evt);

});

showMoreCommentsButton.addEventListener('click', showMoreComments);


export {renderComment, renderComments, showBigPicture};
