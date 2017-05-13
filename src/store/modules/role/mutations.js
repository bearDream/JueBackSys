import types from './types'

export default {
  [types.GET_ROLES] (state, payload) {
    state.roles = payload.data
  },
  [types.GET_ROLE] (state, payload) {
    state.role = payload.data
  }
}
