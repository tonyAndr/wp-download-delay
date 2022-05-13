/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 184:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// CONCATENATED MODULE: external ["wp","hooks"]
const external_wp_hooks_namespaceObject = window["wp"]["hooks"];
;// CONCATENATED MODULE: external ["wp","element"]
const external_wp_element_namespaceObject = window["wp"]["element"];
;// CONCATENATED MODULE: external ["wp","blockEditor"]
const external_wp_blockEditor_namespaceObject = window["wp"]["blockEditor"];
;// CONCATENATED MODULE: external ["wp","compose"]
const external_wp_compose_namespaceObject = window["wp"]["compose"];
;// CONCATENATED MODULE: external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// CONCATENATED MODULE: ./src/js/block.js
/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */






 //restrict to specific block names

var allowedBlocks = ['core/file'];
/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

function addAttributes(settings) {
  //check if object exists for old Gutenberg version compatibility
  //add allowedBlocks restriction
  if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
    var _fdd_options$delay_ti;

    settings.attributes = Object.assign(settings.attributes, {
      enableDelay: {
        type: 'boolean',
        "default": false
      },
      enableRedirect: {
        type: 'boolean',
        "default": fdd_options.page_redirect === 'true'
      },
      delayTime: {
        type: 'integer',
        "default": (_fdd_options$delay_ti = fdd_options.delay_time) !== null && _fdd_options$delay_ti !== void 0 ? _fdd_options$delay_ti : 10
      }
    });
  }

  return settings;
}
/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */


var withAdvancedControls = (0,external_wp_compose_namespaceObject.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    var name = props.name,
        attributes = props.attributes,
        setAttributes = props.setAttributes,
        isSelected = props.isSelected;
    var enableDelay = attributes.enableDelay,
        enableRedirect = attributes.enableRedirect,
        delayTime = attributes.delayTime;
    return wp.element.createElement(external_wp_element_namespaceObject.Fragment, null, wp.element.createElement(BlockEdit, props), isSelected && allowedBlocks.includes(name) && wp.element.createElement(external_wp_blockEditor_namespaceObject.InspectorControls, null, wp.element.createElement(external_wp_components_namespaceObject.PanelBody, {
      title: (0,external_wp_i18n_namespaceObject.__)('Download Delay Options', 'dload-delay-td'),
      initialOpen: true
    }, wp.element.createElement(external_wp_components_namespaceObject.ToggleControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Enable Download Delay', 'dload-delay-td'),
      checked: !!enableDelay,
      onChange: function onChange() {
        return setAttributes({
          enableDelay: !enableDelay
        });
      },
      help: !!enableDelay ? (0,external_wp_i18n_namespaceObject.__)('Show countdown.', 'dload-delay-td', 'dload-delay-td') : (0,external_wp_i18n_namespaceObject.__)('Download normally.', 'dload-delay-td')
    }), enableDelay && wp.element.createElement(React.Fragment, null, wp.element.createElement(external_wp_components_namespaceObject.ToggleControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Open in new tab', 'dload-delay-td'),
      checked: !!enableRedirect,
      onChange: function onChange() {
        return setAttributes({
          enableRedirect: !enableRedirect
        });
      }
    }), wp.element.createElement(external_wp_components_namespaceObject.__experimentalInputControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delay Time in Seconds', 'dload-delay-td'),
      type: "number",
      value: delayTime,
      onChange: function onChange(newTime) {
        return setAttributes({
          delayTime: Number(newTime)
        });
      }
    })))));
  };
}, 'withAdvancedControls');
/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */

function applyExtraClass(extraProps, blockType, attributes) {
  var enableDelay = attributes.enableDelay,
      enableRedirect = attributes.enableRedirect,
      delayTime = attributes.delayTime; //check if attribute exists for old Gutenberg version compatibility
  //add allowedBlocks restriction

  if (typeof enableDelay !== 'undefined' && enableDelay && allowedBlocks.includes(blockType.name)) {
    extraProps.className = classnames_default()(extraProps.className, 'dloaddelay-link-wrapper');

    if (delayTime) {
      extraProps['data-time'] = delayTime;
      extraProps['data-redirect'] = enableRedirect;
    }
  }

  return extraProps;
} //add filters


(0,external_wp_hooks_namespaceObject.addFilter)('blocks.registerBlockType', 'seocherry/custom-attributes', addAttributes);
(0,external_wp_hooks_namespaceObject.addFilter)('editor.BlockEdit', 'seocherry/custom-advanced-control', withAdvancedControls);
(0,external_wp_hooks_namespaceObject.addFilter)('blocks.getSaveContent.extraProps', 'seocherry/applyExtraClass', applyExtraClass);
})();

/******/ })()
;