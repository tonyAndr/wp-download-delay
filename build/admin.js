/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint-disable camelcase */

/**
 * WordPress dependencies
 */
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    sprintf = _wp$i18n.sprintf;
var _wp$components = wp.components,
    BaseControl = _wp$components.BaseControl,
    Button = _wp$components.Button,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    Spinner = _wp$components.Spinner,
    Flex = _wp$components.Flex,
    FlexItem = _wp$components.FlexItem,
    FlexBlock = _wp$components.FlexBlock,
    RangeControl = _wp$components.RangeControl,
    ToggleControl = _wp$components.ToggleControl,
    TextareaControl = _wp$components.TextareaControl,
    FormTokenField = _wp$components.FormTokenField,
    __experimentalRadio = _wp$components.__experimentalRadio,
    __experimentalRadioGroup = _wp$components.__experimentalRadioGroup,
    ColorPalette = _wp$components.ColorPalette,
    ColorIndicator = _wp$components.ColorIndicator,
    TextControl = _wp$components.TextControl,
    TabPanel = _wp$components.TabPanel;
var Radio = __experimentalRadio,
    RadioGroup = __experimentalRadioGroup;
var _wp$element = wp.element,
    render = _wp$element.render,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var colors = [{
  name: 'red',
  color: '#f00'
}, {
  name: 'white',
  color: '#fff'
}, {
  name: 'blue',
  color: '#00f'
}];
/**
 * Internal dependencies
 */



