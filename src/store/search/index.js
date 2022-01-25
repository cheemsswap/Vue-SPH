
//search
import { reqgetSearchInfo } from '@/api'
const state = {
    SearchInfo: {}
}
const mutations = {
    SETSEARCHINFO(states, data) {
        states.SearchInfo = data || {}
    }
}
const actions = {
    async getSearchInfo({ commit }, req) {
        const request = await reqgetSearchInfo(req);
        if (request.code == 200) {
            commit("SETSEARCHINFO", request.data)
        }
    }
}

const getters = {
    trademarkList(states) {
        return states.SearchInfo.trademarkList || []
    },
    attrsList(states) {
        return states.SearchInfo.attrsList || []
    },
    goodsList(states) {
        return states.SearchInfo.goodsList || []
    },
    total(states) {
        return states.SearchInfo.total
    },
    pageSize(states) {
        return states.SearchInfo.pageSize
    },
    pageNo(states) {
        return states.SearchInfo.pageNo
    },
    totalPages(states) {
        return states.SearchInfo.totalPages
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}