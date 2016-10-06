<template>
  <div id="app">

    <todo-list v-on:add-todo="addTodo"></todo-list>

    <section class="todo-wrapper">
      <todo-list-item v-for="todo in todos" :uid="todo.id" :title="todo.title" :completed="todo.completed" v-on:remove-todo="removeTodo" v-on:complete-todo="completeTodo">

      </todo-list-item>
    </section>
    
  </div>
</template>

<script>
import Storage from './storage.js'
import TodoList from './components/TodoList'
import TodoListItem from './components/TodoListItem'

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
    TodoListItem
  },
  data: function () {
    return {
      todos: Storage.fetch()
    }
  },
  methods: {
    addTodo (todoText) {
      this.todos.push({
        id: Storage.uid++,
        title: todoText,
        completed: false
      })
    },
    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    completeTodo (todo) {
      // this.todos[todoId].completed = true
      // this.todos = filters.active(this.todos)
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
