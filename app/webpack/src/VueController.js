import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'
const config = require('./config.js')

console.log(config)

let VueController = {
  el: '#app',
  data: {
    config: config,
    status: {
      'test': '不ok'
    },
    lib: {
      
    },
  },
  components: { 
    'menu-bar': MenuBar
  }
}

new Vue(VueController)

window.VueController = VueController
