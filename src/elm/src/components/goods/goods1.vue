<template>
  <!--全内容-->
  <div>
    <div class="goods">
      <!--左侧分类-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item"
              :class="{'current':currentIndex===index}"
              @click="slectMenu(index,$event)">
            <span class="text border-1px">
              <span class="icon" v-show="item.type>0"
                    :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧商品列表-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="foot-list food-list-hook" ref="foodList">
            <h2 class="title">{{item.name}}</h2>
            <ul>
              <li v-for="food in item.foods" class="foods-item border-1px" @click="selectFood(food,$event)">

                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>

                <div class="content">
                  <h3 class="name">{{food.name}}</h3>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率:{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="odd">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontroll-wrapper">
                    <cart-controll :food="food" ref="food"></cart-controll>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车-->
      <shop-cart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    </div>
    <!--商品详情-->
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontroll from 'components/cartcontroll/cartcontroll';
  import food from 'components/food/food';

  const ERR_OK = 0;

  export default{
    props: { // 用来接收其他组件的数据
      seller: {
        type: Object
      }
    },
    data() { // 数据
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: { // 计算属性
      currentIndex() { // 右侧内容区滚动时左侧对应添加样式
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          };
        };
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) { // 说明此时food已经被添加或减小更改了
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() { // dom加载时的操作
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      // 请求获取goods的数据
      this.$http.get('/api/goods')
        .then((res) => {
          res = res.body;
          if (res.errno === ERR_OK) {
            this.goods = res.data;
            this.$nextTick(() => { // 保证dom渲染好后
              this._initScroll();
              this._calcullateHeight(); // 计算区间高度组成的数组
            });
          }
          ;
        });
    },
    methods: { // 方法
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 可以点击
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3, // scroll滚动时监听滚动位置
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          // console.log(this.scrollY);
        });
      },
      _calcullateHeight() { // 计算右侧内容各自分区的高度 添加到this.listHeight数组中
        // let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let foodList = this.$refs.foodList; // 获得右侧li的dom集合
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight; // 每个区间累加后的高度
          this.listHeight.push(height); // 区间高度放到数组里面
        };
      },
      slectMenu(_index, ev) { // 点击左侧分类添加样式，右侧对应内容滚动到顶部
        if (!ev._constructed) { // 使用了BS
          return;
        };
        let foodList = this.$refs.foodList;
        let els = foodList[_index];
        this.foodsScroll.scrollToElement(els, 300);
      },
      _drop(target) {
        this.$nextTick(() => { // 体验优化，异步执行下落动画
          this.$refs.shopcart.drop(target); // 访问子组件
        });
      },
      selectFood(food, ev) { // 右侧商品内容区点击
        if (!ev._constructed) {
          return;
        };
        this.selectedFood = food;
        // this.$refs.food.show(); // 调用food组件方法
      }
    },
    components: { // 注册组件
      shopCart: shopcart, // 购物车
      cartControll: cartcontroll, // 增加减少
      food: food // 商品详情
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    $main_bg = #f3f5f7
    $line_bg = #d9dde1
    $bottom_bg = rgba(7,17,27,0.1)

    display:flex
    overflow:hidden
    position:absolute
    top:174px
    bottom:46px
    width:100%
    .menu-wrapper
      flex:0 0 80px
      width:80px
      background:$main_bg
      .menu-item
        display:table
        height:54px
        width:56px
        line-height:14px
        padding:0 12px
        &.current
          position:relative
          z-index:10
          margin-top: -1px
          background:#fff
          &:before
            content:''
            display:block
            width:4px
            height:100%
            position:absolute
            top:0
            left:0
            background-color:#00A0DC
          .text
            border-none()
            font-weight:700
      .text
        display:table-cell
        width:56px
        vertical-align:middle
        font-size:12px
        border-1px($bottom_bg)
        .icon
          display:inline-block
          width:12px
          height:12px
          margin-right:2px
          background-size:12px
          background-repeat:no-repeat
          &.decrease
            bg-img("decrease_3")
          &.discount
            bg-img("discount_3")
          &.invoice
            bg-img("invoice_3")
          &.special
            bg-img("special_3")
          &.guarantee
            bg-img("guarantee_3")

    .foods-wrapper
      flex:1
      .title
        height:26px
        background-color:$main_bg
        border-left:1px solid $line_bg
        text-indent:13px
        font-size:12px
        color:rgb(147,153,159)
        line-height:26px
      .foods-item
        display:flex
        margin:18px
        padding-bottom:18px
        border-1px($bottom_bg)
        &:last-child
          padding:0
          border-none()
        $:first-child
          .content
            .cartcontroll-wrapper
              bottom:5px
        .icon
          flex:0 0 57px
          margin-right:10px
          img
            border-radius:3px
        .content
          flex:1
          position:relative
          .name
            margin:2px 0 8px 0
            font-size:14px
            color:rgb(7,17,27)
            line-height:14px
            height:14px
          .desc,txtra
            font-size:10px
            color:rgb(147,153,159)
            line-height:10px
          .desc
            margin-bottom:8px
            line-height:12px
          .extra
            font-size:0px
            .count
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
              bottom:-8px
              right:0


</style>
