<template>
  <div id="app">
    我是根组件
    <test />
  </div>
</template>

<script>
import Test from "@/components/test.vue";
export default {
  name: "App",
  components: { Test },
};
</script>

<style>
</style>
