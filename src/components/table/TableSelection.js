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
    const arr = []
    for (let row = currentCell.row; row <= targetCell.row; row++) {
      for (let col = currentCell.col; col <= targetCell.col; col++) {
        arr.push(row + ':' + col);
      }
    }
    // arr.forEach(function(el) {
    //   $el.find(`[data-id="${el}"]`).addClass(TableSelection.className);
    // })
    // this.group.push()
    // console.log($el);
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
