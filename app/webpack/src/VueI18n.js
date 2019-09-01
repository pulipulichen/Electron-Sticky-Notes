import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)

import i18nGlobal from './i18n/i18n-global.conf.js'

const i18n = new VueI18n({
  locale: 'zh-TW', // set locale
  messages: i18nGlobal,
  silentTranslationWarn: true,
})
