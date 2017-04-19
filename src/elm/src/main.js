// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import axios from 'axios';

// 引用全局styl
import 'common/stylus/index.styl';

Vue.use(VueRouter); // 使用vue-router
Vue.use(VueResource); // 使用vue-resource
Vue.prototype.$ajax = axios; // 使用axios

// 配置路由
const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

//
const router = new VueRouter({
  linkActiveClass: 'active', // 自定义路由切换类名
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
    // 此时可以不用传入template
    // => es6语法 --createElement
});
