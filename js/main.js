// import { getData, sendData } from './api.js';
import { getData } from './api.js';
import { showErrorUploadMessage } from './error-messages.js';
import { getFormSubmit } from './form-validation.js';
import { uploadFile } from './open-submit-form.js';
import { initChangeEffects, makePictureBigger, makePictureSmaller} from'./photo-effects.js';
import { renderPhotos } from './thumbnails.js';


uploadFile();
makePictureBigger();
makePictureSmaller();
initChangeEffects();
getFormSubmit();
getData(renderPhotos, showErrorUploadMessage);
