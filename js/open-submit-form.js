import { onCloseErrorPopUp } from './error-messages.js';
import { isEscapeKey } from './util.js';
import { getSliderValue } from './photo-effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFileFormElement = document.querySelector('.img-upload__form');
const imageUploadFieldElement = document.querySelector('#upload-file');
const scrollBackgroundElement = document.querySelector('body');
const imageUploadPreviewElement = uploadFileFormElement.querySelector('.img-upload__preview');
const uploadImageCancelElement = uploadFileFormElement.querySelector('#upload-cancel');
const fileChooserElement = document.querySelector('.img-upload__start input[type=file]');

const changeDefaultPhoto = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if(matches) {
      imageUploadPreviewElement.querySelector('img').src = URL.createObjectURL(file);
    }
  });
};

const closeUploadForm = () => {
  uploadFileFormElement.reset();
  scrollBackgroundElement.classList.remove('modal-open');
  uploadFileFormElement.querySelector('.img-upload__overlay').classList.add('hidden');
  document.removeEventListener('keydown', onEditPhotoEscpaeKey);
};

function onEditPhotoEscpaeKey(evt) {
  if (isEscapeKey(evt)) {
    if (!document.querySelector('.error')) {
      closeUploadForm(evt);
    }
    onCloseErrorPopUp();
  }
}

const uploadFile = () => {
  changeDefaultPhoto();
  imageUploadFieldElement.addEventListener('change', () => {
    uploadFileFormElement.querySelector('.img-upload__overlay').classList.remove('hidden');
    scrollBackgroundElement.classList.add('modal-open');
    document.addEventListener('keydown', onEditPhotoEscpaeKey);
  });
};

const getDefaultForm = () => {
  imageUploadPreviewElement.style.filter = '';
  imageUploadPreviewElement.style.transform = 'scale(100%)';
  getSliderValue();
};

uploadImageCancelElement.addEventListener('click', (evt) => {
  closeUploadForm(evt);
  uploadFileFormElement.reset();
  getDefaultForm();
});

export {uploadFile, onEditPhotoEscpaeKey, closeUploadForm, getDefaultForm};
