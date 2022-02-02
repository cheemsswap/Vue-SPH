
import { reqgetRegisterCode, reqgetRegister } from "@/api";
const state = {
    code: ''

}
const mutations = {
    SETCODE(states, data) {
        states.code = data
    }
}
const actions = {
    async getRegisterCode({ commit }, phone) {
        const result = await reqgetRegisterCode(phone);
        if (result.code == 200) {
            commit("SETCODE", result.data)
        } else {
            commit("SETCODE", "请重试")
        }
    },
    async getRegister({ commit }, req) {
        const result = await reqgetRegister(req);
        return result
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