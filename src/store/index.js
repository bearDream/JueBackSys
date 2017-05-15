import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import log from './modules/log'
import role from './modules/role'
import navigation from './modules/navigation'
import dish from './modules/dish'
import dishtype from './modules/dishtype'
import dishtag from './modules/dishtag'
import nutrition from './modules/nutrition'
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
    dish,
    dishtype,
    dishtag,
    nutrition
  }
})
