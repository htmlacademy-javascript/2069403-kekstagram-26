import { showFilteredGallery } from './filters.js';
import { getFormSubmit } from './form-validation.js';
import { uploadFile } from './open-submit-form.js';
import { initChangeEffects, makePictureBigger, makePictureSmaller} from'./photo-effects.js';


uploadFile();
makePictureBigger();
makePictureSmaller();
initChangeEffects();
getFormSubmit();
showFilteredGallery();
