<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass"
    class="star-item" v-bind:key="itemClass.index"></span>
  </div>
</template>
<!--使用v-for遍历提示加上key区别tra-->
<script type="text/ecmascript-6">
  const LENGTH = 5; // 假设总共有五位
  const CLS_ON = 'on'; //
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: { // 接收header.vue以属性传递过来的数据
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: { // 计算属性
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2; // 保证是整数或是x.5的小数 向下取整(4.9、4.1==>4)
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score); // 整数或 x.5小数都取整
        for (let i = 0; i < integer; i++) { // 每位添加全星
          result.push(CLS_ON); // ['on','on']
        };
        if (hasDecimal) { // x.5的小数 末尾有星星的位添加一个半心
          result.push(CLS_HALF); // ['on','on', 'half']
        };
        while (result.length < LENGTH) {  // 剩下的空星位用空星补齐
          result.push(CLS_OFF); // ['on','on', 'half', 'off', 'off', 'off']
        };
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width:20px
        height:20px
        margin-right:22px
        background-size: 20px 20px
        &:last-child
          margin-right:0
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
    &.star-36
     .star-item
        width:15px
        height:15px
        margin-right:8px
        background-size: 15px 15px
        &:last-child
          margin-right:0
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star-24
     .star-item
        width:10px
        height:10px
        margin-right:3px
        background-size: 10px 10px
        &:last-child
          margin-right:0
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')

</style>
