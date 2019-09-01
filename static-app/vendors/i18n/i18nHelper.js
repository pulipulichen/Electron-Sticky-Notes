/* global i18n */

let i18nHelper = {
  init: function (lang) {
    i18n.set({
      'lang': lang, //e.g. en-us, zh-tw. Default is auto detect from browser.
      'path': 'i18n' // Default is empty (same level as i18n.js)
    });
  }
}

if (typeof(window) !== 'undefined') {
  window.i18nHelper = i18nHelper
}
if (typeof(exports) !== 'undefined') {
  exports.default = i18nHelper
}