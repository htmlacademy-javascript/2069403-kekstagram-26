import { getData, sendData } from './api.js';
import { uploadFile } from './open-submit-form.js';
import { initChangeEffects, makePictureBigger, makePictureSmaller} from'./photo-effects.js';


// const randomPhotos = createPhotos();
// renderPhotos(randomPhotos);
uploadFile();
makePictureBigger();
makePictureSmaller();
initChangeEffects();
getData();
sendData();
