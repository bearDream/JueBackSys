import types from './types'

export default {
  [types.is_login] (state, payload) {
    state.is_login = payload.data
  }
}
