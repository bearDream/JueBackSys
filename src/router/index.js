import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/app/Root'
import Layout from '@/app/Layout'
import notFound from './routes/notFound'
import home from './routes/home'
import businessFrame from './routes/business_frame'
import baseFrame from './routes/base_frame'
import dishFrame from './routes/dishes_frame'
import userFrame from './routes/user_frame'
import baseNavigation from './routes/base_navigation'
import dishNavigation from './routes/dish_navigation'

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
            baseNavigation,
            dishNavigation,
            userFrame,
            dishFrame,
            userFrame
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

  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.defaults.withCredentials = true
    axios.get(consts.API_URL + '/login/isLogin', {})
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
      .catch(() => next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
      )
  } else {
    next()
  }
})

// 路由结束时回调
router.afterEach((to, from, next) => {
  let path = to.path
  iView.LoadingBar.finish()
  // 控制导航栏的显示
  switch (path) {
    case '/baseFrame':
      router.app.$store.dispatch('show_base_nav')
      break
    case '/logFrame':
      router.app.$store.dispatch('show_base_nav')
      break
    case '/businessFrame':
      router.app.$store.dispatch('show_business_nav')
      break
    case '/dishFrame':
      router.app.$store.dispatch('show_dish_nav')
      break
    default:
      router.app.$store.dispatch('show_none_nav')
  }
})

export default router
