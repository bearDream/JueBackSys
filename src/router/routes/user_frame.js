export default {
  path: 'userFrame',
  component: resolve => require(['@/app/User'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/User/List'], resolve)
    }
  ]
}
