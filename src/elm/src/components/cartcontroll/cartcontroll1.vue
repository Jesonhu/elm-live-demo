<template>
  <!--全部-->
  <div class="cartcontroll">
    <div class="cart-decrease" v-show="food.count>0"
    @click.stop.prevent="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
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
      addCart: function(ev) {
        if (!ev._constructed) { // 去掉触发pc的事件--保证pc移动事件相同
          return false;
        };
        if (!this.food.count) {
          // this.food.count = 1; 不生效
          Vue.set(this.food, 'count', 1); // 此时这个属性变化就能被观测到
        } else {
          this.food.count++;
        };
        this.$dispatch('cart.add', ev.target);
      },
      decreaseCart: function (ev) {
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
      &.move-transition{
        opacity: 1;
        transform: translate3d(0,0,0);
      }
      .inner{
        display:inline-block;
        padding: 6px;
        color:#00A0DC;
        transition:all 0.4s linear;
        transform: rotate(0deg);
      }
      &.move-enter, &.move-leave{
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
