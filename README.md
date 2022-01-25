
# 第一步 添加项目运行时自动打开浏览器
<pre>
--- package.json
    在 scripts 的 serve 添加 --open
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
    },
</pre>

# 第二步 添加 es校验关闭 
<pre>
官方文档：https://cli.vuejs.org/zh/config/#lintonsave
--- 创建vue.config.js
    配置如下
    module.exports = {
        lintOnSave:false
    }
</pre>
# 第三步 src简写写法
<pre>
--- 创建 jsconfig.json
    配置如下
    {
        "compilerOptions": {
            "baseUrl": "./",
                "paths": {
                "@/*": [
                    "src/*"
                ]
            }
        },
        "exclude": [
            "node_modules",
            "dist"
        ]
    }
</pre>
# 第四步 安装less依赖
<pre>
--- 版本是5版本
    npm i less less-loader@5
</pre>
# 第五步 Header,Footer非路由组件完成
<pre>
--使用assest里面的静态图片
img :src="require('@/assets/logo.png')" alt=""
</pre>
# 第六步 安装vue-router依赖
<pre>
--- npm i vue-router
</pre>

# 第七步 src下创建views文件夹以后放置路由组件
<pre>
--- src
    ---assets 防止静态资源
        ---logo.png 非路由组件Header使用的静态图片
        ---wx_cz.jpg 非路由组件Footer使用的静态图片
    ---components 放置非路由组件文件夹
        ---Header 网页头部组件
        ---Footer 网页底部组件
    ---views
        ---Home 网页主页路由组件
        ---Login 登录页面路由组件
        ---Register 注册页面路由组件
        ---Search 搜索页面路由组件
    ---router
        ---index.js
</pre>
# 第八步 完成Home、Login、Register、Search 路由组件的配置
<pre>
--- router
    ---index.js
</pre>
# 第九步 在main.js 使用router
<pre>
--- main.js
    import router from '@/router'
    new Vue({
        render: h => h(App),
        router
    }).$mount('#app')  
</pre>
# 第十步 在APP.vue 添加 router-view视图
<pre>
--- App.vue
    router-view
</pre>
# 第十一步 添加路由重定向
<pre>
---router
    ---index.js
        {
            path: '*',
            redirect: '/home'
        },
</pre>
# 第十二步 添加路由跳转
<pre>
---为Header中的 
    登录  使用声明式跳转
    免费注册 使用声明式跳转
    logo    使用声明式跳转
    搜索按钮 使用编程式 ->添加query传参
</pre>
# 第十三步 设置Footer在 /login /register 有部分元素是隐藏的
<pre>
---方法1：在Footer中添加计算属性 进行判断
    isShowFooterList() {
      // if (this.$route.path == "/register" || this.$route.path == "/login")
      //   return false;
      // return true;
      return !["/login", "/register"].includes(this.$route.path);
    }
---方法2：为路由添加元信息
    meta:{
        isShowFooterList: false
    }
</pre>
# 第十四步 重复点击搜索按钮，会出现 NavNavigationDuplicated: Avoided redundant navigation to current location: "/search?keyWord=12". 的错误
<pre>
---普通方法: $router 是 promise风格的 捕获住错误不输出就ok
---一劳永逸方法(不建议，不如随时就接住异常): 
    ---router
        ---index.js 添加如下
            const originalPush = VueRouter.prototype.push
                VueRouter.prototype.push = function push(location) {
                return originalPush.call(this, location).catch(err => err)
            }
            const originalReplace = VueRouter.prototype.replace
                VueRouter.prototype.replace = function replace(location) {
                return originalReplace.call(this, location).catch(err => err)
            }
</pre>

# 第十五步 添加三级联动导航栏全局组件
<pre>
--- 因为Home、Search 不止一个组件使用了三级联动导航栏 
    我们决定将TypeNav设置设置为全局组件
</pre>

# 第十六步 添加Home其他的组件
<pre>
--- 列表 ListContainer
--- 今日推荐 TodayRecommend
--- 商品排行 Rank
--- 猜你喜欢 Like
--- 楼层 Floor
--- 商标 Brand
</pre>

# 第十七步 测试接口->三级联动导航栏接口
<pre>
    测试接口地址
    http://39.98.123.211/api/product/getBaseCategoryList
</pre>

# 第十八步 安装axios 并对axios二次封装 
<pre>
---安装axios
    npm i axios
---axios的二次封装
    创建api文件夹
        ---request.js 对axios二次封装
        ---index.js 对接口管理并对外暴露
