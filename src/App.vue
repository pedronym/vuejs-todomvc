<template>
  <div id="app">

    <todo-list v-on:add-todo="addTodo"></todo-list>

    <section class="todo-wrapper">

      <todo-list-item v-for="todo in todos" :uid="todo.uid" :text="todo.text" :completed="todo.completed" v-on:remove-todo="removeTodo" v-on:complete-todo="completeTodo" v-on:edited-todo="editedTodo">
      </todo-list-item>

      <div v-show="todos.length === 0" class="todo-list-empty">
        <h2>All tasks completed</h2>
      </div>
    </section>

    <todo-list-filters v-show="todos.length > 0"></todo-list-filters>
  </div>
</template>

<script>
import Storage from './storage.js'
import TodoList from './components/TodoList'
import TodoListItem from './components/TodoListItem'
import TodoListFilters from './components/TodoListFilters'

var filters = {
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
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
      this.todos.push({
        text: todoText,
        uid: new Date().getTime(),
        completed: false
      })
    },
    removeTodo (uid) {
      this.todos.splice(this.getTodoIndex(uid), 1)
    },
    editedTodo (uid, newText) {
      console.log(newText)
      this.todos[this.getTodoIndex(uid)].text = newText
    },
    completeTodo (uid) {
      this.todos[this.getTodoIndex(uid)].completed = true
    },
    getTodoIndex: function (uid) {
      let todoIndex
      this.todos.forEach((todo, idx) => {
        if (todo.uid === uid) {
          todoIndex = idx
        }
      })
      return todoIndex
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        Storage.save(todos)
      },
      deep: true
    }
  },
  filters: {
    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/app';
</style>
