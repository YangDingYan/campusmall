import { getLocalItem } from '../util/util.js'

// Vuex 的状态存储
const state = {
  // 后台管理
  adminToken: getLocalItem('adminToken') ? getLocalItem('adminToken') : null,
  adminName: getLocalItem('adminName') ? getLocalItem('adminName') : '',
  // 客户商城
  clientName: getLocalItem('clientName') ? getLocalItem('clientName') : '',
  clientToken: getLocalItem('clientToken') ? getLocalItem('clientToken') : null
}

export default state
