<template>
  <el-container>
    <el-main>
      <el-breadcrumb separator="/" style="font-size: 18px;margin-bottom: 8px;">
        <el-breadcrumb-item :to="{ path:'/backstage/editUser' }">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input size="medium" v-model="search" placeholder="请输入用户名" class="searchInput" clearable/>
      <!-- 行标签过多或数据过多时；1.固定+流体  2.分页 -->
      <!-- 其实是绑定的计算属性《-通过过滤器实现 -->
      <!-- <el-table fit :data="userList.filter(data => !search || data.nickname.toLowerCase().includes(search.toLowerCase()))" stripe> -->
      <el-table fit :data="curPageUsers" stripe>
        <el-table-column prop="id" label="用户ID" width="80"></el-table-column>
        <el-table-column prop="email" label="Email" width="180"></el-table-column>
        <el-table-column prop="nickname" label="用户名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="address" label="收货地址" width=""></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="150"></el-table-column>
        <el-table-column prop="date" label="日期" width="156"></el-table-column>
        <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
        <el-table-column align="right">
          <template slot="header" slot-scope>
           <!-- <el-input v-model="search" placeholder="请输入用户名" clearable/> -->
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" disabled>编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
   <el-footer style="padding: 0 auto;">
     <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[7, 9, 11, 14]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { getAllUser, deleteUser } from '../../api/adminApi.js'
import '../../util/util.js'
export default {
  name: 'EditUser',
  data () {
    return {
      search: '',
      // 用户列表信息
      queryInfo: {
        pagenum: 1, // 当前的页数
        pagesize: 7 // 当前每页显示多少条
      },
      userList: []
    }
  },
  computed: {
    total: function () {
      let queryList = this.userList.filter(data => !this.search || data.nickname.toLowerCase().includes(this.search.toLowerCase()));
      return queryList.length;
    },
    curPageUsers: function () {
      let pagenum;
      let queryList = this.userList.filter(data => !this.search || data.nickname.toLowerCase().includes(this.search.toLowerCase()));
      if (!this.search) {
        pagenum = this.queryInfo.pagenum;
      } else {
        pagenum = 1;
      }
      var begin = (pagenum - 1) * this.queryInfo.pagesize;
      var end = pagenum * this.queryInfo.pagesize;
      for(var i=0;i<queryList.length;i++){
        queryList[i].date = this.formatDate(queryList[1].date)
        // console.log(queryList[i].date)
      }
      return queryList.slice(begin, end);
      // return this.userList.filter(data => !this.search || data.nickname.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  // 这里绝对不能用  :  来代替
  mounted () {
    const res = getAllUser();
    res.then((users) => {
      this.userList = users;// 获得所有的用户列表
    }).catch((e) => {
      alert(e)
    })
  },
  methods: {
    formatDate(val) {
        return new Date(val).format("yyyy-MM-dd HH:mm:ss");
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      // index表示当前位于数组中,row是当前行的观察者对象，主要包含行中的数据
      // alert(row.id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        // alert(row.id)
        const res = deleteUser(row.id);
        res.then(() => {
          this.$message.success('删除成功')
          this.$delete(this.userList, index)
        }).catch((e) => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message.info('已取消删除！')
      })
    },

    // 监听pageSize改变
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize;
      // 通过queryinfo重新请求数据
    },
    // 监听页码值改变
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage;
    }
  }
}
</script>

<style scoped lang="less">
  .el-main{
    position: relative;
    // background: skyblue;
    .searchInput{
      position: absolute;
      top:8px;
      outline: none;
      right: 20px;
      width: 24%;
    }
    .el-table{
      min-height: 540px;
      width: 100%;
      border-radius: 10px;
      box-shadow: 1px 1px 2px rgb(213,213,213,0.1),
                  -1px -1px 2px rgb(213,213,213,0.1);
    }
  }
</style>
