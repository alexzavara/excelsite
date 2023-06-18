import {DomListener} from './DomListener';

// ExcelComponent наследуется от DomListener
// В super методы наследуется из конструктора класса DomListener
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.prepare();
  }

  // Настройка компонента до инициализации
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Инициализация компонента
  // Например добавить DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Например удалить DOM слушателей
  destroy() {
    this.removeDOMListeners();
  }
}
