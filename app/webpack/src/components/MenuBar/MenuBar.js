const config = require('../../config.js')

module.exports = {
  props: ['lib', 'status'],
  data() {    
    this.$i18n.locale = config.locale;
    return {
    }
  },
  methods: {
    toggleAlwaysOnTop: function (isAlwaysOnTop) {
      if (typeof(isAlwaysOnTop) !== 'boolean') {
        this.status.isAlwaysOnTop = (this.status.isAlwaysOnTop === false)
        isAlwaysOnTop = this.status.isAlwaysOnTop
      }
      else {
        this.status.isAlwaysOnTop = isAlwaysOnTop
      }
      this.lib.win.setAlwaysOnTop(isAlwaysOnTop)
      return this
    },
    minimize: function () {
      this.lib.win.minimize()
      return this
    },
    maximize: function () {
      this.lib.win.maximize()
      return this
    },
    unmaximize: function () {
      // 這個我們可能要自己做resize
      this.lib.win.unmaximize()
      return this
    },
    close: function () {
      this.lib.win.close()
      return this
    }
  }
}