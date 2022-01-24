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