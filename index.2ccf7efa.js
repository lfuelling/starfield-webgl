// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1tdpO":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "c2e208c92ccf7efa";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"h7u1C":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DEFAULT_STARFIELD_OPTIONS", {
    enumerable: true,
    get: function() {
        return _starfield.DEFAULT_STARFIELD_OPTIONS;
    }
});
Object.defineProperty(exports, "drawFrame", {
    enumerable: true,
    get: function() {
        return _starfield.drawFrame;
    }
});
Object.defineProperty(exports, "generateCanvas", {
    enumerable: true,
    get: function() {
        return _starfield.generateCanvas;
    }
});
Object.defineProperty(exports, "generateStars", {
    enumerable: true,
    get: function() {
        return _starfield.generateStars;
    }
});
Object.defineProperty(exports, "initBuffers", {
    enumerable: true,
    get: function() {
        return _starfield.initBuffers;
    }
});
Object.defineProperty(exports, "runStarfield", {
    enumerable: true,
    get: function() {
        return _starfield.runStarfield;
    }
});
var _starfield = require("7603598156a1210b");

},{"7603598156a1210b":"cFnNY"}],"cFnNY":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DEFAULT_STARFIELD_OPTIONS", {
    enumerable: true,
    get: function() {
        return _utils.DEFAULT_STARFIELD_OPTIONS;
    }
});
Object.defineProperty(exports, "drawFrame", {
    enumerable: true,
    get: function() {
        return _drawFrame.drawFrame;
    }
});
Object.defineProperty(exports, "generateCanvas", {
    enumerable: true,
    get: function() {
        return _canvas.generateCanvas;
    }
});
Object.defineProperty(exports, "generateStars", {
    enumerable: true,
    get: function() {
        return _generateStars.generateStars;
    }
});
Object.defineProperty(exports, "initBuffers", {
    enumerable: true,
    get: function() {
        return _initBuffers.initBuffers;
    }
});
Object.defineProperty(exports, "runStarfield", {
    enumerable: true,
    get: function() {
        return _runStarfield.runStarfield;
    }
});
var _utils = require("957a5306926f35c5");
var _runStarfield = require("82be8f7354c5e745");
var _canvas = require("c0c2fa42627771aa");
var _generateStars = require("c2a8b6a02a6e278e");
var _initBuffers = require("4f0cceb0a1087d66");
var _drawFrame = require("bde35ee4cb8d114f");

},{"957a5306926f35c5":"8X9yv","82be8f7354c5e745":"5fotq","c0c2fa42627771aa":"4VYxC","c2a8b6a02a6e278e":"kI7RN","4f0cceb0a1087d66":"3YhxT","bde35ee4cb8d114f":"j37ij"}],"8X9yv":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normalize = exports.MOVEMENT_Y = exports.MOVEMENT_X = exports.DEFAULT_STARFIELD_OPTIONS = exports.COORDINATE_LENGTH = void 0;
const COORDINATE_LENGTH = 5000;
exports.COORDINATE_LENGTH = COORDINATE_LENGTH;
const MOVEMENT_X = 0.12;
exports.MOVEMENT_X = MOVEMENT_X;
const MOVEMENT_Y = 0.04;
exports.MOVEMENT_Y = MOVEMENT_Y;
const DEFAULT_STARFIELD_OPTIONS = {
    starDensity: 1.0,
    mouseScale: 1.0,
    seedMovement: true,
    fpsLimit: 30,
    antialiasing: true
};
exports.DEFAULT_STARFIELD_OPTIONS = DEFAULT_STARFIELD_OPTIONS;
const normalize = function(x, min, max) {
    let a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    let b = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    const part1 = b - a;
    const part2a = x - min;
    const part2b = max - min;
    const part2 = part2a / part2b;
    return part1 * part2 + a;
};
exports.normalize = normalize;

},{}],"5fotq":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runStarfield = void 0;
var _canvas = require("9bca18bb2292782a");
var _drawFrame = require("75990ec44cdffa5e");
var _initBuffers = require("3aa4926bc4826be2");
var _utils = require("d351b995e1f7c470");
var _generateStars = require("51e242c1e679e2c4");
const runStarfield = (options)=>{
    // init settings
    const settings = {
        ..._utils.DEFAULT_STARFIELD_OPTIONS,
        ...options
    };
    // generate canvas element
    const canvas = (0, _canvas.generateCanvas)();
    // init buffers
    const buffers = (0, _initBuffers.initBuffers)(canvas, settings);
    // init time and stars
    let time = Date.now();
    let stars = (0, _generateStars.generateStars)(settings, canvas.clientHeight, canvas.clientWidth);
    let previous = 0;
    function shouldSkipFrame(delta) {
        return delta < 1000 / (settings.fpsLimit + 1);
    }
    // define animation loop
    const animLoop = ()=>{
        requestAnimationFrame((current)=>{
            const delta = current - previous;
            if (!shouldSkipFrame(delta)) {
                typeof settings.onBeforeDraw === "function" && settings.onBeforeDraw();
                previous = current;
                // move stars
                stars.forEach((s)=>s.move(time));
                time = Date.now();
                // draw frame
                (0, _drawFrame.drawFrame)(stars, buffers);
                typeof settings.onAfterDraw === "function" && settings.onAfterDraw();
            }
            animLoop();
        });
    };
    // run animation loop
    animLoop();
};
exports.runStarfield = runStarfield;

},{"9bca18bb2292782a":"4VYxC","75990ec44cdffa5e":"j37ij","3aa4926bc4826be2":"3YhxT","d351b995e1f7c470":"8X9yv","51e242c1e679e2c4":"kI7RN"}],"4VYxC":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _clearCanvas = require("9d8272d091cb7149");
Object.keys(_clearCanvas).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _clearCanvas[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _clearCanvas[key];
        }
    });
});
var _generateCanvas = require("231f1b757a371ce4");
Object.keys(_generateCanvas).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _generateCanvas[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _generateCanvas[key];
        }
    });
});

},{"9d8272d091cb7149":"9Rpef","231f1b757a371ce4":"lchNM"}],"9Rpef":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearCanvas = void 0;
const clearCanvas = (gl)=>{
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};
exports.clearCanvas = clearCanvas;

},{}],"lchNM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateCanvas = void 0;
const blackPixelPng = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAACklEQVR4AWNmAAAACAAEbVhFewAAAABJRU5ErkJggg==')";
const generateCanvas = ()=>{
    const starfieldElem = document.getElementById("starfield");
    if (starfieldElem) return starfieldElem;
    const body = document.querySelector("body");
    const canvas = document.createElement("canvas");
    canvas.id = "starfield";
    const styleProps = {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        "z-index": -10,
        backgroundImage: blackPixelPng
    };
    const attrProps = {
        width: body.clientWidth,
        height: body.clientHeight
    };
    for(const prop in styleProps)// @ts-ignore it works (:
    canvas.style[prop] = styleProps[prop];
    for(let prop in attrProps)// @ts-ignore it works (:
    canvas.setAttribute(prop, attrProps[prop]);
    body.appendChild(canvas);
    return canvas;
};
exports.generateCanvas = generateCanvas;

},{}],"j37ij":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawFrame = void 0;
var _canvas = require("9171d575a38e16a1");
var _drawStar = require("23422da7c09405b0");
const drawFrame = (stars, buffers)=>{
    (0, _canvas.clearCanvas)(buffers.gl);
    stars.map((s)=>s.getVertex()).forEach((s)=>(0, _drawStar.drawStar)(s, buffers));
};
exports.drawFrame = drawFrame;

},{"9171d575a38e16a1":"4VYxC","23422da7c09405b0":"8iQd8"}],"8iQd8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawStar = void 0;
const drawStar = (star, buffers)=>{
    const { gl, positionAttribute, colorAttribute, vertexBuffer, indexBuffer, indexArray } = buffers;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(star), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(colorAttribute);
    gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 24, 8);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
    gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
};
exports.drawStar = drawStar;

},{}],"3YhxT":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBuffers = void 0;
var _initGLContext = require("ca0a04d6202bc97");
const initBuffers = (canvas, settings)=>{
    const { gl, positionAttribute, colorAttribute } = (0, _initGLContext.initGLContext)(canvas, settings);
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const indexArray = [
        0,
        2,
        3,
        0,
        3,
        1
    ];
    return {
        gl,
        vertexBuffer,
        indexBuffer,
        indexArray,
        colorAttribute,
        positionAttribute
    };
};
exports.initBuffers = initBuffers;

},{"ca0a04d6202bc97":"fFrGt"}],"fFrGt":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initGLContext = void 0;
var _shaders = require("491ca2176c0dcbba");
const initGLContext = (canvas, options)=>{
    const gl = canvas.getContext("webgl2", {
        antialias: options.antialiasing
    });
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, _shaders.vertexShaderSource);
    gl.shaderSource(fragmentShader, _shaders.fragmentShaderSource);
    gl.compileShader(vertexShader);
    let success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (!success) throw new Error(gl.getShaderInfoLog(vertexShader));
    gl.compileShader(fragmentShader);
    success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!success) throw new Error(gl.getShaderInfoLog(fragmentShader));
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const positionAttribute = gl.getAttribLocation(program, "position");
    const colorAttribute = gl.getAttribLocation(program, "color");
    gl.viewport(0, 0, width, height);
    const positionVAO = gl.createVertexArray();
    gl.bindVertexArray(positionVAO);
    return {
        gl,
        positionAttribute,
        colorAttribute
    };
};
exports.initGLContext = initGLContext;

},{"491ca2176c0dcbba":"9NZMF"}],"9NZMF":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vertexShaderSource = exports.fragmentShaderSource = void 0;
var _vertexShader = _interopRequireDefault(require("668a4fd379754626"));
var _fragmentShader = _interopRequireDefault(require("54675f9b658dda69"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const vertexShaderSource = _vertexShader.default;
exports.vertexShaderSource = vertexShaderSource;
const fragmentShaderSource = _fragmentShader.default;
exports.fragmentShaderSource = fragmentShaderSource;

},{"668a4fd379754626":"lIVAe","54675f9b658dda69":"haXfu"}],"lIVAe":[function(require,module,exports) {
"use strict";
module.exports = "#version 300 es\n#define GLSLIFY 1\n\nin vec3 position;\nin vec4 color;\n\nout vec4 in_color;\n\nvoid main() {\n  gl_Position = vec4(position, 1.0);\n\n  in_color = color;\n}\n";

},{}],"haXfu":[function(require,module,exports) {
"use strict";
module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec4 in_color;\n\nout vec4 color;\n\nvoid main() {\n    color = in_color;\n}\n";

},{}],"kI7RN":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateStars = void 0;
var _getRandomStar = require("3f45d71389c67e07");
const generateStars = (options, height, width)=>{
    const stars = [];
    const totalPixels = width * height;
    const starRatio = 0.002 * options.starDensity;
    const numStars = Math.floor(totalPixels * starRatio);
    for(let i = 0; i < numStars; i++)stars.push((0, _getRandomStar.getRandomStar)());
    return stars;
};
exports.generateStars = generateStars;

},{"3f45d71389c67e07":"k8tve"}],"k8tve":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandomStar = void 0;
var _types = require("68936fba23289b03");
var _random = require("7984f381e061049d");
var _utils = require("61bc8e9f33931b22");
/**
 * Generates all random values to create a random star
 * @return {Star} a star with random X/Y, size and color
 */ const getRandomStar = ()=>new _types.Star((0, _random.getRandom)(1, _utils.COORDINATE_LENGTH), (0, _random.getRandom)(1, _utils.COORDINATE_LENGTH), (0, _random.getRandom)(1, 4), (0, _random.getWeightedRandomSize)(), (0, _random.applyRandomShade)((0, _random.getWeightedRandomColor)()));
