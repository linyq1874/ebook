<template>
  <div class="content-wrapper">
    <section class="search">
      <i class="iconfont icon-search"></i>
      <input
        type="text"
        class="input-text"
        :placeholder="$t('book.searchHint')"
        @keyup.enter="searchHandler"
        @focus="showSearchPage"
        v-model="keyword"
      />
      <div class="cancel" v-show="searchVisible" @click="hideSearchPage">
        {{ $t("book.cancel") }}
      </div>
    </section>
    <section class="book-info-wrapper" v-show="!searchVisible">
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
      v-show="!searchVisible"
    >
      <ul class="content">
        <li
          v-for="(item, index) in navigationList"
          :key="index"
          class="content-li"
          @click="toSection(item.href)"
        >
          <p class="content-text" :style="getItemStyle(item.level)">
            {{ item.label }}
          </p>
        </li>
      </ul>
    </section>
    <section class="searchList" ref="searchList" v-show="searchVisible">
      <ul class="content">
        <li v-for="(item, index) in list" :key="index" class="searchList-li">
          {{ item }}
        </li>
      </ul>
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
      keyword: ""
    };
  },
  computed: {
    // 目录列表
    navigationList() {
      return this.navigation;
    }
  },
  components: {},
  mounted() {
    const list = [];
    for (let index = 0; index < 100; index++) {
      list.push(`list item ${index}`);
    }
    this.list = list;

    this.getBSroll("content-list-wrapper");
  },
  methods: {
    getBSroll(wrapper) {
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
    },
    showSearchPage() {
      this.searchVisible = true;
      if (!this["searchList-scroll"]) {
        this.getBSroll("searchList");
      }
    },
    searchHandler() {
      console.log(this.keyword);
    },
    hideSearchPage() {
      this.searchVisible = false;
      this.keyword = "";
    },
    toSection(href) {
      this.display(href, () => {
      this.setMenuVisible(false);
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

      // background: linear-gradient(30deg, #990, #090);
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
    .content{
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
      }
      .content-li + .content-li {
        border-top: px2rem(1) solid #ccc;
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
    .searchList-li {
      padding: px2rem(10);
    }
  }
}
</style>
