import types from './types'

export default {
  /**
   * 设置urltype
   */
  setUrlType ({commit}, {params}) {
    commit(types.GET_URLTYPE, {
      data: params
    })
  }
}
