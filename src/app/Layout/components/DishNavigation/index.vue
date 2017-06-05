<template>
  <Menu mode="horizontal" active-name="dishFrame" @on-select="handleSelect">
    <Menu-item name="dishFrame">
      <Icon type="ios-paper"></Icon>
      菜品
    </Menu-item>
    <Menu-item name="dishTypeFrame">
      <Icon type="ios-people"></Icon>
      菜品分类
    </Menu-item>
    <Menu-item name="dishTagFrame">
      <Icon type="settings"></Icon>
      标签
    </Menu-item>
  </Menu>
</template>

<script>
  export default {
    name: 'header',
    methods: {
      handleSelect (name) {
        this.$router.push(name)
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
