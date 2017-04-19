import Vue from 'vue';
import Router from 'vue-router';
import App from '../App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(Router);

let router = new Router({ //切换样式设置
  linkActiveClass: 'active'
});

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },{
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },{
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});

// 开始路由
router.start(app, '#app');
// 默认路由
router.go('/goods');
