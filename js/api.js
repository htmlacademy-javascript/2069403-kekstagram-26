import { showErrorLoadMessage } from './error-messages.js';
import { renderPhotos } from './thumbnails.js';
import { showSuccessMessage, showErrorUploadMessage } from './error-messages.js';
import { getSliderValue } from './photo-effects.js';
import { closeUploadForm } from './open-submit-form.js';

const uploadFileForm = document.querySelector('.img-upload__form');
const imageUploadPreview = uploadFileForm.querySelector('.img-upload__preview');


const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onFail);
};

const renderedServerData = (photos) => {
  renderPhotos(photos);
};

const errorRenderedServerData = (error) => {
  showErrorLoadMessage(error);
};

getData(renderedServerData, errorRenderedServerData);


const sendData = (FormData, onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: FormData,
    }
  )
    .then(onSuccess)
    .catch(onError);
};


const getSurverDataSuccess = (response) => {
  if(response.ok) {
    showSuccessMessage();
    closeUploadForm();
    uploadFileForm.reset();
    imageUploadPreview.style.filter = '';
    imageUploadPreview.style.transform = 'scale(100%)';
    getSliderValue();
  }
};

const getSurverDataFail = (err) => {
  showErrorUploadMessage(err);
};


export {getData, sendData, getSurverDataSuccess, getSurverDataFail};
