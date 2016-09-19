<template>
    <div class="todo-create">
        <input type="text" placeholder="{{ placeholderText }}">
    </div>
</template>

<script>
export default {
    data () {
        return {
            placeholderText: 'Create a Todo!'
        }
    }
}
</script>
