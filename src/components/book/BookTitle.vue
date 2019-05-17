<template>
  <transition name="slide-down">
    <div class="title-wrapper zIndex3" v-show="menuVisible">
      <div class="left">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="right">
        <i class="iconfont icon-shelf"></i>
        <i class="iconfont icon-cart"></i>
        <i class="iconfont icon-more"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import BookMixin from "@/utils/Mixins";

export default {
  name: "",
  mixins: [BookMixin],
  data() {
    return {};
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.title-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 10%;
  display: flex;
  background: #fff;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    width: px2rem(80);
    @include center;
  }
  .right {
    @include center;
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .iconfont {
    padding: 0 px2rem(10);
    font-size: px2rem(20);
  }
}
</style>
