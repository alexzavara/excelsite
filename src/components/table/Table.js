import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {shouldResize, isCell, matrix, nextSelection} from './table.functions';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
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

    this.emitter.subscribe('any name', text => {
      this.selection.current.text(text);
    })
  }


  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        console.log(matrix($target, this.selection.current));
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const {key} = event;
    const keys = [
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelection(key, id));
      this.selection.select($next);
    }
  }
}
