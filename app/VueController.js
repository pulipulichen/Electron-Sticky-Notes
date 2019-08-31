let VueControllerConfig = {
  el: '#app',
  data: {
    
    config: {
    },
    
    mode: null,
    
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
    this.mode = this.lib.win.mode
    this.lib.ipc = this.lib.electron.ipcRenderer
    
    // 其他
    this.lib.ElectronHelper.mount(this, this.persistAttrs, () => {
      this._afterMounted()
    })
  },  // mounted: function () {
  methods: {
    _afterMounted: function () {
      //this.lib.ipc.send('resize', 100, 200);
      let $app = $(this.$refs.APP)
      window.resizeTo($app.width() + 10,$app.height())
      
      //this.lib.win.setAlwaysOnTop(true)
      
    },
    toggleAlwaysOnTop: function () {
      this.lib.win.setAlwaysOnTop(true)
    },
  } // methods
}

if (typeof(window) !== 'undefined') {
  window.VueController = new Vue(VueControllerConfig)
}
if (typeof(exports) !== 'undefined') {
  exports.default = new Vue(VueControllerConfig)
}
