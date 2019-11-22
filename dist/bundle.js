(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var diff_1 = require("./diff");

var Bread =
/** @class */
function () {
  function Bread(_a) {
    var app = _a.app;
    this.app = app;
  }

  Bread.prototype.render = function ($parent) {
    var component = new this.app();
    var node = {
      type: this.app,
      attributes: {},
      children: []
    };
    diff_1["default"](null, node, $parent, component);
  };

  Bread.parse = function (type, attributes) {
    var children = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }

    return {
      type: type,
      attributes: attributes,
      children: children.flat(Infinity) || []
    };
  };

  return Bread;
}();

exports["default"] = Bread;

},{"./diff":3}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var renderComponent_1 = require("./renderComponent");

var Component =
/** @class */
function () {
  function Component(props) {
    this.data = {};
    this.props = {};
    this.props = props;
  }

  Component.prototype.render = function (props) {
    return {
      type: '',
      attributes: props,
      children: []
    };
  };

  ;

  Component.prototype.update = function (callback) {
    if (callback === void 0) {
      callback = function callback() {};
    }

    callback();
    renderComponent_1["default"](this, {});
  };

  Component.prototype.set = function (prop, value) {
    Object.defineProperty(this, prop, {
      get: function get() {
        return this.data[prop];
      },
      set: function set(val) {
        this.data[prop] = val;
        this.update();
      }
    });
    this[prop] = value;
    renderComponent_1["default"](this, {});
  };

  Component.prototype.ready = function () {};

  Component.prototype.updated = function () {};

  return Component;
}();

exports["default"] = Component;

},{"./renderComponent":5}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var renderNode_1 = require("./renderNode");

var diff = function diff($node, vNode, $parent, component) {
  if ($node) {
    var type = vNode.type,
        attributes = vNode.attributes;
    if (attributes && attributes["static"]) return $node;

    if (typeof vNode === 'string') {
      $node.nodeValue = vNode;
      return $node;
    }

    var children_1 = vNode.children;
    var style = (attributes || {}).style;

    if (typeof type === 'function') {
      var component_1 = new type(attributes);
      var rendered = component_1.render(component_1.props, component_1.state);
      component_1.updated();
      diff($node, rendered);
      return $node;
    }

    if (children_1.length != $node.childNodes.length) $node.appendChild(renderNode_1["default"](children_1[children_1.length - 1]));
    $node.childNodes.forEach(function (child, i) {
      return diff(child, children_1[i]);
    });

    for (var key in attributes) {
      if (key == 'value') $node.value = attributes[key];else $node.setAttribute(key, attributes[key]);
    }

    for (var key in style) {
      $node.style[key] = style[key];
    }

    return $node;
  } else {
    var $newNode = renderNode_1["default"](vNode, component);
    $parent.appendChild($newNode);
    return $newNode;
  }
};

exports["default"] = diff;

},{"./renderNode":6}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var Bread_1 = require("./Bread");

exports.Bread = Bread_1["default"];

var Component_1 = require("./Component");

exports.Component = Component_1["default"];

},{"./Bread":1,"./Component":2}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var diff_1 = require("./diff");

var renderComponent = function renderComponent(component, attributes) {
  var rendered = component.render(attributes);
  /* component.base = */

  diff_1["default"](component.base, rendered, null, component);
};

exports["default"] = renderComponent;

},{"./diff":3}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var renderComponent_1 = require("./renderComponent");

var renderNode = function renderNode(vNode, component) {
  if (typeof vNode == 'string') return document.createTextNode(vNode);
  var type = vNode.type,
      attributes = vNode.attributes,
      children = vNode.children;
  var $el;

  if (typeof type == 'string') {
    $el = document.createElement(type);

    for (var key in attributes) {
      var value = attributes[key];

      if (key[0] == 'o' && key[1] == 'n') {
        $el.addEventListener(key.substring(2), value.bind(component));
      } else if (key == 'style') {
        var style = (attributes || {}).style;

        for (var key_1 in style) {
          $el.style[key_1] = style[key_1];
        }
      } else $el.setAttribute(key, value);
    }
  } else if (typeof type == 'function') {
    if (!component) component = new type();

    var _loop_1 = function _loop_1(prop) {
      Object.defineProperty(component, prop, {
        get: function get() {
          return component.data[prop];
        },
        set: function set(value) {
          component.data[prop] = value;
          renderComponent_1["default"](component, attributes);
        }
      });
    };

    for (var prop in component.data) {
      _loop_1(prop);
    }

    var rendered = component.render(attributes);
    $el = renderNode(rendered, component);
    component.base = $el;
    component.ready(); // TODO: more events
  }

  children.forEach(function (child) {
    return $el.appendChild(renderNode(child, component));
  });
  return $el;
};

exports["default"] = renderNode;

},{"./renderComponent":5}],7:[function(require,module,exports){
"use strict";

var _core = require("@chlebjs/core");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Example =
/*#__PURE__*/
function (_Component) {
  _inherits(Example, _Component);

  function Example() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Example)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.data = {
      style: {}
    };
    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _core.Bread.parse("div", null, _core.Bread.parse("button", {
        onclick: this.click,
        style: this.style,
        "class": "buttong"
      }, "klik"));
    }
  }, {
    key: "click",
    value: function click() {
      this.randomize();
    }
  }, {
    key: "ready",
    value: function ready() {
      this.randomize();
    }
  }, {
    key: "randomize",
    value: function randomize() {
      this.style = {
        left: "".concat(Math.floor(Math.random() * window.innerWidth), "px"),
        top: "".concat(Math.floor(Math.random() * window.innerHeight), "px")
      };
    }
  }]);

  return Example;
}(_core.Component);

var app = new _core.Bread({
  app: Example
});
app.render(document.querySelector('#root'));

},{"@chlebjs/core":4}]},{},[7]);
