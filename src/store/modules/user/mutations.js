import types from './types'

export default {
  [types.GET_USERS] (state, payload) {
    state.users = payload.data
  },
  [types.GET_USER] (state, payload) {
    state.user = payload.data
  },
  [types.GET_ALLUSERS] (state, payload) {
    state.allUser = payload.data
  }
}
