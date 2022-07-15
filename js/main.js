// import { getData, sendData } from './api.js';
import { getFormSubmit } from './form-validation.js';
import { uploadFile } from './open-submit-form.js';
import { initChangeEffects, makePictureBigger, makePictureSmaller} from'./photo-effects.js';


// const randomPhotos = createPhotos();
// renderPhotos(randomPhotos);
uploadFile();
makePictureBigger();
makePictureSmaller();
initChangeEffects();
getFormSubmit();
