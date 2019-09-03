//const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
//window.CodeMirror = CodeMirror
require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    let data = {
      padding: 15,
      detector: null,
      mode: '',
      modePathList: [],
      contentText: '',
      $container: null,
      $editor: null
    }
    
    this.$i18n.locale = this.config.locale
    return data
  },
  computed: {
  },
  mounted: function () {
    /*
    let c = $('<div></div>')
            .css({
              position: 'absolute',
              top: '40px'
            }).appendTo('body')
    
    let t = $('<textarea></textarea>')
            .val(`<!-- Create a simple CodeMirror instance -->
  <link rel="stylesheet" href="lib/codemirror.css">
  <script src="lib/codemirror.js"></script>
  <script>
    var editor = CodeMirror.fromTextArea(myTextarea, {
      lineNumbers: true
    });
  </script>`)
            .appendTo(c)
    
    CodeMirror.fromTextArea(t[0], {
      lineNumbers: true,
      mode: "text/html",
      matchBrackets: true
    })
    */
    /*
    setTimeout(() => {
      CodeMirror.fromTextArea(document.getElementById('Textarea'), {
        lineNumbers: true,
        mode: "text/html",
        matchBrackets: true
      })
    }, 0)
    */
   
    setTimeout(() => {
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
          CodeMirror.fromTextArea(this.$editor[0], {
            lineNumbers: true,
            mode: this.mode,
            matchBrackets: true
          })
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
      
      let height = this.detector.height()
      height = height + this.config.menuBarHeight + this.padding
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
    }
  }
}