let WindowHelper = {
  resizeToFitContent: function (width, maxWidth, height, maxHeight, isRestrictSize) {
    setTimeout(() => {
      
      if (isRestrictSize !== false) {
        if (width < maxWidth) {
          width = maxWidth
        }
        if (height < maxHeight) {
          height = maxHeight
        }
      }

      if (width > screen.availWidth) {
        width = screen.availWidth
      }
      if (height > screen.availHeight) {
        height = screen.availHeight
      }

      //console.log(width, height)
      window.resizeTo(width, height)
      
      this.moveToVisiable()
    }, 0)
    
    return this
  },
  moveToVisiable: function () {
    let leftChanged
    let left = window.screenX
    let right = left + window.outerWidth
    let maxRight = screen.availWidth
    
    if (right > maxRight) {
      leftChanged = maxRight - window.outerWidth
      
      if (ElectronHelper.getPlatform() === 'linux') {
        leftChanged = leftChanged + 50
      }
    }
    
    //console.log([left, right, maxRight, leftChanged])
    
    let topChanged
    let top = window.screenY
    let bottom = top + window.outerHeight
    let maxBottom = screen.availHeight
    if (bottom > maxBottom) {
      topChanged = maxBottom - window.outerHeight
    }
    
    //console.log([top, bottom, maxBottom, topChanged])
    
    if (leftChanged !== undefined
            || topChanged !== undefined) {
      if (leftChanged === undefined) {
        leftChanged = left
      }
      
      if (topChanged === undefined) {
        topChanged = top
      }
      
      //console.log([leftChanged, topChanged])
      window.moveTo(leftChanged, topChanged)
    }
    
    return this
  }
}

if (typeof(window) !== 'undefined') {
  window.WindowHelper = WindowHelper
}
if (typeof(exports) !== 'undefined') {
  exports.default = WindowHelper
}
if (typeof(module) !== 'undefined') {
  module.exports = WindowHelper
}