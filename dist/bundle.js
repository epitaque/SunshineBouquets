/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\vue\\dist\\vue.js'\n    at Error (native)");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  addBouquet: function addBouquet(bouquet) {
    return new Promise(function (resolve, reject) {
      console.log("Adding bouquet...");
      var formData = new FormData();
      var apiUrl = '/api/bouquets/add';
      var containsImages = false;
      var imageIndex = 0;
      formData.append('name', bouquet.name);
      formData.append('description', bouquet.description);
      formData.append('pack_size', bouquet.packSize);

      if (bouquet.image) {
        formData.append('images[]', bouquet.image);
        formData.append('imageIndex', imageIndex++);
        containsImages = true;
      } else {
        formData.append('imageIndex', -1);
      }

      formData.append('collections', bouquet.collections.join());
      formData.append('tags', bouquet.tags.join());

      for (var i = 0; i < bouquet.srps.length; i++) {
        var srp = {};

        if (bouquet.srps[i].image) {
          srp.imageIndex = imageIndex++;
          formData.append('images[]', bouquet.srps[i].image);
          containsImages = true;
        } else {
          srp.imageIndex = -1;
        }

        srp.srp = bouquet.srps[i].srp;
        srp.name = bouquet.srps[i].name;
        srp.stems = bouquet.srps[i].stems;
        formData.append('srps[]', JSON.stringify(srp));
      }

      if (containsImages) {
        apiUrl += 'withimage';
      }

      _vue.default.http.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        if (res.status == 200 && res.body && res.body.id) {
          resolve(res.body.id);
        } else {
          reject();
        }
      }).catch(function (err) {
        reject("Unable to send add bouquet request. Error: " + JSON.stringify(err));
      });
    });
  },
  editBouquet: function editBouquet(bouquet) {
    return new Promise(function (resolve, reject) {
      console.log("Editing bouquet...");
      var formData = new FormData();
      var apiUrl = '/api/bouquets/edit';

      if (!bouquet.pictureRemoved && bouquet.pictureChanged && bouquet.image != null && bouquet.image != 'null') {
        apiUrl += 'withimage';
        -formData.append('image', bouquet.image);
      }

      console.log("pictureRemoved status: " + bouquet.pictureRemoved);
      console.log("apiUrl: " + apiUrl);
      formData.append('name', bouquet.name);
      formData.append('price', bouquet.price);
      formData.append('collections', bouquet.collections.join());
      formData.append('packSize', bouquet.packSize);
      formData.append('tags', bouquet.tags.join());
      formData.append('id', bouquet.id);
      formData.append('pictureRemoved', bouquet.pictureRemoved);
      formData.append('pictureChanged', bouquet.pictureChanged);

      _vue.default.http.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        if (res.status == 200 && res.body && res.body.id) {
          resolve(res.body.id);
        } else {
          reject();
        }
      }).catch(function (err) {
        reject("Unable to send edit bouquet request. Error: " + JSON.stringify(err));
      });
    });
  },
  getBouquets: function getBouquets() {
    return new Promise(function (resolve, reject) {
      _vue.default.http.get('/api/bouquets').then(function (res) {
        if (res && res.status == 200 && res.body) {
          resolve(res.body);
        } else {
          reject("Unable to get bouquets.");
        }
      }).catch(function (err) {
        reject("Unable to get bouquets. Error: " + JSON.stringify(err));
      });
    });
  },
  removeBouquet: function removeBouquet(bouquetId) {
    return new Promise(function (resolve, reject) {
      _vue.default.http.post('/api/bouquets/delete', {
        id: bouquetId
      }).then(function (res) {
        console.log("Got here, response: " + JSON.stringify(res));

        if (res.status == 200) {
          resolve(bouquetId);
        } else {
          reject({
            "error": res.error
          });
        }
      }).catch(function (error) {
        reject('Failed to remove bouquet.');
        console.error("Error sending remove bouquet request err: ", error);
      });
    });
  }
};
exports.default = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  register: function register(user) {
    // user: { "name": "Brian", "email": "asdf@fd.co", "password":"asdf" }
    return new Promise(function (resolve, reject) {
      _vue.default.http.post('/api/auth/register', user).then(function (res) {
        console.log("Got here, response: " + JSON.stringify(res));

        if (res.status == 200) {
          resolve(user);
        } else {
          reject({
            "error": res.error
          });
        }
      }).catch(function (error) {
        // called if Vue.http.post fails
        reject({
          "error": 'Unable to send register request.'
        });
        console.error("Error sending register request err: ", error);
      });
    });
  },
  login: function login(info) {
    // info: { rememberMe: true, user: {"email": "asdf@fd.co", "password": "asdf"}}
    return new Promise(function (resolve, reject) {
      _vue.default.http.post('/api/auth/login', info).then(function (res) {
        //var body = res.body;
        if (!res) reject("Undefined response.");
        if (!res.status) reject("Undefined response code.");

        if (res.status == 200) {
          resolve(res.body.user);
        } else {
          reject(res.body.error);
        }
      }).catch(function (error) {
        // called if Vue.http.post fails
        if (error.body) {
          reject(error.body.error);
        } else {
          reject('Unable to send login request.');
        }

        console.error("Error sending login request", JSON.stringify(error));
      });
    });
  },
  logout: function logout() {
    return new Promise(function (resolve, reject) {
      _vue.default.http.post('/api/auth/logout').then(function (res) {
        if (res.status == 200) {
          resolve("success");
        }
      }).catch(function (error) {
        if (error && error.body) {
          reject(error.body.error);
        } else {
          reject('Unable to send logout request.');
        }

        console.error("Error sending logout request", error);
      });
    });
  }
};
exports.default = _default;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_InputTag_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f4a4efbe_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_InputTag_vue__ = __webpack_require__(42);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(40)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_InputTag_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f4a4efbe_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_InputTag_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\InputTag.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f4a4efbe", Component.options)
  } else {
    hotAPI.reload("data-v-f4a4efbe", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\vee-validate\\dist\\vee-validate.esm.js'\n    at Error (native)");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Bouquet_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ccbd10c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Bouquet_vue__ = __webpack_require__(38);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Bouquet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ccbd10c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Bouquet_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\Bouquet.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ccbd10c", Component.options)
  } else {
    hotAPI.reload("data-v-5ccbd10c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_bustCache_PictureInput_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_206762e8_hasScoped_true_buble_transforms_vue_loader_lib_selector_type_template_index_0_bustCache_PictureInput_vue__ = __webpack_require__(57);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(55)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-206762e8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_bustCache_PictureInput_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_206762e8_hasScoped_true_buble_transforms_vue_loader_lib_selector_type_template_index_0_bustCache_PictureInput_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\vue-picture-input\\PictureInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-206762e8", Component.options)
  } else {
    hotAPI.reload("data-v-206762e8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = _interopRequireDefault(__webpack_require__(1));

var _vueRouter = _interopRequireDefault(__webpack_require__(14));

var _App = _interopRequireDefault(__webpack_require__(15));

var _routes = __webpack_require__(23);

var _veeValidate = _interopRequireDefault(__webpack_require__(8));

var _vueResource = _interopRequireDefault(__webpack_require__(62));

var _store = _interopRequireDefault(__webpack_require__(64));

var _vuexRouterSync = __webpack_require__(71);

var _vueNotifications = _interopRequireDefault(__webpack_require__(72));

var _miniToastr = _interopRequireDefault(__webpack_require__(73));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("main.js loading...");
var toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
};

_miniToastr.default.init({
  types: toastTypes
});

function toast(_ref) {
  var title = _ref.title,
      message = _ref.message,
      type = _ref.type,
      timeout = _ref.timeout,
      cb = _ref.cb;
  return _miniToastr.default[type](message, title, timeout, cb);
}

var options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};

_vue.default.use(_vueNotifications.default, options);

_vue.default.use(_veeValidate.default);

_vue.default.use(_vueResource.default);

_vue.default.use(_vueRouter.default);

_miniToastr.default.init();

var Router = new _vueRouter.default({
  mode: 'history',
  routes: _routes.Routes
});
var unsync = (0, _vuexRouterSync.sync)(_store.default, Router);
var vm = new _vue.default({
  components: {
    'app': _App.default
  },
  store: _store.default,
  router: Router
}).$mount("#app");

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_App_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_278ff9ce_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_App_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(16)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_278ff9ce_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-278ff9ce", Component.options)
  } else {
    hotAPI.reload("data-v-278ff9ce", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Navbar__ = __webpack_require__(18);
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  components: {
    'navbar': __WEBPACK_IMPORTED_MODULE_0__Navbar__["a" /* default */]
  },

  data() {
    return {};
  },

  created() {
    this.$store.dispatch('updateBouquets');
  }

});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Navbar_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a569c61a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Navbar_vue__ = __webpack_require__(21);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(19)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Navbar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a569c61a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Navbar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Navbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a569c61a", Component.options)
  } else {
    hotAPI.reload("data-v-a569c61a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "navbar",

  data() {
    return {};
  },

  created() {
    console.log("this.$store: " + this.$store);
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    user() {
      return this.$store.getters.getUser;
    }
    /*
    ...mapGetters({
    	isLoggedIn: 'isLoggedIn',
    	user: 'user'
    })*/


  }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("header", { staticClass: "navbar" }, [
      _vm._m(0, false, false),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "navbar-section" },
        [
          _c(
            "router-link",
            {
              staticClass: "btn btn-link darkgreen",
              attrs: { to: "/collections" }
            },
            [_vm._v("Collections")]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "darkgreen btn btn-link",
              attrs: { to: "/bouquets" }
            },
            [_vm._v("Bouquets")]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.isLoggedIn,
                  expression: "!isLoggedIn"
                }
              ]
            },
            [
              _c(
                "router-link",
                {
                  staticClass: "btn btn-link darkgreen",
                  attrs: { to: "/login" }
                },
                [_vm._v("Login")]
              ),
              _vm._v(" "),
              _c(
                "router-link",
                {
                  staticClass: "btn btn-link darkgreen",
                  attrs: { to: "/register" }
                },
                [_vm._v("Register")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.isLoggedIn
            ? _c(
                "div",
                [
                  _c(
                    "router-link",
                    {
                      staticClass: "darkgreen btn btn-link",
                      attrs: { to: "/cart" }
                    },
                    [_vm._v("Cart")]
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    {
                      staticClass: "btn btn-link darkgreen",
                      attrs: { to: "/profile" }
                    },
                    [_vm._v(_vm._s(_vm.user.name))]
                  )
                ],
                1
              )
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "bar" })
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "navbar-section" }, [
      _c("img", { attrs: { width: "150", src: "/resource/logo.png" } })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a569c61a", esExports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "container grid-hero grid-lg text-center",
      attrs: { id: "overview" }
    },
    [_c("navbar"), _vm._v(" "), _c("router-view")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-278ff9ce", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;

var _Login = _interopRequireDefault(__webpack_require__(24));

var _Register = _interopRequireDefault(__webpack_require__(27));

var _CollectionsList = _interopRequireDefault(__webpack_require__(30));

var _BouquetsList = _interopRequireDefault(__webpack_require__(33));

var _BouquetPage = _interopRequireDefault(__webpack_require__(83));

var _Profile = _interopRequireDefault(__webpack_require__(44));

var _Homepage = _interopRequireDefault(__webpack_require__(47));

var _Cart = _interopRequireDefault(__webpack_require__(50));

var _AddBouquet = _interopRequireDefault(__webpack_require__(53));

var _EditBouquet = _interopRequireDefault(__webpack_require__(59));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = [{
  path: '',
  component: _Homepage.default
}, {
  path: '/cart',
  component: _Cart.default
}, {
  path: '/login',
  component: _Login.default
}, {
  path: '/register',
  component: _Register.default
}, {
  path: '/collections',
  component: _CollectionsList.default
}, {
  path: '/bouquets',
  component: _BouquetsList.default
}, {
  path: '/profile',
  component: _Profile.default
}, {
  path: '/bouquets/add',
  component: _AddBouquet.default
}, {
  path: '/bouquets/:id',
  component: _BouquetPage.default
}, {
  path: '/bouquets/edit/:id',
  component: _EditBouquet.default
}];
exports.Routes = Routes;

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Login_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aa3b9e10_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Login_vue__ = __webpack_require__(26);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aa3b9e10_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Auth\\Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aa3b9e10", Component.options)
  } else {
    hotAPI.reload("data-v-aa3b9e10", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Auth_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Auth_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__services_Auth_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'login',

  data() {
    return {
      email: '',
      password: '',
      remember: false,
      formHasErrors: false,
      loginError: '',
      success: false
    };
  },

  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
          return;
        }

        this.formHasErrors = true;
      });
    },

    submit() {
      this.formHasErrors = false;
      __WEBPACK_IMPORTED_MODULE_0__services_Auth_js___default.a.login({
        rememberMe: this.remember,
        user: {
          email: this.email,
          password: this.password
        }
      }).then(user => {
        this.success = true;
        this.loginError = '';
        this.$store.commit('setUser', user);
        console.log("retrieving user from state: " + JSON.stringify(this.$store.getters.getUser));
        console.log("Successfully logged in, user " + JSON.stringify(user));
        this.$router.push('profile');
      }).catch(err => {
        this.loginError = err;
        console.error("Error logging in: " + err);
      });
    }

  }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "text-left col-mx-auto column col-6 col-xs-12",
      staticStyle: { "margin-top": "20px" }
    },
    [
      _c("h2", { staticClass: "text-center" }, [_vm._v("Login")]),
      _vm._v(" "),
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.validateBeforeSubmit($event)
            }
          }
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_email" } },
              [_vm._v("Email")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "has-icon-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|email",
                    expression: "'required|email'"
                  },
                  {
                    name: "model",
                    rawName: "v-model.lazy.trim",
                    value: _vm.email,
                    expression: "email",
                    modifiers: { lazy: true, trim: true }
                  }
                ],
                staticClass: "form-input",
                class: { input: true, "is-error": _vm.errors.has("email") },
                attrs: {
                  name: "email",
                  type: "email",
                  id: "s_email",
                  placeholder: "Email"
                },
                domProps: { value: _vm.email },
                on: {
                  change: function($event) {
                    _vm.email = $event.target.value.trim()
                  },
                  blur: function($event) {
                    _vm.$forceUpdate()
                  }
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon icon icon-mail" })
            ])
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errors.has("email"),
                  expression: "errors.has('email')"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v(_vm._s(_vm.errors.first("email")))]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_password" } },
              [_vm._v("Password")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "has-icon-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|min:6",
                    expression: "'required|min:6'"
                  },
                  {
                    name: "model",
                    rawName: "v-model.lazy.trim",
                    value: _vm.password,
                    expression: "password",
                    modifiers: { lazy: true, trim: true }
                  }
                ],
                staticClass: "form-input",
                class: { input: true, "is-error": _vm.errors.has("password") },
                attrs: {
                  name: "password",
                  type: "password",
                  id: "s_password",
                  placeholder: "Password"
                },
                domProps: { value: _vm.password },
                on: {
                  change: function($event) {
                    _vm.password = $event.target.value.trim()
                  },
                  blur: function($event) {
                    _vm.$forceUpdate()
                  }
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon icon icon-link" })
            ])
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errors.has("password"),
                  expression: "errors.has('password')"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v(_vm._s(_vm.errors.first("password")))]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "form-checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.remember,
                    expression: "remember"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.remember)
                    ? _vm._i(_vm.remember, null) > -1
                    : _vm.remember
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.remember,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.remember = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.remember = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.remember = $$c
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon" }),
              _vm._v("\n\t\t\t\t\tRemember me\n\t\t\t\t")
            ])
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.formHasErrors,
                  expression: "formHasErrors"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v("Please fix errors before logging in.")]
          ),
          _vm._v(" "),
          _c("p", { staticClass: "text-error" }, [
            _vm._v(_vm._s(_vm.loginError) + " ")
          ]),
          _vm._v(" "),
          _vm._m(0, false, false),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.success && _vm.loginError == "",
                  expression: "success && loginError == ''"
                }
              ],
              staticClass: "text-success"
            },
            [_vm._v(" Successfully logged in. ")]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [_vm._v("\n\t\t\t\t\tSign in\n\t\t\t\t")]
      )
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-aa3b9e10", esExports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Register_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b31cb638_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Register_vue__ = __webpack_require__(29);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Register_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b31cb638_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Register_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Auth\\Register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b31cb638", Component.options)
  } else {
    hotAPI.reload("data-v-b31cb638", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vee_validate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Auth_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Auth_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services_Auth_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'register',

  created() {
    __WEBPACK_IMPORTED_MODULE_0_vee_validate__["Validator"].extend('email_exists', {
      getMessage: field => "That email has already been used to register.",
      validate: value => {
        return new Promise((resolve, reject) => {
          this.$http.get('/api/auth/validateEmail', {
            headers: {
              'email': value
            }
          }).then(response => {
            if (response.status == 200 && response.body.success) {
              resolve({
                valid: true
              });
            } else {
              resolve({
                valid: false
              });
            }
          }, response => {
            console.error("Error sending validateEmail request");
          });
        });
      }
    });
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      formHasErrors: false,
      registerError: '',
      successfullyRegistered: false
    };
  },

  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
          return;
        }

        this.formHasErrors = true;
      });
    },

    submit() {
      this.formHasErrors = false;
      __WEBPACK_IMPORTED_MODULE_1__services_Auth_js___default.a.register({
        name: this.name,
        email: this.email,
        password: this.password
      }).then(user => {
        this.successfullyRegistered = true;
        console.log("Successfully registered user " + user);
      }).catch(res => {
        this.registerError = res.error;
        console.error("Error registering: " + res.error);
      });
    },

    submitCallback(response) {}

  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "text-left col-mx-auto column col-6 col-xs-12",
      staticStyle: { "margin-top": "20px" }
    },
    [
      _c("h2", { staticClass: "text-center" }, [_vm._v("Register")]),
      _vm._v(" "),
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.validateBeforeSubmit($event)
            }
          }
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_name" } },
              [_vm._v("Name")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "has-icon-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|alpha_spaces|max:64|min:4",
                    expression: "'required|alpha_spaces|max:64|min:4'"
                  },
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.name,
                    expression: "name"
                  }
                ],
                staticClass: "form-input",
                class: {
                  input: true,
                  "is-error": _vm.errors.has("name"),
                  "is-success": _vm.fields.name.valid
                },
                attrs: {
                  name: "name",
                  "data-vv-delay": "1000",
                  type: "text",
                  id: "s_name",
                  placeholder: "John Smith"
                },
                domProps: { value: _vm.name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.name = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon icon icon-people" })
            ]),
            _vm._v(" "),
            _c(
              "p",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.errors.has("name"),
                    expression: "errors.has('name')"
                  }
                ],
                staticClass: "form-input-hint text-error"
              },
              [_vm._v(_vm._s(_vm.errors.first("name")))]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_email" } },
              [_vm._v("Email")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "has-icon-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|email|email_exists",
                    expression: "'required|email|email_exists'"
                  },
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.email,
                    expression: "email"
                  }
                ],
                staticClass: "form-input",
                class: {
                  input: true,
                  "is-error": _vm.errors.has("email"),
                  "is-success": _vm.fields.email.valid
                },
                attrs: {
                  name: "email",
                  "data-vv-delay": "1000",
                  type: "email",
                  id: "s_email",
                  placeholder: "example@sunshinebouquet.com"
                },
                domProps: { value: _vm.email },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.email = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon icon icon-mail" })
            ])
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errors.has("email"),
                  expression: "errors.has('email')"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v(_vm._s(_vm.errors.first("email")))]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_password" } },
              [_vm._v("Password")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "has-icon-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|min:6|confirmed:confirmedpassword",
                    expression: "'required|min:6|confirmed:confirmedpassword'"
                  },
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.password,
                    expression: "password"
                  }
                ],
                staticClass: "form-input",
                class: {
                  input: true,
                  "is-error": _vm.errors.has("password"),
                  "is-success": _vm.fields.password.valid
                },
                attrs: {
                  name: "password",
                  "data-vv-delay": "1000",
                  type: "password",
                  id: "s_password",
                  placeholder: "Password"
                },
                domProps: { value: _vm.password },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.password = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon icon icon-link" })
            ])
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errors.has("password"),
                  expression: "errors.has('password')"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v(_vm._s(_vm.errors.first("password")))]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_password" } },
              [_vm._v("Confirm Password")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "has-icon-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required",
                    expression: "'required'"
                  }
                ],
                staticClass: "form-input",
                class: {
                  input: true,
                  "is-error": _vm.errors.has("password"),
                  "is-success": _vm.fields.password.valid
                },
                attrs: {
                  name: "confirmedpassword",
                  "data-vv-delay": "1000",
                  type: "password",
                  placeholder: "Confirm Password"
                }
              }),
              _vm._v(" "),
              _c("i", { staticClass: "form-icon icon icon-link" })
            ])
          ]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { disabled: _vm.successfullyRegistered, type: "submit" }
              },
              [_vm._v("\n                    Register\n                ")]
            )
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.formHasErrors,
                  expression: "formHasErrors"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v("Please fix errors before registering.")]
          ),
          _vm._v(" "),
          _c("p", { staticClass: "text-error" }, [
            _vm._v(_vm._s(_vm.registerError) + " ")
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.successfullyRegistered,
                  expression: "successfullyRegistered"
                }
              ],
              staticClass: "form-input-hint text-success"
            },
            [_vm._v("You have successfully registered!")]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b31cb638", esExports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CollectionsList_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_238efa99_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CollectionsList_vue__ = __webpack_require__(32);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CollectionsList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_238efa99_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CollectionsList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Collections\\CollectionsList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-238efa99", Component.options)
  } else {
    hotAPI.reload("data-v-238efa99", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {};
  }

});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0, false, false)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h3", [_vm._v("CollectionsList")])])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-238efa99", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BouquetsList_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_854303b2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BouquetsList_vue__ = __webpack_require__(43);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(34)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BouquetsList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_854303b2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BouquetsList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\BouquetsList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-854303b2", Component.options)
  } else {
    hotAPI.reload("data-v-854303b2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bouquet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_infinite_scroll__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_infinite_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_infinite_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__InputTag__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    'bouquet': __WEBPACK_IMPORTED_MODULE_0__Bouquet__["a" /* default */],
    InputTag: __WEBPACK_IMPORTED_MODULE_2__InputTag__["a" /* default */]
  },
  directives: {
    infiniteScroll: __WEBPACK_IMPORTED_MODULE_1_vue_infinite_scroll___default.a
  },

  data() {
    return {
      query: '',
      dateadded: [],
      busy: false,
      tagsArray: [],
      displayedBouquets: []
    };
  },

  computed: {
    filteredBouquets() {
      var a = [];

      for (var i = 0; i < this.$store.getters.bouquets.length; i++) {
        //ensure that the bouquet matches all tags
        var bouquet = this.$store.getters.bouquets[i];

        if (this.matchesQuery(bouquet, this.tagsArray)) {
          a.push(bouquet);
        }
      }

      return a;
    },

    disabledLoader() {
      return this.busy || this.displayedBouquets == 0;
    },

    user() {
      return this.$store.getters.getUser;
    }

  },
  methods: {
    matchesQuery(bouquet, searchTags) {
      //if(tags.length == 0) return true;
      for (var i = 0; i < searchTags.length; i++) {
        var searchTag = searchTags[i].toLowerCase();

        if (bouquet.name.toLowerCase().indexOf(searchTag) != -1) {
          return true;
        }

        var containsSearchTag = false;

        for (var j = 0; j < bouquet.tags.length; j++) {
          if (bouquet.tags[j].indexOf(searchTag) != -1) {
            containsSearchTag = true;
          }
        }

        if (!containsSearchTag) {
          return false;
        }
      }

      return true;
    },

    loadMore() {
      this.busy = true;
      setTimeout(() => {
        const temp = [];

        for (let i = this.displayedBouquets.length; i <= this.displayedBouquets.length + 50 && i < this.filteredBouquets.length; i++) {
          temp.push(this.filteredBouquets[i]);
        }

        this.displayedBouquets = this.displayedBouquets.concat(temp);
        this.busy = false;
      }, 1);
    },

    onInputChange(e) {
      this.displayedBouquets = [];
      this.loadMore();
      console.log("Input changed!");
    }

  },

  created() {}

});

