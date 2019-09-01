const DateHelper = require('../../helpers/DateHelper')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale;
    return {
      header: '這是一個預設標題',
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
      this.lib.win.setFullScreen(true)
      this.status.isMaximized = true
      return this
    },
    unmaximize: function () {
      // 這個我們可能要自己做resize
      this.lib.win.setFullScreen(false)
      this.status.isMaximized = false
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
      return this.setNoteHeader(header)
    }
  }
}