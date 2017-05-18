import types from './types'
import Model from '../../../models/dish'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getDishs ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      console.info(res.data.data)
      commit(types.GET_DISHS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getDish ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_DISH, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteDish ({commit}, {params}) {
    return new Model().DELETE({params})
  },

  /**
   * 添加数据
   */
  postDish ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putDish ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
