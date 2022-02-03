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


//7.切换商品选中状态
export const reqsetCheckCart = ({ skuID, isChecked }) => {
    return requests({
        url: `/cart/checkCart/${skuID}/${isChecked ? 1 : 0}`,
        method: 'get',
    })
}

//8.删除购物车商品
export const reqDelCart = (skuID) => {
    return requests({
        url: `/cart/deleteCart/${skuID}`,
        method: 'delete',
    })
}

//注册验证码
export const reqgetRegisterCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get',
    })
}

// 注册表单提交
///api/user/passport/register
export const reqgetRegister = (req) => {
    return requests({
        url: `/user/passport/register`,
        method: 'post',
        data: req
    })
}

//用户登录
// 9.登录/api/user/passport/login
export const reqgetLogin = (req) => {
    return requests({
        url: `/user/passport/login`,
        method: 'post',
        data: req
    })
}

//自动登录 获取信息
export const reqgetUserInfo = () => {
    return requests({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get',
    })
}

//退出登录
export const reqLogout = () => {
    return requests({
        url: `/user/passport/logout`,
        method: 'get',
    })
}