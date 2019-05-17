const actions = {
  setFontFamilyVisible: ({
    commit
  }, visible) => commit('SET_FONT_FAMILY_VISIBLE', visible),
  setDefaultFontFamily: ({
    commit
  }, font) => commit('SET_DEFAULT_FONT_FAMILY', font),
  setDefaultFontSize: ({
    commit
  }, fontSize) => commit('SET_DEFAULT_FONT_SIZE', fontSize),
  setSettingVisible: ({
    commit
  }, visible) => commit('SET_SETTING_VISIBLE', visible),
  setMenuVisible: ({
    commit
  }, visible) => commit('SET_MENU_VISIBLE', visible),
  setFileName: ({
    commit
  }, fileName) => commit('SET_FILENAME', fileName),
  setDefaultTheme: ({
    commit
  }, theme) => commit('SET_DEFAULT_THEME', theme),
  setBookAvailable: ({
    commit
  }, bookAvailable) => commit('SET_BOOK_AVAILABLE', bookAvailable),
  setProgress: ({
    commit
  }, progress) => commit('SET_PROGRESS', progress),
  setSection: ({
    commit
  }, section) => commit('SET_SECTION', section),
  setIsPaginating: ({
    commit
  }, isPaginating) => commit('SET_IS_PAGINATING', isPaginating),
  setCurrentBook: ({
    commit
  }, book) => commit('SET_CURRENT_BOOK', book),
  setNavigation: ({
    commit
  }, navigation) => commit('SET_NAVIGATION', navigation),
  setCover: ({
    commit
  }, cover) => commit('SET_COVER', cover),
  setMetadata: ({
    commit
  }, metadata) => commit('SET_METADATA', metadata),
  setPaginate: ({
    commit
  }, paginate) => commit('SET_PAGINATE', paginate),
  setPagelist: ({
    commit
  }, pagelist) => commit('SET_PAGELIST', pagelist),
  setIsBookmark({
    commit
  }, isBookmark) {
    return commit('SET_IS_BOOKMARK', isBookmark);
  },
  setOffsetY({
    commit
  }, offsetY) {
    return commit('SET_OFFSETY', offsetY);
  },
  setSpeakingIconBottom({
    commit
  }, speakingIconBottom) {
    commit('SET_SPEAKING_ICON_BOTTOM', speakingIconBottom);
  }
};

export default actions;
