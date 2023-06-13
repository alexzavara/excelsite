import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {shouldResize, isCell} from './table.functions';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    const $cell = this.$root.find('[data-id="0:0"]');

    super.init();
    this.selection.select($cell);
  }


  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const $target = $(event.target);
        this.selection.selectGroup($target);
      } else {
        const $target = $(event.target);
        this.selection.select($target);
      }
    }
  }
}
