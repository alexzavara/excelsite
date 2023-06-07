import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
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

  // Обращаемся к атрибуту data-resize
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const sells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = e => {
        const delta = Math.floor(e.pageX - coords.right);
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
        sells.forEach(el => el.style.width = value + 'px');
      }

      document.onmouseup = () => {
        document.onmousemove = null;
      }
    }
    if (event.target.dataset.resize === 'row') {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      document.onmousemove = e => {
        const deltaY = Math.floor(e.pageY - coords.bottom);
        const valueY = coords.height + deltaY;
        $parent.$el.style.height = valueY + 'px';
      }

      document.onmouseup = () => {
        document.onmousemove = null;
      }
    }
  }
}
