import {capitalize} from './utils';

// Методы класса отвечают за слушатели событий
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root; // $root корневой элемент для каждого компонента
    this.listeners = listeners;
  }

  // Возвращает метод на каждый слушатель из массива listeners
  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        );
      }
      // Название метода связанно с событием click -> onClick
      // Тоже самое что и addEventListener
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    })
  }

  // Удаляет слушатели из массива listeners
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}

// событие input метод onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
