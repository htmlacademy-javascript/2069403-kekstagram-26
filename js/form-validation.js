import { showErrorUploadMessage } from './error-messages.js';
import { isEscapeKey, isUnique } from './util.js';
import { showSuccessMessage } from './error-messages.js';
import { sendData } from './api.js';
import { getDefaultForm } from './open-submit-form.js';


const HASHTAG_START = '#';
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 19;
const COMMENT_MAX_LENGTH = 140;
const tagRegexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const maxHashtagNumber = 5;

const uploadFileFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = uploadFileFormElement.querySelector('[name="hashtags"]');
const commentInputElement = uploadFileFormElement.querySelector('[name="description"]');
const submitButtonElement = uploadFileFormElement.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadFileFormElement, {
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
});


const serializeHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const getServerDataSuccess = (response) => {
  if(response.ok) {
    unblockSubmitButton();
    showSuccessMessage();
    uploadFileFormElement.reset();
    getDefaultForm();
  }
};

const getFormSubmit = () => {
  uploadFileFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData, getServerDataSuccess, showErrorUploadMessage);
    }
  });
};


const onStopPropagationEsc = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

pristine.addValidator(hashtagInputElement, (value) => serializeHashtags(value).length <= maxHashtagNumber, 'Допускается не более пяти хэштегов' );


pristine.addValidator(hashtagInputElement, (value) => serializeHashtags(value).every((item) => item.startsWith(HASHTAG_START)), 'Хэштег должен начинаться с символа #' );


pristine.addValidator(hashtagInputElement, (value) => serializeHashtags(value).every((item) => item.length >= HASHTAG_MIN_LENGTH && item.length <= HASHTAG_MAX_LENGTH), 'Максимальная длина - 20 символов, минимальная - 2');


pristine.addValidator(hashtagInputElement, (value) => serializeHashtags(value).every((item) => tagRegexp.test(item)), 'Хэштег должен состоять только из букв и цифр');

pristine.addValidator(hashtagInputElement, (value) => isUnique(serializeHashtags(value)), 'Хэштеги не могут повторяться');


pristine.addValidator(commentInputElement, (value) => value.length <= COMMENT_MAX_LENGTH, 'Максимальная длина комментария - 140 символов' );

hashtagInputElement.addEventListener('keydown', onStopPropagationEsc);

commentInputElement.addEventListener('keydown', onStopPropagationEsc);

export {getFormSubmit, unblockSubmitButton};
