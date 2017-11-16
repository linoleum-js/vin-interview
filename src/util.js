
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

/**
 * Backbone-like event handling
 * @param {Node} container
 * @param {Object} obj - object, which key is the event name + css selector
 *                       and value is a callback function
 */
export function bindEvents(container, obj) {
  for (let eventData in obj) {
    const method = obj[eventData];
    const parts = eventData.split(' ', 2);
    const eventName = parts[0];
    const selector = parts[1];

    container.addEventListener(eventName, (event) => {
      if (event.target.matches(selector)) {
        method(event);
      }
    }, false);
  }
}

/**
 * short version of querySelector
 * @param {string} selector
 * @param {Node?} context
 */
export function $(selector, context=document) {
  return context.querySelector(selector);
}

/**
 * Validates vin (kinda)
 * @param {string} vin
 */
export function isVinValid(vin) {
  function transliterate(c) {
    return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
  }

  function checkDigit(vin) {
    const map = '0123456789X';
    const weights = '8765432X098765432';
    let sum = 0;
    for (let i = 0; i < 17; ++i) {
      sum += transliterate(vin[i]) * map.indexOf(weights[i]);
    }
    return map[sum % 11];
  }

  function validate(vin) {
    if (vin.length !== 17) return false;
    return checkDigit(vin) === vin[8];
  }

  return validate(vin);
}

/**
 * Sorts array by the given property name
 * IMPORTANT: not changes the original array
 * @param {Array} data
 * @param {string} key
 * @param {Boolean} asc - true is ascending order, false otherwise
 * @retrun {Array} - sorted array
 */
export function sortByKey(data, key, asc) {
  const mult = asc ? 1 : -1;

  return data.slice(0).sort((a, b) => {
    a = (a[key] || '').toLowerCase();
    b = (b[key] || '').toLowerCase();
    return (a < b) ? -mult : (a > b) ? mult : 0;
  });
}

/**
 * Filters array by the given rules
 * @param {Array} data
 * @param {Oject} filters - ojbect, which key is a property name to be filtered
 *                          and the value is query string
 */
export function filterByProperties(data, filters) {
  return data.filter((item) => {
    for (let key in filters) {
      const value = (item[key] || '').toLowerCase();
      const query = filters[key].toLowerCase();
      if (value.indexOf(query) === -1) {
        return false;
      }
    }
    return true;
  });
}
