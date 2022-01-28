<template>
  <div class="spec-preview" @mousemove="move">
    <img :src="Img" />
    <div class="event"></div>
    <div class="big">
      <img :src="Img" ref="bigimg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["Img"],
  methods: {
    move(event) {
      const mask = this.$refs["mask"];
      const bigimg = this.$refs["bigimg"];
      mask.style.top = `${
        (event.offsetY <= 100
          ? 100
          : event.offsetY >= 300
          ? 300
          : event.offsetY) - 100
      }px`;
      mask.style.left = `${
        (event.offsetX <= 100
          ? 100
          : event.offsetX >= 300
          ? 300
          : event.offsetX) - 100
      }px`;
      bigimg.style.top = `${-((event.offsetY - 100) * 2 <= 0
        ? 0
        : (event.offsetY - 100) * 2 >= 400
        ? 400
        : (event.offsetY - 100) * 2)}px`;
      bigimg.style.left = `${-((event.offsetX - 100) * 2 <= 0
        ? 0
        : (event.offsetX - 100) * 2 >= 400
        ? 400
        : (event.offsetX - 100) * 2)}px`;
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      height: 200%;
      position: absolute;
      left: 0px;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>