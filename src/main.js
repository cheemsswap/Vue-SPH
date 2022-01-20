import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//测试 es校验是否关闭
let x = 100
new Vue({
  render: h => h(App),
}).$mount('#app')
