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
      title="添加菜品">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="菜品名称" prop="dishName">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.dishName" placeholder="请输入菜品名称"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="菜品类型" prop="dishDesc">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.dishDesc" placeholder="请输入菜品类型"></Input>
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
      <Breadcrumb-item>菜品基础信息</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="dish.dishs.page.list"
          :total="dish.dishs.page.total"
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
    created () {
      this.id = this.$store
      console.info(this.$store)
      this.id && this.get(this.id)
    },
    data () {
      return {
        id: '',
        formValidate: {
          dishName: '',
          dishDesc: ''
        },
        ruleValidate: {
          dishName: [
            {
              required: true,
              message: '菜名不能为空'
            },
            {
              max: 30,
              message: '菜名不能多于 30 个字'
            }
          ],
          dishDesc: [
            {
              required: true,
              message: '内容不能为空'
            },
            {
              max: 2000,
              message: '内容长度过长'
            }
          ]
        },
        dish_spin: false,
        add: {
          modal: false,
          id: 0
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
            title: '序号',
            key: 'dishBusinessId'
          },
          {
            title: '菜品序号',
            key: 'dishId'
          },
          {
            title: '商家序号',
            key: 'businessId'
          },
          {
            title: '菜品名称',
            key: 'dishName'
          },
          {
            title: '菜品类型',
            key: 'dishType'
          },
          {
            title: '菜品详细介绍',
            key: 'dishContent'
          },
          {
            title: '菜品简短介绍',
            key: 'dishDesc'
          },
          {
            title: '是否参加活动',
            key: 'isFavorable'
          },
          {
            title: '是否显示',
            key: 'isShow'
          },
          {
            title: '是否置顶',
            key: 'isTop'
          },
          {
            title: '订单数量',
            key: 'dishId',
            width: 80
          },
          {
            title: '添加时间',
            key: 'addTime',
            width: 180,
            render (row, column, index) {
              return `<span>${time.getDateTime(row.addTime + '000')}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, column, index) => {
              return `</a><i-button type="ghost" size="small" @click="handleEdit(${row.dishId})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.dishId})">删除</i-button>`
            }
          }
        ]
      }
    },
    computed: mapState([
      'dish'
    ]),
    methods: {
      // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getDishs', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.search
          }
        })
      },
      getDish (id) {
        this.$store.dispatch('getDish', {
          params: {
            dishId: id
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
      handleAdd (id) {
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const action = this.id ? 'putDish' : 'postDish'
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
//        this.$router.push(`/articles/form/${id}`)
        /*
         1、把id存到data里面
         2、显示对话框
         3、执行get请求获取数据，watch监听数据变化了就自动将数据放到validator里面
         */
        this.getDish(id)
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleDel (id) {
        alert(id)
        this.$set(this.del, 'modal', true)
        this.$set(this.del, 'id', id)
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      },
      handleDelOk () {
        this.$store.dispatch('deleteDish', {
          params: {
            id: this.del.id
          }
        }).then(() => {
          this.$Message.success('删除成功！')
          this.get()
        })
      },
      watch: {
        'dish.dish': {
          handler (newVal) {
            console.info('------------------')
            console.log(newVal.data.page.list[0])
            this.$set(this, 'formValidate', newVal.data.page.list[0])
          }
        }
      }
    }
  }
</script>
