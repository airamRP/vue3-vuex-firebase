<template>
  <ul @drop="drop" @dragover="allowDrop">
    <li v-for="(task, index) in tasks" :key="index" draggable="true" @dragstart="drag($event, task)">
      <div :class="{ completed: task.completed }" class="task" :title="titleCompleted(task.completed)"
        @click="update(task)">{{ task.title }}</div>
      <div class="delete" title="Eliminar tarea" @click="del({ taskId: task.id })">X</div>
    </li>
  </ul>
  <input type="text" placeholder="Add a new task..." v-model="title" @keyup.enter="add()" />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'task-list',
  props: {
    listId: String,
    tasks: Object
  },
  setup(props) {
    const title = ref('')
    const store = useStore()

    const add = () => {
      store.dispatch('addTask', { list: props.listId, title: title.value })
      title.value = ''
    }
    const del = ({ taskId }) => {
      store.dispatch('deleteTask', { taskId })
    }

    const update = (task) => {
      store.dispatch('markAsCompleted', { task })
    }

    const titleCompleted = (completed) => {
      return completed ? 'Marcar sin completar' : 'Marcar completada'
    }

    const allowDrop = (event) => {
      event.preventDefault()
    }
    const drag = (event, task) => {
      const transferTask = JSON.stringify(task)
      event.dataTransfer.setData('task', transferTask)
    }
    const drop = (event) => {
      event.preventDefault()
      const task = JSON.parse(event.dataTransfer.getData('task'))
      if (task.list !== props.listId) {
        store.dispatch('moveTask', { task, listId: props.listId })
        return
      }
    }

    return {
      title, add, del, update, titleCompleted,
      allowDrop, drop, drag,
    }
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: .5rem;
  font-size: .9rem;

  display: flex;
  flex-direction: column;
  row-gap: .5rem;
  height: 100%;
  min-height: 20px;
  border: 1px solid rgba(50, 50, 50, .9);
}

li {
  border-radius: 3px;
  margin: 0.25rem 0;
  margin: 0;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  transition: all 600ms ease;

  & .task {
    padding: .5rem;
    flex: 1;
    cursor: pointer;

    &.completed {
      background-color: rgba(125, 125, 125, .2);
      color: rgba(125, 125, 125, .5);
    }

    &:hover {
      background-color: rgb(95, 95, 95);
      transition: all 600ms ease;
    }
  }

  & .delete {
    font-size: .7rem;
    height: 100%;
    padding: 0 .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 600ms ease;

    &:hover {
      background-color: rgba(100, 100, 100, .5);
      transition: all 600ms ease;
    }
  }
}

input {
  margin-top: 1rem;
  width: 70%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  font-size: 1rem;
  outline: 0;
  padding: 0.5rem .3rem .1rem 0rem;
  transition: all 600ms ease;

  &::placeholder {
    font-size: .8rem;
  }
}
</style>
