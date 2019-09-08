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
    /*
    attrSrc: function () {
      //if (typeof(this.imagePath) === 'string') {
        console.log(this.imagePath)
        return this.imagePath
      //}
    },
    */
    attrContentImageStyle: function () {
      return {
          'top': this.config.menuBarHeight + 'px',
          'height': 'calc(100vh - ' + this.config.menuBarHeight + 'px)',
          'background-image': 'url("' + this.imagePath + '")'
      }
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.setupImage()
      this.initDetector()
    }, 0)
  },
  methods: {
    setupImage: function () {
      if (this.status.fileType === 'image-static'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        this.imagePath = this.status.filePath.split('\\').join('/')
        //console.log([this.imagePath, this.status.filePath])
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
    initWindowResizeRestictRation: function () {

      let basicWidth = this.detector.width()
      let basicHeight = this.detector.height()
      this.basicRatio = basicWidth / basicHeight
      
      window.onresize = () => {
        let windowWidth = window.outerWidth
        let windowHeight = window.outerHeight
        windowHeight = windowHeight - this.config.menuBarHeight
        
        let windowRatio = windowWidth / windowHeight
        //windowRatio = Math.ceil(windowRatio * 1000) / 1000
        //console.log([windowRatio, this.basicRatio])
        
        //console.log([(windowRatio < this.basicRatio)])
        
        if (windowRatio < this.basicRatio) {
          // 太寬
          this.detector.css({
            'height': `auto`,
            'width': '100vw'
          })
        }
        else {
          // 太高
          this.detector.css({
            'height': `calc(100vh - ${this.config.menuBarHeight}px)`,
            'width': 'auto'
          })
        }
      }
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
      /*
      if (typeof(this.basicRatio) === 'number') {
        return this.resizeToRatio()
      }
      */
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
    },
    openEditor: function () {
      this.lib.ElectronFileHelper.openItem(this.status.filePath)
    }
  } // methods
}