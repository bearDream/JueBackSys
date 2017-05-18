import types from './types'
import Model from '../../../models/dishtag'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getDishtags ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      console.info(res.data.data)
      commit(types.GET_DISHTAGS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getDishtag ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_DISHTAG, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteDishtag ({commit}, {params}) {
    return new Model().DELETE({params})
  },

  /**
   * 添加数据
   */
  postDishtag ({commit}, {params}) {
    return new Model().POST({params})
  },

  /**
   * 修改数据
   */
  putDishtag ({commit}, {params}) {
    return new Model().PUT({params})
  }
}
