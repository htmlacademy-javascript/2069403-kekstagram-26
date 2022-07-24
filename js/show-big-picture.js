import { isEscapeKey } from './util.js';

const COMMENT_LIST_MAX_LENGTH = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const scrollBackgroundElement = document.querySelector('body');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const displayedCommentNumberElement = bigPictureElement.querySelector('.displayed-comment-number');
const showMoreCommentsButtonElement = bigPictureElement.querySelector('.comments-loader');


const onBigPuctureEscpaeKey = (evt) => {
  if (isEscapeKey(evt)) {
    userBigPictureCloseElement(evt);
  }
};

function userBigPictureCloseElement(evt) {
  evt.preventDefault();
  bigPictureElement.classList.add('hidden');
  scrollBackgroundElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPuctureEscpaeKey);
}

const renderComment = ({avatar, name, message}) => {
  const commentBlock = commentTemplate.cloneNode(true);
  commentBlock.querySelector('img').src = avatar;
  commentBlock.querySelector('img').alt = name;
  commentBlock.querySelector('.social__text').textContent = message;
  return commentBlock;
};

const renderComments = (comments) => commentsListElement.append(...comments.map(renderComment));

let Comments = [];
let currentDisplayedComments = 0;

const showMoreComments = () => {
  if (Comments.length <= COMMENT_LIST_MAX_LENGTH) {
    showMoreCommentsButtonElement.classList.add('hidden');
  }
  const forRendering = Comments.slice(0, COMMENT_LIST_MAX_LENGTH);
  Comments = Comments.slice(COMMENT_LIST_MAX_LENGTH);
  renderComments(forRendering);

  currentDisplayedComments += forRendering.length;
  displayedCommentNumberElement.textContent = currentDisplayedComments;
};

const renderBigPicture = (url, likes, comments, description) => {
  bigPictureElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  showMoreCommentsButtonElement.classList.remove('hidden');
  Comments = comments;
  showMoreComments(Comments);

};

const showBigPicture = (url, likes, comments, description) => {
  currentDisplayedComments = 0;
  commentsListElement.innerHTML = '';
  scrollBackgroundElement.classList.add('modal-open');

  renderBigPicture(url, likes, comments, description);

  document.addEventListener('keydown', onBigPuctureEscpaeKey);
  bigPictureElement.classList.remove('hidden');
};


bigPictureCancelElement.addEventListener('click', (evt) => {
  userBigPictureCloseElement(evt);

});

showMoreCommentsButtonElement.addEventListener('click', (evt) => {showMoreComments(evt);
});


export {renderComment, renderComments, showBigPicture};
