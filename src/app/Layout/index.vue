<template>
  <div>
    <div class="main">
      <Row>
        <i-col>
          <p style="height: 30px"></p>
        </i-col>
      </Row>
      <!-- 中间内容区域  包括了左边的sidebar和右边的navigation和body -->
      <div>
        <Row>
          <i-col span="5">
            <Sidebar ref="sidebar"></Sidebar>
          </i-col>
          <i-col span="18">
            <Row>
              <i-col>
                <BaseNavigationtio v-show="navigation.base"></BaseNavigationtio>
                <BusinessNavigation v-show="navigation.business"></BusinessNavigation>
                <UserNavigationtio v-show="navigation.user"></UserNavigationtio>
              </i-col>
            </Row>
            <Row>
              <i-col>
                <Body></Body>
              </i-col>
            </Row>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Sidebar from './components/Sidebar'
  import Body from './components/Body'
  import BaseNavigationtio from './components/BaseNavigation'
  import BusinessNavigation from './components/BusinessNavigation'
  import UserNavigationtio from './components/UserNavigationtio'

  export default {
    name: 'layout',
    computed: mapState([
      'navigation'
    ]),
    components: {
      Sidebar,
      Body,
      BaseNavigationtio,
      BusinessNavigation,
      UserNavigationtio
    },
    created () {
      console.info(this.navigation.base)
    },
    beforeRouteUpdate (to, from, next) {
      let path = to.path
      // 控制导航栏的显示
      switch (path) {
        case '/baseFrame':
          this.$store.dispatch('show_base_nav')
          break
        case '/businessFrame':
          this.$store.dispatch('show_business_nav')
          break
        case '/userFrame':
          this.$store.dispatch('show_user_nav')
          break
      }
      this.$nextTick(() => {
        this.$refs.sidebar.update(to)
      })
      next()
    }
  }
</script>


<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
