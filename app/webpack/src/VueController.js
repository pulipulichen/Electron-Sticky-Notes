import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'
const config = require('./config.js')

require('./styles/global.less')

let VueController = {
  el: '#app',
  data: {
    config: config,
    status: {
      isMaximized: false,
      isPinTop: false,
      isReady: false
    },
    lib: {
      
    },
  },
  components: { 
    'menu-bar': MenuBar
  },
  mounted: function () {
    // 基本
    this.lib.ElectronHelper = ElectronHelper
    this.lib.ElectronFileHelper = ElectronFileHelper
    this.lib.electron = RequireHelper.require('electron')
    this.lib.remote = this.lib.electron.remote
    this.lib.win = this.lib.remote.getCurrentWindow()
    this.lib.ipc = this.lib.electron.ipcRenderer
    
    this.status.mode = this.lib.win.mode
    this.status.filePath = this.lib.win.filePath
    
    // 其他
    this.lib.ElectronHelper.mount(this, this.persistAttrs, () => {
      this._afterMounted()
    })
  },  // mounted: function () {
  methods: {
    _afterMounted: function () {
      
      //console.log('OK')
      this.status.isReady = true
    }
  } // methods: {
}

new Vue(VueController)

window.VueController = VueController
