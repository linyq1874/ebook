<template>
  <div class="ebook">
    <div class="book-wrapper">
      <div id="book"></div>
      <div class="mask zIndex2">
        <div class="left" @click="prev"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="next"></div>
      </div>
      <transition name="slide-down">
        <div class="title-wrapper zIndex3" v-show="isTitleAndMenuShow">
          <div class="left">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="right">
            <i class="iconfont icon-wode"></i>
            <i class="iconfont icon-gouwuche"></i>
            <i class="iconfont icon-gengduo"></i>
          </div>
        </div>
      </transition>
      <transition name="slide-up">
        <div class="menu-wrapper zIndex3" v-show="isTitleAndMenuShow">
          <i class="iconfont icon-caidan"></i>
          <i class="iconfont icon-jindu"></i>
          <i class="iconfont icon-liangdu"></i>
          <i class="iconfont">A</i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Epub from "epubjs";

export default {
  name: "",
  data() {
    return {
      // publicPath: process.env.BASE_URL,
      isTitleAndMenuShow: false
    };
  },
  components: {},
  mounted() {
    this.showEpub();
  },
  methods: {
    showEpub() {
      const win = window,
        // DOWLOAD_URL = `${this.publicPath}book/124845.epub`;
        DOWLOAD_URL = `/book/124845.epub`;
      // 生成book
      this.book = new Epub(DOWLOAD_URL);

      // 生成Rendition，通过Book.renderTo
      this.rendition = this.book.renderTo("book", {
        width: win.innerWidth,
        height: win.innerHeight
      });
      // 通过Rendition.display 渲染电子书
      this.displayed = this.rendition.display();
    },
    prev() {
      this.rendition.prev();
    },
    next() {
      this.rendition.next();
    },
    toggleTitleAndMenu() {
      this.isTitleAndMenuShow = !this.isTitleAndMenuShow;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.book-wrapper {
  position: relative;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    .left {
      flex: 0 0 px2rem(100);
    }
    .center {
      flex: 1;
    }
    .right {
      flex: 0 0 px2rem(100);
    }
  }
  .iconfont {
    padding: 0 px2rem(10);
    font-size: px2rem(20);
  }
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
  }
  .menu-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10%;
    background: #fff;
    display: flex;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    @include center;
    justify-content: space-around;
  }
}
</style>
