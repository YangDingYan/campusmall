<template>
  <el-container style="height: 100vh;">
    <!-- <el-backtop :visibility-height="100" :bottom="54" :right="5"></el-backtop> -->
    <el-header class="top-header">
      <el-button @click="changeCollapse" v-if="!isCollapse" class="el-icon-s-fold"></el-button>
      <el-button @click="changeCollapse" v-else class="el-icon-s-unfold"></el-button>
      <font style="color: deepskyblue;font-size: 20px;">系统管理</font>
      <div class="login">
        当前登录: {{ adminName }}
        <!-- <el-button style="background-color: aliceblue;" @click="logout()"></el-button> -->
        <div class="loginfc">
          <span @click="logout()">退出系统</span>
        </div>
      </div>
    </el-header>
    <el-container>
      <keep-alive>
        <el-aside width="200px">
          <div style="margin-top: 20px;">MAIN</div>
          <el-menu collapse-transition
            :default-active="this.$route.name"
            class="el-menu-vertical-demo"
            :collapse="isCollapse">
            <el-menu-item index="editUser" @click="navTo('/backstage/editUser')">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="goods" @click="navTo('/backstage/goods')">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="orders" @click="navTo('/backstage/orders')">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navTo('/backstage/editUser')" disabled>
              <i class="el-icon-s-comment"></i>
              <span slot="title">留言管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="navTo('/backstage/editUser')" disabled>
              <i class="el-icon-s-data"></i>
              <span slot="title">营业图表</span>
            </el-menu-item>
            <el-menu-item index="editAdmin" @click="navTo('/backstage/editAdmin')" disabled>
              <i class="el-icon-user-solid"></i>
              <span slot="title">账户管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </keep-alive>
      <el-container>
        <!-- 面包屑：指定样式后用具命插槽-在其他子路由页中，把路由中的匹配路由名放到该位置 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <font style="margin-left: 40%;">校园打印平台应用</font>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// mapState,
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState([
      'adminName'
    ])
  },
  methods: {
    ...mapMutations({
      adminLogout: 'ADMIN_LOGOUT'
    }),
    navTo (route) {
      this.$router.push(route)
    },
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      this.adminLogout()
      this.$router.push('/adminLogin')
    }
  },
  mounted () {
    // alert(this.$route.name)
  }
}
</script>

<style scoped lang="less">
  .el-container{
    height: auto;
    // overflow: hidden;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
 .top-header{
    z-index:100;
    height: 50px !important;
    line-height: 50px;
    background-color: #fff;
    color: #333;
    border-radius: 2px;
    padding: 0;
    box-shadow: 0 0.125rem 0.8rem rgba(0, 0, 0, 0.1);
    text-align: center;
    .login{
      float: right;
      margin-right: 10px;
      position: relative;
      .loginfc{
        position: absolute;
        width: 170px;
        background-color: white;
        display: none;
        span:hover{
          color: dodgerblue;
          cursor: pointer;
        }
      }
    }
    .login:hover{
      cursor: pointer;
      .loginfc{
        display: block;
      }
    }
    .el-button{
      float: left;
      font-size: 20px;
      border: none;
    }
    .el-button:hover,.el-button:focus{
      background-color: white;
    }
  }
  .el-aside {
    z-index: 99;
    background-color: #fff;
    color: #BBBBBB;
    padding-bottom: 80px;
    text-align: center;
    width:auto !important;//为了能够随内容而变化
    display:inline-block !important;
    display:inline;
    box-shadow: 0 0.125rem 0.8rem  rgba(0, 0, 0, 0.1);
    .el-menu{
      border-right:none;
    }
    .is-active{
      border-right: 2px solid deepskyblue;
    }
  }
  .el-main {
    background-color: #F8F9FB;
    color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  // .main-header{
  //   position: relative;
  //   top:50%;
  //   // margin-top: -20px;
  //   padding: 0 20px;
  // }
  .el-footer {
    z-index: 99;
    height: 3.125rem !important;
    background-color: #fff;
    color: #CDBFA9;
    font-size: 10px;
    line-height: 3.125rem;
    // text-align: center;
    box-shadow:-10px 0px 0.8px white,
               0 0.125rem 0.8rem  rgba(0, 0, 0, 0.1);
  }
</style>
