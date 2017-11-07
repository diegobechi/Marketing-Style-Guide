
/*! Tether 1.4.0 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node || !document.body.contains(node)) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

var _scrollBarSize = null;
function getScrollBarSize() {
  if (_scrollBarSize) {
    return _scrollBarSize;
  }
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  _scrollBarSize = { width: width, height: width };
  return _scrollBarSize;
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '--' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        if (this.options.bodyElement) {
          this.options.bodyElement.appendChild(this.element);
        } else {
          var offsetParentIsBody = true;
          var currentNode = this.element.parentNode;
          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
            if (getComputedStyle(currentNode).position !== 'static') {
              offsetParentIsBody = false;
              break;
            }

            currentNode = currentNode.parentNode;
          }

          if (!offsetParentIsBody) {
            this.element.parentNode.removeChild(this.element);
            this.element.ownerDocument.body.appendChild(this.element);
          }
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* Bootstrap (v4.0.0-alpha.6): button.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Button = function ($) {

	/**
	* ------------------------------------------------------------------------
	* Constants
	* ------------------------------------------------------------------------
	*/

	var NAME = 'button';
	var VERSION = '4.0.0-alpha.6';
	var DATA_KEY = 'bs.button';
	var EVENT_KEY = '.' + DATA_KEY;
	var DATA_API_KEY = '.data-api';
	var JQUERY_NO_CONFLICT = $.fn[NAME];

	var ClassName = {
		ACTIVE: 'active',
		BUTTON: 'btn',
		FOCUS: 'focus'
	};

	var Selector = {
		DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
		DATA_TOGGLE: '[data-toggle="buttons"]',
		INPUT: 'input',
		ACTIVE: '.active',
		BUTTON: '.btn'
	};

	var Event = {
		CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
		FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
	};

	/**
	* ------------------------------------------------------------------------
	* Class Definition
	* ------------------------------------------------------------------------
	*/

	var Button = function () {
		function Button(element) {
			_classCallCheck(this, Button);

			this._element = element;
		}

		// getters

		// public

		Button.prototype.toggle = function toggle() {
			var triggerChangeEvent = true;
			var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

			if (rootElement) {
				var input = $(this._element).find(Selector.INPUT)[0];

				if (input) {
					if (input.type === 'radio') {
						if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
							triggerChangeEvent = false;
						} else {
							var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

							if (activeElement) {
								$(activeElement).removeClass(ClassName.ACTIVE);
							}
						}
					}

					if (triggerChangeEvent) {
						input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
						$(input).trigger('change');
					}

					input.focus();
				}
			}

			this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

			if (triggerChangeEvent) {
				$(this._element).toggleClass(ClassName.ACTIVE);
			}
		};

		Button.prototype.dispose = function dispose() {
			$.removeData(this._element, DATA_KEY);
			this._element = null;
		};

		// static

		Button._jQueryInterface = function _jQueryInterface(config) {
			return this.each(function () {
				var data = $(this).data(DATA_KEY);

				if (!data) {
					data = new Button(this);
					$(this).data(DATA_KEY, data);
				}

				if (config === 'toggle') {
					data[config]();
				}
			});
		};

		_createClass(Button, null, [{
			key: 'VERSION',
			get: function get() {
				return VERSION;
			}
		}]);

		return Button;
	}();

	/**
	* ------------------------------------------------------------------------
	* Data Api implementation
	* ------------------------------------------------------------------------
	*/

	$(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
		event.preventDefault();

		var button = event.target;

		if (!$(button).hasClass(ClassName.BUTTON)) {
			button = $(button).closest(Selector.BUTTON);
		}

		Button._jQueryInterface.call($(button), 'toggle');
	}).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
		var button = $(event.target).closest(Selector.BUTTON)[0];
		$(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
	});

	/**
	* ------------------------------------------------------------------------
	* jQuery
	* ------------------------------------------------------------------------
	*/

	$.fn[NAME] = Button._jQueryInterface;
	$.fn[NAME].Constructor = Button;
	$.fn[NAME].noConflict = function () {
		$.fn[NAME] = JQUERY_NO_CONFLICT;
		return Button._jQueryInterface;
	};

	return Button;
}(jQuery);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]',
    DATA_CHILDREN: 'data-children'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      this._selectorActives = Selector.ACTIVES;
      if (this._parent) {
        var childrenSelector = this._parent.hasAttribute(Selector.DATA_CHILDREN) ? this._parent.getAttribute(Selector.DATA_CHILDREN) : null;
        if (childrenSelector !== null) {
          this._selectorActives = childrenSelector + ' > .show, ' + childrenSelector + ' > .collapsing';
        }
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(this._selectorActives));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this3 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE + '|' + SPACE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'rc_dropdown__backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.rc_dropdown__backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar__nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      // set the backdrop only if the dropdown menu will be opened
      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        // remove backdrop only if the dropdown menu will be hidden
        var backdrop = $(parent).find(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'rc_modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'rc_modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'rc_modal__scrollbar-measure',
    BACKDROP: 'rc_modal__backdrop',
    OPEN: 'rc_modal__open',
    FADE: 'rc_fade',
    SHOW: 'rc_show'
  };

  var Selector = {
    DIALOG: '.rc_modal',
    DATA_TOGGLE: '[data-toggle="rc_modal"]',
    DATA_DISMISS: '[data-dismiss="rc_modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }
        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !$(_this4._element).has(event.target).length) {
          _this4._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this6._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this7._resetAdjustments();
        _this7._resetScrollbar();
        $(_this7._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this9 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this9).is(':visible')) {
          _this9.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'rc_tether';

  var Default = {
    animation: true,
    template: '<div class="rc_tooltip" role="tooltip">' + '<div class="rc_tooltip__inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'top left', // middle left
    BOTTOM: 'top center',
    LEFT: 'top right' // middle right
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    STICKY: 'sticky',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          // throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        // var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
        // Commenting out the original snippet above for this script which adds auto-calculation of position for attachment
    		function isWideEnough(availableSpace, elementWidth) {
    			return (availableSpace - elementWidth) >= 0 && (availableSpace - elementWidth);
    		}
    		function optimizeAlignment(rightSpacing, leftSpacing, popupWidth, iconWidth) {
    			if (isWideEnough(rightSpacing, popupWidth)) {
    				return "right";
    			} else if (isWideEnough(leftSpacing, popupWidth)) {
    				return "left";
    			} else if (isWideEnough(leftSpacing - iconWidth, popupWidth / 2) && isWideEnough(rightSpacing - iconWidth, popupWidth / 2)) {
    				return "bottom";
    			}
    			return false;
    		}
        function calculateAutoPlacement(context, source) {
    			var icon = $(source).position(),
    				iconLeft = icon.left,
    				iconWidth = $(source).outerWidth() / 2,
    				winWidth = $(window).width(),
    				leftSpacing = iconLeft + iconWidth,
    				rightSpacing = winWidth - (iconWidth + iconLeft),
    				popupWidth = 350,
    				characterLength = $(source).data('content').length;
    			if (characterLength > 100) {
    				popupWidth = 500;
    				$(context).css('max-width', popupWidth);
    			} else if (popupWidth > winWidth) {
    				popupWidth = winWidth;
    			}
    			if (isWideEnough(rightSpacing, popupWidth)) {
    				return "right";
    			} else if (isWideEnough(leftSpacing, popupWidth)) {
    				return "left";
    			} else {
    				var calculatePopupWidth = (characterLength * 9) + 50, // (? * 9 = average character width) + (25 * 2 = horizontal padding)
    					iconWidth = iconWidth / 2,
    					reductionAmount = 30;
    				if (calculatePopupWidth >= popupWidth) {
    					calculatePopupWidth = popupWidth;
    				}
    				for (var i = 0; i <= popupWidth; i += reductionAmount) {
    					var alignment = optimizeAlignment(rightSpacing, leftSpacing, popupWidth - i, iconWidth, winWidth);
    					if (alignment) {
    						$(context).width(calculatePopupWidth - i);
    						return alignment;
    					}
    				}
    			}
        }

        var placement;
        if (typeof(this.config.placement) === 'function') {
        	placement = this.config.placement.call(this, tip, this.element);
        } else if (this.config.placement === "auto") {
        	// If auto, calculate attachment based on window dimensions and size of box
        	placement = calculateAutoPlacement(tip, this.element);
        } else {
        	placement = this.config.placement;
        }

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          _this._isTransitioning = false;

          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        // throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2.element.removeAttribute('aria-describedby');
        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
        _this2._isTransitioning = false;
        _this2.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;
      this._activeTrigger[Trigger.STICKY] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
            return _this3.toggle(event);
          });
        } else if (trigger === 'sticky') {
          // Most references to HOVER have been dupliated to include a similair action, STICKY
          var eventIn = trigger === Trigger.STICKY ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.STICKY ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
          $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
            $(this).addClass('rc_tooltip__button--active');
            return _this3._enter(event);
          }).on(eventOut, _this3.config.selector, function (event) {
            var jToElement = $(event.toElement),
              jElem = $(_this3);
            if (!jToElement.hasClass('rc_tooltip')) {
              $(this).removeClass('rc_tooltip__button--active');
              return _this3._leave(event);
            }
          });
          // This will ensure the tooltip box is removed after it's served its purpose
          $(document).on('mouseleave', '.rc_tooltip', function(event) {
            $(_this3.element).rcTooltip('hide').removeClass('rc_tooltip__button--active');
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

          $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
            return _this3._enter(event);
          }).on(eventOut, _this3.config.selector, function (event) {
            return _this3._leave(event);
          });
        }

        $(_this3.element).closest('.modal').on('hide.bs.modal', function () {
          return _this3.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.STICKY] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.STICKY] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery); /* global Tether */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'rcTooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.rcTooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'auto', // 'right'
    trigger: 'sticky',
    animation: false,
    content: '',
    html: true,
    template: '<div class="rc_tooltip" role="tooltip">' + '<div class="rc_tooltip__title"></div>' + '<div class="rc_tooltip__content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.rc_tooltip__title',
    CONTENT: '.rc_tooltip__content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);

