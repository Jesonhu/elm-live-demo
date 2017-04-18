/**
 * Created by Administrator on 2017/4/2 0002.
 */
// Vue.config.silent = true; 用于取消 Vue 所有的日志与警告
let vmCart = new Vue({
    el: '#app',
    data: {
      totalMoney: 0, //单商品总金额
      totalAllPrice: 0,  //选择所有商品的总金额
      productList: [], //作为商品列表
      checkAllFlag: false, //是否全选 存在该变量才能被监听到
      delFlag: false, //是否删除
      delIndex: ''  //保留点击删除哪个li的索引
    },
    filters: {  //局部过滤器
        formatMoney: function (value) { //格式化价格格式
            return "￥"+value.toFixed(2);
        },
    },
    mounted: function(){ //dom加载完后(生命周期)实例创建后查询某个方法钩子函数--进来之后查询商品
        //this.cartView(); //2使用
        this.$nextTick(function () {
            //mounted不能保证此时new Vue()一定实例化了(使用vmCart可能会报错)
            //$nextTick()可以保证一定是实例化后了
            vmCart.cartView();
        });
    },
    methods: {
        cartView: function(){ //1定义
            const _this = this; //这里的this指向vmCart
            axios.get('data/cartData.json') //使用axios
            .then(function(res){  //then回调函数
            // 使用箭头函数的话，this的作用域并不会变，还是指向vmCart
            // 	(res)=>{
            // 	if(res.status == 200){
            // 		this.totalMoney = res.data.result.totalMoney;
            // 		this.list = res.data.result.list;
            // 	}
            // }
            // 不使用箭头函数的场合
            // 如果要使用vmCart实例，
            // 就必须在mounted钩子函数里再调用一次$nextTick方法才能保证el被render在dom中
                //res 数据库返回的对象
                //res.data.result.list 返回的数据数组
                //console.log(res);
                if(res.status == 200){ //状态为200时执行后面语句
                    _this.productList = res.data.result.list;
                    _this.totalMoney = res.data.result.totalMoney;
                }
            })
            .catch(function(err){
                console.log('get data error...'); //从数据库获取数据出现问题
            });
        },
        changeMoney: function (item, way) { //商品数量增加和减少
            if(way>0){ //点击了+
                item.productQuentity++;
            }else{ //点击了-
                item.productQuentity<=0?item.productQuentity = 0:item.productQuentity--;
            }
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if(typeof item.checked == 'undefined'){ //判断item.checked是否存在
                Vue.set(item, 'checked', true); //向item全局注册了一个属性checked值为true
                //this.$set(item, 'checked', true);//局部注册item.checked
            }else{ //存在--即至少点击了一次后
                item.checked = !item.checked;
            };
            this.calcTotalPrice();
        },
        checkAll: function (flag) { //全选/取消全选
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) => {
                //这里存在一个问题当用户直接点击全选
                //此时item.check还未存在这个属性 所以要检测一下
                if(typeof item.checked == 'undefined'){
                    //Vue.set(item, 'checked', true);
                    this.$set(item, 'checked', this.checkAllFlag); //箭头函数内部还是外部作用域的this
                }else{
                    item.checked = this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () { //计算选中商品总金额函数
            this.totalAllPrice = 0;
            this.productList.forEach((item, index) => {
              if(item.checked){ //说明这个商品选中了
                  this.totalAllPrice += item.productPrice*item.productQuentity;
              }
            })
        },
        delConfirm: function (item) { //点击删除按钮
            this.delFlag = true;
            this.delIndex = item;
        },
        delProduct: function () { //删除点击了删除的商品
            let index = this.productList.indexOf(this.delIndex);
            this.productList.splice(index,1);
              //vue2开始认为js就有删除数组的方法故自己写操作
              //实际项目中需要把这个商品的信息传递到后台
            this.delFlag = false;
        }
    }
});

Vue.filter('money', (value, type) => { //全局过滤器
    return "￥"+ value.toFixed(2) + type;
});