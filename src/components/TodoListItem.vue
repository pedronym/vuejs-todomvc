<template>
  <div class="todo-list-item" v-bind:class="{ done: completed }">
    
    <div class="todo-list-item__text" >
        <h1 class="todo-list-item__title">{{title}}</h1>
        <small class="todo-list-item__date"><span class="entypo-calendar"></span> Created on {{date}}</small>
    </div>

    <div class="todo-list-item__actions">
        <a class="entypo-check" @click="completeTodo"></a>
        <a class="entypo-pencil" @click="editTodo"></a>
        <a class="entypo-trash" @click="deleteTodo"></a>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date()
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('remove-todo', this)
    },
    editTodo () {
      this.$emit('edit-todo', this)
    },
    completeTodo () {
      this.$emit('complete-todo', this)
    }
  },
  props: ['uid', 'title', 'completed']
}
</script>
