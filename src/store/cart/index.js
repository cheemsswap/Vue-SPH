import { reqgetCartList, reqsetCheckCart } from '@/api'

const state = {
    CartList: {}
}
const mutations = {
    SETCARTLIST(states, data) {
        states.CartList = data
    }
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqgetCartList();
        if (result.code == 200) {
            commit("SETCARTLIST", result.data)
        }
    },
    async setCheckCart({ commit }, { skuID, isChecked }) {
        const result = await reqsetCheckCart({ skuID, isChecked });
        if (result.code == 200) {
            return true
        }
        return false
    },
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