</pre>

# 第十九步 设置proxy 代理服务器 
<pre>
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
            },
        }
    }
</pre>

# 第二十步 封装好三级联动导航栏
<pre>
    //三级联动导航栏接口
    export const reqgetBaseCategoryList = () => {
        return requests({
            url: '/product/getBaseCategoryList',
            method: 'get'
        })
    }
</pre>

# 第二十一步 增加请求进度条的功能
<pre>
---安装 进度条插件 NProgress
    npm i nprogress
---使用 在request拦截器里面进行使用
    引用：
    import NProgress from 'nprogress'
    import "nprogress/nprogress.css"
    使用：
    NProgress.start();
    NProgress.done();
</pre>

# 第二十二步 为项目添加Vuex
<pre>
---安装 VueX 插件
    npm i vuex
---使用 
    ---store
        ---index.js

    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)

    export default new Vuex.Store({

    })

</pre>

# 第二十三步 模块化Vuex
<pre>
    ---store
        ---index.js
        ---home
            ---index.js
        ---search
            ---index.js
</pre>

# 第二十四步 三级联动导航栏 通过vuex 调用数据
<pre>
---store
    ---home
        ---index.js 核心代码：

    async getBaseCategoryList({ commit }) {
        const result = await reqgetBaseCategoryList();
        if (result.code == 200) {
            commit("SETCATEGIRYLIST", result.data)
        }
    }

---components
    ---TypeNav
        ---index.js 核心代码

    computed: {
    ...mapState("home", ["CategoryList"]),
    },
    mounted() {
    this.$store.dispatch("home/getBaseCategoryList");
    },
</pre>

# 第二十五步 使用vue的方式为一级菜单设置鼠标移动上去的背景颜色
<pre>
    核心代码：
    @mouseenter="setCurrIndex(index)"
    @mouseleave="clearCurIndex()"
    :style="{
    'background-color': index == currentIndex ? '#ccc' : null,
    }"

    data() {
        return {
            currentIndex: -1,
        };
    },
    methods: {
        setCurrIndex(index) {
            this.currentIndex = index;
    },
        clearCurIndex() {
            this.currentIndex = -1;
    },
    },

</pre>

# 第二十六步 将三级导航展示 修改成js版本
<pre>
    注释css样式
    增加v-show进行判定隐藏和显示
</pre>

# 第二十七步 为项目添加防抖和节流库 并对三级导航使用
<pre>
--- 安装插件 Lodash
    npm i lodash
--- 引用lodash
    全部引用
        import _ from "lodash";
        使用代码如下：
        setCurrIndex: _.throttle(function (index) {
            this.currentIndex = index;
        }, 20),
    
    部分引用
        import throttle from "lodash/throttle";
        使用代码如下：
        setCurrIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 20),
</pre>

# 第二十八步 使用三级导航路由跳转+事件委派+自定义传参的应用
<pre>
    核心代码：
    

    {% highlight html linenos %}
    <div @click="goSearch" >
        <a
            :data-categoryName="cate.categoryName"
            :data-category1Id="cate.categoryId"
            >{{ cate.categoryName }}
        </a>
    </div>
    {% endhighlight %}

    goSearch(e) {
        //判读是否为a标签
      if (e.target.tagName == "A") {
        //提取a标签里面的自定义data属性 注意被提取被转为小写的了
        const { categoryname,
                category1id,
                category2id,
                category3id 
        } = e.target.dataset;
        //编程式路由导航
        this.$router.push({
          path: "/search",
          query: {
            categoryName: categoryname,
            category1id,
            category2id,
            category3id,
          },
        });
      }
    },
</pre>

# 第二十九步 Search模块引用导航栏
<pre>
1、search模块使用TypeNav导航栏
---views
    ---Search
        ---index 使用TypeNav
2、修改TypeNav在home路由下常驻显示 在search路由下只有活动的时候才显示
3、增加search活动显示的动画效果
</pre>

# 第三十步 为Header 搜索按钮增加 追加上次query的效果
<pre>
    核心代码：
    search() {
      this.$router.push({
        query: {
          ...this.$route.query,
          keyWord: this.serachKeyWord,
        },
      });
    },
</pre>

# 第三十一步 安装mock 制作假接口 并使用
<pre>
安装mockjs
--- npm install mockjs

创建文件夹 mock
    ---bannder.json
    ---floor.json
    ---mockServe.js
