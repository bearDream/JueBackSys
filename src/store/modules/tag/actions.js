import types from './types'
import Model from '../../../models/tag'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getTags ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      console.info('-----------------------getTags----------------')
      console.info(res.data)
      commit(types.GET_TAGS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getTag ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_TAG, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteTag ({commit}, {params}) {
    return new Model().DELETE({params})
  }
}
