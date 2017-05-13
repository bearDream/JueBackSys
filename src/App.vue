<template>
  <div id="app">
    <!-- 顶部title -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './app/Layout/components/Header'

  export default {
    name: 'app',
    components: {
      Header
    }
  }
</script>

<style>
  body{
    overflow: auto;
    background: url("../src/assets/login_3.png")center center fixed no-repeat;
    background-size: cover;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
