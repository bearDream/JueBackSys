import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import log from './modules/log'
import login from './modules/login'
import role from './modules/role'
import navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'zh-CN'
  },
  getters,
  actions,
  mutations,
  modules: {
    log,
    navigation,
    role,
    login
  }
})
