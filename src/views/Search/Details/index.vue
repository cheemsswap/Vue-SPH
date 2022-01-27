<template>
  <div class="details clearfix">
    <div class="sui-navbar">
      <div class="navbar-inner filter">
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
      </div>
    </div>
    <div class="goods-list">
      <ul class="yui3-g">
        <li class="yui3-u-1-5" v-for="good of goodsList" :key="good.id">
          <div class="list-wrap">
            <div class="p-img">
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
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i> {{ good.price }}</i>
              </strong>
            </div>
            <div class="attr">
              <a target="_blank" :title="good.title">{{ good.title }}</a>
            </div>
            <div class="commit">
              <i class="command">已有<span>2000</span>人评价</i>
            </div>
            <div class="operate">
              <a
                href="success-cart.html"
                target="_blank"
                class="sui-btn btn-bordered btn-danger"
                >加入购物车</a
              >
              <a href="javascript:void(0);" class="sui-btn btn-bordered"
                >收藏</a
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="display: flex; justify-content: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPages * 10"
        @current-change="changePage"
        :current-page="parseInt(currentPage)"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //0代表 未激活，-1代表降序  1代表升序
      ComprehenSive: 1,
      Price: 0,
    };
  },
  name: "Details",
  props: ["goodsList", "totalPages"],
  computed: {
    currentPage() {
      //返回当前页数
      return this.$route.query.pageNo || 1;
    },
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
    changePage(val) {
      this.$router.push({
        query: {
          ...this.$route.query,
          pageNo: val,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.details {
  margin-bottom: 5px;
  .sui-navbar {
    overflow: visible;
    margin-bottom: 0;
    .filter {
      min-height: 40px;
      padding-right: 20px;
      background: #fbfbfb;
      border: 1px solid #e2e2e2;
      padding-left: 0;
      border-radius: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
      .sui-nav {
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
        li {
          float: left;
          line-height: 18px;
          a {
            display: block;
            cursor: pointer;
            padding: 11px 15px;
            color: #777;
            text-decoration: none;
          }
          &.active {
            a {
              background: #e1251b;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .goods-list {
    margin: 20px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
        .list-wrap {
          .p-img {
            padding-left: 15px;
            width: 215px;
            height: 255px;
            a {
              color: #666;
              img {
                max-width: 100%;
                height: auto;
                vertical-align: middle;
              }
            }
          }
          .price {
            padding-left: 15px;
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: -5px;
              }
            }
          }
          .attr {
            padding-left: 15px;
            width: 85%;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a {
              color: #333;
              text-decoration: none;
            }
          }
          .commit {
            padding-left: 15px;
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            span {
              font-weight: 700;
              color: #646fb0;
            }
          }
          .operate {
            padding: 12px 15px;
            .sui-btn {
              display: inline-block;
              padding: 2px 14px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 0;
              background-color: transparent;
              margin-right: 15px;
            }
            .btn-bordered {
              min-width: 85px;
              background-color: transparent;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              &:hover {
                border: 1px solid #666;
                color: #fff !important;
                background-color: #666;
                text-decoration: none;
              }
            }
            .btn-danger {
              border: 1px solid #e1251b;
              color: #e1251b;
              &:hover {
                border: 1px solid #e1251b;
                background-color: #e1251b;
                color: white !important;
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
  .page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    float: right;
    .sui-pagination {
      margin: 18px 0;
      ul {
        margin-left: 0;
        margin-bottom: 0;
        vertical-align: middle;
        width: 490px;
        float: left;
        li {
          line-height: 18px;
          display: inline-block;
          a {
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #e0e9ee;
            margin-left: -1px;
            font-size: 14px;
            padding: 9px 18px;
            color: #333;
          }
          &.active {
            a {
              background-color: #fff;
              color: #e1251b;
              border-color: #fff;
              cursor: default;
            }
          }
          &.prev {
            a {
              background-color: #fafafa;
            }
          }
          &.disabled {
            a {
              color: #999;
              cursor: default;
            }
          }
          &.dotted {
            span {
              margin-left: -1px;
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              font-size: 14px;
              border: 0;
              padding: 9px 18px;
              color: #333;
            }
          }
          &.next {
            a {
              background-color: #fafafa;
            }
          }
        }
      }
      div {
        color: #333;
        font-size: 14px;
        float: right;
        width: 241px;
      }
    }
  }
}
</style>