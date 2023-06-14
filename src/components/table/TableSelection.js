export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el instanceof DOM === true
  select($el) {
    this.clear();
    $el.addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($el, currentCell, targetCell) {
    this.current = null;
    const arr = [];
    for (let row = currentCell.row; row <= targetCell.row; row++) {
      for (let col = currentCell.col; col <= targetCell.col; col++) {
        arr.push(row + ':' + col);
      }
    }

    arr.forEach(el => {
      document.querySelector(`[data-id="${el}"]`)
          .classList.add('selected');
      this.group.push($el);
    })
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
