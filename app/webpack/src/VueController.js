import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'
import ContentText from './components/ContentText/ContentText.vue'
import ContentImage from './components/ContentImage/ContentImage.vue'
const config = require('./config.js')
require('./styles/global.less')

import i18n from './VueI18n'

let VueController = {
  el: '#app',
  i18n: i18n,
  data: {
    config: config,
    status: {
      isMaximized: false,
      isPinTop: false,
      isReady: false,
      contentText: '',
      imageDataURL: null,
      filePath: null,
      fileType: 'plain-text', // default
      fontSizeAdjustIsEnlarge: null,
      mainComponent: null,
    },
    lib: {},
  },
  components: { 
    'menu-bar': MenuBar,
    'content-text': ContentText,
    'content-image': ContentImage,
  },
  mounted: function () {
    // 基本
    this.lib.ElectronHelper = RequireHelper.require('ElectronHelper')
    this.lib.ElectronFileHelper = RequireHelper.require('ElectronFileHelper')
    this.lib.ElectronImageFileHelper = RequireHelper.require('ElectronImageFileHelper')
    this.lib.ElectronTextFileHelper = RequireHelper.require('ElectronTextFileHelper')
    this.lib.electron = this.lib.ElectronHelper.getElectron()
    this.lib.remote = this.lib.electron.remote
    this.lib.win = this.lib.remote.getCurrentWindow()
    this.lib.ipc = this.lib.electron.ipcRenderer
    
    this.status.mode = this.lib.win.mode
    if (typeof(this.lib.win.filePath) === 'string') {
      this.status.filePath = this.lib.win.filePath
    }
    if (typeof(this.lib.win.contentText) === 'string') {
      this.status.contentText = this.lib.win.contentText
    }
    if (typeof(this.lib.win.imageDataURL) === 'string') {
      this.status.imageDataURL = this.lib.win.imageDataURL
    }
    
    //console.log(this.status.contentText)
    
    // 其他
    this.lib.ElectronHelper.mount(this, this.persistAttrs, () => {
      this._afterMounted()
    })
  },  // mounted: function () {
  methods: {
    _afterMounted: function () {
      //console.log(this.components)
      //this.components['menu-bar'].methods.resetNoteHeader()
      this.setupWindowSizeConfig()
      this.setupFile()
      
      this.$refs.MenuBar.resetNoteHeader()
      //console.log('OK')
      this.status.isReady = true
    },
    setupFile: function () {
      // -------------------------------------
      // For test
      
      if (this.config.debug.useTestContentText === true) {
        this.status.contentText = `<!-- Create a simple CodeMirror instance -->
  <link rel="stylesheet" href="lib/codemirror.css">
  <script src="lib/codemirror.js"></script>
  <script>
    var editor = CodeMirror.fromTextArea(myTextarea, {
      lineNumbers: true
    });
  </script>`
      }
      if (this.config.debug.useTestImageFile === true) {
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/dog 1280.jpg')
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/dog.jpg')
        //console.log(this.status.filePath)
        //console.log(this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath))
      }
      if (this.config.debug.useTestPlainTextFile === true) {
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/測試 中文檔案.txt')
        //console.log(this.status.filePath)
        //console.log(this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath))
      }
      
      // -------------------------------------
      // For test
      
      if (this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath)) {
        this.status.fileType = 'image'
        this.status.contentText = null
        this.status.mainComponent = this.$refs.ContentImage
      }
      else if (this.lib.ElectronTextFileHelper.isCodeFile(this.status.filePath)) {
        this.status.fileType = 'code'
        //this.status.mainComponent = this.$refs.ContentText
      }
      else if (this.lib.ElectronTextFileHelper.isTextFile(this.status.filePath)) {
        this.status.fileType = 'plain-text'
        this.status.contentText = this.lib.ElectronFileHelper.readFileSync(this.status.filePath)
        this.status.mainComponent = this.$refs.ContentText
      }
      else if (typeof(this.status.imageDataURL) === 'string') {
        this.status.fileType = 'image'
        this.status.contentText = null
        this.status.mainComponent = this.$refs.ContentImage
      }
      else {
        this.status.mainComponent = this.$refs.ContentText
      }
      
      return this
    },
    setupWindowSizeConfig: function () {
      this.config.maxHeight = Math.floor(screen.availHeight * this.config.maxHeightRatio)
      this.config.maxWidth = Math.floor(screen.availWidth * this.config.maxWidthRatio)
      
      return this
    },
    a: function () {
      // for test
      return 'AAA'
    }
  } // methods: {
}

new Vue(VueController)

window.VueController = VueController
