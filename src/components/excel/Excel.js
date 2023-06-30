import {$} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {StoreSubscriber} from '../../core/StoreSubscriber';

export class Excel {// this => Excel
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  // Добавить каждому Компоненту свой элемент this.$el
  // и к элементу класс - Component.className
  // Возвращает $root с элементом this.$el каждого компонента
  getRoot() {
    const $root = $.create('div', 'excel'); // создать div с классом excel

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
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

    // Подписка компонентов, логика в Классе StoreSubscriber
    this.subscriber.subscribeComponents(this.components);

    // Создание структуры компонентов + инициализация слушателей
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
