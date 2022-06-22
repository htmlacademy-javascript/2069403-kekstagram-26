const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');


const renderPhotos = (photos) => {
  const similarPhotoFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const photoItem = thumbnailTemplateContainer.cloneNode(true);
    photoItem.querySelector('.picture__img').src = url;
    photoItem.querySelector('.picture__likes').textContent = likes;
    photoItem.querySelector('.picture__comments').textContent = comments.length;
    similarPhotoFragment.appendChild(photoItem);
  });
  picturesContainer.appendChild(similarPhotoFragment);
};

export {renderPhotos};
