import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home'
import search from './search'
import details from './details'
import cart from './cart'
import register from './register'
import login from './login'
import trade from './trade'
import pay from './pay'
export default new Vuex.Store({
    modules: {
        home,
        search,
        details,
        cart,
        register,
        login,
        trade,
        pay
    }
})