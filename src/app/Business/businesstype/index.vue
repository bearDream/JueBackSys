<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="删除"
      @on-ok="handleDelOk">
      <p>确认删除该记录？</p>
    </Modal>
    <Modal
      v-model="add.modal"
      title="添加商家分类"
      @on-ok="handleAddOk">

      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Form-item label="创建商家id" prop="businessTypeId">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.businessTypeId" placeholder="请输入的商家ID"></Input>
              </i-col>
            </Row>
          </Form-item>

          <Form-item label="创建商家名" prop="name">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.typeName" placeholder="请输入编辑的商家名"></Input>
              </i-col>
            </Row>
          </Form-item>

          <Form-item label="输入商家内容" prop="content">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.content" placeholder="输入商家内容"></Input>
              </i-col>
            </Row>
          </Form-item>


          <Button type="success" long @click="handleSave('formValidate')">保存</Button>
        </Form>
      </div>
      <!-- 表单 -->

      <div slot="footer">
      </div>
    </Modal>

    <Modal
      v-model="edit.modal"
      title="修改"
      @on-ok="handleEdit">

      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item label="编辑商家名" prop="name">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.name" placeholder="请输入编辑的商家名"></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="编辑商家类型" prop="type">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.businessType" placeholder="请输入编辑的商类型"></Input>
              </i-col>
            </Row>
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
      <Breadcrumb-item href="#">商家类型</Breadcrumb-item>
    </Breadcrumb>
    <List :current="current" :columns="columns" :data="businesstype.businesstypes.page.list"
          :total="businesstype.businesstypes.page.total"
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
    name: 'businesstype',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    },
    data () {
      return {
        businessTypeId: '',
        typeName: '',
        parentId: '',
        content: '',
        formValidate: {
          businessTypeId: '',
          typeName: '',
          content: ''
        },
        ruleValidate: {
          businessTypeId: [
            {
              required: true,
              message: 'ID不能为空'
            },
            {
              max: 15,
              message: 'ID不能过15个'
            }
          ],
          typeName: [
            {
              required: true,
              message: '名字不能为空'
            },
            {
              max: 15,
              message: '名字不能过15个'
            }
          ],
          parentId: [
            {
              required: true,
              message: 'id不能为空'
            },
            {
              max: 15,
              message: 'id不能超过15个'
            }
          ],
          content: [
            {
              required: true,
              message: '内容不能为空'
            }
          ]
        },
        add: {
          id: 0,
          modal: false
        },
        edit: {
          id: 0,
          modal: false
        },
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
            title: '商家ID',
            key: 'businessTypeId'
          },
          {
            title: '店名',
            key: 'typeName'
          },
          {
            title: 'parentId',
            key: 'parentId'
          },
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '时间',
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
      'businesstype'
    ]),
    // 用于随时监视vuex管理的businesstype.businesstype对象是否有数据，当有数据时即将数据加入到formValidate中，这样就能将数据显示出来了
    watch: {
      'businesstype.businesstype': {
        handler (newVal) {
          console.info('-----------------------------------------------------------')
          console.info(newVal.data.page.list[0])
          this.$set(this, 'formValidate', newVal.data.page.list[0])
        }
      }
    },
    created () {
      this.get()
    },
    methods: {
      get (current = 1) {
        this.$set(this, 'current', current)
        this.$store.dispatch('getBusinesstypes', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      getBusinesstype (id) {
        this.$store.dispatch('getBusinesstype', {
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
        this.getBusinesstype(id)
        this.$set(this.edit, 'id', id)
        this.$set(this.edit, 'modal', true)
      },
      handleDel (id) {
        this.$set(this.del, 'modal', true)
        this.$set(this.del, 'id', '')
      },
      handleAdd (id) {
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleDelOk () {
        this.$store.dispatch('deleteBusinesstype', {
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
            const action = this.id ? 'putBusinesstype' : 'postBusinesstype'
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
        this.$set(this.formValidate, 'content', html)
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      }
    }
  }
</script>
