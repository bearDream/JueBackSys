export default {
  path: 'dishNavigation',
  component: resolve => require(['@/app/Base'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Base/List'], resolve)
    },
    {
      // 兼容用户点击左边sidebar时可以找到一个日志
      path: 'dishFrame',
      component: resolve => require(['@/app/Base/List'], resolve)
    },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Base/Form'], resolve)
    }
  ]
}
