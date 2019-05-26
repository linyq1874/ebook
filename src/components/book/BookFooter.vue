<template>
  <footer>
    <span class="footer-text">{{$t("book.haveRead2")}}{{progress}}%</span>
  </footer>
</template>

<script>
import BookMixin from "@/utils/mixins";

export default {
  name: "bookFooter",
  mixins: [BookMixin]
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
footer {
  position: absolute;
  left: 0;
  bottom: 0;
  height: px2rem(48);
  width: 100%;
  text-align: right;

  .footer-text {
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    box-sizing: border-box;
    padding-right: px2rem(20);
  }
}
</style>
