<template>
  <header class="zIndex3">
    <p class="header-text">{{getSectionName}}</p>
  </header>
</template>

<script>
import BookMixin from "@/utils/mixins";

export default {
  name: "bookHeader",
  mixins: [BookMixin]
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
header {
  height: px2rem(48);
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .header-text {
    height: 100%;
    width: 100%;
    font-size: px2rem(12);
    color: #616060;
    box-sizing: border-box;
    padding: px2rem(5) px2rem(18);
  }
}
</style>
