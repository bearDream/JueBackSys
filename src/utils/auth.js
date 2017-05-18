import storage from './helpers/storageLite'
import Model from '@/models/actions/login'
import LogOutModel from '@/models/actions/logout'

const USERINFO = 'userinfo'

export default {
  name: 'auth',

  /**
   * 获取 auth，返回：管理员信息和 token
   * @return {Object}
   */
  get () {
    return {
      [USERINFO]: storage.get(USERINFO)
    }
  },

  /**
   * 登录
   * @param {string} manager 登录管理员
   * @param {string} token 登录 token
   */
  login ({data}) {
    storage.set(USERINFO, data)
  },

  /**
   * 登出
   */
  logout () {
    new LogOutModel().GET({})
      .then((res) => {
        storage.remove(USERINFO)
      })
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    new Model.GET({}).then((res) => {
      console.info(res.data)
    })
    // return !!storage.get(USERINFO)
  }
}
