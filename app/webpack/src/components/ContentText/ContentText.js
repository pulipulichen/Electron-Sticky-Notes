const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const $ = require('jquery')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
    }
  },
  computed: {
    displayContentText: function () {
      let contentText = this.status.contentText
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
    this.initResize()
  },
  methods: {
    getMaxHeight: function () {
      let height = screen.availHeight * this.config.maxHeight
      console.log(height)
      return height
    },
    getMaxWidth: function () {
      return screen.availWidth * this.config.maxWidth
    },
    initResize: function () {
      setTimeout(() => {
        let detector = $(this.$refs.ResizeDetector)
        let width = detector.width()
        let height = detector.height()
        height = height + 90
        console.log(width, height)
        window.resizeTo(width, height)
      }, 0)
    }
  }
}