<template>
  <transition name="slide-up">
    <div class="settingWrapper zIndex3" v-show="menuVisible && settingVisible === 3">
      <div class="setting-fontSize">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div
          class="fontOperate"
          v-for="(item, index) in fontSizeList"
          :key="index"
          @click="setFontSize(item.fontSize)"
        >
          <div class="line"></div>
          <div class="pointWrapper">
            <i class="point" v-if="defaultFontSize === item.fontSize">
              <i class="dot"></i>
            </i>
          </div>
          <div class="line"></div>
        </div>
        <div
          class="nextview"
          :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
        >A</div>
      </div>
      <div class="setting-fontFamily" @click="showPopup">
        <span class="setting-fontFamily-text">{{defaultFontFamily}}</span>
        <i class="iconfont icon-forward"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import BookMixin from "@/utils/mixins";
import { FONT_SIZE_LIST } from "@/utils/Book";
import { setFontSize } from "@/utils/localStorage";

export default {
  name: "BookSettingFont",
  mixins: [BookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST
    };
  },
  components: {},
  methods: {
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize);
      this.currentBook.rendition.themes.fontSize(`${fontSize}px`);
      setFontSize(this.fileName, fontSize);
    },
    showPopup() {
      this.setFontFamilyVisible(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.settingWrapper {
  position: absolute;
  left: 0;
  bottom: px2rem(48);
  height: px2rem(90);
  width: 100%;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  background: #fff;

  .setting-fontSize {
    display: flex;
    flex: 2;
    background: #fff;

    .preview {
      flex: 0 0 px2rem(40);
      height: 100%;
      @include right;
    }
    .nextview {
      flex: 0 0 px2rem(40);
      height: 100%;
      @include left;
    }
    .fontOperate {
      flex: 1;
      display: flex;
      @include center;
      .line {
        flex: 1;
        height: 0;
        border-top: px2rem(1) solid #ccc;
      }
      .pointWrapper {
        flex: 0 0 0;
        height: px2rem(7);
        border-left: px2rem(1) solid #ccc;
        display: flex;
        @include center;

        .point {
          width: px2rem(22);
          height: px2rem(22);
          border-radius: 50%;
          background: #fff;
          border: px2rem(1) solid #ccc;
          box-shadow: 0 px2rem(5) px2rem(5) #ccc;
          display: flex;
          @include center;

          .dot {
            width: px2rem(8);
            height: px2rem(8);
            border-radius: 50%;
            background: #000;
          }
        }
      }
      &:nth-of-type(2) {
        :first-child {
          border: none;
        }
      }
      &:nth-of-type(8) {
        :last-child {
          border: none;
        }
      }
    }
  }
  .setting-fontFamily {
    flex: 1;
    font-size: px2rem(14);
    display: flex;
    @include center;
    &-text {
      padding: 0 px2rem(10);
    }
  }
}
</style>
