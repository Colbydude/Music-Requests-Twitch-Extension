webpackJsonp([2],{

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(32)
/* template */
var __vue_template__ = __webpack_require__(33)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-060a41b1", Component.options)
  } else {
    hotAPI.reload("data-v-060a41b1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["default"]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["default"].Store({
    state: {
        auth: {
            channel_id: null,
            channelname: null,
            client_id: null,
            opaque_user_id: null,
            token: null,
            user_id: null,
            username: null
        }
    },

    getters: {
        isAuthenticated: function isAuthenticated(state) {
            return state.auth.user_id ? true : false;
        }
    },

    mutations: {
        setAuth: function setAuth(state, auth) {
            state.auth = _extends({}, state.auth, auth);
        },
        setAuthUsername: function setAuthUsername(state, username) {
            state.auth.username = username;
        },
        setChannelUsername: function setChannelUsername(state, username) {
            state.auth.channelname = username;
        }
    }
}));

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(191);


/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootstrap_store__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(5);
// Load in our JavaScript dependencies.
__webpack_require__(31);






// Map global objects to Vue.
__WEBPACK_IMPORTED_MODULE_3_vue___default.a.prototype.$http = axios;
__WEBPACK_IMPORTED_MODULE_3_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vuex__["default"]);

// Register components.
__WEBPACK_IMPORTED_MODULE_3_vue___default.a.component('app', __webpack_require__(18));
__WEBPACK_IMPORTED_MODULE_3_vue___default.a.component('request-form', __webpack_require__(192));
__WEBPACK_IMPORTED_MODULE_3_vue___default.a.component('viewer', __webpack_require__(26));

// Create a fresh Vue instance and attach it to the page.
new __WEBPACK_IMPORTED_MODULE_3_vue___default.a({
    el: '#app',
    router: __WEBPACK_IMPORTED_MODULE_2__bootstrap_router__["a" /* default */],
    store: __WEBPACK_IMPORTED_MODULE_1__bootstrap_store__["a" /* default */],
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_0__components_app___default.a);
    }
});

// Setup for Twitch Extension auth stuff.
__webpack_require__(41);

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(193)
/* template */
var __vue_template__ = __webpack_require__(233)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/request-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] request-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afd14f3c", Component.options)
  } else {
    hotAPI.reload("data-v-afd14f3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__urls__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_typeahead__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_typeahead___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_typeahead__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_3_vue_typeahead___default.a,

    mounted: function mounted() {
        this.src = __WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].Ebs + '/artists/' + this.auth.channel_id + '/songs';
    },
    data: function data() {
        return {
            // Type Ahead.
            src: null, // The source url. Updated on setInfo.
            data: {}, // The data that would be sent by request.
            limit: 5, // Limit the number of items which is shown at the list.
            minChars: 3, // The minimum character length needed before triggering.
            selectFirst: false, // Highlight the first item in the list.
            queryParamName: 'search' // Override the default value (`q`) of query parameter name.
        };
    },


    computed: Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["mapState"])(['auth']),

    methods: {
        /**
         * The callback function which is triggered when the user hits on an item
         *
         * @param item
         */
        onHit: function onHit(item) {
            this.requestSong(item.id);
        },


        /**
         * Request the song.
         *
         * @param integer songId
         */
        requestSong: function requestSong(songId) {
            var _this = this;

            axios.post(__WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].Ebs + '/artists/' + this.auth.channel_id + '/requests', {
                song_id: songId,
                twitch_user_id: this.auth.user_id,
                twitch_user_name: this.auth.username
            }).then(function (response) {
                _this.reset();

                swal({
                    title: 'Song Requested!',
                    text: 'The broadcaster will be notified shortly.',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(function () {}, function (dismiss) {
                    //
                });
            }).catch(function (error) {
                if (error.response.status == 401) {
                    return swal('Error.', 'Invalid Token!', 'error');
                }

                return swal('Error.', 'An unexpected error occurred.', 'error');
            });
        }
    }
});

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "form-group has-feedback" },
      [
        _c("label", { attrs: { for: "songsearch" } }, [_vm._v("Song Name:")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.query,
              expression: "query"
            }
          ],
          staticClass: "form-control",
          attrs: {
            type: "text",
            name: "songsearch",
            id: "songsearch",
            placeholder: "Search for a song...",
            autocomplete: "off"
          },
          domProps: { value: _vm.query },
          on: {
            keydown: [
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "down", 40)
                ) {
                  return null
                }
                _vm.down($event)
              },
              function($event) {
                if (!("button" in $event) && _vm._k($event.keyCode, "up", 38)) {
                  return null
                }
                _vm.up($event)
              },
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "enter", 13)
                ) {
                  return null
                }
                _vm.hit($event)
              },
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "esc", 27)
                ) {
                  return null
                }
                _vm.reset($event)
              }
            ],
            input: [
              function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.query = $event.target.value
              },
              _vm.update
            ]
          }
        }),
        _vm._v(" "),
        _vm.loading
          ? _c("span", {
              staticClass: "form-control-feedback fa fa-spinner fa-spin"
            })
          : [
              _c("span", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isEmpty,
                    expression: "isEmpty"
                  }
                ],
                staticClass: "form-control-feedback fa fa-search"
              })
            ]
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
            value: _vm.hasItems,
            expression: "hasItems"
          }
        ],
        staticClass: "list-group request-results"
      },
      _vm._l(_vm.items, function(item, $item) {
        return _c(
          "li",
          {
            class: ["list-group-item", _vm.activeClass($item)],
            on: {
              mousedown: _vm.hit,
              mousemove: function($event) {
                _vm.setActive($item)
              }
            }
          },
          [_vm._v("\n            " + _vm._s(item.name) + "\n        ")]
        )
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-afd14f3c", module.exports)
  }
}

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(35)
/* template */
var __vue_template__ = __webpack_require__(36)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/config.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] config.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-391fb73c", Component.options)
  } else {
    hotAPI.reload("data-v-391fb73c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(37)
/* template */
var __vue_template__ = __webpack_require__(38)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/live-config.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] live-config.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7649ec5a", Component.options)
  } else {
    hotAPI.reload("data-v-7649ec5a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(39)
/* template */
var __vue_template__ = __webpack_require__(40)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/viewer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] viewer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-616feb32", Component.options)
  } else {
    hotAPI.reload("data-v-616feb32", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(52);

// Load in Axios.
window.axios = __webpack_require__(53);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Load in Sweet Alert.
try {
    window.swal = __webpack_require__(54);
} catch (e) {}

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("router-view")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-060a41b1", module.exports)
  }
}

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_live_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_live_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_live_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_viewer__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_viewer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_viewer__);