exports.getRandomStar = getRandomStar;

},{"68936fba23289b03":"lPf9m","7984f381e061049d":"bqhTu","61bc8e9f33931b22":"8X9yv"}],"lPf9m":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _Star = require("dcad8f76237d6389");
Object.keys(_Star).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _Star[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _Star[key];
        }
    });
});
var _Color = require("73c9180f89d8a637");
Object.keys(_Color).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _Color[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _Color[key];
        }
    });
});
var _StarfieldBuffers = require("f621607749294315");
Object.keys(_StarfieldBuffers).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _StarfieldBuffers[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _StarfieldBuffers[key];
        }
    });
});
var _StarfieldOptions = require("4c503b1639467b9b");
Object.keys(_StarfieldOptions).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _StarfieldOptions[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _StarfieldOptions[key];
        }
    });
});

},{"dcad8f76237d6389":"cWwoi","73c9180f89d8a637":"4GCKz","f621607749294315":"69cIR","4c503b1639467b9b":"axpZK"}],"cWwoi":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Star = void 0;
var _utils = require("9c311f44a8a45955");
class Star {
    constructor(x, y, z, size, color){
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.color = color;
    }
    move(deltaT) {
        const speed = 50 / this.z;
        const timeDeltaMillis = Date.now() - deltaT;
        const timeDeltaSecs = timeDeltaMillis / 1000;
        const distance = speed * timeDeltaSecs;
        let newX = this.x - distance * _utils.MOVEMENT_X;
        let newY = this.y - distance * _utils.MOVEMENT_Y;
        if (newX < 0) newX += _utils.COORDINATE_LENGTH;
        else if (newX > _utils.COORDINATE_LENGTH) newX -= _utils.COORDINATE_LENGTH;
        if (newY < 0) newY += _utils.COORDINATE_LENGTH;
        else if (newY > _utils.COORDINATE_LENGTH) newY -= _utils.COORDINATE_LENGTH;
        this.x = newX;
        this.y = newY;
    }
    getVertex() {
        const xZero = (0, _utils.normalize)(this.x, 0, 5000);
        const yZero = (0, _utils.normalize)(this.y, 0, 5000);
        let normalizedSize = (0, _utils.normalize)(this.size, 0, 5000, 0);
        const xOne = xZero < 0 ? xZero - normalizedSize : xZero + normalizedSize;
        const yOne = yZero < 0 ? yZero - normalizedSize : yZero + normalizedSize;
        const color = {
            r: (0, _utils.normalize)(this.color.r, 0, 255, 0),
            g: (0, _utils.normalize)(this.color.g, 0, 255, 0),
            b: (0, _utils.normalize)(this.color.b, 0, 255, 0)
        };
        return [
            xOne,
            yOne,
            color.r,
            color.g,
            color.b,
            1,
            xZero,
            yOne,
            color.r,
            color.g,
            color.b,
            1,
            xOne,
            yZero,
            color.r,
            color.g,
            color.b,
            1,
            xZero,
            yZero,
            color.r,
            color.g,
            color.b,
            1
        ];
    }
}
exports.Star = Star;

},{"9c311f44a8a45955":"8X9yv"}],"4GCKz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Color = void 0;
class Color {
    constructor(r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
exports.Color = Color;

},{}],"69cIR":[function(require,module,exports) {
"use strict";

},{}],"axpZK":[function(require,module,exports) {
"use strict";

},{}],"bqhTu":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _applyRandomShade = require("7ad995b696c56b52");
Object.keys(_applyRandomShade).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _applyRandomShade[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _applyRandomShade[key];
        }
    });
});
var _getRandom = require("95795932b2cd5672");
Object.keys(_getRandom).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _getRandom[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _getRandom[key];
        }
    });
});
var _getRandomShade = require("70593a3ae1486d4e");
Object.keys(_getRandomShade).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _getRandomShade[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _getRandomShade[key];
        }
    });
});
var _getWeightedRandom = require("de0007242647aa00");
Object.keys(_getWeightedRandom).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _getWeightedRandom[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _getWeightedRandom[key];
        }
    });
});
var _getWeightedRandomColor = require("48d26bbe1d25fcb3");
Object.keys(_getWeightedRandomColor).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _getWeightedRandomColor[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _getWeightedRandomColor[key];
        }
    });
});
var _getWeightedRandomSize = require("a1e15ac220913eaf");
Object.keys(_getWeightedRandomSize).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _getWeightedRandomSize[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _getWeightedRandomSize[key];
        }
    });
});

},{"7ad995b696c56b52":"8LCsp","95795932b2cd5672":"hFaH3","70593a3ae1486d4e":"e8p9Z","de0007242647aa00":"kAg1X","48d26bbe1d25fcb3":"7oRHe","a1e15ac220913eaf":"jVtCi"}],"8LCsp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyRandomShade = void 0;
var _getRandomShade = require("dafa16f4304a7074");
const applyRandomShade = (color)=>{
    const shade = (0, _getRandomShade.getRandomShade)();
    if (shade !== 1) {
        // skip processing full brightness stars
        color.r = Math.floor(color.r * shade);
        color.g = Math.floor(color.g * shade);
        color.b = Math.floor(color.b * shade);
    }
    return color;
};
exports.applyRandomShade = applyRandomShade;

},{"dafa16f4304a7074":"e8p9Z"}],"e8p9Z":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandomShade = void 0;
var _getWeightedRandom = require("19d592cb9b70232");
const getRandomShade = ()=>{
    const list = [
        0.4,
        0.6,
        1
    ];
    const weight = [
        0.5,
        0.3,
        0.2
    ];
    return (0, _getWeightedRandom.getWeightedRandom)(list, weight);
};
exports.getRandomShade = getRandomShade;

},{"19d592cb9b70232":"kAg1X"}],"kAg1X":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWeightedRandom = void 0;
// http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
const getWeightedRandom = (list, weight)=>{
    const rand = function(min, max) {
        return Math.random() * (max - min) + min;
    };
    const total_weight = weight.reduce(function(prev, cur) {
        return prev + cur;
    });
    const random_num = rand(0, total_weight);
    let weight_sum = 0;
    for(let i = 0; i < list.length; i++){
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
        if (random_num <= weight_sum) return list[i];
    }
    return list[rand(0, list.length)];
};
exports.getWeightedRandom = getWeightedRandom;

},{}],"hFaH3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandom = void 0;
const getRandom = (min, max)=>Math.floor(Math.random() * (max + min));
exports.getRandom = getRandom;

},{}],"7oRHe":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWeightedRandomColor = void 0;
var _types = require("c00431fb529fdfc6");
var _getWeightedRandom = require("434b1fe4ea6a2f58");
const getWeightedRandomColor = ()=>{
    const list = [
        new _types.Color(255, 189, 111),
        new _types.Color(255, 221, 180),
        new _types.Color(255, 244, 232),
        new _types.Color(251, 248, 255),
        new _types.Color(202, 216, 255),
        new _types.Color(170, 191, 255),
        new _types.Color(155, 176, 255)
    ];
    const weight = [
        0.05,
        0.05,
        0.05,
        0.7,
        0.05,
        0.05,
        0.05
    ];
    return (0, _getWeightedRandom.getWeightedRandom)(list, weight);
};
exports.getWeightedRandomColor = getWeightedRandomColor;

},{"c00431fb529fdfc6":"lPf9m","434b1fe4ea6a2f58":"kAg1X"}],"jVtCi":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWeightedRandomSize = void 0;
var _getWeightedRandom = require("30734ac3074eaa9");
const getWeightedRandomSize = ()=>{
    const list = [
        12,
        15,
        18
    ];
    const weight = [
        0.8,
        0.15,
        0.05
    ];
    return (0, _getWeightedRandom.getWeightedRandom)(list, weight);
};
exports.getWeightedRandomSize = getWeightedRandomSize;

},{"30734ac3074eaa9":"kAg1X"}]},["1tdpO"], null, "parcelRequirea2fa")

//# sourceMappingURL=index.2ccf7efa.js.map
