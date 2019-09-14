/* global __dirname */

//listen to an open-file-dialog command and sending back selected information
const electron = require('electron')
const ipc = electron.ipcMain
const dialog = electron.dialog
const fs = require('fs')
const path = require('path')

let inited = false


module.exports = function (mainWindow) {
  if (inited === true) {
    return this
  }
  ipc.on('open-another-win', function (event, options) {
    //console.log(options)
    const CreateWindow = require(path.join(__dirname, './CreateWindow'))
    CreateWindow(options)
    return this
  })

  ipc.on('open-file-dialog', function (event, filePath, filters) {
    //console.log(process.platform)

    let options = {
      title: 'Please select a file',
      properties: ['openFile']
    }
    
    let dir = path.dirname(filePath)

    if (typeof(dir) === 'string' && dir !== '' && fs.existsSync(dir)) {
      options.defaultPath = dir
    }

    //if (process.platform === 'win32') {
    /*
      options.filters = [
        { name: 'Spread sheets', extensions: ['ods', 'csv', 'xlsx', 'xls', 'arff', 'sav'] },
        { name: 'OpenDocument Format', extensions: ['ods'] },
        { name: 'Comma-Separated Values', extensions: ['csv'] },
        { name: 'Microsoft Excel 2007–2019', extensions: ['xlsx'] },
        { name: 'MicrosoftExcel 97–2003', extensions: ['xls'] },
        { name: 'Attribute-Relation File Format', extensions: ['arff'] },
        { name: 'SPSS System Data File Format Family', extensions: ['sav'] }
      ]
    */
    options.filters = filters
    //}

    dialog.showOpenDialog(null, options, function (files) {
      if (files && typeof(files[0]) === 'string') {

        let filepath = files[0]
        event.sender.send('file-selected-callback', filepath)
      }
    })
  })

  // -------------------------------------------------

  ipc.on('save-file-dialog', function (event, filePath, filters) {
    //let defaultFilter = filePath.slice(filePath.lastIndexOf('.') + 1)

    //console.log(defaultFilter)
    //console.log(filtersSelect.concat(filtersOthers))

    let options = {
      title: 'Save file to...',
      filters: filters
    }
    if (typeof(filePath) === 'string' && filePath !== '') {
      
      if (fs.existsSync(filePath) === true) {
        let fileCopyCount = 1
        let dirname = path.dirname(filePath)
        let filename = path.basename(filePath)
        let ext = '' 
        if (filename.lastIndexOf('.') > - 1) { 
          ext = filename.slice(filename.lastIndexOf('.'))
          filename = filename.slice(0, filename.lastIndexOf('.'))
        }
        
        if (filename.indexOf(' (') > -1 && filename.endsWith(')')) {
          let isFileCopyCount = filename.slice(filename.lastIndexOf(' (') + 2, -1)
          if (isNaN(isFileCopyCount) === false 
                  && typeof(parseInt(isFileCopyCount, 10)) === 'number') {
            filename = filename.slice(0, filename.lastIndexOf(' ('))
            fileCopyCount = parseInt(isFileCopyCount, 10)
            fileCopyCount++
          }
        }
        
        let tmpFilename = `${filename} (${fileCopyCount})${ext}`
        while (fs.existsSync(path.join(dirname, tmpFilename))) {
          fileCopyCount++
          tmpFilename = `${filename} (${fileCopyCount})${ext}`
        }
        
        filePath = path.join(dirname, tmpFilename)
      }
      
      options.defaultPath = filePath
    }
    //console.log(options)

    dialog.showSaveDialog(null, options, function (file) {
      if (file) {
        //console.log(file)
        event.sender.send('save-file-dialog-callback', file)
      }
    })
    
  })
  
  // ----------------------------------
  
  //console.log('change-folder')
  ipc.on('change-folder', function (event, dirpath) {
    //console.log(dirpath)
    //CreateWindow(filepath)
    
    let options = {
      title: 'Please select a folder',
      properties: ['openDirectory']
    }
    
    if (typeof(dirpath) === 'string') {
      let isDir = fs.lstatSync(dirpath).isDirectory()
      if (isDir === true) {
        options.defaultPath = dirpath
      }
    }
    
    dialog.showOpenDialog(null, options, (dirpath) => {
      if (dirpath && dirpath.length > 0) {
        console.log(dirpath[0])
        event.sender.send('change-folder-callback', dirpath[0])
      }
    })
    
    // -----------------------
    
  })
  
  // --------------------
  
  ipc.on('windowMoving', (e, {mouseX, mouseY}) => {
    const { x, y } = electron.screen.getCursorScreenPoint()
    mainWindow.setPosition(x - mouseX, y - mouseY)
  })
  
  // ---------------------
  inited = true
  return this
} // module.exports = function (mainWindow) {