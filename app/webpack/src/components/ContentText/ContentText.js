//const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
//require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    let data = {
      padding: 15,
      detector: null,
      contentText: ''
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
      this.setupText()
      this.resizeToFitContent()
    }, 0)
  },
  methods: {
    setupText: function () {
      //console.log(this.status)
      //console.log([this.status.fileType === 'plain-text'
      //        , typeof(this.status.contentText) === 'string' 
      //        , this.status.contentText !== ''])
      if (this.status.fileType === 'plain-text'
              && typeof(this.status.contentText) === 'string' 
              && this.status.contentText !== '') {
        this.contentText = this.status.contentText
        //console.log(this.contentText)
      }
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