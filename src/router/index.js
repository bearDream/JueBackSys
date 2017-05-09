import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import Root from '@/app/Root'
import Layout from '@/app/Layout'
import notFound from './routes/notFound'
import home from './routes/home'
import baseFrame from './routes/base_frame'
import login from './routes/login'
import logout from './routes/logout'
import iView from 'iview'

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
            baseFrame
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

// 路由前判断是否登录
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// 路由结束时回调
router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

export default router
