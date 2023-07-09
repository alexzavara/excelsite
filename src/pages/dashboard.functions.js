function toHTML(key) {
  const thisStorage = JSON.parse(localStorage[key])
  return `
    <li class="db__record">
      <a href="#excel/${key.slice(6)}">${thisStorage.title}</a>
      <strong>12.06.2020</strong>
    </li>
  `
}

// excel:14234234
// excel:54765
function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной записи</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата Открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
