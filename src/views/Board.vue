<template>
  <div class="container-board">
    <h3>
      <span>My Boards</span>
      ▸ {{ name }}
    </h3>

    <div class="fetching-data" v-if="fetchingData">
      <span>Loading...</span>
    </div>

    <input type="text" placeholder="Add a list..." v-model="listName" @keyup.enter="add()" />
    <div class="lists-collection">
      <column v-for="(list, index) in boardList" :key="index" :listId="list.id" :name="list.name"></column>
    </div>
  </div>
</template>

<script>
import Column from '@/components/Column.vue'

import { ref, computed } from 'vue'

import { useStore } from 'vuex'

export default {
  name: 'board',
  components: { Column },

  props: {
    name: String,
    id: String
  },

  setup(props) {
    const listName = ref('')
    const store = useStore()

    store.dispatch('fetchLists', { board: props.id })

    const fetchingData = computed(() => store.state.fetchingData)

    const boardList = computed(() => store.getters.getListsByBoard(props.id))

    const add = () => {
      store.dispatch('addColumn', { board: props.id, name: listName.value })
      listName.value = ''
    }

    return { listName, fetchingData, boardList, add }

  },
}
</script>

<style lang="scss" scoped>
.container-board {
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
}

h3 {
  text-align: left;
  font-size: .8rem;
  margin: 1.5rem 0;
  padding-left: 1rem;

  span {
    color: rgba(255, 255, 255, .5);
  }
}

.fetching-data {
  margin: 1rem;
  text-align: center;
}

.lists-collection {
  margin-top: 1rem;
  width: 100%;

  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

input {
  width: 70%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  font-size: 1.1rem;
  outline: 0;
  padding: 0.5rem .3rem .3rem 0rem;
  transition: all 600ms ease;
}
</style>
