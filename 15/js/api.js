const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onFail);
};


const sendData = (FormData, onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: FormData,
    }
  )
    .then(onSuccess)
    .catch(onError);
};


export {getData, sendData};
