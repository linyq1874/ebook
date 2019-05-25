<template>
  <div class="ebook" ref="ebook">
    <div class="book-wrapper">
      <book-mark></book-mark>
      <book-title></book-title>
      <nav>
        <router-link v-for="(nav,index) in routerPath" :key="index" :to="nav.path">{{nav.name}}</router-link>
        <select v-model="lang" @change="changeHandler">
          <option value="cn" selected="selected">cn</option>
          <option value="en">en</option>
        </select>
      </nav>

      <router-view></router-view>
      <book-menu></book-menu>
    </div>
  </div>
</template>

<script>
import BookTitle from "@/components/book/BookTitle";
import BookMenu from "@/components/book/BookMenu";
import BookMark from "@/components/book/BookMark";
import { setLocale, getReadTime, setReadTime } from "@/utils/localStorage";
import BookMixin from "@/utils/mixins";
import { px2rem } from "@/utils/utils";

export default {
  name: "",
  mixins: [BookMixin],
  data() {
    return {
      routerPath: [
        {
          path: "book/History|2017_Book_ExecutingMagicInTheModernEra",
          name: "history"
        },
        {
          path: "book/Laws|2015_Book_ProtectingTheRightsOfPeopleWit",
          name: "law"
        },
        {
          path: "book/Engineering|2014_Book_OpeningScience",
          name: "Engineering"
        }
      ],
      lang: ""
    };
  },
  components: {
    BookTitle,
    BookMenu,
    BookMark
  },
  watch: {
    offsetY(v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v);
        } else if (v === 0) {
          this.restore();
        }
      }
    }
  },
  mounted() {
    this.loopReadTime();
  },
  methods: {
    move(v) {
      this.$refs.ebook.style.top = `${px2rem(v)}rem`;
    },
    restore() {
      const { ebook } = this.$refs;

      ebook.style.top = 0;
      ebook.style.transition = "all 0.2s linear";
      // 让动画更流畅
      setTimeout(() => {
        ebook.style.transition = "";
      }, 200);
    },
    changeHandler() {
      setLocale(this.lang);
    },
    loopReadTime() {
      const { fileName } = this;
      let readTime = getReadTime(fileName);
      if (!readTime) {
        readTime = 0;
      }
      this.task = setInterval(() => {
        readTime++;
        if (readTime % 30 === 0) {
          setReadTime(fileName, readTime);
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    this.task && clearInterval(this.task);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .book-wrapper {
    position: relative;
    nav {
      position: absolute;
    }
  }
}
</style>
