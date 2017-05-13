<template>
  <Menu mode="horizontal" active-name="1">
    <Row>
      <Col span="24">
          <Row>
            <Col span="2"><i class="i1"></i>查找
            </Col>
            <Col span="3"><i class="i2"></i>清除用
            户</Col>
            <Col span="2"><i class="i3"></i>增加
            </Col>
            <Col span="2"><i class="i4"></i>修改
            </Col>
            <Col span="2" offset="13"><i
            class="i5"></i>刷新</Col>
          </Row>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <Row>
        <Col span="4">序号</Col>
        <Col span="4">用户名</Col>
        <Col span="4">类型</Col>
        <Col span="4">联系方式</Col>
        <Col span="4">时间</Col>
        <Col span="4">等级</Col>
      </Row>
      <Row>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
      </Row>
      <Row>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
        <Col span="4"> </Col>
      </Row>
      <Row>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
      </Row>
      <Row>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
      </Row>
      <Row>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
      </Row>
      <Row>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
      </Row>
      <Row>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>
        <Col span="4"></Col>

      </Row>
      </Col>
    </Row>
    <Row>
      <Col span="6" offset="18" style="margin-top:10px;">

        <Page :total="10" show-total></Page>

      </Col>
    </Row>
  </Menu>


</template>

<script>
  export default {
    name: 'buisnessNavigation',
    methods: {
      handleSelect (name) {
        this.$router.push(name)
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
