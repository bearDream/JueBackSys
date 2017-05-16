export default {
  path: 'businessFrame',
  component: resolve => require(['@/app/Business'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Business/businessname'], resolve)
    },
    {
      path: '/businessnameFrame',
      component: resolve => require(['@/app/Business/businessname'], resolve)
    },
    {
      path: '/businesstypeFrame',
      component: resolve => require(['@/app/Business/businesstype'], resolve)
    },
    // {
    //   path: '/businesstableFrame',
    //   component: resolve => require(['@/app/Business/businesstable'], resolve)
    // },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Business/Form'], resolve)
    }
  ]
}
