import { createI18n } from 'vue-i18n';
import en from './locale/en.json';
import es from './locale/es.json';

export default createI18n({
  legacy: false,
  locale: document.documentElement.lang || 'en',
  fallbackLocale: 'en',
  messages: { en, es },
});
