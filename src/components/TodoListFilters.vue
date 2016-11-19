<template>
  <footer class="todo-list-filters">

    <ul class="todo-filters__actions">
      <li @click="showActive" class="todo-actions__button">Active</li>
      <li @click="showCompleted" class="todo-actions__button">Completed</li>
      <li @click="showAll" class="todo-actions__button">All</li>
    </ul>

  </footer>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  // METHODS //
  methods: {
    showActive () {
      this.$emit('show-active')
    },
    showCompleted () {
      this.$emit('show-completed')
    },
    showAll () {
      this.$emit('show-all')
    }
  }
}
</script>
