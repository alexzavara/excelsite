import {DomListener} from './DomListener';

// ExcelComponent наследуется от DomListener
// В super методы наследуется из конструктора класса DomListener
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';

    this.prepare();
  }

  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Добавить слушатели
  init() {
    this.initDOMListeners();
  }

  // Удалить слушатели
  destroy() {
    this.removeDOMListeners();
  }
}
