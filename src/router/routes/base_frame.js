export default {
  path: 'baseFrame',
  component: resolve => require(['@/app/Base'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Base/List'], resolve)
    },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Base/Form'], resolve)
    }
  ]
}
