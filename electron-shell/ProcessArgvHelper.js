let fs = require('fs')
let path = require('path')

let PrcoessArgvHelper = {
  excludeList: [
    path.resolve(__dirname, '../index.js')
  ],
  getFilePaths: function () {
    let filepaths = []
    //console.log(this.excludeList)
    if (typeof(process) === 'object'
        && Array.isArray(process.argv)) {
      process.argv.forEach(arg => {
        //console.log(arg)
        //console.log(this.excludeList[0])
        //console.log(this.excludeList.indexOf(arg))
        if (arg.endsWith('electron.exe') === false 
                && this.excludeList.indexOf(arg) === -1
                && fs.existsSync(arg)) {
          arg = path.resolve(arg)
          if (this.excludeList.indexOf(arg) === -1) {
            filepaths.push(path.resolve(arg))
          }
        }
      })
    }
    return filepaths
  },
  getDirPaths: function () {
    let dirPaths = []
    if (typeof(process) === 'object'
            && Array.isArray(process.argv)) {
        process.argv.forEach(arg => {
          if (fs.existsSync(arg) 
                  && fs.lstatSync(arg).isDirectory()) {
            dirPaths.push(arg)
          }
        })
    }
    return dirPaths
  }
}

module.exports = PrcoessArgvHelper