在public下创建文件夹 images
    将listContaniner和floor需要的图片拷贝进去
</pre>

# 第三十二步 Home->listContainer 使用mock制作的假接口
<pre>
--- api 
    index.js
    核心代码：
    export const reqgetBannderList = () => {
    return requests({
        url: '/bannder',
        method: 'get'
    })
--- store
    ---home 
        ---index.js
    核心代码：
        const state = {
            BannderList: []
        }
        const mutations = {
            SETBANNDERLIST(state, data) {
                state.BannderList = data
            }
        }
        const actions = {
            async getBannderList({ commit }) {
                const result = await reqgetBannderList();
                if (result.code == 200) {
                    commit("SETBANNDERLIST", result.data)
                }
            }
        }
---view
    --Home
        ---ListContainer
        核心代码：
        computed: {
            ...mapState("home", ["BannderList"]),
        },
        mounted() {
            this.$store.dispatch("home/getBannderList");
        },
</pre>
# 第三十三步 引用element UI 为home添加走马灯
<pre>
安装element UI
--- npm i element-ui -S
注册全局走马灯组件
import { Carousel, CarouselItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);

在home->listContainer 使用
    {% highlight html linenos %}
  <el-carousel height="464px">
    <el-carousel-item v-for="item in BannderList" :key="item.id">
        <img :src="item.imaUrl" :style="{ height: '100%' }" />
    </el-carousel-item>
    </el-carousel>
    {% endhighlight %}
</pre>

# 第三十四步 开发home->floor
<pre>
    1、设置api接口
    ---api
        ---index.js
    核心代码:
    export const reqgetFloorList = () => {
        return requests({
            url: '/floor',
            method: 'get'
        })
    }
    2、添加vuex在home模块下的内容
    ---store
        ---home
            ---index.js
    核心代码:
    const state = {
        FloorList: []
    }
    const mutations = {
        SETFLOORLIST(state, data) {
        state.FloorList = data
    }
    }
    const actions = {
        async getFloorList({ commit }) {
        const result = await reqgetFloorList();
        if (result.code == 200) {
            commit("SETFLOORLIST", result.data)
        }
    }
    步骤3、home下使用vuex -> 调用api 然后接住数据
    ---views
        ---home
            ---index.vue
        
        核心代码:
        {% highlight html linenos %}
        <Floor v-for="floor of FloorList" :key="floor.id" :floor="floor" />
        {% endhighlight %}
        computed: {
            ...mapState("home", ["FloorList"]),
        },
        mounted() {
            this.$store.dispatch("home/getFloorList");
        },
    步骤四、view->Home->Floor 接受pros数据 并展示
    ---view
        ---Home
            ---Floor
                ---index.js
    具体看文件里面的代码
}
</pre>

# 第三十五步 将search的静态页面拆成组件 
<pre>
---view
    ---Search
        ---Bread
            ---index.vue
            ---images
        ---Details
            ---index.vue
            ---images
        ---Hotsale
            ---index.vue
            ---images
        ---Selector
            ---index.vue
            ---images
</pre>

# 第三十六步 开发search 调用api获取数据
<pre>
    1、首先先配置api
    ---api
        ---index.js
        export const reqgetSearchInfo = (req) => {
            return requests({
                url: '/list',
                method: 'post',
                data: req
            })
        }
    2、配置vuex
    ---store
        ---search
            ---index.js
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
    3、在search模块调用接口 使用路由组件守卫
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            const info = vm.$route.query;
            vm.$store.dispatch("search/getSearchInfo", info);
        });
    },
    beforeRouteUpdate(to, from, next) {
        const info = to.query;
        this.$store.dispatch("search/getSearchInfo", info);
        next();
    },
</pre>

# 第三十七步 优化search中store部分 使用getter将数据进行解析
<pre>
    1、store->search 增加getter内容
    ---store
        ---search
            ---index.js
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
    2、view->Search使用
        computed: {
        // ...mapState("search", ["SearchInfo"]),
        ...mapGetters("search", ["trademarkList", "attrsList", "goodsList"]),
        }, 
    3、给组件传值

    {% highlight html linenos %}
    <Selector :trademarkList="trademarkList" :attrsList="attrsList" />
    <Details :goodsList="goodsList" />
    {% endhighlight %}

    4、这2个组件分别接受 这些传来的参数
    具体查看
    ---view
        ---Search
            ---Selector
                ---index.js  这个文件
    ---view
        ---Search
            ---Details
                ---index.js  这个文件
</pre>

