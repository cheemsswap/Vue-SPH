//对axios二次封装
import axios from "axios";

//使用nprogress 进度条功能
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

//1利用axios对象的方法create 去创建和一个axios实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

//请求拦截器 里面有header请求等信息
requests.interceptors.request.use((config) => {
    NProgress.start();
    return config
})

//响应拦截器 
requests.interceptors.response.use((data) => {
    //成功的回调
    NProgress.done();
    return data.data
}, (error) => {
    //失败的回调
    NProgress.done();
    console.log(error.message);
    //return new Promise.reject(new Error("faile"))
})

//对外暴露
export default requests
