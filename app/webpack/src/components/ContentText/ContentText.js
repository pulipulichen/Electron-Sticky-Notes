const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    let data = {
      padding: 15,
      detector: null,
      contentText: '',
      type: 'text',
      // https://fileinfo.com/extension/css
      filterConfigJSON: {
        'txt': 'Plain Text File',
        'au3': 'AutoIt v3 Script',
        'arff': 'Attribute-Relation File Format',
        'bat': 'DOS Batch File',
        'csv': 'Comma Separated Values File',
        'gitignore': 'Git Ignore File',
        'ini': 'Windows Initialization File',
        'md': 'Markdown Documentation File',
        'reg': 'Registry File',
        'tsv': 'Tab Separated Values File'
      }
    }
    
    this.$i18n.locale = this.config.locale
    return data
  },
  computed: {
    displayContentText: function () {
      let contentText = this.contentText
      return contentText
    },
    styleFontSize: function () {
      return `calc(1rem * ${this.config.fontSizeRatio})`
    },
    styleLineHeight: function () {
      let lineHeight = `calc(1.5rem * ${this.config.fontSizeRatio})`
      
      if (this.status.fontSizeAdjustIsEnlarge) {
        this.resizeIfOverflow()
      }
      
      return lineHeight
    },
    detectorText: function () {
      let detectorText = this.contentText
      if (detectorText.endsWith('\n')) {
        detectorText = detectorText + '|'
      }
      return detectorText
    }
  },
  watch: {
    'progress.component': function () {
      if (this.progress.component === true 
              && this.status.fileType === this.type) {
        this.setupText()
        this.resizeToFitContent()
        this.progress.data = true
      }
    },
    'progress.display': function () {
      if (this.progress.display === true 
              && this.status.fileType === this.type) {
        this.$refs.Textarea.focus()
      }
    }
  },
  /*
  mounted: function () {
    setTimeout(() => {
      this.setupText()
      this.resizeToFitContent()
    }, 0)
  },
  */
  methods: {
    setupText: function () {
      //console.log(this.status)
      //console.log([this.status.fileType === 'plain-text'
      //        , typeof(this.status.contentText) === 'string' 
      //        , this.status.contentText !== ''])
      //console.log(this.status.contentText)
      if (this.status.fileType === 'text'
              && typeof(this.status.contentText) === 'string' 
              && this.status.contentText !== '') {
        this.contentText = this.status.contentText
        
        if (typeof(this.status.filePath) === 'string') {
          this.$parent.addRecent(this.contentText)
        }
        //console.log(this.contentText)
      }
      return this
    },
    resizeToFitContent: function (isRestrictSize) {
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        this.lib.WindowHelper.resizeToFitContent(width, this.config.minWidthPx, height, this.config.minHeightPx, isRestrictSize)
      }, 0)
      return this
    },
    getSizeOfDetector: function () {
      if (this.detector === null) {
        this.detector = window.$(this.$refs.ResizeDetector)
      }
      let width = this.detector.width()
      width = width + this.padding
      
      let height = this.detector.height()
      height = height + this.config.menuBarHeight + this.padding
      return {
        width: width,
        height: height
      }
    },
    resizeIfOverflow: function () {
      if (this.progress.display === false) {
        return this
      }
      
      let {width, height} = this.getSizeOfDetector()
      
      let windowWidth = window.innerWidth
      let windowHeight = window.innerHeight
      
      //console.log([width, windowWidth])
      //console.log([height, windowHeight])
      
      if (width > windowWidth 
              || height > windowHeight) {
        return this.resizeToFitContent(false)
      }
      
      return this
    },
    createTempFile: function () {
      let content = this.contentText
      
      // 我需要一個檔案名稱
      let filename = `tmp-${DateHelper.getCurrentTimeString()}.txt`
      let filepath = this.lib.ElectronFileHelper.resolve(`cache/${filename}`)
      this.lib.ElectronFileHelper.writeFileSync(filepath, content)
      
      return filepath
    },
    getContent: function () {
      return this.contentText
    },
    saveFile: function (filePath) {
      //console.error('saveFile: ' + filePath)
      if (typeof(filePath) !== 'string') {
        filePath = this.status.filePath
      }
      let contentText = this.getContent()
      this.$parent.addRecent(contentText)
      this.lib.ElectronFileHelper.writeFileSync(filePath, contentText)
      return this
    },
    getFilters: function (filePath) {
      return this.lib.ElectronFileHelper.getFilters(this.filterConfigJSON, filePath)
    },
    openEditor: function () {
      if (typeof(this.status.filePath) === 'string') {
        this.saveFile() // 先儲存再開啟
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
    change: function () {
      //console.log('change', this.status.enableAutoSave)
      if (this.status.enableAutoSave === true) {
        if (typeof(this.status.filePath) !== 'string') {
          this.status.filePath = this.createTempFile()
        }

        this.$parent.addRecent(this.contentText)
      }
    },
  }
}