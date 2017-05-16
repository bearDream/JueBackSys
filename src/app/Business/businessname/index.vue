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
      title="添加商家"
      @on-ok="handleAddOk">
      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="85">
          <Form-item label="商家ID：" prop="businessId">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.businessId" placeholder="请输入新的商家id"></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="商家名：" prop="name">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.name" placeholder="请输入新的的商家名"></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="商家电话：" prop="tel">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.tel" placeholder="请输入电话"></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="商家地址：" prop="address">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.address" placeholder="用户地址"></Input>
              </i-col>
            </Row>
            <!--<Input v-model="formValidate.roleContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" placeholder="请输入角色介绍"></Input>-->
            <!--<Editor ref="editor" v-model="formValidate.content" @change="handleEditorChange"></Editor>-->
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
      <Breadcrumb-item href="#">商家</Breadcrumb-item>
      <Breadcrumb-item href="">商家管理</Breadcrumb-item>
    </Breadcrumb>
    <Spin fix v-show="role_spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="businessname.businessnames.page.list"
          :total="businessname.businessnames.page.total"
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
  import Editor from '@/components/Editor'
  export default {
    name: 'businessname',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch,
      Editor
    },
    data () {
      return {
        businessId: '',
        name: '',
        address: '',
        tel: '',
        content: '',
        businessImage: '',
        isShow: '',
        addTime: '',
        formValidate: {
          businessId: '',
          name: '',
          address: '',
          tel: '',
          content: '',
          businessImage: '',
          isShow: '',
          addTime: ''
        },
        ruleValidate: {
          businessId: [
            {
              required: true,
              message: '商家id不能为空'
            }
          ],
          name: [
            {
              required: true,
              message: '商家名不能为空'
            },
            {
              max: 15,
              message: '商家名不能多于 15 个字'
            }
          ],
          tel: [
            {
              required: true,
              message: '电话不能为空'
            },
            {
              max: 11,
              message: '电话不能多于11个数字'
            }
          ],
          content: [{
            required: true,
            message: '内容不能为空'
          }],
          address: [{
            required: true,
            message: '地址不能为空'
          }]
        },
        add: {
          id: 0,
          modal: false
        },
        role_spin: false,
        del: {
          modal: false,
          id: 0
        },
        edt: {
          modal: false,
          id: 0
        },
        search: {
          title: ''
        },
        current: 1,
        columns: [
          {
            title: '商家ID',
            key: 'businessId'
          },
          {
            title: '店名',
            key: 'name'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '图片',
            key: 'businessImage'
          },
          {
            title: '商家信息',
            key: 'content'
          },
          {
            title: '添加时间',
            key: 'addTime',
            render (row, column, index) {
              return `<span>${time.getDateTime(row.addTime + '000')}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, column, index) => {
              return `<i-button type="ghost" size="small" @click="handleEdit(${row.businessId})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.businessId})">删除</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'businessname'
    ]),
    // 用于随时监视vuex管理的role.role对象是否有数据，当有数据时即将数据加入到formValidate中，这样就能将数据显示出来了
    watch: {
      'businessname.businessname': {
        handler (newVal) {
          console.info('-----------------------------------------------------------')
          console.info(newVal.data.page.list[0])
          this.$set(this, 'formValidate', newVal.data.page.list[0])
        }
      }
    },
    created () {
      console.info(this.$store)
      this.$set(this, 'role_spin', true)
      this.get()
      this.$set(this, 'role_spin', false)
    },
    methods: {
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getBusinessnames', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      getBusinessname (id) {
        this.$store.dispatch('getBusinessname', {
          params: {
            businessId: id
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
        this.getBusinessname(id)
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleDel (id) {
        this.$set(this.del, 'modal', true)
        this.$set(this.del, 'id', id)
      },
      handleAdd (id) {
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleDelOk () {
        this.$store.dispatch('deleteBusinessname', {
          params: {
            id: this.del.id
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
            const action = this.id ? 'putBusinessname' : 'postBusinessname'
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
        this.$set(this.formValidate, 'content', html)
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
