import types from './types'

export default {
  [types.GET_BUSINESSTYPES] (state, payload) {
    state.businesstypes = payload.data
  },
  [types.GET_BUSINESSTYPE] (state, payload) {
    state.businesstype = payload.data
  }
}
