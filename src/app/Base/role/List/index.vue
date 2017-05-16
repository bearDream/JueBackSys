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
      v-model="add.modal"
      title="添加角色"
      @on-ok="handleAddOk">

      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Form-item label="角色名：" prop="roleName">
            <Row>
              <i-col span="12">
                <Input v-model="formValidate.roleName" placeholder="请输入角色名"></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="角色类别" prop="roleType">
            <Radio-group v-model="formValidate.roleType">
              <Radio label="1"><span>管理员</span></Radio>
              <Radio label="2"><span>普通用户</span></Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="角色介绍" prop="roleContent">
            <!--<Input v-model="formValidate.roleContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" placeholder="请输入角色介绍"></Input>-->
            <Editor ref="editor" v-model="formValidate.roleContent" @change="handleEditorChange"></Editor>
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
      <Breadcrumb-item>角色管理</Breadcrumb-item>
    </Breadcrumb>
    <Spin fix v-show="role_spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="role.roles.page.list"
      :total="role.roles.page.total"
      @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="handleAdd">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入角色名" v-model="search.title" style="width: 230px;"
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
        roleType: '管理员角色',
        roleContent: '',
        formValidate: {
          roleName: '',
          roleType: '1',
          roleContent: ''
        },
        ruleValidate: {
          roleName: [
            {
              required: true,
              message: '角色名不能为空'
            },
            {
              max: 15,
              message: '角色名不能多于 15 个字'
            }
          ],
          roleType: [
            {
              required: false,
              message: '角色类型不能为空'
            }
          ],
          roleContent: [
            {
              required: false,
              message: '角色介绍不能为空'
            }
          ]
        },
        role_spin: false,
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
            title: '角色id',
            key: 'roleId',
            width: 80
          },
          {
            title: '角色名',
            key: 'roleName',
            width: 125
          },
          {
            title: '内容',
            key: 'roleContent',
            width: 125
          },
          {
            title: '添加时间',
            key: 'addTime',
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
              return `</a><i-button type="ghost" size="small" @click="handleEdit(${row.roleId})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.roleId})">删除</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'role'
    ]),
    // 用于随时监视vuex管理的role.role对象是否有数据，当有数据时即将数据加入到formValidate中，这样就能将数据显示出来了
    watch: {
      'role.role': {
        handler (newVal) {
          this.$set(this, 'formValidate', newVal.data.page.list[0])
        }
      }
    },
    created () {
      this.$store.dispatch('show_base_nav')
      this.get()
    },
    methods: {
        // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getRoles', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      // 拉去单条role的具体数据
      getRole (id) {
        this.$store.dispatch('getRole', {
          params: {
            roleId: id
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
        this.getRole(id)
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
        this.$store.dispatch('deleteRole', {
          params: {
            roleId: this.del.id
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
            const action = this.id ? 'putRole' : 'postRole'
            const uri = this.id

//            console.info(this.formValidate)
            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.$Message.success((this.id ? '编辑角色' : '新增角色') + '成功！')
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
        this.$set(this.formValidate, 'roleContent', html)
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
