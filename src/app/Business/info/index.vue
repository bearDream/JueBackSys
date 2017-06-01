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
        <p>确认删除该商家？</p>
      </div>
      <p slot="footer">
        <Button type="error" long :loading="deleteLoading" @click="handleDelOk('formValidate')">确认删除</Button>
      </p>
    </Modal>

    <Modal
      v-model="add.modal"
      :mask-closable="false"
      width="700"
      :styles="{top: '20px'}"
      @on-ok="handleAddOk">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span v-text="editModalTitle"></span>
      </p>
      <!-- 表单 -->
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <Form-item label="商家首页大图：" prop="businessImage">
            <Row>
              <i-col span="18">
                <ImageUpload :src="imgURL" v-on:listenToChildEvent="showImageUrl" v-on:listenRemove="removeImage"></ImageUpload>
                <Input v-show="false" v-model="formValidate.businessImage"/>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="商家幻灯片图片：" prop="businessCarouselImage">
            <Row>
              <i-col span="18">
                <MultiUpload v-on:listenToChildEvent="changeCarouselImg" v-on:listenCarouselRemove="removeCarouselImage"></MultiUpload>
                <Input v-show="false" v-model="formValidate.businessCarouselImage"/>
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
          <Form-item label="掌柜用户名：" prop="userId">
            <Row>
              <i-col  span="10">
                <Input v-model="formValidate.username" ></Input>
              </i-col>
              <i-col span="10">
                <Input v-model="formValidate.userId" v-show="false"></Input>
                <Select v-on:on-change="setUserId"  placeholder="输入用户名进行搜索" filterable remote :remote-method="searchUser" :loading="loading1">
                  <Option v-for="item in users" :value="item.userId + '|' + item.username" :key="item">{{ item.username }} <span style="float:right;color:#ccc">{{item.tel}}</span></Option>
                </Select>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="是否展示：" prop="isShow">
            <Row>
              <i-col span="18">
                <Radio-group v-model="formValidate.isShow" type="button">
                  <Radio label="0">启用</Radio>
                  <Radio label="1" style="color: red">禁用</Radio>
                </Radio-group>
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
              <i-col span="10">
                <Input v-model="formValidate.address" placeholder="请在下方地图上选择位置" disabled ></Input>
              </i-col>
              <i-col span="5">
                <Input v-model="formValidate.latitude" placeholder="纬度" icon="ios-location" disabled ></Input>
              </i-col>
              <i-col span="5">
                <Input v-model="formValidate.longtitude" placeholder="经度" icon="ios-location" disabled ></Input>
              </i-col>
            </Row>
          </Form-item>
          <Form-item>
            <Row>
              <i-col span="18">
                <BMap v-on:getAddressCoordinate="getAddressCoordinate" v-on:getAddressLocation="getAddressLocation"></BMap>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="商家介绍：" prop="content">
            <Row>
              <i-col span="18">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="介绍商家特色"></Input>
              </i-col>
            </Row>
          </Form-item>
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
      <Breadcrumb-item href="">商家管理</Breadcrumb-item>
    </Breadcrumb>
    <Spin fix v-show="role_spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!-- 分页 -->
    <List :current="current" :columns="columns" :data="businessList"
          :total="businessTotal"
          @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="handleAdd">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入店铺名" v-model="search.name" style="width: 230px;"
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
  import ICol from '../../../../node_modules/iview/src/components/grid/col'

  export default {
    name: 'businessname',
    components: {
      ICol,
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
        editModalTitle: '添加商家', // 默认为增加商家信息
        editModalButton: 'POST', // 默认为增加商家信息POST
        businessId: '',
        businessList: [],
        businessTotal: 1,
        name: '',
        address: '',
        tel: '',
        users: [],
        loading1: false,
        content: '',
        businessImage: '',
        imgURL: '',
        isShow: '',
        addTime: '',
        businessLoading: false,
        deleteLoading: false,
        formValidate: {
          businessId: '',
          name: '',
          username: '',
          address: '',
          tel: '',
          content: '',
          businessImage: '',
          businessCarouselImage: '',
          isShow: '1',
          addTime: '',
          userId: '',
          longtitude: '',
          latitude: ''
        },
        ruleValidate: {
          businessId: [
            {
              required: false,
              message: '商家id不能为空'
            }
          ],
          businessImage: [
            {
              required: false,
              message: '商家展示大图不能为空'
            }
          ],
          businessCarouselImage: [
            {
              required: false,
              message: '商家幻灯片图片不能为空'
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
            required: false
          }],
          userId: [{
            required: true,
            message: '请选择一个掌柜哦'
          }],
          address: [{
            required: true,
            message: '请在地图上选择坐标位置'
          }],
          longtitude: [{
            required: true,
            message: '请在地图上选择坐标位置'
          }],
          latitude: [{
            required: true,
            message: '请在地图上选择坐标位置'
          }],
          isShow: [{
            required: true
          }]
        },
        add: {
          businessId: 0,
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
          name: ''
        },
        current: 1,
        columns: [
          {
            title: '商家ID',
            key: 'businessId',
            align: 'center',
            width: 80
          },
          {
            title: '图片',
            key: 'businessImage',
            align: 'center',
            width: 130,
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.businessImage
                  },
                  style: {
                    width: '70%'
                  }
                })
              ])
            }
          },
          {
            title: '店名',
            align: 'center',
            key: 'name'
          },
          {
            title: '地址',
            align: 'center',
            key: 'address'
          },
          {
            title: '最后修改时间',
            align: 'center',
            key: 'addTime',
            render (row, column, index) {
              return `<span>${time.getDateTime(row.addTime)}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 240,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                  },
                  on: {
                    click: () => {
                      let row = params.row
                      this.getBusinessname(row.businessId)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                  },
                  on: {
                    click: () => {
                      let row = params.row
                      this.$router.push({name: 'businessDish', params: {businessId: row.businessId, businessName: row.name}})
                    }
                  }
                }, '添加菜品'),
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
                      this.$set(this.del, 'businessId', row.businessId)
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
      'businessname'
    ]),
    // 用于随时监视vuex管理的role.role对象是否有数据，当有数据时即将数据加入到formValidate中，这样就能将数据显示出来了
    watch: {
      // 当点击修改的时候，会将businessId赋值给add.businessId，并刺激formValidate的数据自动加载
      'add.businessId': {
        handler (newVal) {
          let businessData = this.$store.getters.getBusinessname
          if (businessData === null) {
            this.$Notice.error({
              title: '网络错误',
              desc: '权限不足'
            })
            this.$set(this.add, 'modal', false)
          } else {
            this.$set(this, 'formValidate', this.$store.getters.getBusinessname)
          }
        }
      }
    },
    created () {
      this.$store.dispatch('show_business_nav')
      // 指定上传的是business
      this.$store.dispatch('setUrlType', {
        params: 'business'
      })
    },
    mounted () {
      this.get()
    },
    methods: {
      setUserId: function (data) {
        console.info('.....changed.......')
        console.info(data)
        let userId = data.split('|')
        if (userId.length > 1) {
          this.$set(this.formValidate, 'userId', userId[0])
          this.$set(this.formValidate, 'username', userId[1])
        }
      },
      // 获取list的数据
      get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getBusinessnames', {
          params: {
            pageNum: (current - 1) * consts.PAGE_SIZE,
            pageSize: consts.PAGE_SIZE,
            ...this.search
          }
        }).then(() => {
          this.$set(this, 'businessList', this.$store.getters.getBusinessnames.page.list)
          this.$set(this, 'businessTotal', this.$store.getters.getBusinessnames.page.total)
        })
      },
      // 获取某个商家的数据,编辑的时候将数据拿出来
      getBusinessname (id) {
        this.$store.dispatch('getBusinessname', {
          uri: 'get' + '?' + 'businessId=' + id
        }).then(() => {
          // 拉取到数据之后再设置一系列数据
          this.$set(this, 'editModalButton', 'PUT')
          this.$set(this, 'editModalTitle', '修改商家信息')
          if (this.$store.getters.getBusinessname !== null) {
            this.$set(this, 'formValidate', this.$store.getters.getBusinessname)
            this.$set(this.add, 'modal', true)
          }
          let userId = this.formValidate.userId
          // 根据userId获取用户名username
          this.$store.dispatch('getUser', {
            uri: 'get' + '?' + 'userId=' + userId
          }).then(() => {
            // 拉取到数据之后再设置一系列数据
            console.info(this.$store.getters.getUser)
            let data = this.$store.getters.getUser
            if (data.code !== -1) {
              alert(data.data.username)
              this.$set(this.formValidate, 'username', data.data.username)
            }
          })
        })
      },
      // 获取所有用户
      searchUser (query) {
        if (query !== '') {
          // 远程获取数据，将数据放到users中
          this.$store.dispatch('getAllUsers', {
            params: {username: query}
          }).then(() => {
            let userlist = this.$store.getters.getAllUser.data.page.list
            if (userlist != null) {
              this.users = userlist
            }
          })
        } else {
          this.users = []
        }
      },
      handlePageChange (current) {
        this.get(current)
      },
      handleSearch () {
        this.get()
        this.$set(this, 'current', 1)
      },
      handleAdd (id) {
        // 设置编辑窗口信息
        this.$set(this, 'editModalButton', 'POST')
        this.$set(this, 'editModalTitle', '添加商家信息')
        // 显示对话框
        this.$set(this.add, 'modal', true)
        // 重置表单信息
        this.resetFields()
        this.$set(this.formValidate, 'businessId', null)
      },
      handleDelOk () {
        this.$set(this, 'deleteLoading', true)
        this.$store.dispatch('deleteBusinessname', {
          params: {
            businessId: this.del.businessId
          }
        }).then(() => {
          this.$set(this, 'deleteLoading', false)
          this.$set(this.del, 'modal', false)
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
            const action = this.editModalButton === 'POST' ? 'postBusinessname' : 'putBusinessname'

            console.info(this.formValidate)
            this.$store.dispatch(action, {
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
                this.$Message.success((this.editModalButton === 'POST' ? '新增商家' : '修改商家') + '成功！')
                this.resetFields()
                this.$set(this.add, 'modal', false)
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
      getAddressLocation (e) {
        console.info(e)
        var address = e.province + e.district + e.city + e.street + e.streetNumber
        console.info(address)
        this.$set(this.formValidate, 'address', address)
      },
      getAddressCoordinate (e) {
        console.info(e.lng)
        console.info(e.lat)
        this.$set(this.formValidate, 'longtitude', e.lng)
        this.$set(this.formValidate, 'latitude', e.lat)
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
  .map-view {
    width: 400px;
    height: 300px;
  }
</style>
