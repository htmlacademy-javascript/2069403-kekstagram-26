import { closeErrorPopUp } from './error-messages.js';
import { isEscapeKey } from './utile.js';
import { getSliderValue } from './photo-effects.js';

const uploadFileForm = document.querySelector('.img-upload__form');
const imageUploadField = document.querySelector('#upload-file');
const scrollBackground = document.querySelector('body');
const imageUploadPreview = uploadFileForm.querySelector('.img-upload__preview');
const uploadImageCancel = uploadFileForm.querySelector('#upload-cancel');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const changeDefaultPhoto = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if(matches) {
      imageUploadPreview.querySelector('img').src = URL.createObjectURL(file);
    }
  });
};

const closeUploadForm = () => {
  uploadFileForm.reset();
  scrollBackground.classList.remove('modal-open');
  uploadFileForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.removeEventListener('keydown', onEditPhotoEscpaeKey);
};

function onEditPhotoEscpaeKey(evt) {
  if (isEscapeKey(evt)) {
    if (!document.querySelector('.error')) {
      closeUploadForm(evt);
    }
    closeErrorPopUp();
  }
}

const uploadFile = () => {
  changeDefaultPhoto();
  imageUploadField.addEventListener('change', () => {
    uploadFileForm.querySelector('.img-upload__overlay').classList.remove('hidden');
    scrollBackground.classList.add('modal-open');
    document.addEventListener('keydown', onEditPhotoEscpaeKey);
  });
};

const getDefaultForm = () => {
  imageUploadPreview.style.filter = '';
  imageUploadPreview.style.transform = 'scale(100%)';
  getSliderValue();
};

uploadImageCancel.addEventListener('click', (evt) => {
  closeUploadForm(evt);
  uploadFileForm.reset();
  getDefaultForm();
});

export {uploadFile, onEditPhotoEscpaeKey, closeUploadForm, getDefaultForm};
