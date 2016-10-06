<template>
  <div class="todo-list">
   
    <header class="todo-list__header">
        <input v-model="title" class="todo-list__input" type="text" v-bind:placeholder="placeholder" autocomplete="off" autofocus @keyup.enter="addTodo">
    </header>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      placeholder: 'Create a new ToDo',
      title: ''
    }
  },
  // METHODS //
  methods: {
    addTodo () {
      this.$emit('add-todo', this.title)
      this.title = ''
    }
  }
}
</script>