(function() {
	/* Constructor */
	this.rcNotification = function() {
		// Global elements
		this.notification = null;

		// Determine transitionEnd prefix
		this.transitionEnd = transitionSelect();

		// Default options
		var defaults = {
			message: "",
			type: "default",
			timeout: 3500,
			static: false
		}

		// Create options by extending defaults with passed-in-arguments
		if (arguments[0] && typeof(arguments[0]) == "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}

		this._appendNotification = function() {
			document.body.appendChild(this.notification);
		}

	}

	/* Public methods */
	// Show the notification
	rcNotification.prototype.show = function() {
		// Build notification
		buildNotification.call(this);

		// Initialize event listener
		initializeEvents.call(this);

		// Ensures a smooth transition on reveal
		window.getComputedStyle(this.notification).height;

		// Add class that initiates the transition
		this.notification.className = this.notification.className + " rc_show";
		
		// Close notification automatically after a timeout if static isn't set to true
		if (!this.options.static === true || this.options.static === 'false') {
			var _this = this;
			setTimeout(function() {
				_this.close();
			}, this.options.timeout);
		}
	}

	rcNotification.prototype.flash = function(element) {
		// Ensures a smooth transition on reveal
		window.getComputedStyle(element).height;

		this.notification = element;

		// Add class that initiates the transition
		//this.notification.className = this.notification.className + " rc_flash rc_show";
		addClasses.call(this, this.notification.className + " rc_flash rc_show");

		this._appendNotification();

		// Trigger timeout listener listener
		var type = this.notification.className.replace("rc_notification rc_notification--", "").replace(" rc_flash rc_show", "");
		if (type == 'error' || type == 'warning' || type == 'review') {
			// Add a close button
			buildCloseButton.call(this, this.notification);

			// Add a listener to the close button
			initializeEvents.call(this, this.notification);
		} else {
			// Close notification automatically after a timeout if static isn't set to true
			var _this = this;
			setTimeout(function() {
				_this.close();
			}, 3500); // this.options.timeout
		}
	}

	// Close and remove the notification
	rcNotification.prototype.close = function() {
		// Force-close the notification script
		var _this = this;

		// Remove the class that initiated the transition
		this.notification.className = this.notification.className.replace(" rc_show", "");

		// Remove notification when transition ends
		this.notification.addEventListener(this.transitionEnd, function() {
			_this.notification.parentNode.removeChild(_this.notification);
		});
	}

	// Store notification data as a cookie
	rcNotification.prototype.reload = function() {
		var _this = this;

		// Store options in cookies for use on reload
		createCookie.call(this, "rcNoticeMessage", _this.options.message);
		createCookie.call(this, "rcNoticeType", _this.options.type);
		createCookie.call(this, "rcNoticeTimeout", _this.options.timeout);
		createCookie.call(this, "rcNoticeStatic", _this.options.static);
	}

	// Read cookies to show any pending notification data
	rcNotification.prototype.pending = function() {
		var pending_message = readCookie.call(this, 'rcNoticeMessage');

		// Only run if rcNoticeMessage cookie is set
		if (pending_message) {
			this.options = {};

			// Build default options
			this.options.message = pending_message;
			this.options.type = readCookie.call(this, 'rcNoticeType');
			this.options.timeout = readCookie.call(this, 'rcNoticeTimeout');
			this.options.static = readCookie.call(this, 'rcNoticeStatic');
			
			// Trigger the notification
			this.show();

			// Remove cookies
			eraseCookie.call(this, 'rcNoticeMessage');
			eraseCookie.call(this, 'rcNoticeType');
			eraseCookie.call(this, 'rcNoticeTimeout');
			eraseCookie.call(this, 'rcNoticeStatic');
		}
	}
	/*rcNotification.prototype.pending = function() {
		var pending_message = readCookie.call(this, 'rcNoticeMessage');

		// Only run if rcNoticeMessage cookie is set
		if (pending_message) {
			this.options = {};

			// Build default options
			this.options.message = pending_message;
			try {
				this.options.type = readCookie.call(this, 'rcNoticeType');
			}
			catch(error) {}
			try {
				this.options.timeout = readCookie.call(this, 'rcNoticeTimeout');
			}
			catch(error) {}
			try {
				this.options.static = readCookie.call(this, 'rcNoticeStatic');
			}
			catch(error) {}

			// Trigger the notification
			this.show();

			// Remove cookies
			eraseCookie.call(this, 'rcNoticeMessage');
			eraseCookie.call(this, 'rcNoticeType');
			eraseCookie.call(this, 'rcNoticeTimeout');
			eraseCookie.call(this, 'rcNoticeStatic');
		}
	}*/

	/* Private methods */
	// Generic create cookie function
	function createCookie(name, value, days) {
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
	}

	// Generic read cookie function V2
	// This one avoids the double quotes from appearing from cookie fetched messages e.g. ""message""
	function readCookie(key) {
		if (!key) { return null; }
		
		var cookie = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

		if (cookie){
			if (!isNaN(+cookie)) {
				return +cookie;
			} else if (cookie === "true" || cookie === 'false') {
				return cookie === "true";
			}

			return cookie.replace(/"/g,"");
		}

		return cookie;
	}

	// Generic read cookie function
	/*function readCookie(name) {
		var nameEQ = encodeURIComponent(name) + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return decodeURIComponent(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	}*/

	// Generic erase cookie function
	function eraseCookie(name) {
		createCookie(name, "", -1);
	}

	// Build the notification element and append to document
	function buildNotification() {
		// Build the notification container
		this.notification = document.createElement("div");
		//this.notification.className = "rc_notification rc_notification--" + this.options.type;
		addClasses.call(this, "rc_notification rc_notification--" + this.options.type);

		// If notification requires a close button
		if (this.options.static === true || this.options.static === 'true') {
			this.closeButton = document.createElement('span');
			this.closeButton.className = 'rc_notification__close';

			// Append close button to notification
			this.notification.appendChild(this.closeButton);
		}

		// Place message within a <p></p> tag
		notificationContent = document.createElement("p");
		notificationContent.innerHTML = this.options.message;
		this.notification.appendChild(notificationContent)

		// Append document fragment to the body
		//document.body.appendChild(docFragment);
		this._appendNotification();
	}

	function addClasses(classNames) {
		var elem = this.notification;

		function checkAndAdd(clazz) {
			if (!elem.classList.contains(clazz)) {
				elem.classList.add(clazz);
			}
		}
		
		classNames
			.split(' ')
			.forEach(checkAndAdd)

		if (this.customClasses) {
			this.customClasses
				.split(' ')
				.forEach(checkAndAdd)
		}
	}

	// Build the notification element and append to document
	function buildCloseButton(element) {
		// Build a button with the class .rc_notification__close
		this.closeButton = document.createElement('span');
		this.closeButton.className = 'rc_notification__close';
		// // Append document fragment to the notification
		this.notification.appendChild(this.closeButton);
	}

	// Initialize any click events
	function initializeEvents() {
		// Bind the close button to the close method
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this));
		}
	}

	/* Utility methods */
	// Extend defaults with provided options
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	// Determine which transitionEnd event is supported
	function transitionSelect() {
		var element = document.createElement("div");
		if (element.style.WebkitTransition) {
			return "webkitTransitionEnd";
		}
		if (element.style.OTransition) {
			return "oTransitionEnd";
		}
		return "transitionend";
	}
}());
(function($) {
	/* Constructor */
	this.rcNotificationV2 = function() {
		rcNotification.call(this, arguments[0]);

		//check/create container
		this.container = document.querySelector('.rc_notification__container');

		//custom classes to always be added
		this.customClasses = 'rc_flash';

		if (!this.container) {
			//create container
			this.container = document.createElement('div');
			this.container.className = 'rc_notification__container';

			/* check order for container placement
				1. After Breadcrumbs
				2. After Navbar
				3. Prepend to body
			*/
			if (document.querySelector('ol.breadcrumbs')) {
				//place after breadcrumb
				insertAfter(this.container, document.querySelector('ol.breadcrumbs'));
			} else if (document.querySelector('#rc_navbar')) {
				//place after navbar
				insertAfter(this.container, document.querySelector('#rc_navbar'));
			} else {
				//preprend to body
				insertAfter(this.container, document.body.firstChild);
			}

			//attach listener only if creating container
			var jContainer = $(this.container),
				jSibling = $(this.container.nextSibling),
				y_pos = jContainer.offset().top;

			$(document).scroll(function() {
				var scrollTop = $(this).scrollTop(),
					height = jContainer.height();

				if (scrollTop > y_pos + height) {
					//ensure smooth roll of content when notification swiches position
					jSibling.css('margin-top', height);

					jContainer.addClass("rc_notification__container--fixed")
						.animate({ top: 0 });
				} else if (scrollTop <= y_pos) {
					jSibling.css('margin-top', 0);

					jContainer.removeClass("rc_notification__container--fixed")
						.clearQueue()
						.animate({ top: "-48px" }, 0);
				}
			});
		}

		this._appendNotification = function() {
			this.container.appendChild(this.notification);
		}

	}

	function insertAfter(newNode, refNode) {
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	}

	rcNotificationV2.prototype = Object.create(rcNotification.prototype);
	rcNotificationV2.prototype.constructor = rcNotification;

}(window.jQuery));
/*
 * DropKick
 *
 * Highly customizable <select> lists
 * https://github.com/robdel12/DropKick
 *
*/
(function(factory) {
	var jQuery;

	if ( typeof exports === "object" ) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		try {
			jQuery = require( "jquery" );
		} catch ( e ) {}

		module.exports = factory( window, document, jQuery );
	} else if ( typeof define === 'function' && define.amd ) {
		define([], function(){ return factory( window, document, window.jQuery ) });
	} else {
		// Browser globals (root is window)
		window.rcSelect = factory( window, document, window.jQuery );
	}

}(function( window, document, jQuery, undefined ) {


var

	// Browser testing stuff
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ),
	isIframe = window.parent !== window.self,
	isIE = navigator.appVersion.indexOf("MSIE")!==-1,

	/**
	* # Getting started
	* After you've cloned the repo you will need to add the library to your page. In the `build/js` folder use
	* one of the two DropKick files given. One has a version number in the file name and the other is a version
	* number-less version. You will also need to grab the css from `build/css` and load it on the page.
	*
	* Once those files are imported into the page you can call DropKick on any HTMLSelectElement:
	* `new rcSelect( HTMLSelectElement, Options );` or `new rcSelect( "ID", Options );`. This returns the dropkick
	* object to you. It may be useful for you to store this in a var to reference later.
	*
	* If you're using jQuery you can do this instead:
	* `$('#select').dropkick( Options );`
	*
	*
	* @class rcSelect
	* @return { object } DropKick Object for that select. You can call your methods on this if stored in a var
	* @param {elem} sel HTMLSelect Element being passed.
	* @param {opts} options See list of [properties you can pass in here](#list_of_properties)
	* @constructor
	* @example
	*  ```js
	*    // Pure JS
	*    var select = new rcSelect("#select");
	*  ```
	* @example
	*  ```js
	*    // jQuery
	*    $("#select").dropkick();
	*  ```
	*/
	rcSelect = function( sel, opts ) {
		var i, dk;

		// Safety if `rcSelect` is called without `new`
		if ( this === window ) {
			return new rcSelect( sel, opts );
		}

		if ( typeof sel === "string" && sel[0] === "#" ) {
			sel = document.getElementById( sel.substr( 1 ) );
		}

		// Check if select has already been DK'd and return the DK Object
		for ( i = 0; i < rcSelect.uid; i++) {
			dk = rcSelect.cache[ i ];

			if ( dk instanceof rcSelect && dk.data.select === sel ) {
				_.extend( dk.data.settings, opts );
				return dk;
			}
		}

		if ( !sel ) {
			console.error("You must pass a select to rcSelect");
			return false;
		}

		if ( sel.length < 1 ) {
			console.error("You must have options inside your <select>: ", sel);
			return false;
		}

		if ( sel.nodeName === "SELECT" ) {
			return this.init( sel, opts );
		}
	},

	noop = function() {},
	_docListener,

	// DK default options
	defaults = {

		/**
		 * Called once after the DK element is inserted into the DOM.
		 * The value of `this` is the rcSelect object itself.
		 *
		 * @config initialize
		 * @type Function
		 *
		 */
		initialize: noop,

		/**
		 * Whether or not you would like rcSelect to render on mobile devices.
		 *
		 * @default false
		 * @property {boolean} mobile
		 * @type boolean
		 *
		 */
		mobile: false,

		/**
		 * Called whenever the value of the rcSelect select changes (by user action or through the API).
		 * The value of `this` is the rcSelect object itself.
		 *
		 * @config change
		 * @type Function
		 *
		 */
		change: noop,

		/**
		 * Called whenever the rcSelect select is opened. The value of `this` is the rcSelect object itself.
		 *
		 * @config open
		 * @type Function
		 *
		 */
		open: noop,

		/**
		 * Called whenever the rcSelect select is closed. The value of `this` is the rcSelect object itself.
		 *
		 * @config close
		 * @type Function
		 *
		 */
		close: noop,

		// Search method; "strict", "partial", or "fuzzy"
		/**
		 * `"strict"` - The search string matches exactly from the beginning of the option's text value (case insensitive).
		 *
		 * `"partial"` - The search string matches part of the option's text value (case insensitive).
		 *
		 * `"fuzzy"` - The search string matches the characters in the given order (not exclusively).
		 * The strongest match is selected first. (case insensitive).
		 *
		 * @default "strict"
		 * @config search
		 * @type string
		 *
		 */
		search: "strict",

		/**
		 * Bubble up the custom change event attached to rcSelect to the original element (select).
		 */
		bubble: true
	},

	// Common Utilities
	_ = {

		hasClass: function( elem, classname ) {
			var reg = new RegExp( "(^|\\s+)" + classname + "(\\s+|$)" );
			return elem && reg.test( elem.className );
		},

		addClass: function( elem, classname ) {
			if( elem && !_.hasClass( elem, classname ) ) {
				elem.className += " " + classname;
			}
		},

		removeClass: function( elem, classname ) {
			var reg = new RegExp( "(^|\\s+)" + classname + "(\\s+|$)" );
			elem && ( elem.className = elem.className.replace( reg, " " ) );
		},

		toggleClass: function( elem, classname ) {
			var fn = _.hasClass( elem, classname ) ? "remove" : "add";
			_[ fn + "Class" ]( elem, classname );
		},

		// Shallow object extend
		extend: function( obj ) {
			Array.prototype.slice.call( arguments, 1 ).forEach( function( source ) {
				if ( source ) { for ( var prop in source ) obj[ prop ] = source[ prop ]; }
			});

			return obj;
		},

		// Returns the top and left offset of an element
		offset: function( elem ) {
			var box = elem.getBoundingClientRect() || { top: 0, left: 0 },
				docElem = document.documentElement,
				offsetTop = isIE ? docElem.scrollTop : window.pageYOffset,
				offsetLeft = isIE ? docElem.scrollLeft : window.pageXOffset;

				return {
					top: box.top + offsetTop - docElem.clientTop,
					left: box.left + offsetLeft - docElem.clientLeft
				};
		},

		// Returns the top and left position of an element relative to an ancestor
		position: function( elem, relative ) {
			var pos = { top: 0, left: 0 };

			while ( elem && elem !== relative ) {
				pos.top += elem.offsetTop;
				pos.left += elem.offsetLeft;
				elem = elem.parentNode;
			}

			return pos;
		},

		// Returns the closest ancestor element of the child or false if not found
		closest: function( child, ancestor ) {
			while ( child ) {
				if ( child === ancestor ) { return child; }
				child = child.parentNode;
			}
			return false;
		},

		// Creates a DOM node with the specified attributes
		create: function( name, attrs ) {
			var a, node = document.createElement( name );

			if ( !attrs ) { attrs = {}; }

			for ( a in attrs ) {
				if ( attrs.hasOwnProperty( a ) ) {
					if ( a === "innerHTML" ) {
						node.innerHTML = attrs[ a ];
					} else {
						node.setAttribute( a, attrs[ a ] );
					}
				}
			}

			return node;
		},

		deferred: function( fn ) {
			return function() {
				var args = arguments,
					ctx = this;

				window.setTimeout(function() {
					fn.apply(ctx, args);
				}, 1);
			};
		}

	};


// Cache of DK Objects
rcSelect.cache = {};
rcSelect.uid = 0;


// Extends the DK objects's Prototype
rcSelect.prototype = {

	// Emulate some of HTMLSelectElement's methods

	/**
	 * Adds an element to the select. This option will not only add it to the original
	 * select, but create a rcSelect option and add it to the rcSelect select.
	 *
	 * @method add
	 * @param {string} elem   HTMLOptionElement
	 * @param {Node/Integer} before HTMLOptionElement/Index of Element
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.add("New option", 5);
	 *  ```
	 */
	add: function( elem, before ) {
		var text, option, i;

		if ( typeof elem === "string" ) {
			text = elem;
			elem = document.createElement("option");
			elem.text = text;
		}

		if ( elem.nodeName === "OPTION" ) {
			option = _.create( "li", {
				"class": "rc_select__option",
				"data-value": elem.value,
				"innerHTML": elem.text,
				"role": "option",
				"aria-selected": "false",
				"id": "dk" + this.data.cacheID + "-" + ( elem.id || elem.value.replace( " ", "-" ) )
			});

			_.addClass( option, elem.className );
			this.length += 1;

			if ( elem.disabled ) {
				_.addClass( option, "rc_select__option--disabled" );
				option.setAttribute( "aria-disabled", "true" );
			}

			if ( elem.hidden ) {
				_.addClass( option, "rc_select__option--hidden" );
				option.setAttribute( "aria-hidden", "true" );
			}

			this.data.select.add( elem, before );

			if ( typeof before === "number" ) {
				before = this.item( before );
			}

			i = this.options.indexOf( before );

			if ( i > -1 ) {
				before.parentNode.insertBefore( option, before );
				this.options.splice( i, 0, option );
			} else {
				this.data.elem.lastChild.appendChild( option );
				this.options.push( option );
			}

			option.addEventListener( "mouseover", this );

			if ( elem.selected ) {
				this.select( i );
			}
		}
	},

	/**
	 * Selects an option in the list at the desired index (negative numbers select from the end).
	 *
	 * @method item
	 * @param  {Integer} index Index of element (positive or negative)
	 * @return {Node}          The DK option from the list, or null if not found
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.item(4); //returns DOM node of index
	 *  ```
	 */
	item: function( index ) {
		index = index < 0 ? this.options.length + index : index;
		return this.options[ index ] || null;
	},

	/**
	 * Removes the option (from both the select and rcSelect) at the given index.
	 *
	 * @method  remove
	 * @param  {Integer} index Index of element (positive or negative)
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.remove(4);
	 *  ```
	 */
	remove: function( index ) {
		var dkOption = this.item( index );
		dkOption.parentNode.removeChild( dkOption );
		this.options.splice( index, 1 );
		this.data.select.remove( index );
		this.select( this.data.select.selectedIndex );
		this.length -= 1;
	},

	/**
	 * Initializes the DK Object
	 *
	 * @method init
	 * @private
	 * @param  {Node}   sel  [description]
	 * @param  {Object} opts Options to override defaults
	 * @return {Object}      The DK Object
	 */
	init: function( sel, opts ) {
		var i,
			dk =  rcSelect.build( sel, "dk" + rcSelect.uid );

		// Set some data on the DK Object
		this.data = {};
		this.data.select = sel;
		this.data.elem = dk.elem;
		this.data.settings = _.extend({}, defaults, opts );

		// Emulate some of HTMLSelectElement's properties

		/**
		 * Whether the form is currently disabled or not
		 *
		 * @property {boolean} disabled
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.disabled;
		 *  ```
		 */
		this.disabled = sel.disabled;

		/**
		 * The form associated with the select
		 *
		 * @property {node} form
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.form;
		 *  ```
		 */
		this.form = sel.form;

		/**
		 * The number of options in the select
		 *
		 * @property {integer} length
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.length;
		 *  ```
		 */
		this.length = sel.length;

		/**
		 * If this select is a multi-select
		 *
		 * @property {boolean} multiple
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.multiple;
		 *  ```
		 */
		this.multiple = sel.multiple;

		/**
		 * An array of rcSelect options
		 *
		 * @property {array} options
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.options;
		 *  ```
		 */
		this.options = dk.options.slice( 0 );

		/**
		 * An index of the first selected option
		 *
		 * @property {integer} selectedIndex
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.selectedIndex;
		 *  ```
		 */
		this.selectedIndex = sel.selectedIndex;

		/**
		 * An array of selected rcSelect options
		 *
		 * @property {array} selectedOptions
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.selectedOptions;
		 *  ```
		 */
		this.selectedOptions = dk.selected.slice( 0 );

		/**
		 * The current value of the select
		 *
		 * @property {string} value
		 * @example
		 *  ```js
		 *    var select = new rcSelect("#select");
		 *
		 *    select.value;
		 *  ```
		 */
		this.value = sel.value;

		// Add the DK Object to the cache
		this.data.cacheID = rcSelect.uid;
		rcSelect.cache[ this.data.cacheID ] = this;

		// Call the optional initialize function
		this.data.settings.initialize.call( this );

		// Increment the index
		rcSelect.uid += 1;

		// Add the change listener to the select
		if ( !this._changeListener ) {
			sel.addEventListener( "change", this );
			this._changeListener = true;
		}

		// Don't continue if we're not rendering on mobile
		if ( !( isMobile && !this.data.settings.mobile ) ) {

			// Insert the DK element before the original select
			sel.parentNode.insertBefore( this.data.elem, sel );
			sel.setAttribute( "data-dkCacheId", this.data.cacheID );

			// Bind events
			this.data.elem.addEventListener( "click", this );
			this.data.elem.addEventListener( "keydown", this );
			this.data.elem.addEventListener( "keypress", this );

			if ( this.form ) {
				this.form.addEventListener( "reset", this );
			}

			if ( !this.multiple ) {
				for ( i = 0; i < this.options.length; i++ ) {
					this.options[ i ].addEventListener( "mouseover", this );
				}
			}

			if ( !_docListener ) {
				document.addEventListener( "click", rcSelect.onDocClick );

				if ( isIframe ){
					// parent.document.addEventListener( "click", rcSelect.onDocClick ); -- Breaks the Shopify Window Frame
				}

				_docListener = true;
			}
		}

		return this;
	},

	/**
	 * Closes the DK dropdown
	 *
	 * @method close
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.close(); //closes dk dropdown
	 *  ```
	 */
	close: function() {
		var i,
			dk = this.data.elem;

		if ( !this.isOpen || this.multiple ) {
			return false;
		}

		for ( i = 0; i < this.options.length; i++ ) {
			_.removeClass( this.options[ i ], "rc_select__option--highlight" );
		}

		dk.lastChild.setAttribute( "aria-expanded", "false" );
		_.removeClass( dk.lastChild, "rc_select--options-highlight" );
		_.removeClass( dk, "rc_select--open-(up|down)" );
		this.isOpen = false;

		this.data.settings.close.call( this );
	},

	/**
	 * Opens the DK dropdown
	 *
	 * @method open
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.open(); //Opens the dk dropdown
	 *  ```
	 */
	open: _.deferred(function() {
		var dropHeight, above, below, direction, dkTop, dkBottom,
				dk = this.data.elem,
				dkOptsList = dk.lastChild,
				// Using MDNs suggestion for crossbrowser scrollY:
				// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
				supportPageOffset = window.pageXOffset !== undefined,
				isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
				scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

		dkTop = _.offset( dk ).top - scrollY;
		dkBottom = window.innerHeight - ( dkTop + dk.offsetHeight );

		if ( this.isOpen || this.multiple ) { return false; }

		dkOptsList.style.display = "block";
		dropHeight = dkOptsList.offsetHeight;
		dkOptsList.style.display = "";

		above = dkTop > dropHeight;
		below = dkBottom > dropHeight;
		direction = above && !below ? "-up" : "-down";

		this.isOpen = true;
		_.addClass( dk, "rc_select--open" + direction );
		dkOptsList.setAttribute( "aria-expanded", "true" );
		this._scrollTo( this.options.length - 1 );
		this._scrollTo( this.selectedIndex );

		this.data.settings.open.call( this );
	}),

	/**
	 * Disables or enables an option; if only a boolean is passed (or nothing),
	 * then the entire rcSelect will be disabled or enabled.
	 *
	 * @method disable
	 * @param  {Integer} elem     The element or index to disable
	 * @param  {Boolean}      disabled Value of disabled
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    // To disable the entire select
	 *    select.disable();
	 *
	 *    // To disable just an option with an index
	 *    select.disable(4, true);
	 *
	 *    // To re-enable the entire select
	 *    select.disable(false);
	 *
	 *    // To re-enable just an option with an index
	 *    select.disable(4, false);
	 *  ```
	 */
	disable: function( elem, disabled ) {
		var disabledClass = "rc_select__option--disabled";

		if ( arguments.length === 0 || typeof elem === "boolean" ) {
			disabled = elem === undefined ? true : false;
			elem = this.data.elem;
			disabledClass = "rc_select--disabled";
			this.disabled = disabled;
		}

		if ( disabled === undefined ) {
			disabled = true;
		}

		if ( typeof elem === "number" ) {
			elem = this.item( elem );
		}

		if (disabled) {
			elem.setAttribute( 'aria-disabled', true );
			_.addClass( elem, disabledClass );
		} else {
			elem.setAttribute( 'aria-disabled', false );
			_.removeClass( elem, disabledClass );
		}
	},

	/**
	 * Hides or shows an option.
	 *
	 * @method hide
	 * @param  {Integer} elem     The element or index to hide
	 * @param  {Boolean} hidden   Whether or not to hide the element
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    // To hide an option with an index
	 *    select.hide(4, true);
	 *
	 *    // To make an option visible with an index
	 *    select.hide(4, false);
	 *  ```
	 */
	hide: function( elem, hidden ) {
		var hiddenClass = "rc_select__option--hidden";

		if ( hidden === undefined ) {
			hidden = true;
		}

		elem = this.item( elem );

		if (hidden) {
			elem.setAttribute( 'aria-hidden', true );
			_.addClass( elem, hiddenClass );
		} else {
			elem.setAttribute( 'aria-hidden', false );
			_.removeClass( elem, hiddenClass );
		}
	},

	/**
	 * Selects an option from the list
	 *
	 * @method select
	 * @param  {String} elem     The element, index, or value to select
	 * @param  {Boolean}             disabled Selects disabled options
	 * @return {Node}                         The selected element
	 * @example
	 *  ```js
	 *    var elm = new rcSelect("#select");
	 *
	 *    // Select by index
	 *    elm.select(4); //selects & returns 5th item in the list
	 *
	 *    // Select by value
	 *    elm.select("AL"); // selects & returns option with the value "AL"
	 *  ```
	 */
	select: function( elem, disabled ) {
		var i, index, option, combobox,
			select = this.data.select;

		if ( typeof elem === "number" ) {
			elem = this.item( elem );
		}

		if ( typeof elem === "string" ) {
			for ( i = 0; i < this.length; i++ ) {
				if ( this.options[ i ].getAttribute( "data-value" ) === elem ) {
					elem = this.options[ i ];
				}
			}
		}

		// No element or enabled option
		if ( !elem || typeof elem === "string" ||
				 ( !disabled && _.hasClass( elem, "rc_select__option--disabled" ) ) ) {
			return false;
		}

		if ( _.hasClass( elem, "rc_select__option" ) ) {
			index = this.options.indexOf( elem );
			option = select.options[ index ];

			if ( this.multiple ) {
				_.toggleClass( elem, "rc_select__option--selected" );
				option.selected = !option.selected;

				if ( _.hasClass( elem, "rc_select__option--selected" ) ) {
					elem.setAttribute( "aria-selected", "true" );
					this.selectedOptions.push( elem );
				} else {
					elem.setAttribute( "aria-selected", "false" );
					index = this.selectedOptions.indexOf( elem );
					this.selectedOptions.splice( index, 1 );
				}
			} else {
				combobox = this.data.elem.firstChild;

				if ( this.selectedOptions.length ) {
					_.removeClass( this.selectedOptions[0], "rc_select__option--selected" );
					this.selectedOptions[0].setAttribute( "aria-selected", "false" );
				}

				_.addClass( elem, "rc_select__option--selected" );
				elem.setAttribute( "aria-selected", "true" );

				combobox.setAttribute( "aria-activedescendant", elem.id );
				combobox.className = "rc_select__selected " + option.className;
				combobox.innerHTML = option.text;

				this.selectedOptions[0] = elem;
				option.selected = true;
			}

			this.selectedIndex = select.selectedIndex;
			this.value = select.value;

			if ( !disabled ) {
				this.data.select.dispatchEvent( new CustomEvent("change", {bubbles: this.data.settings.bubble}));
			}

			return elem;
		}
	},

	/**
	 * Selects a single option from the list and scrolls to it (if the select is open or on multi-selects).
	 * Useful for selecting an option after a search by the user. Important to note: this doesn't close the
	 * dropdown when selecting. It keeps the dropdown open and scrolls to proper position.
	 *
	 * @method selectOne
	 * @param  {Integer} elem     The element or index to select
	 * @param  {Boolean}      disabled Selects disabled options
	 * @return {Node}                  The selected element
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.selectOne(4);
	 *  ```
	 */
	selectOne: function( elem, disabled ) {
		this.reset( true );
		this._scrollTo( elem );
		return this.select( elem, disabled );
	},

	/**
	 * Finds all options who's text matches a pattern (strict, partial, or fuzzy)
	 *
	 * `"strict"` - The search string matches exactly from the beginning of the
	 * option's text value (case insensitive).
	 *
	 * `"partial"` - The search string matches part of the option's text value
	 * (case insensitive).
	 *
	 * `"fuzzy"` - The search string matches the characters in the given order (not
	 * exclusively). The strongest match is selected first. (case insensitive).
	 *
	 * @method search
	 * @param  {String} string  The string to search for
	 * @param  {Integer} mode   How to search; "strict", "partial", or "fuzzy"
	 * @return {Boolean}  An Array of matched elements
	 */
	search: function( pattern, mode ) {
		var i, tokens, str, tIndex, sIndex, cScore, tScore, reg,
			options = this.data.select.options,
			matches = [];

		if ( !pattern ) { return this.options; }

		// Fix Mode
		mode = mode ? mode.toLowerCase() : "strict";
		mode = mode === "fuzzy" ? 2 : mode === "partial" ? 1 : 0;

		reg = new RegExp( ( mode ? "" : "^" ) + pattern, "i" );

		for ( i = 0; i < options.length; i++ ) {
			str = options[ i ].text.toLowerCase();

			// Fuzzy
			if ( mode == 2 ) {
				tokens = pattern.toLowerCase().split("");
				tIndex = sIndex = cScore = tScore = 0;

				while ( sIndex < str.length ) {
					if ( str[ sIndex ] === tokens[ tIndex ] ) {
						cScore += 1 + cScore;
						tIndex++;
					} else {
						cScore = 0;
					}

					tScore += cScore;
					sIndex++;
				}

				if ( tIndex === tokens.length ) {
					matches.push({ e: this.options[ i ], s: tScore, i: i });
				}

			// Partial or Strict (Default)
			} else {
				reg.test( str ) && matches.push( this.options[ i ] );
			}
		}

		// Sort fuzzy results
		if ( mode === 2 ) {
			matches = matches.sort( function ( a, b ) {
				return ( b.s - a.s ) || a.i - b.i;
			}).reduce( function ( p, o ) {
				p[ p.length ] = o.e;
				return p;
			}, [] );
		}

		return matches;
	},

	/**
	 * Brings focus to the proper DK element
	 *
	 * @method focus
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    $("#some_elm").on("click", function() {
	 *      select.focus();
	 *    });
	 *  ```
	 */
	focus: function() {
		if ( !this.disabled ) {
			( this.multiple ? this.data.elem : this.data.elem.children[0] ).focus();
		}
	},

	/**
	 * Resets the rcSelect and select to it's original selected options; if `clear` is `true`,
	 * It will select the first option by default (or no options for multi-selects).
	 *
	 * @method reset
	 * @param  {Boolean} clear Defaults to first option if True
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    // Reset to originally `selected` option
	 *    select.reset();
	 *
	 *    // Reset to first option in select
	 *    select.reset(true);
	 *  ```
	 */
	reset: function( clear ) {
		var i,
			select = this.data.select;

		this.selectedOptions.length = 0;

		for ( i = 0; i < select.options.length; i++ ) {
			select.options[ i ].selected = false;
			_.removeClass( this.options[ i ], "rc_select__option--selected" );
			this.options[ i ].setAttribute( "aria-selected", "false" );
			if ( !clear && select.options[ i ].defaultSelected ) {
				this.select( i, true );
			}
		}

		if ( !this.selectedOptions.length && !this.multiple ) {
			this.select( 0, true );
		}
	},

	/**
	 * Rebuilds the DK Object
	 * (use if HTMLSelectElement has changed)
	 *
	 * @method refresh
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    //... [change original select] ...
	 *
	 *    select.refresh();
	 *  ```
	 */
	refresh: function() {
		if(Object.keys(this).length > 0 && !( isMobile && !this.data.settings.mobile )) {
			this.dispose().init( this.data.select, this.data.settings );
		}
	},

	/**
	 * Removes the DK Object from the cache and the element from the DOM
	 *
	 * @method dispose
	 * @example
	 *  ```js
	 *    var select = new rcSelect("#select");
	 *
	 *    select.dispose();
	 *  ```
	 */
	dispose: function() {
		if (Object.keys(this).length > 0 && !( isMobile && !this.data.settings.mobile )) {
			delete rcSelect.cache[ this.data.cacheID ];
			this.data.elem.parentNode.removeChild( this.data.elem );
			this.data.select.removeAttribute( "data-dkCacheId" );
		}
		return this;
	},

	// Private Methods

	/**
	 * @method handleEvent
	 * @private
	 */
	handleEvent: function( event ) {
		if ( this.disabled ) { return; }

		switch ( event.type ) {
		case "click":
			this._delegate( event );
			break;
		case "keydown":
			this._keyHandler( event );
			break;
		case "keypress":
			this._searchOptions( event );
			break;
		case "mouseover":
			this._highlight( event );
			break;
		case "reset":
			this.reset();
			break;
		case "change":
			this.data.settings.change.call( this );
			break;
		}
	},


	/**
	 * @method delegate
	 * @private
	 */
	_delegate: function( event ) {
		var selection, index, firstIndex, lastIndex,
			target = event.target;

		if ( _.hasClass( target, "rc_select__option--disabled" ) ) {
			return false;
		}

		if ( !this.multiple ) {
			this[ this.isOpen ? "close" : "open" ]();
			if ( _.hasClass( target, "rc_select__option" ) ) { this.select( target ); }
		} else {
			if ( _.hasClass( target, "rc_select__option" ) ) {
				selection = window.getSelection();
				if ( selection.type === "Range" ) selection.collapseToStart();

				if ( event.shiftKey ) {
					firstIndex = this.options.indexOf( this.selectedOptions[0] );
					lastIndex = this.options.indexOf( this.selectedOptions[ this.selectedOptions.length - 1 ] );
					index =  this.options.indexOf( target );

					if ( index > firstIndex && index < lastIndex ) index = firstIndex;
					if ( index > lastIndex && lastIndex > firstIndex ) lastIndex = firstIndex;

					this.reset( true );

					if ( lastIndex > index ) {
						while ( index < lastIndex + 1 ) { this.select( index++ ); }
					} else {
						while ( index > lastIndex - 1 ) { this.select( index-- ); }
					}
				} else if ( event.ctrlKey || event.metaKey ) {
					this.select( target );
				} else {
					this.reset( true );
					this.select( target );
				}
			}
		}
	},

	/**
	 * @method highlight
	 * @private
	 */
	_highlight: function( event ) {
		var i, option = event.target;

		if ( !this.multiple ) {
			for ( i = 0; i < this.options.length; i++ ) {
				_.removeClass( this.options[ i ], "rc_select__option--highlight" );
			}

			_.addClass( this.data.elem.lastChild, "rc_select--options-highlight" );
			_.addClass( option, "rc_select__option--highlight" );
		}
	},

	/**
	 * @method keyHandler
	 * @private
	 */
	_keyHandler: function( event ) {
		var lastSelected, j,
			selected = this.selectedOptions,
			options = this.options,
			i = 1,
			keys = {
				tab: 9,
				enter: 13,
				esc: 27,
				space: 32,
				up: 38,
				down: 40
			};

		switch ( event.keyCode ) {
		case keys.up:
			i = -1;
			// deliberate fallthrough
		case keys.down:
			event.preventDefault();
			lastSelected = selected[ selected.length - 1 ];

			if ( _.hasClass( this.data.elem.lastChild, "rc_select--options-highlight" ) ) {
				_.removeClass( this.data.elem.lastChild, "rc_select--options-highlight" );
				for ( j = 0; j < options.length; j++ ) {
					if ( _.hasClass( options[ j ], "rc_select__option--highlight" ) ) {
						_.removeClass( options[ j ], "rc_select__option--highlight" );
						lastSelected = options[ j ];
					}
				}
			}

			i = options.indexOf( lastSelected ) + i;

			if ( i > options.length - 1 ) {
				i = options.length - 1;
			} else if ( i < 0 ) {
				i = 0;
			}

			if ( !this.data.select.options[ i ].disabled ) {
				this.reset( true );
				this.select( i );
				this._scrollTo( i );
			}
			break;
		case keys.space:
			if ( !this.isOpen ) {
				event.preventDefault();
				this.open();
				break;
			}
			// deliberate fallthrough
		case keys.tab:
		case keys.enter:
			for ( i = 0; i < options.length; i++ ) {
				if ( _.hasClass( options[ i ], "rc_select__option--highlight" ) ) {
					this.select( i );
				}
			}
			// deliberate fallthrough
		case keys.esc:
			if ( this.isOpen ) {
				event.preventDefault();
				this.close();
			}
			break;
		}
	},

	/**
	 * @method searchOptions
	 * @private
	 */
	_searchOptions: function( event ) {
		var results,
			self = this,
			keyChar = String.fromCharCode( event.keyCode || event.which ),

			waitToReset = function() {
				if ( self.data.searchTimeout ) {
					clearTimeout( self.data.searchTimeout );
				}

				self.data.searchTimeout = setTimeout(function() {
					self.data.searchString = "";
				}, 1000 );
			};

		if ( this.data.searchString === undefined ) {
			this.data.searchString = "";
		}

		waitToReset();

		this.data.searchString += keyChar;
		results = this.search( this.data.searchString, this.data.settings.search );

		if ( results.length ) {
			if ( !_.hasClass( results[0], "rc_select__option--disabled" ) ) {
				this.selectOne( results[0] );
			}
		}
	},

	/**
	 * @method scrollTo
	 * @private
	 */
	_scrollTo: function( option ) {
		var optPos, optTop, optBottom,
			dkOpts = this.data.elem.lastChild;

		if ( option === -1 || ( typeof option !== "number" && !option ) ||
				( !this.isOpen && !this.multiple ) ) {
			return false;
		}

		if ( typeof option === "number" ) {
			option = this.item( option );
		}

		optPos = _.position( option, dkOpts ).top;
		optTop = optPos - dkOpts.scrollTop;
		optBottom = optTop + option.offsetHeight;

		if ( optBottom > dkOpts.offsetHeight ) {
			optPos += option.offsetHeight;
			dkOpts.scrollTop = optPos - dkOpts.offsetHeight;
		} else if ( optTop < 0 ) {
			dkOpts.scrollTop = optPos;
		}
	}
};

// Static Methods

/**
 * Builds the rcSelect element from a select element
 *
 * @method  build
 * @private
 * @param  {Node} sel The HTMLSelectElement
 * @return {Object}   An object containing the new DK element and it's options
 */
rcSelect.build = function( sel, idpre ) {
	var selOpt, optList, i,
		options = [],

		ret = {
			elem: null,
			options: [],
			selected: []
		},

		addOption = function ( node ) {
			var option, optgroup, optgroupList, i,
				children = [];

			switch ( node.nodeName ) {
			case "OPTION":
				option = _.create( "li", {
					"class": "rc_select__option ",
					"data-value": node.value,
					"innerHTML": node.text,
					"role": "option",
					"aria-selected": "false",
					"id": idpre + "-" + ( node.id || node.value.replace( " ", "-" ) )
				});

				_.addClass( option, node.className );

				if ( node.disabled ) {
					_.addClass( option, "rc_select__option--disabled" );
					option.setAttribute( "aria-disabled", "true" );
				}

				if ( node.hidden ) {
					_.addClass( option, "rc_select__option--hidden" );
					option.setAttribute( "aria-hidden", "true" );
				}

				if ( node.selected ) {
					_.addClass( option, "rc_select__option--selected" );
					option.setAttribute( "aria-selected", "true" );
					ret.selected.push( option );
				}

				ret.options.push( this.appendChild( option ) );
				break;
			case "OPTGROUP":
				optgroup = _.create( "li", { "class": "rc_select__optgroup" });

				if ( node.label ) {
					optgroup.appendChild( _.create( "div", {
						"class": "rc_select__optgroup--label",
						"innerHTML": node.label
					}));
				}

				optgroupList = _.create( "ul", {
					"class": "rc_select__optgroup--options"
				});

				for ( i = node.children.length; i--; children.unshift( node.children[ i ] ) );
				children.forEach( addOption, optgroupList );

				this.appendChild( optgroup ).appendChild( optgroupList );
				break;
			}
		};

	ret.elem = _.create( "div", {
		"class": "rc_select" + ( sel.multiple ? "--multi" : "" )
	});

	optList = _.create( "ul", {
		"class": "rc_select--options",
		"id": idpre + "-listbox",
		"role": "listbox"
	});

	if (sel.disabled) {
		_.addClass( ret.elem, "rc_select--disabled" );
		ret.elem.setAttribute( 'aria-disabled', true );
	}
	ret.elem.id = idpre + ( sel.id ? "-" + sel.id : "" );
	_.addClass( ret.elem, sel.className );

	if ( !sel.multiple ) {
		selOpt = sel.options[ sel.selectedIndex ];
		ret.elem.appendChild( _.create( "div", {
			"class": "rc_select__selected " + selOpt.className,
			"tabindex": sel.tabindex || 0,
			"innerHTML": selOpt ? selOpt.text : '&nbsp;',
			"id": idpre + "-combobox",
			"aria-live": "assertive",
			"aria-owns": optList.id,
			"role": "combobox"
		}));
		optList.setAttribute( "aria-expanded", "false" );
	} else {
		ret.elem.setAttribute( "tabindex", sel.getAttribute( "tabindex" ) || "0" );
		optList.setAttribute( "aria-multiselectable", "true" );
	}

	for ( i = sel.children.length; i--; options.unshift( sel.children[ i ] ) );
	options.forEach( addOption, ret.elem.appendChild( optList ) );

	return ret;
};

/**
 * Focus DK Element when corresponding label is clicked; close all other DK's
 *
 * @method  onDocClick
 * @private
 * @param {Object} event  Event from document click
 */
rcSelect.onDocClick = function( event ) {
	var tId, i;

	if (event.target.nodeType !== 1) {
		return false;
	}

	if ( ( tId = event.target.getAttribute( "data-dkcacheid" ) ) !== null ) {
		rcSelect.cache[ tId ].focus();
	}

	for ( i in rcSelect.cache ) {
		if ( !_.closest( event.target, rcSelect.cache[ i ].data.elem ) && i !== tId ) {
			rcSelect.cache[ i ].disabled || rcSelect.cache[ i ].close();
		}
	}
};


// Add jQuery method
if ( jQuery !== undefined ) {
	jQuery.fn.rcSelect = function () {
		var args = Array.prototype.slice.call( arguments );
		return jQuery( this ).each(function() {
			if ( !args[0] || typeof args[0] === 'object' ) {
				new rcSelect( this, args[0] || {} );
			} else if ( typeof args[0] === 'string' ) {
				rcSelect.prototype[ args[0] ].apply( new rcSelect( this ), args.slice( 1 ) );
			}
		});
	};
}

return rcSelect;

}));

