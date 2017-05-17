export default {
  path: 'logout',
  beforeEnter (to, from, next) {
    next('login')
  }
}
