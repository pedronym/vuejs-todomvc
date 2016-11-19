<template>
  <div class="todo-list-item" v-bind:class="{ done: completed }">

    <div class="todo-list-item__text">
        <input type="text" v-if="editing" v-model="newText" autocomplete="off" autofocus @keyup.enter="finishedEdit"/>
        <h1 v-on:dblclick="editTodo" v-if="!editing" class="todo-list-item__title">{{text}}</h1>
        <small class="todo-list-item__date">
          <span class="entypo-calendar"></span> Created {{date}}
        </small>
    </div>

    <div class="todo-list-item__actions">
        <a class="entypo-check" @click="completeTodo"></a>
        <a class="entypo-pencil" @click="editTodo"></a>
        <a class="entypo-trash" @click="deleteTodo"></a>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      editing: false,
      newText: '',
      date: moment(this.uid).fromNow()
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('remove-todo', this.uid)
    },
    editTodo () {
      this.editing = true
    },
    finishedEdit () {
      this.editing = false
      this.$emit('edited-todo', this.uid, this.newText)
    },
    completeTodo () {
      this.$emit('complete-todo', this.uid)
    }
  },
  props: ['text', 'uid', 'completed']
}
</script>
