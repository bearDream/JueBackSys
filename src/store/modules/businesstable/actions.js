import types from './types'
import Model from '../../../models/businesstag'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getBusinesstabels ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_BUSINESSTABLES, {
        data: res.data.data
      })
      console.info(res.data.data)
    })
  },

  /**
   * 获取详情
   */
  getBusinesstable ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_BUSINESSTABLE, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteBusinesstable ({commit}, {params}) {
    return new Model().DELETE({params})
  },
  /**
   * 添加数据
   */
  postBusinesstable ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putBusinesstable ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
