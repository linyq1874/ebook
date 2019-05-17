import Vue from 'vue';
import Vuex from 'vuex';
import book from './modules/book';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book
  },
  actions,
  getters
});
