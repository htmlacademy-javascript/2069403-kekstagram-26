import { isEscapeKey } from './utile.js';

const loadErrorPopUpTemplate = document.querySelector('#error-load').content;
const uploadErrorPopUpTemplate = document.querySelector('#error').content;
const uploadSuccessPopUp = document.querySelector('#success').content.querySelector('.success');
const successPopup = uploadSuccessPopUp.cloneNode(true);

const closeSuccessPopUp = () => {
  successPopup.remove();
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

const showSuccessMessage = () => {
  // document.querySelector('body').insertAdjacentHTML('beforeend', successPopup);
  document.body.append(successPopup);

  onSuccessMessageButton();
  onSuccessMessageEscKey();
  onDocumentClick();
};

const showErrorLoadMessage = () => {
  const loadErrorPopUp = loadErrorPopUpTemplate.cloneNode(true);
  document.body.append(loadErrorPopUp);
};

const showErrorUploadMessage = () => {
  const uloadErrorPopUp = uploadErrorPopUpTemplate.cloneNode(true);
  document.body.append(uloadErrorPopUp);
};


export {showErrorLoadMessage, showErrorUploadMessage, showSuccessMessage };
