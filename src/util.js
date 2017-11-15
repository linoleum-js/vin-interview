
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
export function bindEvents(container, context, obj) {
  for (let eventData in obj) {
    const methodName = obj[eventData];
    const method = context[methodName].bind(context);
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
