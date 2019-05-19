<template>
  <div id="book"></div>
</template>

<script>
import Epub from "epubjs";
import BookMixin from "@/utils/Mixins";
import {
  getFontSize,
  setFontSize,
  getFontFamily,
  setFontFamily,
  getTheme,
  getLocation
} from "@/utils/localStorage";

export default {
  mixins: [BookMixin],
  name: "",
  data() {
    return {};
  },
  mounted() {
    this.getBook();
  },
  methods: {
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
      this.initGuesture();

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
</style>
