import {ExcelComponent} from '../../core/ExcelComponent';

// Formula наследуется от ExcelComponent
export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    // методы в super наследуется из конструктора ExcelComponent
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="" spellcheck="false" ></div>
    `
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.emitter.emit('any name', text)
  }
}
