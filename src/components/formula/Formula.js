import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';

// Formula наследуется от ExcelComponent
export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  // методы в super наследуется из конструктора ExcelComponent
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div
        id="formula"
        class="input"
        contenteditable=""
        spellcheck="false"
      ></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
