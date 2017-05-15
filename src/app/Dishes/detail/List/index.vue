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
      v-model="add.modal"
      title="添加菜品标签">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标签名称" prop="dishtagName">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.dishtagName" placeholder="请输入标签名称"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="标签类型" prop="dishtagType">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.dishtagType" placeholder="请输入标签类型"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item>
          <Button type="success" @click="handleSave('formValidate')" class="margin-right-sm">保存</Button>
        </Form-item>
      </Form>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">菜品管理</Breadcrumb-item>
      <Breadcrumb-item>菜品详细详细</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="dishtag.dishtags.page.list"
          :total="dishtag.dishtags.page.total"
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
    name: 'list',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    },
    data () {
      return {
        id: '',
        formValidate: {
          dishtagName: '',
          dishtagType: ''
        },
        ruleValidate: {
          dishtagName: [
            {
              required: true,
              message: '菜名不能为空'
            },
            {
              max: 30,
              message: '菜名不能多于 30 个字'
            }
          ],
          dishtagType: [
            {
              required: true,
              message: '类型名称不能为空'
            },
            {
              max: 2000,
              message: '类型名称长度过长'
            }
          ]
        },
        del: {
          modal: false,
          id: 0
        },
        search: {
          title: ''
        },
        dish_spin: false,
        add: {
          modal: false,
          id: 0
        },
        current: 1,
        columns: [
          {
            title: '序号',
            key: 'dishtagId'
          },
          {
            title: '名称',
            key: 'dishtagName'
          },
          {
            title: '菜品序号',
            key: 'dishtagType'
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
              return `<i-button type="ghost" size="small" @click="handleEdit(${row.id})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.id})">删除</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'dishtag'
    ]),
    created () {
      this.get()
    },
    methods: {
      // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getDishtags', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      getDishtag (id) {
        this.$store.dispatch('getDishtag', {
          params: {
            dishId: id
          }
        })
      },
      handleAdd (id) {
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const action = this.id ? 'putDishtag' : 'postDishtag'
            const uri = this.id

            console.info(this.formValidate)
            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.$Message.success((this.id ? '编辑' : '新增') + '成功！')
              this.resetFields()
              this.$Modal.remove()
              this.$set(this.add, 'modal', false)
            })
          } else {
            this.$Message.error('保存失败')
          }
        })
      },
      handleEdit (id) {
        this.getDishtag(id)
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handlePageChange (current) {
        this.get(current)
      },
      handleSearch () {
        this.get()
        this.$set(this, 'current', 1)
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
