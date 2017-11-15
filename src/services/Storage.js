
const STORAGE_KEY = 'VIN_APP_STORAGE_KEY';

const getStorageData = () => {
  let storageTextData = localStorage[STORAGE_KEY];
  let storageData;
  if (storageTextData) {
    storageData = JSON.parse(storageTextData);
  } else {
    storageData = {};
  }
  return storageData;
};

export default class Storage {
  static set(vin, data) {
    const storageData = getStorageData();
    storageData[vin] = data;
    localStorage[STORAGE_KEY] = JSON.stringify(storageData);
  }

  static get(vin) {
    const storageData = getStorageData();
    return storageData[vin];
  }
}
