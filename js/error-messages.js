import { isEscapeKey } from './utile.js';

const uploadErrorPopUp = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessPopUp = document.querySelector('#success').content.querySelector('.success');
const successPopup = uploadSuccessPopUp.cloneNode(true);
const errorPopUp = uploadErrorPopUp.cloneNode(true);

const closeSuccessPopUp = () => {
  document.querySelectorAll('.success').forEach((element) => element.remove());
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
  document.querySelectorAll('.error').forEach((element) => element.remove());
};

const onErrorMessageButton = () => {
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorPopUp);
};

const onErrorMessageEscKey = () => {
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      closeErrorPopUp();
    }
  });
};

const onDocumentErrorClick = () => {
  document.addEventListener('click', () => {
    closeErrorPopUp();
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
  errorPopUp.querySelector('.error__title').textContent = 'Упс, что-то пошло не так';
  errorPopUp.querySelector('.error__button').classList.add('hidden');
  document.body.append(errorPopUp);
};

const showErrorUploadMessage = () => {
  document.body.append(errorPopUp);

  onErrorMessageButton();
  onErrorMessageEscKey();
  onDocumentErrorClick();
};


export {showErrorLoadMessage, showErrorUploadMessage, showSuccessMessage };
