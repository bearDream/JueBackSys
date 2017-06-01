import types from './types'
import Model from '../../../models/tag'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getTags ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_TAGS, {
        data: res.data.data
      })
    })
  }
}
