require('../../vendors/summernote/summernote-lite.less')
const Summernote = require('../../vendors/summernote/summernote-lite.js')

const showdown = require('../../vendors/showdown/showdown.min.js')
const TurndownService = require('../../vendors/turndown/turndown.js')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    let data = {
      padding: 17,
      detector: null,
      contentHTML: '',
      $container: null,
      $summernote: null,
      turndownService: null,
      
      // https://fileinfo.com/extension/css
      filterConfigJSON: {
        'html': 'Hypertext Markup Language File',
        'htm': 'Hypertext Markup Language File',
        'md': 'Markdown Documentation File',
      }
    }
    
    this.$i18n.locale = this.config.locale
    return data
  },
  watch: {
    'config.fontSizeRatio': function () {
      //console.log(`font-size: calc(1rem * ${this.config.fontSizeRatio}) !important;`)
      //this.styleSheet = createCSSSelector('.CodeMirror', `font-size: calc(1rem * ${this.config.fontSizeRatio}) !important;`, this.styleSheet)
      if (this.$CodeMirror === null || this.$CodeMirror === undefined) {
        this.$CodeMirror = window.$('.CodeMirror:first')
        //console.log(this.$CodeMirror.length)
        if (this.$CodeMirror.length === 1) {
        }
        else {
          this.$CodeMirror = null
        }
      }
      
      if (this.$CodeMirror !== null) {
        this.$CodeMirror.css('font-size', `calc(1rem * ${this.config.fontSizeRatio})`)
                  .css('line-height', `calc(1em * ${this.config.fontSizeRatio} + 0.4285em)`)
        this.codeMirrorEditor.refresh()
      }
    }
  },
  computed: {
    styleFontSize: function () {
      return `calc(1em * ${this.config.fontSizeRatio})`
    },
    styleLineHeight: function () {
      let lineHeight = `calc(1em * ${this.config.fontSizeRatio} + 0.4285em)`
      
      if (this.status.fontSizeAdjustIsEnlarge) {
        this.resizeIfOverflow()
      }
      
      return lineHeight
    },
  },
  mounted: function () {
   
    setTimeout(() => {
      //this.setupStyle()
      this.setupDocument()
      //this.resizeToFitContent()
    }, 0)
  },
  methods: {
    setupDocument: function () {
      //console.log(this.status)
      //console.log([this.status.fileType === 'plain-text'
      //        , typeof(this.status.contentText) === 'string' 
      //        , this.status.contentText !== ''])
      if (this.status.fileType === 'text-rich-format'
              && typeof(this.status.filePath) === 'string' 
              && this.status.filePath !== '') {
        
        this.contentHTML = this.convertToHTML(this.status.filePath)
        this.setupEditor()
        
      }
      return this
    },
    convertToHTML: function (filePath) {
      console.log(`convertToHTML: ${filePath}`)
      let ext = this.lib.ElectronFileHelper.getExt(filePath)
      
      let contentHTML
      
      switch (ext) {
        case 'md':
          let contentText = this.lib.ElectronFileHelper.readFileSync(filePath)
          contentHTML = new showdown.Converter().makeHtml(contentText)
          break
        default:
          contentHTML = `<h1>${filePath}</h1><p>Hello world</p>`
      }
      
      return contentHTML
    },
    setupEditor: function () {
      this.$container = window.$('<div id="ContentRichTextContainer"></div>')
              .css('top', this.config.menuBarHeight + 'px')
              .css('height', `calc(100vh - ${this.config.menuBarHeight}px)`)
              .appendTo('body')
      this.$editor = window.$('<textarea></textarea>')
              .val(this.contentHTML)
              .attr('id', 'summernote')
              .css('height', `calc(100vh - ${this.config.menuBarHeight}px)`)
              .appendTo(this.$container)
      
      // Summernote Configuration
      // https://summernote.org/deep-dive/
      this.$summernote = window.$('#summernote')
      this.$summernote.summernote({
        airMode: true,
        disableDragAndDrop: true,
        callbacks: {
          onChange: (content, $editable) => {
            this.contentHTML = content
          },
          onInit: () => {
            this.$container.find('.note-editor > .note-editing-area > .note-editable').css({
              'max-height': `calc(100vh - ${this.config.menuBarHeight}px)`
            })
            this.resizeToFitContent(true)
          }
        }
      });
        
      return this
    },
    resizeToFitContent: function (isRestrictSize) {
      //window.resizeTo(600,800)
      //return console.error('resizeToFitContent')
      
      setTimeout(() => {
        let {width, height} = this.getSizeOfDetector()
        //console.log(width, height)
        this.lib.WindowHelper.resizeToFitContent(width, this.config.minWidthPx, height, this.config.minHeightPx, isRestrictSize)
      }, 0)
      return this
    },
    getSizeOfDetector: function () {
      if (this.detector === null) {
        this.detector = window.$(this.$refs.ResizeDetector)
      }
      let width = this.detector.width()
      width = width + this.padding
      //width = Math.ceil(width)
      
      let height = this.detector.height()
      height = height + this.config.menuBarHeight + this.padding
      //height = Math.ceil(height)
      
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
      
      /*
      console.log([width, windowWidth])
      console.log([height, windowHeight])
      console.log((width > windowWidth 
              || height > windowHeight))
      */
      if (width > windowWidth 
              || height > windowHeight) {
        return this.resizeToFitContent(false)
      }
      
      return this
    },
    saveFile: function (filePath) {
      //console.error('saveFile: ' + filePath)
      let ext = this.lib.ElectronFileHelper.getExt(filePath)
      
      switch(ext) {
        case 'md':
          //let contentMD = this.contentHTML
          if (this.turndownService === null 
                  || this.turndownService === undefined) {
            this.turndownService = new TurndownService()
          }
          let markdown = this.turndownService.turndown(this.contentHTML)
          this.lib.ElectronFileHelper.writeFileSync(filePath, markdown)
      }
      
      return this
    },
    getFilters: function (filePath) {
      let ext = this.lib.ElectronFileHelper.getExt(filePath)
      return this.lib.ElectronFileHelper.getFilters(this.filterConfigJSON, ext)
    }
  }
}