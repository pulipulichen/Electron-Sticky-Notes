
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
      return (['plain-text', 'code', 'rich-format'].indexOf(this.status.fileType) > -1)
    },
  },
  //mounted: function () {
  //},
  methods: {
    resizeToFitContent: function () {
      //this.$parent.$refs.ContentText.resizeToFitContent()
      this.status.mainComponent.resizeToFitContent()
      return this
    },
    fontSizePlus: function () {
      this.config.fontSizeRatio = this.config.fontSizeRatio + this.config.fontSizeAdjustInterval
      this.status.fontSizeAdjustIsEnlarge = true
      //console.log(this.config.fontSizeRatio)
      return this
    },
    fontSizeMinus: function () {
      this.config.fontSizeRatio = this.config.fontSizeRatio - this.config.fontSizeAdjustInterval
      this.status.fontSizeAdjustIsEnlarge = false
      //console.log(this.config.fontSizeRatio)
      return this
    },
  }
}