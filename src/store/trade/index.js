
import { reqgetTradeInfo } from '@/api'
const state = {
    OrderInfo: {}
}
const mutations = {
    SETORDERINFO(states, data) {
        states.OrderInfo = data
    }
}
const actions = {
    async getTradeInfo({ commit }) {
        const request = await reqgetTradeInfo();
        if (request.code == 200) {
            commit("SETORDERINFO", request.data)
        }
        else {
            return Promise.reject(new Error("faile"))
        }
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}