/***/ }),
/* 36 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Bouquets__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Bouquets___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__services_Bouquets__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'bouquet',
  props: ['bouquetId', 'viewType'],

  data() {
    return {
      error: ''
    };
  },

  computed: {
    bouquet() {
      var bouquet = this.$store.getters.bouquet(this.bouquetId);
      /*var bouquet = {
      	bouquet_id: 1,
      	name: 'Liliac Flowers',
      	description: 'A wonderful addition to any holiday celebration, the liliac flower symbolizes love.',
      	image: '/resource/genericflower.jpg',
      	collections: ['Holidays'],
      	tags: ['warm', 'cozy'],
      	date_added: new Date()
      };*/

      if (bouquet == null) {
        this.error = 'bouquet #' + this.bouquetId + ' does not exist.';
        return null;
      } else {
        this.error = '';
      }

      return bouquet;
    },

    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    rootClassString() {
      if (this.viewType == 'card') {
        return 'column col-3 col-md-4 col-sm-6 col-xs-12 bouquetroot';
      }

      if (this.viewType == 'cart') {
        return 'col-12 bouquetroot';
      }

      return '';
    }

  },
  methods: {
    addToCart() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
      } else {
        this.$store.commit('addBouquetIdToCart', this.bouquetId);
      }
    },

    removeFromCart() {
      this.$store.commit('removeBouquetIdFromCart', this.bouquetId);
    },

    remove() {
      __WEBPACK_IMPORTED_MODULE_0__services_Bouquets___default.a.removeBouquet(this.bouquetId).then(res => {
        this.showDeleteSuccess();
        this.$store.dispatch('updateBouquets').then(_ => {
          this.$router.push('/bouquets/');
        });
      }).catch(err => {
        this.error = err;
      });
    },

    edit() {
      this.$router.push('/bouquets/edit/' + this.bouquetId);
    }

  },
  notifications: {
    showDeleteSuccess: {
      title: 'Success',
      message: 'Successfully deleted bouquet',
      type: 'success'
    }
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.rootClassString }, [
    _vm.viewType == "card"
      ? _c("div", [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-image" }, [
              _c("img", {
                staticClass: "img-responsive",
                attrs: { src: _vm.bouquet.image }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-header" }, [
              _c(
                "span",
                { staticClass: "toprow" },
                [
                  _c(
                    "router-link",
                    { attrs: { to: "/bouquets/" + _vm.bouquet.id } },
                    [
                      _c("h4", { staticClass: "card-title h5" }, [
                        _vm._v(_vm._s(_vm.bouquet.name))
                      ])
                    ]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-body" },
              _vm._l(_vm.bouquet.tags, function(tag) {
                return _c("span", { staticClass: "chip" }, [
                  _vm._v(_vm._s(tag))
                ])
              })
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.viewType == "cart"
      ? _c("div", [
          _c("div", { staticClass: "tile" }, [
            _c("div", { staticClass: "tile-icon" }, [
              _c("figure", { staticClass: "avatar avatar-lg" }, [
                _c("img", { attrs: { src: _vm.bouquet.image } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tile-content" }, [
              _c("p", { staticClass: "tile-title" }, [
                _vm._v(_vm._s(_vm.bouquet.name))
              ]),
              _vm._v(" "),
              _c("p"),
              _c(
                "div",
                { staticClass: "tile-subtitle text-gray" },
                _vm._l(_vm.bouquet.tags, function(tag) {
                  return _c("span", { staticClass: "chip" }, [
                    _vm._v(_vm._s(tag))
                  ])
                })
              ),
              _vm._v(" "),
              _c("p"),
              _vm._v(" "),
              _c("p", [
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.bouquet.inCart,
                        expression: "bouquet.inCart"
                      }
                    ],
                    staticClass: "btn btn-sm btn-error",
                    on: {
                      click: function($event) {
                        _vm.removeFromCart()
                      }
                    }
                  },
                  [_vm._v("\n\t\t\t\t\t\t\tRemove\n\t\t\t\t\t\t")]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tile-action" })
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.viewType == "full"
      ? _c("div", { staticClass: "columns" }, [
          _vm.bouquet != null
            ? _c("div", { staticClass: "col-3 col-xs-12" }, [
                _c("img", {
                  staticClass: "side-image",
                  attrs: { src: _vm.bouquet.image }
                })
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "col-9 col-xs-12" }, [
            _vm.bouquet != null
              ? _c("div", [
                  _c("h2", [_vm._v(_vm._s(_vm.bouquet.name))]),
                  _vm._v(" "),
                  _c("h3", [_vm._v("Description")]),
                  _vm._v(" "),
                  _c("p", [_vm._v(_vm._s(_vm.bouquet.description))]),
                  _vm._v(" "),
                  _c("h3", [_vm._v("SRPs")]),
                  _vm._v(" "),
                  _c("p", [_vm._v(" to be added... ")]),
                  _vm._v(" "),
                  _c("h3", [_vm._v("Tags")]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "tile-subtitle text-gray" },
                    _vm._l(_vm.bouquet.tags, function(tag) {
                      return _c("span", { staticClass: "chip" }, [
                        _vm._v(_vm._s(tag))
                      ])
                    })
                  ),
                  _vm._v(" "),
                  _c("h3", [_vm._v("Collections")]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "tile-subtitle text-gray" },
                    _vm._l(_vm.bouquet.collections, function(tag) {
                      return _c("span", { staticClass: "chip" }, [
                        _vm._v(_vm._s(tag))
                      ])
                    })
                  ),
                  _vm._v(" "),
                  _c("h3", [_vm._v("Pack Size")]),
                  _vm._v(" "),
                  _c("p", [_vm._v(_vm._s(_vm.bouquet.packSize))]),
                  _vm._v(" "),
                  _c("h3", [_vm._v("Date Added")]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v(
                      _vm._s(
                        new Date(_vm.bouquet.date_added).toLocaleDateString()
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _vm.isLoggedIn
                    ? _c("div", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-error",
                            on: { click: _vm.remove }
                          },
                          [_vm._v("Delete")]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          { staticClass: "btn", on: { click: _vm.edit } },
                          [_vm._v("Edit")]
                        )
                      ])
                    : _vm._e()
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "text-error" }, [
              _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.error) + "\n\t\t\t\t")
            ])
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ccbd10c", esExports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.infiniteScroll = factory());
}(this, function () { 'use strict';

  var ctx = '@@InfiniteScroll';

  var throttle = function throttle(fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line

    var execute = function execute() {
      fn.apply(context, args);
      lastExec = now;
    };

    return function () {
      context = this;
      args = arguments;

      now = Date.now();

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (lastExec) {
        var diff = delay - (now - lastExec);
        if (diff < 0) {
          execute();
        } else {
          timer = setTimeout(function () {
            execute();
          }, diff);
        }
      } else {
        execute();
      }
    };
  };

  var getScrollTop = function getScrollTop(element) {
    if (element === window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }

    return element.scrollTop;
  };

  var getComputedStyle = document.defaultView.getComputedStyle;

  var getScrollEventTarget = function getScrollEventTarget(element) {
    var currentNode = element;
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
      var overflowY = getComputedStyle(currentNode).overflowY;
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return window;
  };

  var getVisibleHeight = function getVisibleHeight(element) {
    if (element === window) {
      return document.documentElement.clientHeight;
    }

    return element.clientHeight;
  };

  var getElementTop = function getElementTop(element) {
    if (element === window) {
      return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
  };

  var isAttached = function isAttached(element) {
    var currentNode = element.parentNode;
    while (currentNode) {
      if (currentNode.tagName === 'HTML') {
        return true;
      }
      if (currentNode.nodeType === 11) {
        return false;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  };

  var doBind = function doBind() {
    if (this.binded) return; // eslint-disable-line
    this.binded = true;

    var directive = this;
    var element = directive.el;

    var throttleDelayExpr = element.getAttribute('infinite-scroll-throttle-delay');
    var throttleDelay = 200;
    if (throttleDelayExpr) {
      throttleDelay = Number(directive.vm[throttleDelayExpr] || throttleDelayExpr);
      if (isNaN(throttleDelay) || throttleDelay < 0) {
        throttleDelay = 200;
      }
    }
    directive.throttleDelay = throttleDelay;

    directive.scrollEventTarget = getScrollEventTarget(element);
    directive.scrollListener = throttle(doCheck.bind(directive), directive.throttleDelay);
    directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

    this.vm.$on('hook:beforeDestroy', function () {
      directive.scrollEventTarget.removeEventListener('scroll', directive.scrollListener);
    });

    var disabledExpr = element.getAttribute('infinite-scroll-disabled');
    var disabled = false;

    if (disabledExpr) {
      this.vm.$watch(disabledExpr, function (value) {
        directive.disabled = value;
        if (!value && directive.immediateCheck) {
          doCheck.call(directive);
        }
      });
      disabled = Boolean(directive.vm[disabledExpr]);
    }
    directive.disabled = disabled;

    var distanceExpr = element.getAttribute('infinite-scroll-distance');
    var distance = 0;
    if (distanceExpr) {
      distance = Number(directive.vm[distanceExpr] || distanceExpr);
      if (isNaN(distance)) {
        distance = 0;
      }
    }
    directive.distance = distance;

    var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
    var immediateCheck = true;
    if (immediateCheckExpr) {
      immediateCheck = Boolean(directive.vm[immediateCheckExpr]);
    }
    directive.immediateCheck = immediateCheck;

    if (immediateCheck) {
      doCheck.call(directive);
    }

    var eventName = element.getAttribute('infinite-scroll-listen-for-event');
    if (eventName) {
      directive.vm.$on(eventName, function () {
        doCheck.call(directive);
      });
    }
  };

  var doCheck = function doCheck(force) {
    var scrollEventTarget = this.scrollEventTarget;
    var element = this.el;
    var distance = this.distance;

    if (force !== true && this.disabled) return; //eslint-disable-line
    var viewportScrollTop = getScrollTop(scrollEventTarget);
    var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

    var shouldTrigger = false;

    if (scrollEventTarget === element) {
      shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
    } else {
      var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

      shouldTrigger = viewportBottom + distance >= elementBottom;
    }

    if (shouldTrigger && this.expression) {
      this.expression();
    }
  };

  var InfiniteScroll = {
    bind: function bind(el, binding, vnode) {
      el[ctx] = {
        el: el,
        vm: vnode.context,
        expression: binding.value
      };
      var args = arguments;
      el[ctx].vm.$on('hook:mounted', function () {
        el[ctx].vm.$nextTick(function () {
          if (isAttached(el)) {
            doBind.call(el[ctx], args);
          }

          el[ctx].bindTryCount = 0;

          var tryBind = function tryBind() {
            if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
            el[ctx].bindTryCount++;
            if (isAttached(el)) {
              doBind.call(el[ctx], args);
            } else {
              setTimeout(tryBind, 50);
            }
          };

          tryBind();
        });
      });
    },
    unbind: function unbind(el) {
      if (el && el[ctx] && el[ctx].scrollEventTarget) el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
    }
  };

  var install = function install(Vue) {
    Vue.directive('InfiniteScroll', InfiniteScroll);
  };

  if (window.Vue) {
    window.infiniteScroll = InfiniteScroll;
    Vue.use(install); // eslint-disable-line
  }

  InfiniteScroll.install = install;

  return InfiniteScroll;

}));

/***/ }),
/* 40 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// taken/modified from https://github.com/matiastucci/vue-input-tag

/*eslint-disable*/
const validators = {
  email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  url: new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
  text: new RegExp(/^[a-zA-Z]+$/),
  digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
  isodate: new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
  /*eslint-enable*/

};
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'InputTag',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    autocompletes: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    onChange: {
      type: Function
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    validate: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      newTag: '',
      focused: false,
      recentlyFocused: false
    };
  },

  methods: {
    focusNewTag() {
      if (this.readOnly) {
        return;
      }

      this.$el.querySelector('.new-tag').focus();
      this.recentlyFocused = true;
      setTimeout(() => {
        this.recentlyFocused = false;
      }, 200);
    },

    addNew(tag) {
      if (tag && this.tags.indexOf(tag) === -1 && this.validateIfNeeded(tag)) {
        this.tags.push(tag);
        this.tagChange();
      }

      this.newTag = '';
    },

    validateIfNeeded(tagValue) {
      if (this.validate === '' || this.validate === undefined) {
        return true;
      } else if (Object.keys(validators).indexOf(this.validate) > -1) {
        return validators[this.validate].test(tagValue);
      }

      return true;
    },

    remove(index) {
      this.tags.splice(index, 1);
      this.tagChange();
    },

    removeLastTag() {
      if (this.newTag) {
        return;
      }

      this.tags.pop();
      this.tagChange();
    },

    tagChange() {
      if (this.onChange) {
        // avoid passing the observer
        this.onChange(JSON.parse(JSON.stringify(this.tags)));
      }
    },

    blur() {
      setTimeout(() => {
        if (!this.$el.querySelector('.new-tag').focused && !this.recentlyFocused) {
          this.focused = false;
        }
      }, 150);
    }

  },
  computed: {
    updAutocompletes() {
      if (this.autocompletes == null) return null;
      return this.autocompletes.filter(x => {
        return this.tags.indexOf(x) == -1;
      }).filter(x => {
        return x.indexOf(this.newTag) != -1;
      });
    }

  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "form-autocomplete",
        class: { "read-only": _vm.readOnly },
        on: {
          click: function($event) {
            _vm.focusNewTag()
          }
        }
      },
      [
        _c(
          "div",
          { staticClass: "form-autocomplete-input form-input" },
          [
            _vm._l(_vm.tags, function(tag, index) {
              return _c("div", { key: index, staticClass: "chip" }, [
                _vm._v("\n\t\t\t\t\t" + _vm._s(tag) + "\n\t\t\t\t\t"),
                !_vm.readOnly
                  ? _c("a", {
                      staticClass: "btn btn-clear",
                      attrs: { "aria-label": "Close", role: "button" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          $event.stopPropagation()
                          _vm.remove(index)
                        }
                      }
                    })
                  : _vm._e()
              ])
            }),
            _vm._v(" "),
            !_vm.readOnly
              ? _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newTag,
                      expression: "newTag"
                    }
                  ],
                  staticClass: "form-input new-tag",
                  attrs: { type: "text", placeholder: _vm.placeholder },
                  domProps: { value: _vm.newTag },
                  on: {
                    focus: function($event) {
                      _vm.focused = true
                    },
                    blur: function($event) {
                      _vm.blur()
                    },
                    keydown: [
                      function($event) {
                        if (
                          !("button" in $event) &&
                          _vm._k($event.keyCode, "delete", [8, 46], $event.key)
                        ) {
                          return null
                        }
                        $event.stopPropagation()
                        _vm.removeLastTag()
                      },
                      function($event) {
                        if (
                          !("button" in $event) &&
                          $event.keyCode !== 188 &&
                          _vm._k($event.keyCode, "enter", 13, $event.key) &&
                          _vm._k($event.keyCode, "tab", 9, $event.key)
                        ) {
                          return null
                        }
                        $event.preventDefault()
                        $event.stopPropagation()
                        _vm.addNew(_vm.newTag)
                      }
                    ],
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.newTag = $event.target.value
                    }
                  }
                })
              : _vm._e()
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "ul",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value:
                  _vm.focused &&
                  _vm.autocompletes != null &&
                  _vm.updAutocompletes.length != 0,
                expression:
                  "focused && autocompletes != null && updAutocompletes.length != 0"
              }
            ],
            staticClass: "menu",
            staticStyle: { position: "inherit" }
          },
          _vm._l(_vm.updAutocompletes, function(suggestion) {
            return _c(
              "li",
              {
                staticClass: "menu-item",
                on: {
                  click: function($event) {
                    _vm.addNew(suggestion)
                  }
                }
              },
              [
                _c("a", [
                  _c("div", { staticClass: "tile tile-centered" }, [
                    _c("div", { staticClass: "tile-content" }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t\t" +
                          _vm._s(suggestion) +
                          "\n\t\t\t\t\t\t\t"
                      )
                    ])
                  ])
                ])
              ]
            )
          })
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f4a4efbe", esExports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "columns" }, [
      _c("div", { staticClass: "filters col-12" }, [
        _c("div", { staticStyle: { display: "flex" } }, [
          _c(
            "div",
            { staticClass: "col-3 col-sm-6" },
            [
              _c("input-tag", {
                attrs: {
                  placeholder: "Search Tags",
                  "on-change": _vm.onInputChange,
                  tags: _vm.tagsArray
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm.user != null
            ? _c("div", { staticClass: "col-3 col-ml-auto" }, [
                _c(
                  "div",
                  { staticStyle: { float: "right" } },
                  [
                    _c("router-link", { attrs: { to: "/bouquets/add" } }, [
                      _c("button", { staticClass: "btn btn-primary" }, [
                        _c("i", { staticClass: "icon icon-plus" }),
                        _vm._v(" Add Bouquet")
                      ])
                    ])
                  ],
                  1
                )
              ])
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-12" }, [
        _c(
          "div",
          { staticClass: "columns" },
          _vm._l(_vm.displayedBouquets, function(bouquet) {
            return _c("bouquet", {
              key: bouquet.id,
              attrs: { viewType: "card", bouquetId: bouquet.id }
            })
          })
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "infinite-scroll",
                rawName: "v-infinite-scroll",
                value: _vm.loadMore,
                expression: "loadMore"
              }
            ],
            attrs: {
              "infinite-scroll-disabled": "false",
              "infinite-scroll-distance": "20"
            }
          },
          [_c("p", { staticClass: "text-secondary" }, [_vm._v(".")])]
        ),
        _vm._v(" "),
        _vm.busy ? _c("div", { staticClass: "loading loading-lg" }) : _vm._e(),
        _vm._v(" "),
        !_vm.busy && _vm.displayedBouquets.length == 0
          ? _c("p", { staticClass: "text-gray" }, [
              _vm._v("No bouquets matched your query.")
            ])
          : _vm._e()
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-854303b2", esExports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Profile_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7646a978_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Profile_vue__ = __webpack_require__(46);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Profile_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7646a978_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Profile_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Auth\\Profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7646a978", Component.options)
  } else {
    hotAPI.reload("data-v-7646a978", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Auth_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Auth_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__services_Auth_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'profile',

  data() {
    return {
      logoutError: ''
    };
  },

  created() {
    console.log("Profile component loaded.");
  },

  computed: {
    user() {
      return this.$store.getters.getUser;
    }

  },
  methods: {
    logout() {
      __WEBPACK_IMPORTED_MODULE_0__services_Auth_js___default.a.logout().then(res => {
        this.$store.commit('logout');
        this.logoutError = '';
        this.$router.push({
          path: '/'
        });
      }).catch(err => {
        this.logoutError = err;
      });
    }

  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "text-left col-mx-auto column col-6 col-xs-12",
      staticStyle: { "margin-top": "20px" }
    },
    [
      _vm.user != null
        ? _c("div", [
            _c("h2", { staticClass: "text-center" }, [_vm._v("Profile")]),
            _vm._v(" "),
            _c("h3", [_vm._v("Name")]),
            _vm._v(" "),
            _c("p", [_vm._v(" " + _vm._s(_vm.user.name) + " ")]),
            _vm._v(" "),
            _c("h3", [_vm._v("Email")]),
            _vm._v(" "),
            _c("p", [_vm._v(" " + _vm._s(_vm.user.email) + " ")]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                on: {
                  click: function($event) {
                    _vm.logout()
                  }
                }
              },
              [_vm._v("Logout")]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "text-error" }, [
              _vm._v(_vm._s(_vm.logoutError))
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.user == null
        ? _c(
            "p",
            { staticClass: "largetext text-gray" },
            [
              _vm._v("\n\t\tLooks like you're not logged in, please "),
              _c("router-link", { attrs: { to: "/login" } }, [_vm._v("Login")]),
              _vm._v(" to see your profile.\n\t")
            ],
            1
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7646a978", esExports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Homepage_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d2b769de_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Homepage_vue__ = __webpack_require__(49);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Homepage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d2b769de_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Homepage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Homepage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d2b769de", Component.options)
  } else {
    hotAPI.reload("data-v-d2b769de", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {};
  }

});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0, false, false)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h3", [_vm._v("Homepage")])])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d2b769de", esExports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Cart_vue__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d2b70e9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Cart_vue__ = __webpack_require__(52);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Cart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d2b70e9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Cart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Cart\\Cart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d2b70e9", Component.options)
  } else {
    hotAPI.reload("data-v-7d2b70e9", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bouquets_Bouquet__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    'bouquet': __WEBPACK_IMPORTED_MODULE_0__Bouquets_Bouquet__["a" /* default */]
  },

  data() {
    return {};
  },

  computed: {
    cart() {
      return this.$store.getters.cart;
    },

    bouquetIds() {
      /*var bouquets = [];
      for(var i = 0; i < this.cart.bouquetIds.length; i++) {
      	bouquets.push(this.$store.getters.bouquet[this.cart.bouquetIds[i]]);
      }*/
      return this.cart.bouquetIds;
    },

    user() {
      return this.$store.getters.getUser;
    },

    note() {
      return this.cart.note;
    }

  },
  methods: {
    updateNote(e) {
      this.$store.commit('updateCartNote', e.target.value);
    }

  },

  created() {
    console.log("Cart component loaded");
  }

});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "text-left col-mx-auto column col-6 col-xs-12",
      staticStyle: { "margin-top": "20px" }
    },
    [
      _c("h2", [_vm._v("Cart")]),
      _vm._v(" "),
      _vm.bouquetIds.length != 0
        ? _c("div", { staticClass: "col-12" }, [
            _c(
              "div",
              { staticClass: "columns" },
              _vm._l(_vm.bouquetIds, function(bouquetId) {
                return _c("bouquet", {
                  attrs: { viewType: "cart", bouquetId: bouquetId }
                })
              })
            ),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c(
                "label",
                {
                  staticClass: "form-label",
                  attrs: { for: "input-example-3" }
                },
                [_vm._v("Note")]
              ),
              _vm._v(" "),
              _c("textarea", {
                staticClass: "form-input",
                attrs: { id: "input-example-3", rows: "3" },
                domProps: { value: _vm.note },
                on: { input: _vm.updateNote }
              })
            ]),
            _vm._v(" "),
            _vm._m(0, false, false)
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.user != null && _vm.bouquetIds.length == 0
        ? _c(
            "p",
            { staticClass: "text-large text-gray" },
            [
              _vm._v(" \n\t\tYour cart is empty. Try adding some "),
              _c("router-link", { attrs: { to: "/bouquets" } }, [
                _vm._v("bouquets")
              ]),
              _vm._v(".\n\t")
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.user == null
        ? _c(
            "p",
            { staticClass: "text-large text-gray" },
            [
              _vm._v("\n\t\tLooks like you're not logged in, please "),
              _c("router-link", { attrs: { to: "/login" } }, [_vm._v("Login")]),
              _vm._v(" to add items to your cart.\n\t")
            ],
            1
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("button", { staticClass: "btn btn-primary" }, [
        _c("i", { staticClass: "icon icon icon-mail" }),
        _vm._v(" Send Order Email")
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7d2b70e9", esExports)
  }
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AddBouquet_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbb0bdaa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AddBouquet_vue__ = __webpack_require__(58);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AddBouquet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbb0bdaa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AddBouquet_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\AddBouquet.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fbb0bdaa", Component.options)
  } else {
    hotAPI.reload("data-v-fbb0bdaa", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_picture_input__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputTag__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Bouquets__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Bouquets___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__services_Bouquets__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EditableSRP__ = __webpack_require__(93);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    PictureInput: __WEBPACK_IMPORTED_MODULE_0_vue_picture_input__["a" /* default */],
    InputTag: __WEBPACK_IMPORTED_MODULE_1__InputTag__["a" /* default */],
    EditableSRP: __WEBPACK_IMPORTED_MODULE_3__EditableSRP__["a" /* default */]
  },

  data() {
    return {
      name: '',
      image: null,
      packSize: 1,
      collectionsArray: [],
      tagsArray: [],
      formHasErrors: false,
      success: false,
      submitError: '',
      submitting: false,
      description: ''
    };
  },

  created() {
    this.addSrp(false);
  },

  methods: {
    onPictureChange() {
      console.log('New picture selected!');

      if (this.$refs.pictureInput.image) {
        this.image = this.$refs.pictureInput.file;
        console.log('Picture loaded.');
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },

    onCollectionsChange() {},

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
          return;
        }

        this.formHasErrors = true;
      });
    },

    submit() {
      this.submitting = true;
      __WEBPACK_IMPORTED_MODULE_2__services_Bouquets___default.a.addBouquet({
        name: this.name,
        image: this.image,
        packSize: this.packSize,
        collections: this.collectionsArray,
        description: this.description,
        tags: this.tagsArray,
        srps: this.$store.getters.tempSrps
      }).then(res => {
        console.log("BouquetService.addBouquet request");
        this.submitting = false;
        this.success = true;
        this.$store.dispatch('updateBouquets').then(_ => {
          console.log("Successfully dispatched updateBouquets action");
          this.$router.push('/bouquets/' + res);
        });
      }).catch(err => {
        this.submitting = false;
        this.submitError = err;
      });
    },

    addSrp(deletable) {
      console.log("adding srp");
      this.$store.commit('addTempSrp', deletable);
    }

  },
  computed: {
    uniqueTags() {
      return this.$store.state.uniqueTags;
    },

    uniqueCollections() {
      return this.$store.state.uniqueCollections;
    },

    srpIds() {
      return this.$store.getters.tempSrpKeys;
    },

    bouquet() {
      return this.$store.getters.tempBouquet;
    }

  }
});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'picture-input',
  props: {
    width: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    height: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    margin: {
      type: [String, Number],
      default: 0
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    size: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    name: {
      type: String,
      default: null
    },
    id: {
      type: [String, Number],
      default: null
    },
    buttonClass: {
      type: String,
      default: 'btn btn-primary button'
    },
    removeButtonClass: {
      type: String,
      default: 'btn btn-secondary button secondary'
    },
    aspectButtonClass: {
      type: String,
      default: 'btn btn-secondary button secondary'
    },
    prefill: {
      type: [String, File],
      default: ''
    },
    prefillOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    crop: {
      type: Boolean,
      default: true
    },
    radius: {
      type: [String, Number],
      default: 0
    },
    removable: {
      type: Boolean,
      default: false
    },
    hideChangeButton: {
      type: Boolean,
      default: false
    },
    autoToggleAspectRatio: {
      type: Boolean,
      default: false
    },
    toggleAspectRatio: {
      type: Boolean,
      default: false
    },
    changeOnClick: {
      type: Boolean,
      default: true
    },
    plain: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 10000
    },
    alertOnError: {
      type: Boolean,
      default: true
    },
    customStrings: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    prefill() {
      if (this.prefill) {
        this.preloadImage(this.prefill, this.prefillOptions);
      } else {
        this.removeImage();
      }
    }

  },

  data() {
    return {
      imageSelected: false,
      previewHeight: 0,
      previewWidth: 0,
      draggingOver: false,
      canvasWidth: 0,
      canvasHeight: 0,
      strings: {
        upload: '<p>Your device does not support file uploading.</p>',
        drag: 'Drag an image or <br>click here to select a file',
        tap: 'Tap here to select a photo <br>from your gallery',
        change: 'Change Photo',
        aspect: 'Landscape/Portrait',
        remove: 'Remove Photo',
        select: 'Select a Photo',
        selected: '<p>Photo successfully selected!</p>',
        fileSize: 'The file size exceeds the limit',
        fileType: 'This file type is not supported.'
      }
    };
  },

  mounted() {
    this.updateStrings();

    if (this.prefill) {
      this.preloadImage(this.prefill, this.prefillOptions);
    }

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    });

    if (this.supportsPreview) {
      this.pixelRatio = Math.round(window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI);
      const canvas = this.$refs.previewCanvas;

      if (canvas.getContext) {
        this.context = canvas.getContext('2d');
        this.context.scale(this.pixelRatio, this.pixelRatio);
      }
    }

    if (this.accept !== 'image/*') {
      this.fileTypes = this.accept.split(',');
      this.fileTypes = this.fileTypes.map(s => s.trim());
    }

    this.canvasWidth = this.width;
    this.canvasHeight = this.height;
    this.$on('error', error => {
      if (this.alertOnError) {
        alert(error.message);
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    updateStrings() {
      for (let s in this.customStrings) {
        if (s in this.strings && typeof this.customStrings[s] === 'string') {
          this.strings[s] = this.customStrings[s];
        }
      }
    },

    onClick() {
      if (!this.imageSelected) {
        this.selectImage();
        return;
      }

      if (this.changeOnClick) {
        this.selectImage();
      }

      this.$emit('click');
    },

    onResize() {
      this.resizeCanvas();

      if (this.imageObject) {
        this.drawImage(this.imageObject);
      }
    },

    onDragStart() {
      if (!this.supportsDragAndDrop) {
        return;
      }

      this.draggingOver = true;
    },

    onDragStop() {
      if (!this.supportsDragAndDrop) {
        return;
      }

      this.draggingOver = false;
    },

    onFileDrop(e) {
      this.onDragStop();
      this.onFileChange(e);
    },

    onFileChange(e, prefill) {
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      if (files[0].size <= 0 || files[0].size > this.size * 1024 * 1024) {
        this.$emit('error', {
          type: 'fileSize',
          fileSize: files[0].size,
          fileType: files[0].type,
          fileName: files[0].name,
          message: this.strings.fileSize + ' (' + this.size + 'MB)'
        });
        return;
      }

      if (files[0].name === this.fileName && files[0].size === this.fileSize && this.fileModified === files[0].lastModified) {
        return;
      }

      this.file = files[0];
      this.fileName = files[0].name;
      this.fileSize = files[0].size;
      this.fileModified = files[0].lastModified;
      this.fileType = files[0].type;

      if (this.accept === 'image/*') {
        if (files[0].type.substr(0, 6) !== 'image/') {
          return;
        }
      } else {
        if (this.fileTypes.indexOf(files[0].type) === -1) {
          this.$emit('error', {
            type: 'fileType',
            fileSize: files[0].size,
            fileType: files[0].type,
            fileName: files[0].name,
            message: this.strings.fileType
          });
          return;
        }
      }

      this.imageSelected = true;
      this.image = '';

      if (this.supportsPreview) {
        this.loadImage(files[0], prefill || false);
      } else {
        this.$emit(prefill ? 'prefill' : 'change');
      }
    },

    loadImage(file, prefill) {
      this.getEXIFOrientation(file, orientation => {
        this.setOrientation(orientation);
        let reader = new FileReader();

        reader.onload = e => {
          this.image = e.target.result;
          this.$emit(prefill ? 'prefill' : 'change');
          this.imageObject = new Image();

          this.imageObject.onload = () => {
            if (this.autoToggleAspectRatio) {
              let canvasOrientation = this.getOrientation(this.canvasWidth, this.canvasHeight);
              let imageOrientation = this.getOrientation(this.imageObject.width, this.imageObject.height);

              if (canvasOrientation !== imageOrientation) {
                this.rotateCanvas();
              }
            }

            this.drawImage(this.imageObject);
          };

          this.imageObject.src = this.image;
        };

        reader.readAsDataURL(file);
      });
    },

    drawImage(image) {
      this.imageWidth = image.width;
      this.imageHeight = image.height;
      this.imageRatio = image.width / image.height;
      let offsetX = 0;
      let offsetY = 0;
      let scaledWidth = this.previewWidth;
      let scaledHeight = this.previewHeight;
      const previewRatio = this.previewWidth / this.previewHeight;

      if (this.crop) {
        if (this.imageRatio >= previewRatio) {
          scaledWidth = scaledHeight * this.imageRatio;
          offsetX = (this.previewWidth - scaledWidth) / 2;
        } else {
          scaledHeight = scaledWidth / this.imageRatio;
          offsetY = (this.previewHeight - scaledHeight) / 2;
        }
      } else {
        if (this.imageRatio >= previewRatio) {
          scaledHeight = scaledWidth / this.imageRatio;
          offsetY = (this.previewHeight - scaledHeight) / 2;
        } else {
          scaledWidth = scaledHeight * this.imageRatio;
          offsetX = (this.previewWidth - scaledWidth) / 2;
        }
      }

      const canvas = this.$refs.previewCanvas;
      canvas.style.background = 'none';
      canvas.width = this.previewWidth * this.pixelRatio;
      canvas.height = this.previewHeight * this.pixelRatio;
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, canvas.width, canvas.height);

      if (this.rotate) {
        this.context.translate(offsetX * this.pixelRatio, offsetY * this.pixelRatio);
        this.context.translate(scaledWidth / 2 * this.pixelRatio, scaledHeight / 2 * this.pixelRatio);
        this.context.rotate(this.rotate);
        offsetX = -scaledWidth / 2;
        offsetY = -scaledHeight / 2;
      }

      this.context.drawImage(image, offsetX * this.pixelRatio, offsetY * this.pixelRatio, scaledWidth * this.pixelRatio, scaledHeight * this.pixelRatio);
    },

    selectImage() {
      this.$refs.fileInput.click();
    },

    removeImage() {
      this.$refs.fileInput.value = '';
      this.$refs.fileInput.type = '';
      this.$refs.fileInput.type = 'file';
      this.fileName = '';
      this.fileType = '';
      this.fileSize = 0;
      this.fileModified = 0;
      this.imageSelected = false;
      this.image = '';
      this.file = null;
      this.imageObject = null;
      this.$refs.previewCanvas.style.backgroundColor = 'rgba(200,200,200,.25)';
      this.$refs.previewCanvas.width = this.previewWidth * this.pixelRatio;
      this.$emit('remove');
    },

    rotateImage() {
      this.rotateCanvas();

      if (this.imageObject) {
        this.drawImage(this.imageObject);
      }

      let newOrientation = this.getOrientation(this.canvasWidth, this.canvasHeight);
      this.$emit('aspectratiochange', newOrientation);
    },

    resizeCanvas() {
      let previewRatio = this.canvasWidth / this.canvasHeight;
      let newWidth = this.$refs.container.clientWidth;

      if (!this.toggleAspectRatio && newWidth === this.containerWidth) {
        return;
      }

      this.containerWidth = newWidth;
      this.previewWidth = Math.min(this.containerWidth - this.margin * 2, this.canvasWidth);
      this.previewHeight = this.previewWidth / previewRatio;
    },

    getOrientation(width, height) {
      let orientation = 'square';

      if (width > height) {
        orientation = 'landscape';
      } else if (width < height) {
        orientation = 'portrait';
      }

      return orientation;
    },

    switchCanvasOrientation() {
      const canvasWidth = this.canvasWidth;
      const canvasHeight = this.canvasHeight;
      this.canvasWidth = canvasHeight;
      this.canvasHeight = canvasWidth;
    },

    rotateCanvas() {
      this.switchCanvasOrientation();
      this.resizeCanvas();
    },

    setOrientation(orientation) {
      this.rotate = false;

      if (orientation === 8) {
        this.rotate = -Math.PI / 2;
      } else if (orientation === 6) {
        this.rotate = Math.PI / 2;
      } else if (orientation === 3) {
        this.rotate = -Math.PI;
      }
    },

    getEXIFOrientation(file, callback) {
      var reader = new FileReader();

      reader.onload = e => {
        var view = new DataView(e.target.result);

        if (view.getUint16(0, false) !== 0xFFD8) {
          return callback(-2);
        }

        var length = view.byteLength;
        var offset = 2;

        while (offset < length) {
          var marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xFFE1) {
            if (view.getUint32(offset += 2, false) !== 0x45786966) {
              return callback(-1);
            }

            var little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;

            for (var i = 0; i < tags; i++) {
              if (view.getUint16(offset + i * 12, little) === 0x0112) {
                return callback(view.getUint16(offset + i * 12 + 8, little));
              }
            }
          } else if ((marker & 0xFF00) !== 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }

        return callback(-1);
      };

      reader.readAsArrayBuffer(file.slice(0, 65536));
    },

    preloadImage(source, options) {
      options = Object.assign({}, options);

      if (typeof source === 'object') {
        this.imageSelected = true;
        this.image = '';

        if (this.supportsPreview) {
          this.loadImage(source, true);
        } else {
          this.$emit('prefill');
        }

        return;
      }

      let headers = new Headers();
      headers.append('Accept', 'image/*');
      fetch(source, {
        method: 'GET',
        mode: 'cors',
        headers: headers
      }).then(response => {
        return response.blob();
      }).then(imageBlob => {
        let e = {
          target: {
            files: []
          }
        };
        const fileName = options.fileName || source.split('/').slice(-1)[0];
        let mediaType = options.mediaType || 'image/' + (options.fileType || fileName.split('.').slice(-1)[0]);
        mediaType = mediaType.replace('jpg', 'jpeg');
        e.target.files[0] = new File([imageBlob], fileName, {
          type: mediaType
        });
        this.onFileChange(e, true);
      }).catch(err => {
        this.$emit('error', {
          type: 'failedPrefill',
          message: 'Failed loading prefill image: ' + err
        });
      });
    }

  },
  computed: {
    supportsUpload() {
      if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        return false;
      }

      const el = document.createElement('input');
      el.type = 'file';
      return !el.disabled;
    },

    supportsPreview() {
      return window.FileReader && !!window.CanvasRenderingContext2D;
    },

    supportsDragAndDrop() {
      const div = document.createElement('div');
      return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && !('ontouchstart' in window || navigator.msMaxTouchPoints);
    },

    computedClasses() {
      const classObject = {};
      classObject['dragging-over'] = this.draggingOver;
      return classObject;
    },

    fontSize() {
      return Math.min(0.04 * this.previewWidth, 21) + 'px';
    }

  }
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "container",
      staticClass: "picture-input",
      attrs: { id: "picture-input" }
    },
    [
      !_vm.supportsUpload
        ? _c("div", { domProps: { innerHTML: _vm._s(_vm.strings.upload) } })
        : _vm.supportsPreview
          ? _c("div", [
              _c(
                "div",
                {
                  staticClass: "preview-container",
                  style: {
                    maxWidth: _vm.previewWidth + "px",
                    height: _vm.previewHeight + "px",
                    borderRadius: _vm.radius + "%"
                  }
                },
                [
                  _c("canvas", {
                    ref: "previewCanvas",
                    staticClass: "picture-preview",
                    class: _vm.computedClasses,
                    style: {
                      height: _vm.previewHeight + "px",
                      zIndex: _vm.zIndex + 1
                    },
                    on: {
                      drag: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                      },
                      dragover: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                      },
                      dragstart: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                        _vm.onDragStart($event)
                      },
                      dragenter: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                        _vm.onDragStart($event)
                      },
                      dragend: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                        _vm.onDragStop($event)
                      },
                      dragleave: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                        _vm.onDragStop($event)
                      },
                      drop: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                        _vm.onFileDrop($event)
                      },
                      click: function($event) {
                        $event.preventDefault()
                        _vm.onClick($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  !_vm.imageSelected && !_vm.plain
                    ? _c(
                        "div",
                        {
                          staticClass: "picture-inner",
                          style: {
                            top: -_vm.previewHeight + "px",
                            marginBottom: -_vm.previewHeight + "px",
                            fontSize: _vm.fontSize,
                            borderRadius: _vm.radius + "%",
                            zIndex: _vm.zIndex + 2
                          }
                        },
                        [
                          _vm.supportsDragAndDrop
                            ? _c("span", {
                                staticClass: "picture-inner-text",
                                domProps: {
                                  innerHTML: _vm._s(_vm.strings.drag)
                                }
                              })
                            : _c("span", {
                                staticClass: "picture-inner-text",
                                domProps: { innerHTML: _vm._s(_vm.strings.tap) }
                              })
                        ]
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _vm.imageSelected && !_vm.hideChangeButton
                ? _c(
                    "button",
                    {
                      class: _vm.buttonClass,
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.selectImage($event)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.strings.change))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.imageSelected && _vm.removable
                ? _c(
                    "button",
                    {
                      class: _vm.removeButtonClass,
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.removeImage($event)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.strings.remove))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.imageSelected &&
              _vm.toggleAspectRatio &&
              _vm.width !== _vm.height
                ? _c(
                    "button",
                    {
                      class: _vm.aspectButtonClass,
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.rotateImage($event)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.strings.aspect))]
                  )
                : _vm._e()
            ])
          : _c("div", [
              !_vm.imageSelected
                ? _c(
                    "button",
                    {
                      class: _vm.buttonClass,
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.selectImage($event)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.strings.select))]
                  )
                : _c("div", [
                    _c("div", {
                      domProps: { innerHTML: _vm._s(_vm.strings.selected) }
                    }),
                    _vm._v(" "),
                    !_vm.hideChangeButton
                      ? _c(
                          "button",
                          {
                            class: _vm.buttonClass,
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.selectImage($event)
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.strings.change))]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.removable
                      ? _c(
                          "button",
                          {
                            class: _vm.removeButtonClass,
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.removeImage($event)
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.strings.remove))]
                        )
                      : _vm._e()
                  ])
            ]),
      _vm._v(" "),
      _c("input", {
        ref: "fileInput",
        attrs: { type: "file", name: _vm.name, id: _vm.id, accept: _vm.accept },
        on: { change: _vm.onFileChange }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-206762e8", esExports)
  }
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "text-left col-mx-auto column col-6 col-xs-12",
      staticStyle: { "margin-top": "20px" }
    },
    [
      _c("h3", [_vm._v("Add Bouquet")]),
      _vm._v(" "),
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.validateBeforeSubmit($event)
            }
          }
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_name" } },
              [_vm._v("Name")]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required",
                  expression: "'required'"
                },
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.name,
                  expression: "name"
                }
              ],
              staticClass: "form-input",
              class: { input: true, "is-error": _vm.errors.has("name") },
              attrs: { name: "name", id: "s_name" },
              domProps: { value: _vm.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.name = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errors.has("name"),
                  expression: "errors.has('name')"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v(_vm._s(_vm.errors.first("name")))]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c("label", { staticClass: "form-label" }, [_vm._v("Photo")]),
              _vm._v(" "),
              _c("picture-input", {
                ref: "pictureInput",
                attrs: {
                  width: "200",
                  height: "200",
                  margin: "16",
                  removable: true,
                  accept: "image/jpeg,image/png",
                  size: "15",
                  buttonClass: "btn"
                },
                on: { change: _vm.onPictureChange }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("div", { staticClass: "columns" }, [
              _c("div", { staticClass: "column col-sm-12 col-6" }, [
                _c(
                  "label",
                  { staticClass: "form-label", attrs: { for: "s_packsize" } },
                  [_vm._v("Pack Size")]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required",
                      expression: "'required'"
                    },
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.packSize,
                      expression: "packSize"
                    }
                  ],
                  staticClass: "form-input",
                  class: {
                    input: true,
                    "is-error": _vm.errors.has("pack size")
                  },
                  attrs: {
                    type: "number",
                    step: "1",
                    min: "1",
                    name: "pack size",
                    id: "s_packsize"
                  },
                  domProps: { value: _vm.packSize },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.packSize = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "p",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.errors.has("pack size"),
                        expression: "errors.has('pack size')"
                      }
                    ],
                    staticClass: "form-input-hint text-error"
                  },
                  [_vm._v(_vm._s(_vm.errors.first("pack size")))]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c(
                "label",
                { staticClass: "form-label", attrs: { for: "s_collections" } },
                [_vm._v("Collections")]
              ),
              _vm._v(" "),
              _c("input-tag", {
                attrs: {
                  tags: _vm.collectionsArray,
                  autocompletes: _vm.uniqueCollections
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c(
                "label",
                { staticClass: "form-label", attrs: { for: "s_collections" } },
                [_vm._v("Tags")]
              ),
              _vm._v(" "),
              _c("input-tag", {
                attrs: { tags: _vm.tagsArray, autocompletes: _vm.uniqueTags }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "input-example-3" } },
              [_vm._v("Description")]
            ),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.description,
                  expression: "description"
                }
              ],
              staticClass: "form-input",
              attrs: { id: "input-example-3", rows: "3" },
              domProps: { value: _vm.description },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.description = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c("label", { staticClass: "form-label" }, [_vm._v("SRPs")]),
              _vm._v(" "),
              _vm._l(_vm.srpIds, function(srpId) {
                return _c(
                  "div",
                  [_c("EditableSRP", { attrs: { new: "", id: srpId } })],
                  1
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c(
              "button",
              {
                staticClass: "btn",
                on: {
                  click: function($event) {
                    _vm.addSrp(true)
                  }
                }
              },
              [_vm._v("Add SRP")]
            )
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.formHasErrors,
                  expression: "formHasErrors"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v("Please fix errors before trying to add a bouquet.")]
          ),
          _vm._v(" "),
          _vm._m(0, false, false),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.submitError != "",
                  expression: "submitError != ''"
                }
              ],
              staticClass: "form-input-hint text-error",
              class: { loading: _vm.submitting }
            },
            [_vm._v(_vm._s(_vm.submitError))]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [_vm._v("\n\t\t\t\t\tAdd Bouquet\n\t\t\t\t")]
      )
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fbb0bdaa", esExports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EditBouquet_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_57a14b90_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EditBouquet_vue__ = __webpack_require__(61);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EditBouquet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_57a14b90_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EditBouquet_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\EditBouquet.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57a14b90", Component.options)
  } else {
    hotAPI.reload("data-v-57a14b90", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_picture_input__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputTag__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Bouquets__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Bouquets___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__services_Bouquets__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    PictureInput: __WEBPACK_IMPORTED_MODULE_0_vue_picture_input__["a" /* default */],
    InputTag: __WEBPACK_IMPORTED_MODULE_1__InputTag__["a" /* default */]
  },

  data() {
    return {
      name: '',
      image: null,
      srp: 0,
      packSize: 1,
      collectionsArray: [],
      tagsArray: [],
      formHasErrors: false,
      success: false,
      submitError: '',
      submitting: false,
      bouquetId: this.$route.params.id,
      pictureChanged: false,
      pictureRemoved: false,
      loaded: true
    };
  },

  methods: {
    onPictureChange() {
      console.log('New picture selected!');

      if (this.$refs.pictureInput.image) {
        this.pictureRemoved = false;
        this.pictureChanged = true;
        this.image = this.$refs.pictureInput.file;
        console.log('Picture loaded.');
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },

    onPictureRemoved() {
      this.pictureRemoved = true;
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
          return;
        }

        this.formHasErrors = true;
      });
    },

    submit() {
      this.submitting = true;
      __WEBPACK_IMPORTED_MODULE_2__services_Bouquets___default.a.editBouquet({
        name: this.name,
        image: this.image,
        srp: this.srp,
        packSize: this.packSize,
        collections: this.collectionsArray,
        tags: this.tagsArray,
        pictureChanged: this.pictureChanged,
        pictureRemoved: this.pictureRemoved,
        id: this.bouquetId
      }).then(res => {
        console.log("BouquetService.editBouquet request with image " + this.image);
        this.submitting = false;
        this.success = true;
        this.$store.dispatch('updateBouquets').then(_ => {
          console.log("Successfully dispatched updateBouquets action");
          this.loaded = false;
          this.$router.push('/bouquets/' + res);
        });
      }).catch(err => {
        this.submitting = false;
        this.submitError = err;
      });
    }

  },

  created() {
    this.name = this.bouquet.name;
    this.srp = this.bouquet.srp;
    this.packSize = this.bouquet.packSize;
    this.collectionsArray = this.bouquet.collections;
    this.tagsArray = this.bouquet.tags;
  },

  computed: {
    uniqueTags() {
      return this.$store.state.uniqueTags;
    },

    uniqueCollections() {
      return this.$store.state.uniqueCollections;
    },

    bouquet() {
      return this.$store.getters.bouquet(this.bouquetId);
      ;
    }

  }
});

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "text-left col-mx-auto column col-6 col-xs-12",
      staticStyle: { "margin-top": "20px" }
    },
    [
      _c("h3", [_vm._v("Edit Bouquet")]),
      _vm._v(" "),
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.validateBeforeSubmit($event)
            }
          }
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "s_name" } },
              [_vm._v("Name")]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required",
                  expression: "'required'"
                },
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.name,
                  expression: "name"
                }
              ],
              staticClass: "form-input",
              class: { input: true, "is-error": _vm.errors.has("name") },
              attrs: { name: "name", id: "s_name" },
              domProps: { value: _vm.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.name = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errors.has("name"),
                  expression: "errors.has('name')"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v(_vm._s(_vm.errors.first("name")))]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c("label", { staticClass: "form-label" }, [_vm._v("Photo")]),
              _vm._v(" "),
              _vm.loaded != null && _vm.loaded
                ? _c("picture-input", {
                    ref: "pictureInput",
                    attrs: {
                      width: "200",
                      height: "200",
                      margin: "16",
                      removable: true,
                      accept: "image/jpeg,image/png",
                      size: "15",
                      prefill: _vm.bouquet.image,
                      buttonClass: "btn"
                    },
                    on: {
                      change: _vm.onPictureChange,
                      remove: _vm.onPictureRemoved
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("div", { staticClass: "columns" }, [
              _c("div", { staticClass: "column col-sm-12 col-6" }, [
                _c(
                  "label",
                  { staticClass: "form-label", attrs: { for: "s_srp" } },
                  [_vm._v("Price")]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "input-group" }, [
                  _c("span", { staticClass: "input-group-addon" }, [
                    _vm._v("$")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      },
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.srp,
                        expression: "srp"
                      }
                    ],
                    staticClass: "form-input",
                    class: { input: true, "is-error": _vm.errors.has("srp") },
                    attrs: {
                      type: "number",
                      min: "0",
                      step: "0.01",
                      name: "srp",
                      id: "s_srp"
                    },
                    domProps: { value: _vm.srp },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.srp = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "p",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.errors.has("srp"),
                        expression: "errors.has('srp')"
                      }
                    ],
                    staticClass: "form-input-hint text-error"
                  },
                  [_vm._v(_vm._s(_vm.errors.first("srp")))]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "column col-sm-12 col-6" }, [
                _c(
                  "label",
                  { staticClass: "form-label", attrs: { for: "s_packsize" } },
                  [_vm._v("Pack Size")]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required",
                      expression: "'required'"
                    },
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.packSize,
                      expression: "packSize"
                    }
                  ],
                  staticClass: "form-input",
                  class: {
                    input: true,
                    "is-error": _vm.errors.has("pack size")
                  },
                  attrs: {
                    type: "number",
                    step: "1",
                    min: "1",
                    name: "pack size",
                    id: "s_packsize"
                  },
                  domProps: { value: _vm.packSize },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.packSize = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "p",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.errors.has("pack size"),
                        expression: "errors.has('pack size')"
                      }
                    ],
                    staticClass: "form-input-hint text-error"
                  },
                  [_vm._v(_vm._s(_vm.errors.first("pack size")))]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c(
                "label",
                { staticClass: "form-label", attrs: { for: "s_collections" } },
                [_vm._v("Collections")]
              ),
              _vm._v(" "),
              _c("input-tag", {
                attrs: {
                  tags: _vm.collectionsArray,
                  autocompletes: _vm.uniqueCollections
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c(
                "label",
                { staticClass: "form-label", attrs: { for: "s_collections" } },
                [_vm._v("Tags")]
              ),
              _vm._v(" "),
              _c("input-tag", {
                attrs: { tags: _vm.tagsArray, autocompletes: _vm.uniqueTags }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.formHasErrors,
                  expression: "formHasErrors"
                }
              ],
              staticClass: "form-input-hint text-error"
            },
            [_vm._v("Please fix errors before trying to edit a bouquet.")]
          ),
          _vm._v(" "),
          _vm._m(0, false, false),
          _vm._v(" "),
          _c(
            "p",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.submitError != "",
                  expression: "submitError != ''"
                }
              ],
              staticClass: "form-input-hint text-error",
              class: { loading: _vm.submitting }
            },
            [_vm._v(_vm._s(_vm.submitError))]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [_vm._v("\n\t\t\t\t\tSave Edit\n\t\t\t\t")]
      )
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-57a14b90", esExports)
  }
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Url", function() { return Url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Http", function() { return Http; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return Resource; });
/*!
 * vue-resource v1.3.4
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING  = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
            callback.call(this);
            return value;
        }, function (reason) {
            callback.call(this);
            return Promise.reject(reason);
        }
    );
};

/**
 * Utility functions.
 */

