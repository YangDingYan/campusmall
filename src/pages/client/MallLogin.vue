<template>
  <el-container>
    <el-main>
      <div class="login_wrap">
        <div class="content">
          <!-- 顶部文字Logo -->
          <div class="logo"></div>
          <!-- 底部表单布局 -->
          <div class="login_box">
            <div class="login_form">
              <!-- 登录 -->
              <div v-show="curIndex === 0">
                <div class="login_title">登录</div>
                <form>
                  <div class="form_text_ipt">
                    <input ref="account" type="text" placeholder="邮箱">
                  </div>
                  <div class="ececk_warning"><span>手机号/邮箱不能为空</span></div>
                  <div class="form_text_ipt">
                    <input ref="pwd" type="password" placeholder="密码">
                  </div>
                  <!-- <div class="ececk_warning"><span>密码不能为空</span></div> -->
                  <div class="form_check_ipt">
                    <div class="left check_left">
                      <label><input name="" :checked="checked" type="checkbox"> 下次自动登录</label>
                    </div>
                    <div class="right check_right">
                      <a href="#">忘记密码</a>
                    </div>
                  </div>
                  <div class="form_btn">
                    <button type="button" @click="login">登录</button>
                  </div>
                  <div class="form_reg_btn">
                    <span>还没有帐号？</span><a href="javascript:void(0)" @click="setIndex(1)">马上注册</a>
                  </div>
                </form>
              </div>
              <!-- 注册 -->
              <div v-show="curIndex === 1">
                <div class="login_title">注册</div>
                <form>
                  <div class="form_text_ipt">
                    <input ref="signEmail" type="text" placeholder="注册邮箱">
                  </div>
                  <div class="form_text_ipt">
                    <input ref="signPwd" type="password" placeholder="密码">
                  </div>
                  <div class="form_text_ipt">
                    <input ref="signName" type="text" placeholder="昵称">
                  </div>
                  <!-- 可能需要的补充 -->
                  <div class="form_text_ipt">
                    <input ref="signAddress" type="text" placeholder="宿舍地址">
                  </div>
                  <div class="form_text_ipt">
                    <input ref="signPhone" type="text" placeholder="联系方式">
                  </div>
                  <!--  -->
                  <div class="form_btn">
                    <button type="button" @click="signup">注册</button>
                  </div>
                  <div class="form_reg_btn">
                    <span>已有帐号？</span><a href="javascript:void(0)" @click="setIndex(0)">马上登录</a>
                  </div>
                </form>
              </div>
              <!-- 公共其他登录 -->
              <div class="other_login">
                <div class="left other_left">
                  <span>其它登录方式</span>
                </div>
                <div class="right other_right">
                  <a href="#"><i class="fa fa-qq fa-2x"></i></a>
                  <a href="#"><i class="fa fa-weixin fa-2x"></i></a>
                  <a href="#"><i class="fa fa-weibo fa-2x"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import {
    login,
    signup
  } from '../../api/clientApi.js';
  import { setLocalItem,getLocalItem } from "../../util/util.js"

  export default {
    name: 'MallLogin',
    data() {
      return {
        curIndex: 0,
        checked: false,
      }
    },
    computed: {

    },
    mounted() {
       // var nowCheck = getLocalItem('checked')
       // if(nowCheck){
       //    this.$refs.account.value = getLocalItem('login_account')
       //    this.$refs.pwd.value = getLocalItem('login_pwd')
       // }else{
       //    this.$refs.account.value = ''
       //    this.$refs.pwd.value = ''
       // }
    },
    methods: {
      ...mapMutations({
        setClientName: 'SET_CLIENT_NAME',
        setClientToken: 'SET_CLIENT_TOKEN'
      }),
      // 登录/注册 条件显示判定
      setIndex(index) {
        if (index === this.curIndex) {
          return
        }
        this.curIndex = index
      },
      login() {
        const account = this.$refs.account.value;
        const pwd = this.$refs.pwd.value;
        if (account == '' || pwd == '') {
          alert('用户名和密码不能为空！')
        } else {
          const res = login({
            username: account,
            password: pwd
          });
          res
            .then((data) => {
              this.setClientName(data.name);
              this.setClientToken(true);
              // if(this.checked){
              //   setLocalItem('checked',true)
              //   setLocalItem('login_account',account)
              //   setLocalItem('login_pwd',data.pwd)
              // }else{
              //    setLocalItem('checked',false)
              // }
              setLocalItem('userId',data.id)
              this.$router.push('/');
            })
            .catch((e) => {
              alert(e)
            })
        }
      },
      signup() {
        if (this.$refs.signEmail.value == '' || this.$refs.signName.value == '' ||
          this.$refs.signPwd.value == '') {
          alert('注册邮箱、用户名和密码不能为空！')
        } else {
          const res = signup({
            id: 0,
            sex: 0,
            header: '',
            date: new Date(),
            email: this.$refs.signEmail.value,
            nickname: this.$refs.signName.value,
            password: this.$refs.signPwd.value,
            address: this.$refs.signAddress.value,
            phone: this.$refs.signPhone.value,
          });
          res.then((data) => {
            this.setClientName(data);
            this.setClientToken(true);
            this.$router.push('/');
          })
          .catch((e) => {
            alert(e)
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .el-main {
    line-height: normal;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #3cf;
    -webkit-tap-highlight-color: transparent;
  }

  .content {
    margin: 0 auto;
  }

  .login_wrap {
    height: 100vh;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
    background: url(../../assets/img/logo_bg.jpg) no-repeat center;
    // background-size: 100%; 规定背景图像的比例
    background-size: cover;

    .logo {
      width: 500px;
      height: 150px;
      margin: 0 auto;
      background: url(../../assets/img/logowz.png) no-repeat center;
    }

    .login_box {
      width: 360px;
      background: #FFFFFF;
      margin: 0px auto;
      box-shadow: 0px 0px 5px #333333;

      .login_title {
        font-size: 25px;
        text-align: center;
        color: #FF7F50;
        padding: 15px 0;
        width: 300px;
        margin: 0 auto;
        border-bottom: solid 1px #CCCCCC;
      }

      .form_text_ipt {
        width: 300px;
        height: 40px;
        border: solid 1px #CCCCCC;
        margin: 20px auto 0 auto;
        background: #FFFFFF;

        input {
          width: 290px;
          height: 30px;
          margin: 5px;
          border: none;
          outline: medium;
          font-family: "微软雅黑";
          font-size: 15px;
          color: #666;
        }
      }

      .form_check_ipt {
        width: 300px;
        margin: 10px auto;
        overflow: hidden;

        .check_left {
          float: left;

          label {
            cursor: pointer;

            input {
              position: relative;
              top: 2px;
            }
          }
        }

        .check_right {
          float: right;
        }
      }

      .ececk_warning {
        font-size: 13px;
        color: red;
        width: 300px;
        margin: 0 auto;
        display: none;
      }
    }

    .form_btn {
      width: 300px;
      height: 40px;
      margin: 10px auto;

      button {
        width: 100%;
        height: 100%;
        border: none;
        color: #FFFFFF;
        font-size: 14px;
        background: #FF7F50;
        cursor: pointer;
        font-family: "微软雅黑", MicrosoftYaHei;
      }
    }

    .form_reg_btn {
      width: 300px;
      margin: 0 auto;
      font-size: 14px;
      color: #666;

      span,
      a {
        float: left;
      }
    }

    .other_login {
      overflow: hidden;
      width: 300px;
      height: 80px;
      line-height: 80px;
      margin: 0px auto;

      .other_left {
        float: left;
        font-size: 14px;
        color: #999;
      }

      .other_right {
        a {
          margin: 5px;
          color: #636363;

          :hover {
            color: #AEEEEE;
          }
        }
      }
    }
  }
</style>
