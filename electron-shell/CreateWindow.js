/* global __dirname */

const debug = {
  useMousePositionDisplay: true
}
const IPCEventManager = require('./IpcEventManager')
const ClipboardHelper = require('./ClipboardHelper')

const electron = require('electron')
const {
  app,
  BrowserWindow,
  clipboard,
} = electron

const url = require('url')
const path = require('path')

let mode = 'production'
if (process.argv.indexOf('--mode') - process.argv.indexOf('development') === -1) {
  mode = "development"
}
// For test
//mode = 'development'

module.exports = function (options, callback) {
  
  let iconPath = path.join(__dirname, '../app/imgs/icon.ico')
  if (process.platform === 'linux') {
    iconPath = path.join(__dirname, '../app/imgs/icon256.png')
  }
  
  // https://electronjs.org/docs/api/screen
  let screen = electron.screen
  let display
  if (debug.useMousePositionDisplay) {
    let point = screen.getCursorScreenPoint()
    display = screen.getDisplayNearestPoint(point)
  }
  else {
    // 測試用，固定用最後一個熒幕
    let displays = screen.getAllDisplays()
    display = displays[0]
  }
  
  let offsetX = display.bounds.x
  let offsetY = display.bounds.y
  //let displays = screen.getAllDisplays()
  //console.log(display)
  
  let {width, height} = display.workArea
  
  let optionBrowserWindow = {
    x: offsetX,
    y: offsetY,
    //fullscreen: true,
    frame: false,
    icon: iconPath,
    //transparent: true,
    titleBarStyle: 'hidden',
    maximizable: false,
    //width: width,
    //height: height,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  }
  if (process.platform === 'win') {
    optionBrowserWindow.icon = optionBrowserWindow.icon.slice(0, optionBrowserWindow.icon.lastIndexOf('.')) 
            + '.ico'
  }
  let win = new BrowserWindow(optionBrowserWindow)
  //win.maximize()
  win.center()
  
  win.setMenu(null)
  if (mode === 'production') {
    win.setMenuBarVisibility(false)
  }
  
  //win.setResizable(false)
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, '../app', 'index.html'),
    //pathname: path.join(__dirname, '../app', 'codemirror.html'),
    //pathname: path.join(__dirname, '../app/webpack/src/vendors/codemirror-5.48.4', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  
  //settings.set('mode', mode);
  
  if (mode === 'development') {
    win.webContents.openDevTools()
  }
  
  //win.rendererSideName.filepath = filepath
  //win.rendererSideName.mode = mode
  win.mode = mode
  //console.log('[[', filePath)
  
  if (typeof(options) === 'object' 
          && typeof(options.filePath) === 'string') {
    win.filePath = options.filePath
    //console.log('[[', filePath)
  }
  else if (typeof(options) === 'object' 
          && typeof(options.doEmpty) === 'boolean' 
          && options.doEmpty === true) {
    // do notihing
  }
  else {
    let clipboardImage = ClipboardHelper.getImageDataURL()
    
    if (clipboardImage !== undefined) {
      win.imageDataURL = clipboardImage
      //console.log(`image: [${clipboardImage}]`)
    }
    else {
      let clipboardText = ClipboardHelper.getText()
      if (typeof(clipboardText) === 'string' && clipboardText !== '') {
        win.contentText = clipboardText
        //console.log(`[${clipboardText}]`)
      }
    }
  }
  
  if (typeof(options) === 'object' && options.enableAutoSave === true) {
    win.enableAutoSave = true
  }
  
  //return win
  
  win.hide()
  
  IPCEventManager(win)
  
  win.webContents.once('dom-ready', () => {

    //const electronVibrancy = require('electron-vibrancy')
    //electronVibrancy.SetVibrancy(win, 0)

    if (typeof(callback) === 'function') {
      callback(win)
    }
  })
  
  return win
}