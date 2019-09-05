const DateHelper = require('../../helpers/DateHelper')

// https://stackoverflow.com/a/48459596
const SubmenuTheme = require('./SubmenuTheme/SubmenuTheme.vue').default
const SubmenuSize = require('./SubmenuSize/SubmenuSize.vue').default
const SubmenuFile = require('./SubmenuFile/SubmenuFile.vue').default

const hotkeys = require('../../vendors/hotkeys/hotkeys.min')

module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    this.lib.hotkeys = hotkeys
    //console.log(this.$parent.a())
    return {
      header: '',
      beforeMaximizeIsPinTop: this.status.isPinTop,
      maxIntervalMS: null,
      $NoteHeader: null,
      draggableTimer: false
    }
  },
  components: { 
    'submenu-theme': SubmenuTheme,
    'submenu-size': SubmenuSize,
    'submenu-file': SubmenuFile,
  },
  computed: {
    htmlHeaderWithIcon: function () {
      let header = this.header
      switch (this.status.fileType) {
        case 'code':
          header = '<i class="code icon"></i>' + header
          break
        case 'image-static':
        case 'image-viewer':
          header = '<i class="file image icon"></i>' + header
          break
        case 'rich-format':
          header = '<i class="file alternate icon"></i>' + header
          break
      }
      
      return header
    }
  },  // computed: {
  mounted: function () {
    window.$(this.$refs.Submenu).dropdown()
    this.initHotkeys()
  },
  methods: {
    initHotkeys: function () {
      this.lib.hotkeys('ctrl+`,ctrl+m,alt+`,ctrl+pageup,ctrl+pagedown,ctrl+s,ctrl+shift+s,ctrl+o,ctrl+e', (event, handler) => {
        //console.log(handler.key)
        switch (handler.key) {
          case 'ctrl+`':
            this.toggleAlwaysOnTop()
            break
          case 'ctrl+m':
            this.toggleMaximize()
            break
            
          case 'alt+`':
            this.$refs.SubmenuSize.resizeToFitContent()
            break
          case 'ctrl+pageup':
            this.$refs.SubmenuSize.fontSizeLarger()
            break
          case 'ctrl+pagedown':
            this.$refs.SubmenuSize.fontSizeSmaller()
            break
            
          case 'ctrl+s':
            this.$refs.SubmenuFile.saveFile()
            break
          case 'ctrl+shift+s':
            this.$refs.SubmenuFile.saveFileAs()
            break
          case 'ctrl+o':
            this.$refs.SubmenuFile.openFolder()
            break
          case 'ctrl+e':
            this.$refs.SubmenuFile.openEditor()
            break
        }
      })
    },
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
    toggleMaximize: function () {
      if (this.status.isMaximized) {
        return this.unmaximize()
      }
      else {
        return this.maximize()
      }
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
      if (typeof(this.status.filePath) === 'string') {
        contenxtText = this.lib.ElectronFileHelper.basename(this.status.filePath)
      }
      //console.log(contenxtText)
      //console.log(this.status.filePath)
      if (typeof(contenxtText) === 'string') {
        if (contenxtText.length > 100) {
          contenxtText = contenxtText.slice(0, 100) + '...'
        }
        header = header + ' ' + contenxtText
      }
      
      return this.setNoteHeader(header)
    },
    enableDraggable: function (e) {
      // Movable after 700MS
      let mouseX = e.clientX;  
      let mouseY = e.clientY;
      let animationId
      
      let onMouseUp = () => {
        e.srcElement.removeEventListener('mouseup', onMouseUp)
        cancelAnimationFrame(animationId)
        //console.log('onMouseUp canceld')
        this.draggableTimer = false
      }
      
      let moveWindow = () => {
        this.lib.ipc.send('windowMoving', { mouseX, mouseY });
        animationId = requestAnimationFrame(moveWindow);
      }

      //console.log(e)
      
      this.draggableTimer = setTimeout(() => {
        e.srcElement.addEventListener('mouseup', onMouseUp)
        requestAnimationFrame(moveWindow);
      }, 500)
      return this
    },
    disableDraggable: function () {
      if (this.draggableTimer !== false) {
        clearTimeout(this.draggableTimer)
        this.draggableTimer = false
      }
      return this
    },
  }
}