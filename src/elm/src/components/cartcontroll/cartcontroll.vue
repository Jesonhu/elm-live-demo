<template>
  <div class="cartcontroll">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0"
      @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: { // 接收其他组件传递过来的数据
      food: {
        type: Object
      }
    },
    created() { // 该组件被引入时就会执行

    },
    methods: { // 指令方法
      addCart: function(ev) { // 增加商品到购物车里
        if (!ev._constructed) { // 去掉触发pc的事件--保证pc移动事件相同
          return false;
        };
        if (!this.food.count) {
          // this.food.count = 1; 不生效
          Vue.set(this.food, 'count', 1); // 此时这个属性变化就能被观测到
        } else {
          this.food.count++;
        };
        // this.$dispatch('cart.add', ev.target); 2.0- 已被废除
        // console.log(event.target); 点击的按钮的dom
        this.$emit('add', event.target); // 触发当前实例上的事件。附加参数都会传给监听器回调。
      },
      decreaseCart: function (ev) { // 减少购物车里面商品的数量
        if (!ev._constructed) {
          return false;
        };
        if (this.food.count) {
          this.food.count--;
        };
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .cartcontroll{
    font-size:0px;
    .cart-decrease{
      display:inline-block;
      line-height: 24px;
      font-size: 24px;
      transition: all 0.4s linear;
      opacity: 1;
      transform: translate3d(0,0,0);
      .inner{
        display:inline-block;
        padding: 6px;
        color:#00A0DC;
        transition:all 0.4s linear;
        transform: rotate(0deg);
      }
      &.move-enter-active, &.move-leave-active {
        transition: all 0.4s linear;
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display:inline-block;
      vertical-align: top;
      width:12px;
      padding-top:6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color:rgb(147,153,159);
    }
    .cart-add{
      display:inline-block;
      line-height: 24px;
      font-size: 24px;
      padding: 6px;
      color:#00A0DC;
    }
  }
</style>
