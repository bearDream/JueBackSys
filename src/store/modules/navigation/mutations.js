import types from './types'

export default {
  [types.base] (state, payload) {
    state.base = payload.data
  },
  [types.business] (state, payload) {
    state.business = payload.data
  },
  [types.dish] (state, payload) {
    state.dish = payload.data
  },
  [types.user] (state, payload) {
    state.user = payload.data
  }
}
