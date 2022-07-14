import { isEscapeKey } from './utile.js';

const loadErrorPopUpTemplate = document.querySelector('#error-load').content;
const uploadErrorPopUp = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessPopUp = document.querySelector('#success').content.querySelector('.success');
const successPopup = uploadSuccessPopUp.cloneNode(true);
const errorPopUp = uploadErrorPopUp.cloneNode(true);

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

const closeErrorPopUp = () => {
  errorPopUp.remove();
};

const onErrorMessageButton = () => {
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    closeErrorPopUp();
  });
};

const onErrorMessageEscKey = () => {
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      if(!(document.querySelector('body').lastChild.classList === 'error')) {
        evt.stopPropagation();
      }
      closeErrorPopUp();
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
  document.body.append(errorPopUp);

  onErrorMessageButton();
  onErrorMessageEscKey();
};


export {showErrorLoadMessage, showErrorUploadMessage, showSuccessMessage };
