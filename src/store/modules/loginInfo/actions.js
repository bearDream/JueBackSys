import types from './types'

// 角色的所有请求
export default {
  /**
   * 设置登录用户信息
   */
  setLoginUser ({commit}, {data}) {
    commit(types.GET_LOGINUSER, {
      data: data
    })
  }
}
