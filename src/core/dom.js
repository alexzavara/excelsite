class Dom {
  constructor(selector) {
    // если попадает строка, обрабатывается через querySelector
    // если переменная то как переменная
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }
  // Если передаем строку, то записывает ее в innerHTML
  // Если мы не передаем никаких параметров то в outerHTML
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html; // setter в случае если передана строка
      return this;
    } // trim удаляет проблеы в переди и сзади строки
    return this.$el.outerHTML.trim(); // getter
  }
  // text, input
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  // Выов метода html с пустым полем параметров
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
  // Получить все дата атрибуты элемента
  get data() {
    return this.$el.dataset;
  }
  // Поиск ближайшего элемета по селектору
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  // Возвращает объект с размераи элемента
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  // Из data-id парит ID в виде объекта
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this
    }
    return this.$el.getAttribute(name)
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
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

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

// Модуль $
// Делает новый инстанс класса Dom с селектором
// Например <div class="divselector">123</div>
// new Dom(divselector)
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

