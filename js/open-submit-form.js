import { closeErrorPopUp } from './error-messages.js';
import { isEscapeKey } from './utile.js';

const uploadFileForm = document.querySelector('.img-upload__form');
const imageUploadField = document.querySelector('#upload-file');
const scrollBackground = document.querySelector('body');
const uploadImageCancel = uploadFileForm.querySelector('.img-upload__cancel');

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
  imageUploadField.addEventListener('change', () => {
    uploadFileForm.querySelector('.img-upload__overlay').classList.remove('hidden');
    scrollBackground.classList.add('modal-open');
    document.addEventListener('keydown', onEditPhotoEscpaeKey);
  });
};

uploadImageCancel.addEventListener('click', (evt) => {
  closeUploadForm(evt);
});

export {uploadFile, onEditPhotoEscpaeKey, closeUploadForm};
