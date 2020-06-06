// 从 store 中的 state 中派生出一些状态--(计算属性)
// 该Getter会暴露为 store.getters 对象
export const adminToken = state => state.adminToken
export const clientToken = state => state.clientToken
