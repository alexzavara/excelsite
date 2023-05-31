import {ExcelComponent} from '../../core/ExcelComponent';

// Formula наследуется от ExcelComponent
export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    // методы в super наследуется из конструктора ExcelComponent
    super($root, {
      name: 'Formula',
      listenets: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="" spellcheck="false" ></div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event);
  }
}
