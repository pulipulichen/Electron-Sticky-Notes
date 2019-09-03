module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      padding: 0,
      detector: null,
    }
  },
  computed: {
  },
  mounted: function () {
    this.resizeToFitContent()
  },
  methods: {
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
    resizeToFitContent: function () {
      setTimeout(() => {
        let detector = $(this.$refs.ResizeDetector)
        let width = detector.width()
        let padding = 15
        width = width + padding
        let height = detector.height()
        height = height + 40 + padding
        //console.log(width, height)
        window.resizeTo(width, height)
      }, 0)
    }
  }
}