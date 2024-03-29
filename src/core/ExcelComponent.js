import {DomListener} from './DomListener';

// ExcelComponent наследуется от DomListener
// В super методы наследуется из конструктора класса DomListener
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настройка компонента до инициализации
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }
  // Изменение только тех полей на которые подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализация компонента
  // Например добавить DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Например удалить DOM слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
