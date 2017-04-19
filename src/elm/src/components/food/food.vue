  <template>
    <transition name="move">
      <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="showFlag=false">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="odd" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontroll-wrapper">
            <cart-controll :food="food" @add="addFood"></cart-controll>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst" transition="fade">
            加入购物车
          </div>
          </transition>
        </div>
        <!--商品介绍-->
        <split :food="food"></split>
        <!--商品评价-->
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">没有相关评论</div>
          </div>
        </div>
      </div>
      </div>
    </transition>
  </template>

  <script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {formatDate} from 'common/js/date';
    import cartcontroll from 'components/cartcontroll/cartcontroll';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    import Vue from 'vue';

    const ALL = 2;

    export default {
      props: {
        food: { // 获取goods.vue传递过来 :food="selectedFood"
          type: Object
        }
      },
      data() {
        return {
          showFlag: false,
          selectType: ALL, // ratingselect.vue默认被选中的评价类型（全部 推荐 吐槽）
          onlyContent: true, // 只看到有评论的内容默认是否勾选
          desc: { // 默认向评价类型传递全部 推荐 吐槽
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
      },
      methods: {
        show() { // 内部组件自己的方法 _xxx
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = true;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {
                click: true
              });
            } else {
              this.scroll.refresh();
            };
          });
        },
        addFirst(event) { // 点击加入购物车购物车消失 并将当前商品被选中数量加1
          if (!event._constructed) {
            return;
          };
          this.$emit('add', event.target); // 添加小球动画(将当前点击的位置传递给goods.vue)
          Vue.set(this.food, 'count', 1); // 这个商品被选中数量变为1(避免food没有count这个属性)
        },
        needShow(type, text) { // 评论列表显示什么内容 type显示的类型(全部，推荐，吐槽) text
          if (this.onlyContent && !text) { // 只有内容没有文本时
            return false;
          };
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        },
        addFood(target) {
          this.$emit('add', target);
        },
        // 使用ratingselect组件时传递@select="selectRating" @toggle="toggleContent"
        // ratingsselect.vue自身改变后 $emit这些事件使得子组件ratingselect.vue与父组件food.vue可以互相通信
        // ratingselect.vue中this.$emit('select', type); this.$emit('toggle');
        selectRating(type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        toggleContent() {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      },
      filters: {
        formatDate(time) { // 格式化时间
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      components: { // 注册组件
        cartControll: cartcontroll,
        split: split,
        ratingselect: ratingselect
      }
    };
  </script>

  <style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .food
      position:fixed
      left:0
      top:0
      bottom:48px
      z-index:30
      width:100%
      background-color:#fff
      transform: translate3d(0,0,0) /*food.vue从右平移到左*/
      &.move-enter-active, &.move-leave-active
        transition:all 0.2s linear
      &.move-enter,&.move-leave-active
        transform:translate3d(100%,0,0)
      .img-header
        position:relative;
        width:100%
        height:0
        padding-top:100%
        img
          position:absolute
          left:0
          top:0
          width:100%
          height:100%
        .back
          position:absolute
          top:10px
          left:0
          .icon-arrow_lift
            display:block
            padding:10px
            font-size:20px
            color:#fff
      .content
        padding:18px
        position:relative
        .title
          line-height:14px
          margin-bottom:8px
          font-size:14px
          font-weight:700
          color:rgb(7,17,27)
        .detail
          margin-bottom:10px
          line-height:10px
          font-size:0px
          height:10px
          .sell-count,.rating
            color:rgb(147,153,159)
            font-size:10px
          .sell-count
            margin-right:12px
        .price
          .now,add
            line-height:24px
            font-weight:700
          .now
            font-size:14px
            color:rgb(240,20,20)
            margin-right:8px
          .odd
            font-size:10px
            color:rgb(147,153,159)
            text-decoration:line-through
        .cartcontroll-wrapper
          position:absolute
          right:12px
          bottom:12px
        .buy
          position:absolute
          right:18px
          bottom:18px
          z-index:10
          height:24px
          line-height:24px
          text-align:center
          padding:0 12px
          box-sizing:border-box
          font-size:10px
          border-radius:12px
          color:#fff
          background-color:rgb(0,160,220)
          opacity:1   /*加入购车车延时消失*/
          &.fade-enter-active, &fade.leave-active
            transition:all 0.2s
          &.fade-enter,&.fade-leave-active
            opacity:0
            z-index:-1
      .rating
        padding-top:18px
        .title
          line-height:14px
          margin-left:18px
          font-size:14px
          color:rgb(7,17,27)
        .rating-wrapper
          padding: 0 18px
          .rating-item
            position:relative
            padding:16px 0
            border-1px(rgba(7,17,27,0.1))
            .user
              position:absolute
              right:0
              top:16px
              line-height:12px
              font-size:0
              .name
                display:inline-block
                vertical-align:top
                font-size:10px
                color:rgb(147,153,159)
                margin-right:6px
              .avatar
                border-radius:50%
            .time
              margin-bottom:6px
              line-height:12px
              font-size:10px
              color:rgb(147,153,159)
            .text
              line-height:16px
              font-size:12px
              color:rgb(7,17,27)
              .icon-thumb_up,.icon-thumb_down
                line-height:16px
                margin-right:4px
                font-size:12px
              .icon-thumb_up
                color:rgb(0,160,220)
              .icon-thumb_down
                color:rgb(147,153,159)
        .no-rating {
          padding:16px
          font-size:12px
          color:rgb(17,153,159)
        }

  </style>
