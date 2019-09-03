let ElectronTextFileHelper = {
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
  isTextFile: function (filepath) {
    this.init()
    
    if (filepath.lastIndexOf('.') === -1) {
      return false
    }

    //console.log(filepath)
    let ext = this.lib.ElectronFileHelper.getExt(filepath)
    if (['csv', 'txt', 'arff', 'md', 'gitignore'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileType(filepath)
    console.error(['Please check file type: ', fileTypeResult, ext])
    return true
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
  isCodeFile: function (filepath) {
    // CodeMirror support list
    // https://www.cs.princeton.edu/~dp6/CodeMirror/mode/index.html
    this.init()
    
    if (filepath.lastIndexOf('.') === -1) {
      return false
    }

    //console.log(filepath)
    let ext = this.lib.ElectronFileHelper.getExt(filepath)
    if (['css', 'html', 'htm', 'java', 'js', 'json', 'less', 'perl', 'php', 'py', 'r', 'ruby', 'sass', 'scss', 'sql', 'sh', 'vb', 'xml', 'yaml'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileType(filepath)
    console.error(['Please check file type: ', fileTypeResult, ext])
    return true
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
  window.ElectronTextFileHelper = ElectronTextFileHelper
}
if (typeof(module) === 'object') {
  module.exports = ElectronTextFileHelper
}
