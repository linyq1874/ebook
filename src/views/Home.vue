<template>
  <div class="home">
    home
    <i class="iconfont icon-check"></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["test"])
  },
  mounted() {
    console.log(this.test);
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 100px;
}
</style>
