export default {
  path: 'dishFrame',
  component: resolve => require(['@/app/Dishes'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Dishes/List'], resolve)
    },
    {
      path: '/sortFrame',
      component: resolve => require(['@/app/Dishes/sort/List'], resolve)
    },
    {
      path: '/labelFrame',
      component: resolve => require(['@/app/Dishes/label/List'], resolve)
    },
    {
      path: '/dietFrame',
      component: resolve => require(['@/app/Dishes/diet/List'], resolve)
    },
    {
      path: 'form/:id?',
      component: resolve => require(['@/app/Dishes/From'], resolve)
    }
  ]
}
