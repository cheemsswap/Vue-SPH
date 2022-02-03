import { reqgetLogin, reqgetUserInfo, reqLogout } from "@/api";
const state = {
    token: localStorage.getItem("token") || "",
    UserInfo: {}
}
const mutations = {
    SETTOKEN(states, data) {
        if (data == '') {
            states.token = ""
            localStorage.removeItem("token")
        }
        else {
            states.token = data
            localStorage.setItem("token", data)
        }
    },
    SETUSERINFO(states, data) {
        states.UserInfo = data
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
    async getUserInfo({ commit }) {
        const result = await reqgetUserInfo();
        if (result.code == 200) {
            commit("SETUSERINFO", result.data)
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    async Logout({ commit }) {
        const result = await reqLogout();
        if (result.code == 200) {
            commit("SETUSERINFO", {})
            commit("SETTOKEN", "")
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'))
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