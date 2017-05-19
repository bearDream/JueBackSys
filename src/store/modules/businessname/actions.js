import types from './types'
import Model from '../../../models/businessname'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getBusinessnames ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_BUSINESSNAMES, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getBusinessname ({commit}, {uri}) {
    alert(uri)
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_BUSINESSNAME, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteBusinessname ({commit}, {params}) {
    return new Model().DELETE({params})
  },
  /**
   * 添加数据
   */
  postBusinessname ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putBusinessname ({commit}, {data}) {
    var datas = new URLSearchParams()
    datas.append('businessId', 1)
    return new Model().PUT(datas)
    // return new Model().PUT({data})
  }
}
