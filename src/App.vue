<template>
  <div id="app">
    <img src="../src/assets/jue.jpg" alt="">
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
    background:center center fixed no-repeat;
    background-size: cover;
  }
  img{
    position:absolute;
    left: 30%;
    -webkit-filter: blur(4.5px);
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
