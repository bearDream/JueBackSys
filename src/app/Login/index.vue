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
          <Form-item prop="username" label="" class="userForm">
             <Input type="text"style="width:265px;" @on-enter="handleLogin" v-model="formValidate.username" placeholder="用户名">
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
          username: 'admin',
          password: 'admin123456'
        },
        ruleValidate: {
          username: [
            {
              required: true,
              message: '用户不能为空'
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
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            new Model()
              .GET({
                data: this.formValidate
              })
              .then((res) => {
                console.info('..........................')
                console.info(res.data[0].data)
                auth.login(res.data[0].data)
                this.$router.push('/')
                this.$Message.success('登录成功')
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
