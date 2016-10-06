export default {
  STORAGE_KEY: 'pl-todos',
  uid: -1,
  fetch () {
    var todos = JSON.parse(window.localStorage.getItem(this.STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    this.uid = todos.length
    return todos
  },
  save (todos) {
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos))
  }
}