var ref = {};
var hasOwnProperty = ref.hasOwnProperty;

var ref$1 = [];
var slice = ref$1.slice;
var debug = false;
var ntick;

var inBrowser = typeof window !== 'undefined';

var Util = function (ref) {
    var config = ref.config;
    var nextTick = ref.nextTick;

    ntick = nextTick;
    debug = config.debug || !config.silent;
};

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return ntick(cb, ctx);
}

function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

function trimEnd(str, chars) {

    if (str && chars === undefined) {
        return str.replace(/\s+$/, '');
    }

    if (!str || !chars) {
        return str;
    }

    return str.replace(new RegExp(("[" + chars + "]+$")), '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}



function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

function each(obj, iterator) {

    var i, key;

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

var root = function (options$$1, next) {

    var url = next(options$$1);

    if (isString(options$$1.root) && !/^(https?:)?\//.test(url)) {
        url = trimEnd(options$$1.root, '/') + '/' + url;
    }

    return url;
};

/**
 * Query Parameter Transform.
 */

var query = function (options$$1, next) {

    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);

    each(options$$1.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
};

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url), expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null, values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }

                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key], result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

var template = function (options) {

    var variables = [], url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
};

/**
 * Service for URL templating.
 */

function Url(url, params) {

    var self = this || {}, options$$1 = url, transform;

    if (isString(url)) {
        options$$1 = {url: url, params: params};
    }

    options$$1 = merge({}, Url.options, self.$options, options$$1);

    Url.transforms.forEach(function (handler) {

        if (isString(handler)) {
            handler = Url.transform[handler];
        }

        if (isFunction(handler)) {
            transform = factory(handler, transform, self.$vm);
        }

    });

    return transform(options$$1);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transform = {template: template, query: query, root: root};
Url.transforms = ['template', 'query', 'root'];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [], escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    var el = document.createElement('a');

    if (document.documentMode) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options$$1) {
        return handler.call(vm, options$$1, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj), plain = isPlainObject(obj), hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

var xdrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(), handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, {status: status}));
        };

        request.abort = function () { return xdr.abort(); };

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
};

