export default {
  path: 'dishFrame',
  component: resolve => require(['@/app/Dishes'], resolve),
  children: [
    {
      path: '/',
      component: resolved => require(['@/app/Dishes/List'], resolved)
    },
    {
      path: '/sortFrame',
      component: resolved => require(['@/app/Dishes/List/sort'], resolved)
    }
  ]
}
