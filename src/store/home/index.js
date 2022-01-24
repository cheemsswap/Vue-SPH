
import { reqgetBaseCategoryList, reqgetBannderList, reqgetFloorList } from "@/api";
const state = {
    CategoryList: [],
    BannderList: [],
    FloorList: []
}
const mutations = {
    SETCATEGIRYLIST(state, data) {
        state.CategoryList = data
    },
    SETBANNDERLIST(state, data) {
        state.BannderList = data
    },
    SETFLOORLIST(state, data) {
        state.FloorList = data
    }
}
const actions = {
    async getBaseCategoryList({ commit }) {
        const result = await reqgetBaseCategoryList();
        if (result.code == 200) {
            commit("SETCATEGIRYLIST", result.data)
        }
    },
    async getBannderList({ commit }) {
        const result = await reqgetBannderList();
        if (result.code == 200) {
            commit("SETBANNDERLIST", result.data)
        }
    },
    async getFloorList({ commit }) {
        const result = await reqgetFloorList();
        if (result.code == 200) {
            commit("SETFLOORLIST", result.data)
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