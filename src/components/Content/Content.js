
import { bindEvents, $, sortByKey, filterByProperties } from '../../util';

export default class Content {
  constructor(container, props={}) {
    this.container = container;
    this.currentSortKey = '';
    this.isAscOrder = true;
    this.filters = {
      Variable: '',
      Value: ''
    };

    this.render(props);

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
    this.updateContent();
  }

  updateContent() {
    let data = this.props.data || [];
    data = this.filter(this.sort(data));
    this.$content.innerHTML = data.map(this.renderRow).join('');
  }

  sortVariable() {
    this.setSortingRule('Variable');
    this.updateContent();
  }

  sortValue() {
    this.setSortingRule('Value');
    this.updateContent();
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
    return sortByKey(
      data,
      this.currentSortKey,
      this.isAscOrder
    );
  }

  filterVariable(event) {
    setTimeout(() => {
      this.setFilter(event.target.value, 'Variable');
      this.updateContent();
    });
  }

  filterValue(event) {
    setTimeout(() => {
      this.setFilter(event.target.value, 'Value');
      this.updateContent();
    });
  }

  setFilter(query, key) {
    this.filters[key] = query;
  }

  filter(data) {
    return filterByProperties(data, this.filters);
  }
}
