<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">菜品管理</Breadcrumb-item>
      <Breadcrumb-item href="/articles">菜品列表</Breadcrumb-item>
      <Breadcrumb-item>菜品{{ id ? '编辑' : '新增' }}</Breadcrumb-item>
    </Breadcrumb>
    <div>
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
          <Button type="ghost" @click="$router.push('/dishFrame')">返回</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'form',
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
          modal1: false,
          id: 0
        }
      }
    },
    methods: {
      get (uri) {
        this.$store.dispatch('getDish', {uri})
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
              this.$set(this.add, 'modal1', false)
            })
          } else {
            this.$Message.error('保存失败')
          }
        })
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
      }
    },
    computed: mapState([
      'dish'
    ]),
    watch: {
      'dish.dish': {
        handler (newVal) {
          this.$set(this, 'formValidate', newVal.data)
        }
      }
    }
  }
</script>
