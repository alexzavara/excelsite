import {ExcelComponent} from '../../core/ExcelComponent';
import {createHeader} from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return createHeader()
  }
}
