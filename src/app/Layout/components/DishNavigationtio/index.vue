<template>
  <Menu mode="horizontal" active-name="1" @on-select="handleSelect">
    <Menu-item name="dishFrame">
      菜品
    </Menu-item>
    <Menu-item name="sortFrame">
      菜品分类
    </Menu-item>
    <Menu-item name="labelFrame">
      标签
    </Menu-item>
    <Menu-item name="dietFrame">
      营养价值
    </Menu-item>
  </Menu>
</template>

<script>
  export default {
    name: 'dishNavigationtio',
    methods: {
      handleSelect (name) {
        this.$router.push(name)
      }
    }
  }
</script>

