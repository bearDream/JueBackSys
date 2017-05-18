export default {
  path: 'businessFrame',
  component: resolve => require(['@/app/Business'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Business/info'], resolve)
    },
    {
      path: '/businessnameFrame',
      component: resolve => require(['@/app/Business/info'], resolve)
    },
    {
      path: '/businesstypeFrame',
      component: resolve => require(['@/app/Business/type'], resolve)
    },
    {
      path: '/businesstagFrame',
      component: resolve => require(['@/app/Business/tag'], resolve)
    },
    {
      path: '/businesstakeFrame',
      component: resolve => require(['@/app/Business/takeNum'], resolve)
    },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Business/Form'], resolve)
    }
  ]
}
