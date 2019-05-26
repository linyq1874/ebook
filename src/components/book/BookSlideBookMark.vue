<template>
  <div class="bookmark-wrapper">
    <section class="bookmark-tip">
      <span class="bookmark-tip-text">{{$t("book.bookmark")}}</span>
      <span class="bookmark-tip-num">{{bookmarks.length}}</span>
    </section>
    <section class="bookmark-list" ref="bookmark-list">
      <ul class="content" v-if="bookmarks.length">
        <li
          class="bookmark-item"
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          @click="displayBookmark(bookmark.cfi)"
        >
          <i class="iconfont icon-bookmark"></i>
          <span class="bookmark-item-text">{{bookmark.text}}</span>
        </li>
      </ul>
      <p v-else>您暂无标签！</p>
    </section>
  </div>
</template>

<script>
import BookMixin from "@/utils/mixins";
import { getBookmark } from "@/utils/localStorage";

export default {
  name: "BookSlideBookMark",
  mixins: [BookMixin],
  data() {
    return {
      bookmarks: []
    };
  },
  watch: {
    // 当再次切换到目录页时，要再次初始化
    settingVisible(val) {
      if (val === 0) {
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bookmarks = getBookmark(this.fileName) || [];
      this.$nextTick(() => {
        this.initBScroll("bookmark-list");
      });
    },
    displayBookmark(cfi) {
      this.display(cfi, () => {
        this.setMenuVisible(false);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
$BLUE: #010275;

.bookmark-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: px2rem(20) px2rem(10) 0;
  font-size: px2rem(16);
  @include columnCenter;
  .bookmark-tip {
    flex: 0 0 px2rem(48);
    width: 100%;
    height: px2rem(48);
    // margin-bottom: px2rem(20);
    @include left;
    .bookmark-tip-text {
      padding-right: px2rem(5);
    }
    .bookmark-tip-num::before {
      content: "*";
    }
  }
  .bookmark-list {
    flex: 1;
    width: 100%;
    overflow: hidden;
    position: relative;
    line-height: px2rem(18);
    box-sizing: border-box;
    padding-top: px2rem(20);
    .bookmark-item {
      width: 100%;
      box-sizing: border-box;
      padding: px2rem(10);
      .icon-bookmark {
        position: absolute;
        color: $BLUE;
      }
      .bookmark-item-text {
        box-sizing: border-box;
        padding-left: px2rem(20);
        @include ellipsis2(3);
      }
      & + .bookmark-item {
        border-top: px2rem(2) solid rgb(221, 230, 219);
      }
    }
  }
}
</style>
