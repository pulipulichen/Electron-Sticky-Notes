const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(this.$parent.a())
    return {
      header: '',
      beforeMaximizeIsPinTop: this.status.isPinTop,
      maxIntervalMS: null,
      $NoteHeader: null,
      draggableTimer: false
    }
  },
  computed: {
    enableFontSizeControl: function () {
      return (['plain-text', 'code', 'rich-format'].indexOf(this.status.fileType) > -1)
    },
    enableSaveFile: function () {
      return this.enableFontSizeControl
    }
  },
  mounted: function () {
    window.$(this.$refs.Submenu).dropdown()
  },
  methods: {
    toggleAlwaysOnTop: function (isPinTop) {
      if (typeof(isPinTop) !== 'boolean') {
        this.status.isPinTop = (this.status.isPinTop === false)
        isPinTop = this.status.isPinTop
      }
      else {
        this.status.isPinTop = isPinTop
      }
      this.lib.win.setAlwaysOnTop(isPinTop)
      return this
    },
    minimize: function () {
      this.lib.win.minimize()
      return this
    },
    maximize: function () {
      this.lib.win.maximize()
      this.status.isMaximized = true
      this.beforeMaximizeIsPinTop = this.status.isPinTop
      this.status.isPinTop = false
      return this
    },
    unmaximize: function () {
      // 這個我們可能要自己做resize
      this.lib.win.restore()
      this.status.isMaximized = false
      this.status.isPinTop = this.beforeMaximizeIsPinTop
      return this
    },
    toggleMaximize: function () {
      if (this.status.isMaximized) {
        return this.unmaximize()
      }
      else {
        return this.maximize()
      }
    },
    resizeToFitContent: function () {
      //this.$parent.$refs.ContentText.resizeToFitContent()
      this.status.mainComponent.resizeToFitContent()
      return this
    },
    close: function () {
      this.lib.win.close()
      return this
    },
    setNoteHeader: function (header) {
      if (typeof(header) === 'string' 
              && header.trim() !== '') {
        header = header.trim()
        this.header = header
        document.title = header
      }
      else {
        this.resetNoteHeader()
      }
      return this
    },
    resetNoteHeader: function () {
      let header = DateHelper.getMMDDHHmm()
      let contenxtText = this.status.contentText
      if (typeof(this.status.filePath) === 'string') {
        contenxtText = this.lib.ElectronFileHelper.basename(this.status.filePath)
      }
      //console.log(contenxtText)
      //console.log(this.status.filePath)
      if (typeof(contenxtText) === 'string') {
        if (contenxtText.length > 100) {
          contenxtText = contenxtText.slice(0, 100) + '...'
        }
        header = header + ' ' + contenxtText
      }
      
      return this.setNoteHeader(header)
    },
    openFolder: function () {
      //console.error('openFolder')
      this.lib.ElectronFileHelper.showInFolder(this.status.filePath)
      return this
    },
    openEditor: function () {
      //console.error('openEdtior')
      if (typeof(this.status.filePath) === 'string') {
        this.lib.ElectronFileHelper.openItem(this.status.filePath)
      }
      else {
        // 建立暫存檔案
        let tmpFilePath = this.status.mainComponent.createTempFile()
        // 開啟暫存檔案
        this.lib.ElectronFileHelper.openItem(tmpFilePath)
        
        this.cleanTempFile()
      }
      return this
    },
    cleanTempFile: function () {
      //console.error('cleanTempFile')
      let cacheDirPath = this.lib.ElectronFileHelper.resolve('cache')
      this.lib.ElectronFileHelper.removeIfExpire(cacheDirPath)
      return this
    },
    fontSizePlus: function () {
      this.config.fontSizeRatio = this.config.fontSizeRatio + this.config.fontSizeAdjustInterval
      this.status.fontSizeAdjustIsEnlarge = true
      //console.log(this.config.fontSizeRatio)
      return this
    },
    fontSizeMinus: function () {
      this.config.fontSizeRatio = this.config.fontSizeRatio - this.config.fontSizeAdjustInterval
      this.status.fontSizeAdjustIsEnlarge = false
      //console.log(this.config.fontSizeRatio)
      return this
    },
    enableDraggable: function (e) {
      // Movable after 700MS
      let mouseX = e.clientX;  
      let mouseY = e.clientY;
      let animationId
      
      let onMouseUp = () => {
        e.srcElement.removeEventListener('mouseup', onMouseUp)
        cancelAnimationFrame(animationId)
        //console.log('onMouseUp canceld')
        this.draggableTimer = false
      }
      
      let moveWindow = () => {
        this.lib.ipc.send('windowMoving', { mouseX, mouseY });
        animationId = requestAnimationFrame(moveWindow);
      }

      //console.log(e)
      
      this.draggableTimer = setTimeout(() => {
        e.srcElement.addEventListener('mouseup', onMouseUp)
        requestAnimationFrame(moveWindow);
      }, 500)
      return this
    },
    disableDraggable: function () {
      if (this.draggableTimer !== false) {
        clearTimeout(this.draggableTimer)
        this.draggableTimer = false
      }
      return this
    },
    saveFile: function () {
      console.log('saveFile')
      return this
    },
    saveFileAs: function () {
      console.log('saveFileAs')
      return this
    }
  }
}