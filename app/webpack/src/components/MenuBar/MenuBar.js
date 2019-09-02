const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(this.$parent.a())
    return {
      header: '',
      beforeMaximizeIsPinTop: this.status.isPinTop,
    }
  },
  methods: {
    toggleAlwaysOnTop: function (isPinTop) {
      if (typeof(isPinTop) !== 'boolean') {
        this.status.isPinTop = (this.status.isPinTop === false)
        isPinTop = this.status.isPinTop
      }
      else {
        this.status.isPinTop = isPinTop
      }
      this.lib.win.setAlwaysOnTop(isPinTop)
      return this
    },
    minimize: function () {
      this.lib.win.minimize()
      return this
    },
    maximize: function () {
      this.lib.win.maximize()
      this.status.isMaximized = true
      this.beforeMaximizeIsPinTop = this.status.isPinTop
      this.status.isPinTop = false
      return this
    },
    unmaximize: function () {
      // 這個我們可能要自己做resize
      this.lib.win.restore()
      this.status.isMaximized = false
      this.status.isPinTop = this.beforeMaximizeIsPinTop
      return this
    },
    close: function () {
      this.lib.win.close()
      return this
    },
    setNoteHeader: function (header) {
      if (typeof(header) === 'string' 
              && header.trim() !== '') {
        header = header.trim()
        this.header = header
        document.title = header
      }
      else {
        this.resetNoteHeader()
      }
      return this
    },
    resetNoteHeader: function () {
      let header = DateHelper.getMMDDHHmm()
      let contenxtText = this.status.contentText
      if (typeof(contenxtText) === 'string') {
        if (contenxtText.length > 100) {
          contenxtText = contenxtText.slice(0, 100) + '...'
        }
        header = header + ' ' + contenxtText
      }
      
      return this.setNoteHeader(header)
    }
  }
}