/**
 * CORS Interceptor.
 */

var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

var cors = function (request, next) {

    if (inBrowser) {

        var orgUrl = Url.parse(location.href);
        var reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

    next();
};

/**
 * Form data Interceptor.
 */

var form = function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) && request.emulateJSON) {

        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    next();
};

/**
 * JSON Interceptor.
 */

var json = function (request, next) {

    var type = request.headers.get('Content-Type') || '';

    if (isObject(request.body) && type.indexOf('application/json') === 0) {
        request.body = JSON.stringify(request.body);
    }

    next(function (response) {

        return response.bodyText ? when(response.text(), function (text) {

            type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }

            } else {
                response.body = text;
            }

            return response;

        }) : response;

    });
};

function isJson(str) {

    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};

    return start && end[start[0]].test(str);
}

/**
 * JSONP client (Browser).
 */

var jsonpClient = function (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

        handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (status && window[callback]) {
                delete window[callback];
                document.body.removeChild(script);
            }

            resolve(request.respondWith(body, {status: status}));
        };

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        request.abort = function () {
            handler({type: 'abort'});
        };

        request.params[name] = callback;

        if (request.timeout) {
            setTimeout(request.abort, request.timeout);
        }

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
};

/**
 * JSONP Interceptor.
 */

var jsonp = function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next();
};

