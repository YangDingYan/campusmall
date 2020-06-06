// 本文件为前台的axios的配置信息
import axios from 'axios'
// import router from '../router/client.js'//axios完成数据请求后需要改动路由->需要后台管理的router
// import store from '../store'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://localhost:8443/api'

export default axios;
