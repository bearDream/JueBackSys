import types from './types'

export default {
  [types.GET_URLTYPE] (state, payload) {
    state.urlType = payload.data
  }
}