/**
 * Before Interceptor.
 */

var before = function (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
};

/**
 * HTTP method override Interceptor.
 */

var method = function (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
};

/**
 * Header Interceptor.
 */

var header = function (request, next) {

    var headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[toLower(request.method)]
    );

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
};

/**
 * XMLHttp client (Browser).
 */

var xhrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(), handler = function (event) {

            var response = request.respondWith(
                'response' in xhr ? xhr.response : xhr.responseText, {
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
                }
            );

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () { return xhr.abort(); };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if (request.timeout) {
            xhr.timeout = request.timeout;
        }

        if (request.responseType && 'responseType' in xhr) {
            xhr.responseType = request.responseType;
        }

        if (request.withCredentials || request.credentials) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = handler;
        xhr.send(request.getBody());
    });
};

/**
 * Http client (Node).
 */

var nodeClient = function (request) {

    var client = __webpack_require__(63);

    return new PromiseObj(function (resolve) {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {}, handler;

        request.headers.forEach(function (value, name) {
            headers[name] = value;
        });

        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {

            var response = request.respondWith(resp.body, {
                    status: resp.statusCode,
                    statusText: trim(resp.statusMessage)
                }
            );

            each(resp.headers, function (value, name) {
                response.headers.set(name, value);
            });

            resolve(response);

        }, function (error$$1) { return handler(error$$1.response); });
    });
};

