<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active:selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{active:selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{active:selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{on:onlyContent}" @click="toggleContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有评价的内容</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: { // 接收 food.vue传递的 :selectType="selectType"
        type: Number,
        default: ALL
      },
      onlyContent: { // 接收 food.vue传递的 :onlyContent="onlyContent"
        type: Boolean,
        default: false // 默认可以看到所有评论
      },
      desc: {
        type: Object,
        default() { // 默认文字显示
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      select(type, ev) { // 选择全部 满意 不满意
        if (!ev._constructed) { // 使用了BS
          return;
        };
        this.$emit('select', type);
      },
      toggleContent(ev) {
        if (!ev._constructed) { // 使用了BS
          return;
        };
        this.$emit('toggle');
      }
    },
    computed: {
      positives() { // 推荐数量
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() { // 不满意数量
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding:18px 0
      margin:0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size:0px
      .block
        display:inline-block
        padding:8px 12px
        border-radius:1px
        margin-right:8px
        color:rgb(77,85,93)
        font-size:12px
        line-height:16px
        &.active
          color:#fff
        .count
           font-size:8px
           margin-left:2px
        &.positive
          background: rgba(0,160,220,0.2)
          &.active
           background:rgb(0,160,220)
        &.negative
          background-color:rgba(77,85,93,0.2)
          &.active
            background-color:rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgba(7,17,27,0.1)
      color:rgb(147,153,159)
      font-size:0
      &.on
        .icon-check_circle
          color:#00c850
      .icon-check_circle
        display:inline-block;
        vertical-align:middle
        font-size:24px
        margin-right: 4px
      .text
        font-size:12px
        display:inline-block
        vertical-align:middle
</style>
