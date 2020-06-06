<template>
  <header class="SectionHeader">
    <div class="left">
      <h3>{{title}}</h3>
      <span>{{tips}}</span>
    </div>
    <span class="right">{{moreText}}</span>
  </header>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    moreText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped lang="less">
  .SectionHeader {
    width: 100%;
    height: 66px;
    line-height: 66px;
    .left {
      display: inline-block;
      line-height: 60px;
      height: 60px;

      h3 {
        margin: 0;
        display: inline-block;
        font-size: 28px;
        cursor: pointer;
        &:hover {
          color: #e3e371;
        }
      }
      span {
        display: inline-block;
        margin-left: 25px;
        font-size: 14px;
        color: #333;
      }
    }

    .right {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      float: right;
      &:hover {
        color: #e3e371;
      }
    }
  }
</style>
