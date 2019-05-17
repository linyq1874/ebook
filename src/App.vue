<template>
  <div id="app">
    <nav class="zIndex3">
      <router-link :to="path.path" v-for="(path, index) in routerPaths" :key="index">{{path.name}}</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "ebook",
  data() {
    return {
      routerPaths: [
        {
          path: "/",
          name: "首页"
        },
        {
          path: "/book/History|2017_Book_ExecutingMagicInTheModernEra",
          name: "电子书"
        }
      ]
    };
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      const html = document.querySelector("html");

      let fontSize = window.innerWidth / 10;
      fontSize = fontSize > 50 ? 50 : fontSize;
      html.style.fontSize = `${fontSize}px`;
    });
  }
};
</script>


<style lang="scss">
nav {
  position: absolute;
  background: #fff;
}
</style>
