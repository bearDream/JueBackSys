import types from './types'
import Model from '../../../models/log'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getLogs ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      console.info(res.data)
      commit(types.GET_LOGS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getLog ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_LOG, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteLog ({commit}, {params}) {
    return new Model().DELETE({params})
  }
}
