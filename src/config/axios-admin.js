// 本文件为后台的axios的配置信息
import axios from 'axios'
// import router from '../router/admin.js'// axios完成数据请求后需要改动路由->需要后台管理的router
// import store from '../store'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://localhost:8443/api'
// axios.defaults.baseURL = 'http://106.14.173.173:8888'
// 这里可以设置路由拦截
export default axios;
