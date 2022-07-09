const uploadFileForm = document.querySelector('.img-upload__form');
const imageUploadPreview = uploadFileForm.querySelector('.img-upload__preview');
const scaleControlDecrease = uploadFileForm.querySelector('.scale__control--smaller');
const scaleControlIncrease = uploadFileForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadFileForm.querySelector('.scale__control--value');
const photoEffects = uploadFileForm.querySelectorAll('.effects__radio');
const effectLevelSlider = uploadFileForm.querySelector('.effect-level__slider');
const effectLevelSliderValue = uploadFileForm.querySelector('.effect-level__value');

const getIntegerValue = () => parseFloat(scaleControlValue.value);

const IMAGE_SCALE_CHANGE_STEP = 25;
const IMAGE_MAX_SCALE = 100;
const IMAGE_MIN_SCALE = 25;

const makePictureSmaller = () => {
  scaleControlDecrease.addEventListener('click', () => {
    const imageInitialScale = getIntegerValue();
    if(imageInitialScale <= IMAGE_MAX_SCALE && imageInitialScale > IMAGE_MIN_SCALE) {
      const imageDecreasedCurrentScale = imageInitialScale - IMAGE_SCALE_CHANGE_STEP;
      imageUploadPreview.style.transform = `scale(${imageDecreasedCurrentScale * 0.01})`;
      scaleControlValue.value = `${imageDecreasedCurrentScale  }%`;
    }
  });
};


const makePictureBigger = () => {
  scaleControlIncrease.addEventListener('click', () => {
    const imageInitialScale = getIntegerValue();
    if(imageInitialScale < IMAGE_MAX_SCALE && imageInitialScale >= IMAGE_MIN_SCALE ) {
      const imageIncreasedCurrentScale = imageInitialScale + IMAGE_SCALE_CHANGE_STEP;
      imageUploadPreview.style.transform = `scale(${imageIncreasedCurrentScale * 0.01})`;
      scaleControlValue.value = `${imageIncreasedCurrentScale  }%`;
    }
  });
};


const changeEffect = () => {
  photoEffects.forEach((photoEffect) =>
    photoEffect.addEventListener('change', () => {
      const selected = uploadFileForm.querySelector('input[name="effect"]:checked');
      imageUploadPreview.classList = `img-upload__preview effects__preview--${selected}`;
    })
  );
};

changeEffect();


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 1,
    max: 10,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
},
);


const getSliderValue = () => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelSliderValue.value = effectLevelSlider.noUiSlider.get();
    const selectedFilter = uploadFileForm.querySelector('input[name="effect"]:checked').value;
    if(selectedFilter === 'chrome') {
      imageUploadPreview.style.filter = `grayscale(${effectLevelSliderValue.value})`;
    }
    else if(selectedFilter === 'sepia') {
      imageUploadPreview.style.filter = `sepia(${effectLevelSliderValue.value})`;
    }
    else if(selectedFilter === 'marvin') {
      imageUploadPreview.style.filter = `invert(${effectLevelSliderValue.value}%)`;
    } else if(selectedFilter === 'phobos') {
      imageUploadPreview.style.filter = `blur(${effectLevelSliderValue.value}px)`;
    } else if(selectedFilter === 'heat') {
      imageUploadPreview.style.filter = `brightness(${effectLevelSliderValue.value})`;
    } else if(selectedFilter === 'none') {
      effectLevelSlider.classList.add('hidden');
    }
  });
};

getSliderValue();


const changeEffectLevel = () => {
  for(const photoEffect of photoEffects) {
    photoEffect.addEventListener('change', () => {
      effectLevelSlider.classList.remove('hidden');
      if(photoEffect.value === 'chrome' || photoEffect.value === 'sepia' ) {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.set(1);
      } else if(photoEffect.value === 'marvin' ) {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.set(100);
      } else if(photoEffect.value === 'phobos') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.set(3);
      } else if(photoEffect.value === 'heat') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.set(3);
      } else if(photoEffect.value === 'none') {
        imageUploadPreview.style.filter = '';
        effectLevelSlider.classList.add('hidden');
      }
    });
  }
};

changeEffectLevel();

export {makePictureBigger, makePictureSmaller, changeEffect, changeEffectLevel};
