import types from './types'
import Model from '../../../models/businessDish'
import NotModel from '../../../models/notBusinessDish'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getBusinessDishs ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_BUSINESSDISHS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getBusinessDish ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_BUSINESSDISH, {
        data: res.data
      })
    })
  },

  /**
   * 获取该商家没有的菜品
   */
  getNotBusinessDish ({commit}, {params}) {
    return new NotModel().GET({params}).then((res) => {
      commit(types.GET_NOTBUSINESSDISHS, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteBusinessDish ({commit}, {params}) {
    return new Model().DELETE({params})
  },

  /**
   * 添加数据
   */
  postBusinessDish ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putBusinessDish ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
