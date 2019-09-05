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
        'svg': 'Scalable Vector Graphics File',
      },
      basicRatio: null
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
    }, 0)
  },
  methods: {
    setupImage: function () {
      if (this.status.fileType === 'image-static'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        this.imagePath = this.status.filePath.split('\\').join('/')
      }
      return this
    },
    initDetector: function () {
      //console.log(this.imagePath)
      if (this.detector === null) {
        this.detector = window.$(this.$refs.ResizeDetector)
      }
      this.detector.bind('load', () => {
        this.resizeToFitContent(true, () => {
          this.detector.css('width', '100vw')
          this.initWindowResizeRestictRation()
        })
      })
      return this
    },
    /**
     * 廢棄不做
     * @deprecated 20190906
     * @returns {undefined}
     */
    initWindowResizeRestictRation: function () {

      let basicWidth = this.detector.width()
      let basicHeight = this.detector.height()
      this.basicRatio = basicWidth / basicHeight
      //this.basicRatio = Math.ceil(basicRatio * 1000) / 1000
      /*
      let resizeLock = false
      

      window.onresize = () => {
        if (resizeLock === true) {
          return this
        }
        
        let windowWidth = window.outerWidth
        let windowHeight = window.outerHeight
        windowHeight = windowHeight - this.config.menuBarHeight
        
        let windowRatio = windowWidth / windowHeight
        windowRatio = Math.ceil(windowRatio * 1000) / 1000
        console.log([windowRatio, basicRatio])
        
        if (windowRatio > basicRatio) {
          // 不夠高
          windowWidth = windowHeight / basicRatio
          windowHeight = windowHeight + this.config.menuBarHeight
          resizeLock = true
          console.log([windowWidth, windowHeight])
          window.resizeTo(windowWidth, windowHeight)
          resizeLock = false
        }
        else if (windowRatio < basicRatio) {
          // 不夠寬
          windowHeight = windowWidth * basicRatio
          windowHeight = windowHeight + this.config.menuBarHeight
          resizeLock = true
          console.log([windowWidth, windowHeight])
          window.resizeTo(windowWidth, windowHeight)
          resizeLock = false
        }
      }
       */
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
    resizeToFitContent: function (isRestrictSize, callback) {
      if (typeof(this.basicRatio) === 'number') {
        return this.resizeToRatio()
      }
      
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        this.lib.WindowHelper.resizeToFitContent(width, this.config.minWidthPx, height, this.config.minHeightPx, isRestrictSize)
        
        if (typeof(callback) === 'function') {
          callback()
        }
      }, 0)
    },
    resizeToRatio: function () {
      let basicRatio = this.basicRatio
      
      let windowWidth = window.outerWidth
      let windowHeight = window.outerHeight
      windowHeight = windowHeight - this.config.menuBarHeight

      let windowRatio = windowWidth / windowHeight
      windowRatio = Math.ceil(windowRatio * 1000) / 1000
      //console.log([windowRatio, basicRatio])
      
      if (windowRatio > basicRatio) {
        // 太寬
        windowWidth = windowHeight / basicRatio
        windowHeight = windowHeight + this.config.menuBarHeight
        //console.log([windowWidth, windowHeight])
        window.resizeTo(windowWidth, windowHeight)
      }
      else if (windowRatio < basicRatio) {
        // 太高
        windowHeight = windowWidth * basicRatio
        windowHeight = windowHeight + this.config.menuBarHeight
        //console.log([windowWidth, windowHeight])
        window.resizeTo(windowWidth, windowHeight)
      }
    },
    saveFile: function (filePath) {
      //console.error('saveFile: ' + filePath)
      this.lib.ElectronFileHelper.copy(this.status.filePath, filePath)
      return this
    },
    getFilters: function (filePath) {
      return this.lib.ElectronFileHelper.getFilters(this.filterConfigJSON, filePath, true)
    }
  } // methods
}