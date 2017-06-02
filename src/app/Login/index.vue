<template>
  <div>
    <Card class="login" dis-hover>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60" label-position="left">
       <Row>
         <i-col span="24">
           <Form-item>
           <p id="txt">Welcome</p>
           </Form-item>
         </i-col>
         <i-col span="24">
          <Form-item prop="tel" label="" class="userForm">
             <Input type="text"style="width:265px;" @on-enter="handleLogin" v-model="formValidate.tel" placeholder="用户名">
             <Icon type="person" slot="prepend"></Icon>
             </Input>
           </Form-item><br>
         </i-col>
         <i-col span="24">
           <Form-item prop="password" label=""class="userForm">
             <Input  type="password"style="width:265px;" v-model="formValidate.password" placeholder="密码"@on-enter="handleLogin">
             <Icon type="locked" slot="prepend"></Icon>
             </Input>
           </Form-item>
           <br>
         </i-col>
         <i-col span="24">
           <Form-item>
           <Checkbox label="facebook"><span>记住用户名和密码</span></Checkbox><br>
           </Form-item>
         </i-col>
         <i-col span="24">
           <Form-item>
             <Button  to="/baidu" class="userForm" style="height: 40px;width: 265px;
              background: #59850B;color: #E2E9DB; border: none"@click="handleLogin">
               登录
             </Button>
           </Form-item>
         </i-col>
       </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
  import auth from '@/utils/auth'
  import Model from '@/models/actions/login'

  export default {
    name: 'login',
    data () {
      return {
        formValidate: {
          tel: '',
          password: ''
        },
        ruleValidate: {
          tel: [
            {
              required: true,
              message: '用户名不能为空'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空'
            }
          ]
        }
      }
    },
    methods: {
      handleLogin () {
        let loginfo = this.formValidate
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            new Model()
              .POST({
                params: loginfo
              })
              .then((res) => {
                console.info(res.data)
                let data = res.data
                if (data !== null && data.code !== -1) {
                  this.$router.push('/')
                  this.$Message.success('登录成功')
                  let userInfo = JSON.parse(data.data)
                  this.$store.dispatch('setLoginUser', {
                    data: userInfo
                  })
                  this.$store.dispatch('login', {})
                  auth.login(res.data)
                } else {
                  this.$Message.error(data.msg)
                }
              })
          } else {
            this.$Message.error('请检查用户名和密码是否正确')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
