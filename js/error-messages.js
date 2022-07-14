import { isEscapeKey } from './utile.js';

const loadErrorPopUpTemplate = document.querySelector('#error-load').content;
const uploadErrorPopUpTemplate = document.querySelector('#error').content;
const uploadSuccessPopUpTemplate = document.querySelector('#success').content;

const closeSuccessPopUp = () => {
  const uploadErrorPopUp = document.body.querySelector('.success');
  uploadErrorPopUp.remove();
};

const onSuccessMessageButton = () => {
  const successButton = document.body.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    closeSuccessPopUp();
  });
};

const onDocumentClick = () => {
  document.addEventListener('click', () => {
    closeSuccessPopUp();
  });
};

const onSuccessMessageEscKey = () => {
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      closeSuccessPopUp();
    }
  });
};

const showErrorLoadMessage = () => {
  const loadErrorPopUp = loadErrorPopUpTemplate.cloneNode(true);
  document.body.append(loadErrorPopUp);
};

const showSuccessMessage = () => {
  const successPopup = uploadSuccessPopUpTemplate.cloneNode(true);
  // document.querySelector('body').insertAdjacentHTML('beforeend', successPopup);
  document.body.append(successPopup);

  onSuccessMessageButton();
  onSuccessMessageEscKey();
  onDocumentClick();
};


const showUploadMessage = () => {
  const uloadErrorPopUp = uploadErrorPopUpTemplate.cloneNode(true);
  document.body.append(uloadErrorPopUp);
};


export {showErrorLoadMessage, showUploadMessage, showSuccessMessage };
