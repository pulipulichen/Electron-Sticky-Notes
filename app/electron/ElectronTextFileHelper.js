let ElectronTextFileHelper = {
  inited: false,
  lib: {
    ElectronFileHelper: null,
    mammoth: null,
    html2docx: null,
    odt2html: null,
    
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
    if (['md', 'docx', 'odt', 'rtf'].indexOf(ext) === -1) {
      return false
    }

    //console.log(filepath)
    if (this.lib.ElectronFileHelper.existsSync(filepath) === false) {
      return false
    }

    let fileTypeResult = this.lib.ElectronFileHelper.getFileTypeMIME(filepath)
    console.error(['Please check file type: ', ext, fileTypeResult])
    return ((ext === 'md' && fileTypeResult === undefined)
            || (ext === 'docx' && fileTypeResult === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            || (ext === 'odt' && fileTypeResult === 'application/vnd.oasis.opendocument.text')
            || (ext === 'rtf' && fileTypeResult === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'))
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
  DOCXToHTML: function (filePath, callback) {
    if (typeof(callback) !== 'function' 
            || typeof(filePath) !== 'string' 
            || filePath.endsWith('.docx') === false
            || this.lib.ElectronFileHelper.existsSync(filePath) === false) {
      return this
    }
    
    if (this.lib.mammoth === null) {
      this.lib.mammoth = require("mammoth")
    }
    
    this.lib.mammoth.convertToHtml({path: filePath})
      .then(function(result){
          let html = result.value; // The generated HTML
          console.log(html)
          //var messages = result.messages; // Any messages, such as warnings during conversion
          callback(html)
      })
      .done();
    return this
  },
  HTMLtoDOCX: function (html, callback) {
    if (typeof(callback) !== 'function' || typeof(html) !== 'string') {
      return this
    }
    
    if (this.lib.html2docx === null) {
      this.lib.html2docx = require('html2docx')
    }
    this.lib.html2docx.create(html)
      .then(buffer => {
        callback(buffer.toString('base64'))
    })
    
    /*
    if (this.lib.htmlDocx === null) {
      this.lib.htmlDocx = require('html-docx-js')
    }
    
    let convertedBlob = this.lib.htmlDocx.asBlob(html);
    //let convertedBase64 = converted.toString('base64')
    //console.log(convertedBase64)
    //callback(convertedBase64)
    
    let reader = new FileReader();
    reader.readAsDataURL(convertedBlob); 
    reader.onloadend = function() {
        let base64data = reader.result;                
        //console.log(base64data);
        callback(base64data)
    }
    */
    return this
  },
  ODTToHTML: function (filePath, callback) {
    if (typeof(callback) !== 'function' 
            || typeof(filePath) !== 'string' 
            || filePath.endsWith('.odt') === false
            || this.lib.ElectronFileHelper.existsSync(filePath) === false) {
      return this
    }
    
    let ODTDocument = require(this.lib.ElectronFileHelper.resolve('./app/webpack/src/vendors/odt.js/odt.js'))
    let html = new ODTDocument(filePath).getHTMLUnsafe()
    console.log(html)
    callback(html)
    return this
  },
  HTMLtoODT: function (html, callback) {
    if (typeof(callback) !== 'function' || typeof(html) !== 'string') {
      return this
    }
    
    /*
    if (this.lib.htmlDocx === null) {
      this.lib.htmlDocx = require('html-docx-js')
    }
    
    let convertedBlob = this.lib.htmlDocx.asBlob(html);
    //let convertedBase64 = converted.toString('base64')
    //console.log(convertedBase64)
    //callback(convertedBase64)
    
    let reader = new FileReader();
    reader.readAsDataURL(convertedBlob); 
    reader.onloadend = function() {
        let base64data = reader.result;                
        //console.log(base64data);
        callback(base64data)
    }
    */
    return this
  },
}


if (typeof(window) === 'object') {
  window.ElectronTextFileHelper = ElectronTextFileHelper
}
if (typeof(module) === 'object') {
  module.exports = ElectronTextFileHelper
}
