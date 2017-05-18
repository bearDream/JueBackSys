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
      <p>确认修改该记录？</p>
    </Modal>
    <Modal
      v-model="add.modal"
      title="添加角色"
      @on-ok="handleAddOk">

      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Form-item label="商家id：" prop="businessId">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.businessId" placeholder="请输入新的商家id"></Input>
              </i-col>
            </Row>
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.name" placeholder="请输入新的的商家名"></Input>
              </i-col>
            </Row>
          </Form-item>
          <!--<Form-item label="商家地址" prop="address">-->
            <!--&lt;!&ndash;<Input v-model="formValidate.roleContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" placeholder="请输入角色介绍"></Input>&ndash;&gt;-->
            <!--&lt;!&ndash;<Editor ref="editor" v-model="formValidate.content" @change="handleEditorChange"></Editor>&ndash;&gt;-->
          <!--</Form-item>-->
          <Button type="success" long @click="handleSave('formValidate')">保存</Button>
        </Form>
      </div>
      <!-- 表单 -->

      <div slot="footer">
      </div>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">商家</Breadcrumb-item>
      <Breadcrumb-item>标签</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="businesstable.businesstables.page.list"
          :total="businesstable.businesstables.page.total"
          @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="handleAdd">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入用户名" v-model="search.title" style="width: 230px;"
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
    name: 'businesstable',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    },
    data () {
      return {
        tagId: '',
        name: '',
        content: '',
        formValidate: {
          tagId: '',
          name: '',
          content: ''
        },
        ruleValidate: {
          name: [
            {
              required: true,
              message: '名字不能为空'
            },
            {
              max: 15,
              message: '不能多于 15 个字'
            }
          ],
          content: [
            {
              required: false,
              message: '商家介绍不能为空'
            }
          ]
        },
        del: {
          modal: false,
          id: 0
        },
        add: {
          id: 0,
          modal: false
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
      'businesstable'
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
        this.$store.dispatch('getBusinesstabels', {
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
      handleAdd (id) {
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleAddOk () {
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
