const path = require('path')
const fs = require('fs')

// ------------

const electron = require('electron')

const {
  app,
  BrowserWindow,
  clipboard,
} = electron

const ProcessArgvHelper = require('./electron-shell/ProcessArgvHelper.js')
const ClipboardHelper = require('./electron-shell/ClipboardHelper.js')

let filePathList = ProcessArgvHelper.getFilePaths().concat(ClipboardHelper.getFilePaths())
let doEmpty = (process.argv.indexOf('empty') > -1)
if (doEmpty === true) {
  filePathList = []
}
//console.log(filePathList)
//console.log(ClipboardHelper.getImageDataURL())

// ------------

//app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // darwin = MacOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.commandLine.appendSwitch('disable-site-isolation-trials');

//app.on('activate', () => {
app.on('ready', () => {
  //console.log('filePathList.length', filePathList.length)
  if (filePathList.length > 0) {
    filePathList.forEach(filePath => {
      createWindow({
        filePath: filePath,
        doEmpty: doEmpty
      })
    })
  }
  else {
    createWindow()
  }
})

const createWindow = require('./electron-shell/CreateWindow')
