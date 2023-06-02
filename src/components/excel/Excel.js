import {$} from '../../core/dom';

export class Excel {// this => Excel
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  // Добавить каждому Компоненту свой элемент this.$el
  // и к элементу класс - Component.className
  // Возвращает $root с элементом this.$el каждого компонента
  getRoot() {
    const $root = $.create('div', 'excel'); // создать div с классом excel

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })
    return $root;
  }

  // Отвечает за отрисовку
  render() {
    // Добавляет в конец корневого элемента компоненты из getRoot
    this.$el.append(this.getRoot());

    // Создание структуры компонентов + инициализация слушателей
    this.components.forEach(component => component.init());
  }
}
