import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
const router = new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta: {
                isShowFooterList: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                isShowFooterList: false,
                isLogin: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                isShowFooterList: false,
                isLogin: false
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                isShowFooterList: true
            },
        },
        {
            path: '/detail/:id',
            name: "detail",
            component: Detail,
            meta: {
                isShowFooterList: true
            },
        },
        {
            path: '/addcartsuccess/:num',
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
            props: true
        },
        {
            path: '/shopcart',
            component: ShopCart,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
        },
        {
            path: '/trade',
            component: Trade,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (to.name === 'detail')
                return { x: 0, y: 0 }
        }
    }
})
import store from '@/store'
router.beforeEach(async (to, from, next) => {
    try {
        await store.dispatch("login/getUserInfo");
    } catch (error) {
        console.log("自动登录失败");
    }
    if (to.meta.isLogin == undefined) {
        next();
        return
    }
    if (to.meta.isLogin == true && store.state.login.UserInfo.name != undefined) {
        next();
        return
    }
    if (to.meta.isLogin == false && store.state.login.UserInfo.name == undefined) {
        next();
        return
    }
    if (to.meta.isLogin)
        next('/login')
    else
        next('/home')
})

export default router