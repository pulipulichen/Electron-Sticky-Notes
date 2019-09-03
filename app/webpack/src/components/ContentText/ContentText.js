const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const $ = require('jquery')

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
    }
  },
  mounted: function () {
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
      console.log(this.status)
      console.log([this.status.fileType === 'plain-text'
              , typeof(this.status.contentText) === 'string' 
              , this.status.contentText !== ''])
      if (this.status.fileType === 'plain-text'
              && typeof(this.status.contentText) === 'string' 
              && this.status.contentText !== '') {
        this.contentText = this.status.contentText
        console.log(this.contentText)
      }
      return this
    },
    resizeToFitContent: function () {
      setTimeout(() => {
        if (this.detector === null) {
          this.detector = $(this.$refs.ResizeDetector)
        }
        let width = this.detector.width()
        width = width + this.padding
        let height = this.detector.height()
        height = height + this.config.menuBarHeight + this.padding
        //console.log(width, height)
        window.resizeTo(width, height)
      }, 0)
    }
  }
}