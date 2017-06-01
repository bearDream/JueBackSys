import types from './types'

export default {
  [types.GET_BUSINESSDISHS] (state, payload) {
    state.businessDishs = payload.data
  },
  [types.GET_BUSINESSDISH] (state, payload) {
    state.businessDish = payload.data
  }
}
