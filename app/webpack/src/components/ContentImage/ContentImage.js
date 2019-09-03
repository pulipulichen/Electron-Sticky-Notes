const OpenSeadragon = require('../../vendors/openseadragon-bin-2.4.1/openseadragon.min.js')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      padding: 0,
      detector: null,
      imagePath: '',
      viewerElement: null,
      viewer: null,
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
          this.resizeToFitContent()
          this.initViewer()
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
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        //console.log(width, height)
        if (width < this.config.minWidthPx) {
          width = this.config.minWidthPx
        }
        if (height < this.config.minHeightPx) {
          height = this.config.minHeightPx
        }
        
        //console.log(width, height)
        window.resizeTo(width, height)
      }, 0)
    },
    initViewer: function () {
      //let {width, height} = this.getSizeOfDetector()
      let id = 'OpenSeadragonContainer'
      this.viewerElement = $('<div class="viewer"></div>')
              .attr('id', id)
              .width(this.detector.width())
              .height(this.detector.height())
              .css('top', this.config.menuBarHeight + 'px')
              .appendTo('body')
      
      // configs
      // http://openseadragon.github.io/docs/OpenSeadragon.html#.Options
      this.viewer = OpenSeadragon({
        id: id,
        prefixUrl: "webpack/src/vendors/openseadragon-bin-2.4.1/images/",
        visibilityRatio: 1,
        //defaultZoomLevel: 1,
        minZoomLevel: 1,
        showNavigator:  true,
        navigatorPosition: 'BOTTOM_RIGHT',
        tileSources: {
            type: 'image',
            url:  this.imagePath,
            buildPyramid: false
          },
        animationTime: 0.5,
      })
      VIEWER = this.viewer
      
      this.viewer.addHandler('tile-loaded', () => {
        //console.log('ready')
        this.viewerElement.css('width', '').css('height', '')
      })
      
      //setTimeout(() => {
      //  this.viewerElement.css('width', undefined).css('height', undefined)
      //}, 0)
      
/*
<div id="openseadragon1" class="disable-drag" style="width: 800px; height: 600px;"></div>
<script src="vendors/openseadragon-bin-2.4.1/openseadragon.min.js"></script>
<script type="text/javascript">
var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: "vendors/openseadragon-bin-2.4.1/images/",
    visibilityRatio: 1,
    showNavigator:  true,
    tileSources: {
        type: 'image',
        url:  '../demo/pets-4415649.jpg',
        buildPyramid: false
      }
    });
</script>
 */
    }
  } // methods
}