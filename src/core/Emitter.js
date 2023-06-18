export class Emitter {
  constructor() {
    this.listeners = {
      // event: [fn]
    };
  }

  // trigger
  // Уведомляем слушателей если они есть
  // (строка, [элементы попадут в массив])
  // table.emit('table.select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    });
    return true;
  }

  // lisen
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  // (строка, функция) событие, callback
  // formula.subscribe('table.select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    }
  }
}
