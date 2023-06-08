class Dom {
  constructor(selector) {
    // если попадает строка, обрабатывается через querySelector
    // если переменная то как переменная
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }
  // Если передаем строку, то она возвращается в innerHTML
  // Если мы не передаем никаких параметров то в outerHTML
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html; // setter в случае если передана строка
      return this;
    } // trim удаляет проблеы в переди и сзади строки
    return this.$el.outerHTML.trim(); // getter
  }
  clear() {
    this.html();
    return this;
  }
  // Добавление слушателя
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  // Удаления слушателя
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  // Добавить элемент в компоненте определенного Класса
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  /*
    obj {
      hight: 100px;
      width: 100px;
      color: blue;
    }
  */
  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key];
    });
  }
}

// Экспортирует модуль $
// Делает инстанс класса Dom с селектором (например $el)
export function $(selector) {
  return new Dom(selector);
}

// Метод для функции - $
// Создает элемент добавляет ему класс
$.create = (tagName, classes = '') => { // Например div с каким то классом
  const el = document.createElement(tagName); // создать элемент
  if (classes) {
    el.classList.add(classes); // Если в функцию переданы классы, добавить класс
  }
  return $(el);
}

