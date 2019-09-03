let ElectronImageFileHelper = {
  inited: false,
  lib: {
    ElectronFileHelper: null,
  },
  init: function () {
    if (this.inited === true) {
      return this
    }
    
    this.lib.ElectronFileHelper = RequireHelper.require('./ElectronFileHelper')
    
    this.inited = true
    return this
  },
  isImageFile: function (filepath) {
    this.init()
    
    if (filepath.lastIndexOf('.') === -1) {
      return false
    }

    //console.log(filepath)
    let ext = this.lib.ElectronFileHelper.getExt(filepath)
    if (['png', 'jpg', 'jpeg', 'gif', 'tiff', 'tif', 'svg', 'ico', 'bmp', 'webp'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileType(filepath)
    console.error(['Please check file type: ', fileTypeResult, ext])
    
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
    if ( (ext === 'jpg' && fileTypeResult === 'image/jpeg')
            || (ext === 'jpeg' && fileTypeResult === 'image/jpeg')
            || (ext === 'png' && fileTypeResult === 'image/png')
            || (ext === 'gif' && fileTypeResult === 'image/gif')
            || (ext === 'bmp' && fileTypeResult === 'image/bmp')
            || (ext === 'webp' && fileTypeResult === 'image/webp')
            || (ext === 'ico' && fileTypeResult === 'image/x-icon')
            || (ext === 'ico' && fileTypeResult === 'image/vnd.microsoft.icon')
            || (ext === 'tif' && fileTypeResult === 'image/tiff')
            || (ext === 'tiff' && fileTypeResult === 'image/tiff')
            || (ext === 'svg' && fileTypeResult === 'image/svg+xml') ) {
      return true
    }
    else {
      return false
    }
  },
  
}


if (typeof(window) === 'object') {
  window.ElectronImageFileHelper = ElectronImageFileHelper
}
if (typeof(module) === 'object') {
  module.exports = ElectronImageFileHelper
}
