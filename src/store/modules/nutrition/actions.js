import types from './types'
import Model from '../../../models/nutrition'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getNutritions ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      console.info(res.data.data)
      commit(types.GET_NUTRITIONS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getNutrition ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_NUTRITION, {
        data: res.data
      })
    })
  },

  /**
   * 删除
   */
  deleteNutrition ({commit}, {params}) {
    return new Model().DELETE({params})
  },

  /**
   * 添加数据
   */
  postNutrition ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 修改数据
   */
  putNutrition ({commit}, {data}) {
    return new Model().PUT({data})
  }
}
