<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="删除日志"
      @on-ok="handleDelOk">
      <p>确认删除该条日志？</p>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">基础信息管理</Breadcrumb-item>
      <Breadcrumb-item>日志管理</Breadcrumb-item>
    </Breadcrumb>
    <List :current="current" :columns="columns" :data="pageList"
      :total="pageTotal"
      @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <!--<Button class="margin-right-sm" type="primary" @click="$router.push('log/form')">新增</Button>-->
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="userId">
              <Input type="text" placeholder="请输入用户名" v-model="search.userId" style="width: 230px;"
                @on-enter="handleSearch"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="handleSearch">查询</Button>
            </Form-item>
          </Form>
        </ListSearch>
      </ListHeader>
    </List>
  </div>
</template>

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
        pageTotal: 1,
        pageList: [],
        search: {
          userId: ''
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
              return `<span>${time.getDateTime(row.logAddtime)}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            render: (row, column, index) => {
              return `<i-button type="error" @click="handleDel(${row.logId})">删除</i-button>`
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
      this.$store.dispatch('show_base_nav')
      this.get()
      var me = this
      // 异步请求的原因，因此需要用定时器来模拟设置数据
      setTimeout(function () {
        console.info(me.$store.state.log.logs.page.list)
        if (me.$store.getters.getLogs !== null) {
          me.$set(me, 'pageTotal', me.$store.state.log.logs.page.total)
          me.$set(me, 'pageList', me.$store.state.log.logs.page.list)
        } else {
          me.$Notice.error({
            title: '网络出错',
            desc: '网络请求失败，请联系后台人员'
          })
        }
      }, 500)
    },
    watch: {
      'log.logs': {
        handler (newVal) {
          this.$set(this, 'pageTotal', this.$store.state.log.logs.page.total)
          this.$set(this, 'pageList', this.$store.state.log.logs.page.list)
        }
      }
    },
    methods: {
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getLogs', {
          params: {
            pageNum: current,
            pageSize: consts.PAGE_SIZE,
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
        this.$store.dispatch('deleteLog', {
          params: {
            logId: this.del.id
          }
        }).then(() => {
          this.$Message.success('删除成功！')
          this.get()
        })
      }
    }
  }
</script>
<style>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
