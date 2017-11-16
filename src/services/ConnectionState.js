
export default class ConnectionState {
  /**
   * @param {Function} callback - will recieve boolean as an argument
   */
  static onStateChange(callback) {
    window.addEventListener('online', () => {
      callback(true);
    });

    window.addEventListener('offline', () => {
      callback(false);
    });
  }

  /**
   * @return {Boolean}
   */
  static isOnline() {
    return navigator.onLine;
  }
}
