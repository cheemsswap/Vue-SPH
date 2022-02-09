# 使用方法：
<pre>
    使用如下:
    1、第一步更新全局包
    npm update
    2、第二步添加依赖
    npm i
    3、第三步启动
    npm run serve
</pre>

# 以下为我的开发记录
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

# 第三十八步 增加Search中的面包屑的功能 上
<pre>
    面包屑位于
    ---view
        ---Search
            ---Bread
                ---index.js
    1、需要Search 给 Bread 传递 keyword 和 categoryName 和 trademark
        或者 Bread 直接从路由的信息里面获取也可以
    2、Berad组件获取到keyword和categoryName和trademark 进行展示
    3、为这2个传递的参数使用v-if 进行展示，并且增加点击事件
        3.1、为trademark的移除操作能够清除Home组件下的keyword设置为空 添加了事件总线的方式
    4、点击事件 进行编程式路由 跳转
</pre>

# 第三十九步 增加Search中的面包屑的功能 下
<pre>
    增加商品属性的参数
    1、为商品属性添加点击事件-》添加到路由里面
    ---view
        ---Search
            ---Selector
                ---index.js
    使用事件代理的方式
    核心代码：
    ```html
        <ul class="type-list" @click="addProps">
            <li v-for="attrValue of attrs.attrValueList" :key="attrValue">
            <a
                :data-id="attrs.attrId"
                :data-value="attrValue"
                :data-name="attrs.attrName"
                >{{ attrValue }}</a
            >
            </li>
        </ul>
    ```
    addProps(event) {
      const { id, name, value } = event.target.dataset;
      if (id) {
        const props = [...(this.$route.query.props || [])];
        props.push(`${id}:${value}:${name}`);

        this.$router.push({
          query: {
            ...this.$route.query,
            props,
          },
        });
      }
    }
    2、在面包屑 展示 并 能够删除掉
    ---view
        ---Search
            ---Bread
                ---index.js
    核心代码:
    ```html
    <li
    class="with-x"
    v-for="(p, index) of props"
    :key="`${p}+${index}`"
    @click="clearProps(p)"
    >
        {{ p.split(":")[1] }}<i>×</i>
    </li>
    ```
    clearProps(p) {
      const props = [...this.props];
      props.splice(
        props.findIndex((e) => e == p),
        1
      );
      this.$router.push({
        query: {
          ...this.$route.query,
          props,
        },
      });
    },
</pre>

# 第四十步 修复面包屑bug
<pre>
    具体查看 问题复现->demo1
    当props里面的参数只有一个的时候 刷新网页
    ["abc"] 会识别成string  在v-for 的时候会出现问题 会被当成字符串进行解析
    对于字符串的数组 保存数据的时候 要切记尽量避开这个内容
</pre>

# 第四十一步 增加Search 综合 和 价格 的升序或者降序
<pre>
    核心代码：
    ```html
    <ul class="sui-nav">
        <li :class="{ active: ComprehenSive }" @click="updateComprehenSive">
            <a v-show="ComprehenSive == 1">综合⬆</a>
            <a v-show="ComprehenSive == -1">综合⬇</a>
            <a v-show="ComprehenSive == 0">综合</a>
        </li>
        <li :class="{ active: Price }" @click="updatePrice">
            <a v-show="Price == 1">价格⬆</a>
            <a v-show="Price == -1">价格⬇</a>
            <a v-show="Price == 0">价格</a>
        </li>
    </ul>
    ```
    data() {
        return {
            //0代表 未激活，-1代表降序  1代表升序
            ComprehenSive: 1,
            Price: 0,
        };
    },
    methods: {
        updatePrice() {
            this.ComprehenSive = 0;
            if (this.Price == 0) {
                this.Price = 1;
            } else {
                this.Price = -this.Price;
            }
            this.$router.push({
                query: {
                    ...this.$route.query,
                    order: `2:${this.Price == 1 ? "asc" : "desc"}`,
                },
            });
        },
        updateComprehenSive() {
            this.Price = 0;
        if (this.ComprehenSive == 0) {
            this.ComprehenSive = 1;
        } else {
            this.ComprehenSive = -this.ComprehenSive;
        }
        this.$router.push({
            query: {
                ...this.$route.query,
                order: `1:${this.ComprehenSive == 1 ? "asc" : "desc"}`,
            },
        });
        },
    },
</pre>
# 第四十二步 增加Search 分页器
<pre>
    使用elementUi 的分页器
    1、引用elementui的分页器  注册为全局组件
    ---main.js
    import {Pagination } from 'element-ui';
    Vue.component(Pagination.name, Pagination);
    2、在Search->Details下使用 这个分页器
    ```html
    <div style="display: flex; justify-content: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPages * 10"
        @current-change="changePage"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
    ```
    3、增加一个当前页码的变量 通过路由获取，如果路由没有 则会默认为1
    computed: {
        currentPage() {
            //返回当前页数
            return this.$route.query.pageNo || 1;
        },
    },
    4、为点击跳转页码增加点击事件
    changePage(val) {
        this.$router.push({
            query: {
                ...this.$route.query,
                pageNo: val,
            },
        });
    },
</pre>

# 第四十三步 商品详情页面 静态页面
<pre>
    ---view
        ---Detail
            ---images
            ---ImageList
                ---index.js
            ---Zoom
                ---index.js
            index.js
</pre>

# 第四十四步 设置商品跳转路由 和 Detail路由
<pre>
    ---view
        ---Search
            ---Details
                ---index.js
    核心代码：
    <router-link
        :to="{
            name: 'detail',
            params: {
            id: good.id,
            },
        }"
        target="_blank"
        >
        <img :src="good.defaultImg" alt="图片裂了 点我" />
    </router-link>

    ---router
        ---index.js
    核心代码:
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
</pre>
# 第四十五步 Details通过路由钩子提交请求 并获取来自Vuex中的数据并展示
<pre>
    核心代码：
    ---view
        ---Detail
            ---index.js
    computed: {
        ...mapGetters("details", [
            "categoryView",
            "price",
            "skuInfo",
            "spuSaleAttrList",
        ]),
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.dispatch("details/getDetailsInfo", to.params.id);
        });
    },
    beforeRouteUpdate(to, from, next) {
        this.$store.dispatch("details/getDetailsInfo", to.params.id);
        next();
    },
</pre>
# 第四十六步 Details详情页 对选购数量部分进行加工
<pre>
    ---view
        ---Detail
            ---index.js
    核心代码:
    ```html
    <div class="controls">
        <input autocomplete="off" class="itxt" v-model.number="num" />
        <a href="javascript:" class="plus" @click="addNum">+</a>
        <a href="javascript:" class="mins" @click="subNum">-</a>
    </div>
    ```  
    data() {
        return {
            num: 1,
        };
    },
    watch: {
        num(val) {
            if (typeof val != "number") this.num = 1;
            if (val <= 0) this.num = 1;
            this.num = parseInt(this.num);
        },
    },
    methods: {
        addNum() {
            this.num++;
        },
        subNum() {
            this.num--;
        },
    },
