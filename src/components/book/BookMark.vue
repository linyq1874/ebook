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
    }
  },
  methods: {
    // 状态4：归位
    restore() {
      const { bookmark, iconDown } = this.$refs;

      // 外层有个transition，为了同步，必须延时200ms
      setTimeout(() => {
        bookmark.style.top = `${px2rem(-35)}rem`;
        iconDown.style.transform = "rotate(0deg)";
      }, 200);
      this.isFixed ? this.setIsBookmark(true) : this.setIsBookmark(false);
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
