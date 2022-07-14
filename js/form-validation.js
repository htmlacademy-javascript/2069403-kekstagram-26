import { showSuccessMessage, showUploadMessage } from './error-messages.js';
import { isEscapeKey } from './utile.js';

const HASHTAG_START = '#';
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 19;

const uploadFileForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadFileForm.querySelector('[name="hashtags"]');
const commentInput = uploadFileForm.querySelector('[name="description"]');

const pristine = new Pristine(uploadFileForm, {
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
});

const isUnique = (arr) => new Set(arr).size === arr.length;

const serializeHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const getFormSubmit = (onSuccess) => {
  uploadFileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch('https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        }
      ).then((response) => {
        if(response.ok) {
          showSuccessMessage();
          onSuccess();
        }
      }).catch((error) =>
        showUploadMessage(error));
    }
  });
};

const stopPropagationEsc = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).length <= 5, 'Допускается не более пяти хэштегов' );


pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).every((item) => item.startsWith(HASHTAG_START)), 'Хэштег должен начинаться с символа #' );


pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).every((item) => item.length >= HASHTAG_MIN_LENGTH && item.length <= HASHTAG_MAX_LENGTH), 'Максимальная длина - 20 символов, минимальная - 2');

const tagRegexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
pristine.addValidator(hashtagInput, (value) => serializeHashtags(value).every((item) => tagRegexp.test(item)), 'Хэштег должен состоять только из букв и цифр');

pristine.addValidator(hashtagInput, (value) => isUnique(serializeHashtags(value)), 'Хэштеги не могут повторяться');

const COMMENT_MAX_LENGTH = 140;
pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, 'Максимальная длина комментария - 140 символов' );

hashtagInput.addEventListener('keydown', stopPropagationEsc);

commentInput.addEventListener('keydown', stopPropagationEsc);

export {getFormSubmit};
