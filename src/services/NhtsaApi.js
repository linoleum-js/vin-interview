
import Storage from './Storage';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/';

export default class NhtsaApi {
  static getDataByVin(vin, callbacks) {
    const data = Storage.get(vin);
    if (data) {
      callbacks.complete(data);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + `vehicles/decodevin/${vin}?format=json`, true);
    xhr.addEventListener('progress', (event) => {
      const done = event.loaded / event.total;
      if (done === 1) {
        const data = JSON.parse(xhr.response);
        callbacks.complete(data);
        Storage.set(vin, data);
      }
      callbacks.progress(done);
    })
    xhr.send(null);
  }
}
