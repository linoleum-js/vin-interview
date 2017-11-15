
export default class ConnectionState {
  static onStateChange(callback) {
    window.addEventListener('online', () => {
      callback(true);
    });

    window.addEventListener('offline', () => {
      callback(false);
    });
  }

  static isOnline() {
    return navigator.onLine;
  }
}
