import {range} from '../../core/utils';

// проверяет атрибут data
export function shouldResize(event) {
  return event.target.dataset.resize;
}

// проверяет что выбранный элемент cell
export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

// Возвращает массив id для выделенных cell
export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, [])
}
