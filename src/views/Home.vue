<template>
  <div class="home">
    home
    <i class="iconfont icon-check"></i>
    <div class="box-wrapper">
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
    <div
      class="px2vm"
    >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae harum dolorum libero ipsa hic tempora deleniti blanditiis. Impedit odit nobis optio in perspiciatis, vel laudantium eligendi est ea ipsum voluptatibus?</div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global.scss";
.home {
  padding-top: 100px;
  .iconfont {
    font-size: 20px;
  }
  @media (min-width: 750px) {
    .box-wrapper {
      display: flex;
    }
  }
  .box1,
  .box2 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #000;
    position: relative;
    background: #fff;
    overflow: hidden;
  }
  .box1 {
    &::before {
      content: "";
      width: 50px;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      background: #000;
    }
    &::after {
      content: "";
      width: 50px;
      height: 50px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: #000;
    }
  }
  .px2vm {
    // @include center;
    margin: 0 auto;
    padding: 20px;
    width: 300px;
    // height: 500px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
}
</style>
