<template>
  <div id="app-sub">
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>

</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'app',
  components: { AppHeader, AppFooter },
}
</script>

<style lang="scss">
*,
html,
body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  color: rgb(200, 200, 200);
}

#app-sub {
  height: 100vh;
  min-height: 100vh;
  background-color: rgb(30, 30, 30);
  color: rgb(241, 241, 241);
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  display: flex;
  flex-direction: column;
}
</style>
