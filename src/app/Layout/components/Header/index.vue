<template>
  <div class="header">
    <div class="header-center">
      <Button type="ghost" size="large" icon="social-windows" @click="home" class="logo">蕨菜后台管理</Button>
      <div class="operations">
        <Button-group size="small">
          <Button type="ghost" icon="android-person">当前用户：{{username}}</Button>
          <Button type="error" icon="log-out" @click="handleLogout">退出</Button>
        </Button-group>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'header',
    data () {
      return {
        username: ''
      }
    },
    created () {
      if (this.$store.getters.getLoginUser.username !== undefined) {
        this.$set(this, 'username', this.$store.getters.getLoginUser.username)
      } else {
        this.$set(this, 'username', '系统管理员')
      }
    },
    methods: {
      handleLogout () {
        this.$store.dispatch('logoutAction')
        this.$router.push('/logout')
        this.$Message.success('退出成功')
      },
      computed: mapState([
        'navigation'
      ]),
      home () {
        this.$store.dispatch('show_none_nav', {})
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
