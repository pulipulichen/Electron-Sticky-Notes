
module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(this.$parent.a())
    return {
    }
  },
  computed: {
    enableSaveFile: function () {
      let typeMatched = (['plain-text', 'code', 'rich-format'].indexOf(this.status.fileType) > -1)
      return (typeMatched && typeof(this.status.filePath) === 'string')
    },
    enableSaveFileAs: function () {
      return (['plain-text', 'code', 'rich-format', 'image'].indexOf(this.status.fileType) > -1)
    }
  },
  mounted: function () {
    this.initIPC()
  },
  methods: {
    initIPC: function () {
      this.lib.ipc.on('file-selected-callback', (filePath) => {
        this.saveFileAsCallback(filePath)
      })
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
    saveFile: function () {
      //console.log('saveFile')
      this.status.mainComponent.saveFile(this.status.filePath)
      return this
    },
    saveFileAs: function () {
      //console.log('saveFileAs')
      // select a path
      let dir = this.lib.ElectronFileHelper.dirname(this.status.filePath)
      let filters = this.status.mainComponent.getFilters(this.status.filePath)
      
      this.lib.ipc.send('open-file-select-dialog', null, dir, filters)
      
      return this
    },
    saveFileAsCallback: function (filePath) {
      if (typeof(filePath) === 'string') {
        this.status.mainComponent.saveFile(filePath)
        
        // 更換標題
        this.status.filePath = filePath
        this.$parent.resetNoteHeader()
      }
    }
  }
}