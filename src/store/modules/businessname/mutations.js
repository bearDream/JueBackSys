import types from './types'

export default {
  [types.GET_BUSINESSNAMES] (state, payload) {
    state.businessnames = payload.data
  },
  [types.GET_BUSINESSNAME] (state, payload) {
    state.businessname = payload.data
  }
}
