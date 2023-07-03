export function createHeader() {
  const headerFileName = 'Новая таблица'
  return `
    <input type="text" class="input" value="${headerFileName}">
    <div>
      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>
  `
}
