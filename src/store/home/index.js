
import { reqgetBaseCategoryList } from "@/api";
const state = {
    CategoryList: []
}
const mutations = {
    SETCATEGIRYLIST(state, data) {
        state.CategoryList = data
    }
}
const actions = {
    async getBaseCategoryList({ commit }) {
        const result = await reqgetBaseCategoryList();
        if (result.code == 200) {
            commit("SETCATEGIRYLIST", result.data)
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