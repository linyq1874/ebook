<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper zIndex3"
        :class="{'hide-box-shadow':menuVisible && settingVisible >= 0 }"
        v-show="menuVisible"
      >
        <i class="iconfont icon-menu" @click="toggleMenuSetting(0)"></i>
        <i class="iconfont icon-progress" @click="toggleMenuSetting(1)"></i>
        <i class="iconfont icon-bright" @click="toggleMenuSetting(2)"></i>
        <i class="iconfont icon-settings" @click="toggleMenuSetting(3)"></i>
      </div>
    </transition>
    <book-setting-font></book-setting-font>
    <book-setting-font-popup></book-setting-font-popup>
    <book-setting-theme></book-setting-theme>
    <book-setting-progress></book-setting-progress>
    <book-slide></book-slide>
  </div>
</template>

<script>
import BookMixin from "@/utils/mixins";
import BookSettingFont from "./BookSettingFont";
import BookSettingFontPopup from "./BookSettingFontPopup";
import BookSettingTheme from "./BookSettingTheme";
import BookSettingProgress from "./BookSettingProgress";
import BookSlide from "./BookSlide";

export default {
  name: "bookMenu",
  mixins: [BookMixin],
  data() {
    return {};
  },
  computed: {},
  components: {
    BookSettingFont,
    BookSettingFontPopup,
    BookSettingTheme,
    BookSettingProgress,
    BookSlide
  },
  methods: {
    toggleMenuSetting(index) {
      if (this.settingVisible === index) {
        this.setSettingVisible(-1);
      } else {
        this.setSettingVisible(index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.menu-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  display: flex;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  @include center;
  justify-content: space-around;
  &.hide-box-shadow {
    box-shadow: none;
  }
  .iconfont {
    font-size: px2rem(20);
  }
}
</style>
