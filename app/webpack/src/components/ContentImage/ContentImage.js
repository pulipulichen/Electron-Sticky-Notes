module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      padding: 0,
      detector: null,
      imagePath: '',
    }
  },
  computed: {
  },
  mounted: function () {
    setTimeout(() => {
      this.setupImage()
      //this.resizeToFitContent()
    }, 0)
  },
  methods: {
    setupImage: function () {
      if (this.status.fileType === 'image'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        
        //console.log(this.imagePath)
        if (this.detector === null) {
          this.detector = window.$(this.$refs.ResizeDetector)
        }
        this.detector.bind('load', () => {
          console.log('A')
          this.resizeToFitContent()
        })
        
        this.imagePath = this.status.filePath
      }
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
    resizeToFitContent: function () {
      console.trace('ok aaa')
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        console.log(width, height)
        if (width < this.config.minWidthPx) {
          width = this.config.minWidthPx
        }
        if (height < this.config.minHeightPx) {
          height = this.config.minHeightPx
        }
        
        //console.log(width, height)
        window.resizeTo(width, height)
      }, 0)
    }
  }
}