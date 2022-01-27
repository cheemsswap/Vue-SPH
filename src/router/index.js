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
                isShowFooterList: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                isShowFooterList: false
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
export default router