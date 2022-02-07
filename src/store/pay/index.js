
import { reqgetOrderInfo } from "@/api"
const state = {
    OrderInfo: {}
}
const mutations = {
    SETORDERINFO(states, data) {
        states.OrderInfo = data
    }
}

const actions = {
    async getOrderInfo({ commit }, orderId) {
        const result = await reqgetOrderInfo(orderId);
        if (result.code == 200) {
            commit("SETORDERINFO", result.data)
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