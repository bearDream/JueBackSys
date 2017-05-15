import types from './types'

export default {
  [types.GET_BUSINESSTABLES] (state, payload) {
    state.businesstables = payload.data
  },
  [types.GET_BUSINESSTABLE] (state, payload) {
    state.businesstable = payload.data
  }
}
