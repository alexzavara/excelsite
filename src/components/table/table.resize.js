import {$} from '../../core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let value;

    if (type === 'col') {
      $resizer.css({
        opacity: 1,
        bottom: '-100vh'
      })
    } else {
      $resizer.css({
        opacity: 1,
        right: '-100vw'
      })
    }

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = Math.floor(e.pageX - coords.right);
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      } else {
        const delta = Math.floor(e.pageY - coords.bottom);
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $parent.css({width: value + 'px'});
        // Работа с cells
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      });

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      });
    }
  })
}
