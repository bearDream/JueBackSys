<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="封禁用户"
      @on-ok="handleDelOk">
      <p>确认禁用该用户吗？</p>
    </Modal>
    <Modal
      v-model="add.modal"
      title="修改用户信息"
      @on-ok="handleAddOk">

      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Form-item label="用户名：" prop="userName">
            <Row>
              <i-col span="12">
                <Input v-model="formValidate.userName" placeholder="请输入用户名"></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="用户类别" prop="userType">
            <Radio-group v-model="formValidate.userType">
              <Radio label="1"><span>管理员</span></Radio>
              <Radio label="2"><span>普通用户</span></Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="用户介绍" prop="userContent">
            <!--<Input v-model="formValidate.userContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" placeholder="请输入角色介绍"></Input>-->
            <Editor ref="editor" v-model="formValidate.userContent" @change="handleEditorChange"></Editor>
          </Form-item>
          <Button type="success" long @click="handleSave('formValidate')">保存</Button>
        </Form>
      </div>
      <!-- 表单 -->

      <div slot="footer">
      </div>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">基础信息管理</Breadcrumb-item>
      <Breadcrumb-item>用户管理</Breadcrumb-item>
    </Breadcrumb>
    <Spin fix v-show="user_spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="userList"
          :total="userTotal"
          @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <!--<Button class="margin-right-sm" type="primary" @click="handleAdd">新增</Button>-->
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
  import List, { ListHeader, ListOperations, ListSearch } from '@/components/List'
  import Editor from '@/components/Editor'

  export default {
    name: 'list',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch,
      Editor
    },
    data () {
      return {
        id: '',
        userTotal: 1,
        userList: [],
        userType: '管理员用户',
        userContent: '',
        formValidate: {
          userName: '',
          userType: '1',
          userContent: ''
        },
        ruleValidate: {
          userName: [
            {
              required: true,
              message: '用户名不能为空'
            },
            {
              max: 15,
              message: '用户名不能多于 15 个字'
            }
          ],
          userType: [
            {
              required: false,
              message: '用户类型不能为空'
            }
          ],
          userContent: [
            {
              required: false,
              message: '用户介绍不能为空'
            }
          ]
        },
        user_spin: false,
        del: {
          modal: false,
          id: 0
        },
        add: {
          id: 0,
          modal: false
        },
        search: {
          title: ''
        },
        current: 1,
        columns: [
          {
            title: '序号',
            key: 'userId',
            width: 80
          },
          {
            title: '用户名',
            key: 'username',
            width: 125
          },
          {
            title: '类型',
            key: 'type',
            width: 80
          },
          {
            title: '电话',
            key: 'tel',
            width: 125
          },
          {
            title: '等级',
            key: 'level',
            width: 125
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, column, index) => {
              return `</a><i-button type="ghost" size="small" @click="handleEdit(${row.roleId})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.userId})">封禁</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'user'
    ]),
    // 用于随时监视vuex管理的user.user对象是否有数据，当有数据时即将数据加入到formValidate中，这样就能将数据显示出来了
    watch: {
      'user.user': {
        handler (newVal) {
          console.info('-----------------------------------------------------------')
          console.info(newVal.data.page.list[0])
          this.$set(this, 'formValidate', newVal.data.page.list[0])
        }
      },
      'user.users': {
        handler (newVal) {
          this.$set(this, 'userTotal', this.$store.state.user.users.page.total)
          this.$set(this, 'userList', this.$store.state.user.users.page.list)
        }
      }
    },
    created () {
      console.info(this.$store)
      this.get()
      let me = this
      setTimeout(function () {
        if (me.$store.getters.getUsers !== null) {
          me.$set(me, 'userTotal', me.$store.state.user.users.page.total)
          me.$set(me, 'userList', me.$store.state.user.users.page.list)
        } else {
          me.$Notice.error({
            title: '网络出错',
            desc: '网络请求失败，请联系后台人员'
          })
        }
      }, 500)
    },
    methods: {
      // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getUsers', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      // 拉去单条user的具体数据
      getUser (id) {
        this.$store.dispatch('getUser', {
          params: {
            userId: id
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
        this.getUser(id)
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleAdd (id) {
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleDel (id) {
        this.$set(this.del, 'modal', true)
        this.$set(this.del, 'id', id)
      },
      handleDelOk () {
        this.$store.dispatch('deleteUser', {
          params: {
            userId: this.del.id
          }
        }).then(() => {
          this.$Message.success('删除成功！')
          this.get()
        })
      },
      handleAddOk () {

      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const action = this.id ? 'putUser' : 'postUser'
            const uri = this.id

//            console.info(this.formValidate)
            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.$Message.success((this.id ? '编辑用户' : '新增用户') + '成功！')
              this.resetFields()
              this.$set(this.add, 'modal', false)
            })
          } else {
            this.$Message.error('保存失败!')
          }
        })
      },
      handleEditorChange (html) {
        console.info(html)
        this.$set(this.formValidate, 'userContent', html)
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
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
