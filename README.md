
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
</pre>
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




