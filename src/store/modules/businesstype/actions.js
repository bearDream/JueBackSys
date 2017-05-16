import types from './types'
import Model from '../../../models/businesstype'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getBusinesstypes ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_BUSINESSTYPES, {
        data: res.data.data
      })
      console.info('--------------------------------')
      console.info(res.data.data)
    })
  },

  /**
   * 获取详情
   */
  getBusinesstype ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_BUSINESSTYPE, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteBusinesstype ({commit}, {params}) {
    return new Model().DELETE({params})
  },
  /**
   * 添加数据
   */
  postBusinesstype ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putBusinesstype ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
