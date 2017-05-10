<template>
  <div>
    <div class="main">
      <!-- 顶部title -->
      <Header class="header"></Header>
      <Row>
        <i-col>
          <p style="height: 30px"></p>
        </i-col>
      </Row>
      <!-- 中间内容区域  包括了左边的sidebar和右边的navigation和body -->
      <div>
        <Row>
          <i-col span="6">
            <Sidebar ref="sidebar"></Sidebar>
          </i-col>
          <i-col span="2"></i-col>
          <i-col span="14">
            <Row>
              <i-col>
                <BaseNavigationtio v-show="navigation.base"></BaseNavigationtio>
                <BusinessNavigation v-show="navigation.business"></BusinessNavigation>
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
  import Header from './components/Header'
  import Body from './components/Body'
  import BaseNavigationtio from './components/BaseNavigation'
  import BusinessNavigation from './components/BusinessNavigation'

  export default {
    name: 'layout',
    computed: mapState([
      'navigation'
    ]),
    components: {
      Sidebar,
      Header,
      Body,
      BaseNavigationtio,
      BusinessNavigation
    },
    beforeRouteUpdate (to, from, next) {
      console.info('--------beforeRouteUpdate----------')
      let path = to.path
      // 控制导航栏的显示
      switch (path) {
        case '/baseFrame':
          this.$store.dispatch('show_base_nav', {})
          break
        case '/businessFrame':
          this.$store.dispatch('show_business_nav', {})
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
