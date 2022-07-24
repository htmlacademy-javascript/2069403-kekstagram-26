import { showErrorUploadMessage } from './error-messages.js';
import { isEscapeKey, isUnique } from './utile.js';
import { showSuccessMessage } from './error-messages.js';
import { sendData } from './api.js';
import { getDefaultForm } from './open-submit-form.js';


const HASHTAG_START = '#';
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 19;
const COMMENT_MAX_LENGTH = 140;
const tagRegexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const maxHashtagNumber = 5;

const uploadFileForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadFileForm.querySelector('[name="hashtags"]');
const commentInput = uploadFileForm.querySelector('[name="description"]');
const submitButton = uploadFileForm.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadFileForm, {
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
});


const serializeHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const getServerDataSuccess = (response) => {
  if(response.ok) {
    unblockSubmitButton();
    showSuccessMessage();
    uploadFileForm.reset();
    getDefaultForm();
  }
};

const getFormSubmit = () => {
  uploadFileForm.addEventListener('submit', (evt) => {
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

pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).length <= maxHashtagNumber, 'Допускается не более пяти хэштегов' );


pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).every((item) => item.startsWith(HASHTAG_START)), 'Хэштег должен начинаться с символа #' );


pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).every((item) => item.length >= HASHTAG_MIN_LENGTH && item.length <= HASHTAG_MAX_LENGTH), 'Максимальная длина - 20 символов, минимальная - 2');


pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).every((item) => tagRegexp.test(item)), 'Хэштег должен состоять только из букв и цифр');

pristine.addValidator(hashtagInput, (value) => isUnique(serializeHashtags(value)), 'Хэштеги не могут повторяться');


pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, 'Максимальная длина комментария - 140 символов' );

hashtagInput.addEventListener('keydown', onStopPropagationEsc);

commentInput.addEventListener('keydown', onStopPropagationEsc);

export {getFormSubmit, unblockSubmitButton};
