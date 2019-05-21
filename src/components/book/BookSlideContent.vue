<template>
  <div class="content-wrapper">
    <section class="search">
      <i class="iconfont icon-search"></i>
      <input
        type="text"
        class="input-text"
        :placeholder="$t('book.searchHint')"
        @keyup.enter.exact="searchHandler"
        @focus="showSearchPage"
        v-model.trim="keyword"
      />
      <div class="cancel" v-if="searchVisible" @click="hideSearchPage">
        {{ $t("book.cancel") }}
      </div>
    </section>
    <section class="book-info-wrapper" v-if="!searchVisible">
      <div class="book-cover-wrapper">
        <img :src="cover" class="book-cover" />
      </div>
      <div class="book-info">
        <div class="book-title">
          {{ metadata && metadata.title }}
        </div>
        <div class="book-author">
          {{ metadata && metadata.creator }}
        </div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{ progress + "%" }}</span>
          <span class="progress-text">{{ $t("book.haveRead2") }}</span>
        </div>
        <div class="book-time">{{ getReadTime() }}</div>
      </div>
    </section>
    <section
      class="content-list-wrapper"
      ref="content-list-wrapper"
      v-if="!searchVisible"
    >
      <ul class="content">
        <li
          v-for="(item, index) in navigationList"
          :key="index"
          class="content-li"
          @click="displayContent(item.href)"
          :class="{ selected: section === index }"
        >
          <p class="content-text" :style="getItemStyle(item.level)">
            {{ item.label }}
          </p>
        </li>
      </ul>
    </section>
    <section class="searchList" ref="searchList" v-if="searchVisible">
      <ul class="content" v-if="searchList.length">
        <!-- 有带样式，需要使用v-html -->
        <li
          v-for="(item, index) in searchList"
          :key="index"
          class="searchList-li"
          v-html="item.excerpt"
          @click="displayContent(item.cfi, 'highlight')"
        ></li>
      </ul>
      <p v-if="searchLock && !searchList.length && keyword">没有搜到相关信息</p>
    </section>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import BookMixin from "@/utils/mixins";
import { px2rem } from "@/utils/utils";

export default {
  name: "",
  mixins: [BookMixin],
  data() {
    return {
      list: [],
      searchVisible: false,
      keyword: "",
      searchList: [],
      searchLock: false
    };
  },
  computed: {
    // 目录列表
    navigationList() {
      return this.navigation;
    }
  },
  watch: {
    keyword(val) {
      if (val === "") {
        this.searchLock = false;
        this.searchList = [];
        this.destroyBScroll("searchList-scroll");
      }
    }
  },
  components: {},
  mounted() {
    this.getBSroll("content-list-wrapper");
  },
  methods: {
    getBSroll(wrapper) {
      this.$nextTick(() => {
        this[`${wrapper}-scroll`] = new BScroll(this.$refs[wrapper], {
          bounce: true,
          click: true,
          momentumLimitDistance: 5,
          scrollY: true,
          scrollbar: {
            fade: false,
            interactive: false // 1.8.0 新增
          },
          mouseWheel: true
        });
      });
    },
    destroyBScroll(el) {
      if (this[el]) {
        this[el].destroy();
        this[el] = null;
      }
    },
    showSearchPage() {
      if (!this.keyword) {
        this.searchVisible = true;
        this.searchLock = false;
      }
    },
    hideSearchPage() {
      this.searchVisible = false;
      this.keyword = "";
      this.searchList = [];
      this.destroyBScroll("searchList-scroll");
    },
    searchHandler() {
      this.doSearch(this.currentBook, this.keyword).then((results) => {
        if (results.length) {
          this.searchList = this.highlight(results, this.keyword);

          if (!this["searchList-scroll"]) {
            this.getBSroll("searchList");
          } else {
            this["searchList-scroll"].refresh();
          }
        } else {
          this.searchList = [];
          this.destroyBScroll("searchList-scroll");
          this.searchLock = true;
        }
      });
    },
    // 高亮
    highlight(results, target) {
      return results.map((item) => {
        item.excerpt = item.excerpt.replace(
          target,
          `<span class="highlight">${target}</span>`
        );
        return item;
      });
    },
    // 搜索算法
    doSearch(book, q) {
      return Promise.all(
        book.spine.spineItems.map(item => item
            .load(book.load.bind(book))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item)))
      ).then(results => Promise.resolve([].concat(...results)));
    },
    displayContent(target, highlight = false) {
      this.display(target, () => {
        this.setMenuVisible(false);
        // 电子书高亮api
        highlight && this.currentBook.rendition.annotations.highlight(target);
      });
    },
    getItemStyle(level) {
      return {
        marginLeft: `${px2rem(level * 15)}rem`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.content-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: px2rem(20) px2rem(10) 0;
  font-size: px2rem(16);
  @include columnCenter;
  .search {
    flex: 0 0 px2rem(36);
    width: 100%;
    display: flex;
    position: relative;
    .iconfont {
      position: absolute;
      font-size: px2rem(16);
      margin: px2rem(10) 0 0 px2rem(5);
    }
    .input-text {
      flex: 1;
      padding: 0 px2rem(10) 0 px2rem(22);
      box-sizing: border-box;
      border-radius: px2rem(5);
      border: 1px solid #ccc;
      &:focus {
        outline: none;
      }
    }
    .cancel {
      padding: 0 px2rem(10);
      font-size: px2rem(18);
      @include center;
    }
  }
  .book-info-wrapper {
    width: 100%;
    flex: 0 0 px2rem(90);
    display: flex;
    font-size: px2rem(14);
    box-sizing: border-box;
    padding: px2rem(15) 0;
    .book-cover-wrapper {
      flex: 0 0 px2rem(45);
      .book-cover {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .book-info {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      @include columnLeft;

      .book-title {
        line-height: px2rem(16);
        margin-bottom: px2rem(5);
        @include ellipsis2(2);
      }
      .book-author {
        line-height: px2rem(16);
        @include ellipsis2(1);
      }
    }
    .book-progress-wrapper {
      padding: 0 px2rem(5);
      // flex: 0 0 px2rem(70);
      font-size: px2rem(12);
      @include columnCenter;
    }
  }
  .content-list-wrapper {
    width: 100%;
    flex: 1;
    border: 1px solid #ccc;
    // 滾動條不能少
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    margin: px2rem(10) 0 px2rem(5);
    .content {
      outline: 9999px solid #cecece;
      clip: rect(0 9999px 9999px 0);
      .content-li {
        padding: px2rem(10);
        box-sizing: border-box;
        width: 100%;
        cursor: pointer;
        .content-text {
          width: 80%;
          @include ellipsis;
        }
        &.selected {
          color: rgb(88, 129, 78);
        }
      }
      .content-li + .content-li {
        border-top: px2rem(1) solid rgba(73, 113, 114, 0.1);
      }
    }
  }
  .searchList {
    flex: 1;
    width: 100%;
    // 滾動條不能少
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    margin: px2rem(10) 0 px2rem(5);
    .content {
      outline: 9999px solid #cecece;
      clip: rect(0 9999px 9999px 0);
      .searchList-li {
        padding: px2rem(10);
        & /deep/ .highlight {
          background: #ff0;
        }
      }
      .searchList-li + .searchList-li {
        border-top: px2rem(1) solid rgba(73, 113, 114, 0.2);
      }
    }
  }
}
</style>
