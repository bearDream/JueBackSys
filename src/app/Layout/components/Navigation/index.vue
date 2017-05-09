<template>
  <Menu mode="horizontal" active-name="1">
    <Menu-item name="logFrame">
      <Icon type="ios-paper"></Icon>
      日志
    </Menu-item>
    <Menu-item name="roleFrame">
      <Icon type="ios-people"></Icon>
      角色
    </Menu-item>
    <Menu-item name="tagFrame">
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
