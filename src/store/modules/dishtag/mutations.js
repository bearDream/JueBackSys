import types from './types'

export default {
  [types.GET_DISHTAGS] (state, payload) {
    state.dishtags = payload.data
  },
  [types.GET_DISHTAG] (state, payload) {
    state.dishtag = payload.data
  }
}
