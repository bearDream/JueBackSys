import types from './types'

export default {
  [types.GET_NUTRITIONS] (state, payload) {
    state.nutritions = payload.data
  },
  [types.GET_NUTRITION] (state, payload) {
    state.nutrition = payload.data
  }
}
