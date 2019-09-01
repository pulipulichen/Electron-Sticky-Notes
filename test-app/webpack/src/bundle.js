const $ = require('jquery')
console.log('hello world')
$(() => {
  alert(ElectronHelper.getBasePath())
})

import Vue from 'vue'

import App from './app.vue'

new Vue({
  el: '#app',
  components: { App }
})