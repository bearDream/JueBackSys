import types from './types'
import Model from '../../../models/businesstake'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getBusinesstakes ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_BUSINESSTAKES, {
        data: res.data.data
      })
      console.info(res.data.data)
    })
  },

  /**
   * 获取详情
   */
  getBusinesstake ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_BUSINESSTAKE, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteBusinesstake ({commit}, {params}) {
    return new Model().DELETE({params})
  },
  /**
   * 添加数据
   */
  postBusinesstake ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putBusinesstake ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
