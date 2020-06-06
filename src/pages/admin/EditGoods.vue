<template>
  <el-container>
    <el-main>
      <el-breadcrumb separator="/" style="font-size: 18px;margin-bottom: 8px;">
        <el-breadcrumb-item :to="{ path:'/backstage/goods' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <el-container class="content">
        <el-form ref="goodform" :model="goodForm" label-width="90px" size="medium">
          <el-form-item label="商品名称 : ">
            <el-input v-model="goodForm.name" placeholder="请输入商品"></el-input>
          </el-form-item>
          <el-form-item label="商品分类 : ">
            <el-radio-group v-model="goodForm.typeId">
              <template v-for="(item, index) in types">
                 <el-radio border :label="item.id" :key="index">{{ item.name }}</el-radio>
              </template>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片链接 : ">
            <el-input v-model="goodForm.img" placeholder="请输入图片链接"></el-input>
            <!-- <el-upload
              drag
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
          </el-form-item>
          <el-form-item label="商品规格 : " prop="pu">
            <el-col :span="4">
              <el-input type="text" v-model="goodForm.pages" placeholder="单件页数" style="width: 100%"></el-input>
            </el-col>
            <el-col style="text-align: center;" :span="2">-</el-col>
            <el-col :span="4">
              <el-input type="text" v-model="goodForm.unitPrice" placeholder="单页价格" style="width: 100%"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="详情描述 : ">
            <el-input type="textarea" placeholder="商品详情描述\介绍" maxlength="300" show-word-limit v-model="goodForm.description"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit('goodform')">保存修改</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { getTypes, getGoodInfo, addGood } from '../../api/adminApi.js'
export default {
  name: 'editGoods',
  data () {
    return {
      id: this.$route.params.id,
      types: [],
      goodForm: {
        id: 0,
        typeId: '',
        name: '',
        img: '',
        description: '',
        pages: '',
        unitPrice: ''
      }
    }
  },
  methods: {
    getTypes () {
      const res = getTypes();
      res.then((data) => {
        this.types = data;
      }).catch((e) => {
        alert(e)
      })
    },
    onSubmit () {
      this.$confirm('此操作将永久修改该商品信息, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'success'
      }).then(() => {
        addGood(this.goodForm)
        this.$message.success('已保存修改!')
      }).catch(() => {
        this.$message.info('已取消删除！')
      })
    }
  },
  mounted () {
    this.getTypes();
    if (this.id === '-1') {
      // alert(this.id)
    } else {
      const res = getGoodInfo(this.id);
      res.then((data) => {
        // 这里和:label相互冲突
        this.goodForm.id = data.id;
        this.goodForm.typeId = data.typeId;
        this.goodForm.name = data.name;
        this.goodForm.img = data.img;
        this.goodForm.description = data.description;
        this.goodForm.pages = data.pages;
        this.goodForm.unitPrice = data.unitPrice;
      }).catch((e) => {
        alert(e + '这里出错')
      })
    }
  }
}
</script>

<style scoped lang="less">
  .content{
    width: 100%;
    background-color: white;
    padding: 60px 60px;
    border-radius: 10px;
    font-weight: bold;
    min-height: 520px;
    .el-form-item:last-child{
      text-align: center;
      .el-button{
        margin: 0 20px;
      }
    }
    .el-input:nth-child(even){
      width: 900px;
    }
    .el-radio{
      margin: 3px 3px;
      padding: 10px;
    }
  }
</style>
