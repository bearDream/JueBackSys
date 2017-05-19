import axios from 'axios'
import consts from '@/utils/consts'

export default {
  path: 'login',
  component: resolve => require(['@/app/Login'], resolve),
  beforeEnter (to, from, next) {
    axios.get(consts.API_URL + '/login/isLogin', {})
      .then(function (res) {
        let data = res.data
        // 根据code判断是否登录
        if (data !== null && data.code !== -1) {
          next('/')
        } else {
          next()
        }
      }).catch(() => next('/')
      )
  }
}
