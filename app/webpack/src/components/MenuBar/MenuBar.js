module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale;
    return {
      header: '',
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
    }
  }
}