
const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/';

export default class NhtsaApi {
  static getDataByVin(vin, callbacks) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + `vehicles/decodevin/${vin}?format=json`, true);
    xhr.addEventListener('progress', (event) => {
      const done = event.loaded / event.total;
      if (done === 1) {
        callbacks.complete(xhr.response);
      }
      callbacks.progress(done);
    })
    xhr.send(null);
  }
}