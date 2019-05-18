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
import { setLocale } from "@/utils/localStorage";

export default {
  name: "",
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
  mounted() {},
  methods: {
    changeHandler() {
      setLocale(this.lang);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.book-wrapper {
  position: relative;
}
</style>
