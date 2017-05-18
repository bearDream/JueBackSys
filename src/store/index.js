import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import log from './modules/log'
import login from './modules/login'
import role from './modules/role'
import user from './modules/user'
import businessname from './modules/businessname'
import businesstype from './modules/businesstype'
import businesstable from './modules/businesstable'
import businesstake from './modules/businesstake'
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
    user,
    role,
    businessname,
    businesstype,
    businesstable,
    businesstake,
    login,
    dish,
    dishtype,
    dishtag,
    nutrition
  }
})
