//接口统一管理
import requests from "./request";

//三级联动导航栏接口
export const reqgetBaseCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//home-》bannder轮播图
export const reqgetBannderList = () => {
    return requests({
        url: '/bannder',
        method: 'get'
    })
}

//home-》Floor 楼层
export const reqgetFloorList = () => {
    return requests({
        url: '/floor',
        method: 'get'
    })
}

//search 
/** 参数
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
export const reqgetSearchInfo = (req) => {
    return requests({
        url: '/list',
        method: 'post',
        data: req
    })
}

export const reqgetDetailsInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get',
    })
}

export const reqaddToCart = ({ skuId, skuNum }) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}

// 5.获取购物车列表
export const reqgetCartList = () => {
    return requests({
        url: `/cart/cartList`,
        method: 'get',
    })
}

