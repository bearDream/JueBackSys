<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body{
    overflow: hidden;
    background: url("../src/assets/login_3.png")center center fixed no-repeat;
    background-size: cover;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
