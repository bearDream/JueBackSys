/**
 * Created by soft01 on 2017/5/9.
 */
import REST from '@/utils/rest'
import consts from '@/utils/consts'
import restHelpers from '@/utils/helpers/restHelpers'

export default class extends REST {
  constructor () {
    super()
    this.baseURL = consts.API_URL
    this.errorHandler = restHelpers.errorHandler
    this.path = 'log'
  }
}
