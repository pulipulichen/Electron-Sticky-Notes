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
    if (['png', 'jpg', 'jpeg', 'gif', 'tiff', 'tif', 'svg', 'ico'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileType(filepath)
    console.error(['Please check file type: ', fileTypeResult, ext])
    /*
    if ( (fileTypeResult === undefined && ext === 'csv')
            || (fileTypeResult === undefined && ext === 'arff') ) {
      return true
    }
    else {
      return false
    }
     */
  },
}


if (typeof(window) === 'object') {
  window.ElectronImageFileHelper = ElectronImageFileHelper
}
if (typeof(module) === 'object') {
  module.exports = ElectronImageFileHelper
}
