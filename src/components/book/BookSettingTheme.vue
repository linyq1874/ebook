<template>
  <transition name="slide-up">
    <div class="setting-wrapper zIndex3" v-show="menuVisible && settingVisible === 2">
      <div class="setting-theme">
        <section
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="changeTheme(item.name)"
        >
          <div
            class="preview"
            :class="{'selected': item.name === defaultTheme}"
            :style="{background:item.style.body.background}"
          ></div>
          <span class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</span>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import BookMixin from "@/utils/mixins";
import { setTheme } from "@/utils/localStorage";

export default {
  name: "BookSettingFont",
  mixins: [BookMixin],
  methods: {
    changeTheme(theme) {
      this.setDefaultTheme(theme).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme);
        setTheme(this.fileName, theme);

        this.initGlobalStyle();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        border: none;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
      }
    }
  }
}
</style>
