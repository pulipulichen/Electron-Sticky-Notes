/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./test-app/webpack/src/bundle.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./test-app/webpack/src/MenuBar/MenuBar.html?vue&type=template&id=420a5431&":
/*!**********************************************************************************!*\
  !*** ./test-app/webpack/src/MenuBar/MenuBar.html?vue&type=template&id=420a5431& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MenuBar_html_vue_type_template_id_420a5431___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./MenuBar.html?vue&type=template&id=420a5431& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./test-app/webpack/src/MenuBar/MenuBar.html?vue&type=template&id=420a5431&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MenuBar_html_vue_type_template_id_420a5431___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MenuBar_html_vue_type_template_id_420a5431___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./test-app/webpack/src/MenuBar/MenuBar.js?vue&type=script&lang=js&?10fb":
/*!**************************************************************************!*\
  !*** ./test-app/webpack/src/MenuBar/MenuBar.js?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  props: ['lib', 'status'],
  data() {
    return {
    }
  },
  methods: {
    toggleAlwaysOnTop: function (isAlwaysOnTop) {
      if (typeof(isAlwaysOnTop) !== 'boolean') {
        this.status.isAlwaysOnTop = (this.status.isAlwaysOnTop === false)
        isAlwaysOnTop = this.status.isAlwaysOnTop
      }
      else {
        this.status.isAlwaysOnTop = isAlwaysOnTop
      }
      this.lib.win.setAlwaysOnTop(isAlwaysOnTop)
      return this
    },
    minimize: function () {
      this.lib.win.minimize()
      return this
    },
    maximize: function () {
      this.lib.win.maximize()
      return this
    },
    unmaximize: function () {
      // 這個我們可能要自己做resize
      this.lib.win.unmaximize()
      return this
    },
    close: function () {
      this.lib.win.close()
      return this
    }
  }
}

/***/ }),

/***/ "./test-app/webpack/src/MenuBar/MenuBar.js?vue&type=script&lang=js&?e5f6":
/*!**************************************************************************!*\
  !*** ./test-app/webpack/src/MenuBar/MenuBar.js?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./MenuBar.js?vue&type=script&lang=js& */ "./test-app/webpack/src/MenuBar/MenuBar.js?vue&type=script&lang=js&?10fb");
/* harmony import */ var _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************!*\
  !*** ./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader!C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./MenuBar.less?vue&type=style&index=0&lang=less& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\index.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./test-app/webpack/src/MenuBar/MenuBar.vue":
/*!**************************************************!*\
  !*** ./test-app/webpack/src/MenuBar/MenuBar.vue ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar_html_vue_type_template_id_420a5431___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar.html?vue&type=template&id=420a5431& */ "./test-app/webpack/src/MenuBar/MenuBar.html?vue&type=template&id=420a5431&");
/* harmony import */ var _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuBar.js?vue&type=script&lang=js& */ "./test-app/webpack/src/MenuBar/MenuBar.js?vue&type=script&lang=js&?e5f6");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _MenuBar_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBar.less?vue&type=style&index=0&lang=less& */ "./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\runtime\\componentNormalizer.js");






/* normalize component */

var component = Object(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MenuBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MenuBar_html_vue_type_template_id_420a5431___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MenuBar_html_vue_type_template_id_420a5431___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "test-app/webpack/src/MenuBar/MenuBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./test-app/webpack/src/bundle.js":
/*!****************************************!*\
  !*** ./test-app/webpack/src/bundle.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue\\dist\\vue.esm.js");
/* harmony import */ var _MenuBar_MenuBar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuBar/MenuBar.vue */ "./test-app/webpack/src/MenuBar/MenuBar.vue");
const $ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js")
console.log('hello world')
$(() => {
  console.log(ElectronHelper.getBasePath())
})




new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
  el: '#app',
  components: { 
    'menu-bar': _MenuBar_MenuBar_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
})

/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/runtime/api.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\runtime\\api.js")(true);
// Module
exports.push([module.i, ".hello {\n  font-size: 3rem;\n  text-align: center;\n  color: green;\n}\n.hello .world {\n  font-size: 6rem;\n}\n", "",{"version":3,"sources":["D:/xampp/htdocs/projects-electron/Electron-Sticky-Notes/test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&","MenuBar.less"],"names":[],"mappings":"AAAA;EACE,eAAA;EACA,kBAAA;EACA,YAAA;ACCF;ADJA;EAMI,eAAA;ACCJ","file":"MenuBar.less?vue&type=style&index=0&lang=less&","sourcesContent":[".hello {\n  font-size: 3rem;\n  text-align: center;\n  color: green;\n  \n  .world {\n    font-size: 6rem;\n  }\n}",".hello {\n  font-size: 3rem;\n  text-align: center;\n  color: green;\n}\n.hello .world {\n  font-size: 6rem;\n}\n"]}]);


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./test-app/webpack/src/MenuBar/MenuBar.html?vue&type=template&id=420a5431&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./test-app/webpack/src/MenuBar/MenuBar.html?vue&type=template&id=420a5431& ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ui menu" }, [
    _c("a", {
      staticClass: "item top-toggle",
      on: { click: _vm.toggleAlwaysOnTop }
    }),
    _vm._v(" "),
    _c("div", { staticClass: "right menu" }, [
      _c(
        "a",
        {
          staticClass: "item",
          on: {
            click: function($event) {
              return _vm.minimize()
            }
          }
        },
        [_vm._v("_")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "item",
          on: {
            click: function($event) {
              return _vm.maximize()
            }
          }
        },
        [_vm._v("口")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "item",
          on: {
            click: function($event) {
              return _vm.unmaximize()
            }
          }
        },
        [_vm._v("回")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "item",
          on: {
            click: function($event) {
              return _vm.close()
            }
          }
        },
        [_vm._v("X")]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\index.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader!C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./MenuBar.less?vue&type=style&index=0&lang=less& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./test-app/webpack/src/MenuBar/MenuBar.less?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader/lib/addStylesClient.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\lib\\addStylesClient.js").default
var update = add("1e870c6a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map