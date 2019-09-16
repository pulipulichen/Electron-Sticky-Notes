import Vue from 'vue'
import MenuBar from './components/MenuBar/MenuBar.vue'
import ContentText from './components/ContentText/ContentText.vue'
import ContentImageViewer from './components/ContentImageViewer/ContentImageViewer.vue'
import ContentImageStatic from './components/ContentImageStatic/ContentImageStatic.vue'
import ContentTextCode from './components/ContentTextCode/ContentTextCode.vue'
import ContentTextRichFormat from './components/ContentTextRichFormat/ContentTextRichFormat.vue'
const config = require('./config.js')
require('./styles/global.less')
import WindowHelper from './helpers/WindowHelper'

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import i18n from './VueI18n'

const keypress = require('./vendors/keypress/keypress')


let VueController = {
  el: '#app',
  i18n: i18n,
  data: {
    config: config,
    status: {
      winID: null,
      isMaximized: false,
      isPinTop: false,
      contentText: '',
      imageDataURL: null,
      filePath: null,
      fileType: 'text', // default
      fontSizeAdjustIsEnlarge: null,
      mainComponent: null,
      theme: null,
      platform: 'win32',
      enableAutoSave: false,
      recentFileList: [],
      
      //isReady: false,
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {},
    persistAttrs: ['status.recentFileList']
  },
  components: { 
    'menu-bar': MenuBar,
    'content-text': ContentText,
    'content-image-viewer': ContentImageViewer,
    'content-image-static': ContentImageStatic,
    'content-text-code': ContentTextCode,
    'content-text-rich-format': ContentTextRichFormat,
  },
  watch: {
    'progress.display': function () {
      if (this.progress.display === true) {
        this.lib.win.show()
      }
    },
    'progress.data': function () {
      if (this.progress.data === true) {
        this.progress.display = true
      }
    }
  },
  mounted: function () {
    // 基本
    this.lib.ElectronHelper = RequireHelper.require('ElectronHelper')
    this.lib.ElectronFileHelper = RequireHelper.require('ElectronFileHelper')
    this.lib.ElectronImageFileHelper = RequireHelper.require('ElectronImageFileHelper')
    this.lib.ElectronTextFileHelper = RequireHelper.require('ElectronTextFileHelper')
    this.lib.ImageMagickHelper = RequireHelper.require('ImageMagickHelper')
    
    this.lib.electron = this.lib.ElectronHelper.getElectron()
    this.lib.remote = this.lib.electron.remote
    this.lib.win = this.lib.remote.getCurrentWindow()
    this.lib.ipc = this.lib.electron.ipcRenderer
    
    this.lib.WindowHelper = WindowHelper
    this.lib.keypress = new keypress.Listener();
    
    this.status.platform = this.lib.ElectronHelper.getPlatform()
    
    this.status.mode = this.lib.win.mode
    if (typeof(this.lib.win.filePath) === 'string') {
      this.status.filePath = this.lib.win.filePath
    }
    if (typeof(this.lib.win.contentText) === 'string') {
      this.status.contentText = this.lib.win.contentText
      this.status.enableAutoSave = true
    }
    if (typeof(this.lib.win.imageDataURL) === 'string') {
      this.status.imageDataURL = this.lib.win.imageDataURL
    }
    if (this.lib.win.enableAutoSave === true) {
      this.status.enableAutoSave = true
    }
    
    //console.log(this.status.contentText)
    
    // 其他
    
    this.setupFile()
      
    this.lib.ElectronHelper.mount(this, this.persistAttrs, () => {
      //console.log(this.status.recentFileList)
      this.removeExpiredCache()
      this._afterMounted()
    })
  },  // mounted: function () {
  methods: {
    _afterMounted: function () {
      //console.log(this.components)
      //this.components['menu-bar'].methods.resetNoteHeader()
      this.setupWindowSizeConfig()
      
      this.$refs.MenuBar.resetNoteHeader()
      //console.log('OK')
      setTimeout(() => {
        this.progress.component = true
      }, 0)
    },
    setupFile: function () {
      // -------------------------------------
      // For test
      
      if (this.config.debug.useTestContentText === true) {
        this.status.contentText = `<!-- Create a simple CodeMirror instance -->
  
  <script>
    let message = 'Hello world.'
  </script>`
      }
      if (this.config.debug.useTestImageStaticFile === true) {
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/android-extension.svg')
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/red truck.svg')
      }
      if (this.config.debug.useTestImageViewerFile === true) {
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/dog 1280.webp')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/rstudio-ball.ico')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/git.png')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/dog.jpg')
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/red truck.png')
        //console.log(this.status.filePath)
        //console.log(this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath))
      }
      if (this.config.debug.useTestCodeFile === true) {
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/postcss.config.js')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/newhtml.html')
        //console.log(this.status.filePath)
        //console.log(this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath))
      }
      if (this.config.debug.useTestPlainTextFile === true) {
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/測試 中文檔案.txt')
        //console.log(this.status.filePath)
        //console.log(this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath))
      }
      if (this.config.debug.useTestRichFormatTextFile === true) {
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/README.md')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/hello world.word.docx')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/hello world.odt.docx')
        this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/hello world.odt')
        //this.status.filePath = this.lib.ElectronFileHelper.resolve('demo/hello world.rtf')
        //console.log(this.status.filePath)
        //console.log(this.lib.ElectronImageFileHelper.isImageFile(this.status.filePath))
      }
      
      // -------------------------------------
      // For test
      
      if (this.lib.ElectronImageFileHelper.isStaticImageFile(this.status.filePath)) {
        this.status.fileType = 'image-static'
        this.status.contentText = null
        this.status.mainComponent = this.$refs.ContentImageStatic
        //this.addRecent()
      }
      else if (this.lib.ElectronImageFileHelper.isViewerSupportedImageFile(this.status.filePath)) {
        this.status.fileType = 'image-viewer'
        this.status.contentText = null
        this.status.mainComponent = this.$refs.ContentImageViewer
        //this.addRecent()
      }
      else if (this.lib.ElectronTextFileHelper.isCodeFile(this.status.filePath)) {
        this.status.fileType = 'text-code'
        this.status.contentText = null
        this.status.mainComponent = this.$refs.ContentTextCode
      }
      else if (this.lib.ElectronTextFileHelper.isTextFile(this.status.filePath)) {
        this.status.fileType = 'text'
        this.status.contentText = this.lib.ElectronFileHelper.readFileSync(this.status.filePath)
        //console.log(this.status.contentText)
        this.status.mainComponent = this.$refs.ContentText
        //this.addRecent(this.status.contentText)
      }
      else if (this.lib.ElectronTextFileHelper.isRichFormatFile(this.status.filePath)) {
        this.status.fileType = 'text-rich-format'
        this.status.mainComponent = this.$refs.ContentTextRichFormat
      }
      else if (typeof(this.status.imageDataURL) === 'string') {
        this.status.fileType = 'image-viewer'
        this.status.contentText = null
        this.status.mainComponent = this.$refs.ContentImage
        //this.addRecent()
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
    removeExpiredCache: function () {
      let cachePath = this.lib.ElectronFileHelper.resolve(`cache`)
      this.lib.ElectronFileHelper.readDirectory(cachePath, (data) => {
        data.file.forEach(file => {
          let isInRecent = false
          for (let i = 0; i < this.status.recentFileList.length; i++) {
            if (this.status.recentFileList[i].filePath === file) {
              isInRecent = true
              break
            }
          }
          
          if (isInRecent === false 
                  && file.indexOf('tmp-') > -1 
                  && file.endsWith('.txt')) {
            this.lib.ElectronFileHelper.removeIfExpire(file, this.config.cacheAliveDay)
          }
        })
      })
      return this
    },
    addRecent: function (contentText) {
      let fileType = this.status.fileType
      let filePath = this.status.filePath
      
      // check if recent list has same filePath
      let list = this.status.recentFileList.filter(file => {
        return (file.filePath !== filePath)
      })
      
      if (typeof(contentText) === 'string' && contentText.length > 100) {
        contentText = contentText.slice(0, 100)
      }
      
      list.unshift({
        fileType: fileType,
        filePath: filePath,
        contentText: contentText,
        updateUnixMS: (new Date()).getTime()
      })
      
      this.status.recentFileList = list.slice(0, this.config.maxRecentFileListCount)
      //console.log(this.status.recentFileList)
      
      this.lib.ElectronHelper.persist(this, this.persistAttrs)
      return this
    }
  } // methods: {
}

new Vue(VueController)

window.VueController = VueController
