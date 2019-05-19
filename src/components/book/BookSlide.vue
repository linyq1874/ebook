<template>
  <transition name="fade">
    <div class="book-content-wrapper zIndex4" v-show="menuVisible && settingVisible === 0">
      <transition name="slide-right">
        <section class="book-content-info-wrapper" v-show="menuVisible && settingVisible === 0">
          <div class="content-page-wrapper">
            <div class="content-page">
              <keep-alive>
                <component :is="tab === 1 ? content : bookmark"></component>
              </keep-alive>
            </div>
            <nav class="book-content-nav">
              <span class="content-nav" @click="changeTab(1)">{{$t('book.navigation')}}</span>
              |
              <span
                class="bookmark-nav"
                @click="changeTab(2)"
              >{{$t('book.bookmark')}}</span>
            </nav>
          </div>
          <div class="empty"></div>
        </section>
      </transition>
      <section class="mask" @click="maskClick"></section>
    </div>
  </transition>
</template>

<script>
import BookMark from "./BookSlideBookMark";
import BookContent from "./BookSlideContent";
import BookMixin from "@/utils/mixins";

export default {
  name: "",
  mixins: [BookMixin],
  data() {
    return {
      bookmark: BookMark,
      content: BookContent,
      tab: 1
    };
  },
  components: {},
  methods: {
    changeTab(tab = 1) {
      this.tab = tab;
    },
    maskClick() {
      this.setMenuVisible(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.book-content-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  @include absCenter;
  .book-content-info-wrapper {
    flex: 1;
    width: 85%;
    height: 100%;
    background: #fff;
    .content-page-wrapper {
      width: 100%;
      height: 100%;
      @include columnCenter;
      .content-page {
        width: 100%;
        flex: 1;
      }
      .book-content-nav {
        width: 100%;
        flex: 0 0 px2rem(48);
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        font-size: px2rem(16);
        @include center;
        .content-nav,
        .bookmark-nav {
          flex: 1;
          text-align: center;
        }
        // .content-nav {
        //   box-sizing: border-box;
        //   border-right: 1px solid #ccc;
        // }
      }
    }
  }
  .mask {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
    background: rgba(0, 0, 0, 0.15);
  }
}
</style>
