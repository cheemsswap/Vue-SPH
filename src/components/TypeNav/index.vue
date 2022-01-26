<template>
  <div class="type-nav">
    <div class="container" @mouseleave="clearCurIndex()">
      <h2 class="all" @mouseenter="setCurrIndex(99)">全部商品分类</h2>
      <nav class="nav" @mouseenter="clearCurIndex()">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="fade">
        <div class="sort" v-show="show">
          <div class="all-sort-list2">
            <div
              @click="goSearch"
              class="item"
              v-for="(cate, index) of CategoryList.slice(0, 16)"
              :key="cate.categoryId"
              @mouseenter="setCurrIndex(index)"
              :style="{
                'background-color': index == currentIndex ? '#ccc' : null,
              }"
            >
              <h3>
                <a
                  :data-categoryName="cate.categoryName"
                  :data-category1Id="cate.categoryId"
                  >{{ cate.categoryName }}</a
                >
                <!-- <router-link to="/search">{{ cate.categoryName }}</router-link> -->
              </h3>
              <div v-show="index == currentIndex" class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="ca of cate.categoryChild"
                    :key="ca.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="ca.categoryName"
                        :data-category2Id="ca.categoryId"
                        >{{ ca.categoryName }}</a
                      >
                      <!-- <router-link to="/search">{{
                      ca.categoryName
                    }}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c of ca.categoryChild" :key="c.categoryId">
                        <a
                          :data-categoryName="c.categoryName"
                          :data-category3Id="c.categoryId"
                          >{{ c.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{
                        c.categoryName
                      }}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash";
import { throttle, debounce } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: this.$route.path === "/home",
    };
  },
  methods: {
    setCurrIndex: throttle(function (index) {
      this.currentIndex = index;
      this.show = true;
    }, 10),
    clearCurIndex: function () {
      this.currentIndex = -1;
      this.show = this.$route.path === "/home";
    },
    goSearch(e) {
      if (e.target.tagName == "A") {
        const { categoryname, category1id, category2id, category3id } =
          e.target.dataset;
        this.$bus.$emit("clearSearchKeyWord");
        this.$router.push({
          path: "/search",
          query: {
            categoryName: categoryname,
            category1Id: category1id,
            category2Id: category2id,
            category3Id: category3id,
          },
        });
      }
    },
  },
  computed: {
    ...mapState("home", ["CategoryList"]),
  },
  mounted() {
    // this.$store.dispatch("home/getBaseCategoryList");
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active {
  animation: dw 0.25s;
  overflow: hidden;
}
.fade-leave-active {
  animation: dw reverse 0.25s;
  overflow: hidden;
}
@keyframes dw {
  0% {
    height: 0px;
  }
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          a {
            cursor: pointer;
          }
          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>