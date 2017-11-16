
import StorageService from './StorageService';
import ConnectionState from './ConnectionState';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/';

export default class NhtsaApi {
  /**
   * @param {string} vin
   * @param {Function} callbacks.progress - called on every onprogress event
   * @param {Function} callbacks.complete - called once, when request is complete
   */
  static getDataByVin(vin, callbacks) {
    const data = StorageService.get(vin);
    // check out local cash
    if (data) {
      callbacks.complete(data);
      return;
    }

    if (!ConnectionState.isOnline()) {
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + `vehicles/decodevin/${vin}?format=json`, true);
    xhr.addEventListener('progress', (event) => {
      const done = event.loaded / event.total;
      if (done === 1) {
        const data = JSON.parse(xhr.response);
        callbacks.complete(data);
        // save to the local cash
        StorageService.set(vin, data);
      }
      callbacks.progress(done);
    })
    xhr.send(null);
  }
}
