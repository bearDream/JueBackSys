<template>
  <div>
    <Modal
      width="300"
      :mask-closable="false"
      v-model="del.modal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除该菜品？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  :loading="delete_loading" @click="handleDelOk">删除</Button>
      </div>
    </Modal>
    <Modal width="700" v-model="add.modal" :mask-closable="false">
      <p slot="header" style="color:#53bdff;text-align:center">
        <Icon type="fork"></Icon>
        <span v-text="form_title"></span>
      </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Form-item label="菜品封面图片：" prop="dishImage">
          <Row>
            <i-col span="20">
              <ImageUpload :src="imgURL" v-on:listenToChildEvent="showImageUrl" v-on:listenRemove="removeImage"></ImageUpload>
              <Input v-show="false" v-model="formValidate.dishImage"/>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="菜品方形图片：" prop="dishRecImage">
          <Row>
            <i-col span="20">
              <DishRecUpload :src="imgURL" v-on:listenToChildEvent="showRecImageUrl" v-on:listenRemove="removeRecImage"></DishRecUpload>
              <Input v-show="false" v-model="formValidate.dishRecImage"/>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="菜品名称" prop="dishName">
          <Row>
            <i-col span="20">
              <Input v-model="formValidate.dishName" placeholder="请输入菜品名称"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="菜品类型" prop="dishtypeId">
          <Row>
            <i-col span="20">
              <Select v-model="formValidate.dishtypeId" filterable>
                <Option v-for="item in typeList" :value="item.dishtypeId" :key="item">{{ item.typeName }}</Option>
              </Select>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="适合人群" prop="dishNutritionStatus">
          <Row>
            <i-col span="20">
              <Radio-group v-model="formValidate.dishNutritionStatus" type="button">
                <Radio label="1"><span style="color: red">不健康</span></Radio>
                <Radio label="2"><span style="color: seagreen">标准</span></Radio>
                <Radio label="3"><span style="color: mediumspringgreen">减肥</span></Radio>
                <Radio label="4"><span style="color: deepskyblue">塑形</span></Radio>
              </Radio-group>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="热量" prop="heat">
          <Row>
            <i-col span="20">
              <Slider v-model="formValidate.heat" :step=1 :min=1 :max=4 show-input show-stops></Slider>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="糖分" prop="sugarContent">
          <Row>
            <i-col span="20">
              <Slider v-model="formValidate.sugarContent" :min=1 :max=4 show-input :step=1 show-stops></Slider>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="营养价值简介" prop="grease">
          <Row>
            <i-col span="20">
              <Input v-model="formValidate.grease" type="textarea"  placeholder="请输入营养价值简介"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="菜品简单介绍" prop="dishDesc">
          <Row>
            <i-col span="20">
              <Input v-model="formValidate.dishDesc" placeholder="请输入菜品的简单介绍"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="菜品详细介绍" prop="dishContent">
          <Row>
            <i-col span="20">
              <Input type="textarea" v-model="formValidate.dishContent" placeholder="请输入菜品的详细介绍"></Input>
            </i-col>
          </Row>
        </Form-item>
      </Form>

      <div slot="footer">
        <Button type="success" long :loading="dishLoading" @click="handleSave('formValidate')">保存</Button>
      </div>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">菜品管理</Breadcrumb-item>
      <Breadcrumb-item>菜品基础信息</Breadcrumb-item>
    </Breadcrumb>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="dishList"
          :total="dishTotal"
          @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="handleAdd">新增基础菜品</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入用户名" v-model="search.title" style="width: 230px;"
                     @on-enter="handleSearch"/>
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
  import ImageUpload from '@/components/Uploader'
  import DishRecUpload from '@/components/DishRecUploader'
  import ICol from '../../../../node_modules/iview/src/components/grid/col'

  export default {
    name: 'list',
    components: {
      ICol,
      List,
      ListHeader,
      ListOperations,
      ListSearch,
      ImageUpload,
      DishRecUpload
    },
    data () {
      return {
        id: '',
        dishList: [],
        editModalButton: 'POST',
        dishTotal: 0,
        typeList: [],
        dishLoading: false,
        form_title: '新增基础菜品',
        imgURL: '',
        delete_loading: false,
        formValidate: {
          dishName: '',
          dishImage: '',
          dishRecImage: '',
          dishDesc: '',
          dishtypeId: '',
          dishContent: '',
          dishNutritionStatus: 1,
          grease: '',
          heat: 1,
          sugarContent: 1
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
          dishImage: [
            {
              required: true,
              message: '菜品封面图片不能为空'
            }
          ],
          dishRecImage: [
            {
              required: true,
              message: '菜品方形图片不能为空'
            }
          ],
          dishtypeId: [
            {
              required: true,
              message: '菜品类型不能为空'
            }
          ],
          dishDesc: [
            {
              required: true,
              message: '简单内容不能为空'
            },
            {
              max: 200,
              message: '内容长度过长'
            }
          ],
          grease: [
            {
              required: true,
              message: '营养价值内容不能为空'
            },
            {
              max: 200,
              message: '内容长度过长'
            }
          ],
          heat: [
            {
              required: true,
              message: '热量不能为空'
            }
          ],
          sugarContent: [
            {
              required: true,
              message: '糖分不能为空'
            }
          ],
          dishContent: [
            {
              required: true,
              message: '详细内容不能为空'
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
          dishId: 0
        },
        search: {
          title: ''
        },
        current: 1,
        columns: [
          {
            title: '序号',
            key: 'dishId',
            align: 'center',
            width: 70
          },
          {
            title: '图片',
            key: 'dishImage',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.dishImage
                  },
                  style: {
                    width: '70%'
                  }
                })
              ])
            }
          },
          {
            title: '菜名',
            key: 'dishName',
            align: 'center',
            width: 120
          },
          {
            title: '菜品类型',
            align: 'center',
            key: 'typeName',
            width: 110
          },
          {
            title: '菜品简介',
            align: 'center',
            key: 'dishDesc',
            width: 220
          },
          {
            title: '添加时间',
            align: 'center',
            key: 'addTime',
            width: 180,
            render (row, column, index) {
              return `<span>${time.getDateTime(row.addTime)}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 150,
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
                      this.getDish(row.dishId)
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
                      this.$set(this.del, 'dishId', row.dishId)
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
      this.getDishType()
      this.$store.dispatch('show_dish_nav')
      // 指定上传的是dish
      this.$store.dispatch('setUrlType', {
        params: 'dish'
      })
    },
    mounted () {
      this.get()
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
            pageNum: (current - 1) * consts.PAGE_SIZE,
            pageSize: consts.PAGE_SIZE,
            ...this.search
          }
        }).then(() => {
          this.$set(this, 'dishList', this.$store.getters.getDishes.page.list)
          this.$set(this, 'dishTotal', this.$store.getters.getDishes.page.total)
          console.info(this.dishList)
        })
      },
      getDish (id) {
        this.$store.dispatch('getDish', {
          uri: 'get' + '?' + 'dishId=' + id
        }).then(() => {
          let dishData = this.$store.getters.getDish
          // 拉取到数据之后再设置一系列数据
          this.$set(this, 'editModalButton', 'PUT')
          this.$set(this, 'form_title', '修改基础菜品信息')
          if (dishData.code !== -1) {
            this.$set(this, 'formValidate', dishData.data)
          }
          this.$set(this.formValidate, 'heat', parseInt(this.formValidate.heat))
          this.$set(this.formValidate, 'sugarContent', parseInt(this.formValidate.sugarContent))
          this.$set(this.add, 'dishId', id)
          this.$set(this.add, 'modal', true)
        })
      },
      getDishType () {
        this.$store.dispatch('getAllDishtypes', {
          params: ''
        }).then(() => {
          console.info(this.$store.getters.getAllDishTypes)
          if (this.$store.getters.getAllDishTypes !== undefined) {
            this.$set(this, 'typeList', this.$store.getters.getAllDishTypes)
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
        this.$set(this.add, 'title', '新增菜品详细信息')
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const action = this.editModalButton === 'POST' ? 'postDish' : 'putDish'
            const uri = this.id

            console.info(this.formValidate)
            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.$Message.success((this.editModalButton === 'POST' ? '新增基础菜品' : '修改基础菜品') + '成功！')
              this.resetFields()
              this.$Modal.remove()
              this.$set(this.add, 'modal', false)
              this.get()
            })
          } else {
            this.$Message.error('请检查必填字段是否均已填写')
          }
        })
      },
      handleEdit (id) {
        /*
         1、把id存到data里面
         2、显示对话框
         3、执行get请求获取数据，watch监听数据变化了就自动将数据放到validator里面
         */
        this.getDish(id)
        this.$set(this.add, 'id', id)
        this.$set(this.add, 'modal', true)
        this.$set(this.add, 'title', '修改菜品详细信息')
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      },
      handleDelOk () {
        this.delete_loading = true
        console.info(this.del.dishId)
        this.$store.dispatch('deleteDish', {
          params: {
            dishId: this.del.dishId
          }
        }).then(() => {
          this.delete_loading = false
          this.$set(this.del, 'modal', false)
          this.$Message.success('删除成功！')
          this.get()
        })
      },
      showImageUrl (data) {
        this.$set(this.formValidate, 'dishImage', data)
      },
      removeImage (url) {
        console.info(url)
        if (url === this.formValidate.dishImage) {
          this.$set(this.formValidate, 'dishImage', '')
        }
      },
      showRecImageUrl (data) {
        this.$set(this.formValidate, 'dishRecImage', data)
      },
      removeRecImage (url) {
        if (url === this.formValidate.dishRecImage) {
          this.$set(this.formValidate, 'dishRecImage', '')
        }
      }
    }
  }
</script>
