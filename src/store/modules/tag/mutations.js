import types from './types'

export default {
  [types.GET_TAGS] (state, payload) {
    state.tags = payload.data
  }
}
