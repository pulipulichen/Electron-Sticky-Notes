import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'

require('./vendors/semantic-ui/semantic.min.css')
require('./vendors/semantic-ui/semantic.min.js')

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