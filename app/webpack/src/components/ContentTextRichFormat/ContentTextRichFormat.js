require('../../vendors/summernote/summernote-lite')
const Summernote = require('../../vendors/summernote/summernote-lite')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    let data = {
      padding: 17,
      detector: null,
      mode: '',
      modePathList: [],
      contentHTML: '',
      $container: null,
      $editor: null,
      codeMirrorEditor: null,
      $CodeMirror: null,
      styleSheet: null,
      // https://fileinfo.com/extension/css
      filterConfigJSON: {
        'asp': 'Active Server Page',
        'aspx': 'Active Server Page Extended File',
        'c': 'C/C++ Source Code File',
        'css': 'Cascading Style Sheet',
        'jsp': 'Java Server Page',
        'html': 'Hypertext Markup Language File',
        'htm': 'Hypertext Markup Language File',
        'java': 'Java Source Code File',
        'less': 'LESS Style Sheet',
        'js': 'JavaScript File',
        'json': 'JavaScript Object Notation File',
        'pl': 'Perl Script',
        'php': 'PHP Source Code File',
        'py': 'Python Script',
        'r': 'R Script File',
        'rb': 'Ruby Source Code',
        'sass': 'Syntactically Awesome StyleSheets File',
        'scss': 'Sass Cascading Style Sheet',
        'sh': 'Bash Shell Script',
        'sql': 'Structured Query Language Data File',
        'vb': 'Visual Basic Project Item File',
        'vue': 'Vue.js Single-file components',
        'xhtml': 'Extensible Hypertext Markup Language ',
        'xml': 'XML File',
        'yaml': 'YAML Document'
      }
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
      let detectorText = this.contentHTML
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
      this.setupDocument()
      //this.resizeToFitContent()
    }, 0)
  },
  methods: {
    setupDocument: function () {
      //console.log(this.status)
      //console.log([this.status.fileType === 'plain-text'
      //        , typeof(this.status.contentText) === 'string' 
      //        , this.status.contentText !== ''])
      if (this.status.fileType === 'text-rich-format'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        
        this.contentHTML = this.convertToHTML(this.status.filePath)
        this.setupEditor()
        
      }
      return this
    },
    convertToHTML: function (filePath) {
      console.log(`convertToHTML: ${filePath}`)
      
      return `<h1>${filePath}</h1><p>Hello world</p>`
    },
    setupEditor: function () {
      this.$container = window.$('<div id="ContentRichTextContainer"></div>')
              .css('top', this.config.menuBarHeight + 'px')
              .css('height', `calc(100vh - ${this.config.menuBarHeight}px)`)
              .appendTo('body')
      this.$editor = window.$('<textarea></textarea>')
              .val(this.contentHTML)
              .attr('id', 'summernote')
              .appendTo(this.$container)
      
      window.$('#summernote').summernote();
        
      return this
    },
    resizeToFitContent: function (isRestrictSize) {
      //window.resizeTo(800,800)
      //return console.error('resizeToFitContent')
      
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        //console.log(width, height)
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
      
      /*
      console.log([width, windowWidth])
      console.log([height, windowHeight])
      console.log((width > windowWidth 
              || height > windowHeight))
      */
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
      if (this.codeMirrorEditor === undefined || this.codeMirrorEditor === null) {
        return ''
      }
      return this.codeMirrorEditor.getValue()
    },
    saveFile: function (filePath) {
      //console.error('saveFile: ' + filePath)
      this.lib.ElectronFileHelper.writeFileSync(filePath, this.getContent())
      return this
    },
    getFilters: function (filePath) {
      let ext = this.lib.ElectronFileHelper.getExt(filePath)
      return this.lib.ElectronFileHelper.getFilters(this.filterConfigJSON, ext)
    }
  }
}