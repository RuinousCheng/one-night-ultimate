import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入 MTDUI 2.0 样式
import '@ss/mtd-vue/lib/theme2/index.css';

// 引入组件库
import MTD from '@ss/mtd-vue';
Vue.use(MTD);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
