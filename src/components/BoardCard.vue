<template>
  <div class="board-card">
    <div class="board-card-delete" title="Eliminar Panel y listas de tareas asociadas y subtareas">
      X
    </div>
    <router-link class="board-card-name" :to="{ name: 'board', params: { name, id } }" title="Abrir">
      <span class="board-card-title">{{ name }}</span>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'board-card',
  props: {
    id: String,
    name: String
  },
}
</script>

<style lang="scss" scoped>
.board-card {
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(250, 250, 250, .1);
  transition: all 600ms ease;

  display: flex;
  flex-direction: column;

  &-delete {
    width: 100%;
    text-align: right;
    padding: .3rem .4rem .2rem .4rem;
    font-size: .5rem;
    cursor: pointer;
    transition: all 600ms ease;

    &:hover {
      background-color: rgba(125, 125, 125, .2);
      font-weight: bold;
      transition: all 600ms ease;
    }
  }

  &-name {
    flex: 1;
    width: 100%;
    padding: 1rem;
    display: flex;
    
    text-decoration: none;
    font-size: 1.2rem;
    transition: all 600ms ease;

    &:hover {
      background-color: rgba(125, 125, 125, .2);
      font-weight: bold;
      transition: all 600ms ease;
    }
  }
}
</style>
