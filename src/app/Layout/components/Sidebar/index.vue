<template>
  <div class="sidebar">
    <Menu ref="menu" :active-name="activeName" width="auto" :open-names="openNames" @on-select="handleSelect">
      <Menu-item name="baseFrame">
        <Icon type="ios-paper"></Icon>
        基础信息管理
      </Menu-item>

      <Menu-item name="businessFrame">
        <Icon type="document"></Icon>
        商家管理
      </Menu-item>

      <Menu-item name="dishFrame">
        <Icon type="person-stalker"></Icon>
        菜品管理
      </Menu-item>

      <Menu-item name="userFrame">
        <Icon type="ios-home-outline"></Icon>
        用户管理
      </Menu-item>

    </Menu>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        activeName: '',
        openNames: []
      }
    },
    created () {
      this.update()
    },
    methods: {
      handleSelect (name) {
//        this.$router.push('baseNavigation/' + name)
        this.$router.push(name)
      },
      update (route) {
        const path = route ? route.path : this.$route.path
        const openName = path.split('/')[1]
        const activeName = '/' + openName

        this.$set(this, 'activeName', activeName)
        this.$set(this, 'openNames', [openName])

        this.$nextTick(() => {
          this.$refs.menu.updateActiveName()
          this.$refs.menu.$children.forEach((item) => {
            item.opened = false
          })
          this.$refs.menu.updateOpened()
        })
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
