<template>
  <div id="login">
      用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      <br><br>
      密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <button v-on:click="login">登录</button>
  </div>
</template>

<script>
// import axios from 'axios' // 这样用的是依赖模块中原生的方法->通过axios. 来调用，并且使用到了，一定要引用
import axios from '../config/axios-admin.js'
// import { adminlogin } from '../api/adminApi.js'
export default {
  name: 'Login',
  data () {
    return {
      // 这里的直接绑定，在DevTools中能够随时看到
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      axios
        .post('/client/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        // .then(successResponse => {
        //   if (successResponse.data.code === 200) {
        //     alert('数据库连接成功')
        //   }
        // })
        // .catch(failResponse => {
        //   alert('error')
        // })
    }
  }
}
</script>

<style scoped>
/*#login {*/
/*  width:400px;*/
/*  height: 400px;*/
/*  border: 2px solid green;*/
/*  background-color: red;*/
/*}*/
</style>
