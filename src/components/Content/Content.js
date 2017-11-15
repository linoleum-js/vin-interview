
import { bindEvents, $ } from '../../util';

export default class Content {
  constructor(container, props={}) {
    this.container = container;
    this.render(props);
    this.currentSortKey = '';
    this.isAscOrder = true;
    this.filters = {
      Variable: '',
      Value: ''
    };

    bindEvents(container, {
      'click .variable-sorter': this.sortVariable.bind(this),
      'click .value-sorter': this.sortValue.bind(this),
      'keydown .variable-filter input': this.filterVariable.bind(this),
      'keydown .value-filter input': this.filterValue.bind(this)
    });
  }

  renderRow(data) {
    return `
      <tr>
        <td>${data.Variable}</td>
        <td>${data.Value !== null ? data.Value : ''}</td>
      </tr>
    `;
  }

  renderHeader() {
    return `
      <tr>
        <th class="variable-sorter">Variable</th>
        <th class="value-sorter">Value</th>
      </tr>
      <tr>
        <td><input class="variable-filter" type="text" /></td>
        <td><input class="value-filter" type="text" /></td>
      </tr>
    `;
  }

  render(props) {
    const data = props.data || [];
    this.props = props;
    this.container.innerHTML = `
      <div>
        <table>
          <thead>
            ${data.length ? this.renderHeader() : ''}
          <thead>
          <tbody></tbody>
        </table>
      </div>
    `;
    this.$content = $('tbody', this.container);
    this.update(props);
  }

  update() {
    let data = this.props.data || [];
    data = this.filter(this.sort(data));
    this.$content.innerHTML = data.map(this.renderRow).join('');
  }

  sortVariable() {
    this.setSortingRule('Variable');
    this.update();
  }

  sortValue() {
    this.setSortingRule('Value');
    this.update();
  }

  setSortingRule(key) {
    const data = this.props.data;
    if (!data) { return; }
    if (this.currentSortKey === key) {
      this.isAscOrder = !this.isAscOrder;
    } else {
      this.isAscOrder = true;
    }
    this.currentSortKey = key;
  }

  sort(data) {
    const mult = this.isAscOrder ? 1 : -1;
    const key = this.currentSortKey;

    const newData = data.slice(0).sort((a, b) => {
      a = (a[key] || '').toLowerCase();
      b = (b[key] || '').toLowerCase();
      return (a < b) ? -mult : (a > b) ? mult : 0;
    });

    return newData;
  }

  filterVariable(event) {
    setTimeout(() => {
      this.setFilter(event.target.value, 'Variable');
      this.update();
    });
  }

  filterValue(event) {
    setTimeout(() => {
      this.setFilter(event.target.value, 'Value');
      this.update();
    });
  }

  setFilter(query, key) {
    this.filters[key] = query;
  }

  filter(data) {
    return data.filter((item) => {
      for (let key in this.filters) {
        const value = (item[key] || '').toLowerCase();
        const query = this.filters[key].toLowerCase();
        if (value.indexOf(query) === -1) {
          return false;
        }
      }
      return true;
    });
  }
}
