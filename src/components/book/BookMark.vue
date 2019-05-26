<template>
  <div class="book-mark-wrapper zIndex5" ref="bookmark">
    <div class="book-mark-text-wrapper">
      <i class="iconfont icon-down1" ref="iconDown"></i>
      <span class="book-mark-text">{{text}}</span>
    </div>
    <div class="book-mark-icon" ref="bookmarkIcon" :style="isFixed ? fixedStyle : {}">
      <book-mark :color="color" :width="20" :height="35"></book-mark>
    </div>
  </div>
</template>

<script>
import BookMark from "@/common/bookmark";
import BookMixin from "@/utils/mixins";
import { realPx, px2rem } from "@/utils/utils";
import { getBookmark, setBookmark } from "@/utils/localStorage";

const BLUE = "#010275",
  WHITE = "#7d7d7d";

export default {
  name: "",
  mixins: [BookMixin],
  data() {
    return {
      text: "",
      color: WHITE,
      isFixed: false
    };
  },
  computed: {
    height() {
      return realPx(35);
    },
    threshold() {
      return realPx(55);
    },
    fixedStyle() {
      return {
        position: "fixed",
        right: `${px2rem(20)}rem`,
        top: 0
      };
    }
  },
  watch: {
    offsetY(v) {
      if (v === 0) {
        this.restore();
      } else if (v > 0 && v < this.height) {
        this.beforeHeight();
      } else if (v >= this.height && v < this.threshold) {
        this.beforeThreshold(v);
      } else if (v >= this.threshold) {
        this.afterThreshold(v);
      }
    },
    // 当页面有书签时，样式进行改变
    isBookmark(v) {
      this.isFixed = v;
      this.color = v ? BLUE : WHITE;
    }
  },
  methods: {
    // 保存书签
    saveBookmark() {
      // 电子书cfi算法
      const { start, end } = this.currentBook.rendition.currentLocation(),
        cfiBase = start.cfi.replace(/!.*/, "").replace("epubcfi(", ""),
        cfiStart = start.cfi.replace(/.*!/, "").replace(/\)/, ""),
        cfiEnd = end.cfi.replace(/.*!/, "").replace(/\)/, ""),
        cfiRange = `epubcfi(${cfiBase}!,${cfiStart},${cfiEnd})`,
        bookmarks = getBookmark(this.fileName) || [];

      this.currentBook.getRange(cfiRange).then((range) => {
        bookmarks.push({
          cfi: start.cfi,
          text: range.toString().replace(/\s\s/, "") // 将空行替换掉
        });

        setBookmark(this.fileName, bookmarks);
      });
    },
    removeBookmark() {
      const { cfi } = this.currentBook.rendition.currentLocation().start,
        bookmarks = getBookmark(this.fileName) || [];

      setBookmark(this.fileName, bookmarks.filter(item => item.cfi !== cfi));
    },
    // 状态4：归位
    restore() {
      const { bookmark, iconDown } = this.$refs;

      // 外层有个transition，为了同步，必须延时200ms
      setTimeout(() => {
        bookmark.style.top = `${px2rem(-35)}rem`;
        iconDown.style.transform = "rotate(0deg)";
      }, 200);
      if (this.isFixed) {
        this.setIsBookmark(true);
        this.saveBookmark();
      } else {
        this.setIsBookmark(false);
        this.removeBookmark();
      }
    },
    // 状态1：正常下拉
    beforeHeight() {
      if (this.isBookmark) {
        this.color = BLUE;
        this.text = this.$t("book.pulldownDeleteMark");
        this.isFixed = true;
      } else {
        this.color = WHITE;
        this.text = this.$t("book.pulldownAddMark");
        this.isFixed = false;
      }
    },
    // 状态2：到达临界点前
    beforeThreshold(v) {
      const { bookmark, iconDown } = this.$refs;

      this.beforeHeight();

      bookmark.style.top = `${px2rem(-v)}rem`;
      if (iconDown.style.transform === "rotate(180deg)") {
        iconDown.style.transform = "rotate(0deg)";
      }
    },
    // 状态3：到达临界点后
    afterThreshold(v) {
      const { bookmark, iconDown } = this.$refs;

      if (this.isBookmark) {
        this.text = this.$t("book.releaseDeleteMark");
        this.color = WHITE;
        this.isFixed = false;
      } else {
        this.text = this.$t("book.releaseAddMark");
        this.color = BLUE;
        this.isFixed = true;
      }

      bookmark.style.top = `${px2rem(-v)}rem`;

      if (
        iconDown.style.transform === ""
        || iconDown.style.transform === "rotate(0deg)"
      ) {
        iconDown.style.transform = "rotate(180deg)";
      }
    }
  },
  components: {
    BookMark
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.book-mark-wrapper {
  width: 100%;
  height: px2rem(35);
  position: absolute;
  left: 0;
  top: px2rem(-35);
  .book-mark-text-wrapper {
    font-size: px2rem(14);
    width: 100%;
    height: 100%;
    @include right;
    .book-mark-text {
      margin-right: px2rem(50);
    }
  }
  .book-mark-icon {
    position: absolute;
    right: px2rem(20);
    bottom: 0;
  }
}
</style>
