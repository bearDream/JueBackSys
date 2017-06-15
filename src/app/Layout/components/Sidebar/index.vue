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
        this.$router.replace({path: '/' + name})
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
<style>
  li.ivu-page-item:hover {
    border-color:#648D1C;
    background-color: #648D1C;
  }

  li.ivu-page-item-active {
    border-color:#648D1C;
    background-color: #648D1C;
  }
  span.ivu-page-total{
    color:#648D1C;
    font-weight: bold;
  }
  div.ivu-page-options-elevator{
    color:#648D1C;
    font-weight: bold;
  }
  div.ivu-table-cell div:first-child button:last-child{
    color: red;
    border: 1px solid red;
  }
  div.ivu-table-cell div:first-child button:first-child{
    color: #648D1C;
    border: 1px solid #648D1C;
  }
  div.ivu-table-cell div button.ivu-btn-error{
    color: red !important;
    background-color: transparent;
    border: 1px solid red !important;
  }
  /*div.ivu-table-cell div:first-child button:first-child{*/
  /*background-color: #648D1C;*/
  /*color: #FCFCFC;*/
  /*border-radius: 5px;*/
  /*}*/
  div.ivu-modal-footer button:last-child{
    background-color: #648D1C;
    border: 1px solid #648D1C;
  }
  div.ivu-modal-footer button:first-child:hover{
    color: #648D1C;
  }
  form.ivu-form button{
    background-color: #648D1C;
    border: 1px solid #648D1C;
  }
  form.ivu-form button:hover{
    background-color: #648D1C;
    border: 1px solid #648D1C;
  }
  div.ivu-form-item-content button{
    background-color: #B9C89F;
    border: none;
    color: #648D1C;
    font-weight: bold;
    border: 1px solid #B9C89F;
  }
  div.ivu-form-item-content button:hover{
    background-color: #B9C89F;
    border: none;
    color: #648D1C;
    font-weight: bold;
    border: 1px solid #B9C89F;
  }
  div.header div.operations button.margin-right-sm{
    background-color: #B9C89F;
    border: none;
    color: #648D1C;
    font-weight: bold;
    border: 1px solid #B9C89F;
  }
  div.header-center button:first-child{
    color: #648D1C;
  }
  div.header-center button:first-child:hover{
    color: #648D1C;
    border: 1px solid #648D1C;
  }
  div.header-center button:last-child{
    color: #648D1C;
  }
  div.header-center button:last-child:hover{
    color: #648D1C;
    border: 1px solid #648D1C;
  }

  .ivu-btn-group:not(.ivu-btn-group-vertical) > .ivu-btn:last-child:not(:first-child){
    background-color: #FCFCFC !important;
    color: red;
  }
  .ivu-btn-error:hover{
    border: 1px solid red !important;
  }
  ul.ivu-menu>li {
    width:25%;
    /*border-left:2px solid #EDEDED !important;*/
    border-bottom: 1px solid transparent !important;
    border-radius: 6px;
    background-color:#FCFCFC;
    animation:backgroundColor .5 linear;
    color: #648D1C !important;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
  ul.ivu-menu>li:first-child{
    border-left: none !important;
  }
  ul.ivu-menu>li.ivu-menu-item-selected{
    background-color:#B9C89F;
  }
  .ivu-menu-horizontal.ivu-menu-light:after{
    background:none;
  }
  .ivu-menu-horizontal.ivu-menu-light:after{
    background: none !important;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item{
    font-size: 15px;
  }
</style>
<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
