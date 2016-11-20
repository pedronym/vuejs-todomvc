<template>
  <div id="app">

    <todo-list v-on:add-todo="addTodo"></todo-list>

    <section class="todo-wrapper">

      <todo-list-item v-for="todo in todos" :uid="todo.uid" :text="todo.text" :completed="todo.completed" v-on:remove-todo="removeTodo" v-on:toggle-todo="toggleTodo" v-on:edited-todo="editedTodo">
      </todo-list-item>

      <div v-show="todos.length === 0" class="todo-list-empty">
        <h2>All tasks completed</h2>
      </div>
    </section>

    <todo-list-filters v-on:show-active="showActive" v-on:show-completed="showCompleted" v-on:show-all="showAll" v-show="todos.length > 0"></todo-list-filters>
  </div>
</template>

<script>
import Storage from './storage.js'
import TodoList from './components/TodoList'
import TodoListItem from './components/TodoListItem'
import TodoListFilters from './components/TodoListFilters'

var filters = {
  active: function (todos) {
    return todos.filter((todo) => {
      return todo.completed === false
    })
  },
  completed: function (todos) {
    return todos.filter((todo) => {
      return todo.completed === true
    })
  },
  all: function (todos) {
    return todos
  }
}

export default {
  components: {
    TodoList,
    TodoListItem,
    TodoListFilters
  },
  data: function () {
    return {
      todos: Storage.fetch()
    }
  },
  methods: {
    addTodo (todoText) {
      this.todos.unshift({
        text: todoText,
        uid: new Date().getTime(),
        completed: false
      })
    },
    removeTodo (uid) {
      this.todos.splice(this.getTodoIndex(uid), 1)
    },
    editedTodo (uid, newText) {
      this.todos[this.getTodoIndex(uid)].text = newText
    },
    toggleTodo (uid) {
      const todo = this.todos[this.getTodoIndex(uid)]
      todo.completed = !todo.completed
      todo.completed ? this.moveToLast(uid) : this.moveToActive(uid)
    },
    moveToActive: function (uid) {
      this.todos.unshift(this.todos.splice(this.getTodoIndex(uid), 1)[0])
    },
    moveToLast: function (uid) {
      this.todos.splice(this.todos.length, 0, this.todos.splice(this.getTodoIndex(uid), 1)[0])
    },
    getTodoIndex: function (uid) {
      let todoIndex
      this.todos.forEach((todo, idx) => {
        if (todo.uid === uid) {
          todoIndex = idx
        }
      })
      return todoIndex
    },
    showActive: function () {
      this.todos = filters.active(this.todos)
    },
    showCompleted: function () {
      this.todos = filters.completed(this.todos)
    },
    showAll: function () {
      this.todos = filters.all(this.todos)
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        Storage.save(todos)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/app';
</style>
