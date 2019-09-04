//const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
//window.CodeMirror = CodeMirror
require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const createCSSSelector = require('../../vendors/css-rule-builder/css-rule-builder.js')
const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    let data = {
      padding: 17,
      detector: null,
      mode: '',
      modePathList: [],
      contentText: '',
      $container: null,
      $editor: null,
      codeMirrorEditor: null,
      $CodeMirror: null,
      styleSheet: null
    }
    
    this.$i18n.locale = this.config.locale
    return data
  },
  watch: {
    'config.fontSizeRatio': function () {
      //console.log(`font-size: calc(1rem * ${this.config.fontSizeRatio}) !important;`)
      //this.styleSheet = createCSSSelector('.CodeMirror', `font-size: calc(1rem * ${this.config.fontSizeRatio}) !important;`, this.styleSheet)
      if (this.$CodeMirror === null || this.$CodeMirror === undefined) {
        this.$CodeMirror = window.$('.CodeMirror:first')
        //console.log(this.$CodeMirror.length)
        if (this.$CodeMirror.length === 1) {
        }
        else {
          this.$CodeMirror = null
        }
      }
      
      if (this.$CodeMirror !== null) {
        this.$CodeMirror.css('font-size', `calc(1rem * ${this.config.fontSizeRatio})`)
                  .css('line-height', `calc(1em * ${this.config.fontSizeRatio} + 0.4285em)`)
        this.codeMirrorEditor.refresh()
      }
    }
  },
  computed: {
    detectorText: function () {
      let detectorText = this.contentText
      if (detectorText.endsWith('\n')) {
        detectorText = detectorText + '|'
      }
      return detectorText
    },
    
    styleFontSize: function () {
      return `calc(1em * ${this.config.fontSizeRatio})`
    },
    styleLineHeight: function () {
      let lineHeight = `calc(1em * ${this.config.fontSizeRatio} + 0.4285em)`
      
      if (this.status.fontSizeAdjustIsEnlarge) {
        this.resizeIfOverflow()
      }
      
      return lineHeight
    },
  },
  mounted: function () {
   
    setTimeout(() => {
      //this.setupStyle()
      this.setupCode()
      //this.resizeToFitContent()
    }, 0)
  },
  methods: {
    setupCode: function () {
      //console.log(this.status)
      //console.log([this.status.fileType === 'plain-text'
      //        , typeof(this.status.contentText) === 'string' 
      //        , this.status.contentText !== ''])
      if (this.status.fileType === 'code'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        this.contentText = this.lib.ElectronFileHelper.readFileSync(this.status.filePath)
        
        this.setupMode()
        this.setupEditor()
        
        
        //console.log(this.contentText)
      }
      return this
    },
    setupMode: function () {
      // https://codemirror.net/mode/
      let ext = this.lib.ElectronFileHelper.getExt(this.status.filePath)
      if (ext === 'css') {
        this.mode = 'text/css'
        this.modePathList = ['css/css.js']
      }
      else if (ext === 'jsp') {
        this.mode = 'application/x-jsp'
        this.modePathList = ['htmlembedded/htmlembedded.js']
      }
      else if (ext === 'asp' || ext === 'aspx') {
        this.mode = 'application/x-jsp'
        this.modePathList = ['application/x-aspx']
      }
      else if (ext === 'html' || ext === 'htm') {
        this.mode = 'text/html'
        this.modePathList = [
          'css/css.js',
          'xml/xml.js',
          'javascript/javascript.js',
          'htmlmixed/htmlmixed.js'
        ]
      }
      else if (ext === 'java') {
        this.mode = 'text/x-java'
        this.modePathList = ['clike/clike.js']
      }
      else if (ext === 'js') {
        this.mode = 'text/javascript'
        this.modePathList = ['javascript/javascript.js']
      }
      else if (ext === 'json') {
        this.mode = 'text/json'
        this.modePathList = ['javascript/javascript.js']
      }
      else {
        console.error('尚未設定完成: ' + ext)
      }

      return this
    },
    setupEditor: function () {
      this.$container = window.$('<div id="ContentCodeContainer"></div>')
              .css('top', this.config.menuBarHeight + 'px')
              .css('height', `calc(100vh - ${this.config.menuBarHeight}px)`)
              .appendTo('body')
      this.$editor = window.$('<textarea></textarea>')
              .val(this.contentText)
              .appendTo(this.$container)
      
      /*
      this.modePathList.forEach(path => {
        let modeFilePath = '../../vendors/codemirror-5.48.4/mode/' + path
        console.log(modeFilePath)
        //require(modeFilePath)
      })
      
      CodeMirror.fromTextArea(this.$editor[0], {
        lineNumbers: true,
        mode: this.modePath,
        matchBrackets: true
      })
      */
     
      let $ = window.$
      let loop = (i) => {
        if (i < this.modePathList.length) {
          let modePath = this.modePathList[i]
          modePath = 'webpack/src/vendors/codemirror-5.48.4/mode/' + modePath
          //console.log(modePath)
          //$(`<script src="${modePath}"></script>`).appendTo('head')
          //window.$.getScript(modePath, () => {
          $.getScript(modePath, () => {
            i++
            loop(i)
          })
        }
        else {
          this.codeMirrorEditor = CodeMirror.fromTextArea(this.$editor[0], {
            lineNumbers: false,
            mode: this.mode,
            matchBrackets: true
          })
          
          //window.$('.CodeMirror-scroll').css('height', `calc(100vh - ${this.config.menuBarHeight}px)`)
          window.$('.CodeMirror:first').css('height', `calc(100vh - ${this.config.menuBarHeight}px)`)
          
          this.resizeToFitContent()
        }
      }
      
      $.getScript('webpack/src/vendors/codemirror-5.48.4/lib/codemirror.js', () => {
        loop(0)
      })
      
      /*
      let $ = window.$
      $.getScript('webpack/src/vendors/codemirror-5.48.4/lib/codemirror.js', () => {
        $.getScript('webpack/src/vendors/codemirror-5.48.4/mode/javascript/javascript.js', () => {
          CodeMirror.fromTextArea(this.$editor[0], {
            lineNumbers: true,
            mode: 'text/javascript',
            matchBrackets: true
          })
        })
      })
       */
     
          
      
      return this
    },
    resizeToFitContent: function () {
      //window.resizeTo(800,800)
      //return console.error('resizeToFitContent')
      
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        
        if (width < this.config.minWidthPx) {
          width = this.config.minWidthPx
        }
        if (height < this.config.minHeightPx) {
          height = this.config.minHeightPx
        }
        
        //console.log(width, height)
        window.resizeTo(width, height)
      }, 0)
      return this
    },
    getSizeOfDetector: function () {
      if (this.detector === null) {
        this.detector = window.$(this.$refs.ResizeDetector)
      }
      let width = this.detector.width()
      width = width + this.padding
      //width = Math.ceil(width)
      
      let height = this.detector.height()
      height = height + this.config.menuBarHeight + this.padding
      //height = Math.ceil(height)
      
      return {
        width: width,
        height: height
      }
    },
    resizeIfOverflow: function () {
      if (this.status.isReady === false) {
        return this
      }
      
      let {width, height} = this.getSizeOfDetector()
      
      let windowWidth = window.innerWidth
      let windowHeight = window.innerHeight
      
      //console.log([width, windowWidth])
      //console.log([height, windowHeight])
      
      if (width > windowWidth 
              || height > windowHeight) {
        return this.resizeToFitContent()
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
      if (this.codeMirrorEditor === undefined || this.codeMirrorEditor === null) {
        return ''
      }
      return this.codeMirrorEditor.getValue()
    },
    saveFile: function (filePath) {
      console.error('saveFile: ' + filePath)
      return this
    }
  }
}