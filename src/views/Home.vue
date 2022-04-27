<template>
  <div class="container-home">
    <h3>Boards</h3>

    <div class="fetching-data" v-if="fetchingData">
      <span>Loading...</span>
    </div>

    <template v-else>
      <input type="text" placeholder="Add new board" v-model="boardName" @keyup.enter="add()" />
      <div class="boards-collection">
        <board-card v-for="(board, index) in boards" :key="index" :name="board.name" :id="board.id" />
      </div>
    </template>
  </div>
</template>

<script>
import BoardCard from '@/components/BoardCard'

import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'home-view',
  components: { BoardCard },

  setup() {
    const boardName = ref('')
    const store = useStore()

    store.dispatch('fetchBoards', { user: 1 })

    const fetchingData = computed(() => store.state.fetchingData)

    const boards = computed(() => store.state.boards)

    const add = () => {
      store.dispatch('addBoard', { name: boardName.value })
      boardName.value = ''
    }

    return { boardName, fetchingData, boards, add }
  },
}
</script>

<style lang="scss" scoped>
.container-home {
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
}

.fetching-data {
  margin: 1rem;
  text-align: center;
}

.boards-collection {
  margin-top: 2rem;
  width: 100%;

  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

input {
  width: 70%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  font-size: 1.1rem;
  outline: 0;
  padding: 0.5rem .3rem .3rem 0rem;
}
</style>

