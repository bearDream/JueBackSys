import types from './types'
import LogOutModel from '@/models/actions/logout'

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
  logoutAction ({commit}) {
    new LogOutModel().GET({})
      .then((res) => {
        commit(types.is_login, {
          data: false
        })
      })
  }

}
