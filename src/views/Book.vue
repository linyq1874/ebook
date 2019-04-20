<template>
  <div class="ebook">
    <div class="book-wrapper">
      <div id="book"></div>
    </div>
  </div>
</template>

<script>
import Epub from "epubjs";

export default {
  name: "",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  components: {},
  mounted() {
    this.showEpub();
  },
  methods: {
    showEpub() {
      const win = window,
        DOWLOAD_URL = `${this.publicPath}book/124845.epub`;
      // 生成book
      this.book = new Epub(DOWLOAD_URL);

      // 生成Rendition，通过Book.renderTo
      this.rendition = this.book.renderTo("book", {
        width: win.innerWidth,
        height: win.innerHeight - 100
      });
      // 通过Rendition.display 渲染电子书
      this.displayed = this.rendition.display();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
</style>
