<template>
  <el-container>
    <el-main>
      <el-breadcrumb separator="/" style="font-size: 18px;margin-bottom: 8px;">
        <el-breadcrumb-item :to="{ path:'/backstage/orders' }">订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 这里先实现功能，之后抽象成个人的组件 -->
      <el-tabs type="border-card" v-model="activeState" @tab-click="changeState">
        <template v-for="state in stateList">
          <el-tab-pane :label="state" :key="state.id">
          </el-tab-pane>
        </template>
        <!-- 商品信息展示 -->
        <el-container>
          <el-table fit :data="orderList" stripe  max-height="490">
            </el-table-column>
            <el-table-column prop="id" label="订单号" width="80"></el-table-column>
            <el-table-column prop="nickname" label="用户名" width="100"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="120"></el-table-column>
            <el-table-column prop="phone" label="联系电话" width="130"></el-table-column>
            <el-table-column prop="name" label="商品" width="120"></el-table-column>
            <el-table-column prop="copies" label="数量" width="70"></el-table-column>
            <el-table-column prop="amount" label="总金额" width="90"></el-table-column>
            <el-table-column prop="state" label="订单状态" width="80">
              <template v-slot="scope">
                <span>{{ stateChina(scope.row.state) }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="note" label="备注" width=""></el-table-column> -->
            <el-table-column prop="date" label="日期" width="160"></el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-container>
      </el-tabs>
      <!-- 编辑模态框 -->
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="40%">
        <el-container>
          <el-form  style="margin: 0 auto;" ref="form" :model="sizeForm" label-width="80px" size="medium">
            <el-form-item label="订单号:">
              <span>{{ sizeForm.id }}</span>
            </el-form-item>
            <el-form-item label="商品名:">
              <span>{{ sizeForm.name }}</span>
            </el-form-item>
            <el-form-item label="总金额:">
              <span>{{ sizeForm.amount + ' ￥' }}</span>
            </el-form-item>
            <el-form-item label="数量:">
              <span>{{ sizeForm.copies + ' 份' }}</span>
              <!-- <el-input-number v-model="num" @change="handleChange" :min="1" :max="60" label="描述文字"></el-input-number> -->
            </el-form-item>
            <el-form-item label="订单状态:">
              <el-select v-model="sizeForm.state" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-container>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {
    getOrders, deleteOrder, editOrder
  } from '../../api/adminApi.js'
  import '../../util/util.js'
  export default {
    name: 'Order',
    components: {},
    data() {
      return {
        activeState: 0, // [0,1,2,3,4]
        stateList: ['全部', '未付款', '未发货', '已发货', '已到货'],
        sizeForm: {},
        orderList: [{
          id: 0,
          nickname: '暂无',
          address: '暂无',
          phone: '暂无',
          name: '暂无',
          copies: 0,
          amount: 0,
          state: 1,
          note: '暂无',
          date:''
        }],
        dialogVisible: false,
        options: [{
          value: 1,
          label: '未付款'
        }, {
          value: 2,
          label: '未发货'
        }, {
          value: 3,
          label: '已发货'
        }, {
          value: 4,
          label: '已到货'
        }],
        value: ''
      }
    },
    computed: {
    },
    methods: {
      navTo (route) {
        this.$router.push(route)
      },
      stateChina (id) {
        let result = ''
        switch(id){
          case 1: result = '未付款'; break;
          case 2: result = '未发货'; break;
          case 3: result = '已发货'; break;
          case 4: result = '已到货'; break;
        }
        return result
      },
      formatDate(val) {
          return new Date(val).format("yyyy-MM-dd HH:mm:ss");
      },
      changeState() {
        // 用当前选中的状态去请求新的Orders列表
        // alert(this.activeState)
        const res = getOrders(this.activeState)
        res.then((orders) => {
          for(var i=0;i<orders.length;i++){
            orders[i].date = this.formatDate(orders[i].date)
          }
          this.orderList = orders
        }).catch((e) => {
          alert(e)
        })
      },
      handleDelete (index, row) {
        console.log(index, row)
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          // alert(row.id)
          const res = deleteOrder(row.id);
          res.then(() => {
            this.$notify({
              title: '订单删除成功',
              type: 'success'
            });
            this.$delete(this.orderList, index)
          }).catch((e) => {
            this.$notify({
              title: '订单删除失败',
              type: 'waring'
            });
          })
        }).catch(() => {
          this.$notify.info({
            title: '已取消删除'
          });
        })
      },
      handleEdit (index, row) {
        this.dialogVisible = true
        this.sizeForm = row
        this.sizeForm.state = row.state
        // this.value = row.state + ''
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onSubmit () {
        this.dialogVisible = false
        this.sizeForm.date = new Date()
        const res = editOrder(this.sizeForm)
        res.then(() => {
          this.$notify({
            title: '订单修改成功',
            type: 'success'
          });
          this.changeState()
        }).catch((e) => {
          this.$notify({
            title: '订单修改失败',
            type: 'waring'
          });
        })
      }
    },
    mounted() {
      this.changeState()
    }
  }
</script>

<style scoped lang="less">
  .demo-table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .el-table td,
  .el-table th {
    padding: 0px !important;
  }

  .el-tabs {
    border-radius: 10px;
    box-shadow: 1px 1px 2px rgb(213, 213, 213, 0.1),
      -1px -1px 2px rgb(213, 213, 213, 0.1);
  }

  .el-tab-pane {
    // border-radius: 10px;
    // box-shadow: 1px 1px 3px rgb(213,213,213,0.1),
    //             -1px -1px 3px rgb(213,213,213,0.1);
  }

  .el-tabs__nav-scroll {
    border-radius: 10px 10px 0 0;
  }
</style>
