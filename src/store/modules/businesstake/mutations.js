import types from './types'

export default {
  [types.GET_BUSINESSTAKES] (state, payload) {
    state.businesstakes = payload.data
  },
  [types.GET_BUSINESSTAKE] (state, payload) {
    state.businesstake = payload.data
  }
}
