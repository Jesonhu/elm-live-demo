<template>
  <!--练习-->
  <div>
    <div class="shop-cart">
      <div class="content" @click="toggleList">
        <div class="con-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{minPrice}}元</div>
        </div>
        <div class="con-right" :class="{enough:isEnoughPay}" @click.stop.prevent="pay">
          <div class="pay">{{payDesc}}</div>
        </div>
      </div>

      <!--小球动画-->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <transition name="fold">
        <div class="shopcart-list" v-show="listShow" transition="fold">
        <div class="list-header">
          <h2 class="title">购物车</h2>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-conent" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontroll-wrapper">
                <cart-controll @add="addFood" :food="food"></cart-controll>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <!--模糊背景-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontroll from 'components/cartcontroll/cartcontroll';
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        isEnoughPay: false,
        balls: [ // 小球相关
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [], // 小球相关
        fold: false // 购物车商品详情页展开还是折叠
      };
    },
    props: { // 接收其他组件传递过来的数据
      selectFoods: {
        type: Array,
        default: []
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: { // 计算
      totalPrice() { // 选中商品总价格
        let total = 0;
        this.selectFoods.forEach((food) => { // food表示selectFoods数组的每项
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() { // 选中的商品总数量
        let count = 0;
        this.selectFoods.forEach((food) => { // food表示selectFoods数组的每项
          count += food.count;
        });
        return count;
      },
      payDesc() { // 判断是否满足配送条件
        if (this.totalPrice === 0) {
          this.isEnoughPay = false;
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          this.isEnoughPay = false;
          return `还差￥${diff}元起送`;
        } else {
          this.isEnoughPay = true;
          return '去结算';
        }
      },
      listShow: function () {
        if (!this.totalCount) { // 折叠
          this.fold = true;
          return false;
        };
        let show = !this.fold; // 展开
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) { // list-show不断变化，不能变化的时候就初始化
              this.scroll = new BScroll(this.$refs.listContent, { // $refs.listContent 要和ref值一样，区分大小写
                click: true
              });
            } else {
             this.scroll.refresh();
            };
          });
        };
        return show;
      }
    },
    methods: {
      // 小球相关 开始
      // 缓动动画 两层实现 .inner水平方向 外层整体垂直方向
      // 用一个小球，发现动画是有，但是连续点击的流畅度没了，点击即使很快，也会第一个小球动动画执行完再执行第二个小球
      drop(el) { // 取的父goods.vue组件传来的数据el
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { // 当隐藏的时候
            ball.show = true; // 改变ball数组对象里面show的值
            ball.el = el; // 将cartcontroll点击的dom元素添加到ball自定义属性el上
            this.dropBalls.push(ball);// 将ball.show=true小球添加到dropBalls里
            return;
          };
        };
      },
      addFood(target) { // 购物车列表点击+也添加效果
        this.drop(target);
      },
      beforeDrop(el) { // 将ball.show=true的对象放到点击位置处 el是balls里的每个对象
        let count = this.balls.length;
        while (count--) { // 小球的长度
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
                  // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            // 外层 垂直方向
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            // 内层 水平方向
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          // 外层整个部分
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          // 内层
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          // transitionend 过渡完成后 css3 transition 事件
          el.addEventListener('transitionend', done); // 告诉vue动画完成了
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
                // New Array.shift() 数组的第一个元素从其中删除，并返回第一个元素的值。
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 小球相关结束
      toggleList() {
        if (!this.totalCount) {
          return;
        };
        this.fold = !this.fold;
      },
      empty() { // 清空购物车
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() { // 购物车商品列表隐藏
        this.fold = true;
      },
      pay() { // 满足支付条件点击后操作
        if (this.totalPrice < this.minPrice) {
          return;
        };
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    components: {
      cartControll: cartcontroll
    }
  };
</script>

<!--<style lang="stylus" rel="stylesheet/stylus">

</style>-->
<style lang="less" rel="stylesheet/less">

  .shop-cart{
    position: fixed;
    height:48px;
    width:100%;
    left:0;
    bottom:0;
    z-index: 50;

    .content{
      display:flex;
      background-color: rgb(20,29,39);
      font-size: 0;
      .con-left{
        flex: 1;
        font-size:0px;
        .logo-wrapper,
        .price,
        .desc{
          display: inline-block;
        }
        .logo-wrapper{
          position: relative;
          top:-10px;
          margin:0 12px;
          padding: 6px;
          width:56px;
          height:56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius:50%;
          background-color:#141d27;
          .logo{
            width:100%;
            height: 100%;
            border-radius:50%;
            background-color: rgb(43,52,60);
            font-size: 24px;
            line-height: 45px;
            text-align: center;
            &.highlight{
              background:rgb(0,160,220)
            }
            .icon-shopping_cart{
              color:rgba(255,255,255,0.4);
              font-size: 24px;
              &.highlight{
                color:#fff;
              }
            }
          }
          .num{
            position: absolute;
            top:0;
            right:0;
            width:24px;
            height:16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color:#fff;
            background-color: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          height:24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.1);
          font-size: 16px;
          font-weight: 700;
          color:rgb(127,133,138);
          &.highlight{
           color:#fff;
          }
        }
        .desc{
          display: inline-block;
          font-size: 10px;
          line-height: 24px;
          height:24px;
          color:rgb(127,133,138);
          margin-top:12px;
          text-indent: 12px;
        }
      }
      .con-right{
        flex: 0 0 105px;
        width: 105px;
        line-height: 48px;
        height:48px;
        padding:0 8px;
        box-sizing: border-box;
        color:rgb(127,133,138);
        background-color: rgb(43,52,60);
        text-align: center;
        &.enough{
          background-color:#34B413;
          .pay{
            color:#fff;
            font-size: 16px;
          }
        }
        .pay{
          font-size: 12px;
          font-weight: 700;
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left:32px;
        bottom:22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
        .inner{
          width:16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0,160,220);
          transition:all 0.4s linear;
        }
      }
    }
    .shopcart-list{
      position: absolute;
      left:0;
      top:0;
      z-index: -1;
      width:100%;
      transform: translate3d(0,-100%,0);
      &.fold-enter-active, &.fold-leave-active{
        transition:all 0.5s;
      }
      &.fold-enter,&.fold-leave-active{
        transform: translate3d(0,0,0);
      }
      .list-header{
        height:40px;
        line-height: 40px;
        padding:0 18px;
        background-color: #f3f5f7;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .title{
          float:left;
          font-size: 14px;
          color:rgb(7,17,27);
        }
        .empty{
          float: right;
          font-size:12px;
          color:rgb(0,160,220);
        }
      }
      .list-conent{
        padding:0 18px;
        max-height:217px;
        background-color: #fff;
        overflow:hidden;
        .food{
          position: relative;
          padding:12px 0;
          border-bottom:1px solid rgba(7,17,27,0.1);
          .name{
            line-height: 24px;
            font-size: 14px;
            color:rgb(7,17,27);
          }
          .price{
            position: absolute;
            right:94px;
            bottom:12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color:rgb(240,20,20);
          }
          .cartcontroll-wrapper{
            position: absolute;
            right:0;
            bottom:6px;
          }
        }
      }
    }
  }
  .list-mask{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:40;
    backdrop-filter:blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active{
       transition:0.5s all;
     }
    &.fade-enter,&.fade-leave-active{
      opacity:0;
      background:rgba(7,17,27,0);
    }
  }
</style>
