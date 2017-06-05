import types from './types'

export default {

  [types.GET_LOGINUSER] (state, payload) {
    state.loginUser = payload.data
  }
}
