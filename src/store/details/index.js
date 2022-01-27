import { reqgetDetailsInfo } from '@/api'

const state = {
    DetailsInfo: {}
}
const mutations = {
    SETDETAILSINFO(states, data) {
        states.DetailsInfo = data
    }
}
const actions = {
    async getDetailsInfo({ commit }, skuId) {
        const result = await reqgetDetailsInfo(skuId);
        if (result.code == 200) {
            commit("SETDETAILSINFO", result.data)
        }
    },
}
const getters = {
    categoryView(states) {
        return states.DetailsInfo.categoryView || {}
    },
    price(states) {
        return states.DetailsInfo.price || 0
    },
    skuInfo(states) {
        return states.DetailsInfo.skuInfo || {}
    },
    spuSaleAttrList(states) {
        return states.DetailsInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}