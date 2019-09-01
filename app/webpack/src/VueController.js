import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'

require('./vendors/semantic-ui/semantic.min.css')
require('./vendors/semantic-ui/semantic.min.js')

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-tw', // set locale
})

new Vue({
  el: '#app',
  data: {
    config: {
      
    },
    status: {
      'test': '很ok'
    },
    lib: {
      
    },
  },
  components: { 
    'menu-bar': MenuBar
  }
})