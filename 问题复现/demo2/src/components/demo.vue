<template>
  <div id="demo">
    <button @click="data++">点我更新{{ data }}</button>
    <button @click="$destroy()">点我销毁</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      data: 1,
    };
  },
  methods: {
    async abc() {
      console.log("abc-start");
      let result = await new Promise(function (data, error) {
        let flag = true;
        setTimeout(function () {
          if (flag) data("abc-end");
          else error();
        }, 2000);
      }).then((data) => {
        return data;
      });
      return result;
    },
    async a() {
      let reuslt = await this.abc();
      console.log(reuslt);
    },
  },
  beforeCreate() {
    console.log("demo:beforeCreate");
  },
  created() {
    console.log("demo:created");
    setTimeout(() => {
      console.log("setout");
    }, 5000);
  },
  beforeMount() {
    console.log("demo:beforeMount");
  },
  mounted() {
    console.log("demo:mounted");
    this.a();
  },
  beforeUpdate() {
    console.log("demo:beforeUpdate");
  },
  updated() {
    console.log("demo:updated");
  },
  beforeDestroy() {
    console.log("demo:beforeDestroy");
  },
  destroyed() {
    console.log("demo:destroyed");
  },
};
</script>

<style>
#demo {
  width: 100%;
  height: 200px;
  background-color: aqua;
}
</style>