
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

export function $(selector, context=document) {
  return context.querySelector(selector);
}

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
