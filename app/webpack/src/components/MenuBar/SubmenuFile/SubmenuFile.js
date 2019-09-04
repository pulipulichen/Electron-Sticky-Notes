
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
      return this.enableFontSizeControl
    }
  },
  //mounted: function () {
  //},
  methods: {
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
      console.log('saveFile')
      return this
    },
    saveFileAs: function () {
      console.log('saveFileAs')
      return this
    }
  }
}