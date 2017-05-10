export default {
  path: 'businessFrame',
  component: resolve => require(['@/app/Business'], resolve),
  children: [
    // {
    //   path: '/',
    //   component: resolve => require(['@/app/Business/List'], resolve)
    // },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Business/Form'], resolve)
    }
  ]
}
