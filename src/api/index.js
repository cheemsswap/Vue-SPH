//接口统一管理
import requests from "./request";

//三级联动导航栏接口
export const reqgetBaseCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}