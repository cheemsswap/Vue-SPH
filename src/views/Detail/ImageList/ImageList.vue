<template>
  <div class="swiper-container">
    <button style="left: 0" @click="leftmove">《</button>
    <div class="container" ref="container">
      <img
        :class="{ active: index == active }"
        v-for="(skuImage, index) of skuImageList"
        :key="skuImage.id"
        :src="skuImage.imgUrl"
        @click="setimg(index, skuImage.imgUrl)"
      />
    </div>
    <button style="right: 0" @click="rightmove">》</button>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      left: 25,
      active: -1,
    };
  },
  methods: {
    leftmove() {
      const maxleft = -(this.skuImageList.length * 56 - 352);
      if (this.left <= maxleft) return;
      this.left -= 20;
      this.$refs["container"].style.left = `${this.left}px`;
    },
    rightmove() {
      this.left += 20;
      if (this.left >= 25) this.left = 25;
      this.$refs["container"].style.left = `${this.left}px`;
    },
    setimg(index, url) {
      this.active = index;
      this.$emit("setskuImg", url);
    },
  },
};
</script>

<style scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  margin-top: 5px;
  position: relative;
  overflow: hidden;
}
button {
  width: 25px;
  height: 100%;
  z-index: 999;
  position: absolute;
}
.container {
  position: absolute;
  width: 352px;
  height: 56px;
  display: flex;
  justify-content: start;
  left: 25px;
  z-index: 0;
}
img {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 2px;
  width: 50px;
  height: 50px;
  display: block;
  margin-right: 5px;
}
.active {
  border: 1px solid red;
}
</style>