__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_0_vue_router__["default"]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_vue_router__["default"]({
    routes: [{
        path: '*/config.html',
        name: 'Config',
        component: __WEBPACK_IMPORTED_MODULE_2__components_config___default.a
    }, {
        path: '*/live_config.html',
        name: 'Live Config',
        component: __WEBPACK_IMPORTED_MODULE_3__components_live_config___default.a
    }, {
        path: '*/viewer.html',
        name: 'Viewer',
        component: __WEBPACK_IMPORTED_MODULE_4__components_viewer___default.a
    }],
    mode: 'history'
}));

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__urls__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        __WEBPACK_IMPORTED_MODULE_0__event_bus__["a" /* EventBus */].$on('authentication-verified', this.verifyArtist);
    },


    computed: _extends({
        externalUrl: function externalUrl() {
            return __WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].Ebs.replace('api', '') + this.auth.username + '/requests';
        },
        widgetUrl: function widgetUrl() {
            return __WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].Ebs.replace('api', '') + this.auth.username + '/requests/current';
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["mapState"])(['auth'])),

    methods: {
        /**
         * Creates an artist on our backend.
         *
         * @param string name
         */
        createArtist: function createArtist() {
            var _this = this;

            axios.post(__WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].Ebs + '/artists', {
                twitch_channel_id: this.auth.channel_id,
                name: this.auth.channelname
            }).then(function (response) {
                __WEBPACK_IMPORTED_MODULE_0__event_bus__["a" /* EventBus */].$emit('config-ready', _this.channelId);
            }).catch(function (error) {
                if (error.response.status == 401) {
                    return swal('Error.', 'Invalid Token!', 'error');
                }

                return swal('Error.', 'An unexpected error occurred.', 'error');
            });
        },


        /**
         * Verifies the artist exists on our backend. If it doesn't, call to create it.
         */
        verifyArtist: function verifyArtist() {
            var _this2 = this;

            axios.get(__WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].Ebs + '/artists/' + this.auth.channel_id).then(function (response) {
                __WEBPACK_IMPORTED_MODULE_0__event_bus__["a" /* EventBus */].$emit('config-ready', _this2.channel_id);
            }).catch(function (error) {
                if (error.response.status == 401) {
                    return swal('Error.', 'Invalid Token!', 'error');
                }

                if (error.response.status == 404) {
                    return _this2.createArtist();
                }

                return swal('Error.', 'An unexpected error occurred.', 'error');
            });
        }
    }
});

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-6" }, [_c("request-list")], 1),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-6" },
        [_c("add-song-form"), _vm._v(" "), _c("song-list")],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-6" }, [
        _c("h3", [_vm._v("Current Request Widget")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "You can add an automatically updating current request widget to your stream layout by adding a new BrowserSource plugin and setting the URL to the URL below and customizing the CSS to your liking."
          )
        ]),
        _vm._v(" "),
        _c("p", [_c("code", [_vm._v(_vm._s(_vm.widgetUrl))])])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6" }, [
        _c("h3", [_vm._v("Requesting Songs Externally")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "Twitch Extensions are currently not available on all platforms. Until they are, viewers can visit the link below to requests songs on an external site. This is particularly useful for mobile users."
          )
        ]),
        _vm._v(" "),
        _c("p", [_c("code", [_vm._v(_vm._s(_vm.externalUrl))])])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-391fb73c", module.exports)
  }
}

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("request-list", { attrs: { "is-dashboard": true } })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7649ec5a", module.exports)
  }
}

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['isAuthenticated'])
});

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticStyle: { height: "100%" } }, [
    _vm.isAuthenticated
      ? _c("div", [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "modal fade",
              attrs: {
                id: "request-modal",
                tabindex: "-1",
                role: "dialog",
                "aria-labelledby": "request-modal-label"
              }
            },
            [
              _c(
                "div",
                { staticClass: "modal-dialog", attrs: { role: "document" } },
                [
                  _c("div", { staticClass: "modal-content" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("div", { staticClass: "modal-body" }, [
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [_c("request-form")],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _vm._m(2)
                  ])
                ]
              )
            ]
          )
        ])
      : _c("div", [_vm._m(3)])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-primary",
        attrs: {
          type: "button",
          "data-toggle": "modal",
          "data-target": "#request-modal"
        }
      },
      [_c("span", { staticClass: "fa fa-music" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
      _vm._v(" "),
      _c(
        "h4",
        { staticClass: "modal-title", attrs: { id: "request-modal-label" } },
        [_vm._v("Request A Song!")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-default",
          attrs: { type: "button", "data-dismiss": "modal" }
        },
        [_vm._v("Cancel")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "access-tooltip tooltip top", attrs: { role: "tooltip" } },
      [
        _c("div", { staticClass: "tooltip-arrow" }),
        _vm._v(" "),
        _c("div", { staticClass: "tooltip-inner" }, [
          _vm._v(" Grant access in "),
          _c("span", { staticClass: "fa fa-puzzle-piece" }),
          _vm._v(" to make requests!")
        ])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-616feb32", module.exports)
  }
}

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__urls__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(19);




// Twitch JS Helper stuff...
if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function (auth) {
        var parts = auth.token.split(".");
        var payload = JSON.parse(window.atob(parts[1]));
        //console.log({payload, auth});

        if (payload.user_id) {
            // User has granted permissions.
            // NOTE: User needs to grant permissions in order to submit requests.
            __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('setAuth', {
                channel_id: payload.channel_id,
                client_id: auth.clientId,
                opaque_user_id: payload.opaque_user_id,
                token: auth.token,
                user_id: payload.user_id
            });

            // Fetch the username from the Twitch API via the user_id.
            axios.create({
                headers: { 'Client-ID': auth.clientId }
            }).get(__WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].TwitchApi + '/helix/users?id=' + payload.user_id).then(function (response) {
                __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('setAuthUsername', response.data.data[0].display_name);
            }).catch(function (error) {
                if (error.response.status == 401) {
                    return swal('Error.', 'Invalid Token!', 'error');
                }

                return swal('Error.', 'An unexpected error occurred.', 'error');
            });
        } else {
            // User has not granted permissions.
            __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('setAuth', {
                channel_id: payload.channel_id,
                client_id: auth.clientId,
                opaque_user_id: payload.opaque_user_id,
                token: auth.token
            });
        }

        // Set the token to be used in the header of all axios requests.
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;

        // Initialize the components.
        __WEBPACK_IMPORTED_MODULE_0__event_bus__["a" /* EventBus */].$emit('authentication-verified');

        // Fetch the channel's username from the Twitch API via the channel_id.
        axios.create({
            headers: { 'Client-ID': auth.clientId }
        }).get(__WEBPACK_IMPORTED_MODULE_1__urls__["a" /* Urls */].TwitchApi + '/helix/users?id=' + payload.channel_id).then(function (response) {
            __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('setChannelUsername', response.data.data[0].display_name);
        }).catch(function (error) {
            if (error.response.status == 401) {
                return swal('Error.', 'Invalid Token!', 'error');
            }

            return swal('Error.', 'An unexpected error occurred.', 'error');
        });
    });

    window.Twitch.ext.onContext(function (context, contextFields) {
        //console.log(context);
        //console.log(contextFields);
    });

    window.Twitch.ext.onError(function (err) {
        //console.error(err);
    });
}

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventBus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var EventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a();

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Urls; });
var Urls = {
    Ebs: "https://twitch.colbydude.com/api",
    TwitchApi: "https://api.twitch.tv"
};

/***/ })

},[190]);