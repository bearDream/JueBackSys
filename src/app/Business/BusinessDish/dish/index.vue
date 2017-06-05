<template>
  <div>
    <Modal
      width="300"
      v-model="del.modal"
      title="确认移除"
      @on-ok="removeDish">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>移除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认将该菜品从该商家移除？</p>
      </div>
      <p slot="footer">
        <Button type="error" long :loading="deleteLoading" @click="removeDish">确认移除</Button>
      </p>
    </Modal>

    <Modal
      v-model="add.modal"
      :mask-closable="false"
      width="700"
      :styles="{top: '20px'}"
      @on-ok="handleAddOk">
      <p slot="header" style="color:#5ebdff;text-align:center">
        <Icon type="edit" size="big"></Icon>
        <span>修改 <span style="color: orangered; padding-left: 4px; padding-right: 4px;" v-text="add.name"/> </span>
      </p>
      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Row>
            <i-col span="10">
              <Form-item label="是否展示" prop="isShow">
                <Radio-group v-model="formValidate.isShow">
                  <Radio label=1><span>显示</span></Radio>
                  <Radio label=0><span>不显示</span></Radio>
                </Radio-group>
              </Form-item>
            </i-col>
            <i-col span="10">
              <Form-item label="是否参加活动" prop="isFavorable">
                <Radio-group v-model="formValidate.isFavorable">
                  <Radio label=1><span>参加</span></Radio>
                  <Radio label=0><span>不参加</span></Radio>
                </Radio-group>
              </Form-item>
            </i-col>
          </Row>

          <Row>
            <i-col span="10">
              <Form-item label="是否板块推荐" prop="isTop">
                <Radio-group v-model="formValidate.isTop">
                  <Radio label=1><span>推荐</span></Radio>
                  <Radio label=0><span>不推荐</span></Radio>
                </Radio-group>
              </Form-item>
            </i-col>
          </Row>

          <Row>
            <i-col span="10">
              <Form-item label="菜品价格" prop="dishPrice">
                <Row>
                  <i-col span="20">
                    <Input-number v-model="formValidate.dishPrice" :max="1000" :min="1" :step="1"/><span>&nbsp;元</span>
                  </i-col>
                </Row>
              </Form-item>
            </i-col>
            <i-col span="10">
              <Form-item label="折扣价格" prop="favorablePrice">
                <Row>
                  <i-col span="20">
                    <Input-number v-model="formValidate.favorablePrice" :max="1000" :min="1" :step="1"/><span>&nbsp;元</span>
                  </i-col>
                </Row>
              </Form-item>
            </i-col>
          </Row>
          <Input v-model="formValidate.dishId" v-show="false"/>
          <Input v-model="formValidate.businessId" v-show="false"/>

          <!--<Form-item label="菜品标签">-->
            <!--<Row>-->
              <!--<i-col span="20">-->
                <!--<Transfer-->
                  <!--:data="allDishTag"-->
                  <!--:target-keys="thisDishTag"-->
                  <!--filterable-->
                  <!--:filter-method="searchTag">-->
                <!--</Transfer>-->
              <!--</i-col>-->
            <!--</Row>-->
          <!--</Form-item>-->
        </Form>
      </div>
      <!-- 表单 -->

      <div slot="footer">
        <Button type="success" long :loading="businessLoading" @click="handleSave('formValidate')">保存</Button>
      </div>
    </Modal>


    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">商家</Breadcrumb-item>
      <Breadcrumb-item href="/businessFrame">商家管理</Breadcrumb-item>
      <Breadcrumb-item href="#">商家所属菜品管理</Breadcrumb-item>
      <Breadcrumb-item href="">商家所有菜品管理</Breadcrumb-item>
    </Breadcrumb>
    <Spin fix v-show="role_spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="dishList"
          :total="dishTotal"
          @on-change="handlePageChange">
      <ListHeader>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入菜品名（支持模糊查询）" v-model="search.dishName" style="width: 230px;"
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
  /* eslint-disable no-undef */

  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
  import time from '@/utils/helpers/timeLite'
  import List, { ListHeader, ListOperations, ListSearch } from '@/components/List'
  import Editor from '@/components/Editor'
  import ImageUpload from '@/components/Uploader'
  import MultiUpload from '@/components/MultiUploader'
  import BMap from '@/components/BMap'

  export default {
    name: 'businessname',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch,
      Editor,
      ImageUpload,
      MultiUpload,
      BMap
    },
    data () {
      return {
        editModalButton: 'POST',
        allDish: 0,
        topDish: 0,
        businessId: '',
        businessName: '',
        dishList: [],
        dishTotal: 0,
        loading1: false,
        searchTagKey: '',
        content: '',
        businessLoading: false,
        deleteLoading: false,
        role_spin: false,
        allDishTag: [],
        thisDishTag: [],
        search: {
          name: ''
        },
        current: 1,
        del: {
          modal: false,
          dishBusinessId: ''
        },
        add: {
          modal: false,
          name: '',
          id: ''
        },
        formValidate: {
          isShow: 0,
          isFavorable: 0,
          isTop: 0,
          dishPrice: 10,
          favorablePrice: 9,
          businessId: '',
          dishId: ''
        },
        ruleValidate: {
          isShow: [{
            required: true
          }],
          isFavorable: [{
            required: true
          }],
          isTop: [{
            required: true
          }],
          dishPrice: [{
            required: true
          }],
          favorablePrice: [{
            required: true
          }]
        },
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
            width: 130,
            align: 'center',
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
            title: '正常价格',
            align: 'center',
            key: 'dishPrice',
            width: 90
          },
          {
            title: '活动价格',
            align: 'center',
            key: 'favorablePrice',
            width: 90
          },
          {
            title: '销售量',
            align: 'center',
            key: 'orderCount',
            width: 90
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
                      this.editDishToBusiness(row.dishBusinessId, row.dishId, row.dishName)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    marginRight: '3px',
                    color: '#ed3f14'
                  },
                  on: {
                    click: () => {
                      let row = params.row
                      this.$set(this.del, 'dishBusinessId', row.dishBusinessId)
                      this.$set(this.del, 'modal', true)
                    }
                  }
                }, '移除')
              ])
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
    },
    created () {
      if (this.$route.params.businessId === undefined) {
        this.$router.go(-1)
      }
      this.$set(this, 'businessId', this.$route.params.businessId)
      this.$set(this.formValidate, 'businessId', this.$route.params.businessId)
      this.$store.dispatch('show_none_nav')
      // 指定上传的是business
      this.$store.dispatch('setUrlType', {
        params: 'business'
      })
    },
    mounted () {
      this.get()
//      this.getTag()
    },
    methods: {
      // 获取list的数据
      get (current = 1) {
        this.$set(this, 'current', current)

        // 获取该店铺没有的菜品数据
        this.$store.dispatch('getBusinessDishs', {
          params: {
            pageNum: (current - 1) * consts.PAGE_SIZE,
            pageSize: consts.PAGE_SIZE,
            businessId: this.businessId,
            ...this.search
          }
        }).then(() => {
          let data = this.$store.getters.getBusinessDishes
          console.info(data)
          if (data.page !== undefined) {
            this.$set(this, 'dishList', data.page.list)
            this.$set(this, 'dishTotal', data.page.total)
          }
        })
      },
      editDishToBusiness (dishBusinessId, dishId, dishName) {
        // 获取该菜的信息装到formValidate中
        this.$store.dispatch('getBusinessDish', {
          uri: 'get?dishBusinessId=' + dishBusinessId
        }).then(() => {
          let data = this.$store.getters.getBusinessDish
          console.info(data)
          if (data.code !== -1) {
            // 这三个字段是boolean型的，因此要转成integer类型，防止以字符串形式传输
            data.data.isShow = Number(data.data.isShow)
            data.data.isFavorable = Number(data.data.isFavorable)
            data.data.isTop = Number(data.data.isTop)
            this.$set(this, 'formValidate', data.data)
          }
        })
        this.$set(this.add, 'name', dishName)
        this.$set(this.add, 'modal', true)
      },
      handlePageChange (current) {
        this.get(current)
      },
      handleSearch () {
        this.get()
        this.$set(this, 'current', 1)
      },
      removeDish () {
        this.$set(this, 'deleteLoading', true)
        this.$store.dispatch('deleteBusinessDish', {
          params: {
            dishBusinessId: this.del.dishBusinessId
          }
        }).then(() => {
          this.$set(this, 'deleteLoading', false)
          this.$set(this.del, 'modal', false)
          this.$set(this.del, 'dishBusinessId', '')
          this.$Message.success('删除成功！')
          this.get()
        })
      },
      handleAddOk () {
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$set(this, 'businessLoading', true)
            console.info(this.formValidate)

            // 这三个字段是boolean型的，因此要转成integer类型，防止以字符串形式传输
            this.$set(this.formValidate, 'isShow', parseInt(this.formValidate.isShow))
            this.$set(this.formValidate, 'isFavorable', parseInt(this.formValidate.isFavorable))
            this.$set(this.formValidate, 'isTop', parseInt(this.formValidate.isTop))

            this.$store.dispatch('putBusinessDish', {
              data: this.formValidate
            }).then((res) => {
              this.$set(this, 'businessLoading', false)
              let data = res.data
              if (data.code === -1) {
                this.$Notice.error({
                  title: '网络错误',
                  desc: data.msg
                })
              } else {
                this.$Message.success('修改菜品数据成功')
                this.resetFields()
                this.$set(this.add, 'modal', false)
                this.get()
              }
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
      showImageUrl (data) {
        this.$set(this.formValidate, 'businessImage', data)
      },
      removeImage (url) {
        console.info(url)
        if (url === this.formValidate.businessImage) {
          this.$set(this.formValidate, 'businessImage', '')
        }
      },
      changeCarouselImg (data) {
        let businessTemp = this.formValidate.businessCarouselImage
        this.$set(this.formValidate, 'businessCarouselImage', data + ',' + businessTemp)
        this.$store.dispatch('setBusinessname', {
          data: this.formValidate
        })
      },
      removeCarouselImage (url) {
        let carouselImg = this.formValidate.businessCarouselImage
        let imgArr = carouselImg.split(',')
        let finalImgArry = ''
        // 遍历查找要删除的那个图片url并删除
        for (var i = 0; i < imgArr.length; i++) {
          if (url === imgArr[i]) {
            imgArr.splice(i, 1)
          }
        }
        // 重新组装url
        for (let i = 0; i < imgArr.length; i++) {
          finalImgArry = imgArr[i] + ',' + finalImgArry
        }
        this.$set(this.formValidate, 'businessCarouselImage', data + ',' + finalImgArry)
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      },
      goBack () {
        this.$router.go(-1)
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
  .map-view {
    width: 400px;
    height: 300px;
  }
</style>
