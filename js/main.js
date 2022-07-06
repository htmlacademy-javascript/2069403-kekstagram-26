import {createPhotos} from './data.js';
import { getFormSubmit } from './form-validation.js';
import { uploadFile } from './open-submit-form.js';
import {renderPhotos} from './thumbnails.js';


const randomPhotos = createPhotos();
renderPhotos(randomPhotos);
uploadFile();
getFormSubmit();
