/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/* eslint-disable camelcase */\n\n/**\n * WordPress dependencies\n */\nvar __ = wp.i18n.__;\nvar _wp$components = wp.components,\n    BaseControl = _wp$components.BaseControl,\n    Button = _wp$components.Button,\n    ExternalLink = _wp$components.ExternalLink,\n    PanelBody = _wp$components.PanelBody,\n    PanelRow = _wp$components.PanelRow,\n    Placeholder = _wp$components.Placeholder,\n    Spinner = _wp$components.Spinner,\n    Flex = _wp$components.Flex,\n    FlexItem = _wp$components.FlexItem,\n    FlexBlock = _wp$components.FlexBlock,\n    TextareaControl = _wp$components.TextareaControl,\n    FormTokenField = _wp$components.FormTokenField;\nvar _wp$element = wp.element,\n    render = _wp$element.render,\n    Component = _wp$element.Component,\n    Fragment = _wp$element.Fragment;\n/**\n * Internal dependencies\n */\n\n\n\nvar App = /*#__PURE__*/function (_Component) {\n  _inherits(App, _Component);\n\n  var _super = _createSuper(App);\n\n  function App() {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _super.apply(this, arguments);\n    _this.changeOptions = _this.changeOptions.bind(_assertThisInitialized(_this));\n    _this.state = {\n      isAPILoaded: false,\n      isAPISaving: false,\n      dload_delay_time: false,\n      dload_delay_template: '',\n      dload_delay_extensions: []\n    };\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      wp.api.loadPromise.then(function () {\n        _this2.settings = new wp.api.models.Settings();\n\n        if (false === _this2.state.isAPILoaded) {\n          _this2.settings.fetch().then(function (response) {\n            _this2.setState({\n              dload_delay_time: parseInt(response.dload_delay_time),\n              dload_delay_template: response.dload_delay_template,\n              dload_delay_extensions: response.dload_delay_extensions,\n              isAPILoaded: true\n            });\n          });\n        }\n      });\n    }\n  }, {\n    key: \"changeOptions\",\n    value: function changeOptions() {\n      var _this3 = this;\n\n      this.setState({\n        isAPISaving: true\n      }); // const model = new wp.api.models.Settings({\n      //     // eslint-disable-next-line camelcase\n      //     [option]: value\n      // });\n\n      var model = new wp.api.models.Settings(this.state);\n      model.save().then(function (response) {\n        _this3.setState({\n          dload_delay_extensions: response[\"dload_delay_extensions\"],\n          dload_delay_time: response[\"dload_delay_time\"],\n          dload_delay_template: response[\"dload_delay_template\"],\n          isAPISaving: false\n        });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this4 = this;\n\n      if (!this.state.isAPILoaded) {\n        return wp.element.createElement(Flex, {\n          justify: \"center\"\n        }, wp.element.createElement(FlexItem, null, __('Loading UI...')), wp.element.createElement(FlexItem, null, wp.element.createElement(Spinner, null)));\n      }\n\n      return wp.element.createElement(Fragment, null, wp.element.createElement(\"div\", {\n        className: \"codeinwp-header\"\n      }, wp.element.createElement(\"div\", {\n        className: \"codeinwp-container\"\n      }, wp.element.createElement(\"div\", {\n        className: \"codeinwp-logo\"\n      }, wp.element.createElement(\"h1\", null, __('Download Delay Options'))))), wp.element.createElement(\"div\", {\n        className: \"codeinwp-main\"\n      }, wp.element.createElement(PanelBody, null, wp.element.createElement(\"h2\", null, __('Display settings')), wp.element.createElement(PanelRow, null, wp.element.createElement(BaseControl, {\n        label: __('Delay time'),\n        help: 'Specify time in seconds for download delay',\n        id: \"codeinwp-options-google-analytics-api\",\n        className: \"codeinwp-text-field\"\n      }, wp.element.createElement(\"input\", {\n        type: \"number\",\n        id: \"codeinwp-options-google-analytics-api\",\n        value: this.state.dload_delay_time,\n        placeholder: __('Time in seconds'),\n        disabled: this.state.isAPISaving,\n        onChange: function onChange(e) {\n          return _this4.setState({\n            dload_delay_time: e.target.value\n          });\n        }\n      }))), wp.element.createElement(PanelRow, null, wp.element.createElement(BaseControl, {\n        label: __('HTML Template'),\n        help: __('Your beautiful html template code'),\n        id: \"dd-template-control\",\n        className: \"codeinwp-text-field\"\n      }, wp.element.createElement(TextareaControl, {\n        id: \"dd-template-control\",\n        rows: \"10\",\n        disabled: this.state.isAPISaving,\n        value: this.state.dload_delay_template,\n        onChange: function onChange(value) {\n          return _this4.setState({\n            dload_delay_template: value\n          });\n        }\n      }))), wp.element.createElement(PanelRow, null, wp.element.createElement(FormTokenField, {\n        label: __('Files extensions'),\n        id: \"dd-extensions-control\",\n        value: this.state.dload_delay_extensions,\n        suggestions: ['one', 'two'],\n        disabled: this.state.isAPISaving,\n        onChange: function onChange(extensions) {\n          return _this4.setState({\n            dload_delay_extensions: extensions\n          });\n        }\n      })), wp.element.createElement(PanelRow, null, wp.element.createElement(\"div\", {\n        className: \"codeinwp-text-field-button-group\"\n      }, wp.element.createElement(Button, {\n        isPrimary: true,\n        isLarge: true,\n        disabled: this.state.isAPISaving,\n        onClick: function onClick() {\n          return _this4.changeOptions();\n        }\n      }, __('Save'))))), wp.element.createElement(PanelBody, null, wp.element.createElement(\"div\", {\n        className: \"codeinwp-info\"\n      }, wp.element.createElement(\"h2\", null, __('Got a question for us?')), wp.element.createElement(\"p\", null, __('We would love to help you out if you need any help.')), wp.element.createElement(\"div\", {\n        className: \"codeinwp-info-button-group\"\n      }, wp.element.createElement(Button, {\n        isSecondary: true,\n        isLarge: true,\n        target: \"_blank\",\n        href: \"#\"\n      }, __('Ask a question')), wp.element.createElement(Button, {\n        isSecondary: true,\n        isLarge: true,\n        target: \"_blank\",\n        href: \"#\"\n      }, __('Leave a review')))))));\n    }\n  }]);\n\n  return App;\n}(Component);\n\nrender(wp.element.createElement(App, null), document.getElementById('seocherry-dload-delay-container'));\n\n//# sourceURL=webpack://download-delay-wp/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://download-delay-wp/./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;