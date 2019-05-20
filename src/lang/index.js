import Vue from 'vue';
import VueI18N from 'vue-i18n';
import en from './en';
import cn from './cn';
import {
  getLocale
} from '@/utils/localStorage';

Vue.use(VueI18N);

const messages = {
  en,
  cn
};

const locale = getLocale() || 'cn';

const i18n = new VueI18N({
  locale,
  messages
});

export default i18n;
