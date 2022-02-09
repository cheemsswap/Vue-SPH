import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//注册全局组件 -》导航条
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

import '@/mock/mockServe'

import { Carousel, CarouselItem, Pagination, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox;
import QRCode from 'qrcode'

import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
const loadimage = require('./assets/loading.gif')
const errorimage = require('./assets/error.jpg')
Vue.use(VueLazyload, {
  loading: loadimage,
  error: errorimage,
})
//表单校验
import '@/utils/validate'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$QRCode = QRCode
  },
  router,
  store,
  mounted() {
    this.$store.dispatch("home/getBaseCategoryList");
  }
}).$mount('#app')

