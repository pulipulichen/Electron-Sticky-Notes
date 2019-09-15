//const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
//window.CodeMirror = CodeMirror
require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const createCSSSelector = require('../../vendors/css-rule-builder/css-rule-builder.js')
const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
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
      styleSheet: null,
      type: 'text-code',
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
    },
    'progress.component': function () {
      if (this.progress.component === true 
              && this.status.fileType === this.type) {
        this.setupCode()
        this.progress.data = true
      }
    },
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
  /*
  mounted: function () {
   
    setTimeout(() => {
      //this.setupStyle()
      this.setupCode()
      //this.resizeToFitContent()
    }, 0)
  },
  */
  methods: {
    setupCode: function () {
      //console.log(this.status)
      //console.log([this.status.fileType === 'plain-text'
      //        , typeof(this.status.contentText) === 'string' 
      //        , this.status.contentText !== ''])
      if (this.status.fileType === 'text-code'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        this.contentText = this.lib.ElectronFileHelper.readFileSync(this.status.filePath)
        this.$parent.addRecent(this.contentText)
        this.setupMode()
        this.setupEditor()
        
        
        //console.log(this.contentText)
      }
      return this
    },
    setupMode: function () {
      // https://codemirror.net/mode/
      let ext = this.lib.ElectronFileHelper.getExt(this.status.filePath)
      switch (ext) {
        case 'asp':
        case 'aspx':
          this.mode = 'application/x-aspx'
          this.modePathList = [
            'css/css.js',
            'xml/xml.js',
            'javascript/javascript.js',
            'htmlembedded/htmlembedded.js'
          ]
          break
        case 'c':
          this.mode = 'text/x-csrc'
          this.modePathList = ['css/css.js']
          break
        case 'css':
        case 'less':
        case 'scss':
          this.mode = 'text/x-csrc'
          this.modePathList = ['clike/clike.js']
          break
        case 'jsp':
          this.mode = 'application/x-jsp'
          this.modePathList = [
            'css/css.js',
            'xml/xml.js',
            'javascript/javascript.js',
            'htmlembedded/htmlembedded.js'
          ]
          break
        case 'html':
        case 'htm':
        case 'xhtml':
          this.mode = 'text/html'
          this.modePathList = [
            'css/css.js',
            'xml/xml.js',
            'javascript/javascript.js',
            'htmlmixed/htmlmixed.js'
          ]
          break
        case 'java':
          this.mode = 'text/x-java'
          this.modePathList = ['clike/clike.js']
          break
        case 'js':
          this.mode = 'text/javascript'
          this.modePathList = ['javascript/javascript.js']
          break
        case 'json':
          this.mode = 'text/json'
          this.modePathList = ['javascript/javascript.js']
          break
        case 'pl':
          this.mode = 'text/x-perl'
          this.modePathList = ['perl/perl.js']
          break
        case 'php':
          this.mode = 'application/x-httpd-php'
          this.modePathList = [
            'css/css.js',
            'xml/xml.js',
            'javascript/javascript.js',
            'htmlmixed/htmlmixed.js',
            'clike/clike.js'
          ]
          break
        case 'py':
          this.mode = 'text/x-python'
          this.modePathList = ['python/python.js']
          break
        case 'r':
          this.mode = 'text/x-rsrc'
          this.modePathList = ['r/r.js']
          break
        case 'rb':
          this.mode = 'text/x-ruby'
          this.modePathList = ['ruby/ruby.js']
          break
        case 'sass':
          this.mode = 'text/x-sass'
          this.modePathList = ['sass/sass.js']
          break
        case 'sh':
          this.mode = 'text/x-sh'
          this.modePathList = ['shell/shell.js']
          break
        case 'sql':
          this.mode = 'text/x-sql'
          this.modePathList = ['sql/sql.js']
          break
        case 'vb':
          this.mode = 'text/vbscript'
          this.modePathList = ['vb/vb.js']
          break
        case 'vue':
          this.mode = 'text/x-vue'
          this.modePathList = ['vue/vue.js']
          break
        case 'xml':
          this.mode = 'application/xml'
          this.modePathList = ['xml/xml.js']
          break
        case 'yaml':
          this.mode = 'text/x-yaml'
          this.modePathList = ['yaml/yaml.js']
          break
        default:
          console.error(`Not config: ${ext}`)
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
            lineWrapping: true,
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
      if (this.progress.display === false) {
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
      if (typeof(filePath) !== 'string') {
        filePath = this.status.filePath
      }
      //console.error('saveFile: ' + filePath)
      this.lib.ElectronFileHelper.writeFileSync(filePath, this.getContent())
      return this
    },
    getFilters: function (filePath) {
      let ext = this.lib.ElectronFileHelper.getExt(filePath)
      return this.lib.ElectronFileHelper.getFilters(this.filterConfigJSON, ext)
    },
    openEditor: function () {
      this.saveFile() // 先儲存再開啟
      this.lib.ElectronFileHelper.openItem(this.status.filePath)
      return this
    }
  }
}