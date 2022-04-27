<template>
  <header>
    <span class="title">Vue Firebase</span>
    <router-link class="btn-header" to="/">Boards</router-link>
  </header>
</template>

<script>
export default {
  name: 'app-header',
}
</script>

<style lang="scss" scoped>
header {
  margin: 0;
  padding: 1rem;
  border-bottom: 1px solid rgb(147, 147, 47);
  color: #eceff1;
  background-color: rgba(250, 250, 250, .05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .btn-header {
    margin: 0;
    padding: 0.5rem 0.8rem;
    color: inherit;
    border: 1px solid rgba(255, 255, 255, .3);
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
    transition: all 600ms ease;

    &:hover {
      border: 1px solid rgba(255, 255, 255, .6);
      transition: all 600ms ease;
    }
  }
}
</style>
