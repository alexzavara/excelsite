import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root; // $root корневой элемент для каждого компонента
    this.listeners = listeners;
  }

  // Название связанно с событием
  initDOMListeners() { // событие input метод onInput
    this.listeners.forEach(listener => {
      const method = capitalize(listener);
      console.log(method);
      this.$root.on(listener, () => {}); // Тоже самое что и addEventListener
    })
  }

  removeDOMListeners() {

  }
}
