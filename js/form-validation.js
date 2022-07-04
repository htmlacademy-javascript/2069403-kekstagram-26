const uploadFileForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadFileForm.querySelector('[name="hashtags"]');

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

const getFormSubmit = () => {
  uploadFileForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export {getFormSubmit};
