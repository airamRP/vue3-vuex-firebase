<template>
  <footer>
    <span><a href="//vuejs.org">Vue.js</a></span>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style lang="scss" scoped>
footer {
  padding: 1rem;
  width: 100%;
  text-align: center;
  background-color: rgba(250, 250, 250, .05);
  border-top: 1px solid rgb(147, 147, 47);

  a {
    text-decoration: none;
    color: #eceff1;
  }
}
</style>
