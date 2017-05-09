import types from './types'

export default {
  [types.GET_LOGS] (state, payload) {
    state.logs = payload.data
  },
  [types.GET_LOG] (state, payload) {
    state.log = payload.data
  }
}
