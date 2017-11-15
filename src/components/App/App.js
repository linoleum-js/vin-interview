
import { bindEvents, $ } from '../../util';

import Search from '../Search/Search';
import Content from '../Content/Content';

export default class App {
  constructor(container, props) {
    this.container = container;

    container.innerHTML = `
      <div>
        <div class="search-bar"></div>
        <div class="content-area"></div>
      </div>
    `;

    this.search = new Search($('.search-bar', container), {
      onSearch: this.onSearch.bind(this)
    });

    this.content = new Content($('.content-area', container));
  }

  onSearch(data) {
    this.content.render({ data: data.Results });
  }
}
