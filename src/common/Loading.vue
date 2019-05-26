<template>
  <div class="loading">
    <div class="book-loading-wrapper">
      <div
        class="book-loading-line-item"
        v-for="(item, index) in lineList"
        :key="index"
      >
        <div
          class="line"
          v-for="(subItem, subIndex) in item"
          :key="subIndex"
          ref="line"
        ></div>
      </div>
      <div class="book-loading-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      lineList: [[{}, {}, {}], [{}, {}, {}]],
      line: [0, 0, 0, 0, 0, 0]
    };
  },
  components: {},
  mounted() {
    this.task = setInterval(this.changeLineStyle, 50);
  },
  methods: {
    changeLineStyle() {
      const { $refs, line } = this;
      $refs.line.forEach((item, index) => {
        if (!index) {
          line[index] += 10;
          if (line[index] === 100) {
            line[index] = 0;
          }
        } else {
          const prev = line[index - 1];
          if (prev >= 50) {
            line[index] += 10;
            if (line[index] === 100) {
              line[index] = 0;
            }
          }
        }
        item.style.backgroundSize = `${line[index]}% 100%`;
      });
    }
  },
  beforeDestroy() {
    this.task && clearInterval(this.task);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.loading {
  width: 100%;
  height: 100%;
  position: relative;
  @include center;
  .book-loading-wrapper {
    width: px2rem(90);
    height: px2rem(65);
    border-radius: px2rem(5);
    border: px2rem(2) solid #b7b7b7;
    position: relative;
    @include center;
    .book-loading-line-item {
      flex: 1;
      width: 100%;
      height: 70%;
      flex-wrap: wrap;
      @include center;
      .line {
        width: px2rem(30);
        height: px2rem(2);
        background: linear-gradient(to left, #b7b7b7, #b7b7b7) no-repeat;
        background-size: 0% 100%;
      }
    }
    .book-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: px2rem(2);
      height: 100%;
      background: #b7b7b7;
    }
  }
}
</style>
