import types from './types'
// navigation的所有状态管理
export default {
  /**
   * 设置显示baseNav
   */
  login ({commit}) {
    commit(types.is_login, {
      data: true
    })
  },

  /**
   * 登出
   */
  logout ({commit}) {
    commit(types.is_login, {
      data: false
    })
  }

}
