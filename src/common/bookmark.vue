<template>
  <div class="bookmark" :style="colorStyle" ref="bookmark"></div>
</template>

<script>
import { px2rem } from "@/utils/utils";

export default {
  name: "",
  props: {
    color: String,
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      const { height, width } = this;
      if (height && width) {
        this.$refs.bookmark.style.borderWidth = `${px2rem(
          height - 5
        )}rem ${px2rem(width / 2)}rem ${px2rem(5)}rem ${px2rem(width / 2)}rem`;
      }
    }
  },
  components: {},
  computed: {
    colorStyle() {
      return {
        borderColor: this.color
          ? `${this.color} ${this.color} transparent ${this.color}`
          : {}
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
$white: #ccc;

.bookmark {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
  border-color: $white $white transparent $white;
}
</style>
