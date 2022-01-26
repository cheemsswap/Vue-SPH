<template>
  <div class="bread">
    <ul class="fl sui-breadcrumb">
      <li>
        <a href="#">全部结果</a>
      </li>
    </ul>
    <ul class="fl sui-tag">
      <li class="with-x" v-if="categoryName">
        {{ categoryName }}<i @click="clearcategoryName">×</i>
      </li>
      <li class="with-x" v-if="keyword">
        {{ keyword }}<i @click="clearkeyword">×</i>
      </li>
      <li class="with-x" v-if="trademark">
        {{ trademark.split(":")[1] }}<i @click="cleartrademark">×</i>
      </li>
      <li
        class="with-x"
        v-if="typeof prop == 'string'"
        @click="clearALLProps()"
      >
        {{ prop.split(":")[1] }}<i>×</i>
      </li>
      <template v-if="typeof prop == 'object'">
        <li
          class="with-x"
          v-for="(p, index) of prop"
          :key="`${p}+${index}`"
          @click="clearProps(p)"
        >
          {{ p.split(":")[1] }}<i>×</i>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Bread",
  props: ["categoryName", "keyword", "trademark", "prop"],
  methods: {
    clearcategoryName() {
      this.$router.push({
        query: {
          ...this.$route.query,
          categoryName: undefined,
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
        },
      });
    },
    clearkeyword() {
      this.$bus.$emit("clearSearchKeyWord");
      this.$router.push({
        query: {
          ...this.$route.query,
          keyWord: undefined,
        },
      });
    },
    cleartrademark() {
      this.$router.push({
        query: {
          ...this.$route.query,
          trademark: undefined,
        },
      });
    },
    clearALLProps() {
      this.$router.push({
        query: {
          ...this.$route.query,
          props: undefined,
        },
      });
    },
    clearProps(p) {
      const props = [...this.prop];
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
  },
};
</script>

<style lang="less" scoped>
.bread {
  margin-bottom: 5px;
  overflow: hidden;
  .sui-breadcrumb {
    padding: 3px 15px;
    margin: 0;
    font-weight: 400;
    border-radius: 3px;
    float: left;
    li {
      display: inline-block;
      line-height: 18px;
      a {
        color: #666;
        text-decoration: none;
        &:hover {
          color: #4cb9fc;
        }
      }
    }
  }
  .sui-tag {
    margin-top: -5px;
    list-style: none;
    font-size: 0;
    line-height: 0;
    padding: 5px 0 0;
    margin-bottom: 18px;
    float: left;
    .with-x {
      font-size: 12px;
      margin: 0 5px 5px 0;
      display: inline-block;
      overflow: hidden;
      color: #000;
      background: #f7f7f7;
      padding: 0 7px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #dedede;
      white-space: nowrap;
      transition: color 400ms;
      cursor: pointer;
      i {
        margin-left: 10px;
        cursor: pointer;
        font: 400 14px tahoma;
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      &:hover {
        color: #28a3ef;
      }
    }
  }
}
</style>