var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _super.apply(this, arguments);
    _this.changeOptions = _this.changeOptions.bind(_assertThisInitialized(_this));
    _this.parseOptions = _this.parseOptions.bind(_assertThisInitialized(_this));
    _this.validateDownloadClassName = _this.validateDownloadClassName.bind(_assertThisInitialized(_this));
    _this.state = {
      isAPILoaded: false,
      isAPISaving: false,
      dload_delay_time: false,
      dload_delay_cd_text: '',
      dload_delay_info_text: '',
      dload_delay_success_cd_text: '',
      dload_delay_success_info_text: '',
      dload_delay_failed_cd_text: '',
      dload_delay_failed_info_text: '',
      dload_delay_autowrap: false,
      dload_delay_enable_redirect: false,
      dload_delay_extensions: [],
      dload_delay_drop_shadow: true,
      dload_delay_border_radius: 3,
      dload_delay_layout: 'column',
      dload_delay_column_width: 40,
      dload_delay_normal_bg: '#4397ff',
      dload_delay_success_bg: '#39b400',
      dload_delay_failed_bg: '#ff4625',
      dload_delay_download_class: ''
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      wp.api.loadPromise.then(function () {
        _this2.settings = new wp.api.models.Settings();

        if (false === _this2.state.isAPILoaded) {
          _this2.settings.fetch().then(function (response) {
            _this2.parseOptions(response);
          });
        }
      });
    } // on mount and on restore defs

  }, {
    key: "parseOptions",
    value: function parseOptions(response) {
      // console.log(response)
      this.setState({
        dload_delay_time: parseInt(response.dload_delay_time),
        dload_delay_cd_text: response.dload_delay_cd_text,
        dload_delay_info_text: response.dload_delay_info_text,
        dload_delay_success_cd_text: response.dload_delay_success_cd_text,
        dload_delay_success_info_text: response.dload_delay_success_info_text,
        dload_delay_failed_cd_text: response.dload_delay_failed_cd_text,
        dload_delay_failed_info_text: response.dload_delay_failed_info_text,
        dload_delay_extensions: response.dload_delay_extensions,
        dload_delay_autowrap: response.dload_delay_autowrap,
        dload_delay_enable_redirect: response.dload_delay_enable_redirect,
        dload_delay_drop_shadow: response.dload_delay_drop_shadow,
        dload_delay_border_radius: response.dload_delay_border_radius,
        dload_delay_layout: response.dload_delay_layout,
        dload_delay_column_width: response.dload_delay_column_width,
        dload_delay_normal_bg: response.dload_delay_normal_bg,
        dload_delay_success_bg: response.dload_delay_success_bg,
        dload_delay_failed_bg: response.dload_delay_failed_bg,
        dload_delay_download_class: response.dload_delay_download_class,
        isAPILoaded: true,
        isAPISaving: false
      });
    }
  }, {
    key: "changeOptions",
    value: function changeOptions() {
      var _this3 = this;

      this.setState({
        isAPISaving: true
      });
      var model = new wp.api.models.Settings(this.state);
      model.save().then(function (response) {
        // console.log('saved', response)
        _this3.setState({
          // dload_delay_extensions: response["dload_delay_extensions"],
          // dload_delay_time: response["dload_delay_time"],
          // dload_delay_template: response["dload_delay_template"],
          isAPISaving: false
        });
      });
    }
  }, {
    key: "restoreOptions",
    value: function restoreOptions() {
      var _this4 = this;

      this.setState({
        isAPISaving: true
      });
      fetch(dd_admin_vars.ajax_url + '?action=ddlay_restore_defaults' + '&_ajax_nonce=' + dd_admin_vars.dd_security).then(function (res) {
        return res.json();
      }).then(function (res) {
        // console.log(res);
        _this4.parseOptions(res);
      });
    }
  }, {
    key: "validateDownloadClassName",
    value: function validateDownloadClassName(value) {
      if (/^[a-zA-Z0-9\-]*$/.test(value)) {
        this.setState({
          dload_delay_download_class: value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var allowedContentFree = wp.element.createElement("span", null, __('HTML tags are allowed. Enable support for shortcodes and script tags by switching to the ', 'dload-delay-td'), wp.element.createElement("a", {
        href: dd_admin_vars.upgrade_url
      }, "Files Download Delay Pro"), "!");
      var allowedContentPro = wp.element.createElement("span", null, __('Shortcodes and HTML tags (including script tags) are allowed.', 'dload-delay-td'));

      if (!this.state.isAPILoaded) {
        return wp.element.createElement(Flex, {
          justify: "center",
          className: "ui-loading"
        }, wp.element.createElement(FlexItem, null, __('Loading UI...', 'dload-delay-td')), wp.element.createElement(FlexItem, null, wp.element.createElement(Spinner, null)));
      }

      return wp.element.createElement(Fragment, null, wp.element.createElement(Flex, {
        className: "fdd-content-flex"
      }, wp.element.createElement(FlexItem, null, wp.element.createElement("div", {
        className: "fdd-main"
      }, wp.element.createElement(PanelBody, null, wp.element.createElement(PanelRow, null, wp.element.createElement("div", {
        className: "fdd-header"
      }, wp.element.createElement("div", {
        className: "fdd-container"
      }, wp.element.createElement("div", {
        className: "fdd-logo"
      }, wp.element.createElement("img", {
        src: "/wp-content/plugins/files-download-delay/img/icon-256x256.png"
      }), wp.element.createElement("h1", null, __('Files Download Delay', 'dload-delay-td')))))), wp.element.createElement(PanelRow, null, wp.element.createElement(Button, {
        isSecondary: true,
        disabled: this.state.isAPISaving,
        onClick: function onClick() {
          return _this5.restoreOptions();
        }
      }, __('Restore defaults', 'dload-delay-td')), wp.element.createElement(Button // variant="primary"
      , {
        isPrimary: true,
        disabled: this.state.isAPISaving,
        onClick: function onClick() {
          return _this5.changeOptions();
        }
      }, __('Save', 'dload-delay-td')))), wp.element.createElement(PanelBody, null, wp.element.createElement("h2", null, __('Display settings', 'dload-delay-td')), wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {
        label: __('Open in new tab', 'dload-delay-td'),
        help: Boolean(this.state.dload_delay_enable_redirect) ? __('Enabled: Will redirect user to the special download page with a timer block', 'dload-delay-td') : __('Disabled: Timer will be shown on the same page below the download link', 'dload-delay-td'),
        disabled: this.state.isAPISaving,
        checked: Boolean(this.state.dload_delay_enable_redirect),
        onChange: function onChange(value) {
          return _this5.setState({
            dload_delay_enable_redirect: Number(value)
          });
        }
      })), wp.element.createElement(PanelRow, null, wp.element.createElement(BaseControl, {
        label: __('Delay time', 'dload-delay-td'),
        help: __('Specify time in seconds for download delay', 'dload-delay-td'),
        id: "fdd-input-delay-time",
        className: "codeinwp-text-field"
      }, wp.element.createElement("input", {
        type: "number",
        id: "fdd-input-delay-time",
        value: this.state.dload_delay_time,
        placeholder: __('Time in seconds'),
        disabled: this.state.isAPISaving,
        onChange: function onChange(e) {
          return _this5.setState({
            dload_delay_time: e.target.value
          });
        }
      }))), wp.element.createElement(TabPanel, {
        className: "tab-panel-texts",
        activeClass: "tabs-active",
        onSelect: function onSelect(selected) {},
        initialTabName: "tab_countdown",
        tabs: [{
          name: 'tab_countdown',
          title: __('Countdown', 'dload-delay-td')
        }, {
          name: 'tab_success',
          title: __('Success', 'dload-delay-td')
        }, {
          name: 'tab_failed',
          title: __('Failed', 'dload-delay-td')
        }]
      }, function (tab) {
        if (tab.name === 'tab_countdown') {
          return wp.element.createElement(React.Fragment, null, wp.element.createElement(PanelRow, {
            className: "border-normal"
          }, wp.element.createElement(BaseControl, {
            label: __('Header (timer)', 'dload-delay-td'),
            help: __('This text will appear by the countdown timer. Ex.: "Download will start soon"', 'dload-delay-td'),
            id: "fdd-input-cd-head",
            className: "codeinwp-text-field"
          }, wp.element.createElement(TextareaControl, {
            id: "fdd-input-cd-head",
            rows: "1",
            disabled: _this5.state.isAPISaving,
            value: _this5.state.dload_delay_cd_text,
            onChange: function onChange(value) {
              return _this5.setState({
                dload_delay_cd_text: value
              });
            }
          }))), wp.element.createElement(PanelRow, {
            className: "border-normal"
          }, wp.element.createElement(BaseControl, {
            label: __('Body', 'dload-delay-td') // help={__('Insert any text, subsciption form, advertisments, etc. HTML and shortcodes are allowed.', 'dload-delay-td')}
            ,
            help: dd_admin_vars.free_version === 'true' ? allowedContentFree : allowedContentPro,
            id: "fdd-input-cd-info",
            className: "codeinwp-text-field"
          }, wp.element.createElement(TextareaControl, {
            id: "fdd-input-cd-info",
            rows: "10",
            disabled: _this5.state.isAPISaving,
            value: _this5.state.dload_delay_info_text,
            onChange: function onChange(value) {
              return _this5.setState({
                dload_delay_info_text: value
              });
            }
          }))), wp.element.createElement(PanelRow, {
            className: "border-normal"
          }, wp.element.createElement("p", null, __("Header color", 'dload-delay-td')), wp.element.createElement(ColorPalette // colors={ colors }
          , {
            id: "dload_delay_normal_bg",
            value: _this5.state.dload_delay_normal_bg,
            onChange: function onChange(value) {
              // console.log(value)
              _this5.setState({
                dload_delay_normal_bg: value
              });
            },
            clearable: false,
            disableAlpha: true
          })));
        }

        if (tab.name === 'tab_success') {
          return wp.element.createElement(React.Fragment, null, wp.element.createElement(PanelRow, {
            className: "border-success"
          }, wp.element.createElement(BaseControl, {
            label: __('Header', 'dload-delay-td'),
            help: __('Header when download started', 'dload-delay-td'),
            id: "fdd-input-success-head",
            className: "codeinwp-text-field"
          }, wp.element.createElement(TextareaControl, {
            id: "fdd-input-success-head",
            rows: "1",
            disabled: _this5.state.isAPISaving,
            value: _this5.state.dload_delay_success_cd_text,
            onChange: function onChange(value) {
              return _this5.setState({
                dload_delay_success_cd_text: value
              });
            }
          }))), wp.element.createElement(PanelRow, {
            className: "border-success"
          }, wp.element.createElement(BaseControl, {
            label: __('Body', 'dload-delay-td'),
            help: dd_admin_vars.free_version === 'true' ? allowedContentFree : allowedContentPro,
            id: "fdd-input-success-info",
            className: "codeinwp-text-field"
          }, wp.element.createElement(TextareaControl, {
            id: "fdd-input-success-info",
            rows: "10",
            disabled: _this5.state.isAPISaving,
            value: _this5.state.dload_delay_success_info_text,
            onChange: function onChange(value) {
              return _this5.setState({
                dload_delay_success_info_text: value
              });
            }
          }))), wp.element.createElement(PanelRow, {
            className: "border-success"
          }, wp.element.createElement("p", null, __("Header color", 'dload-delay-td')), wp.element.createElement(ColorPalette, {
            value: _this5.state.dload_delay_success_bg,
            onChange: function onChange(value) {
              // console.log(value)
              _this5.setState({
                dload_delay_success_bg: value
              });
            },
            clearable: false,
            disableAlpha: true
          })));
        }

        if (tab.name === 'tab_failed') {
          return wp.element.createElement(React.Fragment, null, wp.element.createElement(PanelRow, {
            className: "border-failed",
            style: ""
          }, wp.element.createElement(BaseControl, {
            label: __('Header', 'dload-delay-td'),
            help: __('Header when download failed', 'dload-delay-td'),
            id: "fdd-input-failed-head",
            className: "codeinwp-text-field"
          }, wp.element.createElement(TextareaControl, {
            id: "fdd-input-failed-head",
            rows: "1",
            disabled: _this5.state.isAPISaving,
            value: _this5.state.dload_delay_failed_cd_text,
            onChange: function onChange(value) {
              return _this5.setState({
                dload_delay_failed_cd_text: value
              });
            }
          }))), wp.element.createElement(PanelRow, {
            className: "border-failed"
          }, wp.element.createElement(BaseControl, {
            label: __('Body', 'dload-delay-td'),
            help: dd_admin_vars.free_version === 'true' ? allowedContentFree : allowedContentPro,
            id: "fdd-input-failed-info",
            className: "codeinwp-text-field"
          }, wp.element.createElement(TextareaControl, {
            id: "fdd-input-failed-info",
            rows: "10",
            disabled: _this5.state.isAPISaving,
            value: _this5.state.dload_delay_failed_info_text,
            onChange: function onChange(value) {
              return _this5.setState({
                dload_delay_failed_info_text: value
              });
            }
          }))), wp.element.createElement(PanelRow, {
            className: "border-failed"
          }, wp.element.createElement("p", null, __("Header color", 'dload-delay-td')), wp.element.createElement(ColorPalette, {
            value: _this5.state.dload_delay_failed_bg,
            onChange: function onChange(value) {
              // console.log(value)
              _this5.setState({
                dload_delay_failed_bg: value
              });
            },
            clearable: false,
            disableAlpha: true
          })));
        }
      }), wp.element.createElement("hr", null), wp.element.createElement("hr", null)), wp.element.createElement(PanelBody, null, wp.element.createElement("h2", null, __('Auto-wrap settings', 'dload-delay-td')), wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {
        label: __('Enable auto wrap', 'dload-delay-td'),
        help: __('Automatically wrap all file links in articles with corresponding file extensions', 'dload-delay-td'),
        disabled: this.state.isAPISaving,
        checked: Boolean(this.state.dload_delay_autowrap),
        onChange: function onChange(value) {
          return _this5.setState({
            dload_delay_autowrap: Number(value)
          });
        }
      })), wp.element.createElement(PanelRow, null, wp.element.createElement(FormTokenField, {
        label: __('Files extensions', 'dload-delay-td'),
        value: this.state.dload_delay_extensions,
        suggestions: ['pdf', 'mp3'],
        disabled: this.state.isAPISaving,
        onChange: function onChange(extensions) {
          return _this5.setState({
            dload_delay_extensions: extensions
          });
        }
      })), wp.element.createElement(PanelRow, null, wp.element.createElement(BaseControl, {
        label: __('With class', 'dload-delay-td'),
        id: "fdd-input-auto-class",
        className: "codeinwp-text-field"
      }, wp.element.createElement(TextControl, {
        id: "fdd-input-auto-class",
        help: __('Finds all <a> tags with selected class. Also works if <a> tag\'s parent has this classname. Allowed characters: [a-z], [0-9], [-].', 'dload-delay-td'),
        value: this.state.dload_delay_download_class,
        disabled: this.state.isAPISaving,
        onChange: function onChange(value) {
          return _this5.validateDownloadClassName(value);
        }
      })))), dd_admin_vars.free_version !== 'true' && wp.element.createElement(PanelBody, null, wp.element.createElement("h2", null, __('Block Customizer', 'dload-delay-td')), !this.state.dload_delay_enable_redirect && wp.element.createElement(React.Fragment, null, wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {
        label: __('Enable shadow', 'dload-delay-td'),
        checked: Boolean(this.state.dload_delay_drop_shadow),
        disabled: this.state.isAPISaving,
        onChange: function onChange(value) {
          return _this5.setState({
            dload_delay_drop_shadow: Number(value)
          });
        }
      })), wp.element.createElement(PanelRow, null, wp.element.createElement(BaseControl, {
        label: __('Border radius', 'dload-delay-td'),
        id: "fdd-input-border-radius",
        help: __('Specify border radius in px', 'dload-delay-td'),
        className: "codeinwp-text-field"
      }, wp.element.createElement("input", {
        id: "fdd-input-border-radius",
        type: "number",
        min: 0,
        max: 100,
        value: this.state.dload_delay_border_radius,
        disabled: this.state.isAPISaving,
        onChange: function onChange(e) {
          return _this5.setState({
            dload_delay_border_radius: e.target.value
          });
        }
      }))), wp.element.createElement("h3", null, __('Layout settings', 'dload-delay-td')), wp.element.createElement(PanelRow, null, wp.element.createElement(FlexBlock, null, wp.element.createElement(RadioGroup, {
        label: __('Layout Direction', 'dload-delay-td'),
        onChange: function onChange(value) {
          return _this5.setState({
            dload_delay_layout: value
          });
        },
        checked: this.state.dload_delay_layout,
        help: __('Switch between 2 fullwidth rows or 2 columns. ', 'dload-delay-td')
      }, wp.element.createElement(Radio, {
        value: "column"
      }, __('Rows', 'dload-delay-td'), wp.element.createElement("img", {
        className: "fdd-layout-icon",
        src: "/wp-content/plugins/files-download-delay/img/row.svg"
      })), wp.element.createElement(Radio, {
        value: "row"
      }, __('Columns', 'dload-delay-td'), wp.element.createElement("img", {
        className: "fdd-layout-icon",
        src: "/wp-content/plugins/files-download-delay/img/column.svg"
      })))), wp.element.createElement(FlexBlock, null, wp.element.createElement(RangeControl, {
        label: __('Columns width', 'dload-delay-td'),
        help: __('Relative width in %. Set left column\'s width, right column will be 100-[selected value]%.', 'dload-delay-td'),
        value: this.state.dload_delay_column_width,
        onChange: function onChange(value) {
          return _this5.setState({
            dload_delay_column_width: value
          });
        },
        min: 20,
        max: 80,
        step: 10
      }))))), wp.element.createElement(PanelBody, null, wp.element.createElement(PanelRow, null, wp.element.createElement(Button, {
        isSecondary: true,
        disabled: this.state.isAPISaving,
        onClick: function onClick() {
          return _this5.restoreOptions();
        }
      }, __('Restore defaults', 'dload-delay-td')), wp.element.createElement(Button // variant="primary"
      , {
        isPrimary: true,
        disabled: this.state.isAPISaving,
        onClick: function onClick() {
          return _this5.changeOptions();
        }
      }, __('Save', 'dload-delay-td')))))), wp.element.createElement(FlexItem, null, wp.element.createElement("div", {
        className: "fdd-sidebar"
      }, dd_admin_vars.free_version === 'true' && wp.element.createElement(PanelBody, {
        className: "free-version"
      }, wp.element.createElement("h2", null, "\uD83D\uDC8E ", __('Upgrade to Pro Now!', 'dload-delay-td')), wp.element.createElement("p", null, __('Premium version has some nice extra options available:', 'dload-delay-td'), " "), wp.element.createElement("ol", null, wp.element.createElement("li", null, __('Layout Customization', 'dload-delay-td')), wp.element.createElement("li", null, __('Separate delay and new tab option for each link', 'dload-delay-td')), wp.element.createElement("li", null, __('JavaScript Permitted (Ads Support)', 'dload-delay-td')), wp.element.createElement("li", null, __('Priority Tech Support via Email', 'dload-delay-td'))), wp.element.createElement("p", null, __('Check out our upgrade plans here:', 'dload-delay-td'), " ", wp.element.createElement("a", {
        href: dd_admin_vars.upgrade_url
      }, __('Get FDD Pro', 'dload-delay-td')), ".")), dd_admin_vars.free_version === 'false' && dd_admin_vars.is_paying === 'true' && wp.element.createElement(PanelBody, {
        className: "pro-version"
      }, wp.element.createElement("h2", null, "\uD83D\uDE03 ", __('Pro Plan Activated', 'dload-delay-td')), wp.element.createElement("p", null, __('You can check your license status and account settings here:', 'dload-delay-td'), " ", wp.element.createElement("a", {
        href: dd_admin_vars.freemium.account_url
      }, __('Account Page', 'dload-delay-td'))), wp.element.createElement("p", null, __('In trouble?', 'dload-delay-td'), " ", wp.element.createElement("a", {
        href: dd_admin_vars.freemium.contact_url
      }, __('Contact Us', 'dload-delay-td')))), dd_admin_vars.free_version === 'false' && dd_admin_vars.is_paying === 'false' && wp.element.createElement(PanelBody, {
        className: "expired-version"
      }, wp.element.createElement("h2", null, "\uD83D\uDE1F ", __('Activate Your License', 'dload-delay-td')), wp.element.createElement("p", null, __('You have premium version of the plugin installed but your license key is missing or expired.', 'dload-delay-td')), wp.element.createElement("p", null, __('Go to your account page to activate the plugin:', 'dload-delay-td'), " ", wp.element.createElement("a", {
        href: dd_admin_vars.freemium.account_url
      }, __('Account Page', 'dload-delay-td')), "."), wp.element.createElement("p", null, __('You won\'t be getting new plugin updates or the Priority Tech Support, but all other premium features are still available to use.', 'dload-delay-td')), wp.element.createElement("p", null, __('You can renew your license key here:', 'dload-delay-td'), " ", wp.element.createElement("a", {
        href: dd_admin_vars.upgrade_url
      }, __('Upgrade page', 'dload-delay-td')), "."), wp.element.createElement("p", null, __('Have any questions?', 'dload-delay-td'), " ", wp.element.createElement("a", {
        href: dd_admin_vars.freemium.contact_url
      }, __('Contact Us', 'dload-delay-td'))))))));
    }
  }]);

  return App;
}(Component);

render(wp.element.createElement(App, null), document.getElementById('seocherry-dload-delay-container'));
/******/ })()
;