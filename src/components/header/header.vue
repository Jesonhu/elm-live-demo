<template>
  <div class="header">
    <!-- 商品信息 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img alt="" height="64" width="64" :src="seller.avatar">
      </div>
      <div class="content">

        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>

        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>

        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>

      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail(1)">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail(1)">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <!--背景图片-->
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>

    <!--公告详情-->
        <!--transition用法变化 css使用变化-->
    <transition name="fade">
      <div v-show="detail_show" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>

          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>

          <ul class="supports" v-if="seller.supports">
            <li v-for="(item,index) in seller.supports" class="supports-item">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>

          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>

          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="showDetail(0)"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'; // 引入star组件

  export default{
    props: { // 获取父组件传递过来的数据seller
      seller: {
        type: Object
      }
    },
    data() { // Vue 实例的数据对象
      return {
        detail_show: false
      };
    },
    methods: {
      // methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
      // 方法中的 this 自动绑定为 Vue 实例
      showDetail: function (action) { // 点击显示或隐藏公告详情
        if (action) {
          this.detail_show = true;
        } else {
          this.detail_show = false;
        }
      }
    },
    created() {
      //  实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：
      // 数据观测(data observer)，属性和方法的运算， watch/event 事件回调。
      //  然而，挂载阶段还没开始，$el 属性目前不可见。
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      // 注册组件 1引入2注册，这样组件才能被使用
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .header
    $col = #fff
    $bg = rgba(7,17,27,0.5)
    $pad_top = 24px

    color:$col
    background:$bg
    position:relative
    overflow:hidden

    .content-wrapper
        padding:$pad_top 12px 18px $pad_top
        font-size:0 /*紧贴*/
        position:relative
        .avatar
          display: inline-block
          vertical-align:top
          img
            border-radius:2px
        .content
          margin-left:16px
          display:inline-block
          font-size:14px
          .title
            margin:2px 0 8px 0
            .brand
              display:inline-block
              vertical-align:top /*图片与文字顶部对齐*/
              width:30px
              height:18px
              bg-img("brand") /*按需加载2x1 3x*/
              background-size:30px 17px
              background-repeat:no-repeat
            .name
              margin-left:6px
              font-size:16px
              color:rgb(255,255,255)
              line-height:18px
              font-weight:bold

          .description
            margin-bottom:10px
            font-size:12px;
            color: rgb(255,255,255)
            line-height:12px

          .supports
            .icon
              display:inline-block
              width:12px
              height:12px
              margin-right:4px
              background-size:12px 12px
              background-repeat: no-repeat
              vertical-align:top
              &.decrease
                bg-img("decrease_1")
              &.discount
                bg-img("discount_1")
              &.invoice
                bg-img("invoice_1")
              &.special
                bg-img("special_1")
              &.guarantee
                bg-img("guarantee_1")
            .text
              display:inline-block
              font-size:10px
              color:rgb(255,255,255)
              line-height:12px;
        .support-count
          position:absolute
          right:12px
          bottom:18px
          height:24px
          color:rgb(255,255,255)
          line-height:24px
          background:rgba(0,0,0,.2)
          padding:0px 8px
          text-align:center
          border-radius:12px
          .count
            vertical-align:top
            font-size:10px
          .icon-keyboard_arrow_right
            font-size:10px
            line-height:24px
            margin-left:2px
    .bulletin-wrapper
        height:28px
        line-height:28px
        padding:0 22px 0 12px
        white-space: nowrap
        overflow:hidden
        text-overflow:ellipsis
        position:relative
        background-color:rgba(7,17,27,.2)
        .bulletin-title
          display:inline-block
          height:12px
          width:22px
          bg-img('bulletin')
          background-size:22px 12px
          background-repeat:no-repeat
          vertical-align:top
          margin-top:8px
        .bulletin-text
          font-size:10px
          margin:0 4px
          vertical-align:top
        .icon-keyboard_arrow_right
          position:absolute
          top:8px
          right:12px
          font-size:10px
    .bg
      position:absolute
      left:0
      top:0
      width:100%
      height:100%
      z-index:-1
      filter: blur(10px)

    .detail
      position:fixed
      left:0
      top:0
      z-index:100
      width:100%
      height:100%
      overflow:auto
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active,&.fade-leave-active
        transition:all 0.5s
      &.fade-enter,&.fade-leave-active
        opacity:0
        background:rgba(7,17,27,0)
      .detail-wrapper
        min-height:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            font-size:16px
            font-weight:700
            color:rgb(255,255,255)
            line-height:16px
            text-align:center
          .star-wrapper
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:30px auto 24px auto
            .line
              flex:1
              position:relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,.2)
            .text
              padding:0 12px
              font-weight:700
              font-size:14px
          .supports
            width:80%
            margin:0 auto
            .supports-item
              padding:0 12px
              margin-bottom: 12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                width:16px
                height:16px
                margin-right:6px
                background-size:16px
                background-repeat:no-repeat
                vertical-align:top
                &.decrease
                  bg-img("decrease_2")
                &.discount
                  bg-img("discount_2")
                &.invoice
                  bg-img("invoice_2")
                &.special
                  bg-img("special_2")
                &.guarantee
                  bg-img("guarantee_2")
              .text
                font-size:12px
                font-weight:200
                color: rgb(255,255,255)
                line-height:16px
          .bulletin
            width:80%
            margin:0 auto
            font-size:12px
            font-weight:200
            color: rgb(255,255,255)
            line-height:24px

      .detail-close
        position: relative
        width:32px
        height:32px
        margin:-64px auto 0 auto
        clear:both
        font-size:32px

</style>
