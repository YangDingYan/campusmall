import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)
// Vuex 将store 分割成模块（module）
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
