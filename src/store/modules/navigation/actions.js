import types from './types'
// navigation的所有状态管理
export default {
  /**
   * 设置显示baseNav
   */
  show_base_nav ({commit}) {
    commit(types.base, {
      data: true
    })
    commit(types.business, {
      data: false
    })
    commit(types.dish, {
      data: false
    })
    commit(types.user, {
      data: false
    })
  },

  /**
   * 显示商家导航栏
   */
  show_business_nav ({commit}) {
    commit(types.base, {
      data: false
    })
    commit(types.business, {
      data: true
    })
    commit(types.dish, {
      data: false
    })
    commit(types.user, {
      data: false
    })
  },

  /**
   * 显示菜品导航栏
   */
  show_dish_nav ({commit}) {
    commit(types.base, {
      data: false
    })
    commit(types.business, {
      data: false
    })
    commit(types.dish, {
      data: true
    })
    commit(types.user, {
      data: false
    })
  },

  /**
   * 显示用户导航栏
   */
  show_user_nav ({commit}) {
    commit(types.base, {
      data: false
    })
    commit(types.business, {
      data: false
    })
    commit(types.dish, {
      data: false
    })
    commit(types.user, {
      data: true
    })
  },

  /**
   * 不显示任何导航栏
   */
  show_none_nav ({commit}) {
    commit(types.base, {
      data: false
    })
    commit(types.business, {
      data: false
    })
    commit(types.dish, {
      data: false
    })
    commit(types.user, {
      data: false
    })
  }

}
