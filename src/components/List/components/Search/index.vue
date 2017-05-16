<template>
  <div class="search">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'search'
  }
</script>
<style>
  .search {
    position: absolute;
    min-width: 300px;
    right: -10px;
    top: 0;
  }
</style>
