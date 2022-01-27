import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home'
import search from './search'
import details from './details'
export default new Vuex.Store({
    modules: {
        home,
        search,
        details
    }
})