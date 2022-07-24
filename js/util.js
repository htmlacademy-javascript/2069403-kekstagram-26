const ESCAPE_KEY = 'Escape';

const isEscapeKey = (evt) =>  evt.key === ESCAPE_KEY;

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isUnique = (hashTagList) => new Set(hashTagList).size === hashTagList.length;

const shuffleArrayPictures = (photoList) => {
  for (let i = photoList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photoList[i], photoList[j]] = [photoList[j], photoList[i]];
  }
};

export {isEscapeKey, debounce, shuffleArrayPictures, isUnique};
