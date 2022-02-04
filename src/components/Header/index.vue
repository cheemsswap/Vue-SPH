<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!UserInfo.id">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-if="UserInfo.id">
            <span>欢迎{{ UserInfo.name }}</span>
            <a @click="Logout" style="cursor: pointer"> 退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img :src="require('@/assets/logo.png')" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="serachKeyWord"
            @keydown.enter="search"
          />
          <button
            @click="search"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      serachKeyWord: "",
    };
  },
  computed: {
    ...mapState("login", ["UserInfo"]),
  },
  methods: {
    //搜索按钮回调
    search() {
      this.$router.push({
        path: "/search",
        query: {
          ...this.$route.query,
          keyWord: this.serachKeyWord,
          pageNo: 1,
        },
      });
    },
    clearSearchKeyWord() {
      this.serachKeyWord = "";
    },
    async Logout() {
      try {
        let result = await this.$store.dispatch("login/Logout");
      } catch (error) {
        console.log("退出登录失败");
      }
    },
  },
  async mounted() {
    this.$bus.$on("clearSearchKeyWord", this.clearSearchKeyWord);
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
