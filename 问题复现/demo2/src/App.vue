<template>
  <div id="app">
    <button @click="data++">点我更新{{ data }}</button>
    <button @click="$destroy()">点我销毁</button>
    <demo />
  </div>
</template>

<script>
import Demo from "./components/demo";
export default {
  name: "App",
  data() {
    return {
      data: 1,
    };
  },
  components: { Demo },
  beforeCreate() {
    console.log("app:beforeCreate");
  },
  created() {
    console.log("app:created");
  },
  beforeMount() {
    console.log("app:beforeMount");
  },
  mounted() {
    console.log("app:mounted");
  },
  beforeUpdate() {
    console.log("app:beforeUpdate");
  },
  updated() {
    console.log("app:updated");
  },
  beforeDestroy() {
    console.log("app:beforeDestroy");
  },
  destroyed() {
    console.log("app:destroyed");
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 300px;
  padding: 0px 50px;
  background-color: bisque;
}
</style>
