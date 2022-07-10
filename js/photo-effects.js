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

const changeImageScale = (step) => {
  const imageInitialScale = getIntegerValue() + step;
  if(imageInitialScale <= IMAGE_MAX_SCALE && imageInitialScale >= IMAGE_MIN_SCALE) {
    imageUploadPreview.style.transform = `scale(${imageInitialScale / 100})`;
    scaleControlValue.value = `${imageInitialScale }%`;
  }
};

const makePictureSmaller = () => {
  scaleControlDecrease.addEventListener('click', () => changeImageScale(-IMAGE_SCALE_CHANGE_STEP));
};

const makePictureBigger = () => {
  scaleControlIncrease.addEventListener('click', () => changeImageScale(IMAGE_SCALE_CHANGE_STEP));
};

// const makePictureSmaller = () => {
//   scaleControlDecrease.addEventListener('click', () => {
//     const imageInitialScale = getIntegerValue();
//     if(imageInitialScale <= IMAGE_MAX_SCALE && imageInitialScale > IMAGE_MIN_SCALE) {
//       const imageDecreasedCurrentScale = imageInitialScale - IMAGE_SCALE_CHANGE_STEP;
//       imageUploadPreview.style.transform = `scale(${imageDecreasedCurrentScale * 0.01})`;
//       scaleControlValue.value = `${imageDecreasedCurrentScale  }%`;
//     }
//   });
// };


// const makePictureBigger = () => {
//   scaleControlIncrease.addEventListener('click', () => {
//     const imageInitialScale = getIntegerValue();
//     if(imageInitialScale < IMAGE_MAX_SCALE && imageInitialScale >= IMAGE_MIN_SCALE ) {
//       const imageIncreasedCurrentScale = imageInitialScale + IMAGE_SCALE_CHANGE_STEP;
//       imageUploadPreview.style.transform = `scale(${imageIncreasedCurrentScale * 0.01})`;
//       scaleControlValue.value = `${imageIncreasedCurrentScale  }%`;
//     }
//   });
// };


const initChangeEffects = () => {
  photoEffects.forEach((photoEffect) =>
    photoEffect.addEventListener('change', () => {
      const selected = uploadFileForm.querySelector('input[name="effect"]:checked');
      imageUploadPreview.classList = `img-upload__preview effects__preview--${selected}`;
    })
  );
};


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 1,
    max: 10,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
},
);


const getSliderValue = () => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelSliderValue.value = effectLevelSlider.noUiSlider.get();
    const selectedFilter = uploadFileForm.querySelector('input[name="effect"]:checked').value;
    switch(selectedFilter) {
      case 'chrome':
        imageUploadPreview.style.filter = `grayscale(${effectLevelSliderValue.value})`;
        break;
      case 'sepia':
        imageUploadPreview.style.filter = `sepia(${effectLevelSliderValue.value})`;
        break;
      case 'marvin':
        imageUploadPreview.style.filter = `invert(${effectLevelSliderValue.value}%)`;
        break;
      case 'phobos':
        imageUploadPreview.style.filter = `blur(${effectLevelSliderValue.value}px)`;
        break;
      case 'heat':
        imageUploadPreview.style.filter = `brightness(${effectLevelSliderValue.value})`;
        break;
      case 'none':
        effectLevelSlider.classList.add('hidden');
        break;
    }
  });
};


const effectsSettings = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    connect: 'lower',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    connect: 'lower',
  },
};


const changeEffectLevel = () => {
  for(const photoEffect of photoEffects) {
    photoEffect.addEventListener('change', () => {
      const settings = effectsSettings[photoEffect.value];
      if (settings) {
        effectLevelSlider.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions(settings);
        effectLevelSlider.noUiSlider.set(settings.range.max);
      } else if(photoEffect.value === 'none') {
        imageUploadPreview.style.filter = '';
        effectLevelSlider.classList.add('hidden');
      }
    });
  }
};


export {makePictureBigger, makePictureSmaller, initChangeEffects, changeEffectLevel, getSliderValue};
