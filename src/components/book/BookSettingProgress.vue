<template>
  <transition name="slide-up">
    <div class="setting-wrapper zIndex3" v-show="menuVisible && settingVisible === 1">
      <section class="read-time-wrapper">
        <span>{{getReadTime()}}</span>
        <i class="iconfont icon-forward"></i>
      </section>
      <section class="progress-wrapper">
        <div class="progress-icon-wrapper" @click="prevSection()">
          <span class="iconfont icon-back"></span>
        </div>
        <input
          class="progress"
          type="range"
          max="100"
          min="0"
          step="1"
          @input="onProgressInput($event.target.value)"
          @change="onProgressChange($event.target.value)"
          :value="progress"
          ref="progress"
          :disabled="!bookAvailable"
        >
        <div class="progress-icon-wrapper" @click="nextSection()">
          <span class="iconfont icon-forward"></span>
        </div>
      </section>
      <section class="section">
        <span class="progress-section-text" v-if="bookAvailable">{{getSectionName}}</span>
        <span class="progress-text">({{bookAvailable ? progress + '%' : $t('book.loading')}})</span>
      </section>
    </div>
  </transition>
</template>

<script>
import BookMixin from "@/utils/mixins";

export default {
  name: "BookSettingProgress",
  mixins: [BookMixin],
  computed: {
    // 获取章节名字
    getSectionName() {
      const { section, navigation } = this;
      // if (section) {
      //   const sectionInfo = currentBook.section(section);
      //   if (
      //     sectionInfo
      //     && sectionInfo.href
      //     && currentBook
      //     && currentBook.navigation
      //   ) {
      //     name = currentBook.navigation.get(sectionInfo.href).label;
      //   }
      // }
      return section
        ? navigation && navigation[section] && navigation[section].label
        : "";
      // return name;
    }
  },
  methods: {
    displaySection() {
      const sectionInfo = this.currentBook.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href);
      }
    },

    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection();
        });
      }
    },
    nextSection() {
      // book.spine 所有章节
      if (
        this.section < this.currentBook.spine.length - 1
        && this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection();
        });
      }
    },
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBG(progress);
      });
    },
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress(progress);
        this.updateProgressBG(progress);
      });
    },
    displayProgress(progress) {
      const { currentBook } = this,
        cfi = currentBook.locations.cfiFromPercentage(progress / 100);
      this.display(cfi);
    },
    updateProgressBG(progress) {
      this.$refs.progress.style.backgroundSize = `${progress}% 100%`;
    }
  },
  // 所有更新完成之后，初始化进度条背景
  updated() {
    this.updateProgressBG(this.progress);
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

  @include columnCenter;
  .read-time-wrapper {
    flex: 0 0 px2rem(25);
    font-size: px2rem(14);
    @include center;
  }
  .progress-wrapper {
    flex: 1;
    display: flex;
    width: 100%;
    @include center;
    box-sizing: border-box;
    padding: 0 px2rem(10);
    .progress {
      flex: 1;
      width: 100%;
      -webkit-appearance: none;
      height: px2rem(2);
      background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
      // background-size: 20% 100%;
      margin: 0 px2rem(10);
      &:focus {
        outline: none;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: px2rem(20);
        width: px2rem(20);
        border-radius: 50%;
        background: #ceced0;
        box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
        border: none;
      }
    }
    .progress-icon-wrapper {
      flex: 0 0 px2rem(22);
      font-size: px2rem(22);
      @include center;
    }
    .progress {
      flex: 1;
    }
  }
  .section {
    flex: 0 0 px2rem(25);
    width: 100%;
    font-size: px2rem(14);
    box-sizing: border-box;
    padding: 0 px2rem(15);
    @include center;
    .progress-section-text {
      line-height: px2rem(16);
      @include ellipsis;
    }
  }
}
</style>
