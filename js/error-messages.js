import { unblockSubmitButton } from './form-validation.js';
import { closeUploadForm, onEditPhotoEscpaeKey } from './open-submit-form.js';
import { isEscapeKey } from './util.js';

const uploadErrorPopUpElement = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessPopUpElement = document.querySelector('#success').content.querySelector('.success');
const errorPopUpElement = uploadErrorPopUpElement.cloneNode(true);
const successPopupElement = uploadSuccessPopUpElement.cloneNode(true);

const onCloseSuccessPopUp = () => {
  document.querySelectorAll('.success').forEach((element) => element.remove());
};

const onSuccessMessageButton = () => {
  const successButtonElement = document.body.querySelector('.success__button');
  successButtonElement.addEventListener('click', onCloseSuccessPopUp);
};

const onDocumentClick = () => {
  document.addEventListener('click', onCloseSuccessPopUp);
};

const onSuccessMessageEscKey = () => {
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      onCloseSuccessPopUp();
    }
  });
};

const onCloseErrorPopUp = () => {
  document.querySelectorAll('.error').forEach((element) => element.remove());
};

const onErrorMessageButton = () => {
  const errorButtonElement = document.querySelector('.error__button');
  errorButtonElement.addEventListener('click', onCloseErrorPopUp);
};


const onDocumentErrorClick = () => {
  document.addEventListener('click', onCloseErrorPopUp);
};


const showErrorLoadMessage = () => {
  errorPopUpElement.querySelector('.error__title').textContent = 'Упс, что-то пошло не так';
  errorPopUpElement.querySelector('.error__button').classList.add('hidden');
  document.body.append(errorPopUpElement);
};

const showSuccessMessage = (evt) => {
  document.body.append(successPopupElement);

  onSuccessMessageButton();
  onSuccessMessageEscKey();
  onDocumentClick();
  closeUploadForm(evt);
};

const showErrorUploadMessage = (evt) => {
  unblockSubmitButton();
  document.body.append(errorPopUpElement);
  onErrorMessageButton();
  onEditPhotoEscpaeKey(evt);
  onDocumentErrorClick();
};


export {showErrorLoadMessage, showErrorUploadMessage, showSuccessMessage, onCloseErrorPopUp};
