<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <!--商品名-->
        <h2 class="title">{{seller.name}}</h2>
        <!--评星 月售-->
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <!--配送相关-->
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <!--收藏-->
        <div class="favorite">
          <span class="icon icon-favorite" :class="{active:favorite}" @click="toggleFav"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <!--公告与活动-->
      <div class="split">
        <p class="line"></p>
        <div class="info border-1px">
          <h2 class="title">公告与活动</h2>
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <!--活动列表-->
        <ul class="list">
          <li class="item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="desc">{{seller.supports[index].description}}</span>
          </li>
        </ul>
        <p class="line"></p>
      </div>
      <!--商家实景-->
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="item in seller.pics">
                <img :src="item" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="split">
        <p class="line"></p>
      </div>
      <!--商家信息-->
      <div class="seller-infos">
        <h2 class="title border-1px">商家信息</h2>
        <ul class="list">
          <li class="item border-1px" v-for="info in seller.infos">
            <span class="desc">{{info}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import BScroll from 'better-scroll';
  import {setLocalStore, getLocalStore} from 'common/js/store';

  export default{
    props: {
      seller: { // 获取路由组件(app.vue)传递过来的数据
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return getLocalStore(this.seller.id, 'favorite', false);
        })()
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: { // 观测值得变化
      'seller'() {
        this.$nextTick(() => {
          this._initScroll(); // 初始化
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
          this._initScroll(); // 初始化
          this._initPics();
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      toggleFav(ev) { // 切换是否收藏
        if (!ev._constructed) { // 使用了BS
          return;
        };
        this.favorite = !this.favorite;
        // this.favoriteText(); // 不需要写 cpmputed的函数自动执行
        // 保存到本地 localStore
        setLocalStore(this.seller.id, 'favorite', this.favorite);
      },
      _initPics() { // 计算横向滚动图片盒子的宽度
        // 设置ul的宽度
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    computed: { // 切换对应文字的改变
      favoriteText() {
        return this.favorite ? '已收藏' : '未收藏';
      }
    },
    components: {
      star: star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .seller
    position:absolute
    top:174px
    left:0
    width:100%
    bottom:0
    overflow:hidden
    .overview
      padding:18px
      position:relative
      .title
        font-size:14px
        color:rgb(7,17,27)
        line-height:14px
      .desc
        padding-bottom:18px
        padding-top:8px
        font-size:0px
        border-1px(rgba(7,17,27,0.1))
        .star
          display:inline-block
          margin-right:8px
        .text
          display:inline-block
          margin-right:12px
          vertical-align:top
          font-size:10px
          color:rgb(77,85,93)
          line-height:18px
      .remark
        display:flex
        padding-top:18px
        .block
          display:inline-block
          flex:1
          border-right:1px solid rgba(7,17,27,0.1)
          text-align:center
          &:last-child
            border-right:0
          h2
            font-size:10px
            color:rgb(147,153,159)
            line-height:10px
            margin-bottom:4px
          .content
            font-size:10px
            line-height:24px
            color:rgb(7,17,27)
            .stress
              font-size:24px
              font-weight:200
              color:rgb(7,17,27)
              line-height:24px
      .favorite
        position:absolute
        right:18px
        top:10px
        text-align:center
        .icon
          padding:4px
          display:block
          margin-bottom:4px
          line-height:24px
          font-size:24px
          color:#d4d6d9
          &.active
            color:rgb(240,20,20)
        .text
          font-size:10px
          color:rgb(77,85,93)
          line-height:20px

    .split
      .line
        height:16px
        width:100%
        background-color:#f3f5f7
        border-top:1px solid rgba(7,17,27,0.1)
        border-bottom:1px solid rgba(7,17,27,0.1)
      .info
        padding:18px 0
        margin:0 18px
        border-1px(rgba(7,17,27,0.1))
        .title
          line-height:14px
          margin-bottom:6px
          font-size:14px
          color:rgb(7,17,27)
        .desc
          color:rgb(240,20,20)
          line-height:24px
          padding:8px 12px 16px
          font-size:12px
      .list
        font-size:0
        .item
          border-1px(rgba(7,17,27,0.1))
          padding:16px 8px
          margin:0 20px
          &:last-child
            border-none;
          .icon
            display:inline-block
            width:16px
            height:16px
            margin-right:6px
            background-size:16px
            background-repeat:no-repeat
            vertical-align:top
            &.decrease
              bg-img("decrease_4")
            &.discount
              bg-img("discount_4")
            &.invoice
              bg-img("invoice_4")
            &.special
              bg-img("special_4")
            &.guarantee
              bg-img("guarantee_4")
          .desc
            line-height:16px
            font-size:12px
            font-weight:200
            color:rgb(7,17,27)
    .pics
      padding:18px
      .title
        line-height:14px
        margin-bottom:12px
        font-size:14px
        color:rgb(7,17,27)
      .pic-wrapper
        width:100%
        overflow:hidden
        white-space:nowrap
        font-size:0
        .pic-item
          display:inline-block
          margin-right:6px
          width:120px
          height:90px
          &:last-child
            margin-right:0
    .seller-infos
      padding:18px 18px 0 18px
      color:rgb(7,17,27)
      .title
        font-size:12px
        padding-bottom:12px
        border-1px(rgba(7,17,27,0.1))
      .list
        .item
          padding:16px 12px
          line-height:16px
          font-size:12px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()

</style>
