import { showErrorLoadMessage } from './error-messages.js';
import { getFormSubmit } from './form-validation.js';
import { closeUploadForm } from './open-submit-form.js';
import { renderPhotos } from './thumbnails.js';

const getData = () => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) =>
      renderPhotos(photos)
    )
    .catch((error) =>
      showErrorLoadMessage(error)
    );
};

const sendData = () => {
  getFormSubmit(closeUploadForm);
};


export {getData, sendData};
