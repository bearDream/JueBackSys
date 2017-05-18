<template>
  <div id="app">
    <!-- 顶部title -->
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
<style lang="scss" scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

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
