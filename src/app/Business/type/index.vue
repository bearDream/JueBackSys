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


        </Form>
      </div>
      <!-- 表单 -->
      <div slot="footer">
        <Button type="success" long @click="handleSave('formValidate')">保存</Button>
      </div>

      <p>上传图片</p>
      <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="查看图片" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + businessImage + '/large'" v-if="visible" style="width: 100%">
      </Modal>

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
  import Editor from '@/components/Editor'

  export default {
    name: 'businesstype',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch,
      Editor
    },
    data () {
      return {
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: [],
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
            title: '商家类型ID',
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
              return `<span>${time.getDateTime(row.addTime)}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, column, index) => {
              return `<i-button type="ghost" size="small" @click="handleEdit(${row.businessTypeId})">编辑</i-button>
                <i-button type="ghost" size="small" @click="handleDel(${row.businessTypeId})">删除</i-button>`
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
      handleView (name) {
        this.businessImage = name
        this.visible = true
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
        file.name = '7eb99afb9d5f317c912f08b5212fd69a'
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 5 张图片。'
          })
        }
        return check
      },
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
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