/**
 * Base client.
 */

var Client = function (context) {

    var reqHandlers = [sendRequest], resHandlers = [], handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve, reject) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);

                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        }, reject);
                    });

                    when(response, resolve, reject);

                    return;
                }

                exec();
            }

            exec();

        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
};

function sendRequest(request, resolve) {

    var client = request.client || (inBrowser ? xhrClient : nodeClient);

    resolve(client(request));
}

/**
 * HTTP Headers.
 */

var Headers = function Headers(headers) {
    var this$1 = this;


    this.map = {};

    each(headers, function (value, name) { return this$1.append(name, value); });
};

Headers.prototype.has = function has (name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function get (name) {

    var list = this.map[getName(this.map, name)];

    return list ? list.join() : null;
};

Headers.prototype.getAll = function getAll (name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function set (name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function append (name, value){

    var list = this.map[getName(this.map, name)];

    if (list) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function delete$1 (name){
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function deleteAll (){
    this.map = {};
};

Headers.prototype.forEach = function forEach (callback, thisArg) {
        var this$1 = this;

    each(this.map, function (list, name) {
        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
    });
};

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function Response(body, ref) {
    var url = ref.url;
    var headers = ref.headers;
    var status = ref.status;
    var statusText = ref.statusText;


    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;

    if (isString(body)) {

        this.bodyText = body;

    } else if (isBlob(body)) {

        this.bodyBlob = body;

        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function blob () {
    return when(this.bodyBlob);
};

Response.prototype.text = function text () {
    return when(this.bodyText);
};

Response.prototype.json = function json () {
    return when(this.text(), function (text) { return JSON.parse(text); });
};

Object.defineProperty(Response.prototype, 'data', {

    get: function get() {
        return this.body;
    },

    set: function set(body) {
        this.body = body;
    }

});

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };

    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function Request(options$$1) {

    this.body = null;
    this.params = {};

    assign(this, options$$1, {
        method: toUpper(options$$1.method || 'GET')
    });

    if (!(this.headers instanceof Headers)) {
        this.headers = new Headers(this.headers);
    }
};

Request.prototype.getUrl = function getUrl (){
    return Url(this);
};

Request.prototype.getBody = function getBody (){
    return this.body;
};

Request.prototype.respondWith = function respondWith (body, options$$1) {
    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
};

/**
 * Service for sending network requests.
 */

var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

function Http(options$$1) {

    var self = this || {}, client = Client(self.$vm);

    defaults(options$$1 || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {

        if (isString(handler)) {
            handler = Http.interceptor[handler];
        }

        if (isFunction(handler)) {
            client.use(handler);
        }

    });

    return client(new Request(options$$1)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);

    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    common: COMMON_HEADERS,
    custom: {}
};

Http.interceptor = {before: before, method: method, jsonp: jsonp, json: json, form: form, header: header, cors: cors};
Http.interceptors = ['before', 'method', 'jsonp', 'json', 'form', 'header', 'cors'];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
    };

});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body}));
    };

});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options$$1) {

    var self = this || {}, resource = {};

    actions = assign({},
        Resource.actions,
        actions
    );

    each(actions, function (action, name) {

        action = merge({url: url, params: assign({}, params)}, options$$1, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options$$1 = assign({}, action), params = {}, body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options$$1.body = body;
    options$$1.params = assign({}, options$$1.params, params);

    return options$$1;
}

Resource.actions = {

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var this$1 = this;

                return function (executor) { return new Vue.Promise(executor, this$1); };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (plugin);



/***/ }),
/* 63 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(1));

var _vuex = _interopRequireDefault(__webpack_require__(7));

var actions = _interopRequireWildcard(__webpack_require__(65));

var getters = _interopRequireWildcard(__webpack_require__(66));

var mutations = _interopRequireWildcard(__webpack_require__(67));

var _vuexPersistedstate = _interopRequireDefault(__webpack_require__(68));

var _vuexSharedMutations = _interopRequireDefault(__webpack_require__(69));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuex.default); //import getMockData from './mockData';


var _default = new _vuex.default.Store({
  state: {
    user: null,
    tempSrps: {},
    bouquets: [],
    srps: [],
    cart: {
      srpIds: [],
      note: ""
    },
    uniqueCollections: [],
    uniqueTags: []
  },
  getters: getters,
  mutations: mutations,
  actions: actions
  /*plugins: [createPersistedState(), createMutationsSharer({
  	predicate: ['setUser', 'logout', 'addSrpIdToCart', 'removeSrpIdFromCart', 'updateCartNote']  //(mutation, state) => true
  })]*/

});

exports.default = _default;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBouquets = updateBouquets;

