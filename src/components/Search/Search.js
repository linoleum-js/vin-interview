
import { bindEvents, $, isVinValid } from '../../util';
import NhtsaApi from '../../services/NhtsaApi';
import './style.css';

export default class Search {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    container.innerHTML = `
      <div class="search">
        <input type="text" value="JH4TB2H26CC000000"/>
        <button>🔍</button>
        <div class="js-progress-bar"></div>
      </div>
    `;

    bindEvents(container, {
      'keydown input': this.onChange.bind(this),
      'click button': this.search.bind(this)
    });

    this.$button = $('button', container);
    this.$input = $('input', container);
    this.$progressBar = $('.js-progress-bar', container);
  }
 /// JH4TB2H26CC000000
  onChange(event) {
    // since keydown event fiers before the value change,
    // we have to wait for it...
    setTimeout(() => {
      const vin = event.target.value;
      this.vin = vin;

      if (isVinValid(vin)) {
        this.$button.removeAttribute('disabled');
      } else {
        this.$button.setAttribute('disabled', 'disabled');
      }
    });
  }

  search() {
    NhtsaApi.getDataByVin(this.vin, {
      progress: this.onProgress.bind(this),
      complete: this.onComplete.bind(this)
    });
  }

  onProgress(done) {
    this.$progressBar.style.width = done * 100 + '%';
  }

  onComplete(data) {
    this.props.onSearch(data);
  }
}
