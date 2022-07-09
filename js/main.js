import {createPhotos} from './data.js';
import { getFormSubmit } from './form-validation.js';
import { uploadFile } from './open-submit-form.js';
import { changeEffect, changeEffectLevel, makePictureBigger, makePictureSmaller } from'./photo-effects.js';
import {renderPhotos} from './thumbnails.js';


const randomPhotos = createPhotos();
renderPhotos(randomPhotos);
uploadFile();
getFormSubmit();
makePictureBigger();
makePictureSmaller();
changeEffect();
changeEffectLevel();