var _Bouquets = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateBouquets(_ref) {
  var commit = _ref.commit;
  return new Promise(function (resolve, reject) {
    _Bouquets.default.getBouquets().then(function (bouquets) {
      var newBouquetArray = [];
      var uniqueCollections = [];
      var uniqueTags = [];
      console.log("Got bouquets: " + bouquets);

      for (var i = 0; i < bouquets.length; i++) {
        var bouquet = bouquets[i];
        console.log(bouquet);
        bouquet.id = bouquet.bouquet_id;
        bouquet.tags = bouquet.tags.split(',');
        bouquet.collections = bouquet.collections.split(',');
        bouquet.date_added = new Date(bouquet.date_added);

        if (bouquet.image == '') {
          bouquet.image = '/resource/genericflower.jpg';
        } else {
          bouquet.image = '\\' + bouquet.image;
        }

        for (var j = 0; j < bouquet.collections.length; j++) {
          if (bouquet.collections && bouquet.collections[j].length != 0 && uniqueCollections.indexOf(bouquet.collections[j]) == -1) {
            uniqueCollections.push(bouquet.collections[j]);
          }
        }

        for (var j = 0; j < bouquet.tags.length; j++) {
          if (bouquet.tags && bouquet.tags[j].length != 0 && uniqueTags.indexOf(bouquet.tags[j]) == -1) {
            uniqueTags.push(bouquet.tags[j]);
          }
        }

        newBouquetArray.push(bouquet);
      } //console.log("Unique collections: " + JSON.stringify(uniqueCollections));
      //console.log("Unique tags: " + JSON.stringify(uniqueTags));


      console.log("Commiting newBouquetArray: " + JSON.stringify(newBouquetArray));
      commit('setBouquets', {
        bouquets: bouquets,
        uniqueTags: uniqueTags,
        uniqueCollections: uniqueCollections
      });
      resolve();
    }).catch(function (err) {
      console.log("Error updating bouquets! " + err);
      reject();
    });
  });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cart = exports.bouquets = exports.bouquet = exports.tempSrpKeys = exports.tempSrp = exports.tempSrps = exports.isLoggedIn = exports.getUser = void 0;

var getUser = function getUser(state) {
  return state.user;
};

exports.getUser = getUser;

var isLoggedIn = function isLoggedIn(state) {
  return state.user !== null;
};

exports.isLoggedIn = isLoggedIn;

var tempSrps = function tempSrps(state) {
  return Object.values(state.tempSrps);
};

exports.tempSrps = tempSrps;

var tempSrp = function tempSrp(state) {
  return function (id) {
    return state.tempSrps[id];
  };
};

exports.tempSrp = tempSrp;

var tempSrpKeys = function tempSrpKeys(state) {
  return Object.keys(state.tempSrps);
};

exports.tempSrpKeys = tempSrpKeys;

var bouquet = function bouquet(state) {
  return function (id) {
    for (var i = 0; i < state.bouquets.length; i++) {
      if (state.bouquets[i].id == id) {
        return state.bouquets[i];
      }
    }

    return null;
  };
};

exports.bouquet = bouquet;

var bouquets = function bouquets(state) {
  console.log("Bouquets getter printing state: " + JSON.stringify(state));
  return state.bouquets;
};

exports.bouquets = bouquets;

var cart = function cart(state) {
  return state.cart;
};

exports.cart = cart;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCartNote = exports.setBouquets = exports.removeSrpIdFromCart = exports.addSrpIdToCart = exports.removeTempSrp = exports.addTempSrp = exports.addSrpId = exports.logout = exports.setUser = void 0;

var _vue = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setUser = function setUser(state, user) {
  _vue.default.set(state, 'user', user); //state.user = user;

};

exports.setUser = setUser;

var logout = function logout(state) {
  _vue.default.set(state, 'user', null);
};

exports.logout = logout;

var addSrpId = function addSrpId(state, srpId) {};

exports.addSrpId = addSrpId;
var uid = 0;

var addTempSrp = function addTempSrp(state, deletable) {
  var srpId = uid++;

  _vue.default.set(state.tempSrps, srpId, {
    srp_id: srpId,
    deletable: deletable,
    initialized: false
  });

  return srpId;
};

exports.addTempSrp = addTempSrp;

var removeTempSrp = function removeTempSrp(state, srpId) {
  //delete state.tempSrps[srpId];
  _vue.default.delete(state.tempSrps, srpId);
};

exports.removeTempSrp = removeTempSrp;

var addSrpIdToCart = function addSrpIdToCart(state, bouquetId) {
  _vue.default.set(state.srps[srpId], 'inCart', true); //state.bouquets[bouquetId].inCart = true;	


  state.cart.srpIds.push(srpId);
};

exports.addSrpIdToCart = addSrpIdToCart;

var removeSrpIdFromCart = function removeSrpIdFromCart(state, srpId) {
  _vue.default.set(state.srps[srpId], 'inCart', false);

  for (var i = 0; i < state.cart.srpsIds.length; i++) {
    if (state.cart.srpIds[i] == srpsId) {
      state.cart.srpsIds.splice(i, 1);
      return;
    }
  }
};

exports.removeSrpIdFromCart = removeSrpIdFromCart;

var setBouquets = function setBouquets(state, _ref) {
  var bouquets = _ref.bouquets,
      uniqueTags = _ref.uniqueTags,
      uniqueCollections = _ref.uniqueCollections;

  //console.log("args: " + args);
  //console.log("setBouquets args.uniqueTags: " + args['uniqueTags']);
  _vue.default.set(state, 'bouquets', bouquets);

  _vue.default.set(state, 'uniqueTags', uniqueTags);

  _vue.default.set(state, 'uniqueCollections', uniqueCollections);
};

exports.setBouquets = setBouquets;

var updateCartNote = function updateCartNote(state, text) {
  _vue.default.set(state.cart, 'note', text);
};

exports.updateCartNote = updateCartNote;

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return (clone && isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, optionsArgument)
		: value
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument)
	})
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument)
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument)
	} else {
		return mergeObject(target, source, optionsArgument)
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, optionsArgument)
	}, {})
};

var deepmerge_1 = deepmerge;

var get = function (object, path, def) {
  return (object = (path.split ? path.split('.') : path).reduce(function (obj, p) {
    return obj && obj[p]
  }, object)) === undefined ? def : object;
};

var set = function (object, path, val, obj) {
  return (path = path.split ? path.split('.') : path).slice(0, -1).reduce(function (obj, p) {
    return obj[p] = obj[p] || {};
  }, obj = object)[path.pop()] = val, object;
};

var shvl = {
	get: get,
	set: set
};

var index = function(options, storage, key) {
  options = options || {};
  storage = options.storage || (window && window.localStorage);
  key = options.key || 'vuex';

  function canWriteStorage(storage) {
    try {
      storage.setItem('@@', 1);
      storage.removeItem('@@');
      return true;
    } catch (e) {}

    return false;
  }

  function getState(key, storage, value) {
    try {
      return (value = storage.getItem(key)) && value !== 'undefined'
        ? JSON.parse(value)
        : undefined;
    } catch (err) {}

    return undefined;
  }

  function filter() {
    return true;
  }

  function setState(key, state, storage) {
    return storage.setItem(key, JSON.stringify(state));
  }

  function reducer(state, paths) {
    return paths.length === 0
      ? state
      : paths.reduce(function(substate, path) {
          return shvl.set(substate, path, shvl.get(state, path));
        }, {});
  }

  function subscriber(store) {
    return function(handler) {
      return store.subscribe(handler);
    };
  }

  if (!canWriteStorage(storage)) {
    throw new Error('Invalid storage instance given');
  }

  return function(store) {
    var savedState = shvl.get(options, 'getState', getState)(key, storage);

    if (typeof savedState === 'object' && savedState !== null) {
      store.replaceState(deepmerge_1(store.state, savedState, {
        arrayMerge: function (store, saved) { return saved },
        clone: false,
      }));
    }

    (options.subscriber || subscriber)(store)(function(mutation, state) {
      if ((options.filter || filter)(mutation)) {
        (options.setState || setState)(
          key,
          (options.reducer || reducer)(state, options.paths || []),
          storage
        );
      }
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=vuex-persistedstate.es.js.map


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_SHARING_KEY = 'vuex-mutations-sharer';

exports.default = function (_ref) {
  var predicate = _ref.predicate,
      sharingKey = _ref.sharingKey;
  return function (store) {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error('[vuex-shared-mutations] localStorage is not available. Disabling plugin');
      return;
    }

    if (typeof predicate !== 'function' && !Array.isArray(predicate)) {
      console.error('[vuex-shared-mutations] Predicate should be either array of mutation names or function. Disabling plugin');
      return;
    }

    try {
      window.localStorage.setItem('vuex-mutations-sharer__test', 'test');
      window.localStorage.removeItem('vuex-mutations-sharer__test');
    } catch (e) {
      console.error('[vuex-shared-mutations] Unable to use setItem on localStorage. Disabling plugin');
      return;
    }

    var committing = false;
    var key = sharingKey || DEFAULT_SHARING_KEY;

    var shouldShare = typeof predicate === 'function' ? predicate : function (mutation) {
      return predicate.indexOf(mutation.type) !== -1;
    };

    store.subscribe(function (mutation, state) {
      if (committing) return;
      if (shouldShare(mutation, state)) {
        try {
          window.localStorage.setItem(key, JSON.stringify(mutation));
          window.localStorage.removeItem(key);
        } catch (e) {
          console.error('[vuex-shared-mutations] Unable to use setItem on localStorage');
          console.error(e);
        }
      }
    });

    window.addEventListener('storage', function (event) {
      if (event.newValue === null) return;
      if (event.key !== key) return;

      try {
        var mutation = JSON.parse(event.newValue);
        committing = true;
        store.commit(mutation.type, mutation.payload);
      } catch (error) {
        console.error('[vuex-shared-mutations] Unable to parse shared mutation data');
        console.error(event.newValue, error);
      } finally {
        committing = false;
      }
    });
  };
};

module.exports = exports['default'];


/***/ }),
/* 70 */,
/* 71 */
/***/ (function(module, exports) {

exports.sync = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'route'

  store.registerModule(moduleName, {
    namespaced: true,
    state: cloneRoute(router.currentRoute),
    mutations: {
      'ROUTE_CHANGED': function ROUTE_CHANGED (state, transition) {
        store.state[moduleName] = cloneRoute(transition.to, transition.from)
      }
    }
  })

  var isTimeTraveling = false
  var currentPath

  // sync router on store change
  var storeUnwatch = store.watch(
    function (state) { return state[moduleName]; },
    function (route) {
      var fullPath = route.fullPath;
      if (fullPath === currentPath) {
        return
      }
      if (currentPath != null) {
        isTimeTraveling = true
        router.push(route)
      }
      currentPath = fullPath
    },
    { sync: true }
  )

  // sync store on router navigation
  var afterEachUnHook = router.afterEach(function (to, from) {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    currentPath = to.fullPath
    store.commit(moduleName + '/ROUTE_CHANGED', { to: to, from: from })
  })

  return function unsync () {
    // On unsync, remove router hook
    if (afterEachUnHook != null) {
      afterEachUnHook()
    }

    // On unsync, remove store watch
    if (storeUnwatch != null) {
      storeUnwatch()
    }

    // On unsync, unregister Module with store
    store.unregisterModule(moduleName)
  }
}

function cloneRoute (to, from) {
  var clone = {
    name: to.name,
    path: to.path,
    hash: to.hash,
    query: to.query,
    params: to.params,
    fullPath: to.fullPath,
    meta: to.meta
  }
  if (from) {
    clone.from = cloneRoute(from)
  }
  return Object.freeze(clone)
}



/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VueNotifications = factory();
  }
}(this, function() {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PLUGIN_NAME = 'VueNotifications';
var PACKAGE_NAME = 'vue-notifications';
var PROPERTY_NAME = 'notifications';

var TYPES = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
};

var EVANGELION = 1;

var MESSAGES = {
  alreadyInstalled: PLUGIN_NAME + ': plugin already installed',
  methodNameConflict: PLUGIN_NAME + ': names conflict - '
};

function getVersion(Vue) {
  var version = Vue.version.match(/(\d+)/g);
  return +version[0];
}

function showDefaultMessage(_ref) {
  var type = _ref.type,
      message = _ref.message,
      title = _ref.title;

  var msg = 'Title: ' + title + ', Message: ' + message + ', Type: ' + type;
  if (type === TYPES.error) console.error(msg);else if (type === TYPES.warn) console.warn(msg);else console.log(msg);
}

function getValues(vueApp, config) {
  var result = {};

  Object.keys(config).forEach(function (field) {
    if (field === 'cb') {
      result[field] = config[field].bind(vueApp);
    } else {
      result[field] = typeof config[field] === 'function' ? config[field].call(vueApp) : config[field];
    }
  });

  return result;
}

function showMessage(config, vueApp) {
  var valuesObj = getValues(vueApp, config);
  var isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type];
  var method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : showDefaultMessage;
  method(valuesObj, vueApp);

  if (config.cb) return config.cb();
}

function addMethods(targetObj, typesObj) {
  Object.keys(typesObj).forEach(function (v) {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v];

      return showMessage(config);
    };
  });
}

function setMethod(vueApp, name, options, pluginOptions) {
  if (!options.methods) options.methods = {};

  if (!options.methods[name]) {
    options.methods[name] = makeMethod(vueApp, name, options, pluginOptions);
  }
}

function makeMethod(vueApp, configName, options, pluginOptions) {
  return function (config) {
    var newConfig = Object.assign({}, VueNotifications.config, options[VueNotifications.propertyName][configName], config);

    return showMessage(newConfig, pluginOptions, vueApp);
  };
}

function initVueNotificationPlugin(vueApp, notifications, pluginOptions) {
  if (!notifications) return;
  Object.keys(notifications).forEach(function (name) {
    return setMethod(vueApp, name, vueApp.$options, pluginOptions);
  });
  vueApp.$emit(PACKAGE_NAME + '-initiated');
}

function unlinkVueNotificationPlugin(vueApp, notifications) {
  if (!notifications) return;
  var attachedMethods = vueApp.$options.methods;
  Object.keys(notifications).forEach(function (name) {
    if (attachedMethods[name]) {
      attachedMethods[name] = undefined;
      delete attachedMethods[name];
    }
  });

  vueApp.$emit(PACKAGE_NAME + '-unlinked');
}

function makeMixin(Vue, pluginOptions) {
  var _ref2;

  var init = getVersion(Vue) === EVANGELION ? 'init' : 'beforeCreate';

  return _ref2 = {}, _defineProperty(_ref2, init, function () {
    var notificationsField = this.$options[VueNotifications.propertyName];
    initVueNotificationPlugin(this, notificationsField, pluginOptions);
  }), _defineProperty(_ref2, 'beforeDestroy', function beforeDestroy() {
    var notificationsField = this.$options[VueNotifications.propertyName];
    unlinkVueNotificationPlugin(this, notificationsField);
  }), _ref2;
}

var VueNotifications = {
  types: TYPES,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPES.info,
    timeout: 3000
  },
  pluginOptions: {},
  installed: false,
  install: function install(Vue) {
    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);
    var mixin = makeMixin(Vue, pluginOptions);
    Vue.mixin(mixin);

    this.setPluginOptions(pluginOptions);
    addMethods(this, this.types);

    this.installed = true;
  },
  setPluginOptions: function setPluginOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.pluginOptions = options;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}
