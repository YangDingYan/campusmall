<template>
  <el-container>
    <el-main>
      <el-breadcrumb separator="/" style="font-size: 18px;margin-bottom: 8px;">
        <el-breadcrumb-item :to="{ path:'/backstage/goods' }">商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="addType" size="small" @click="addTab(typesValue)">添加类目</el-button>
      <!-- 这里的可以删除/不可以 要注意区分和实现 @tab-remove="removeTab"-->
      <keep-alive>
        <el-tabs v-model="activeTypeId" class="tabs"
          type="card" @tab-click="changType" @tab-remove="removeTab" closable
          style="clear: both;">
          <el-tab-pane v-for="(item, index) in goodTypes"
          :key="item.id" :label="item.name" :name="String(index)">
          </el-tab-pane>
          <el-container class="content">
            <ul class="clear">
              <!-- <p>{{ this.curTypeName }}</p> -->
              <li v-for="(item, index) in goodsList" :key="index">
                <div style="overflow: hidden;"><img style="position: relative;" :src="item.img" alt="" /></div>
                <span>{{item.name}}</span>
                <div style="">
                  <button class="normalBtn" @click="navTo('/backstage/goods/'+item.id)">编辑</button>
                  <button @click="deleteGoods(item.id, index)" class="deleteBtn">删除</button>
                </div>
              </li>
              <li>
              <div class="addGoods" @click="navTo('/backstage/goods/-1')">
                <div>+</div>
                点击增加商品
              </div>
              </li>
            </ul>
          </el-container>
        </el-tabs>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
import { getTypes, addType, getGoods, deleteGood, deleteTypeAndGoods } from '../../api/adminApi.js'
export default {
  name: 'Goods',
  components: {
  },
  data () {
    return {
      activeTypeId: '',
      goodTypes: [], // 所有分类
      typesValue: '', // 新增的type值
      typeIndex: 0, // 分类标签的总个数
      curTypeIndex: '',
      goodsList: []
    }
  },
  mounted () {
    // 执行查找分类,并把分类结果放到goodTypes中;
    this.getTypes()
  },
  methods: {
    navTo (route) {
      this.$router.push(route)
    },
    changType () {
      // 这里去查询新标签的商品
      const res = getGoods(this.goodTypes[this.activeTypeId].id);
      res.then((goods) => {
        this.goodsList = goods;
      }).catch((e) => {
        alert(e)
      })
    },
    getTypes () {
      const res = getTypes();
      res.then((data) => {
        this.goodTypes = data
        if (data.length > 1) {
          this.activeTypeId = String(0)
          this.typeIndex = data[data.length - 1].id
          this.changType();
        }
      }).catch((e) => {
        alert(e)
      })
    },
    addTab (targetName) {
      this.$prompt('请输入新增分类名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        // 需要添加数据库types数据
        const res = addType({ name: value })
        res.then(() => {
          this.$message.success('添加成功!')
          this.goodTypes.push({
            id: this.typeIndex + 1,
            name: value
          });
          this.lastTypeId++;
        }).catch((e) => {
          alert(e)
        })
      }).catch(() => {
        this.$message.info('取消添加!')
      })
    },
    removeTab (index) {
      // 需要给出提示,删除页面数据,删除数据库type和goods数据
      console.log(this.goodTypes[index].id)
      const typeId = this.goodTypes[index].id
      this.$confirm('此操作将永久删除该分类及相关商品信息,  是否继续?', '注意', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        const res = deleteTypeAndGoods(typeId)
        res.then(() => {
          this.$delete(this.goodTypes,index)
          this.getTypes()
          this.$message.success('删除分类成功')
        }).catch((e) => {
          this.$message.error('删除分类失败')
        })
      }).catch(() => {
        this.$message.info('已取消删除！')
      })
    },
    deleteGoods (goodId, index) {
      console.log(goodId)
      this.$confirm('此操作将永久删除该商品,  是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        const res = deleteGood(goodId)
        res.then(() => {
          this.$message.success('商品删除成功')
          this.$delete(this.goodsList, index)
        }).catch((e) => {
          this.$message.error('商品删除失败')
        })
      }).catch(() => {
        this.$message.info('已取消删除！')
      })
    }
  }
}
</script>

<style scoped lang="less">
  .el-main{
    position: relative;
    .addType{
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }
  .tabs{
    min-height: 540px;
    background: #fff;
    padding: 0 2px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgb(213,213,213,0.1),
                -1px -1px 3px rgb(213,213,213,0.1);
    }
  .el-tab-pane{
    margin: 0 2px;
    // background: skyblue;
  }
  .content{
    position: relative;
    // background-color: lightgray;
    ul{
      margin-top: 0px;
      padding: 0;
      li{
        float: left;
        display: inline-block;
        width: 140px;
        height: 230px;
        text-align: center;
        margin:0 10px;
        img{
          width: 100%;
          height: 140px;
          border: 1px solid #E7E4E4;
          display: block;
          transition: all 1s;
        }
        img:hover{
          transform: scale(1.06);
        }
        span{
          font-size: 13px;
          display: block;
          margin: 10px 0;
          color:grey;
        }
        .normalBtn{
          width: 50px;
          height: 25px;
          color: cadetblue;
          border: 1px solid #CFC9C9;
          background-color: white;
          border-radius: 5px;
          margin-right: 5px;
          outline: none;
          cursor: pointer;
        }
        .deleteBtn{
          width: 50px;
          height: 25px;
          color: red;
          border: 1px solid red;
          background-color: white;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
        }
        .addGoods{
          width: 100%;
          height: 140px;
          text-align: center;
          cursor: pointer;
          border: 1px solid #CFC9C9;
          color:gray;
          div{
            margin: 35px auto 10px;
            border-radius: 50%;
            border:2px solid #CFC9C9;
            width: 40px;
            height: 40px;
            font-size: 30px;
            text-align: center;
            line-height: 40px;
          }
        }
        .addGoods:hover{
          color:blue;
          border-color: blue;
          div{
            border-color: blue;
          }
        }
      }
    }
  }
</style>
