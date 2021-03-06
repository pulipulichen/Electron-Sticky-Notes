const fs = require('fs')
const path = require('path')
const {clipboard} = require('electron')
const iconv = require('iconv-lite')

let ClipboardHelper = {
  getFilePaths: function () {
    let filepaths = []
    
    let clipboardText = clipboard.readText('clipboard')
    //console.log('[', clipboardText, ']')
    if (clipboardText.endsWith('/node_modules/electron/dist/electron') === false 
            && fs.existsSync(clipboardText)) {
      filepaths.push(clipboardText)
    }

    /*
    let clipboardRawFilePath = clipboard.read('FileNameW')
    clipboardRawFilePath = iconv.decode(clipboardRawFilePath, 'Big5')
    console.log(clipboardRawFilePath)
    let clipboardFilePath = clipboardRawFilePath.replace(new RegExp(String.fromCharCode(0), 'g'), '')
    clipboardFilePath = iconv.decode(clipboardFilePath, 'Big5')
    console.log(clipboardFilePath)
     */
    
    // https://www.jianshu.com/p/03884484023f
    const rawFilePath = clipboard.readBuffer('FileNameW').toString('ucs2')
    let clipboardFilePath = rawFilePath.replace(new RegExp(String.fromCharCode(0), 'g'), '')
    
    if (clipboardFilePath.endsWith('/node_modules/electron/dist/electron') === false 
            && fs.existsSync(clipboardFilePath)) {
      filepaths.push(path.resolve(clipboardFilePath))
    }
    
    return filepaths
  },
  getText: function () {
    if (process.platform !== 'win32') {
      return undefined
    }
    
    let text = clipboard.readText('clipboard')
    //console.log('[')
    //console.log(text)
    if (typeof(text) === 'string') {
      text = text.trim()
    }
    return text
  },
  getImageDataURL: function () {
    if (process.platform !== 'win32') {
      return undefined
    }
    
    let dataURL = clipboard.readImage('clipboard').toDataURL()
    if (dataURL !== 'data:image/png;base64,') {
      return dataURL
    }
    else {
      return undefined
    }
    // data:image/png;base64,
  }
}

module.exports = ClipboardHelper