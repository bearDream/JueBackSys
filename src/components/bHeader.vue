<template>
  <Row>
    <i-col span="4" class="search">
      <img src="" alt="">
      <span>查找</span>
    </i-col>
    <i-col span="4" class="clear">
      <img src="" alt="">
      <span>清除菜品</span>
    </i-col>
    <i-col span="4" class="add">
      <img src="" alt="">
      <span>增加</span>
    </i-col>
    <i-col span="4" class="update">
      <img src="" alt="">
      <span>修改</span>
    </i-col>
    <i-col span="4" offset="4" class="refresh">
      <img src="" alt="">
      <span>刷新</span>
    </i-col>
  </Row>
</template>

<script>
  export default {
    name: 'bheader'
  }
</script>

<style>
  .ivu-col>img{
    width:20px;
    height:20px;
  }
  .ive-col>span{
    color:#59850b;
    font-size:12px;
  }

</style>
