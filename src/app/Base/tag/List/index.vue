<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="确认框"
      @on-ok="handleDelOk">
      <p>确认删除该记录？</p>
    </Modal>
    <Modal
      width="300"
      v-model="editor.modal"
      title="确认框"
      @on-ok="handleeditOk">
      <p>确认删除该记录？</p>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">基础信息管理</Breadcrumb-item>
      <Breadcrumb-item>标签</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="tag.tags.page.list"
      :total="tag.tags.page.total"
      @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm button" type="primary" @click="$router.push('tag/form')">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入用户名" v-model="search.title" style="width: 230px;"
                @on-enter="handleSearch"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="handleSearch" class="button">查询</Button>
            </Form-item>
          </Form>
        </ListSearch>
      </ListHeader>
    </List>
  </div>
</template>
<!--<style>-->
  <!--.button{-->
    <!--background-color: #B9C89F;-->
    <!--border: none;-->
    <!--color: #718D1C;-->
    <!--font-weight: bold;-->
    <!--border: 1px solid #B9C89F;-->
  <!--}-->
  <!--.button:hover{-->
    <!--background-color: #B9C89F;-->
    <!--border: none;-->
    <!--color: #718D1C;-->
    <!--font-weight: bold;-->
    <!--border: 1px solid #B9C89F;-->
  <!--}-->

<!--</style>-->
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
        editor: {
          modal: false,
          id: 0
        },
        search: {
          title: ''
        },
        current: 1,
        columns: [
          {
            title: '角色id',
            key: 'tagId'
//            width: 80
          },
          {
            title: '角色名',
            key: 'name'
//            width: 125
          },
          {
            title: '味道',
            key: 'content',
            width: 125
          },
          {
            title: '添加时间',
            key: 'addTime',
            width: 180,
            render (row, column, index) {
              return `<span>${time.getDateTime(row.tagAddtime + '000')}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, tagId, index) => {
              return `</a><i-button type="ghost" size="small" @click="handleEdit(${row.tagId})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.tagId})">删除</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'tag'
    ]),
    created () {
      console.info(this.$store)
      this.get()
      console.info(this.$store)
    },
    methods: {
        // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)
        this.$store.dispatch('getTags', {
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
      handleeditOk () {
        this.$set(this.editor, 'modal', true)
//        this.$set(this.editor, 'id', id)
      },
      handleDel (id) {
        alert(id)
        this.$set(this.del, 'modal', true)
        this.$set(this.del, 'id', id)
      },
      handleDelOk () {
        this.$store.dispatch('deleteTag', {
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