</pre>

# 第四十七步 Details详情页 放大镜效果
<pre>
---view
    ---Detail
        --Zoom
            ---index.js
    核心代码:
    ```html
    <div class="spec-preview" @mousemove="move">
        <img :src="Img" />
        <div class="event"></div>
        <div class="big">
            <img :src="Img" ref="bigimg" />
        </div>
        <div class="mask" ref="mask"></div>
    </div>
    ```
    methods: {
    move(event) {
      const mask = this.$refs["mask"];
      const bigimg = this.$refs["bigimg"];
      mask.style.top = `${
        (event.offsetY <= 100
          ? 100
          : event.offsetY >= 300
          ? 300
          : event.offsetY) - 100
      }px`;
      mask.style.left = `${
        (event.offsetX <= 100
          ? 100
          : event.offsetX >= 300
          ? 300
          : event.offsetX) - 100
      }px`;
      bigimg.style.top = `${-((event.offsetY - 100) * 2 <= 0
        ? 0
        : (event.offsetY - 100) * 2 >= 400
        ? 400
        : (event.offsetY - 100) * 2)}px`;
      bigimg.style.left = `${-((event.offsetX - 100) * 2 <= 0
        ? 0
        : (event.offsetX - 100) * 2 >= 400
        ? 400
        : (event.offsetX - 100) * 2)}px`;
    },
</pre>
# 第四十八步 Details详情页 放大镜下的小轮播
<pre>
    ---view
        ---Detail
            ---index.vue
    核心代码:
    ```html
    <Zoom :Img="skuImg || skuInfo.skuDefaultImg" />
    <ImageList
    :skuImageList="skuInfo.skuImageList"
    @setskuImg="setskuImg"
    />
    ```
    data() {
        return {
            skuImg: undefined,
        };
    },
    methods: {
        setskuImg(url) {
            this.skuImg = url;
        },
    },

    ---view
        ---Detail
            ---ImageList
                ---ImageList.vue
    详情查看源文件    
</pre>

# 第四十九步 Details详情页 商品售卖属性值选择
<pre>
    ---view
        ---Detail
            ---index.vue
    核心代码:
    ```html
    <dl v-for="spuSaleAttr of spuSaleAttrList" :key="spuSaleAttr.id">
        <dt class="title">{{ spuSaleAttr.saleAttrName }}</dt>
        <dd
            :class="{ active: spuSaleAttrValue.isChecked == 1 }"
            v-for="(
            spuSaleAttrValue, index
            ) of spuSaleAttr.spuSaleAttrValueList"
            :key="spuSaleAttrValue.id"
            @click="selectChange(spuSaleAttr.spuSaleAttrValueList, index)"
        >
            {{ spuSaleAttrValue.saleAttrValueName }}
        </dd>
    </dl>
    ```
    methods: {
        selectChange(spuSaleAttr, index) {
            for (const key in spuSaleAttr) {
                if (key == index) this.$set(spuSaleAttr[key], "isChecked", 1);
                else this.$set(spuSaleAttr[key], "isChecked", 0);
            }
        },
    },
</pre>

# 第五十步 添加商品加入购物车接口,并为详情页的按钮“加入购物车”的逻辑，并保存到浏览器缓存中
<pre>
    ---api
        ---index.js
    核心代码:
    export const reqaddToCart = (skuId, skuNum) => {
        return requests({
            url: `/cart/addToCart/${skuId}/${skuNum}`,
            method: 'post',
        })
    }
    ---view
        ---Detail
            ---index.js
        ```html
        <a @click="addToCart">加入购物车</a>
        ```
        data() {
            return {
                cartData: JSON.parse(localStorage.getItem("cartData")) || [],
            };
        },
        watch: {
            cartData: {
                deep: true,
                handler() {
                    localStorage.setItem("cartData", JSON.stringify(this.cartData));
                },
            },
        }
        methods: {
            async addToCart() {
                const addCartData = {
                    skuId: this.$route.params.id || undefined,
                    skuNum: this.num || undefined,
                };
                let result = await this.$store.dispatch("details/addToCart", addCartData);
                if (result.code == 200) {
                    //购物车信息 追加并保存
                    let cartNewData = [...this.cartData];
                    cartNewData = cartNewData.filter((e) => {
                    if (e.skuId == addCartData.skuId) {
                        addCartData.skuNum += e.skuNum;
                        return false;
                    }
                    return true;
                    });
                    cartNewData.unshift(addCartData);
                    await (this.cartData = cartNewData);
                    this.$router.push({
                    name: "addcartsuccess",
                    params: {
                        num: this.num,
                    },
                    });
                } else {
                    alert("加入购物车失败");
                }
            },
        }
</pre>

# 第五十一步 新增购物车添加成功 静态页面 和 路由配置
<pre>
    路由配置：
    ---router
        ---index.js
        核心代码:
        {
            path: '/addcartsuccess/:num',
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: {
            isShowFooterList: true
            },
            props: true
        },
    购物车添加成功静态页面
    （包括展示，跳转回详情页）
    ---view
        ---AddCartSuccess
            ---index.js
    核心代码具体查看文件
</pre>

# 第五十二步 新增购物车展示静态页面 和 路由配置
<pre>
    ---router
        ---index.js
        核心代码:
        {
            path: '/shopcart',
            component: ShopCart,
            meta: {
                isShowFooterList: true
            },
        },  
    ---view
        ---ShopCart
            ---index.js
        核心代码具体查看文件  
</pre>

# 第五十三步 新增游客token
<pre>
    ---src
        ---utils
            ---uuid_token.js
    核心代码:
    import { v4 as uuidv4 } from 'uuid';
    export const GETUUID = function () {
        let uuid = localStorage.getItem("uuid");
        if (uuid == undefined) {
            uuid = uuidv4();
            localStorage.setItem("uuid", uuid)
        }
        return uuid;
    }   
</pre>

# 第五十四步 在请求头添加游客uuid
<pre>
    请求头加入uuid后，所以的加入购物车都会被记录下来，
    昨日的获取购物车的接口也能返回正常的购物车数据
    ---api
        ---request.js
    requests.interceptors.request.use((config) => {
        NProgress.start();
        //添加游客uuid
        config.headers.userTempId = GETUUID()
        return config
    })
</pre>

# 第五十五步 展示购物车数据
<pre>
    ---view
        ---ShopCart
            ---index.vue
    ```html
    <ul
        class="cart-list"
        v-for="cartInfo of cartInfoList || []"
        :key="cartInfo.id"
    >
        <li class="cart-list-con1">
            <input
                type="checkbox"
                name="chk_list"
                :checked="cartInfo.isChecked"
            />
        </li>
        <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
                {{ cartInfo.skuName }}
            </div>
        </li>
        <li class="cart-list-con3">
            <div class="item-txt">&nbsp;</div>
        </li>
        <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
        </li>
        <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
                autocomplete="off"
                type="text"
                :value="cartInfo.skuNum"
                minnum="1"
                class="itxt"
            />
            <a href="javascript:void(0)" class="plus">+</a>
        </li>
        <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
        </li>
        <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
        </li>
    </ul>
    ```
    computed: {
    ...mapState("cart", ["CartList"]),
    cartInfoList() {
    if (this.CartList[0]) return this.CartList[0]["cartInfoList"];
    return [];
    },
</pre>

# 第五十六步 购物车商品选中状态修改-》api接口设置，store仓库，
<pre>
    1、api接口
    ---api
        ---index.js
    export const reqsetCheckCart = ({ skuID, isChecked }) => {
        return requests({
            url: `/cart/checkCart/${skuID}/${isChecked ? 1 : 0}`,
            method: 'get',
        })
    }
    2、store仓库
    ---store
        ---cart
            ---index.js
        const actions = {
            async setCheckCart({ commit }, { skuID, isChecked }) {
                const result = await reqsetCheckCart({ skuID, isChecked });
                if (result.code == 200) {
                    return true
                }
                return false
            },
        }
    3、视图页面
    ---view
        ---ShopCart
            ---index.vue
    单个商品选中核心代码
    ```html
    <li class="cart-list-con1">
        <input
        type="checkbox"
        name="chk_list"
        :checked="cartInfo.isChecked"
        @click="changeChecked(cartInfo.skuId)"
        />
    </li>
    ```
    methods: {
        async changeChecked(id) {
            //发送请求更新商品是否选中的数据
            let reselt = await this.$store.dispatch("cart/setCheckCart", {
            skuID: id,
            isChecked: event.target.checked,
            });
            if (!reselt) {
                alert("操作失败");
            }
            this.$store.dispatch("cart/getCartList");
        },
    },
    
    全选按钮 核心代码
    ```html
    <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllchecked" />
        <span>全选</span>
    </div>
    ```
    computed: {
        isAllchecked: {
            async set(val) {
                if (this.CartList[0]) {
                    for (const key in this.CartList[0]["cartInfoList"]) {
                        await this.$store.dispatch("cart/setCheckCart", {
                        skuID: this.CartList[0]["cartInfoList"][key].skuId,
                        isChecked: val,
                        });
                    }
                    this.$store.dispatch("cart/getCartList");
                }
            },
            get() {
                if (
                this.CartList[0] &&
                this.CartList[0]["cartInfoList"].length == this.totalSum
                ) {
                    return true;
                }
                return false;
            },
        },
    },
</pre>

# 第五十七步  增加已选择多少商品和已选总价的计算
<pre>
    计算一共选择了多少件商品 和 已选商品的总价格
    ```html
    <div class="money-box">
        <div class="chosed">
            已选择 
            <span>{{ totalSum }}</span>
            件商品
        </div>
        <div class="sumprice">
        <em>总价（不含运费） ：</em>
        <i class="summoney">{{ totalPrice }}</i>
    </div>
    ```
    computed: {
        //已选商品的总价计算
        totalPrice() {
            let price = 0;
            if (this.CartList[0]) {
                this.CartList[0]["cartInfoList"].forEach((element) => {
                    if (element.isChecked) price += element.skuNum * element.skuPrice;
                });
            }
            return price;
        },
        //已选商品的数量
        totalSum() {
            let sum = 0;
            if (this.CartList[0]) {
                this.CartList[0]["cartInfoList"].forEach((element) => {
                    if (element.isChecked) sum++;
                });
            }
            return sum;
        },
    }
</pre>

# 第五十八步 增加对购物车商品数量的修改
<pre>
    使用添加到购物车的接口
    /api/cart/addToCart/{skuId}/{skuNum}

    ---view
        ---ShopCart
            ---index.vue
        核心代码:
        ```html
        <a
            @click="
            updateCartNum(
            cartInfo.skuId,
            cartInfo.skuNum,
            cartInfo.skuNum - 1
            )
            "
            class="mins"
            >-
        </a>
        <input
            autocomplete="off"
            type="text"
            :value="cartInfo.skuNum"
            minnum="1"
            class="itxt"
            @change="updateCartNum(cartInfo.skuId, cartInfo.skuNum, null)"
        />
        <a
            @click="
            updateCartNum(
            cartInfo.skuId,
            cartInfo.skuNum,
            cartInfo.skuNum + 1
            )
            "
            class="plus"
        >+
        </a>
        ```
        methods:{
            async updateCartNum(id, oldnum, newnum) {
                if (newnum == null) {
                    newnum = parseInt(event.target.value);
                }
                if (newnum <= 0 || parseInt(oldnum) == parseInt(newnum)) {
                    event.target.value = oldnum;
                    return;
                }
                const num = newnum - oldnum;
                await this.$store.dispatch("details/addToCart", {
                    skuId: id,
                    skuNum: num,
                });
                this.$store.dispatch("cart/getCartList");
            },
        }
</pre>

# 第五十九步 增加对购物车商品删除的操作
<pre>
    增加接口api
    ---api
        ---index.js
    //8.删除购物车商品
    export const reqDelCart = (skuID) => {
        return requests({
            url: `/cart/deleteCart/${skuID}`,
            method: 'delete',
        })
    }
    增加vuex仓库的操作
    ---store
        ---cart
            ---index.js
        async delCart({ commit }, skuID) {
            const result = await reqDelCart(skuID);
            if (result.code == 200) {
                return true
            }
            return false
        },
    
    单个商品的删除操作
    ---view
        ---ShopCart
            ---index.vue
    核心代码:
    ```html
    <a @click="delCart(cartInfo.skuId)" class="sindelet">删除</a>
    ```
    methods: {
        async delCart(id, refresh = true) {
            await this.$store.dispatch("cart/delCart", id);
            if (refresh) {
                this.$store.dispatch("cart/getCartList");
            }
        }
    }

    对已选的商品进行批量删除操作
    ```html
    <a @click="delSelectCart">删除选中的商品</a>
    ```
    methods: {
        async delSelectCart() {
            //删除被选中的所有
            if (this.CartList[0]) {
                for (const index in this.CartList[0]["cartInfoList"]) {
                    if (this.CartList[0]["cartInfoList"][index]["isChecked"]) {
                        await this.delCart(
                            this.CartList[0]["cartInfoList"][index]["skuId"],
                            false
                        );
                    }
                }
                this.$store.dispatch("cart/getCartList");
            }
        }
    }
</pre>

# 第六十步 修改注册和登录的静态组件
<pre>
    ---view
        ---Register
            ---index.vue
    
    ---view
        ---Login
            ---index.vue
</pre>

# 第六十一步 增加注册获取验证码的api接口 和 vuex注册仓库获取验证码
<pre>
    ---api
        ---index.js
        核心代码
        export const reqgetRegisterCode = (phone) => {
            return requests({
                url: `/user/passport/sendCode/${phone}`,
                method: 'get',
            })
        }
    ---store
        ---register
            ---index.js
        核心代码
    const state = {
        code: ''
    }
    const mutations = {
        SETCODE(states, data) {
            states.code = data
        }
    }
    const actions = {
        async getRegisterCode({ commit }, phone) {
            const result = await reqgetRegisterCode(phone);
            if (result.code == 200) {
                commit("SETCODE", result.data)
            } else {
                commit("SETCODE", "请重试")
            }
        }
    }
</pre>

# 第六十二步 为注册组件的获取验证码按钮添加事件
<pre>
    ---view
        ---Register
            ---index.vue
        核心代码:
        ```html
        <input
          v-model.number="phone"
          type="text"
          placeholder="请输入你的手机号"
        />

        <input v-model="code" type="text" placeholder="请输入验证码" />
        <button
          @click="getRegisterCode"
          style="width: 100px; height: 38px; margin-left: 5px"
        >
          获取验证码
        </button>
        ```
        核心代码:
        data() {
            return {
                phone: "",
                code:""
            }
        }
        methods:{
            async getRegisterCode() {
                if (!(this.phone >= 10000000000 && this.phone <= 99999999999)) {
                    this.phoneerrormsg = "请输入正确的手机号码";
                    return;
                }
                this.phoneerrormsg = "";
                await this.$store.dispatch("register/getRegisterCode", this.phone);
                this.code = this.$store.state.register.code;
            },
        }
</pre>

# 第六十三步 增加注册表单提交api 和 vuex注册仓库表单提交
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqgetRegister = (req) => {
            return requests({
                url: `/user/passport/register`,
                method: 'post',
                data: req
            })
        }
    ---store
        ---register
            ---index.js
        核心代码:
        const action = {
            async getRegister({ commit }, req) {
                const result = await reqgetRegister(req);
                return result
            },
        }
</pre>

# 第六十四步 为注册组件的注册按钮添加注册事件
<pre>
    ---view
        ---Register
            ---index.vue
        核心代码：
        ```html
        <button @click="registerSubmit">完成注册</button>
        ```
        核心代码:
        methods:{
            async registerSubmit() {
                let flag = true;
                if (!this.isPhone()) flag = false;
                if (!this.isCode()) flag = false;
                if (!this.ispassword1()) flag = false;
                if (!this.ispassword2()) flag = false;
                if (!this.isagree()) flag = false;
                if (flag) {
                    const req = {
                        phone: this.phone,
                        password: this.password1,
                        code: this.code,
                    };
                    let result = await this.$store.dispatch("register/getRegister", req);
                    if (result.code == 200) {
                        alert("注册成功！1S后自动跳转登录页面");
                        setTimeout(() => {
                            this.$router.push("/login");
                        }, 1000);
                    } else {
                        alert(result.message);
                    }
                }
            },
        }
</pre>

# 第六十五步 增加登录表单提交api 和 vuex登录仓库表单提交（并持久化token）
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqgetLogin = (req) => {
            return requests({
                url: `/user/passport/login`,
                method: 'post',
                data: req
            })
        }
    ---store
        ---login
            ---index.js
        核心代码:
        const state = {
            token: localStorage.getItem("token") || ""
        }
        const mutations = {
            SETTOKEN(states, data) {
                states.token = data
                localStorage.setItem("token", data)
            }
        }
        const actions = {
            async getLogin({ commit }, req) {
                const result = await reqgetLogin(req);
                if (result.code == 200) {
                    commit("SETTOKEN", result.data.token)
                    return true;
                }
                else
                    return false
            },
        }
</pre>

# 第六十六步 为登录组件的登录按钮 登录事件
<pre>
    ---view
        ---Login
            ---index.vue
        核心代码:
        ```html
        <input
        v-model="phone"
        type="text"
        placeholder="邮箱/用户名/手机号"
        />
        <input
        v-model="password"
        type="text"
        placeholder="请输入密码"
        />
        <button @click.prevent="login" class="btn">
        登&nbsp;&nbsp;录
        </button>
        ```
        核心代码:
        data() {
            return {
                phone: "",
                password: "",
            };
        },
        methods: {
            async login() {
                const req = {
                    phone: this.phone,
                    password: this.password,
                };
                let result = await this.$store.dispatch("login/getLogin", req);
                if (result) {
                    alert("登录成功！1s后返回主页");
                    setTimeout(() => {
                        this.$router.push("/home");
                    }, 1000);
                } else {
                    alert("登录失败");
                }
            },
        }
</pre>

# 第六十七步 增加自动登录验证api,增加发送请求的用户头 和 vuex自动登录验证保持用户信息
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqgetUserInfo = () => {
            return requests({
                url: `/user/passport/auth/getUserInfo`,
                method: 'get',
            })
        }
    ---api
        --request.js
        核心代码:
        //请求拦截器 里面有header请求等信息
        requests.interceptors.request.use((config) => {
            NProgress.start();
            config.headers.userTempId = GETUUID()
            //新增代码:
            config.headers.token = GETTOKEN()
            return config
        })
    ---utils
        ---token.js
        核心代码:为上面的请求头获取token提供获取函数
        export const GETTOKEN = function () {
            let token = localStorage.getItem("token");
            return token;
        }
    ---store
        ---login
            ---index.js
        核心代码:
        const state = {
            UserInfo: {}
        }
        const mutations = {
            SETUSERINFO(states, data) {
                states.UserInfo = data
            }
        }
        const actions = {
            async getUserInfo({ commit }) {
                const result = await reqgetUserInfo();
                if (result.code == 200) {
                    commit("SETUSERINFO", result.data)
                    return 'ok';
                }
                else {
                    return Promise.reject(new Error('faile'))
                }
            }
        }
</pre>

# 第六十八步 Header、Login 使用自动登录 并且Header判断是否登录->顶部显示内容不同
<pre>
    ---components
        ---Header
            ---index.vue
        核心代码:
        ```html
        <p v-if="!UserInfo.id">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
        </p>
        <p v-if="UserInfo.id">
            <span>欢迎{{ UserInfo.name }}</span>
            <a> 退出登录</a>
        </p>
        ```
        computed: {
            ...mapState("login", ["UserInfo"]),
        },
        async mounted() {
            this.$bus.$on("clearSearchKeyWord", this.clearSearchKeyWord);
            try {
                await this.$store.dispatch("login/getUserInfo");
            } catch (error) {
                console.log("自动登录失败");
            }
        },
    ---view
        ---Login
            ---index.vue
        methods: {
            async login() {
                const req = {
                    phone: this.phone,
                    password: this.password,
                };
                let result = await this.$store.dispatch("login/getLogin", req);
                if (result) {
                    //新增代码 不在是立即跳转到home 而是先实现自动登录然后跳转到 /home
                    try {
                        await this.$store.dispatch("login/getUserInfo");
                        this.$router.push("/home");
                    } catch (error) {
                        console.log("自动登录失败");
                    }
                } else {
                    alert("登录失败");
                }
            }
        }
</pre>

# 第六十九步 增加退出登录api 和 vuex退出登录接口
<pre>
    ---api
        ---index.js
        核心代码:
        //退出登录
        export const reqLogout = () => {
            return requests({
                url: `/user/passport/logout`,
                method: 'get',
            })
        }
    ---store
        ---login
            ---index.js
        const actions = {
            async Logout({ commit }) {
                const result = await reqLogout();
                if (result.code == 200) {
                    commit("SETUSERINFO", {})
                    commit("SETTOKEN", "")
                    return 'ok';
                }
                else {
                    return Promise.reject(new Error('faile'))
                }
            }
        }
</pre>

# 第七十步 为Header增加退出登录 重置token，重置UserInfo
<pre>
    ---components
        ---Header
            ---index.vue
        核心代码:
        ```html
        <a @click="Logout" style="cursor: pointer"> 退出登录</a>
        ```
        核心代码:
        const actions = {
            async Logout({ commit }) {
                const result = await reqLogout();
                if (result.code == 200) {
                    commit("SETUSERINFO", {})
                    commit("SETTOKEN", "")
                    return 'ok';
                }
                else {
                    return Promise.reject(new Error('faile'))
                }
            }
        }
</pre>

# 第七十一步 移除六十八步的Header、Login 使用自动登录,在路由前置守卫进行自动登录验证
<pre>
    ---router
        ---index.js
        核心代码:
        import store from '@/store'
        router.beforeEach(async (to, from, next) => {
            try {
                await store.dispatch("login/getUserInfo");
            } catch (error) {
                console.log("自动登录失败");
            }
            //meta.isLogin 没有参数 则这个页面不需要登录 或者 登录都可以访问
            if (to.meta.isLogin == undefined) {
                next();
                return
            }
            //meta.isLogin 为true 表示此页面必须要登录
            if (to.meta.isLogin == true && store.state.login.UserInfo.name != undefined){
                next();
                return
            }
            //meta.isLogin 为false 表示此页面必须要为不登录才能访问
            if (to.meta.isLogin == false && store.state.login.UserInfo.name ==undefined){
                next();
                return
            }
            //meta.isLogin 为true 表示此页面必须要登录，但是用户没有登录 跳转登录页面
            if (to.meta.isLogin)
                next('/login')
            else
                next('/home')
        })
</pre>
# 第七十二步 新增订单提交页面Trade 并 设置 /trade 路由
<pre>
    ---view
        ---Trade
            ---index.vue
        详情看文件
    ---router
        index.js
        核心代码:
        {
            path: '/trade',
            component: Trade,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
        },    
</pre>

# 第七十三步 为购物车提交订单按钮 设置跳转
<pre>
    ---view
        ---ShopCart
            ---index.vue
        核心代码:
        ```html
        <router-link class="sum-btn" to="/trade">结算</router-link>
        ```
</pre>

# 第七十四步 添加 获取用户地址信息api  和 vuex 获取用户地址接口
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqgetUserAddress = () => {
            return requests({
                url: `/user/userAddress/auth/findUserAddressList`,
                method: 'get'
            })
        }
    ---store
        ---login
            ---index.js
        核心代码:
        const state = {
            UserAddress: []
        }
        const mutations = {
            SETUSERADDRESS(states, data) {
                states.UserAddress = data
            }
        }
        const actions = {
            async getUserAddress({ commit }) {
                const result = await reqgetUserAddress();
                if (result.code == 200) {
                    commit("SETUSERADDRESS", result.data)
                } else {
                    return Promise.reject(new Error("faile"))
                }
            }
        }
</pre>
# 第七十五步 订单提交页面Trade组件 使用地址接口 ,并且增加 点击切换地址，底部信息修改
<pre>
    ---view
        ---index.vue
        核心代码
        ```html
        <div
        @click="setDefaultAddress(user.id)"
        class="address clearFix"
        v-for="user of isAddress"
        :key="user.id"
        >
            <span
            class="username"
            :class="{ selected: user.isDefault == 1 ? true : false }"
            >{{ user.consignee }}</span
            >
            <p>
                <span class="s1">{{ user.fullAddress }}</span>
                <span class="s2">{{ user.phoneNum }}</span>
                <span class="s3">默认地址</span>
            </p>
        </div>

        <div class="trade">
            <div class="price">应付金额:　<span>¥5399.00</span></div>
            <div class="receiveInfo">
            寄送至:
            <span>{{ fullAddress }}</span>
            收货人：<span>{{ consignee }}</span>
            <span>{{ phoneNum }}</span>
            </div>
        </div>
        ```
        核心代码:
        data() {
            return {
                isAddress: {},
                consignee: "",
                fullAddress: "",
                phoneNum: "",
            };
        },
        computed: {
            ...mapState("login", ["UserAddress"]),
        },
        watch: {
            UserAddress() {
                this.isAddress = this.UserAddress;
            },
            isAddress: {
                deep: true,
                handler() {
                    for (const index in this.isAddress) {
                        if (this.isAddress[index].isDefault == 1) {
                            this.consignee = this.isAddress[index].consignee;
                            this.fullAddress = this.isAddress[index].fullAddress;
                            this.phoneNum = this.isAddress[index].phoneNum;
                        }
                    }
                },
            },
        },
        methods: {
            setDefaultAddress(id) {
                for (const index in this.isAddress) {
                    if (this.isAddress[index].id == id) 
                        this.isAddress[index].isDefault = 1;
                    else 
                        this.isAddress[index].isDefault = 0;
                }
            },
        },
        async mounted() {
            try {
                await this.$store.dispatch("login/getUserAddress");
            } catch (error) {
                console.log("获取地址失败");
            }
        }
</pre>

# 第七十六步 添加 获取订单交易页信息api  和 vuex 获取用户订单交易页信息接口
<pre>
    ---api
        ---index.js
        export const reqgetTradeInfo = () => {
            return requests({
                url: `/order/auth/trade`,
                method: 'get'
            })
        }
    ---store
        ---trade
            ---index.js
        const state = {
            OrderInfo: {}
        }
        const mutations = {
            SETORDERINFO(states, data) {
                states.OrderInfo = data
            }
        }
        const actions = {
            async getTradeInfo({ commit }) {
                const request = await reqgetTradeInfo();
                if (request.code == 200) {
                    commit("SETORDERINFO", request.data)
                }
                else {
                    return Promise.reject(new Error("faile"))
                }
            }
        }
</pre>

# 第七十七步 订单提交页面Trade组件 使用订单交易页信息接口接口
<pre>
    ---view
        ---Trade
            ---index.vue
        核心代码:
        ```html
        <div class="detail">
            <h5>商品清单</h5>
            <ul
            class="list clearFix"
            v-for="detail of detailArrayList"
            :key="detail.skuId"
            >
                <li>
                    <img
                    style="width: 100px; height: 100px"
                    :src="detail.imgUrl"
                    alt=""
                    />
                </li>
                <li>
                    <p>{{ detail.skuName }}</p>
                </li>
                <li>
                    <h3>￥{{ detail.orderPrice }}</h3>
                </li>
                <li>X{{ detail.skuNum }}</li>
                <li>有货</li>
            </ul>
        </div>
        ```
        核心代码:
        data() {
            return {
                detailArrayList: [],
            };
        },
        computed: {
            ...mapState("trade", ["OrderInfo"]),
        },
        watch: {
            OrderInfo() {
                this.detailArrayList = this.OrderInfo.detailArrayList;
            },
        },
        async mounted() {
            try {
                await this.$store.dispatch("trade/getTradeInfo");
            } catch (error) {
                console.log("获取订单信息失败");
            }
        }
</pre>

# 第七十八步 订单提交页面Trade组件 增加订单数量，订单总价，订单备注的添加
<pre>
    ---view
        ---Trade
            ---index.vue
        核心代码:
        ```html
        <div class="bbs">
            <h5>买家留言：</h5>
            <textarea
            v-model="orderComment"
            placeholder="建议留言前先与商家沟通确认"
            class="remarks-cont">
            </textarea>
        </div>
        <b><i>{{ detailNums }}</i>件商品，总商品金额</b>
        <span>¥{{ detailSumPrice }}</span>
         应付金额:　<span>¥{{ detailSumPrice }}</span>
        ```
        核心代码:
        data() {
            return {
                detailNums: 0,
                detailSumPrice: 0,
                orderComment: "",
            };
        },
        watch: {
            OrderInfo() {
                this.detailArrayList = this.OrderInfo.detailArrayList;
                this.detailNums = this.OrderInfo.totalNum;
                this.detailSumPrice = this.OrderInfo.totalAmount;
            }
        },
</pre>

# 第七十九步 添加 提交订单信息api
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqSubmitOrder = ({ tradeNo, req }) => {
            return requests({
                url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
                method: 'post',
                data: req
            })
        }
</pre>

# 第八十步 将API接口 全部暴露到Vue实例的自定义全局总线上面,可以让组件随时可以使用接口api
<pre>
    ---main.js
        核心代码:
        import * as API from '@/api'
        new Vue({
            render: h => h(App),
            beforeCreate() {
                Vue.prototype.$bus = this
                //新增代码:
                Vue.prototype.$API = API
            },
            router,
            store,
            mounted() {
                this.$store.dispatch("home/getBaseCategoryList");
            }
        }).$mount('#app')

</pre>

# 第八十一步 Trade组件 提交订单信息
<pre>
    ---view
        ---Trade
            ---index.vue
        核心代码:
        ```html
        <a class="subBtn" @click="submitOrder">提交订单</a>
        ```
        核心代码:
        methods: {
            async submitOrder() {
                const tradeNo = this.OrderInfo.tradeNo;
                const req = {
                    consignee: this.consignee,
                    consigneeTel: this.phoneNum,
                    deliveryAddress: this.fullAddress,
                    paymentWay: "ONLINE",
                    orderComment: this.orderComment,
                    orderDetailList: this.detailArrayList,
                };
                const requslt = await this.$API.reqSubmitOrder({ tradeNo, req });
                if (requslt.code == 200) {
                    console.log("提交成功!" + requslt.data);

                } else {
                    alert("提交失败！" + requslt.message);
                }
            }
        },
</pre>

# 第八十二步 新增Pay组件 并添加其路由
<pre>
    ---router
        ---index.js
        核心代码:
        import Pay from '@/views/Pay'
        {
            path: '/pay',
            component: Pay,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
        }
    ---view
        ---Pay
            ---index.vue
        详情查看源文件
</pre>

# 第八十三步 为Trade组件 提交按钮 提交成功后 增加编程式路由跳转
<pre>
    ---view
        ---Trade
            ---index.vue
        核心代码:
        methods: {
            async submitOrder() {
                const tradeNo = this.OrderInfo.tradeNo;
                const req = {
                    consignee: this.consignee,
                    consigneeTel: this.phoneNum,
                    deliveryAddress: this.fullAddress,
                    paymentWay: "ONLINE",
                    orderComment: this.orderComment,
                    orderDetailList: this.detailArrayList,
                };
                const requslt = await this.$API.reqSubmitOrder({ tradeNo, req });
                if (requslt.code == 200) {
                    console.log("提交成功!" + requslt.data);
                    //新增代码:
                    this.$router.push({
                        path: "/pay",
                        query: {
                            orderId: requslt.data,
                        },
                    });
                } else {
                    alert("提交失败！" + requslt.message);
                }
            }
        },
</pre>

# 第八十四步 添加 获取订单支付信息api 并 vuex -> Pay 可以获取支付信息
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqgetOrderInfo = (orderId) => {
            return requests({
                url: `/payment/weixin/createNative/${orderId}`,
                method: 'get'
            })
        }
    ---store
        ---Pay
            ---index.js
        核心代码:
        const state = {
            OrderInfo: {}
        }
        const mutations = {
            SETORDERINFO(states, data) {
                states.OrderInfo = data
            }
        }

        const actions = {
            async getOrderInfo({ commit }, orderId) {
                const result = await reqgetOrderInfo(orderId);
                if (result.code == 200) {
                    commit("SETORDERINFO", result.data)
                }
                else {
                    return Promise.reject(new Error("faile"))
                }
            }
        }
</pre>

# 第八十五步 Pay组件根据 query的请求参数是否有进行前置路由的筛选
<pre>
    ---view
        ---Pay
            ---index.vue
        beforeRouteEnter(to, from, next) {
            if (to.query.orderId) next();
            else next("/");
        }
</pre>

# 第八十六步 Pay组件 挂载之后 获取订单信息 并做展示
<pre>
    ---view
        ---Pay
            ---index.vue
        核心代码:
        ```html
        <em class="lead">应付金额：</em>
        <em class="orange money">￥{{ OrderInfo.totalFee }}</em>
        ```
        核心代码:
        data() {
            return {
                orderId: "",
            };
        },
        computed: {
            ...mapState("pay", ["OrderInfo"]),
        },
        mounted() {
            this.getOrderInfo();
        },
        methods: {
            async getOrderInfo() {
                try {
                    this.orderId = this.$route.query.orderId;
                    await this.$store.dispatch("pay/getOrderInfo", this.orderId);
                } catch (error) {
                    this.$router.go(-1);
                }
            }
        }
</pre>

# 第八十七步 引用element UI 的 MessageBox 组件
<pre>
    ---main.js
    核心代码:
    import { MessageBox } from 'element-ui';
    Vue.prototype.$alert = MessageBox.alert;
</pre>

# 第九十步 Pay组件 对立即支付按钮 使用 MessageBox 组件
<pre>
    ---view
        ---Pay
            ---index.vue
        核心代码:
        ```html
        <a class="btn" @click="open">立即支付</a>
        ```
        核心代码:
        methods: {
            open() {
                this.$alert(`我是图片应该在的位置`,"请使用微信扫码支付",
                {
                dangerouslyUseHTMLString: true,
                center: true,
                showClose: false,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: "支付遇见问题",
                confirmButtonText: "我已支付",
                }
                )
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
</pre>

# 第九十一步 安装qrcode插件 用于生成二维码
<pre>
    ---安装 二维码插件 qrcode
    npm i qrcode

    ---main.js
        核心代码:
        import QRCode from 'qrcode'
        Vue.prototype.$QRCode = QRCode
</pre>

# 第九十二步 在Pay组件 对二维码插件进行使用
<pre>
    ---view
        ---Pay
            ---index.vue
        核心代码:
        ```html
        <a class="btn" @click="open">立即支付</a>
        ```
        核心代码:
        data() {
            return {
                //保存图片二维码地址
                imgurl: "",
            };
        },
        methods: {
            async getOrderInfo() {
                try {
                    this.orderId = this.$route.query.orderId;
                    await this.$store.dispatch("pay/getOrderInfo", this.orderId);
                    //二维码的图片的生成
                    this.$QRCode.toDataURL(this.OrderInfo.codeUrl).then((url) => {
                        this.imgurl = url;
                    });
                } 
                catch (error) {
                    this.$router.go(-1);
                }
            },
            open() {
                this.$alert(
                `<img src='${this.imgurl}' alt='二维码已经失效'/>`,
                "请使用微信扫码支付",
                {
                dangerouslyUseHTMLString: true,
                center: true,
                showClose: false,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: "支付遇见问题",
                confirmButtonText: "我已支付",
                }
                )
                .then((data) => {
                console.log(data);
                })
                .catch((error) => {
                console.log(error);
                });
            },
        },
</pre>

# 第九十三步 增加查询支付状态api
<pre>
    ---api
        ---index.js
        核心代码:
        export const reqgetPayStatus = (orderId) => {
            return requests({
                url: `/payment/weixin/queryPayStatus/${orderId}`,
                method: 'get'
            })
        }
</pre>

# 第九十四步 Pay组件定时发送请求 获取支付状态
<pre>
    ---view
        ---Pay
            ---index.vue
        核心代码:
        methods: {
            open() {
                this.$alert(
                `<img src='${this.imgurl}' alt='二维码已经失效'/>`,
                "请使用微信扫码支付",
                {
                dangerouslyUseHTMLString: true,
                center: true,
                showClose: false,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: "支付遇见问题",
                confirmButtonText: "我已支付",
                }
                )
                .then(async (data) => {
                    console.log(data);
                    clearInterval(this.timmer);
                    this.timmer = undefined;
                    const result = await this.$API.reqgetPayStatus(this.orderId);
                    if (result.code == 200) {
                        clearInterval(this.timmer);
                        this.timmer = undefined;
                        console.log("支付成功");
                    } else {
                        console.log("未支付成功");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    clearInterval(this.timmer);
                    this.timmer = undefined;
                });
                if (!this.timmer)
                    this.timmer = setInterval(async () => {
                        const result = await this.$API.reqgetPayStatus(this.orderId);
                        if (result.code == 200) {
                            clearInterval(this.timmer);
                            this.timmer = undefined;
                            console.log("支付成功");
                            this.$msgbox.close();
                        } else {
                            console.log(result.message);
                        }
                    }, 2000);
            }
        }
</pre>

# 第九十五步 新增PaySuccess页面 和 路由设置
<pre>
    ---view
        ---PaySuccess
            ---index.vue
        详情查看文件
    ---router
        ---index.js
        核心代码:
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
        },    
</pre>

# 第九十六步 Pay组件 支付成功跳转 PaySuccess路由
<pre>
    ---view
        ---Pay
            ---index.vue
        核心代码:
        this.$router.push("/paysuccess");
</pre>

# 第九十七步 新增Center组件 和 他的2个子组件 MyOrder 和 GroupOrder，并配置路由
<pre>
    ---view
        ---Center
            ---index.vue
            核心代码:
            ```html
            <dd><router-link to="/center/myorder">我的订单</router-link></dd>
            <dd><router-link to="/center/grouporder">团购订单</router-link></dd>
            
             <!-- 右侧内容 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            ```
            ---MyOrder
                ---index.vue
            ---GroupOrder
                ---index.vue
    ---rouer
        ---index.vue
        核心代码:
        import Center from '@/views/Center'
        import MyOrder from '@/views/Center/MyOrder'
        import GroupOrder from '@/views/Center/GroupOrder'
        {
            path: '/center',
            component: Center,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
            redirect: '/center/myorder',
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,
                    meta: {
                        isShowFooterList: true,
                        isLogin: true
                    },
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                    meta: {
                        isShowFooterList: true,
                        isLogin: true
                    },
                }
            ]
        }
</pre>

# 第九十八步 添加获取我的订单列表API
<pre>
    ---api
        ---index.vue
        核心代码:
        export const reqgetOrderList = ({ page, limit }) => {
            return requests({
                url: `/order/auth/${page}/${limit}`,
                method: 'get'
            })
        }
</pre>

# 第九十九步 在MyOrder组件里面使用API获取订单参数
<pre>
    ---view
        ---Center
            ---MyOrder
                ---index.vue
            核心代码:
            ```html
            <div class="orders">
                <table
                class="order-item"
                v-for="records of orderList.records"
                :key="records.id"
                >
                    <thead>
                        <tr>
                            <th colspan="5">
                            <span class="ordertitle">
                            {{ records.createTime }}
                            订单编号：{{ records.outTradeNo }}
                                <span class="pull-right delete">
                                    <img src="../images/delete.png" />
                                </span>
                            </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(orderDetail, index) of records.orderDetailList"
                        :key="orderDetail.id"
                        >
                            <td width="60%">
                                <div class="typographic">
                                    <img
                                    :src="orderDetail.imgUrl"
                                    style="width: 100px; height: 100px"
                                    />
                                    <a href="#" class="block-text">
                                    {{ orderDetail.skuName }}
                                    </a>
                                    <span>x{{ orderDetail.skuNum }}</span>
                                    <a href="#" class="service">售后申请</a>
                                </div>
                            </td>
                            <template v-if="index == 0">
                                <td
                                :rowspan="records.orderDetailList.length"
                                width="8%"
                                class="center"
                                >
                                {{ records.consignee }}
                                </td>
                                <td
                                :rowspan="records.orderDetailList.length"
                                width="13%"
                                class="center"
                                >
                                    <ul class="unstyled">
                                        <li>总金额¥{{ records.totalAmount }}</li>
                                        <li>{{ records.paymentWay }}</li>
                                    </ul>
                                </td>
                                <td
                                :rowspan="records.orderDetailList.length"
                                width="8%"
                                class="center"
                                >
                                    <a href="#" class="btn">{{ records.orderStatusName }} </a>
                                </td>
                                <td
                                :rowspan="records.orderDetailList.length"
                                width="13%"
                                class="center"
                                >
                                    <ul class="unstyled">
                                        <li>
                                            <a href="mycomment.html" target="_blank">评价|晒单</a>
                                        </li>
                                    </ul>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
            ````
            核心代码:
            data() {
                return {
                    page: this.$route.params.page || 1,
                    limit: 3,
                    orderList: {},
                };
            },
            methods: {
                async getOrderList() {
                    let result = await this.$API.reqgetOrderList({
                    page: this.page,
                    limit: this.limit,
                    });
                    if (result.code == 200) {
                        this.orderList = result.data;
                    }
                }
            },
            mounted() {
                this.getOrderList();
            },
</pre>
# 第一百步 MyOrder组件 增加分页 使用element UI 
<pre>
    ---view
        ---Center
            ---MyOrder
                ---index.vue
        核心代码:
        ```html
        <div class="choose-order">
            <el-pagination
            :page-size="limit"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next,jumper"
            :total="orderList.total"
            :current-page.sync="page"
            prev-text="上一页"
            next-text="下一页"
            >
            </el-pagination>
        </div>
        ```
        核心代码:
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getOrderList();
            },
        },
</pre>

# 第一百零一步 增加用户体验->从必须要登录的地方跳转到登录页面 登录完成会跳转到原页面
<pre>
    ---router
        ---index.js
        核心代码:
        //从必须要登录的地方跳转到登录页面 在地址栏传个query参数
        if (to.meta.isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }
    ---view
        ---Login
            ---index.vue
        核心代码:
        methods: {
            async login() {
                const req = {
                    phone: this.phone,
                    password: this.password,
                };
                let result = await this.$store.dispatch("login/getLogin", req);
                if (result) {
                    //登录完成不在盲目的返回/home 如果有query参数则跳到query指定的地址
                    this.$router.push({
                        path: this.$route.query.redirect || "/home",
                    });
                }else {
                    alert("登录失败");
                }
            }
        },
</pre>

# 第一百零二步 增加安全->从必须要交易页面必须要从购物车跳转过来才行,支付成功页面必须要从支付页面跳转过来才行
<pre>
    ---router
        ---index.vue
        核心代码:
        {
            path: '/trade',
            component: Trade,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
            //新增代码：
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') next()
                else next(from.path)
            },
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                isShowFooterList: true,
                isLogin: true
            },
            //新增代码：
            beforeEnter: (to, from, next) => {
                if (from.path == '/pay') next()
                else next(from.path)
            },
        }
</pre>

# 第一百零三步 优化->安装懒加载插件 为图片添加懒加载 
<pre>
    安装懒加载插件
    npm i vue-lazyload
    使用懒加载
    1、新增一个加载动画和图片失效
    ---assets
        ---loading.gif
        ---error.jpg
    2、main.js注册使用
    ---main.js
        import VueLazyload from 'vue-lazyload'
        const loadimage = require('./assets/loading.gif')
        const errorimage = require('./assets/error.jpg')
        Vue.use(VueLazyload, {
            loading: loadimage,
            error: errorimage,
        })
    3、使用懒加载
    ---view
        ---Search
            ---Details
                ---index.vue
        核心代码:
        ```html
        <img v-lazy="good.defaultImg" alt="图片裂了 点我" />
        ```
</pre>

# 第一百零四步 优化->安装表单校验插件 vee-validate@2
<pre>
    安装表单校验插件
    npm install vee-validate@2
    新建文件
    ---utils
        ---validate.js
    
    ---mian.js
        核心代码:
        import '@/utils/validate'
</pre>
# 第一百零五步 优化->安装国家化插件 vue-i18n使表单校验插件支持中文
<pre>
    安装国际化插件
    npm i vue-i18n

    配置表单校验
    ---utils
        ---validate.js
        核心代码:
        import Vue from 'vue'
        import VeeValidate, { Validator } from 'vee-validate'
        import zh_CN from 'vee-validate/dist/locale/zh_CN'
        import VueI18n from 'vue-i18n';
        Vue.use(VueI18n)
        const i18n = new VueI18n({
            locale: 'zh_CN',
        })
        Vue.use(VeeValidate, {
                i18n,
                i18nRootKey: 'validation',
                dictionary: {
                zh_CN
            }   
        });
</pre>

# 第一百零六步 增加表单校验自定义选项
<pre>
    ---utils
        ---validate.js
        核心代码:
        Validator.extend('required', {
            getMessage: (field) => {
                //fidld为name的参数
                return field + '不能为空'
            },
            validate: value => {
                return !!value
            }
        })
        Validator.extend('phone', {
            getMessage: (field) => {
                return '请输入正确的手机号码'
            },
            validate: value => {
                return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)
            }
        })
        Validator.extend('ConfirmPassword', {
            getMessage: (field) => {
                return '密码不一致'
            },
            validate: (value, a) => {
                if (value == a) return true
                    return false
            }
        })
</pre>

# 第一百零七步 对Register注册组件 进行重写
<pre>
    ---view
        ---Regitser
            ---index.vue
        核心代码:
        ```html -> 手机号
        <div class="content">
            <label>手机号:</label>
            <input
            v-model.number="phone"
            type="text"
            placeholder="请输入你的手机号"
            v-validate="'required|phone'"
            name="手机号"
            />
            <span v-show="errors.first('手机号')" class="error-msg">
            {{ errors.first("手机号") }}
            </span>
        </div>
        ```
        ```html -> 验证码
        <div class="content">
            <label>验证码:</label>
            <input
                v-model="code"
                type="text"
                placeholder="请输入验证码"
                v-validate="'required'"
                name="验证码"
            />
            <button
                @click="getRegisterCode"
                style="width: 100px; height: 38px; margin-left: 5px"
            >
                获取验证码
            </button>
            <span v-show="errors.first('验证码')" class="error-msg">
                {{errors.first("验证码")}}
            </span>
        </div>
        ```
        ```html 登录密码
        <div class="content">
            <label>登录密码:</label>
            <input
            v-model="password1"
            type="password"
            placeholder="请输入你的登录密码"
            v-validate="'required|min:6'"
            name="登录密码"
            />
            <span v-show="errors.first('登录密码')" class="error-msg">
                {{errors.first("登录密码")}}
            </span>
        </div>
        ```
        ```html 确认密码
        <div class="content">
            <label>确认密码:</label>
            <input
            v-model="password2"
            type="password"
            placeholder="请输入确认密码"
            v-validate="{ required: true, ConfirmPassword: password1 }"
            name="确认密码"
            />
            <span v-show="errors.first('确认密码')" class="error-msg">
                {{errors.first("确认密码")}}
            </span>
        </div>
      ```
      ```html 用户协议
      <div class="controls">
        <input
          v-model="agree"
          name="用户协议"
          v-validate="'required'"
          type="checkbox"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span v-show="errors.first('用户协议')" class="error-msg">
            {{errors.first("用户协议")}}
        </span>
      </div>
      ```
        核心代码:
        data() {
            return {
                phone: "",
                code: "",
                password1: "",
                password2: "",
                agree: false,
            };
        },
        methods: {
            async getRegisterCode() {
                await this.$validator.validate("手机号").then(async (e) => {
                    if (e) {
                        await this.$store.dispatch("register/getRegisterCode", this.phone);
                        this.code = this.$store.state.register.code;
                    }
                });
            },
            async registerSubmit() {
                await this.$validator.validateAll().then(async (e) => {
                    if (e) {
                        const req = {
                            phone: this.phone,
                            password: this.password1,
                            code: this.code,
                        };
                        let result = await this.$store.dispatch("register/getRegister", req);
                        if (result.code == 200) {
                            alert("注册成功！");
                            this.$router.push("/login");
                        } else {
                            alert(result.message);
                        }
                    }
                });
            },
        } 
</pre>



