<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="确认删除"
      @on-ok="handleDelOk">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除该营养价值信息？</p>
      </div>
      <p slot="footer">
        <Button type="error" long :loading="deleteLoading" @click="handleDelOk('formValidate')">确认删除</Button>
      </p>
    </Modal>
    <Modal
      width="600"
      v-model="add.modal"
      title="添加营养价值数据">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Form-item label="热量" prop="heat">
          <Row>
            <i-col span="12">
              <Slider v-model="formValidate.heat" :step=1 :min=1 :max=4 show-input show-stops></Slider>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="糖分" prop="sugarContent">
          <Row>
            <i-col span="12">
              <Slider v-model="formValidate.sugarContent" :min=1 :max=4 show-input :step=1 show-stops></Slider>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="营养价值简介" prop="grease">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.grease" placeholder="请输入营养价值简介"></Input>
            </i-col>
          </Row>
        </Form-item>
      </Form>
      <!-- 表单 -->

      <div slot="footer">
        <Button type="success" long :loading="nutrtionLoading" @click="handleSave('formValidate')">保存</Button>
      </div>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">菜品管理</Breadcrumb-item>
      <Breadcrumb-item>营养价值</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="nutritionList"
          :total="nutritionTotal"
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
        deleteLoading: false,
        nutritionList: [],
        nutritionTotal: 0,
        nutrtionLoading: false,
        editModalTitle: '添加营养价值信息', // 默认为增加营养价值信息
        editModalButton: 'POST', // 默认为增加商家信息POST
        formValidate: {
          grease: '',
          heat: 1,
          sugarContent: 1
        },
        ruleValidate: {
          grease: [
            {
              required: true,
              message: '营养价值介绍不能为空'
            },
            {
              max: 200,
              message: '营养价值不能多于 200 个字'
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
            key: 'nurtritionId',
            width: 65,
            align: 'center'
          },
          {
            title: '热量',
            key: 'heat',
            width: 105,
            align: 'center',
            render: (h, params) => {
              console.info(params)
              switch (params.row.heat) {
                case '1':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'yellow'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '无')
                  ])
                case '2':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'green'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '微量')
                  ])
                case '3':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'blue'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '适量')
                  ])
                case '4':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'red'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '过量')
                  ])
              }
            }
          },
          {
            title: '糖含量',
            key: 'sugarContent',
            width: 105,
            align: 'center',
            render: (h, params) => {
              console.info(params)
              switch (params.row.sugarContent) {
                case '1':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'yellow'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '无')
                  ])
                case '2':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'green'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '微量')
                  ])
                case '3':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'blue'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '适量')
                  ])
                case '4':
                  return h('div', [
                    h('Tag', {
                      props: {
                        type: 'border',
                        color: 'red'
                      },
                      style: {
                        width: '70%'
                      }
                    }, '过量')
                  ])
              }
            }
          },
          {
            title: '营养价值',
            key: 'grease',
            align: 'center',
            width: 255
          },
          {
            title: '添加时间',
            key: 'addTime',
            align: 'center',
            render (row, column, index) {
              return `<span>${time.getDateTime(row.addTime)}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '3px'
                  },
                  on: {
                    click: () => {
                      let row = params.row
                      this.getNutrition(row.nurtritionId)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    icon: 'android-delete'
                  },
                  on: {
                    click: () => {
                      let row = params.row
                      this.$set(this.del, 'modal', true)
                      this.$set(this.del, 'id', row.nurtritionId)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },
    created () {
      this.$store.dispatch('show_dish_nav')
    },
    mounted () {
      this.get()
    },
    computed: mapState([
      'nutrition'
    ]),
    methods: {
      // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getNutritions', {
          params: {
            pageNum: current,
            pageSize: consts.PAGE_SIZE,
            ...this.search
          }
        }).then(() => {
          console.info(this.$store.getters.getNutritions)
          let nutritionData = this.$store.getters.getNutritions
          if (nutritionData !== undefined) {
            this.$set(this, 'nutritionList', nutritionData.page.list)
            this.$set(this, 'nutritionTotal', nutritionData.page.total)
          }
        })
      },
      getNutrition (id) {
        this.$store.dispatch('getNutrition', {
          uri: 'get' + '?' + 'nurtritionId=' + id
        }).then(() => {
          console.info(this.$store.getters.getNutrition)
          this.$set(this, 'editModalButton', 'PUT')
          this.$set(this, 'editModalTitle', '修改营养价值信息')
          this.$set(this.add, 'modal', true)
          if (this.$store.getters.getNutrition.code !== -1) {
            this.$set(this, 'formValidate', this.$store.getters.getNutrition.data)
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
        this.resetFields()
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.nutrtionLoading = true
            const action = this.editModalButton === 'POST' ? 'postNutrition' : 'putNutrition'
            const uri = this.id

            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.nutrtionLoading = false
              this.$Message.success((this.id ? '编辑' : '新增') + '成功！')
              this.resetFields()
              this.$Modal.remove()
              this.$set(this.add, 'modal', false)
              this.get()
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
        this.getNutrition(id)
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      },
      handleDelOk () {
        this.deleteLoading = true
        this.$store.dispatch('deleteNutrition', {
          params: {
            nurtritionId: this.del.id
          }
        }).then(() => {
          this.deleteLoading = false
          this.$Message.success('删除成功！')
          this.$set(this.del, 'modal', false)
          this.get()
        })
      }
    }
  }
</script>
