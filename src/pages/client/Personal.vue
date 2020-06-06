<template>
  <!-- 作为应用组件，上层已经存在 el-container/el-main -->
  <el-container>
    <el-aside>
      <el-menu :default-active="this.$route.name"
        class="el-menu-vertical-demo">
        <el-menu-item index="Cart" @click="navTo('/mall/personal/cart')">
          <i class="el-icon-goods"></i>
          <span slot="title">购物车</span>
        </el-menu-item>
        <el-menu-item index="Order" @click="navTo('/mall/personal/order')">
          <i class="el-icon-s-order"></i>
          <span slot="title">我的订单</span>
        </el-menu-item>
        <el-menu-item index="Information" @click="navTo('/mall/personal/information')">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view :key="$route.fullPath"></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Personal',
  computed: {
  },
  data () {
    return {
      curPath: this.$route.path
    }
  },
  methods: {
    navTo (route) {
      this.$router.push(route)
    }
  },
  mounted: {
  },

  watch: {
    '$route' (to, from) {
      this.curPath = to.path
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/css/var.less";

  .el-container{
    margin: 20px 130px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-aside {
    width: 200px !important;
    // background-color: #D3DCE6;
    color: #333;
    overflow: hidden;
    text-align: center;
    // border:1px solid darkgoldenrod;
    .el-menu{
      border-right:none;
    }
    .is-active{
      border-right: 2px solid deepskyblue;
    }
  }
  .el-main {
    // background-color: gray;
    width: 100%;
    color: #333;
    overflow: hidden;
    text-align: center;
  }
</style>
