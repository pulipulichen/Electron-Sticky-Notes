import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'

new Vue({
  el: '#app',
  data: {
    config: {
    },
    status: {
      'test': '不ok'
    },
    lib: {
      
    },
  },
  components: { 
    'menu-bar': MenuBar
  }
})