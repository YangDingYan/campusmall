<template>
    <el-container>
      <el-main >
        <font>账户:admin,密码:admin123!</font>
        <div class="adminLogin">
          <transition name="fade" appear>
            <div class="login">
              <div class="login-top">登录</div>
              <div class="login-center clearfix">
                <div class="login-center-image">
                  <img src="../../assets/img/name.png" />
                </div>
                <div class="login-center-input">
                  <input v-model="adminLogin.account" type="text" name="" value="" placeholder="请输入您的用户名" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的用户名'"/>
                  <div class="login-center-input-text">用户名</div>
                </div>
              </div>
             <div class="login-center clearfix">
                <div class="login-center-image">
                  <img src="../../assets/img/password.png" />
                </div>
                <div class="login-center-input">
                  <input v-model="adminLogin.password" type="password" name="" value="" placeholder="请输入您的密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'"/>
                  <div class="login-center-input-text">密码</div>
                </div>
              </div>
              <div class="login-button" @click="login">登录</div>
            </div>
          </transition>
        </div>
      </el-main>
    </el-container>
</template>

<script>
import { adminlogin } from '../../api/adminApi.js'
import { mapMutations } from 'vuex'
export default {
  name: 'AdminLogin',
  data () {
    return {
      adminLogin: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations({
      setAdminName: 'SET_ADMIN_NAME',
      setAdminToken: 'SET_ADMIN_TOKEN'
    }),
    login () {
      if ((this.adminLogin.account === '') || (this.adminLogin.password === '')) {
        alert('账户和密码均不能为空！')
      } else {
        const res = adminlogin(this.adminLogin);
        res
          .then((data) => {
            // 保存当前登录的管理员信息到store中
            // alert(data.name)
            this.setAdminName(data.name)
            this.setAdminToken(true)
            this.$router.push('/backstage').catch(err => {
              console.log(err)
            })
          })
          .catch((e) => {
            alert('登陆失败')
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .fade-enter-active{
    transition: opacity 1s
  }
  .fade-enter{
    opacity: 0;
  }
  .el-main {
    height: 100vh;
    padding: 0;
    postion: relative;
    // background: url(../../assets/img/bc_login_admin.jpg) no-repeat center;
    // background-size: cover;
    .login{
      // z-index: 2;
      position: absolute;
      width: 350px;
      height: 500px;
      top: 50%;
      left: 50%;
      transform: translate(-50% ,-50%);
      background: #ffff;
      border-radius: 20px;
      // 这里是依据浏览器坐标系-做出的偏移-实现的阴影位置
      box-shadow: 6px 6px 10px #d1d9e6, -1px -1px 0.5px #EEEEEE;
      transition: all 1s;

      .login-top{
        font-size: 25px;
        margin-top: 100px;
        padding:0 0 0 40px;
        // text-align:center;
        margin-bottom: 50px;
        color: #333333;
        box-sizing: border-box;
      }

      .login-center{
        width: 100%;
        box-sizing: border-box;
        padding: 0 40px;
        margin-bottom: 30px;
        // background-color: red;
        .login-center-image{
          width: 20px;
          height: 20px;
          float: left;
          margin-top: 5px;
          img{
            width: 100%;
          }
        }
        .login-center-input{
          width: 230px;
          height: 30px;
          float: left;
          margin-left: 15px;
          position: relative;

          input{
            z-index: 2;
            // transition: all 0.5s;
            padding-left: 10px;
            color: #333333;
            width: 100%;
            height: 30px;
            border: 0;
            border-bottom: 1px solid #cccccc;
            border-top: 1px solid #ffffff;
            border-left: 1px solid #ffffff;
            border-right: 1px solid #ffffff;
            box-sizing: border-box;
            outline: none;
            position: relative;
          }
          input:focus{
            border: 1px solid dodgerblue;
          }

          .login-center-input-text{
            background: white;
            padding:0 5px;
            position: absolute;
            z-index: 0;
            opacity: 0;
            height: 20px;
            top: 50%;
            margin-top: -10px;
            font-size: 14px;
            left: 5px;
            color: dodgerblue;
            line-height: 20px;
            // 过渡动画 应用到全属性上
            transition: all 0.5s;
            -moz-transition: all 0.5s;/* Firefox 4 */
            -webkit-transition: all 0.5s;/* Safari 和 Chrome */
            -o-transition: all 0.5s;/* Opera */
          }
          // 输入框选中后，后的所有（）属性样式设置为--
          input:focus~.login-center-input-text{
            top: 0;
            z-index: 3;
            opacity: 1;
            margin-top: -15px;
          }
        }
      }
      .login-button{
        cursor: pointer;
        width: 250px;
        height: 40px;
        text-align: center;
        color: #333333;
        line-height: 40px;
        background: #ffff;
        border-radius: 20px;
        box-shadow: 3px 3px 3px #d1d9e6, -1px -1px 1px #EEEEEE;
        margin: 0 auto;
        margin-top: 50px;
      }
    }
  }
  .clearfix{
    zoom: 1;
  }
  .clearfix::after{
    visibility:hidden;
    display: block;
    font-size:0;
    content:" ";
    clear:both;
    height:0;
  }
</style>
