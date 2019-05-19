<template>
  <div class="content-wrapper">
    <section class="search">
      <i class="iconfont icon-search"></i>
      <input type="text" class="input-text">
      <div class="cancel">{{$t('book.cancel')}}</div>
    </section>
    <section class="book-info-wrapper">
      <div class="book-cover"></div>
      <div class="book-info">
        <div
          class="book-title"
        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam fugiat, eaque laudantium placeat a rerum totam ex esse nemo. Distinctio aut asperiores temporibus cupiditate rerum, mollitia porro rem! Porro, nostrum.</div>
        <div
          class="book-author"
        >Lorem ipsum it amet consectetur adipisicing elit. Aliquam fugiat, eaque laudantium placeat a rerum totam ex ess</div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="book-time">read</div>
      </div>
    </section>
    <section class="content-list-wrapper">
      <!-- <div class="content-list"> -->
      <ul class="content">
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
        <li>Lorem ipsum it amet consectetur</li>
      </ul>
      <!-- </div> -->
    </section>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import BookMixin from "@/utils/mixins";

export default {
  name: "",
  mixins: [BookMixin],
  data() {
    return {};
  },
  components: {},
  mounted() {
    const wrapper = document.querySelector(".content-list-wrapper");
    const scroll = new BScroll(wrapper, {
      bounce: false,
      momentumLimitDistance: 5,
      scrollY: true,
      scrollbar: {
        fade: false,
        interactive: false // 1.8.0 新增
      },
      mouseWheel: true
    });
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
    height: px2rem(36);
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
    height: px2rem(90);
    display: flex;
    font-size: px2rem(14);
    box-sizing: border-box;
    padding: px2rem(15) 0;
    .book-cover {
      flex: 0 0 px2rem(45);
      width: px2rem(45);
      height: px2rem(60);
      background: linear-gradient(30deg, #990, #090);
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
      flex: 0 0 px2rem(70);
      @include columnCenter;
    }
  }
  .content-list-wrapper {
    width: 100%;
    // height: 400px;
    // height: calc(100% - 36px - 90px);
    flex: 1;
    border: 1px solid #ccc;
    // 滾動條不能少
    overflow: hidden;
    position: relative;

    // .content-list {
    //   height: 100%;
    //   overflow: hidden;
    // }
    // .content {
    //   height: 100%;
    // }
  }
}
</style>
