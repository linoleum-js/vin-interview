
import { bindEvents, $ } from '../../util';

import Search from '../Search/Search';
import Content from '../Content/Content';

export default class App {
  constructor(container, props) {
    this.container = container;

    container.innerHTML = `
      <div>
        <div class="search-bar"></div>
        <div class="contett-area"></div>
      </div>
    `;

    this.search = new Search($('.search-bar'), {
      onSearch: this.onSearch.bind(this)
    });

    this.content = new Content($('.content-area'));
  }

  onSearch(data) {
    // console.log(data);
  }
}
