import { reqgetLogin } from "@/api";
const state = {
    token: localStorage.getItem("token") || ""
}
const mutations = {
    SETTOKEN(states, data) {
        states.token = data
        localStorage.setItem("token", data)
    }
}
const actions = {
    async getLogin({ commit }, req) {
        const result = await reqgetLogin(req);
        if (result.code == 200) {
            commit("SETTOKEN", result.data.token)
            return true;
        }
        else
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