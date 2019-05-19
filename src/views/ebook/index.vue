<template>
  <div class="ebook">
    <div class="book-wrapper">
      <book-title></book-title>
      <!-- <div id="book"></div> -->
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
import { setLocale, getReadTime, setReadTime } from "@/utils/localStorage";
import BookMixin from "@/utils/mixins";

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
        }
      ],
      lang: ""
    };
  },
  components: {
    BookTitle,
    BookMenu
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

.book-wrapper {
  position: relative;
}
</style>
