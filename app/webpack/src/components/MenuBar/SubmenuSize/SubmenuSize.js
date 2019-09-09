//const hotkeys = require('../../../vendors/hotkeys/hotkeys.min')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(this.$parent.a())
    return {
    }
  },
  computed: {
    enableFontSizeControl: function () {
      return (['text', 'text-code'].indexOf(this.status.fileType) > -1)
    },
  },
  //mounted: function () {
    //this.initHotkeys()
  //},
  methods: {
    /*
    initHotkeys: function () {
      console.log('aaa')
      hotkeys('alt+`,ctrl+pageup,ctrl+pagedown', (event, handler) => {
        console.log(handler.key)
        switch (handler.key) {
          case 'alt+`':
            this.resizeToFitContent()
            break
          case 'ctrl+pageup':
            this.fontSizeLarger()
            break
          case 'ctrl+pagedown':
            this.fontSizeSmaller()
            break
        }
      })
    },
     */
    resizeToFitContent: function () {
      //this.$parent.$refs.ContentText.resizeToFitContent()
      this.status.mainComponent.resizeToFitContent()
      return this
    },
    fontSizeLarger: function () {
      if (this.status.fileType === 'text-rich-format') {
        return this
      }
      
      this.config.fontSizeRatio = this.config.fontSizeRatio + this.config.fontSizeAdjustInterval
      this.status.fontSizeAdjustIsEnlarge = true
      //console.log(this.config.fontSizeRatio)
      return this
    },
    fontSizeSmaller: function () {
      if (this.status.fileType === 'text-rich-format') {
        return this
      }
      
      this.config.fontSizeRatio = this.config.fontSizeRatio - this.config.fontSizeAdjustInterval
      this.status.fontSizeAdjustIsEnlarge = false
      //console.log(this.config.fontSizeRatio)
      return this
    },
  }
}