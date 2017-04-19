<template>
  <div>
    <v-header :seller="seller"></v-header>
    <!--路由切换区域-->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" :seller="seller">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" :seller="seller">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" :seller="seller">商家</router-link>
      </div>
    </div>
    <!--路由内容区域-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<!--
  'router-link'
      Vuejs2+版本写法 会被解析成<a></a>
      to="/xxx"指向的路由地址(src/main.js配置的路由一致)
  'keep-alive' 组件间切换时保存组件的信息到内存中，切换回来时仍然是之前的状态
  'router-view' 路由渲染视图
  :seller="seller" 父组件向子组件传递自定义名称的数据
-->
<script>
  import header from 'components/header/header.vue'; // 引入header组件
  import {urlParse} from 'common/js/urlParse';
                              // 引入urlParse.js文件 window.loacation.search操作
  // import axios from 'axios';
  import data from '../data.json';

  // const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse(); // 获取地址中的查询字符串
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      // let url = '/api/seller?id=' + this.seller.id;
      /* axios.get('../data.json')
        .then((res) => {
        if (res.status === 200) {
          res = res.data.seller;
          if (res.errno === ERR_OK) {
            this.seller = Object.assign({}, this.seller, res.data);
          }
        };
      })
      .catch(function(err) {
          console.log(err); // 从数据库获取数据出现问题
      }); */
      this.seller = Object.assign({}, this.seller, data.seller);
    },
    components: { // 注册header组件
      'v-header': header
    }
  };
</script>

<style lang="stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.active {
       color: rgb(0,160,220)
      }
</style>
