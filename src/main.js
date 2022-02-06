import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//注册全局组件 -》导航条
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

import '@/mock/mockServe'

import { Carousel, CarouselItem, Pagination } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Pagination.name, Pagination);

import * as API from '@/api'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
  mounted() {
    this.$store.dispatch("home/getBaseCategoryList");
  }
}).$mount('#app')

