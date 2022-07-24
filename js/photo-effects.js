const IMAGE_SCALE_CHANGE_STEP = 25;
const IMAGE_MAX_SCALE = 100;
const IMAGE_MIN_SCALE = 25;


const uploadFileFormElement = document.querySelector('.img-upload__form');
const imageUploadPreviewElement = uploadFileFormElement.querySelector('.img-upload__preview');
const scaleControlDecreaseElement = uploadFileFormElement.querySelector('.scale__control--smaller');
const scaleControlIncreaseElement = uploadFileFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = uploadFileFormElement.querySelector('.scale__control--value');
const photoEffectsElement = uploadFileFormElement.querySelectorAll('.effects__radio');
const effectLevelSliderElement = uploadFileFormElement.querySelector('.effect-level__slider');
const imgUploadSliderElement = uploadFileFormElement.querySelector('.img-upload__effect-level');
const effectLevelSliderValueElement = uploadFileFormElement.querySelector('.effect-level__value');


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

const getIntegerValue = () => parseFloat(scaleControlValueElement.value);


const changeImageScale = (step) => {
  const imageInitialScale = getIntegerValue() + step;
  if(imageInitialScale <= IMAGE_MAX_SCALE && imageInitialScale >= IMAGE_MIN_SCALE) {
    imageUploadPreviewElement.style.transform = `scale(${imageInitialScale / 100})`;
    scaleControlValueElement.value = `${imageInitialScale }%`;
  }
};

const makePictureSmaller = () => {
  scaleControlDecreaseElement.addEventListener('click', () => changeImageScale(-IMAGE_SCALE_CHANGE_STEP));
};

const makePictureBigger = () => {
  scaleControlIncreaseElement.addEventListener('click', () => changeImageScale(IMAGE_SCALE_CHANGE_STEP));
};

const getSliderValue = () => {
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelSliderValueElement.value = effectLevelSliderElement.noUiSlider.get();
    const selectedFilterElement = uploadFileFormElement.querySelector('input[name="effect"]:checked').value;
    switch(selectedFilterElement) {
      case 'chrome':
        imageUploadPreviewElement.style.filter = `grayscale(${effectLevelSliderValueElement.value})`;
        break;
      case 'sepia':
        imageUploadPreviewElement.style.filter = `sepia(${effectLevelSliderValueElement.value})`;
        break;
      case 'marvin':
        imageUploadPreviewElement.style.filter = `invert(${effectLevelSliderValueElement.value}%)`;
        break;
      case 'phobos':
        imageUploadPreviewElement.style.filter = `blur(${effectLevelSliderValueElement.value}px)`;
        break;
      case 'heat':
        imageUploadPreviewElement.style.filter = `brightness(${effectLevelSliderValueElement.value})`;
        break;
      case 'none':
        imgUploadSliderElement.classList.add('hidden');
        break;
    }
  });
};

const changeEffectLevel = () => {
  photoEffectsElement.forEach((photoEffectElement) =>
    photoEffectElement.addEventListener('change', () => {
      const settings = effectsSettings[photoEffectElement.value];
      if (settings) {
        imgUploadSliderElement.classList.remove('hidden');
        effectLevelSliderElement.noUiSlider.updateOptions(settings);
        effectLevelSliderElement.noUiSlider.set(settings.range.max);
        return;
      }
      imageUploadPreviewElement.style.filter = '';
      imgUploadSliderElement.classList.add('hidden');
    })
  );
};

const initChangeEffects = () => {
  getSliderValue();
  changeEffectLevel();
  photoEffectsElement.forEach((photoEffectElement) =>
    photoEffectElement.addEventListener('change', () => {
      const selectedElement = uploadFileFormElement.querySelector('input[name="effect"]:checked');
      imageUploadPreviewElement.classList = `img-upload__preview effects__preview--${selectedElement}`;
    })
  );
};

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 1,
    max: 10,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(!Number.isInteger(value)),
    from: (value) => parseFloat(value),
  },
},
);


export {makePictureBigger, makePictureSmaller, initChangeEffects, getSliderValue};
