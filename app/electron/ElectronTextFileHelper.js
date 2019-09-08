let ElectronTextFileHelper = {
  inited: false,
  lib: {
    ElectronFileHelper: null,
    mammoth: null,
    htmlDocx: null,
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
    
    if (typeof(filepath) !== 'string' 
            || filepath.lastIndexOf('.') === -1) {
      return false
    }

    //console.log(filepath)
    let ext = this.lib.ElectronFileHelper.getExt(filepath)
    if (['csv', 'tsv', 'txt', 'arff', 'gitignore', 'au3', 'bat', 'reg', 'ini'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileTypeMIME(filepath)
    //console.error(['Please check file type: ', fileTypeResult, ext])
    return (fileTypeResult === undefined)
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
    
    if (typeof(filepath) !== 'string' 
            || filepath.lastIndexOf('.') === -1) {
      return false
    }

    //console.log(filepath)
    let ext = this.lib.ElectronFileHelper.getExt(filepath)
    if (['c', 'css', 'jsp', 'asp', 'aspx', 'html', 'htm', 'xhtml', 'java', 'js', 'json', 'less', 'pl', 'php', 'py', 'r', 'rb', 'sass', 'scss', 'sql', 'sh', 'vb', 'vue', 'xml', 'yaml'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileTypeMIME(filepath)
    //console.error(['Please check file type: ', ext, fileTypeResult])
    return (fileTypeResult === undefined)
    /*
    if ( (fileTypeResult === undefined && ext === 'csv')
            || (fileTypeResult === undefined && ext === 'arff'
            || (fileTypeResult === undefined && ext === 'txt') ) {
      return true
    }
    else {
      return false
    }
    */
  },
  isRichFormatFile: function (filepath) {
    this.init()
    
    if (typeof(filepath) !== 'string' 
            || filepath.lastIndexOf('.') === -1) {
      return false
    }

    //console.log(filepath)
    let ext = this.lib.ElectronFileHelper.getExt(filepath)
    if (['md'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileTypeMIME(filepath)
    console.error(['Please check file type: ', fileTypeResult, ext])
    return ((ext === 'md' && fileTypeResult === undefined))
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
  readFileSync: function (filepath) {
    this.init()
    return this.lib.ElectronFileHelper.readFileSync(filepath)
  },
  docxToHTML: function (filePath, callback) {
    if (typeof(callback) !== 'function' 
            || typeof(filePath) !== 'string' 
            || filePath.endsWith('.docx')
            || this.lib.ElectronFileHelper.existsSync(filePath) === false) {
      return this
    }
    
    if (this.lib.mammoth === null) {
      this.lib.mammoth = require("mammoth")
    }
    
    this.lib.mammoth.convertToHtml({path: filePath})
      .then(function(result){
          let html = result.value; // The generated HTML
          //var messages = result.messages; // Any messages, such as warnings during conversion
          callback(html)
      })
      .done();
  }
}


if (typeof(window) === 'object') {
  window.ElectronTextFileHelper = ElectronTextFileHelper
}
if (typeof(module) === 'object') {
  module.exports = ElectronTextFileHelper
}
