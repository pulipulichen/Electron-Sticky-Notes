/* global httpVueLoader, less */

let HttpVueLoaderHelper = {
  init: function () {
    httpVueLoader.langProcessor.less = function (lessText) {
      return new Promise (function (resolve, reject) {
        less.render(lessText, {}, function (err, css) {
          //console.log(err)
          //console.log(css)
          if (err) reject (err);
          resolve(css.css);
          //return css
        });
      })
    }
  }
}

HttpVueLoaderHelper.init()

if (typeof(window) !== 'undefined') {
  window.HttpVueLoaderHelper = HttpVueLoaderHelper
}
if (typeof(exports) !== 'undefined') {
  exports.default = HttpVueLoaderHelper
}