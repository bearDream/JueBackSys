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
      path: '/dishTagFrame',
      component: resolve => require(['@/app/Dishes/tag/List'], resolve)
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
