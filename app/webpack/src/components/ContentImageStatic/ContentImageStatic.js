module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      padding: 0,
      detector: null,
      imagePath: null,
      // https://fileinfo.com/extension/css
      filterConfigJSON: {
        'ico': 'Icon File',
        'svg': 'Scalable Vector Graphics File',
      }
    }
  },
  computed: {
    attrSrc: function () {
      if (typeof(this.imagePath) === 'string') {
        return this.imagePath
      }
    },
  },
  mounted: function () {
    setTimeout(() => {
      this.initDetector()
      this.setupImage()
      //this.resizeToFitContent()
    }, 0)
  },
  methods: {
    setupImage: function () {
      if (this.status.fileType === 'image-static'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        this.imagePath = this.status.filePath
      }
      return this
    },
    initDetector: function () {
      //console.log(this.imagePath)
      if (this.detector === null) {
        this.detector = window.$(this.$refs.ResizeDetector)
      }
      this.detector.bind('load', () => {
        this.resizeToFitContent()
      })
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
    resizeToFitContent: function (isRestrictSize) {
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        this.lib.WindowHelper.resizeToFitContent(width, this.config.minWidthPx, height, this.config.minHeightPx, isRestrictSize)
      }, 0)
    },
  } // methods
}