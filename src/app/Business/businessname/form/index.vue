<template>
  <div>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="商家id：" prop="businessId">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.businessId" placeholder="请输入更改的商家id"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="商家名称" prop="name">
          <Radio-group v-model="formValidate.name">
            <Radio label="1"><span>管理员</span></Radio>
            <Radio label="2"><span>普通用户</span></Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="商家地址" prop="address">
          <!--<Input v-model="formValidate.roleContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" placeholder="请输入角色介绍"></Input>-->
          <Editor ref="editor" v-model="formValidate.content" @change="handleEditorChange"></Editor>
        </Form-item>
        <Button type="success" long @click="handleSave('formValidate')">保存</Button>
      </Form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'form',
    components: {
//      Editor
    },
    created () {
      this.id = this.$store
      console.info('.....................---------------')
      console.info(this.$store)
      this.id && this.get(this.id)
    },
    data () {
      return {
        businessId: '',
        name: '',
        address: '',
        formValidate: {
          name: '',
          address: '',
          businessId: ''
        },
        ruleValidate: {
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
          address: [
            {
              required: false,
              message: '地址类型不能为空'
            }
          ],
          businessID: [
            {
              required: false,
              message: '商家ID介绍不能为空'
            }
          ]
        }
      }
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
    },
    computed: mapState([
      'businessname'
    ]),
    watch: {
      'businessname.businessname': {
        handler (newVal) {
          console.info('-----------------------------------------------------------')
          console.info(newVal.data.page.list[0])
          this.$set(this, 'formValidate', newVal.data.page.list[0])
        }
      }
    }
  }
</script>
