<template>
  <el-container>
    <el-header>
      <!-- 商品分类 -->
      <ul>
        <li v-for="item in goodType"
        :key="item.id" @click="selectType(item.id)">{{ item.name }}</li>
      </ul>
      <!-- <div style="background-color: yellow;height: 60px;"></div> -->
    </el-header>
    <el-main>
      <!-- 分类菜单内容的显示路由 => 解决同一路由复用不跳转的问题-->
      <router-view :key="$route.fullPath"/>
    </el-main>
  </el-container>
</template>

<script>
import { getTypes } from '../../api/adminApi.js'
export default {
  name: 'MallShow',
  data () {
    return {
      goodType: []
    }
  },
  methods: {
    // 路由跳转
    navTo (route) {
      this.$router.push(route)
    },
    // 分类标签选中
    selectType (typeId) {
      if (typeId === -1) {
        this.navTo('/mall/show/index')
      } else {
        this.navTo('/mall/show/goodsList/' + typeId + '/all')
      }
    },
    // 获取顶部商品分类标签
    getTypes () {
      const res = getTypes();
      res.then((data) => {
        data.unshift({
          id: -1,
          name: '首页'
        })
        this.goodType = data
      }).catch((e) => {
        alert(e)
      })
    }
  },
  mounted () {
    this.getTypes()
  }
}
</script>

<style scoped lang="less">
  .el-header {
    // background-color: bisque;
    // width: 1500px;
    min-width: 600px;
    margin: 0 auto;
    color: #333;
    text-align: center;
    // height: 60px !important;
    padding: 0;
    li{
      display:inline-block;
      width: 80px;
      margin: 4px 24px;
      text-align: center;
      font-weight: 600;
      cursor: pointer;
      &:hover{
        color: yellow;
      }
    }
    .selected{
      color: #feee8a;
      border-bottom: 3px solid #feee8a;
    }
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    overflow-x: hidden;
    // text-align: center;
    // line-height: 160px;
    padding: 0;
  }
</style>
