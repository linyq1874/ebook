<template>
  <transition name="fontPopup-slide-up">
    <div class="bookFontPopupWrapper zIndex3" v-show="fontFamilyVisible">
      <div class="titleWrapper">
        <i class="iconfont icon-down" @click="hidePopup"></i>
        <span class="title">选择字体</span>
      </div>
      <div class="popupListWrapper">
        <div
          class="popupListItem"
          v-for="(item, index) in fontFamilyList"
          :key="index"
          @click="setFontFamily(item.font)"
          :class="{'selected': defaultFontFamily === item.font}"
        >
          <span class="listItemText">{{item.font}}</span>
          <i class="iconfont icon-check" v-if="defaultFontFamily === item.font"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BookMixin from "@/utils/Mixins";
import { FONT_FAMILY } from "@/utils/Book";

export default {
  name: "bookSettingFontPopup",
  mixins: [BookMixin],

  data() {
    return {
      fontFamilyList: FONT_FAMILY
    };
  },
  components: {},
  methods: {
    setFontFamily(currentFontFamily) {
      this.setDefaultFontFamily(currentFontFamily);
    },
    hidePopup() {
      this.setFontFamilyVisible(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.bookFontPopupWrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 px2rem(-5) px2rem(5) rgba(0, 0, 0, 0.15);
  .titleWrapper {
    display: flex;
    position: relative;
    font-size: px2rem(18);
    height: px2rem(40);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #ccc;
    @include center;
    .icon-down {
      position: absolute;
      left: px2rem(20);
      top: px2rem(10);
    }
  }

  .popupListWrapper {
    padding-bottom: px2rem(20);
    .popupListItem {
      display: flex;
      font-size: px2rem(14);
      padding: px2rem(20);
      .listItemText {
        flex: 1;
        text-align: left;
      }

      .iconfont {
        flex: 1;
        text-align: right;
      }
      &.selected {
        color: #2b2;
      }
    }
  }
}
</style>
