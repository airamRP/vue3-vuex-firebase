<template>
  <div class="list-card">
    <div class="list-card-header" title="Eliminar lista y tareas" @click="removeList()">
      <h3 class="list-card-header-title">{{ name }}</h3>
      <span class="list-card-header-delete">X</span>
    </div>
    <div class="list-card-collection">
      <!-- <h3>{{ name }}</h3> -->
      <task-list :listId="listId" :tasks="tasksList" />
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'

import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'column',
  components: { TaskList },

  props: {
    listId: String,
    name: String
  },

  setup(props) {
    const store = useStore()
    store.dispatch('fetchTasks', { list: props.listId })

    const fetchingData = computed(() => store.state.fetchingData)

    const tasksList = computed(() => store.getters.getTasksFromList(props.listId))

    const removeList = () => {
      tasksList.value.forEach(task => {
        if (task.list === props.listId) {
          store.dispatch('deleteTask', { taskId: task.id })
        } else {
          console.log('no debería darse, eliminar if')
        }
      })
      store.dispatch('deleteList', { listId: props.listId })
    }

    return { fetchingData, tasksList, removeList }
  },
}
</script>

<style lang="scss" scoped>
.list-card {
  width: 100%;
  border-radius: 5px;
  background-color: rgba(50, 50, 50, .5);
  transition: all 600ms ease;

  display: flex;
  flex-direction: column;


  &-header {
    width: 100%;
    display: flex;
    align-items: center;

    &-title {
      padding: .3rem 0 .2rem 0;
      flex: 1;
      text-align: center;
    }

    &-delete {
      font-size: .5rem;
      height: 100%;
      padding: 0 .5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 600ms ease;
      cursor: pointer;

      &:hover {
        background-color: rgba(125, 125, 125, .2);
        font-weight: bold;
        transition: all 600ms ease;
      }
    }
  }

  &-collection {
    width: 100%;
    padding: 1rem;
    text-decoration: none;

    display: flex;
    flex-direction: column;

    flex: 1;
  }
}
</style>
