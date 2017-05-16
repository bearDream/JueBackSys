<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="确认框"
      @on-ok="handleDelOk">
      <p>确认删除该记录？</p>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">基础信息管理</Breadcrumb-item>
      <Breadcrumb-item>日志管理</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="log.logs.page.list"
      :total="log.logs.page.total"
      @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <!--<Button class="margin-right-sm" type="primary" @click="$router.push('log/form')">新增</Button>-->
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text"  placeholder="请输入用户名" v-model="search.title" style="width: 230px;"
                @on-enter="handleSearch"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="handleSearch" class="button" >查询</Button>
            </Form-item>
          </Form>
        </ListSearch>
      </ListHeader>
    </List>
  </div>
</template>
<style>
  .button{
    background-color: #B9C89F;
    border: none;
    color: #718D1C;
    font-weight: bold;
    border: 1px solid #B9C89F;
  }
  .button:hover{
    background-color: #B9C89F;
    border: none;
    color: #718D1C;
    font-weight: bold;
    border: 1px solid #B9C89F;
  }
  /*fhdfhdhdhdhdhdh*/
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
  /*div.ivu-table-cell div:first-child button:last-child{*/
    /*background-color: red;*/
    /*color: #FCFCFC;*/
    /*border-radius: 5px;*/
  /*}*/
  div.ivu-table-cell div:first-child button:first-child{
    color: #648D1C;
    border: 1px solid #648D1C;
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
</style>
<script>
  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
  import time from '@/utils/helpers/timeLite'
  import List, { ListHeader, ListOperations, ListSearch } from '@/components/List'

  export default {
    name: 'list',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    },
    data () {
      return {
        del: {
          modal: false,
          id: 0
        },
        search: {
          title: ''
        },
        current: 1,
        columns: [
          {
            title: 'ID',
            key: 'logId',
            width: 60
          },
          {
            title: '用户id',
            key: 'userId'
          },
          {
            title: '操作方法',
            key: 'actionkey'
          },
          {
            title: '添加时间',
            key: 'logAddtime',
            width: 180,
            render (row, column, index) {
              return `<span>${time.getDateTime(row.logAddtime + '000')}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, column, index) => {
              return `<i-button type="ghost" size="small" @click="handleEdit(${row.id})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.id})">删除</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'log',
      'navigation'
    ]),
    created () {
      this.get()
    },
    methods: {
        // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getLogs', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      handlePageChange (current) {
        this.get(current)
      },
      handleSearch () {
        this.get()
        this.$set(this, 'current', 1)
      },
      handleEdit (id) {
        this.$router.push(`/articles/form/${id}`)
      },
      handleDel (id) {
        this.$set(this.del, 'modal', true)
        this.$set(this.del, 'id', id)
      },
      handleDelOk () {
        this.$store.dispatch('deleteArticle', {
          params: {
            id: this.del.id
          }
        }).then(() => {
          this.$Message.success('删除成功！')
          this.get()
        })
      }
    }
  }
</script>