(function() {

	function wrapElement(elem, wrapper) {
		var parent = elem.parentNode;
		parent.insertBefore(wrapper, elem);
		wrapper.appendChild(elem);

		//will have to add caret element instead of using pseudo-elements
		//if input has predefined width, using :after blocks us from manipulating position later
		var caret = document.createElement('span');
		caret.setAttribute('aria-hidden', 'true');
		caret.className = 'fa fa-caret-down';
		wrapper.appendChild(caret);

		//have to update caret position depending on elem width
		var rect = elem.getBoundingClientRect();
		var inputWidth = Math.round(rect.right - rect.left);
		if (inputWidth) {
			caret.style.setProperty('left', 'calc(' + inputWidth + 'px - 40px)');
		} else {
			caret.style.setProperty('left', 'calc(100% - 40px)');
		}
	}

	function toggleCaret(wrapper, open) {
		wrapper.className = 'rc_selectfilter__wrapper';
		wrapper.classList.add(open ? 'rc_selectfilter__wrapper--opened' : 'rc_selectfilter__wrapper--closed');
		
		var caret = wrapper.querySelector('span.fa');
		caret.className = 'fa';
		caret.classList.add(open ? 'fa-caret-up' : 'fa-caret-down');
	}

	// default class selector will be .rc_selectfilter
	function rcSelectFilter(config) {
		var options = {
			url: '',
			selector: null,
			delay: 366, // according to Mike this should be the delay time
			keybindEvent: "keyup",
			data: [],
			fieldLabel: 'label',
			fieldId: 'label',
			templateFn: function(opt) {
				return opt[options.fieldLabel];
			},
			onSelect: null,//function(obj) {},
		};

		for (var k in config) { 
			if (options.hasOwnProperty(k)) {
				options[k] = config[k];
			}
		}

		if (config.fieldLabel && !config.fieldId) {
			options.fieldId = options.fieldLabel;
		}


		//check if selector is cssSelector/jQueryElem/nodeElem and get the nodeElement ref
		var elem = typeof options.selector === 'object' ? options.selector.jquery ? options.selector[0] : options.selector : document.querySelector(options.selector);
		var self = this;
		var currentValue = '';
		var selectedId = null;


		self.optionsContainer = document.createElement('ul');
		self.optionsContainer.className = 'rc_selectfilter__options';

		var wrapper = document.createElement('div');
		wrapper.className = 'rc_selectfilter__wrapper rc_selectfilter__wrapper--closed';

		//perform magic of wrapping elem
		wrapElement(elem, wrapper);

		//<i class="fa fa-caret-down" aria-hidden="true"></i>
		//<i class="fa fa-caret-up" aria-hidden="true"></i>

		//avoid browser autocomplete on autocomplete, HA!
		elem.setAttribute('autocomplete', 'off');

		var innerTemplateFn = function(opt) {
			return '<li data-value="' + opt[options.fieldId] + '" class="rc_selectfilter__option">' + options.templateFn(opt) + '</li>';
		}

		//build query function specific for this element
		self.queryFn = function(q) {
			var keyProp = options.fieldLabel;

			if (q !== '') {
				var regX = new RegExp(q, 'i');
				return options.data
					.filter(function(opt) {
						return regX.test(opt[keyProp]);
					})
					.map(innerTemplateFn);
			} else {
				return options.data.map(innerTemplateFn);
			}
		}

		var updateSelectedModel = function(val, obj) {
			elem.value = val;

			if (val !== currentValue) {
				currentValue = val;

				if (obj) {
					selectedId = obj[options.fieldId];	
				} else {
					selectedId = null;
				}

				if (options.onSelect) options.onSelect(obj);
			}
		}

		self.showAll = function() {
			var optsAsHTML = this.queryFn('');
			if (optsAsHTML.length) {
				this.optionsContainer.innerHTML = optsAsHTML.join('');

				this.updateContainerPosition(null, optsAsHTML.length);
			} else {
				this.optionsContainer.style.display = 'none';
				toggleCaret(wrapper, false);
			}
		}

		self.search = function(q) {
			var optsAsHTML = this.queryFn(q);
			if (optsAsHTML.length) {
				this.optionsContainer.innerHTML = optsAsHTML.join('');

				this.updateContainerPosition(null, optsAsHTML.length);
			} else {
				this.optionsContainer.style.display = 'none';
				toggleCaret(wrapper, false);
			}
		}

		var fireSearchHandler = function(ev) {
			var key = window.event ? ev.keyCode : ev.which;
			if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
				var val = ev.target.value;
				//if (val) {
				clearTimeout(self.timer);
				// do logic here for building suggestions
				self.timer = setTimeout(function() {
					//query should be the function that performs the search action and comes up with the results to show as options
					self.search(val);
				}, options.delay)
				//}
			}
		}

		var blurHandler = function(ev) {
			var isOverContainer = document.querySelector('.rc_selectfilter__options:hover');
			if (!isOverContainer) {
				self.optionsContainer.style.display = 'none';
				toggleCaret(wrapper, false);

				if (elem.value === '') {
					//if field is completely cleared unselect option
					updateSelectedModel('');
				} else {
					//if field is modified update only field value
					if (currentValue && currentValue !== elem.value) {
						updateSelectedModel(currentValue);	
					}
				}
			} else if (document.activeElement !== elem) {
				setTimeout(function() {
					elem.focus();
				}, 100);
			}
		}

		var addHoverClass = function(ev) {
			var selectedOpt = self.optionsContainer.querySelector('.rc_selectfilter__option--highlight');

			if (selectedOpt)
				selectedOpt.classList.remove('rc_selectfilter__option--highlight');

			var target = ev.target;
			while (target && !target.classList.contains('rc_selectfilter__option')) {
				target = target.parentElement;
			}

			if (target) target.classList.add('rc_selectfilter__option--highlight');
		}

		var selectHandler = function(ev) {
			var target = ev.target;
			while (target && !target.classList.contains('rc_selectfilter__option')) {
				target = target.parentElement;
			}

			var val = target.getAttribute('data-value');

			var obj = options.data.filter(function (el) {
				return el[options.fieldId] == val;
			})[0];

			updateSelectedModel(obj[options.fieldLabel], obj);

			self.optionsContainer.style.display = 'none';
			toggleCaret(wrapper, false);
		}

		var focusHandler = function(ev) {
			var isOverContainer = document.querySelector('.rc_selectfilter__options:hover');
			if (!isOverContainer) {
				self.search(elem.value);
			} else {
				self.optionsContainer.style.display = 'none';
				toggleCaret(wrapper, false);
			}
		}

		elem.addEventListener('click', focusHandler);

		elem.addEventListener('blur', blurHandler);
		elem.addEventListener(options.keybindEvent, fireSearchHandler);
		self.optionsContainer.addEventListener('mouseover', addHoverClass);
		self.optionsContainer.addEventListener('click', selectHandler);


		self.updateContainerPosition = function(ev, show){
            var rect = elem.getBoundingClientRect();
            self.optionsContainer.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) ) + 'px';
            self.optionsContainer.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) - 1) + 'px';
            self.optionsContainer.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth

            if (show) {
            	self.optionsContainer.style.display = 'block';
            	toggleCaret(wrapper, show);
            } else {
            	self.optionsContainer.style.display = 'none';
            	toggleCaret(wrapper, show);
            }
            
        }

        window.addEventListener('resize', self.updateContainerPosition);

		document.body.appendChild(self.optionsContainer);

		//PUBLIC METHODS
		self.hasValue = function() {
			return selectedId !== null;
		}

		self.getValue = function() {
			return selectedId;
		}

		self.clear = function() {
			updateSelectedModel('');
		}

		self.destroy = function() {
			elem.value = '';
			elem.removeEventListener('blur', blurHandler);
			elem.removeEventListener(options.keybindEvent, fireSearchHandler);
			elem.removeEventListener('click', focusHandler);
			self.optionsContainer.removeEventListener('mouseover', addHoverClass);
			self.optionsContainer.removeEventListener('click', selectHandler);
			window.removeEventListener('resize', self.updateContainerPosition);
			document.body.removeChild(self.optionsContainer);
			delete elem.rcSelectFilter;
		}

		//for now let's not add it to the element since there is no point
		elem.rcSelectFilter = {
			hasValue: self.hasValue,
			getValue: self.getValue,
			clear: self.clear,
			destroy: self.destroy,
		};
	}

	if (window.ReCharge) {
		window.ReCharge['rcSelectFilter'] = rcSelectFilter;
	} else {
		window.rcSelectFilter = rcSelectFilter;
	}

})();