/* global __dirname */

let ElectronFileHelper = {
  inited: false,
  lib: {
    readChunk: null,
    fileType: null,
    path: null,
    fs: null,
    exec: null,
    shell: null,
    spawn: null,
    electron: null,
  },
  init: function () {
    if (this.inited === true) {
      return this
    }
    
    this.lib.readChunk = RequireHelper.require('read-chunk')
    this.lib.fileType = RequireHelper.require('file-type')
    this.lib.path = RequireHelper.require('path')
    this.lib.fs = RequireHelper.require('fs')
    const child_process = RequireHelper.require('child_process')
    this.lib.exec = child_process.exec
    this.lib.spawn = child_process.spawn
    
    this.lib.electron = RequireHelper.require('electron')
    this.lib.shell = this.lib.electron.shell
    
    this.inited = true
  },
  getExt: function (filepath) {
    this.init()
    
    let ext
    if (typeof(filepath) === 'string') {
      ext = filepath.slice(filepath.lastIndexOf('.') + 1).toLowerCase()
    }
    return ext
  },
  getFileTypeMIME: function (filepath) {
    this.init()
    
    const buffer = this.lib.readChunk.sync(filepath, 0, this.lib.fileType.minimumBytes);
    let fileTypeResult = this.lib.fileType(buffer)
    if (fileTypeResult !== undefined && typeof(fileTypeResult.mime) === 'string') {
      fileTypeResult = fileTypeResult.mime
    }
    return fileTypeResult
  },
  basename: function (filepath) {
    this.init()
    return this.lib.path.basename(filepath)
  },
  dirname: function (filepath) {
    this.init()
    return this.lib.path.dirname(filepath)
  },
  existsSync: function (filepath) {
    this.init()
    if (typeof(filepath) !== 'string') {
      return false
    }
    return this.lib.fs.existsSync(filepath)
  },
  isDirSync: function (dirpath) {
    this.init()
    if (this.existsSync(dirpath)) {
      return this.lib.fs.lstatSync(dirpath).isDirectory()
    }
    else {
      return false
    }
  },
  readFileSync: function (filepath) {
    this.init()
    return this.lib.fs.readFileSync(filepath, 'utf8')
  },
  readImageSync: function (filepath) {
    this.init()
    return this.lib.fs.readFileSync(filepath)
  },
  readFileBufferSync: function (filepath) {
    this.init()
    return this.lib.fs.readFileSync(filepath)
  },
  writeFileSync: function (filepath, content) {
    this.init()
    this.lib.fs.writeFileSync(filepath, content, 'utf8')
    return filepath
  },
  writeFileAsync: function (filepath, content, callback) {
    this.init()
    this.lib.fs.writeFile(filepath, content, 'utf8', () => {
      if (typeof(callback) === 'function') {
        callback(filepath, content)
      }
    })
    return this
  },
  writeFileDelayTimer: {},
  /**
   * 
   * @param {type} filepath
   * @param {type} content
   * @param {type} delaySec 延遲時間，預設是1秒
   * @param {type} callback
   * @returns {unresolved}
   */
  writeFileDelay: function (filepath, content, delaySec, callback) {
    this.init()
    //console.log(filepath)
    //return this.writeFileSync(filepath, content)
    
    if (typeof(delaySec) === 'function') {
      callback = delaySec
      delaySec = 1
    }
    if (typeof(callback) !== 'function') {
      callback = () => {}
    }
    
    if (this.writeFileDelayTimer[filepath] !== null) {
      clearTimeout(this.writeFileDelayTimer[filepath])
      this.writeFileDelayTimer[filepath] = null
    }
    
    //console.log('writeFile', filepath)
    this.writeFileDelayTimer[filepath] = setTimeout(() => {
      this.writeFileSync(filepath, content, () => {
        this.writeFileDelayTimer[filepath] = null
        
        if (typeof(callback) === 'function') {
          callback(filepath)
        }
      })
    }, delaySec * 1000)
    
    return this
  },
  writeFileBase64Async: function (filepath, base64, callback) {
    this.init()
    //console.log('write base64: ' + filepath)
    //console.log(base64)
    if (typeof(callback) !== 'function') {
      callback = () => {}
    }
    
    this.lib.fs.writeFile(filepath, base64, 'base64', callback)
    return this
  },
  writeFileBase64Sync: function (filepath, base64) {
    this.init()
    this.lib.fs.writeFileSync(filepath, base64, 'base64')
    return this
  },
  getBasePath: function () {
    this.init()
    
    if (this.basepath === null) {
      let basepath = './'
      if (typeof(process.env.PORTABLE_EXECUTABLE_DIR) === 'string') {
        basepath = process.env.PORTABLE_EXECUTABLE_DIR
      }
      this.basepath = basepath
    }
    return this.basepath
  },
  basepath: null,
  resolve: function (filePath) {
    this.init()
    
    let basepath = this.getBasePath()
    return this.lib.path.resolve(basepath, filePath)
  },
  _tmpDirChecked: false,
  getTmpDirPath: function (filePath) {
    this.init()
    
    let tmpDirPath
    if (this._tmpDirChecked === false) {
      tmpDirPath = this.resolve('tmp')
      if (this.lib.fs.existsSync(tmpDirPath) === false) {
        this.lib.fs.mkdirSync(tmpDirPath)
      }
      this._tmpDirChecked = true
    }
    
    if (typeof(filePath) === 'string') {
      filePath = 'tmp/' + filePath
      tmpDirPath = this.resolve(filePath)
    }
    else {
      tmpDirPath = this.resolve('tmp')
    }
    
    return tmpDirPath
  },
  resolveAppPath: function (filePath) {
    this.init()
    
    //console.log([process.env.PORTABLE_EXECUTABLE_DIR, filePath, __dirname])
    
    return this.lib.path.join(__dirname, filePath)
    /*
    if (typeof(process.env.PORTABLE_EXECUTABLE_DIR) === 'string') {
      //console.log(FileSet)
      //alert(['error', filePath ])
      //throw Error('resolveAppPath')
      //console.log(filePath)
      filePath = path.join(__dirname, '/resources/app.asar/app/', filePath)
      return filePath
    }
    else {
      return this.resolve('app/' + filePath)
    }
    */
  },
  execExternalCommand: function (execCommand, callback) {
    if (process.platform === 'win32') {
      let tmpFolderPath = execCommand
      if (tmpFolderPath.startsWith('"') && tmpFolderPath.endsWith('"')) {
        tmpFolderPath = tmpFolderPath.slice(1, -1)
      }
      //console.log([tmpFolderPath, this.isDirSync(tmpFolderPath)])
      if (this.isDirSync(tmpFolderPath)) {
        this.lib.shell.openItem(tmpFolderPath)
        if (typeof(callback) === 'function') {
          callback()
        }
      }
      else {
        execCommand = '"' + this.resolve('win32-helpers/exec-external/exec-external.exe') + '" ' + execCommand
        console.log(execCommand)

        //const exec = require('child_process').exec
        this.lib.exec(execCommand, callback)
      }
    }
    else if (process.platform === 'linux') {
      //execCommand = `nohup ${execCommand} &`
      //console.log(execCommand)
      
      /*
      let spawn = require('child_process').spawn
      //spawn("gedit", {}, {shell: true})
      // /opt/google/chrome/google-chrome --app=http://blog.pulipuli.info
      spawn("/opt/google/chrome/google-chrome", [
        '--app=http://blog.pulipuli.info'
      ], {shell: true})
       */
      //let te= require('terminal-exec')
      //te('/opt/google/chrome/google-chrome --app=http://blog.pulipuli.info')
      //te('gedit')
      
      execCommand = `nohup /usr/bin/xfce4-terminal --command "${execCommand}" &`
      
      this.lib.exec(execCommand, callback)
      //callback()
      /*
      this.lib.spawn('/usr/bin/xfce4-terminal', [
        "--command",
        "/opt/google/chrome/google-chrome --app=http://blog.pulipuli.info"
      ])
      //callback()
      */
    }
  },
  openItem: function (path) {
    if (typeof(path) !== 'string') {
      return this
    }
    
    if (process.platform === 'win32') {
      let tmpFolderPath = path
      if (tmpFolderPath.startsWith('"') && tmpFolderPath.endsWith('"')) {
        tmpFolderPath = tmpFolderPath.slice(1, -1)
      }
      //console.log([tmpFolderPath, this.isDirSync(tmpFolderPath)])
      if (this.isDirSync(tmpFolderPath)) {
        this.lib.shell.openItem(tmpFolderPath)
      }
      else {
        if (path.startsWith('"') === false 
                || path.endsWith('"') === false) {
          path = `"${path}"`
        }
        path = '"' + this.resolve('win32-helpers/open-item/open-item.exe') + '" ' + path
        //console.log(execCommand)

        //const exec = require('child_process').exec
        this.lib.exec(path, () => {})
      }
    }
    else if (process.platform === 'linux') {
      console.error('It cannot open in Linux now.', path)
      //this.lib.exec(`"${path}"`, () => {})
    }
  },
  showInFolder: function (path) {
    if (this.existsSync(path)) {
      if (this.isDirSync(path)) {
        this.lib.shell.openExternal(path)
      }
      else {
        this.lib.shell.showItemInFolder(path)
      }
    }
    return this
  },
  readDirectoryFilesRecursively: function (dirPath, callback) {
    let fileList = []
    
    if (typeof(callback) !== 'function') {
      return this
    }
    else if (this.isDirSync(dirPath) === false) {
      callback(fileList)
      return this
    }
    
    let addDir = (dirPath, callback) => {
      
      this.readDirectory(dirPath, (list) => {
        fileList = fileList.concat(list.file)
        //console.log(list)
        let loop = (i) => {
          if (i < list.dir.length) {
            addDir(list.dir[i], () => {
              //console.log(list)
              //fileList = fileList.concat(list)
              i++
              loop(i)
            })
          }
          else {
            callback()
          }
        }
        loop(0)
      })
    }
    
    addDir(dirPath, () => {
      callback(fileList)
    })
    
    return this
  },
  readDirectory: function (dirPath, callback) {
    
    let fileList = []
    let dirList = []
    
    if (typeof(callback) !== 'function') {
      return this
    }
    else if (this.isDirSync(dirPath) === false) {
      callback({
        file: fileList,
        dir: dirList
      })
      return this
    }
    
    this.lib.fs.readdir(dirPath, (err, files) => {
      //handling error
      if (err) {
        return console.error('Unable to scan directory: ' + dirPath + '\n' + err);
      }
      //listing all files using forEach
      files.forEach((file) => {
        // Do whatever you want to do with the file
        let filepath = this.lib.path.join(dirPath, file)
        let isDir = this.lib.fs.lstatSync(filepath).isDirectory()

        if (isDir) {
          dirList.push(filepath)
        }
        else {
          fileList.push(filepath)
        }
      })

      callback({
        file: fileList.sort(),
        dir: dirList.sort()
      })
    })
    return this
  },
  move: function (oldPath, newPath) {
    if (this.existsSync(oldPath)) {
      this.lib.fs.renameSync(oldPath, newPath)
    }
    return this
  },
  remove: function (path) {
    if (this.existsSync(path)) {
      this.lib.fs.unlinkSync(path)
    }
    return this
  },
  copy: function (srcFilePath, distFilePath) {
    //console.log([this.existsSync(srcFilePath), srcFilePath])
    if (this.existsSync(srcFilePath)) {
      //console.log(srcFilePath, distFilePath)
      this.lib.fs.copyFileSync(srcFilePath, distFilePath)
    }
    return this
  },
  getCreateUnixMS: function (path) {
    if (this.existsSync(path)) {
      let unixMS = this.lib.fs.statSync(path).birthtime
      //console.log(unixMS)
      return unixMS
    }
    return false
  },
  isExpire: function (filePath, aliveDays) {
    let currentMSTime = (new Date()).getTime()
    let maxIntervalMS = aliveDays * 1000 * 60 * 60 * 24
    //maxIntervalMS = 1000  // for test
    let interval = currentMSTime - this.getCreateUnixMS(filePath)
    //console.log(interval)
    return (interval > maxIntervalMS)
  },
  removeIfExpire: function (filePath, aliveDays) {
    if (this.isDirSync(filePath)) {
      this.readDirectory(filePath, (list) => {
        list.file.forEach(filePath => {
          if (filePath.endsWith('.gitignore')) {
            return false
          }
          this.removeIfExpire(filePath, aliveDays)
        })
      })
    }
    else {
      if (this.isExpire(filePath, aliveDays)) {
        this.remove(filePath)
      }
    }
  },
  /**
   * 
   * @param {type} filterObject = {'html': 'html': 'Hypertext Markup Language File'}
   * @param {type} ext
   * @returns {undefined}
   */
  getFilters: function (filterConfigJSON, ext, isOnlyExt) {
    let filterArray = []
    
    if (typeof(ext) === 'string') {
      if (ext.indexOf('.') > -1) {
        ext = this.getExt(ext)
      }
      
      for (let key in filterConfigJSON) {
        if (key === ext) {
          filterArray.push({
            name: filterConfigJSON[key],
            extensions: [key]
          })
        }
      }
      
      if (isOnlyExt === true) {
        return filterArray
      }
    }
    
    for (let key in filterConfigJSON) {
      let name = filterConfigJSON[key]
      
      // 搜尋之前的資料裡面有沒有相同的key
      let isNameRepeated = false
      for (let i = 0; i < filterArray.length; i++) {
        if (filterArray[i].name === name) {
          filterArray[i].extensions.push(key)
          isNameRepeated = true
        }
      } 
      
      if (isNameRepeated === true) {
        continue
      } 
      
      filterArray.push({
        name: name,
        extensions: [key]
      })
    }
    
    return filterArray
  },
}

//ElectronFileHelper.init()

if (typeof(window) === 'object') {
  window.ElectronFileHelper = ElectronFileHelper
}
if (typeof(module) === 'object') {
  module.exports = ElectronFileHelper
}
