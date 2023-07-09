import {ExcelComponent} from '../../core/ExcelComponent';
import {defaultTitle} from '../../constants'
import {$} from '../../core/dom';
import {changeTytle} from '../redux/actions';
import {debounce} from '../../core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTytle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'buttonDelete') {
      window.localStorage.removeItem('excel:' + window.location.hash.slice(7))
      window.location.hash = 'dashboard'
    }
    if ($target.data.type === 'buttonBack') {
      window.location.hash = 'dashboard'
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}">
      <div>
        <div class="button" data-type="buttonDelete">
          <i class="material-icons" data-type="buttonDelete">delete</i>
        </div>
        <div class="button" data-type="buttonBack">
          <i class="material-icons" data-type="buttonBack">exit_to_app</i>
        </div>
      </div>
    `
  }
}
