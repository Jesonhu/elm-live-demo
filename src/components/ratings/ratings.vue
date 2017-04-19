<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h2 class="scoer">{{seller.score}}</h2>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <p class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </p>
          <p class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </p>
          <p class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}</span>
            <span class="time">分钟</span>
          </p>
        </div>
      </div>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <!--评论列表-->
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar"><img :src="rating.avatar" alt="" width="28" height="28"></div>
            <div class="content">
              <h2 class="name">{{rating.username}}</h2>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟到达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import BScroll from 'better-scroll';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from 'common/js/date';
  // import axios from 'axios';
  import data from '../../../data.json';

  const ALL = 2;
  // const ERR_OK = 0;

  export default{
    props: {
      seller: { // 获取路由组件(app.vue)传递过来的数据
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    created() {
      /* axios.get('/api/ratings')
        .then((res) => {
          if (res.status === 200) {
            res = res.data;
            if (res.errno === ERR_OK) {
              this.ratings = res.data;
              this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratings, {
                  click: true
                });
              });
            }
          };
        })
        .catch(function(err) {
          console.log(err); // 从数据库获取数据出现问题
        }); */
      this.ratings = data.ratings;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      needShow(type, text) { // 对ratingselect.vue组件的改变做处理
        if (this.onlyContent && !text) { // 只有内容没有文本时
          return false;
        };
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) { //
        this.selectType = type; // ratingselect.vue改变父组件的值
        this.$nextTick(() => {
          this.scroll.refresh(); // 解决去掉勾选后bs可拖动范围问题
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      star: star,
      split: split,
      ratingselect: ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position:absolute
    top:174px
    bottom:0px
    left:0
    width:100%
    overflow:hidden
    .overview
      display:flex
      padding:18px 0
      .overview-left
        flex:0 0 137px
        width:137px
        padding:6px 0
        border-right:1px solid rgba(7,17,27,0.1)
        text-align:center
        /*@media only screen add ( max-width: 320px )
        flex:0 0 120px
        width:120px*/
        .score
          font-size:24px
          color:rgb(255,153,0)
          line-height:28px
        .title
          font-size:12px
          color:rgb(7,17,27)
          line-height:12px
          font-weight:700
          margin-top:6px
          margin-bottom:8px
        .rank
          font-size:10px
          color:rgb(147,153,159)
          line-height:10px
      .overview-right
        flex:1
        padding:6px 19px 0
        /*@media only screen add ( max-width: 320px )
        padding-left:6px*/
        .score-wrapper
          margin-bottom:8px
          font-size:0
          .title
            font-size:12px
            color:rgb(7,17,27)
            vertical-align:top
            line-height:18px
          .star
            display:inline-block
            margin:0 12px
            vertical-align:top
          .score
            display:inline-block
            font-size:12px
            vertical-align:top
            color:rgb(255,153,0)
            line-height:18px
        .delivery-wrapper
          font-size:0
          .title
            font-size:12px
            color:rgb(7,17,27)
            line-height:18px
          .delivery
            font-size:12px
            color:rgb(147,153,159)
            margin-left:12px
          .time
            display:inline-block
            font-size:12px
            color:rgb(147,153,159)
    .rating-wrapper
      .rating-item
        border-bottom:1px solid rgba(7,17,27,0.1)
        display:flex
        font-size:0
        margin:0 16px
        padding:16px 0
        .avatar
          flex:0 0 28px
          width:28px
          height:28px
          margin-right:12px
          img
            border-radius:50%
        .content
          flex:1
          position:relative
          .name
            line-height:12px
            font-size:10px
            color:rgb(7,17,27)
            margin-bottom:4px
          .star-wrapper
            font-size:0
            margin-bottom:6px
            .star
              display:inline-block
              margin-right:6px
              viertical-align:top
            .delivery
              display:inline-block
              viertical-align:top
              line-height:12px
              font-size:10px
              color:rgb(147,153,159)
          .text
            font-size:12px
            color:rgb(147,153,159)
            font-weight:200
            margin-bottom:8px
          .recommend
            font-size:0px
            line-height:16px
            .icon-thumb_up
              display:inline-block
              margin:0 8px 4px 0
              font-size:9px
              color:rgb(0,160,220)
            .item
              display:inline-block
              font-size:9px
              padding:0 6px
              border:1px solid rgba(7,17,27,0.1)
              border-radius:1px
              background-color:#fff
              margin-right:8px
          .time
            position:absolute
            top:0
            right:0
            font-size:10px
            font-weight:200
            color:rgb(147,153,159)
            line-height:12px





</style>
