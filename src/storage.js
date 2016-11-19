export default {
  STORAGE_KEY: 'pl-todos',
  fetch () {
    var todos = JSON.parse(window.localStorage.getItem(this.STORAGE_KEY) || '[]')
    return todos
  },
  save (todos) {
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos))
  }
}
