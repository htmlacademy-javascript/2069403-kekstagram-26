import { isEscapeKey } from './utile.js';

const uploadFileForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadFileForm.querySelector('[name="hashtags"]');
const commentInput = uploadFileForm.querySelector('[name="description"]');

const pristine = new Pristine(uploadFileForm, {
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
});

const isUnique = (arr) => new Set(arr).size === arr.length;

const serializeHastangs = (value) => value.trim().toLowerCase().split(/\s+/);


pristine.addValidator(hashtagInput, (value) => serializeHastangs(value).length <= 5, 'Допускается не более пяти хэштегов' );

pristine.addValidator(hashtagInput, (value) => serializeHastangs(value).every((item) => item.startsWith('#')), 'Хэштег должен начинаться с символа #' );

pristine.addValidator(hashtagInput, (value) => serializeHastangs(value).every((item) => item.length >= 2 && item.length <= 19), 'Максимальная длина - 20 символов, минимальная - 2');

pristine.addValidator(hashtagInput, (value) => serializeHastangs(value).every((item) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item)), 'Хэштег должен состоять только из букв и цифр');

pristine.addValidator(hashtagInput, (value) => isUnique(serializeHastangs(value)), 'Хэштеги не могут повторяться');

pristine.addValidator(commentInput, (value) => value.length <= 140, 'Максимальная длина комментария - 140 символов' );

const getFormSubmit = () => {
  uploadFileForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

const stopPropagationEsc = (evt) => {
  if(isEscapeKey) {
    evt.stopPropagation();
  }
};

hashtagInput.addEventListener('keydown', (evt) => {
  stopPropagationEsc(evt);
});

commentInput.addEventListener('keydown', (evt) => {
  stopPropagationEsc(evt);
});

export {getFormSubmit};
