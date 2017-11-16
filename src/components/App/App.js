
import { bindEvents, $ } from '../../util';
import './style.css';

import Search from '../Search/Search';
import Content from '../Content/Content';
import Header from '../Header/Header';

import ConnectionState from '../../services/ConnectionState';

export default class App {
  constructor(container, props) {
    this.container = container;

    container.innerHTML = `
      <div class="app">
        <header class="header"></header>
        <div class="wrap">
          <div class="search-bar"></div>
          <div class="content-area"></div>
        </wrap>
      </div>
    `;

    this.search = new Search($('.search-bar', container), {
      onSearch: this.onSearch.bind(this)
    });
    this.content = new Content($('.content-area', container));
    this.header = new Header($('.header', container), {
      isOnline: true
    });

    ConnectionState.onStateChange(this.onConnectionStateChange.bind(this));
  }

  onSearch(data) {
    this.content.render({ data: data.Results });
  }

  onConnectionStateChange(isOnline) {
    this.header.update({ isOnline });
  }
}
