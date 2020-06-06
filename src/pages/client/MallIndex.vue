<template>
  <!-- 当前组件需要展示商城主体 -->
  <el-container>
    <el-header>
      <!-- 轮播图 -->
      <template >
        <el-carousel :interval="100000" type="card" height="460px">
          <el-carousel-item v-for="(item, index) in lopImg" :key="index" >
            <!-- <h3 class="medium">{{ item }}</h3> -->
            <img style="width: 100%;height: 100%;" :src="item"/>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-header>
    <el-main>
      <!-- 各分类栏目，简要信息展示 -->
      <!-- HTML5中新标签-section -->
      <section class="" v-for="item in typeList.slice(1)" :key="item.id">
        <SectionHeader :title="item.name" tips="" moreText="查看更多 >" @click.native="selectType(item.id)"/>
        <div>
          <ul class="content">
              <GoodsItem
                v-for="(item,index) in filterGoodsByType(item.id).slice(0,4)"
                :style="{marginRight: (index+1)%4===0?'0px':'25px'}"
                :key="+item.id"
                :id="item.id"
                :img="item.img"
                :name="item.name"
                :price="item.unitPrice"
              />
          </ul>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script>
import { getTypes, getGoodsList } from '../../api/clientApi.js'
import SectionHeader from '../../components/SectionHeader.vue'
import GoodsItem from '../../components/GoodsItem.vue'

export default {
  name: 'MallIndex',
  components: {
    SectionHeader,
    GoodsItem
  },
  data () {
    return {
      typeList: [],
      goodsList: [],
      lopImg: [ // 可以写成请求
        require('../../../public/image/bc_login.jpg'),
        require('../../assets/img/logo_bg.jpg'),
        require('../../assets/img/bc_login.jpg'),
        require('../../assets/img/logo_bg.jpg'),
        require('../../assets/img/logo_bg.jpg')
      ]
    }
  },
  methods: {
    filterGoodsByType(typeid){
      return this.goodsList.filter((item)=>{
        return item.typeId===typeid;
      });
    },
    navTo (route) {
      this.$router.push(route)
    },
    selectType (typeId) {
      if (typeId === -1) {
        return;
      }
      this.navTo('/mall/show/goodsList/' + typeId + '/all');
    },
    getGoodsList (typeId) {
      const res = getGoodsList(typeId);
      res.then((data) => {
        this.goodsList = data;
      }).catch((e) => {
        alert(e);
      })
    }
  },
  mounted () {
    // 获取数据
    const res = getTypes();
    res.then((data) => {
      data.unshift({
        id: -1,
        name: '首页'
      });
      this.typeList = data;
      this.getGoodsList(-1);
    }).catch((e) => {
      alert(e);
    });
  }
}
</script>

<style scoped lang="less">
  .el-header {
    // width: 1500px;
    // margin: 0 auto;
    height: 500px !important;
    background-color: #e5e5e5;
    color: #333;
    line-height: 60px;
    .el-carousel{
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
      }
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  .el-main {
    // background-color: skyblue;
    color: #333;
    width: 1300px !important;
    margin: 0 auto !important;
    // text-align: center;
    // line-height: 160px;
  }
</style>
