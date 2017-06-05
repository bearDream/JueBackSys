<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除该分类？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  :loading="delete_loading" @click="handleDelOk">删除</Button>
      </div>
    </Modal>
    <Modal
      width="380"
      v-model="add.modal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span v-text="form_title"></span>
      </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="菜品类型" prop="typeName">
          <Row>
            <i-col span="16">
              <Input v-model="formValidate.typeName" placeholder="请输入菜品类型"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="是否显示" prop="isShow">
          <Radio-group v-model="formValidate.isShow">
            <Radio label=1><span>显示</span></Radio>
            <Radio label=0><span>不显示</span></Radio>
          </Radio-group>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="success" long :loading="editLoading" @click="handleSave('formValidate')" >保存</Button>
      </div>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">菜品管理</Breadcrumb-item>
      <Breadcrumb-item>菜品分类</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="dishTypeList"
          :total="dishTypeTotal"
          @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="handleAdd">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入分类名" v-model="search.title" style="width: 230px;"
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
        editModalButton: 'POST',
        form_title: '新增基础菜品',
        delete_loading: false,
        editLoading: false,
        dishTypeList: [],
        dishTypeTotal: 0,
        formValidate: {
          typeName: '',
          isShow: 0
        },
        ruleValidate: {
          typeName: [
            {
              required: true,
              message: '类型名称不能为空'
            },
            {
              max: 20,
              message: '类型名称长度过长'
            }
          ]
        },
        del: {
          modal: false,
          id: 0
        },
        dish_spin: false,
        add: {
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
            key: 'dishtypeId',
            align: 'center'
          },
          {
            title: '类型名称',
            key: 'typeName',
            align: 'center'
          },
          {
            title: '是否显示',
            key: 'isShow',
            align: 'center'
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
            align: 'center',
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
                      this.$set(this.add, 'id', row.dishtypeId)
                      this.$set(this.add, 'modal', true)
                      this.$set(this, 'editModalButton', 'PUT')
                      this.$set(this, 'form_title', '修改菜品分类信息')
                      this.getDishtype(row.dishtypeId)
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
                      this.$set(this.del, 'id', row.dishtypeId)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },
    computed: mapState([
      'dishtype'
    ]),
    created () {
      this.$store.dispatch('show_dish_nav')
      this.get()
    },
    methods: {
      // 拉取数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getDishtypes', {
          params: {
            pageNum: (current - 1) * consts.PAGE_SIZE,
            pageSize: consts.PAGE_SIZE,
            ...this.search
          }
        }).then(() => {
          console.info(this.$store.getters.getDishTypes)
          if (this.$store.getters.getDishTypes !== undefined) {
            this.$set(this, 'dishTypeList', this.$store.getters.getDishTypes.page.list)
            this.$set(this, 'dishTypeTotal', this.$store.getters.getDishTypes.page.total)
          }
        })
      },
      getDishtype (id) {
        this.$store.dispatch('getDishtype', {
          uri: 'get' + '?' + 'dishtypeId=' + id
        }).then(() => {
          // 将数据赋值给form表单
          let dishTypeData = this.$store.getters.getDishType
          console.info(dishTypeData)
          // 拉取到数据之后再设置一系列数据
          if (dishTypeData.code !== -1) {
            this.$set(this, 'formValidate', dishTypeData.data)
          }
          this.$set(this.add, 'id', dishTypeData.data.dishTypeId)
          this.$set(this.add, 'modal', true)
        })
      },
      handleAdd (id) {
        this.resetFields()
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
        this.$set(this, 'editModalButton', 'POST')
        this.$set(this, 'form_title', '添加菜品分类信息')
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.editLoading = true
            const action = this.editModalButton === 'POST' ? 'postDishtype' : 'putDishtype'
            const uri = this.id

            console.info('--------------提交前---------------')
            console.info(this.formValidate)
            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.editLoading = false
              this.$Message.success((this.id ? '编辑' : '新增') + '成功！')
//              this.resetFields()
              this.$Modal.remove()
              this.$set(this.add, 'modal', false)
              this.get()
            })
          } else {
            this.$Message.error('保存失败')
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
      handleDelOk () {
        this.$set(this, 'delete_loading', true)
        this.$store.dispatch('deleteDishtype', {
          params: {
            dishtypeId: this.del.id
          }
        }).then(() => {
          this.$set(this, 'delete_loading', false)
          this.$Message.success('删除成功！')
          this.$set(this.del, 'modal', false)
          this.get()
        })
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      }
    }
  }
</script>
