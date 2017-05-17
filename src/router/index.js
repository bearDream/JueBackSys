import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/app/Root'
import Layout from '@/app/Layout'
import notFound from './routes/notFound'
import home from './routes/home'
import businessFrame from './routes/business_frame'
import baseFrame from './routes/base_frame'
import dishFrame from './routes/dishes_frame'

import baseNavigation from './routes/base_navigation'

import login from './routes/login'
import logout from './routes/logout'
import iView from 'iview'
import axios from 'axios'
import consts from '@/utils/consts'
import store from '@/store'
// import { logout } from '@/store/modules/login'

Vue.use(Router)

// 构造路由器
const router = new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/',
          component: Layout,
          children: [
            home,
            baseFrame,
            businessFrame,
            dishFrame,
            baseNavigation
          ],
          meta: {
            requiresAuth: true
          }
        },
        login,
        logout,
        notFound
      ]
    }
  ]
})

/* 路由前判断是否登录
    1、判断登录必须要发送请求到后端，后端根据session来判断是否登录
    2、在什么地方发送请求是一个问题
 */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  // router.app.$store.dispatch('logout')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.defaults.withCredentials = true
    axios.get(consts.API_URL + '/isLogin', {})
      .then(function (res) {
        console.log(res.data)
        let data = res.data
        // 根据code判断是否登录
        if (data !== null && data.code !== -1) {
          next(store.dispatch('login'))
        } else {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  } else {
    next()
  }
})

// 路由结束时回调
router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

export default router
