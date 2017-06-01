import types from './types'
import Model from '../../../models/dishtype'
import AllModel from '../../../models/dishAlltype'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getDishtypes ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_DISHTYPES, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取所有菜品分类
   */
  getAllDishtypes ({commit}) {
    return new AllModel().GET({}).then((res) => {
      commit(types.GET_ALLDISHTYPES, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getDishtype ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_DISHTYPE, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteDishtype ({commit}, {params}) {
    return new Model().DELETE({params})
  },

  /**
   * 添加数据
   */
  postDishtype ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putDishtype ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
