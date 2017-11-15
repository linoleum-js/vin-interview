
import { bindEvents } from '../../util';

export default class App {
  constructor(node, props) {
    this.node = node;
    node.innerHTML = require('./template.html');
    bindEvents(node, this, {
      'click div': 'onClick'
    });
  }

  onClick() {
    console.log(123);
  }
}
