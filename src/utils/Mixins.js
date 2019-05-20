import {
  mapGetters,
  mapActions
} from 'vuex';
import {
  THEME_LIST
} from './Book';
import {
  addCss,
  removeAllCss,
  getReadTimeByMinute
} from './utils';
import {
  setLocation
} from "./localStorage";

// import * as Storage from "./localStorage";

const BookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pageList',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ]),
    themeList() {
      return THEME_LIST(this);
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPageList',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom'
    ]),
    initGlobalStyle() {
      const href = `${
        process.env.VUE_APP_RES_URL
      }/theme/theme_${this.defaultTheme.toLowerCase()}.css`;
      removeAllCss();
      addCss(href);
    },
    // 章节跳转时，更新进度
    refreshLocation() {
      const {
          currentBook,
          fileName
        } = this,
        currentLocation = currentBook.rendition.currentLocation(),
        startCfi = currentLocation.start.cfi,
        progress = currentBook.locations.percentageFromCfi(startCfi);

      this.setProgress(Math.floor(progress * 100));
      this.setSection(currentLocation.start.index);
      setLocation(fileName, startCfi);
    },
    // 通用显示方法
    display(target, cb = () => {}) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation();
          cb && cb();
        });
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation();
          cb && cb();
        });
      }
    },
    getReadTime() {
      return this.$t("book.haveRead").replace("$1", getReadTimeByMinute(this.fileName));
    }
    // getSectionName() {
    //   if (this.section) {
    //     const section = this.currentBook.section(this.section);
    //     if (section && section.href && this.currentBook && this.currentBook.navigation) {
    //       return this.navigation[this.section].label;
    //     }
    //   }
    // }
  }
};

export default BookMixin;
