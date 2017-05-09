import types from './types'
import Model from '../../../models/log'

// 角色的所有请求
export default {
  /**
   * 获取列表
   */
  getArticles ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      console.info(res.data.data)
      commit(types.GET_LOGS, {
        data: res.data.data
      })
    })
  },

  /**
   * 获取详情
   */
  getArticle ({commit}, {uri}) {
    return new Model().GET({uri}).then((res) => {
      commit(types.GET_LOG, {
        data: res.data
      })
    })
  },

  /**
   * 新增
   */
  postArticle ({commit}, {data}) {
    return new Model().POST({data})
  },

  /**
   * 编辑
   */
  putArticle ({commit}, {uri, data}) {
    return new Model().PUT({uri, data})
  },

  /**
   * 删除
   */
  deleteArticle ({commit}, {params}) {
    return new Model().DELETE({params})
  }
}
