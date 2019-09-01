const $ = require('jquery')
console.log('hello world')
$(() => {
  console.log(ElectronHelper.getBasePath())
})

import Vue from 'vue'
import MenuBar from './MenuBar/MenuBar.vue'

new Vue({
  el: '#app',
  data: {
    config: {
      
    },
    status: {
      'test': 'ok嗎？'
    },
    lib: {
      
    },
  },
  components: { 
    'menu-bar': MenuBar
  }
})