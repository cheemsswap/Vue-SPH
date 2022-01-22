import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//注册全局组件 -》导航条
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
