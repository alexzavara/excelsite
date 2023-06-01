import {DomListener} from './DomListener';

// ExcelComponent наследуется от DomListener
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    // методы в super наследуется из конструктора DomListener
    super($root, options.listeners);
    this.name = options.name || '';
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
