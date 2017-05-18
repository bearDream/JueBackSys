export default {
  path: 'baseFrame',
  component: resolve => require(['@/app/Base'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Base/List'], resolve)
    },
    {
      path: '/logFrame',
      component: resolve => require(['@/app/Base/List'], resolve)
    },
    {
      path: '/roleFrame',
      component: resolve => require(['@/app/Base/role/List'], resolve)
    },
    {
      // 兼容用户点击左边sidebar时可以找到一个日志
      path: '/tagFrame',
      component: resolve => require(['@/app/Base/tag/list'], resolve)
    },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Base/Form'], resolve)
    }
  ]
}
