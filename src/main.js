import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang'; // 国际化语言

import '@/assets/styles/iconfont/iconfont.css';
import '@/assets/styles/global.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
