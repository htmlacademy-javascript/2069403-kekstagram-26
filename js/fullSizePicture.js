const getFullSize = (smallSizePhotos) => {
  smallSizePhotos.forEach((smallSizePhoto) => {
    smallSizePhoto.addEventListener('click', () => {
      const bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');
    });
  });
};

export {getFullSize};
