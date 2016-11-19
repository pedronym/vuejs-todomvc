<template>
  <div class="todo-list">

    <header class="todo-list__header">
        <input v-model="input" class="todo-list__input" type="text" v-bind:placeholder="placeholder" autocomplete="off" autofocus @keyup.enter="addTodo">
    </header>

  </div>
</template>

<script>
export default {
  data () {
    return {
      placeholder: 'Create task',
      input: ''
    }
  },
  // METHODS //
  methods: {
    addTodo () {
      this.$emit('add-todo', this.input)
      this.input = ''
    }
  }
}
</script>
