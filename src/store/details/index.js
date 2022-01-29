import { reqgetDetailsInfo, reqaddToCart } from '@/api'
import { GETUUID } from '@/utils/uuid_token'
const state = {
    DetailsInfo: {},
    uuid: GETUUID()
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
    async addToCart({ commit }, { skuId, skuNum }) {
        const result = await reqaddToCart({ skuId, skuNum });
        return result
    }
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