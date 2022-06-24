import {createPhotos} from './data.js';
import {renderPhotos} from './thumbnails.js';
import { getFullSize } from './fullSizePicture.js';

const randomPhotos = createPhotos();
renderPhotos(randomPhotos);

const randomPictures = document.querySelectorAll('.picture');
getFullSize(randomPictures);
