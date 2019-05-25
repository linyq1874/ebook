<template>
  <div class="ebook" ref="ebook">
    <div class="book-wrapper">
      <!-- <book-mark ref="bookMark" class="book-mark"></book-mark> -->
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
    offsetY(val) {
      const { ebook, bookMark } = this.$refs;
      ebook.style.top = `${px2rem(val)}rem`;
      if (val > 0 && val <= 30) {
        console.log(1);

        // ebook.style.transform = `translateY(${px2rem(val)}rem)`;
        ebook.style.top = `${px2rem(val)}rem`;
      } else if (val > 30 && val <= 45) {
        console.log(2);

        // ebook.style.transform = `translateY(${px2rem(val)}rem)`;
        ebook.style.top = `${px2rem(val)}rem`;
      } else if (val > 45) {
        console.log(3);

        // ebook.style.transform = `translateY(${px2rem(val)}rem)`;
        ebook.style.top = `${px2rem(val)}rem`;
        // bookMark.style.transform = `translateY(${px2rem(-val)}rem)`;
        // ebook.style.top = `${px2rem(val)}rem`;
      } else if (val === 0) {
        ebook.style.top = `0`;
        // ebook.style.transform = `translateY(0)`;
      }
    }
  },
  mounted() {
    this.loopReadTime();
  },
  methods: {
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
  // overflow: hidden;
  width: 100%;
  height: 100%;
  .book-wrapper {
    position: relative;
    nav {
      position: absolute;
    }
    .book-mark {
      position: absolute;
      top: px2rem(-50);
      left: 0;
      height: px2rem(50);
      width: 100%;
    }
  }
}
</style>
