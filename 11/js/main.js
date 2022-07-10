import {createPhotos} from './data.js';
import { getFormSubmit } from './form-validation.js';
import { uploadFile } from './open-submit-form.js';
import { initChangeEffects, makePictureBigger, makePictureSmaller, changeEffectLevel,getSliderValue} from'./photo-effects.js';
import {renderPhotos} from './thumbnails.js';


const randomPhotos = createPhotos();
renderPhotos(randomPhotos);
uploadFile();
getFormSubmit();
makePictureBigger();
makePictureSmaller();
initChangeEffects();
changeEffectLevel();
getSliderValue();
