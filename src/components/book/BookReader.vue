<template>
  <div class="book-reader">
    <div id="book"></div>
    <div
      class="mask zIndex2"
      @touchmove="onMaskTouchmove"
      @touchend="onMaskTouchend"
      @click="onMaskClick"
    ></div>
  </div>
</template>

<script>
import Epub from "epubjs";
import BookMixin from "@/utils/mixins";
import {
  getFontSize,
  setFontSize,
  getFontFamily,
  setFontFamily,
  getTheme,
  getLocation
} from "@/utils/localStorage";

import { flatten, find } from "@/utils/utils";

export default {
  mixins: [BookMixin],
  name: "",
  data() {
    return {
      firstClientY: 0
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    prevent(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    onMaskTouchmove(e) {
      let offSetY = 0;
      if (this.firstOffsetY) {
        offSetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offSetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      this.prevent(e);
    },
    onMaskTouchend() {
      this.setOffsetY(0);
      this.firstOffsetY = 0;
    },
    onMaskClick(e) {
      const { offsetX } = e,
        win = window,
        { innerWidth } = win;

      if (offsetX / innerWidth <= 1 / 4) {
        this.prevPage();
      } else if (offsetX / innerWidth >= 3 / 4) {
        this.nextPage();
      } else {
        this.toggleTitleAndMenu();
      }

      this.prevent(e);
    },
    getBook() {
      const fileName = this.$route.params.fileName.replace(/\|/, "/");

      this.setFileName(fileName).then(() => {
        this.showEpub();
      });
    },
    showEpub() {
      const DOWLOAD_URL = `${process.env.VUE_APP_EPUB_URL}/${
        this.fileName
      }.epub`;

      // 生成book
      this.book = new Epub(DOWLOAD_URL);
      // 将book作为vuex来全局管理
      this.setCurrentBook(this.book);
      // 生成Rendition
      this.initRendition();
      // 手势操作
      // this.initGuesture();
      // 电子书初始化信息
      this.parseBook();
      // 书本加载完毕
      this.book.ready
        .then(() => this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          ))
        .then(() => {
          // console.log(locations);
          this.setBookAvailable(true);
          this.refreshLocation();
        });
    },
    initRendition() {
      const win = window;
      // 生成Rendition，通过Book.renderTo
      this.rendition = this.book.renderTo("book", {
        width: win.innerWidth,
        height: win.innerHeight
      });
      // 通过Rendition.display 渲染电子书
      const location = getLocation(this.fileName);
      this.display(location, () => {
        this.initTheme();
        this.initFontSize();
        this.initFontFamily();
        this.initGlobalStyle();
      });

      // 字体切换
      this.rendition.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then(() => {
          console.log("字体加载完毕。。。");
        });
      });
    },
    // 手势操作
    initGuesture() {
      this.rendition.on("touchstart", (event) => {
        this.touchstartTime = event.timeStamp;
        this.touchstartX = event.changedTouches[0].clientX;
      });
      this.rendition.on("touchend", (event) => {
        const time = event.timeStamp - this.touchstartTime,
          offsetClientX = event.changedTouches[0].clientX - this.touchstartX;

        if (time < 500 && offsetClientX < -40) {
          this.nextPage();
        } else if (time < 500 && offsetClientX > 40) {
          this.prevPage();
        } else {
          this.toggleTitleAndMenu();
        }
      });
    },
    // 主题
    initTheme() {
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      const defaultTheme = getTheme(this.fileName) || this.themeList[0].name;

      this.setDefaultTheme(defaultTheme);
      this.rendition.themes.select(defaultTheme);
    },
    // 字号
    initFontSize() {
      const fontSize = getFontSize(this.fileName);
      if (fontSize) {
        this.setDefaultFontSize(fontSize);
        this.rendition.themes.fontSize(`${fontSize}px`);
      } else {
        setFontSize(this.fileName, this.defaultFontSize);
      }
    },
    // 字体
    initFontFamily() {
      const fontFamily = getFontFamily(this.fileName);
      if (fontFamily) {
        this.setDefaultFontFamily(fontFamily);
        this.currentBook.rendition.themes.font(fontFamily);
      } else {
        setFontFamily(this.fileName, this.defaultFontFamily);
      }
    },
    parseBook() {
      // 获取电子书封面
      this.book.loaded.cover.then((cover) => {
        this.book.archive.createUrl(cover).then((url) => {
          this.setCover(url);
        });
      });

      // 获取电子书书名及作者
      this.book.loaded.metadata.then((metadata) => {
        this.setMetadata(metadata);
      });

      // 获取电子书目录;
      this.book.loaded.navigation.then((navigation) => {
        const toc = flatten(navigation.toc);
        toc.forEach((item) => {
          item.level = find(toc, item);
          return item;
        });
        this.setNavigation(toc);
      });
    },
    prevPage() {
      this.rendition.prev().then(() => {
        this.refreshLocation();
      });
      if (this.menuVisible) {
        this.hideTitleAndMenu();
      }
    },
    nextPage() {
      this.rendition.next().then(() => {
        this.refreshLocation();
      });
      if (this.menuVisible) {
        this.hideTitleAndMenu();
      }
    },
    toggleTitleAndMenu() {
      this.setMenuVisible(!this.menuVisible);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.book-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
