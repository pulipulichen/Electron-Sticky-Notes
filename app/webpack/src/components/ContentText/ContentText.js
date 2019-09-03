const CodeMirror = require('../../vendors/codemirror-5.48.4/lib/codemirror.js')
require('../../vendors/codemirror-5.48.4/lib/codemirror.css')
const $ = require('jquery')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      padding: 15,
      detector: null
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
    this.resizeToFitContent()
  },
  methods: {
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