import types from './types'
import Model from '../../../models/user'
import UserFuzzyModel from '../../../models/userFuzzy'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getUsers ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_USERS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getUser ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_USER, {
        data: res.data
      })
    })
  },

  /**
   * 根据条件查询用户
   */
  getAllUsers ({commit}, {params}) {
    return new UserFuzzyModel().GET({params}).then((res) => {
      commit(types.GET_ALLUSERS, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteUser ({commit}, {params}) {
    return new Model().DELETE({params})
  },

  /**
   * 添加数据
   */
  postUser ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putUser ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
