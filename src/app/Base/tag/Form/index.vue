<template>
  <div>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="角色名：" prop="roleName">
          <Row>
            <i-col span="12">
              <Input v-model="formValidate.roleName" placeholder="请输入角色名"></Input>
            </i-col>
          </Row>
        </Form-item>
        <Form-item label="角色类别" prop="roleType">
          <Radio-group v-model="formValidate.roleType">
            <Radio label="1"><span>管理员</span></Radio>
            <Radio label="2"><span>普通用户</span></Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="角色介绍" prop="roleContent">
          <Input v-model="formValidate.roleContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" placeholder="请输入角色介绍"></Input>
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
        id: '',
        roleType: '管理员角色',
        roleContent: '',
        formValidate: {
          roleName: '',
          roleType: '1',
          roleContent: ''
        },
        ruleValidate: {
          roleName: [
            {
              required: true,
              message: '角色名不能为空'
            },
            {
              max: 15,
              message: '角色名不能多于 15 个字'
            }
          ],
          roleType: [
            {
              required: false,
              message: '角色类型不能为空'
            }
          ],
          roleContent: [
            {
              required: false,
              message: '角色介绍不能为空'
            }
          ]
        }
      }
    },
    methods: {
      get (uri) {
        this.$store.dispatch('getRole', {uri})
      },
      handleSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const action = this.id ? 'putRole' : 'postRole'
            const uri = this.id

            console.info(this.formValidate)
            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.$Message.success((this.id ? '编辑角色' : '新增角色') + '成功！')
              this.resetFields()
              this.$Modal.remove()
            })
          } else {
            this.$Message.error('保存失败!')
          }
        })
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      }
    },
    computed: mapState([
      'role'
    ]),
    watch: {
      'role.role': {
        handler (newVal) {
          this.$set(this, 'formValidate', newVal.data)
        }
      }
    }
  }
</script>
