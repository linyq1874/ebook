<template>
  <div id="book"></div>
</template>

<script>
import Epub from "epubjs";
import BookMixin from "@/utils/Mixins";

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
      console.log(fileName);

      this.setFileName(fileName).then(() => {
        this.showEpub();
      });
    },
    showEpub() {
      const win = window,
        prevURL = process.env.VUE_APP_EPUB_URL,
        DOWLOAD_URL = `${prevURL}/${this.fileName}.epub`;

      // 生成book
      this.book = new Epub(DOWLOAD_URL);
      // 将book作为vuex来全局管理
      this.setCurrentBook(this.book);
      // 生成Rendition，通过Book.renderTo
      this.rendition = this.book.renderTo("book", {
        width: win.innerWidth,
        height: win.innerHeight
      });
      // 通过Rendition.display 渲染电子书
      this.displayed = this.rendition.display();

      // 手势操作
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
    prevPage() {
      this.rendition.prev();
      if (this.menuVisible) {
        this.hideTitleAndMenu();
      }
    },
    nextPage() {
      this.rendition.next();
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
