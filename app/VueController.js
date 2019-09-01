/* global httpVueLoader, i18n */

// If using a module system (e.g. via vue-cli), import Vue and VueI18n and then call Vue.use(VueI18n).
let VueControllerConfig = {
  el: '#app',
  components: {
    'menu-bar': httpVueLoader('./components/MenuBar/MenuBar.vue')
  },
  data: {
    config: {
      defaultTop: false,
      lang: 'zh-tw'
    },
    status: {
      mode: null,
      filePath: null,
      isAlwaysOnTop: true,
    },
    cache: {
      
    },
    
    lib: {
      // 基本
      ElectronHelper: null,
      ElectronFileHelper: null,
      electron: null,
      remote: null,
      win: null,
      ipc: null,
      i18n: null,
      // 其他
    },
  },  // data: {
  watch: {
    
  },  // watch: {
  computed: {
    
  },  // watch: {
  mounted: function () {
    // 基本
    this.lib.ElectronHelper = RequireHelper.require('./helpers/electron/ElectronHelper')
    this.lib.ElectronFileHelper = RequireHelper.require('./helpers/electron/ElectronFileHelper')
    this.lib.electron = RequireHelper.require('electron')
    this.lib.remote = this.lib.electron.remote
    this.lib.win = this.lib.remote.getCurrentWindow()
    this.lib.ipc = this.lib.electron.ipcRenderer
    this.lib.i18n = RequireHelper.require('./vendors/i18n/i18nHelper')
    
    this.status.mode = this.lib.win.mode
    this.status.filePath = this.lib.win.filePath
    this.lib.i18n.init(this.config.lang)
    
    // 其他
    this.lib.ElectronHelper.mount(this, this.persistAttrs, () => {
      this._afterMounted()
    })
  },  // mounted: function () {
  methods: {
    _afterMounted: function () {
      //this.lib.ipc.send('resize', 100, 200);
      this.resizeToFit()
      
      if (this.config.defaultTop === true) {
        this.toggleAlwaysOnTop(true)
      }
      
      /*
      $(this.$refs.APP).dblclick((event) => {
        event.preventDefault()
        event.stopPropagation()
      })
      */
      //this.lib.win.setAlwaysOnTop(true)
      
    },
    resizeToFit: function () {
      //let $app = $(this.$refs.APP)
      //window.resizeTo($app.width() + 10,$app.height())
      
      window.resizeTo(400, 200) // width, height
      console.warn('#5 not completed')
      return this
    },
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
  } // methods
}

if (typeof(window) !== 'undefined') {
  window.VueController = new Vue(VueControllerConfig)
}
if (typeof(exports) !== 'undefined') {
  exports.default = new Vue(VueControllerConfig)
}