return VueNotifications;
}));


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["fadeOut"] = fadeOut;
/* harmony export (immutable) */ __webpack_exports__["flatten"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["makeCss"] = makeCss;
/* harmony export (immutable) */ __webpack_exports__["appendStyles"] = appendStyles;
/* harmony export (immutable) */ __webpack_exports__["makeNode"] = makeNode;
/* harmony export (immutable) */ __webpack_exports__["createIcon"] = createIcon;
/* harmony export (immutable) */ __webpack_exports__["addElem"] = addElem;
/* harmony export (immutable) */ __webpack_exports__["getTypeClass"] = getTypeClass;
function fadeOut (element, cb) {
  if (element.style.opacity && element.style.opacity > 0.05) {
    element.style.opacity = element.style.opacity - 0.05
  } else if (element.style.opacity && element.style.opacity <= 0.1) {
    if (element.parentNode) {
      element.parentNode.removeChild(element)
      if (cb) cb()
    }
  } else {
    element.style.opacity = 0.9
  }
  setTimeout(() => fadeOut.apply(this, [element, cb]), 1000 / 30
  )
}

const LIB_NAME = 'mini-toastr'
/* harmony export (immutable) */ __webpack_exports__["LIB_NAME"] = LIB_NAME;


const ERROR = 'error'
/* harmony export (immutable) */ __webpack_exports__["ERROR"] = ERROR;

const WARN = 'warn'
/* harmony export (immutable) */ __webpack_exports__["WARN"] = WARN;

const SUCCESS = 'success'
/* harmony export (immutable) */ __webpack_exports__["SUCCESS"] = SUCCESS;

const INFO = 'info'
/* harmony export (immutable) */ __webpack_exports__["INFO"] = INFO;

const CONTAINER_CLASS = LIB_NAME
/* harmony export (immutable) */ __webpack_exports__["CONTAINER_CLASS"] = CONTAINER_CLASS;

const NOTIFICATION_CLASS = `${LIB_NAME}__notification`
/* harmony export (immutable) */ __webpack_exports__["NOTIFICATION_CLASS"] = NOTIFICATION_CLASS;

const TITLE_CLASS = `${LIB_NAME}-notification__title`
/* harmony export (immutable) */ __webpack_exports__["TITLE_CLASS"] = TITLE_CLASS;

const ICON_CLASS = `${LIB_NAME}-notification__icon`
/* harmony export (immutable) */ __webpack_exports__["ICON_CLASS"] = ICON_CLASS;

const MESSAGE_CLASS = `${LIB_NAME}-notification__message`
/* harmony export (immutable) */ __webpack_exports__["MESSAGE_CLASS"] = MESSAGE_CLASS;

const ERROR_CLASS = `-${ERROR}`
/* harmony export (immutable) */ __webpack_exports__["ERROR_CLASS"] = ERROR_CLASS;

const WARN_CLASS = `-${WARN}`
/* harmony export (immutable) */ __webpack_exports__["WARN_CLASS"] = WARN_CLASS;

const SUCCESS_CLASS = `-${SUCCESS}`
/* harmony export (immutable) */ __webpack_exports__["SUCCESS_CLASS"] = SUCCESS_CLASS;

const INFO_CLASS = `-${INFO}`
/* harmony export (immutable) */ __webpack_exports__["INFO_CLASS"] = INFO_CLASS;

const DEFAULT_TIMEOUT = 3000
/* harmony export (immutable) */ __webpack_exports__["DEFAULT_TIMEOUT"] = DEFAULT_TIMEOUT;



function flatten (obj, into, prefix) {
  into = into || {}
  prefix = prefix || ''

  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      const prop = obj[k]
      if (prop && typeof prop === 'object' && !(prop instanceof Date || prop instanceof RegExp)) {
        flatten(prop, into, prefix + k + ' ')
      } else {
        if (into[prefix] && typeof into[prefix] === 'object') {
          into[prefix][k] = prop
        } else {
          into[prefix] = {}
          into[prefix][k] = prop
        }
      }
    }
  }

  return into
}

function makeCss (obj) {
  const flat = flatten(obj)
  let str = JSON.stringify(flat, null, 2)
  str = str.replace(/"([^"]*)": {/g, '$1 {')
    .replace(/"([^"]*)"/g, '$1')
    .replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;')
    .replace(/},/g, '}\n')
    .replace(/ &([.:])/g, '$1')

  str = str.substr(1, str.lastIndexOf('}') - 1)

  return str
}

function appendStyles (css) {
  let head = document.head || document.getElementsByTagName('head')[0]
  let styleElem = makeNode('style')
  styleElem.id = `${LIB_NAME}-styles`
  styleElem.type = 'text/css'

  if (styleElem.styleSheet) {
    styleElem.styleSheet.cssText = css
  } else {
    styleElem.appendChild(document.createTextNode(css))
  }

  head.appendChild(styleElem)
}

const config = {
  types: {ERROR, WARN, SUCCESS, INFO},
  animation: fadeOut,
  timeout: DEFAULT_TIMEOUT,
  icons: {},
  appendTarget: document.body,
  node: makeNode(),
  style: {
    [`.${CONTAINER_CLASS}`]: {
      position: 'fixed',
      'z-index': 99999,
      right: '12px',
      top: '12px'
    },
    [`.${NOTIFICATION_CLASS}`]: {
      cursor: 'pointer',
      padding: '12px 18px',
      margin: '0 0 6px 0',
      'background-color': '#000',
      opacity: 0.8,
      color: '#fff',
      'border-radius': '3px',
      'box-shadow': '#3c3b3b 0 0 12px',
      width: '300px',
      [`&.${ERROR_CLASS}`]: {
        'background-color': '#D5122B'
      },
      [`&.${WARN_CLASS}`]: {
        'background-color': '#F5AA1E'
      },
      [`&.${SUCCESS_CLASS}`]: {
        'background-color': '#7AC13E'
      },
      [`&.${INFO_CLASS}`]: {
        'background-color': '#4196E1'
      },
      '&:hover': {
        opacity: 1,
        'box-shadow': '#000 0 0 12px'
      }
    },
    [`.${TITLE_CLASS}`]: {
      'font-weight': '500'
    },
    [`.${MESSAGE_CLASS}`]: {
      display: 'inline-block',
      'vertical-align': 'middle',
      width: '240px',
      padding: '0 12px'
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["config"] = config;


function makeNode (type = 'div') {
  return document.createElement(type)
}

function createIcon (node, type, config) {
  const iconNode = makeNode(config.icons[type].nodeType)
  const attrs = config.icons[type].attrs

  for (const k in attrs) {
    if (attrs.hasOwnProperty(k)) {
      iconNode.setAttribute(k, attrs[k])
    }
  }

  node.appendChild(iconNode)
}

function addElem (node, text, className) {
  const elem = makeNode()
  elem.className = className
  elem.appendChild(document.createTextNode(text))
  node.appendChild(elem)
}

function getTypeClass (type) {
  if (type === SUCCESS) return SUCCESS_CLASS
  if (type === WARN) return WARN_CLASS
  if (type === ERROR) return ERROR_CLASS
  if (type === INFO) return INFO_CLASS

  return ''
}

const miniToastr = {
  config,
  isInitialised: false,
  showMessage (message, title, type, timeout, cb, overrideConf) {
    const config = {}
    Object.assign(config, this.config)
    Object.assign(config, overrideConf)

    const notificationElem = makeNode()
    notificationElem.className = `${NOTIFICATION_CLASS} ${getTypeClass(type)}`

    notificationElem.onclick = function () {
      config.animation(notificationElem, null)
    }

    if (title) addElem(notificationElem, title, TITLE_CLASS)
    if (config.icons[type]) createIcon(notificationElem, type, config)
    if (message) addElem(notificationElem, message, MESSAGE_CLASS)

    config.node.insertBefore(notificationElem, config.node.firstChild)
    setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout
    )

    if (cb) cb()
    return this
  },
  init (aConfig) {
    const newConfig = {}
    Object.assign(newConfig, config)
    Object.assign(newConfig, aConfig)
    this.config = newConfig

    const cssStr = makeCss(newConfig.style)
    appendStyles(cssStr)

    newConfig.node.id = CONTAINER_CLASS
    newConfig.node.className = CONTAINER_CLASS
    newConfig.appendTarget.appendChild(newConfig.node)

    Object.keys(newConfig.types).forEach(v => {
        this[newConfig.types[v]] = function (message, title, timeout, cb, config) {
          this.showMessage(message, title, newConfig.types[v], timeout, cb, config)
          return this
        }.bind(this)
      }
    )

    this.isInitialised = true;

    return this
  },
  setIcon (type, nodeType = 'i', attrs = []) {
    attrs.class = attrs.class ? attrs.class + ' ' + ICON_CLASS : ICON_CLASS

    this.config.icons[type] = {nodeType, attrs}
  }
}

/* harmony default export */ __webpack_exports__["default"] = (miniToastr);

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BouquetPage_vue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1ca5bda9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BouquetPage_vue__ = __webpack_require__(86);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(84)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BouquetPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1ca5bda9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BouquetPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\BouquetPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ca5bda9", Component.options)
  } else {
    hotAPI.reload("data-v-1ca5bda9", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 84 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bouquet__ = __webpack_require__(9);
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    'bouquet': __WEBPACK_IMPORTED_MODULE_0__Bouquet__["a" /* default */]
  },

  data() {
    return {};
  },

  methods: {
    back() {
      this.$router.go(-1);
    }

  },

  created() {
    console.log("Bouquet page loaded.");
  }

});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "root col-9 col-lg-12" },
    [
      _c(
        "a",
        {
          on: {
            click: function($event) {
              _vm.back()
            }
          }
        },
        [_vm._v("Back")]
      ),
      _vm._v(" "),
      _c("bouquet", {
        attrs: { bouquetId: _vm.$route.params.id, viewType: "full" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1ca5bda9", esExports)
  }
}

/***/ }),
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EditableSRP_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8cb21f68_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EditableSRP_vue__ = __webpack_require__(96);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(94)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EditableSRP_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8cb21f68_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EditableSRP_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\components\\Bouquets\\EditableSRP.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8cb21f68", Component.options)
  } else {
    hotAPI.reload("data-v-8cb21f68", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 94 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\css-loader\\lib\\css-base.js'\n    at Error (native)\n    at runLoaders (C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\webpack\\lib\\NormalModule.js:195:19)\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\loader-runner\\lib\\LoaderRunner.js:200:19\n    at C:\\Users\\Brian\\Projects\\Vue\\LaurasWebsiteFromScratch\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)\n    at process._tickCallback (internal/process/next_tick.js:104:9)");

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_picture_input__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    PictureInput: __WEBPACK_IMPORTED_MODULE_0_vue_picture_input__["a" /* default */]
  },
  props: ['new', 'id', 'bouquetId', 'removable'],
  computed: {
    srp() {
      console.log('srp id: ' + this.id);
      var srp = this.$store.getters.tempSrp(this.id);

      if (!srp.initialized) {
        console.log("SRP uninitialized, initializing...");
        srp.bouquet_id = this.bouquetId;
        srp.image = null;
        srp.image_file = null;
        srp.name = '';
        srp.srp = 0;
        srp.stems = 1;
        srp.initialized = true;
      }

      return srp;
    }

  },
  methods: {
    onPictureChange() {
      console.log('New SRP picture selected!');

      if (this.$refs.pictureInput.image) {
        this.srp.image_file = this.$refs.pictureInput.file;
        console.log('Picture loaded.');
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },

    revalidate() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
          return;
        }

        this.srp.valid = false;
      });
    },

    remove() {
      this.$store.commit('removeTempSrp', this.id);
    }

  }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [
    _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "columns" }, [
        _c("div", { staticClass: "column col-6" }, [
          _c("div", { staticClass: "card-header" }, [
            _c("div", { staticClass: "card-subtitle text-gray" }, [
              _c("div", { staticClass: "columns" }, [
                _c("div", { staticClass: "column col-7" }, [
                  _c(
                    "label",
                    { staticClass: "form-label", attrs: { for: "s_name" } },
                    [_vm._v("Name")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.srp.name,
                        expression: "srp.name"
                      }
                    ],
                    staticClass: "form-input",
                    attrs: { type: "text", name: "name", id: "s_name" },
                    domProps: { value: _vm.srp.name },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.srp, "name", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _vm.srp.deletable
                  ? _c("div", { staticClass: "column col-5" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary btn-error",
                          on: {
                            click: function($event) {
                              _vm.remove()
                            }
                          }
                        },
                        [_vm._v("Remove")]
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "columns" }, [
                _c("div", { staticClass: "column col-sm-12 col-8" }, [
                  _c(
                    "label",
                    { staticClass: "form-label", attrs: { for: "s_srp" } },
                    [_vm._v("SRP")]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "input-group" }, [
                    _c("span", { staticClass: "input-group-addon" }, [
                      _vm._v("$")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.srp.srp,
                          expression: "srp.srp"
                        }
                      ],
                      staticClass: "form-input",
                      attrs: {
                        type: "number",
                        min: "0",
                        step: "0.01",
                        name: "srp",
                        id: "s_srp"
                      },
                      domProps: { value: _vm.srp.srp },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.srp, "srp", $event.target.value)
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "p",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.errors.has("srp"),
                          expression: "errors.has('srp')"
                        }
                      ],
                      staticClass: "form-input-hint text-error"
                    },
                    [_vm._v(_vm._s(_vm.errors.first("srp")))]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "column col-sm-12 col-4" }, [
                  _c(
                    "label",
                    { staticClass: "form-label", attrs: { for: "s_stems" } },
                    [_vm._v("Stems")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.srp.stems,
                        expression: "srp.stems"
                      }
                    ],
                    staticClass: "form-input",
                    attrs: {
                      type: "number",
                      step: "1",
                      min: "1",
                      name: "stems",
                      id: "s_stems"
                    },
                    domProps: { value: _vm.srp.stems },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.srp, "stems", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "p",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.errors.has("stems"),
                          expression: "errors.has('stems')"
                        }
                      ],
                      staticClass: "form-input-hint text-error"
                    },
                    [_vm._v(_vm._s(_vm.errors.first("stems")))]
                  )
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "column col-6" },
          [
            _c("picture-input", {
              ref: "pictureInput",
              attrs: {
                width: "200",
                height: "200",
                margin: "16",
                removable: true,
                accept: "image/jpeg,image/png",
                size: "15",
                buttonClass: "btn"
              },
              on: { change: _vm.onPictureChange }
            })
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8cb21f68", esExports)
  }
}

/***/ })
/******/ ]);