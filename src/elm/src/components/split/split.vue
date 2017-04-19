<template>
  <div class="split" v-show="food.info">
    <p class="line"></p>
    <div class="info" v-show="food.info">
      <h2 class="title">商品介绍</h2>
      <p class="text">{{food.info}}</p>
    </div>
    <p class="line"></p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .split
    .line
      height:16px
      width:100%
      background-color:#f3f5f7
      border-top:1px solid rgba(7,17,27,0.1)
      border-bottom:1px solid rgba(7,17,27,0.1)
    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)
      .text
        color:rgb(77,85,93)
        line-height:24px
        padding:0 8px
        font-size:12px
</style>
