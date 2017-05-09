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
                <Navigation></Navigation>
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
      <!--<Sidebar ref="sidebar"></Sidebar>-->
      <!--<Navigation></Navigation>-->
      <!--<Body></Body>-->
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Header from './components/Header'
  import Body from './components/Body'
  import Navigation from './components/Navigation'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Header,
      Body,
      Navigation
    },
    beforeRouteUpdate (to, from, next) {
      this.$nextTick(() => {
        this.$refs.sidebar.update(to)
      })
      next()
    }
  }
</script>


<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
