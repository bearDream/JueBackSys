import types from './types'

export default {
  [types.GET_DISHTYPES] (state, payload) {
    state.dishtypes = payload.data
  },
  [types.GET_DISHTYPE] (state, payload) {
    state.dishtype = payload.data
  }
}
