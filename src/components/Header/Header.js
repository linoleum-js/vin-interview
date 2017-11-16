
import './style.css';

export default class Header {
  constructor(container, props={}) {
    this.container = container;
    this.update(props);
  }

  update(props) {
    this.container.innerHTML = `
      <div>
        <div class="logo">VIN</div>
        <div class="connection-status">
          ${props.isOnline ? '' : 'You are now offline'}
        </div>
      </div>
    `;
  }
}
