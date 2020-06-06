<template>
  <el-container class="BackToTopTarget">
    <el-header>
      <div>
        <span class="title" @click="navTo('/mall')">常理工打印选购平台</span>
        <div class="right">
          <div class="search-box">
            <input class="search-txt" type="text" name="" placeholder="Type to search">
            <a class="search-btn" href="">
                <i class="fas fa-search"></i>
            </a>
          </div>
        </div>
        <div class="right" v-if="clientToken">
          <span class="name">欢迎您，{{clientName}}</span>
          <span @click="navTo('/mall/personal')">个人中心</span>
          <span @click="logout">退出登录</span>
          <!-- <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            点我打开
            </el-button> -->
        </div>
        <div class="right" v-else>
          <span @click="navTo('/login')">登录</span>
          <span @click="navTo('/login')">注册</span>
        </div>
      </div>
      </div>
    </el-header>
    <el-main>
      <!-- 右侧浮动快捷键 -->
      <div style="position: fixed;">
        <!-- 返回页首 -->
        <el-backtop target=".BackToTopTarget"></el-backtop>
      </div>
      <!-- 右侧购物车 -->
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
      <!-- router-view下级渲染位置 -->
      <router-view></router-view>
      <!-- 右侧悬浮按钮 -->
    </el-main>
    <el-footer>
      <div class="footerInfo">
        <div class="service footerItem">
          <p class="title">客户服务</p>
          <span><i class="iconfont" />在线客服</span>
          <span><i class="iconfont" />用户反馈</span>
        </div>
        <div class="intro footerItem">
          <p class="title">何为常理工打印平台</p>
          <p class="intro-p">常理工打印平台遵循以往线下服务的宗旨和服务要求，严格把控打印服务的质量和服务提供水平，致力于打造常理工第一学生打印服务</p>
          <div>
            关注我们：
            <img src="http://yanxuan.nosdn.127.net/60068701f3a380911f237c26c91b39d0.png" alt="" />
            <img src="http://yanxuan.nosdn.127.net/031e783d7ee645b6096980d0bf83079b.png" alt="" />
            <img src="http://yanxuan.nosdn.127.net/0c8759a89cdbd7acf7f2921e6f0fad19.png" alt="" />
          </div>
        </div>
        <div class="code footerItem">
          <p class="title">扫码下载APP</p>
          <span>下载领1000元新人礼包</span>
        </div>
      </div>
      <div class="footerContainer">
        <ul class="footerTop">
          <li>
            <img src="//yanxuan.nosdn.127.net/e6021a6fcd3ba0af3a10243b7a2fda0d.png" alt="" />
            <span>30天无忧退换货</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e09c44e4369232c7dd2f6495450439f1.png" alt="" />
            <span>满88元免邮费</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e72ed4de906bd7ff4fec8fa90f2c63f1.png" alt="" />
            <span>XX品质保证</span>
          </li>
        </ul>
        <div class="footerBottom">
          <ul>
            <li>关于我们</li>
            <li>帮助中心</li>
            <li>售后服务</li>
            <li>配送与验收</li>
            <li>商务合作</li>
            <li>企业采购</li>
            <li>开放平台</li>
            <li>搜索推荐</li>
            <li>友情链接</li>
          </ul>
          <p>XX公司版权所有 © 2020-2025 电商经营许可证：XXXXXXXXXXXXXXXXX</p>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    name: 'Mall',
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      ...mapState([
        'clientToken',
        'clientName'
      ]),
    },
    methods: {
      ...mapMutations({
        clientLogout: 'CLIENT_LOGOUT',
      }),
      navTo(route) {
        this.$router.push(route);
      },
      logout() {
        this.clientLogout();
        this.navTo('/')
      },
      backToTop() {
        backToTop();
      },
    }
  }
</script>

<style scoped lang="less">
  .el-header {
    height: 50px !important; //height 存在于层叠样式表element.style中；[增加权重]
    background-color: #333333;
    color: white;
    line-height: 50px;
    padding: 0 10% 0 10%;

    // position: sticky;
    // top: 0;
    .title {
      display: inline-block;
      cursor: pointer;
    }

    .right {
      // 将内部子元素--转变为-（不独占[一行]的块级元素）
      display: inline-block;
      position: relative;
      float: right;

      span {
        margin-left: 20px;
        cursor: pointer;
      }

      .search-box {
        position: absolute;
        background: #2f3640;
        height: 30px;
        border-radius: 30px;
        padding: 3px;
        margin-top: 6px;
        right: 300px;
      }

      .search-box:hover>.search-txt {
        width: 250px;
        padding: 0 40px 0 10px;
      }

      @media only screen and (max-width: 600px) {
        .search-box:hover>.search-txt {
          width: 187px;
          padding: 0 40px 0 10px;
        }
      }

      .search-box:hover>.search-btn {
        background: white;
      }

      .search-btn {
        color: #e84118;
        float: right;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #2f3640;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.4s;
      }

      .search-txt {
        border: none;
        background: none;
        outline: none;
        float: left;
        padding: 0;
        color: white;
        font-size: 14px;
        transition: 0.4s;
        line-height: 30px;
        width: 0px;
      }
    }
  }

  .el-main {
    overflow: hidden;
    // background-color: #E9EEF3;
    padding: 0;
  }

  .el-footer {
    padding: 0;

    .footerInfo {
      margin-top: 30px;
      height: 300px;
      overflow: hidden;

      .footerItem {
        width: 33%;
        height: 240px;
        position: relative;
        top: 30px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        color: black;

        .title {
          color: black;
          margin-bottom: 30px;
        }

        div {}
      }
    }

    .footerContainer {
      background: #414141;
      color: white;
      overflow: hidden;

      .footerTop {
        padding: 36px 0;
        border-bottom: 1px solid #4f4f4f;
        width: 100%;

        li {
          display: inline-block;
          width: 33%;
          text-align: center;

          img {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
            font-size: 18px;
            margin-left: 10px;
          }
        }
      }

      .footerBottom {
        color: #DDDDDD;
        margin-top: 30px;
        font-size: 13px;
        text-align: center;

        ul {
          li {
            display: inline-block;
            cursor: pointer;
            padding: 0 6px;
            border-right: 2px solid #D5D5D5;

            &:last-child {
              border-right: none;
            }
          }
        }

        p {
          margin-top: 5px;
        }
      }
    }

    .service {
      border-right: 1px solid #D5D5D5;

      span {
        display: inline-block;
        width: 80px;
        height: 100px;
        border: 1px solid #D5D5D5;
        text-align: center;
        margin: 0 10px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: #EEBE00;
        }

        i {
          display: block;
          font-size: 30px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    }

    .intro {
      border-right: 1px solid #D5D5D5;

      .intro-p {
        font-size: 13px;
        width: 300px;
        margin: 0 auto;
        text-align: left;
        color: black;
        line-height: 1.8em;
      }

      div {
        text-align: left;
        font-size: 14px;
        margin-left: 110px;
        margin-top: 20px;

        img {
          margin: 0 6px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }

    .code {
      img {
        display: block;
        margin: 0 auto;
      }

      span {
        font-size: 12px;
        color: #FFE788;
        margin-top: 10px;
        display: block;
      }
    }
  }

  body>.el-container {}
</style>
