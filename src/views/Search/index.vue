<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <Bread
          :categoryName="categoryName"
          :keyword="keyword"
          :trademark="trademark"
          :prop="prop"
        />
        <Selector :trademarkList="trademarkList" :attrsList="attrsList" />
        <Details :goodsList="goodsList" />
        <Hotsale />
      </div>
    </div>
  </div>
</template>

<script>
import Bread from "@/views/Search/Bread";
import Selector from "@/views/Search/Selector";
import Details from "@/views/Search/Details";
import Hotsale from "@/views/Search/Hotsale";
import { mapState, mapGetters } from "vuex";
export default {
  components: { Bread, Selector, Details, Hotsale },
  name: "Search",
  computed: {
    // ...mapState("search", ["SearchInfo"]),
    ...mapGetters("search", ["trademarkList", "attrsList", "goodsList"]),
    categoryName() {
      return this.$route.query.categoryName;
    },
    keyword() {
      return this.$route.query.keyWord;
    },
    trademark() {
      return this.$route.query.trademark;
    },
    prop() {
      return this.$route.query.props;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const info = {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
        ...vm.$route.query,
      };
      vm.$store.dispatch("search/getSearchInfo", info);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const info = {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      categoryName: "",
      keyword: "",
      order: "1:asc",
      pageNo: 20,
      pageSize: 10,
      props: [],
      trademark: "",
      ...to.query,
    };
    this.$store.dispatch("search/getSearchInfo", info);
    next();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>