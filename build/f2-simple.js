(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["F2"] = factory();
	else
		root["F2"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * @fileOverview 基础工具类
 * @author dxq613@gmail.com
 */
var objectPrototype = Object.prototype;
var toString = objectPrototype.toString;
var MAX_LEVEL = 5;

var Util = void 0;

function _deepMix(dst, src, level) {
  level = level || 0;
  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      var value = src[k];
      if (value !== null && Util.isPlainObject(value)) {
        if (!Util.isPlainObject(dst[k])) {
          dst[k] = {};
        }
        if (level < MAX_LEVEL) {
          _deepMix(dst[k], src[k], level + 1);
        } else {
          dst[k] = src[k];
        }
      } else if (Util.isArray(value)) {
        dst[k] = [];
        dst[k] = dst[k].concat(value);
      } else if (value !== undefined) {
        dst[k] = src[k];
      }
    }
  }
}

function _mix(dist, obj) {
  for (var k in obj) {
    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
      dist[k] = obj[k];
    }
  }
}

/**
 * @class Util
 * @singleton
 * 绘图的工具类
 */
Util = {
  /**
   * 使第一个字母变成大写
   * @param  {String} s 字符串
   * @return {String} 首字母大写后的字符串
   */
  upperFirst: function upperFirst(s) {
    s += '';
    return s.charAt(0).toUpperCase() + s.substring(1);
  },
  lowerFirst: function lowerFirst(s) {
    s += '';
    return s.charAt(0).toLowerCase() + s.substring(1);
  },

  /**
   * 判断是否是字符串
   * @param {*} value 判定的值
   * @return {Boolean} 是否是字符串
   */
  isString: function isString(value) {
    return typeof value === 'string';
  },

  /**
   * 判断是否数字
   * @param {*} value 判定的值
   * @return {Boolean} 是否数字
   */
  isNumber: function isNumber(value) {
    return typeof value === 'number';
  },

  /**
   * 是否是布尔类型
   * @param {Object} value 测试的值
   * @return {Boolean} 是否布尔类型
   */
  isBoolean: function isBoolean(value) {
    return typeof value === 'boolean';
  },

  /**
   * 是否为函数
   * @param  {*} fn 对象
   * @return {Boolean}  是否函数
   */
  isFunction: function isFunction(fn) {
    return typeof fn === 'function';
  },

  /**
   * 是否数组
   * @method
   * @param  {*}  value 是否数组
   * @return {Boolean}  是否数组
   */
  isArray: 'isArray' in Array ? Array.isArray : function (value) {
    return toString.call(value) === '[object Array]';
  },
  /**
   * 是否日期
   * @param  {*}  value 对象
   * @return {Boolean}  是否日期
   */
  isDate: function isDate(value) {
    return toString.call(value) === '[object Date]';
  },
  isNil: function isNil(o) {
    return o === undefined || o === null;
  },

  /**
   * 是否是javascript对象
   * @param {Object} value The value to test
   * @return {Boolean} 返回判定结果
   */
  isObject: toString.call(null) === '[object Object]' ? function (value) {
    // check ownerDocument here as well to exclude DOM nodes
    return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
  } : function (value) {
    return toString.call(value) === '[object Object]';
  },
  isPlainObject: function isPlainObject(o) {
    if (!Util.isObject(o)) return false;
    if (Object.getPrototypeOf(o) === null) {
      return true;
    }
    var proto = o;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(o) === proto;
  },
  deepMix: function deepMix() {
    var args = new Array(arguments.length);
    var length = args.length;
    for (var i = 0; i < length; i++) {
      args[i] = arguments[i];
    }
    var rst = args[0];
    for (var _i = 1; _i < length; _i++) {
      var source = args[_i];
      _deepMix(rst, source);
    }
    return rst;
  },

  /**
   * 合并数据, 简单的合并，仅支持最多3个对象
   * @param {Object} dist 源对象
   * @param {Object} obj1 待复制对象1
   * @param {Object} obj2 待复制对象2
   * @param {Object} obj3 待复制对象3
   * @return {Object} 将数据合并到第一个
   */
  mix: function mix(dist, obj1, obj2, obj3) {
    if (obj1) {
      _mix(dist, obj1);
    }

    if (obj2) {
      _mix(dist, obj2);
    }

    if (obj3) {
      _mix(dist, obj3);
    }
    return dist;
  },
  indexOf: function indexOf(arr, element) {
    return arr.indexOf(element);
  },

  /**
   * 遍历数组或者对象
   * @param {Object|Array} elements 数组中的元素或者对象的值
   * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){}
   */
  each: function each(elements, func) {
    if (!elements) {
      return;
    }
    if (elements.length) {
      for (var i = 0, len = elements.length; i < len; i++) {
        var rst = func(elements[i], i);
        if (rst === false) {
          break;
        }
      }
    } else {
      for (var k in elements) {
        if (elements.hasOwnProperty(k)) {
          var _rst = func(elements[k], k);
          if (_rst === false) {
            break;
          }
        }
      }
    }
  },
  fixedBase: function fixedBase(v, base) {
    var str = base.toString();
    var index = str.indexOf('.');
    if (index === -1) {
      return Math.round(v);
    }
    var length = str.substr(index + 1).length;
    if (length > 20) {
      length = 20;
    }
    return parseFloat(v.toFixed(length));
  },

  /**
  * 封装事件，便于使用上下文this,和便于解除事件时使用
  * @protected
  * @param  {Object} obj   对象
  * @param  {String} action 事件名称
  * @return {Function}        返回事件处理函数
  */
  wrapBehavior: function wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action];
    }
    var method = function method(e) {
      obj[action](e);
    };
    obj['_wrap_' + action] = method;
    return method;
  },

  /**
   * 获取封装的事件
   * @protected
   * @param  {Object} obj   对象
   * @param  {String} action 事件名称
   * @return {Function}        返回事件处理函数
   */
  getWrapBehavior: function getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
  },
  parsePadding: function parsePadding(padding) {
    var top = void 0;
    var right = void 0;
    var bottom = void 0;
    var left = void 0;

    if (Util.isNumber(padding) || Util.isString(padding)) {
      top = bottom = left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    }

    return [top, right, bottom, left];
  }
};

Util.Array = {
  merge: function merge(dataArray) {
    var rst = [];
    for (var i = 0, len = dataArray.length; i < len; i++) {
      rst = rst.concat(dataArray[i]);
    }
    return rst;
  },
  values: function values(data, name) {
    var rst = [];
    var tmpMap = {};
    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];
      if (!Util.isNil(value)) {
        if (!Util.isArray(value)) {
          if (!tmpMap[value]) {
            rst.push(value);
            tmpMap[value] = true;
          }
        } else {
          Util.each(value, function (val) {
            if (!tmpMap[val]) {
              rst.push(val);
              tmpMap[val] = true;
            }
          });
        }
      }
    }
    return rst;
  },
  firstValue: function firstValue(data, name) {
    var rst = null;
    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];
      if (!Util.isNil(value)) {
        if (Util.isArray(value)) {
          rst = value[0];
        } else {
          rst = value;
        }
        break;
      }
    }
    return rst;
  },
  group: function group(data, condition) {
    if (!condition) {
      return [data];
    }
    var groups = Util.Array.groupToMap(data, condition);
    var array = [];
    for (var i in groups) {
      array.push(groups[i]);
    }
    return array;
  },
  groupToMap: function groupToMap(data, condition) {
    if (!condition) {
      return {
        0: data
      };
    }
    if (!Util.isFunction(condition)) {
      var paramsCondition = Util.isArray(condition) ? condition : condition.replace(/\s+/g, '').split('*');
      condition = function condition(row) {
        var unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
        for (var i = 0, l = paramsCondition.length; i < l; i++) {
          unique += row[paramsCondition[i]] && row[paramsCondition[i]].toString();
        }
        return unique;
      };
    }

    var groups = {};
    for (var i = 0, len = data.length; i < len; i++) {
      var row = data[i];
      var key = condition(row);
      if (groups[key]) {
        groups[key].push(row);
      } else {
        groups[key] = [row];
      }
    }

    return groups;
  },
  remove: function remove(arr, obj) {
    var index = arr.indexOf(obj);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  },
  equals: function equals(a1, a2) {
    if (a1 === a2) {
      return true;
    }
    if (!a1 || !a2) {
      return false;
    }

    if (a1.length !== a2.length) {
      return false;
    }
    var rst = true;
    for (var i = 0, len = a1.length; i < len; i++) {
      if (a1[i] !== a2[i]) {
        rst = false;
        break;
      }
    }
    return rst;
  }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Theme = __webpack_require__(26);
var Util = __webpack_require__(0);

/**
 * @class 全局配置项
 */
var Global = {
  // 预先定义的度量
  scales: {
    nice: true
  },
  // 宽度
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.999999,
    multiplePie: 3 / 4,
    dodgeMargin: 0
  },
  // 动画降频倍数
  animateReduceMultiple: 1,
  // 虚线配置
  lineDash: [5, 15]
};

Global.setTheme = function (theme) {
  Util.mix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Element = __webpack_require__(19);

var Shape = function (_Element) {
  _inherits(Shape, _Element);

  function Shape() {
    _classCallCheck(this, Shape);

    return _possibleConstructorReturn(this, _Element.apply(this, arguments));
  }

  Shape.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Element.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      isShape: true
    });
  };

  Shape.prototype.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self.get('attrs');
    self.createPath(context);
    var originOpacity = context.globalAlpha;
    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;
      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }
    if (self.hasStroke()) {
      var lineWidth = attrs.lineWidth;
      if (lineWidth > 0) {
        var strokeOpacity = attrs.strokeOpacity;
        if (!Util.isNil(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }
        context.stroke();
      }
    }
  };

  Shape.prototype.getBBox = function getBBox() {
    var bbox = this._attrs.bbox;
    // 延迟计算
    if (!bbox) {
      bbox = this.calculateBox();
      if (bbox) {
        bbox.x = bbox.minX;
        bbox.y = bbox.minY;
        bbox.width = bbox.maxX - bbox.minX;
        bbox.height = bbox.maxY - bbox.minY;
      }
      this._attrs.bbox = bbox;
    }
    return bbox;
  };

  /**
   * @protected
   * 计算包围盒
   * @return {Object} 包围盒
   */


  Shape.prototype.calculateBox = function calculateBox() {
    return null;
  };

  Shape.prototype.clearTotalMatrix = function clearTotalMatrix() {
    this._attrs.totalMatrix = null;
  };

  Shape.prototype.createPath = function createPath() {};

  return Shape;
}(Element);

module.exports = Shape;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Base = __webpack_require__(9);
var GROUP_ATTRS = ['color', 'size', 'shape'];
var FIELD_ORIGIN = '_origin';
var FIELD_ORIGIN_Y = '_originY';
var Global = __webpack_require__(1);
var Attr = __webpack_require__(27);
var Shape = __webpack_require__(4);
var Adjust = __webpack_require__(11);

function parseFields(field) {
  if (Util.isArray(field)) {
    return field;
  }
  if (Util.isString(field)) {
    return field.split('*');
  }
  return [field];
}

/**
 * 图形的基类
 * @class Geom
 */

var Geom = function (_Base) {
  _inherits(Geom, _Base);

  function Geom() {
    _classCallCheck(this, Geom);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  Geom.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * core的类型
       * @type {String}
       */
      type: null,
      /**
       * 图形的数据集合
       * @type {Array}
       */
      data: null,
      /**
       * 属性的键值对
       * @type {Object}
       */
      attrs: {},

      scales: {},

      /**
       * 画布
       * @type {Canvas}
       */
      container: null,
      /**
       * 图形样式
       * @type {Object}
       */
      styleOptions: null,

      chart: null,

      shapeType: '',

      shapeDatas: [],

      /**
       * 是否生成多个点来绘制图形
       * @protected
       * @type {Boolean}
       */
      generatePoints: false,

      attrOptions: {},

      sortable: false,
      /**
       * 图形的底边是否从 0 开始，默认为 0，即从 0 开始，
       * 否则从最小值开始
       * @type {Boolean}
      */
      startOnZero: true
    };
  };

  Geom.prototype.init = function init() {
    var self = this;
    self._initAttrs();
    var dataArray = self._processData();
    if (self.get('adjust')) {
      self._adjustData(dataArray);
    }
    self.set('dataArray', dataArray);
  };

  // 获取分组的度量


  Geom.prototype._getGroupScales = function _getGroupScales() {
    var self = this;
    var scales = [];
    Util.each(GROUP_ATTRS, function (attrName) {
      var attr = self.getAttr(attrName);
      if (attr) {
        var attrScales = attr.scales;
        Util.each(attrScales, function (scale) {
          if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
            scales.push(scale);
          }
        });
      }
    });
    return scales;
  };

  // 分组数据


  Geom.prototype._groupData = function _groupData(data) {
    var self = this;
    var groupScales = self._getGroupScales();
    if (groupScales.length) {
      var names = [];
      Util.each(groupScales, function (scale) {
        names.push(scale.field);
      });
      return Util.Array.group(data, names);
    }
    return [data];
  };

  // 设置属性配置信息


  Geom.prototype._setAttrOptions = function _setAttrOptions(attrName, attrCfg) {
    var options = this.get('attrOptions');
    options[attrName] = attrCfg;
  };

  Geom.prototype._createAttrOption = function _createAttrOption(attrName, field, cfg, defaultValues) {
    var attrCfg = {};
    attrCfg.field = field;
    if (cfg) {
      if (Util.isFunction(cfg)) {
        attrCfg.callback = cfg;
      } else {
        attrCfg.values = cfg;
      }
    } else {
      attrCfg.values = defaultValues;
    }
    this._setAttrOptions(attrName, attrCfg);
  };

  // step 1: init attrs


  Geom.prototype._initAttrs = function _initAttrs() {
    var self = this;
    var attrs = self.get('attrs');
    var attrOptions = self.get('attrOptions');
    var coord = self.get('coord');

    for (var type in attrOptions) {
      if (attrOptions.hasOwnProperty(type)) {
        var option = attrOptions[type];
        var className = Util.upperFirst(type);
        var fields = parseFields(option.field);
        if (type === 'position') {
          option.coord = coord;
        }
        var scales = [];
        for (var i = 0, len = fields.length; i < len; i++) {
          var field = fields[i];
          var scale = self._createScale(field);
          scales.push(scale);
        }
        if (type === 'position') {
          var yScale = scales[1];
          if (self.get('type') === 'interval') {
            // 柱状图起始点从0点开始
            if (yScale.values.length) {
              yScale.change({
                min: Math.min(0, yScale.min),
                max: Math.max.apply(null, yScale.values)
              });
            }
          }
          // 饼图需要填充满整个空间
          if (coord.type === 'polar' && coord.transposed) {
            if (yScale.values.length) {
              yScale.change({
                nice: false,
                min: 0,
                max: Math.max.apply(null, yScale.values)
              });
            }
          }
        }

        option.scales = scales;
        var attr = new Attr[className](option);
        attrs[type] = attr;
      }
    }
  };

  Geom.prototype._createScale = function _createScale(field) {
    var sortable = this.get('sortable');
    var scales = this.get('scales');
    var scale = scales[field];
    if (!scale) {
      scale = this.get('chart').createScale(field, sortable);
      scales[field] = scale;
    }
    return scale;
  };

  // 处理数据


  Geom.prototype._processData = function _processData() {
    var self = this;
    var data = this.get('data');
    var dataArray = [];
    var groupedArray = this._groupData(data);
    for (var i = 0, len = groupedArray.length; i < len; i++) {
      var subData = groupedArray[i];
      var tempData = self._saveOrigin(subData);
      if (this.hasAdjust('dodge')) {
        self._numberic(tempData);
      }
      dataArray.push(tempData);
    }
    return dataArray;
  };

  Geom.prototype._saveOrigin = function _saveOrigin(data) {
    var rst = [];
    for (var i = 0, len = data.length; i < len; i++) {
      var origin = data[i];
      var obj = {};
      for (var k in origin) {
        obj[k] = origin[k];
      }
      // const obj = Util.mix({}, origin);
      obj[FIELD_ORIGIN] = origin;
      rst.push(obj);
    }
    return rst;
  };

  // step 2.3 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理


  Geom.prototype._numberic = function _numberic(data) {
    var positionAttr = this.getAttr('position');
    var scales = positionAttr.scales;
    for (var j = 0, len = data.length; j < len; j++) {
      var obj = data[j];
      var count = Math.min(2, scales.length);
      for (var i = 0; i < count; i++) {
        var scale = scales[i];
        if (scale.isCategory) {
          var field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    }
  };

  // 进行数据调整


  Geom.prototype._adjustData = function _adjustData(dataArray) {
    var self = this;
    var adjust = self.get('adjust');
    if (adjust) {
      var adjustType = Util.upperFirst(adjust.type);
      if (!Adjust[adjustType]) {
        throw new Error('not support such adjust : ' + adjust);
      }

      var xScale = self.getXScale();
      var yScale = self.getYScale();
      var cfg = Util.mix({
        xField: xScale.field,
        yField: yScale.field
      }, adjust);
      var adjustObject = new Adjust[adjustType](cfg);
      adjustObject.processAdjust(dataArray);
      if (adjustType === 'Stack') {
        self._updateStackRange(yScale.field, yScale, dataArray);
      }
    }
  };

  Geom.prototype._updateStackRange = function _updateStackRange(field, scale, dataArray) {
    var mergeArray = Util.Array.merge(dataArray);
    var min = scale.min;
    var max = scale.max;
    for (var i = 0, len = mergeArray.length; i < len; i++) {
      var obj = mergeArray[i];
      var tmpMin = Math.min.apply(null, obj[field]);
      var tmpMax = Math.max.apply(null, obj[field]);
      if (tmpMin < min) {
        min = tmpMin;
      }
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
    if (min < scale.min || max > scale.max) {
      scale.change({
        min: min,
        max: max
      });
    }
  };

  Geom.prototype._sort = function _sort(mappedArray) {
    var self = this;
    var xScale = self.getXScale();
    var xField = xScale.field;
    Util.each(mappedArray, function (itemArr) {
      itemArr.sort(function (obj1, obj2) {
        return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
      });
    });
    self.set('hasSorted', true);
    self.set('dataArray', mappedArray);
  };

  Geom.prototype.paint = function paint() {
    var self = this;
    var dataArray = self.get('dataArray');
    var mappedArray = [];
    var shapeFactory = self.getShapeFactory();
    shapeFactory.setCoord(self.get('coord'));
    self._beforeMapping(dataArray);
    for (var i = 0, len = dataArray.length; i < len; i++) {
      var data = dataArray[i];
      data = self._mapping(data);
      mappedArray.push(data);
      self.draw(data, shapeFactory);
    }
    self.set('dataArray', mappedArray);
  };

  /**
   * @protected
   * 获取图形的工厂类
   * @return {Object} 工厂类对象
   */


  Geom.prototype.getShapeFactory = function getShapeFactory() {
    var shapeFactory = this.get('shapeFactory');
    if (!shapeFactory) {
      var shapeType = this.get('shapeType');
      shapeFactory = Shape.getShapeFactory(shapeType);
      this.set('shapeFactory', shapeFactory);
    }
    return shapeFactory;
  };

  // step 3.2 mapping


  Geom.prototype._mapping = function _mapping(data) {
    var self = this;
    var attrs = self.get('attrs');
    var yField = self.getYScale().field;
    var mappedData = [];
    for (var i = 0, len = data.length; i < len; i++) {
      var record = data[i];
      var newRecord = {};
      newRecord[FIELD_ORIGIN] = record[FIELD_ORIGIN];
      newRecord.points = record.points;
      // 避免
      newRecord[FIELD_ORIGIN_Y] = record[yField];
      for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          var attr = attrs[k];
          var names = attr.names;
          var values = self._getAttrValues(attr, record);
          if (names.length > 1) {
            // position 之类的生成多个字段的属性
            for (var j = 0, _len = values.length; j < _len; j++) {
              var val = values[j];
              var name = names[j];
              newRecord[name] = Util.isArray(val) && val.length === 1 ? val[0] : val; // 只有一个值时返回第一个属性值
            }
          } else {
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }
      mappedData.push(newRecord);
    }

    return mappedData;
  };

  // 获取属性映射的值


  Geom.prototype._getAttrValues = function _getAttrValues(attr, record) {
    var scales = attr.scales;
    var params = [];
    for (var i = 0, len = scales.length; i < len; i++) {
      var scale = scales[i];
      var field = scale.field;
      if (scale.type === 'identity') {
        params.push(scale.value);
      } else {
        params.push(record[field]);
      }
    }
    var values = attr.mapping.apply(attr, params);
    return values;
  };

  Geom.prototype.getAttrValue = function getAttrValue(attrName, record) {
    var attr = this.getAttr(attrName);
    var rst = null;
    if (attr) {
      var values = this._getAttrValues(attr, record);
      rst = values[0];
    }
    return rst;
  };

  Geom.prototype._beforeMapping = function _beforeMapping(dataArray) {
    var self = this;
    if (self.get('sortable')) {
      // 需要排序
      self._sort(dataArray);
    }
    if (self.get('generatePoints')) {
      Util.each(dataArray, function (data) {
        self._generatePoints(data);
      });
    }
  };

  Geom.prototype.isInCircle = function isInCircle() {
    var coord = this.get('coord');
    return coord && coord.isPolar;
  };

  Geom.prototype.getCallbackCfg = function getCallbackCfg(fields, cfg, origin) {
    if (!fields) {
      return cfg;
    }
    var tmpCfg = {};
    var params = fields.map(function (field) {
      return origin[field];
    });
    Util.each(cfg, function (v, k) {
      if (Util.isFunction(v)) {
        tmpCfg[k] = v.apply(null, params);
      } else {
        tmpCfg[k] = v;
      }
    });
    return tmpCfg;
  };

  Geom.prototype.getDrawCfg = function getDrawCfg(obj) {
    var self = this;
    var isInCircle = self.isInCircle();
    var cfg = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: isInCircle,
      opacity: obj.opacity
    };
    var styleOptions = self.get('styleOptions');
    if (styleOptions && styleOptions.style) {
      cfg.style = self.getCallbackCfg(styleOptions.fields, styleOptions.style, obj[FIELD_ORIGIN]);
    }
    if (self.get('generatePoints')) {
      cfg.points = obj.points;
    }
    if (isInCircle) {
      cfg.center = self.get('coord').center;
    }
    return cfg;
  };
  /**
   * 绘制图层
   * @param {Array} data 绘制的数据
   * @param {Object} shapeFactory 图形的工厂类
   */


  Geom.prototype.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var yScale = self.getYScale();
    var shapeDatas = self.get('shapeDatas');

    Util.each(data, function (obj, index) {
      shapeDatas.push(obj);
      if (yScale && Util.isNil(obj._origin[yScale.field])) {
        return;
      }
      obj.index = index;
      var cfg = self.getDrawCfg(obj);
      var shape = obj.shape;
      shapeFactory.drawShape(shape, cfg, container);
    });
  };

  Geom.prototype._generatePoints = function _generatePoints(data) {
    var self = this;
    var shapeFactory = self.getShapeFactory();
    var shapeAttr = self.getAttr('shape');
    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var cfg = self.createShapePointsCfg(obj);
      var shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
      var points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  };

  /**
   * 获取图形对应点的配置项
   * @protected
   * @param  {Object} obj 数据对象
   * @return {Object} cfg 获取图形对应点的配置项
   */


  Geom.prototype.createShapePointsCfg = function createShapePointsCfg(obj) {
    var xScale = this.getXScale();
    var yScale = this.getYScale();
    var x = this._normalizeValues(obj[xScale.field], xScale);
    var y = void 0; // 存在没有 y 的情况

    if (yScale) {
      y = this._normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x: x,
      y: y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined
    };
  };

  /**
   * @protected
   * @return {Number} y 轴上的最小值
   */


  Geom.prototype.getYMinValue = function getYMinValue() {
    var yScale = this.getYScale();
    var min = yScale.min;
    var value = void 0;

    if (this.get('startOnZero')) {
      value = min >= 0 ? min : 0;
    } else {
      value = min;
    }

    return value;
  };

  // 将数据归一化


  Geom.prototype._normalizeValues = function _normalizeValues(values, scale) {
    var rst = [];
    if (Util.isArray(values)) {
      for (var i = 0, len = values.length; i < len; i++) {
        var v = values[i];
        rst.push(scale.scale(v));
      }
    } else {
      rst = scale.scale(values);
    }
    return rst;
  };

  /**
   * 获取属性
   * @protected
   * @param {String} name 属性名
   * @return {Scale} 度量
   */


  Geom.prototype.getAttr = function getAttr(name) {
    return this.get('attrs')[name];
  };

  /**
   * 获取 x 对应的度量
   * @return {Scale} x 对应的度量
   */


  Geom.prototype.getXScale = function getXScale() {
    return this.getAttr('position').scales[0];
  };

  /**
   * 获取 y 对应的度量
   * @return {Scale} y 对应的度量
   */


  Geom.prototype.getYScale = function getYScale() {
    return this.getAttr('position').scales[1];
  };

  Geom.prototype.hasAdjust = function hasAdjust(adjust) {
    return this.get('adjust') && this.get('adjust').type === adjust;
  };

  Geom.prototype._getSnap = function _getSnap(scale, item, arr) {
    var i = 0;
    var values = void 0;
    var yField = this.getYScale().field; // 叠加的维度
    if (this.hasAdjust('stack') && scale.field === yField) {
      values = [];
      arr.forEach(function (obj) {
        values.push(obj[FIELD_ORIGIN_Y]);
      });

      for (var len = values.length; i < len; i++) {
        if (values[0][0] > item) {
          break;
        }
        if (values[values.length - 1][1] <= item) {
          i = values.length - 1;
          break;
        }
        if (values[i][0] <= item && values[i][1] > item) {
          break;
        }
      }
    } else {
      values = scale.values;
      values.sort(function (a, b) {
        return a - b;
      });
      for (var _len2 = values.length; i < _len2; i++) {
        if ((values[0] + values[1]) / 2 > item) {
          break;
        }
        if ((values[i - 1] + values[i]) / 2 <= item && (values[i + 1] + values[i]) / 2 > item) {
          break;
        }
        if ((values[values.length - 2] + values[values.length - 1]) / 2 <= item) {
          i = values.length - 1;
          break;
        }
      }
    }
    var result = values[i];
    return result;
  };

  /**
   * 根据画布坐标获取切割线对应数据集
   * @param  {Object} point 画布坐标的x,y的值
   * @return {Array} 切割交点对应数据集
  **/


  Geom.prototype.getSnapRecords = function getSnapRecords(point) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScale();

    var xfield = xScale.field;
    // const yfield = yScale.field;

    var invertPoint = coord.invertPoint(point);
    var dataArray = self.get('dataArray');
    if (!this.get('hasSorted')) {
      this._sort(dataArray);
    }

    var rst = [];
    var tmp = [];
    var xValue = xScale.invert(invertPoint.x);
    if (!xScale.isCategory) {
      xValue = self._getSnap(xScale, xValue);
    }
    dataArray.forEach(function (data) {
      data.forEach(function (obj) {
        var originValue = Util.isNil(obj[FIELD_ORIGIN]) ? obj[xfield] : obj[FIELD_ORIGIN][xfield];
        if (self._isEqual(originValue, xValue, xScale)) {
          tmp.push(obj);
        }
      });
    });

    // 特别针对饼图做处理
    if (this.hasAdjust('stack') && coord.isPolar && coord.transposed && xScale.values.length === 1) {
      var yValue = yScale.invert(invertPoint.y);
      yValue = self._getSnap(yScale, yValue, tmp);
      tmp.forEach(function (obj) {
        if (Util.isArray(yValue) ? Util.Array.equals(obj[FIELD_ORIGIN_Y], yValue) : obj[FIELD_ORIGIN_Y] === yValue) {
          rst.push(obj);
        }
      });
    } else {
      rst = tmp;
    }

    return rst;
  };

  Geom.prototype._isEqual = function _isEqual(originValue, value, scale) {
    if (scale.type === 'timeCat') {
      return scale._toTimeStamp(originValue) === value;
    }
    return value === originValue;
  };

  // 返回 geom 所有 shape 的数据源


  Geom.prototype.getAllShapeData = function getAllShapeData() {
    return this.get('shapeDatas');
  };

  /**
   * 位置属性映射
   * @chainable
   * @param  {String} field 字段名
   * @return {Geom} geom 当前几何标记
   */


  Geom.prototype.position = function position(field) {
    this._setAttrOptions('position', {
      field: field
    });
    return this;
  };

  /**
   * 颜色属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 颜色的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */


  Geom.prototype.color = function color(field, values) {
    this._createAttrOption('color', field, values, Global.colors);
    return this;
  };

  /**
   * 大小属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 大小的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */


  Geom.prototype.size = function size(field, values) {
    this._createAttrOption('size', field, values, Global.sizes);
    return this;
  };

  /**
   * 形状属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 大小的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */


  Geom.prototype.shape = function shape(field, values) {
    var type = this.get('type');
    var shapes = Global.shapes[type] || [];
    this._createAttrOption('shape', field, values, shapes);
    return this;
  };

  Geom.prototype.style = function style(field, cfg) {
    var styleOptions = this.get('styleOptions');
    if (!styleOptions) {
      styleOptions = {};
      this.set('styleOptions', styleOptions);
    }
    if (Util.isObject(field)) {
      cfg = field;
      field = null;
    }
    var fields = void 0;
    if (field) {
      fields = parseFields(field);
    }
    styleOptions.fields = fields;
    styleOptions.style = cfg;
    return this;
  };

  Geom.prototype.adjust = function adjust(type) {
    if (Util.isString(type)) {
      type = { type: type };
    }
    this.set('adjust', type);
    return this;
  };

  Geom.prototype.reset = function reset() {
    this.set('attrOptions', {});
    this.set('adjust', null);
    this.clearInner();
  };

  Geom.prototype.clearInner = function clearInner() {
    var container = this.get('container');
    container && container.clear();
    this.set('attrs', {});
    this.set('groupScales', null);
    this.set('shapeDatas', []);
    this.set('xDistance', null);
  };

  Geom.prototype.clear = function clear() {
    this.clearInner();
    this.set('scales', {});
  };

  Geom.prototype.destroy = function destroy() {
    this.clear();
    // const container = this.get('container');
    // container && container.remove();
    _Base.prototype.destroy.call(this);
  };

  return Geom;
}(Base);

module.exports = Geom;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
var Global = __webpack_require__(1);

var Shape = {};

var ShapeBase = {
  _coord: null,
  /**
   * 绘制图形
   * @param {Object} cfg 配置项
   * @param {Object} container 容器
   */
  draw: function draw(cfg, container) {
    if (this.drawShape) {
      this.drawShape(cfg, container);
    }
  },

  /**
   * 设置坐标系
   * @param {Coord} coord 坐标系
   */
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },

  /**
   * 0～1 point 转 画布 point
   * @param  {point} point 转换的点
   * @return {point} point 转换结果
   */
  parsePoint: function parsePoint(point) {
    var coord = this._coord;
    if (coord.isPolar) {
      if (point.x === 1) point.x = 0.9999999;
      if (point.y === 1) point.y = 0.9999999;
    }
    return coord.convertPoint(point);
  },

  /**
   * 0～1 points 转 画布 points
   * @param  {points} points 转换的多个点
   * @return {points} points 转换结果
   */
  parsePoints: function parsePoints(points) {
    if (!points) return false;
    var self = this;
    var rst = [];
    points.forEach(function (point) {
      rst.push(self.parsePoint(point));
    });
    return rst;
  }
};

var ShapeFactoryBase = {
  defaultShapeType: null,
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },
  getShape: function getShape(type) {
    var self = this;
    if (Util.isArray(type)) {
      type = type[0];
    }
    var shape = self[type] || self[self.defaultShapeType];
    shape._coord = self._coord;
    return shape;
  },
  getShapePoints: function getShapePoints(type, cfg) {
    var shape = this.getShape(type);
    var fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
    var points = fn(cfg);
    return points;
  },
  getDefaultPoints: function getDefaultPoints() /* cfg */{
    return [];
  },
  drawShape: function drawShape(type, cfg, container) {
    var shape = this.getShape(type);
    if (!cfg.color) {
      cfg.color = Global.colors[0];
    }
    return shape.draw(cfg, container);
  }
};

// 注册 Geometry 获取图形的入口
Shape.registerFactory = function (factoryName, cfg) {
  var className = Util.upperFirst(factoryName);
  var geomObj = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

// 注册图形
Shape.registerShape = function (factoryName, shapeType, cfg) {
  var className = Util.upperFirst(factoryName);
  var factory = Shape[className];
  var shapeObj = Util.mix({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

Shape.registShape = Shape.registerShape;

// 获得Geom 对应的 shapeFactory
Shape.getShapeFactory = function (factoryName) {
  var self = this;
  factoryName = factoryName || 'point';
  var className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * 2 Dimensional Vector
 * @module vector2
 */
module.exports = {
  /**
   * Creates a new, empty vector2
   *
   * @return {vector2} a new 2D vector
   */
  create: function create() {
    return [0, 0];
  },

  /**
   * Calculates the length of a vector2
   *
   * @param {vector2} v vector to calculate length of
   * @return {Number} length of v
   */
  length: function length(v) {
    var x = v[0];
    var y = v[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Normalize a vector2
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v vector to normalize
   * @return {vector2} out
   */
  normalize: function normalize(out, v) {
    var len = this.length(v);
    if (len === 0) {
      out[0] = 0;
      out[1] = 0;
    } else {
      out[0] = v[0] / len;
      out[1] = v[1] / len;
    }

    return out;
  },

  /**
   * Adds two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  add: function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
  },

  /**
   * Subtracts vector v2 from vector v1
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  sub: function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
  },

  /**
   * Scales a vector2 by a scalar number
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to scale
   * @param {Number} s amount to scale the vector by
   * @return {vector2} out
   */
  scale: function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
  },

  /**
   * Calculates the dot product of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} dot product of v1 and v2
   */
  dot: function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  },

  /**
   * Calculates the direction of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Boolean} the direction of v1 and v2
   */
  direction: function direction(v1, v2) {
    return v1[0] * v2[1] - v2[0] * v1[1];
  },

  /**
   * Calculates the angle of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} angle of v1 and v2
   */
  angle: function angle(v1, v2) {
    var theta = this.dot(v1, v2) / (this.length(v1) * this.length(v2));
    return Math.acos(theta);
  },

  /**
   * Calculates the angle of two vector2's with direction
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @param {Boolean} direction the direction of two vector2's
   * @return {Number} angle of v1 and v2
   */
  angleTo: function angleTo(v1, v2, direction) {
    var angle = this.angle(v1, v2);
    var angleLargeThanPI = this.direction(v1, v2) >= 0;
    if (direction) {
      if (angleLargeThanPI) {
        return Math.PI * 2 - angle;
      }

      return angle;
    }

    if (angleLargeThanPI) {
      return angle;
    }
    return Math.PI * 2 - angle;
  },

  /**
   * whether a vector2 is zero vector
   *
   * @param  {vector2} v vector to calculate
   * @return {Boolean}   is or not a zero vector
   */
  zero: function zero(v) {
    return v[0] === 0 && v[1] === 0;
  },

  /**
   * Calculates the euclidian distance between two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} distance between a and b
   */
  distance: function distance(v1, v2) {
    var x = v2[0] - v1[0];
    var y = v2[1] - v1[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Creates a new vector2 initialized with values from an existing vector
   *
   * @param {vector2} v vector to clone
   * @return {Array} a new 2D vector
   */
  clone: function clone(v) {
    return [v[0], v[1]];
  },

  /**
   * Return the minimum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  min: function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
  },

  /**
   * Return the maximum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  max: function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
  },

  /**
   * Transforms the vector2 with a mat2d
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to transform
   * @param {mat2d} m matrix to transform with
   * @return {vector2} out
   */
  transformMat2d: function transformMat2d(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Vector2 = __webpack_require__(5);

var start = Vector2.create();
var end = Vector2.create();
var extremity = Vector2.create();

function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
  var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return {
    x: x,
    y: y
  };
}
// cubic helper formula at T distance
function CubicN(T, a, b, c, d) {
  var t2 = T * T;
  var t3 = t2 * T;
  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function cubicBezierBounds(c) {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  var s = {
    x: c[0],
    y: c[1]
  };
  var c1 = {
    x: c[2],
    y: c[3]
  };
  var c2 = {
    x: c[4],
    y: c[5]
  };
  var e = {
    x: c[6],
    y: c[7]
  };
  for (var t = 0; t < 100; t++) {
    var pt = getCubicBezierXYatT(s, c1, c2, e, t / 100);
    if (pt.x < minX) {
      minX = pt.x;
    }
    if (pt.x > maxX) {
      maxX = pt.x;
    }
    if (pt.y < minY) {
      minY = pt.y;
    }
    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }
  return {
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  };
}

module.exports = {
  /**
   * 从顶点数组中计算最小包围盒
   * @param  {Array} points 顶点数组
   * @param  {Number} lineWidth 线宽
   * @return {Object}        最小包围盒的范围
   */
  getBBoxFromPoints: function getBBoxFromPoints(points) {
    if (points.length === 0) {
      return;
    }
    var p = points[0];
    var left = p.x;
    var right = p.x;
    var top = p.y;
    var bottom = p.y;
    var len = points.length;

    for (var i = 1; i < len; i++) {
      p = points[i];
      left = Math.min(left, p.x);
      right = Math.max(right, p.x);
      top = Math.min(top, p.y);
      bottom = Math.max(bottom, p.y);
    }

    return {
      minX: left,
      minY: top,
      maxX: right,
      maxY: bottom
    };
  },

  /**
   * 计算线的最小包围盒
   * @param  {Number} x0 线段的起点 x
   * @param  {Number} y0 线段的起点 y
   * @param  {Number} x1 线段的终点 x
   * @param  {Number} y1 线段的终点 y
   * @param  {Number} lineWidth 线宽
   * @return {Object}    线段的最小包围盒
   */
  getBBoxFromLine: function getBBoxFromLine(x0, y0, x1, y1) {
    return {
      minX: Math.min(x0, x1),
      minY: Math.min(y0, y1),
      maxX: Math.max(x0, x1),
      maxY: Math.max(y0, y1)
    };
  },
  getBBoxFromArc: function getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
    var diff = Math.abs(startAngle - endAngle);
    if (diff % Math.PI * 2 < 1e-4 && diff > 1e-4) {
      // Is a circle
      return {
        minX: x - r,
        minY: y - r,
        maxX: x + r,
        maxY: y + r
      };
    }

    start[0] = Math.cos(startAngle) * r + x;
    start[1] = Math.sin(startAngle) * r + y;

    end[0] = Math.cos(endAngle) * r + x;
    end[1] = Math.sin(endAngle) * r + y;
    var min = [0, 0];
    var max = [0, 0];

    Vector2.min(min, start, end);
    Vector2.max(max, start, end);

    // Thresh to [0, Math.PI * 2]
    startAngle = startAngle % (Math.PI * 2);
    if (startAngle < 0) {
      startAngle = startAngle + Math.PI * 2;
    }
    endAngle = endAngle % (Math.PI * 2);
    if (endAngle < 0) {
      endAngle = endAngle + Math.PI * 2;
    }

    if (startAngle > endAngle && !anticlockwise) {
      endAngle += Math.PI * 2;
    } else if (startAngle < endAngle && anticlockwise) {
      startAngle += Math.PI * 2;
    }
    if (anticlockwise) {
      var tmp = endAngle;
      endAngle = startAngle;
      startAngle = tmp;
    }

    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
      if (angle > startAngle) {
        extremity[0] = Math.cos(angle) * r + x;
        extremity[1] = Math.sin(angle) * r + y;

        Vector2.min(min, extremity, min);
        Vector2.max(max, extremity, max);
      }
    }

    return {
      minX: min[0],
      minY: min[1],
      maxX: max[0],
      maxY: max[1]
    };
  },
  getBBoxFromBezierGroup: function getBBoxFromBezierGroup(points) {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    for (var i = 0, len = points.length; i < len; i++) {
      var bbox = cubicBezierBounds(points[i]);
      if (bbox.minX < minX) {
        minX = bbox.minX;
      }
      if (bbox.maxX > maxX) {
        maxX = bbox.maxX;
      }
      if (bbox.minY < minY) {
        minY = bbox.minY;
      }
      if (bbox.maxY > maxY) {
        maxY = bbox.maxY;
      }
    }

    return {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileOverview the base class of scale
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);

/**
 * 度量的构造函数
 * @class Scale
 */

var Scale = function () {

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  Scale.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * type of the scale
       * @type {String}
       */
      type: 'base',

      /**
       * 格式化函数,输出文本或者tick时的格式化函数
       * @type {Function}
       */
      formatter: null,

      /**
       * 输出的值域
       * @type {Array}
       */
      range: [0, 1],

      /**
       * 度量的标记
       * @type {Array}
       */
      ticks: null,

      /**
       * 参与度量计算的值，可选项
       * @type {Array}
       */
      values: []
    };
  };

  function Scale(cfg) {
    _classCallCheck(this, Scale);

    var defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.init();
  }

  /**
   * 度量初始化
   * @protected
   */


  Scale.prototype.init = function init() {};

  /**
   * 获取该度量的ticks,返回的是多个对象，
   *   - text: tick 的文本
   *   - value: 对应的度量转换后的值
   * <code>
   *   [
   *     {text: 0,value:0}
   *     {text: 1,value:0.2}
   *     {text: 2,value:0.4}
   *     {text: 3,value:0.6}
   *     {text: 4,value:0.8}
   *     {text: 5,value:1}
   *   ]
   * </code>
   * @param {Number} count 输出tick的个数的近似值，默认是 10
   * @return {Array} 返回 ticks 数组
   */


  Scale.prototype.getTicks = function getTicks() {
    var self = this;
    var ticks = self.ticks;
    var rst = [];
    Util.each(ticks, function (tick) {
      var obj = void 0;
      if (Util.isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: self.getText(tick),
          tickValue: tick,
          value: self.scale(tick)
        };
      }
      rst.push(obj);
    });
    return rst;
  };

  /**
   * 获取格式化后的文本
   * @param  {*} value 输入的数据
   * @return {String} 格式化的文本
   */


  Scale.prototype.getText = function getText(value) {
    var formatter = this.formatter;
    value = formatter ? formatter(value) : value;
    if (Util.isNil(value) || !value.toString) {
      value = '';
    }
    return value.toString();
  };
  /**
   * 输出的值域最小值
   * @protected
   * @return {Number} 返回最小的值
   */


  Scale.prototype.rangeMin = function rangeMin() {
    return this.range[0];
  };
  /**
   * 输出的值域最大值
   * @protected
   * @return {Number} 返回最大的值
   */


  Scale.prototype.rangeMax = function rangeMax() {
    var range = this.range;
    return range[range.length - 1];
  };

  /**
   * 度量转换后的结果，翻转回输入域
   * @param  {Number} value 需要翻转的数值
   * @return {*} 度量的输入值
   */


  Scale.prototype.invert = function invert(value) {
    return value;
  };
  /**
   * 将传入的值从非数值转换成数值格式，如分类字符串、时间字符串等
   * @param  {*} value 传入的值
   * @return {Number} 转换的值
   */


  Scale.prototype.translate = function translate(value) {
    return value;
  };
  /**
   * 进行度量转换
   * @param  {*} value 输入值
   * @return {Number} 输出值，在设定的输出值域之间，默认[0,1]
   */


  Scale.prototype.scale = function scale(value) {
    return value;
  };
  /**
   * 克隆一个新的scale,拥有跟当前scale相同的输入域、输出域等
   * @return {Scale} 克隆的度量
   */


  Scale.prototype.clone = function clone() {
    var self = this;
    var constr = self.constructor;
    var cfg = {};
    Util.each(self, function (v, k) {
      cfg[k] = self[k];
    });
    return new constr(cfg);
  };
  /**
   * 更改度量的属性信息
   * @param  {Object} info 属性信息
   * @chainable
   * @return {Scale} 返回自身的引用
   */


  Scale.prototype.change = function change(info) {
    this.ticks = null;
    Util.mix(this, info);
    this.init();
    return this;
  };

  return Scale;
}();

module.exports = Scale;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var G = {
  Canvas: __webpack_require__(54),
  Group: __webpack_require__(20),
  Shape: __webpack_require__(2)
};

__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(59);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(64);

module.exports = G;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileOverview Base class of chart and geometry
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);

var Base = function () {
  Base.prototype.getDefaultCfg = function getDefaultCfg() {
    return {};
  };

  function Base(cfg) {
    _classCallCheck(this, Base);

    var attrs = {};
    var defaultCfg = this.getDefaultCfg();
    this._attrs = attrs;
    Util.mix(attrs, defaultCfg, cfg);
  }

  Base.prototype.get = function get(name) {
    return this._attrs[name];
  };

  Base.prototype.set = function set(name, value) {
    this._attrs[name] = value;
  };

  Base.prototype.destroy = function destroy() {
    this._attrs = {};
    this.destroyed = true;
  };

  return Base;
}();

module.exports = Base;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

function toScaleString(scale, value) {
  if (Util.isString(value)) {
    return value;
  }
  return scale.invert(scale.scale(value));
}

var AttributeBase = function () {
  function AttributeBase(cfg) {
    _classCallCheck(this, AttributeBase);

    /**
     * 属性的类型
     * @type {String}
     */
    this.type = 'base';

    /**
     * 属性的名称
     * @type {String}
     */
    this.name = null;

    /**
     * 回调函数
     * @type {Function}
     */
    this.method = null;

    /**
     * 备选的值数组
     * @type {Array}
     */
    this.values = [];

    /**
     * 属性内部的度量
     * @type {Array}
     */
    this.scales = [];

    /**
     * 是否通过线性取值, 如果未指定，则根据数值的类型判定
     * @type {Boolean}
     */
    this.linear = null;

    Util.mix(this, cfg);
  }

  // 获取属性值，将值映射到视觉通道


  AttributeBase.prototype._getAttrValue = function _getAttrValue(scale, value) {
    var values = this.values;
    if (scale.isCategory && !this.linear) {
      var index = scale.translate(value);
      return values[index % values.length];
    }
    var percent = scale.scale(value);
    return this.getLinearValue(percent);
  };

  /**
   * 如果进行线性映射，返回对应的映射值
   * @protected
   * @param  {Number} percent 百分比
   * @return {*}  颜色值、形状、大小等
   */


  AttributeBase.prototype.getLinearValue = function getLinearValue(percent) {
    var values = this.values;
    var steps = values.length - 1;
    var step = Math.floor(steps * percent);
    var leftPercent = steps * percent - step;
    var start = values[step];
    var end = step === steps ? start : values[step + 1];
    var rstValue = start + (end - start) * leftPercent;
    return rstValue;
  };

  /**
   * 默认的回调函数
   * @param {*} value 回调函数的值
   * @type {Function}
   * @return {Array} 返回映射后的值
   */


  AttributeBase.prototype.callback = function callback(value) {
    var self = this;
    var scale = self.scales[0];
    var rstValue = null;
    if (scale.type === 'identity') {
      rstValue = scale.value;
    } else {
      rstValue = self._getAttrValue(scale, value);
    }
    return rstValue;
  };

  /**
   * 根据度量获取属性名
   * @return {Array} dims of this Attribute
   */


  AttributeBase.prototype.getNames = function getNames() {
    var scales = this.scales;
    var names = this.names;
    var length = Math.min(scales.length, names.length);
    var rst = [];
    for (var i = 0; i < length; i++) {
      rst.push(names[i]);
    }
    return rst;
  };

  /**
   * 根据度量获取维度名
   * @return {Array} dims of this Attribute
   */


  AttributeBase.prototype.getFields = function getFields() {
    var scales = this.scales;
    var rst = [];
    Util.each(scales, function (scale) {
      rst.push(scale.field);
    });
    return rst;
  };

  /**
   * 根据名称获取度量
   * @param  {String} name the name of scale
   * @return {Scale} scale
   */


  AttributeBase.prototype.getScale = function getScale(name) {
    var scales = this.scales;
    var names = this.names;
    var index = names.indexOf(name);
    return scales[index];
  };

  /**
   * 映射数据
   * @param {*} param1...paramn 多个数值
   * @return {Array} 映射的值组成的数组
   */


  AttributeBase.prototype.mapping = function mapping() {
    var scales = this.scales;
    var callback = this.callback;

    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var values = params;
    if (callback) {
      for (var i = 0, len = params.length; i < len; i++) {
        params[i] = this._toOriginParam(params[i], scales[i]);
      }
      values = callback.apply(this, params);
    }
    if (!Util.isArray(values)) {
      values = [values];
    }
    return values;
  };

  // 原始的参数


  AttributeBase.prototype._toOriginParam = function _toOriginParam(param, scale) {
    var rst = param;
    if (!scale.isLinear) {
      if (Util.isArray(param)) {
        rst = [];
        for (var i = 0, len = param.length; i < len; i++) {
          rst.push(toScaleString(scale, param[i]));
        }
      } else {
        rst = toScaleString(scale, param);
      }
    }
    return rst;
  };

  return AttributeBase;
}();

module.exports = AttributeBase;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileOverview 数据调整的基类
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);

var Base = function () {
  Base.prototype.getDefaultCfg = function getDefaultCfg() {
    return {};
  };

  function Base(cfg) {
    _classCallCheck(this, Base);

    var defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
  }

  Base.prototype.processAdjust = function processAdjust() /* dataArray */{};

  return Base;
}();

module.exports = Base;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * TODO: 这个会抽离至 platfrom，在 html5 环境下使用这个
 */
var DomUtil = void 0;
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */
var supportsEventListenerOptions = function () {
  var supports = false;
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        supports = true;
      }
    });
    window.addEventListener('e', null, options);
  } catch (e) {
    // continue regardless of error
  }
  return supports;
}();

// Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
// https://github.com/chartjs/Chart.js/issues/4287
var eventListenerOptions = supportsEventListenerOptions ? { passive: true } : false;

function createEvent(type, chart, x, y, nativeEvent) {
  return {
    type: type,
    chart: chart,
    native: nativeEvent || null,
    x: x !== undefined ? x : null,
    y: y !== undefined ? y : null
  };
}

function fromNativeEvent(event, chart) {
  // TODO: chart 改成 dom
  var type = event.type;

  var point = {};
  var touches = event.targetTouches;
  if (touches && touches.length > 0) {
    point.x = touches[0].clientX;
    point.y = touches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  var canvas = chart.get('canvas');
  // const canvasEl = canvas.get('el');
  var pos = DomUtil.getRelativePosition(point, canvas);
  return createEvent(type, chart, pos.x, pos.y, event);
}

DomUtil = {
  modifyCSS: function modifyCSS(DOM, CSS) {
    for (var key in CSS) {
      if (CSS.hasOwnProperty(key)) {
        DOM.style[key] = CSS[key];
      }
    }
    return DOM;
  },
  createDom: function createDom(str) {
    var container = document.createElement('div');
    str = str.replace(/(^\s*)|(\s*$)/g, '');
    container.innerHTML = '' + str;
    return container.childNodes[0];
  },
  getPixelRatio: function getPixelRatio() {
    return window && window.devicePixelRatio || 1;
  },
  getStyle: function getStyle(el, property) {
    return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
  },
  getWidth: function getWidth(el) {
    var width = this.getStyle(el, 'width');
    if (width === 'auto') {
      width = el.offsetWidth;
    }
    return parseFloat(width);
  },
  getHeight: function getHeight(el) {
    var height = this.getStyle(el, 'height');
    if (height === 'auto') {
      height = el.offsetHeight;
    }
    return parseFloat(height);
  },
  getDomById: function getDomById(id) {
    if (!id) {
      return null;
    }
    return document.getElementById(id);
  },
  getRelativePosition: function getRelativePosition(point, canvas) {
    var canvasDom = canvas.get('el');

    var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
        top = _canvasDom$getBoundin.top,
        right = _canvasDom$getBoundin.right,
        bottom = _canvasDom$getBoundin.bottom,
        left = _canvasDom$getBoundin.left;

    // Scale mouse coordinates into canvas coordinates
    // by following the pattern laid out by 'jerryj' in the comments of
    // http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/


    var paddingLeft = parseFloat(this.getStyle(canvasDom, 'padding-left'));
    var paddingTop = parseFloat(this.getStyle(canvasDom, 'padding-top'));
    var paddingRight = parseFloat(this.getStyle(canvasDom, 'padding-right'));
    var paddingBottom = parseFloat(this.getStyle(canvasDom, 'padding-bottom'));
    var width = right - left - paddingLeft - paddingRight;
    var height = bottom - top - paddingTop - paddingBottom;
    var pixelRatio = canvas.get('pixelRatio');

    // We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
    // the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
    var mouseX = Math.round((point.x - left - paddingLeft) / width * canvasDom.width / pixelRatio);
    var mouseY = Math.round((point.y - top - paddingTop) / height * canvasDom.height / pixelRatio);

    return {
      x: mouseX,
      y: mouseY
    };
  },
  createCanvas: function createCanvas() {
    return document.createElement('canvas');
  },
  addEventListener: function addEventListener(chart, type, listener) {
    var canvas = chart.get('canvas').get('el');
    canvas.addEventListener(type, listener, eventListenerOptions);
  },
  removeEventListener: function removeEventListener(chart, type, listener) {
    var canvas = chart.get('canvas').get('el');
    canvas.removeEventListener(type, listener, eventListenerOptions);
  },
  createEvent: function createEvent(event, chart) {
    return fromNativeEvent(event, chart);
  }
};

module.exports = DomUtil;

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview shape util
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);

var ShapeUtil = {
  splitPoints: function splitPoints(obj) {
    var points = [];
    var x = obj.x;
    var y = obj.y;
    y = Util.isArray(y) ? y : [y];
    y.forEach(function (yItem, index) {
      var point = {
        x: Util.isArray(x) ? x[index] : x,
        y: yItem
      };
      points.push(point);
    });
    return points;
  },
  splitArray: function splitArray(data, yField) {
    if (!data.length) return [];
    var arr = [];
    var tmp = [];
    var yValue = void 0;
    Util.each(data, function (obj) {
      yValue = obj._origin ? obj._origin[yField] : obj[yField];
      if (Util.isArray(yValue) && Util.isNil(yValue[0]) || Util.isNil(yValue)) {
        arr.push(tmp);
        tmp = [];
      } else {
        tmp.push(obj);
      }
    });
    arr.push(tmp);

    return arr;
  }
};

module.exports = ShapeUtil;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var Base = function () {
  Base.prototype.getDefaultCfg = function getDefaultCfg() {
    return {};
  };

  function Base(cfg) {
    _classCallCheck(this, Base);

    var defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);

    var start = void 0;
    var end = void 0;
    if (this.plot) {
      start = this.plot.bl;
      end = this.plot.tr;
      this.start = start;
      this.end = end;
    } else {
      start = this.start;
      end = this.end;
    }
    this.init(start, end);
  }

  Base.prototype.init = function init() {};

  Base.prototype.convertPoint = function convertPoint(point) {
    return point;
  };

  Base.prototype.invertPoint = function invertPoint(point) {
    return point;
  };

  Base.prototype.reset = function reset(plot) {
    this.plot = plot;
    var bl = plot.bl,
        tr = plot.tr;

    this.start = bl;
    this.end = tr;
    this.init(bl, tr);
  };

  return Base;
}();

module.exports = Base;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);
var Global = __webpack_require__(1);
var Vector2 = __webpack_require__(5);

var Abastract = function () {
  Abastract.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * 坐标点
       * @type {Array}
       */
      ticks: [],
      /**
       * tick 的配置信息
       * @type {Object}
       */
      tickLine: {},
      /**
       * 文本、tick跟坐标轴线的方向，默认是顺时针方向
       * @type {Number}
       */
      offsetFactor: 1,
      /**
       * 上层图层
       * @type {container}
       */
      frontContainer: null,
      /**
       * 下层图层
       * @type {[type]}
       */
      backContainer: null,
      /**
       * 绘制栅格的点
       * @type {Array}
       */
      gridPoints: []
    };
  };

  function Abastract(cfg) {
    _classCallCheck(this, Abastract);

    var defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.draw();
  }

  Abastract.prototype.draw = function draw() {
    var line = this.line,
        tickLine = this.tickLine,
        label = this.label,
        grid = this.grid;


    line && this.drawLine(line);
    tickLine && this.drawTicks(tickLine);
    label && this.drawLabels();
    grid && this.drawGrid(grid);
  };

  Abastract.prototype.drawTicks = function drawTicks(tickCfg) {
    var self = this;
    var ticks = self.ticks;
    var length = tickCfg.length; // Change: value 改为 length， 同 G2 统一
    var container = self.getContainer(tickCfg.top);
    Util.each(ticks, function (tick) {
      var start = self.getOffsetPoint(tick.value);
      var end = self.getSidePoint(start, length);
      container.addShape('line', {
        className: 'axis-tick',
        attrs: Util.mix({
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y
        }, tickCfg)
      });
    });
  };

  Abastract.prototype.drawLabels = function drawLabels() {
    var self = this;
    var labelOffset = self.labelOffset;
    var labels = self.labels;
    labels.map(function (labelShape) {
      var container = self.getContainer(labelShape.get('top'));
      var start = self.getOffsetPoint(labelShape.get('value'));

      var _self$getSidePoint = self.getSidePoint(start, labelOffset),
          x = _self$getSidePoint.x,
          y = _self$getSidePoint.y;

      labelShape.attr(Util.mix({
        x: x,
        y: y
      }, self.getTextAlignInfo(start, labelOffset), labelShape.get('textStyle')));
      container.add(labelShape);
      return labelShape;
    });
  };

  Abastract.prototype.drawLine = function drawLine() {};

  Abastract.prototype.drawGrid = function drawGrid(grid) {
    var self = this;
    var gridPoints = self.gridPoints,
        ticks = self.ticks;

    var gridCfg = grid;
    var count = gridPoints.length;

    Util.each(gridPoints, function (subPoints, index) {
      if (Util.isFunction(grid)) {
        var tick = ticks[index] || {};
        gridCfg = Util.mix({}, Global._defaultAxis.grid, grid(tick.text, index, count));
      }

      if (gridCfg) {
        var container = self.getContainer(gridCfg.top);
        container.addShape('Polyline', {
          className: 'axis-grid',
          attrs: Util.mix({
            points: subPoints
          }, gridCfg)
        });
      }
    });
  };

  // 获取坐标轴上的点


  Abastract.prototype.getOffsetPoint = function getOffsetPoint() {};

  // 获取坐标轴上点的向量，极坐标下覆盖此方法


  Abastract.prototype.getAxisVector = function getAxisVector() {};

  // 获取偏移位置的向量


  Abastract.prototype.getOffsetVector = function getOffsetVector(point, offset) {
    var self = this;
    var axisVector = self.getAxisVector(point);
    var normal = Vector2.normalize([], axisVector);
    var factor = self.offsetFactor;
    var verticalVector = [normal[1] * -1 * factor, normal[0] * factor];
    return Vector2.scale([], verticalVector, offset);
  };

  // 获取坐标轴边上的点


  Abastract.prototype.getSidePoint = function getSidePoint(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    return {
      x: point.x + offsetVector[0],
      y: point.y + offsetVector[1]
    };
  };

  // 获取文本，水平和垂直方向的对齐方式


  Abastract.prototype.getTextAlignInfo = function getTextAlignInfo(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    var align = void 0;
    var baseLine = void 0;
    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
    }
    if (offsetVector[1] > 0) {
      baseLine = 'top';
    } else if (offsetVector[1] < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }
    return {
      textAlign: align,
      textBaseline: baseLine
    };
  };

  Abastract.prototype.getContainer = function getContainer(isTop) {
    var frontContainer = this.frontContainer,
        backContainer = this.backContainer;

    return isTop ? frontContainer : backContainer;
  };

  return Abastract;
}();

module.exports = Abastract;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
var Shape = __webpack_require__(4);
var ShapeUtil = __webpack_require__(14);
var Global = __webpack_require__(1);

// regist line geom
var Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  var style = {
    strokeStyle: cfg.color
  };
  if (cfg.size) {
    style.lineWidth = cfg.size;
  }
  Util.mix(style, cfg.style);

  return Util.mix({}, Global.shape.line, style);
}

function drawLines(cfg, container, style, smooth) {
  var points = cfg.points;
  if (points.length && Util.isArray(points[0].y)) {
    var topPoints = [];
    var bottomPoints = [];
    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      var tmp = ShapeUtil.splitPoints(point);
      bottomPoints.push(tmp[0]);
      topPoints.push(tmp[1]);
    }
    if (cfg.isInCircle) {
      topPoints.push(topPoints[0]);
      bottomPoints.push(bottomPoints[0]);
    }
    if (cfg.isStack) {
      container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth: smooth
        }, style)
      });
    } else {
      container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth: smooth
        }, style)
      });
      container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: bottomPoints,
          smooth: smooth
        }, style)
      });
    }
  } else {
    if (cfg.isInCircle) {
      points.push(points[0]);
    }
    container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: points,
        smooth: smooth
      }, style)
    });
  }
}

// draw line shape
Shape.registerShape('line', 'line', {
  draw: function draw(cfg, container) {
    var style = getStyle(cfg);
    drawLines(cfg, container, style);
  }
});

// draw smooth line shape
Shape.registerShape('line', 'smooth', {
  draw: function draw(cfg, container) {
    var style = getStyle(cfg);
    drawLines(cfg, container, style, true);
  }
});

// draw dash line shape
Shape.registerShape('line', 'dash', {
  draw: function draw(cfg, container) {
    var style = getStyle(cfg);
    style.lineDash = Global.lineDash;
    drawLines(cfg, container, style);
  }
});

module.exports = Line;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);
var SHAPE_MAP = {}; // 缓存图形类型
var INDEX = '_INDEX';

function getComparer(compare) {
  return function (left, right) {
    var result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

module.exports = {
  getGroupClass: function getGroupClass() {},


  /**
   * 创建并添加 Shape
   * @param {String} type 添加的 shape 类型
   * @param {Object} cfg  shape 的配置项
   * @return {Shape} 返回创建的 shape 实例
   */
  addShape: function addShape(type) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var canvas = this.get('canvas');
    var shapeType = SHAPE_MAP[type];
    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }
    cfg.canvas = canvas;
    cfg.type = type;

    // 设置字体
    if (shapeType === 'Text' && canvas && canvas.get('fontFamily')) {
      cfg.attrs = cfg.attrs || {};
      cfg.attrs.fontFamily = cfg.attrs.fontFamily || canvas.get('fontFamily');
    }

    var shape = new Shape[shapeType](cfg);
    this.add(shape);
    return shape;
  },


  /**
   * 创建并添加 Group 组
   * @param {Object|null} cfg 配置信息
   * @return {Group} 返回创建的 Group 实例
   */
  addGroup: function addGroup(cfg) {
    var canvas = this.get('canvas');
    var groupClass = this.getGroupClass();
    cfg = Util.mix({}, cfg);
    cfg.canvas = canvas;
    cfg.parent = this;
    var rst = new groupClass(cfg);
    this.add(rst);
    return rst;
  },


  /**
   * 判断是否包含 item
   * @param  {Shape|Group} item shape 或者 group 实例
   * @return {Boolean}      true 表示包含，false 表示不包含
   */
  contain: function contain(item) {
    var children = this.get('children');
    return children.indexOf(item) > -1;
  },


  /**
   * 按照各个元素的 zIndex 进行从大到小的排序
   * @return {Canvas|Group} 返回自己
   */
  sort: function sort() {
    var children = this.get('children');
    // 必须保证稳定排序
    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child[INDEX] = i;
    }

    children.sort(getComparer(function (obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));

    return this;
  },


  /**
   * 清除所有的元素
   * @return {Canvas|Group} 返回自己
   */
  clear: function clear() {
    var children = this.get('children');

    while (children.length !== 0) {
      children[children.length - 1].remove(true);
    }
    return this;
  },


  /**
   * 添加元素
   * @param {Array|Group|Shape} items group 实例或者 shape 实例或者他们的数组集合
   * @return {Group} 返回自身
   */
  add: function add(items) {
    var self = this;
    var children = self.get('children');
    if (!Util.isArray(items)) {
      items = [items];
    }

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var parent = item.get('parent');
      if (parent) {
        var descendants = parent.get('children');
        Util.Array.remove(descendants, item);
      }
      self._setEvn(item);
      children.push(item);
    }

    return self;
  },
  _setEvn: function _setEvn(item) {
    var self = this;
    item._attrs.parent = self;
    item._attrs.context = self._attrs.context;
    item._attrs.canvas = self._attrs.canvas;
    // const clip = item._attrs.attrs.clip; // TODO
    // if (clip) {
    //   clip.set('parent', self);
    //   clip.set('context', self.get('context'));
    // }
    if (item._attrs.isGroup) {
      var children = item._attrs.children;
      for (var i = 0, len = children.length; i < len; i++) {
        item._setEvn(children[i]);
      }
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Base = __webpack_require__(9);
var MatrixUtil = __webpack_require__(55);

// 是否未改变
function isUnchanged(m) {
  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
}

var ALIAS_ATTRS_MAP = {
  stroke: 'strokeStyle',
  fill: 'fillStyle',
  opacity: 'globalAlpha'
};

var SHAPE_ATTRS = ['fillStyle', 'font', 'globalAlpha', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline', 'lineDash'];

var Element = function (_Base) {
  _inherits(Element, _Base);

  Element.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * 唯一标示
       * @type {Number}
       */
      className: null,
      /**
       * Z轴的层叠关系，Z值越大离用户越近
       * @type {Number}
       */
      zIndex: 0,
      /**
       * Canvas对象
       * @type: {Object}
       */
      canvas: null,
      /**
       * 父元素指针
       * @type {Object}
       */
      parent: null,
      /**
       * 画布的上下文
       * @type {Object}
       */
      context: null,
      /**
       * 是否显示
       * @type {Boolean}
       */
      visible: true,
      /**
       * 是否被销毁
       * @type: {Boolean}
       */
      destroyed: false,
      /**
       * 图形属性
       * @type {Object}
       */
      attrs: {}
    };
  };

  Element.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {};
  };

  Element.prototype._setAttr = function _setAttr(name, value) {
    var attrs = this.get('attrs');
    var alias = ALIAS_ATTRS_MAP[name];
    if (alias) {
      attrs[alias] = value;
    }
    attrs[name] = value;
  };

  Element.prototype._getAttr = function _getAttr(name) {
    return this.get('attrs')[name];
  };

  Element.prototype._afterAttrsSet = function _afterAttrsSet() {};

  function Element(cfg) {
    _classCallCheck(this, Element);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    var attrs = cfg && cfg.attrs || {};
    _this.initAttrs(attrs);
    _this.initTransform(); // 初始化变换
    return _this;
  }

  Element.prototype.initAttrs = function initAttrs(attrs) {
    this.attr(Util.mix(this.getDefaultAttrs(), attrs));
  };

  Element.prototype.attr = function attr(name, value) {
    var self = this;
    var argumentsLen = arguments.length;
    if (argumentsLen === 0) {
      return self.get('attrs');
    }

    if (Util.isObject(name)) {
      this._attrs.bbox = null; // attr 改变了有可能会导致 bbox 改变，故在此清除
      for (var k in name) {
        self._setAttr(k, name[k]); // TODO clip 的问题处理
      }
      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }
      return self;
    }
    if (argumentsLen === 2) {
      this._attrs.bbox = null;
      self._setAttr(name, value);
      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }
      return self;
    }
    return self._getAttr(name);
  };

  Element.prototype.getParent = function getParent() {
    return this.get('parent');
  };

  Element.prototype.draw = function draw(context) {
    if (this.get('destroyed')) {
      return;
    }
    if (this.get('visible')) {
      this.setContext(context);
      this.drawInner(context);
      this.restoreContext(context);
    }
  };

  Element.prototype.setContext = function setContext(context) {
    // const clip = this.attrs.clip;
    context.save();
    // if (clip) {
    //   clip.resetTransform(context);
    //   clip.createPath(context);
    //   context.clip();
    // }
    this.resetContext(context);
    this.resetTransform(context);
  };

  Element.prototype.restoreContext = function restoreContext(context) {
    context.restore();
  };

  Element.prototype.resetContext = function resetContext(context) {
    var elAttrs = this.get('attrs');
    if (!this.get('isGroup')) {
      for (var k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) {
          // 非canvas属性不附加
          var v = elAttrs[k];
          if (k === 'lineDash' && context.setLineDash && v) {
            context.setLineDash(v);
          } else {
            context[k] = v;
          }
        }
      }
    }
  };

  Element.prototype.hasFill = function hasFill() {
    return this.get('canFill') && this.get('attrs').fillStyle;
  };

  Element.prototype.hasStroke = function hasStroke() {
    return this.get('canStroke') && this.get('attrs').strokeStyle;
  };

  Element.prototype.drawInner = function drawInner() /* context */{};

  Element.prototype.show = function show() {
    this.set('visible', true);
    return this;
  };

  Element.prototype.hide = function hide() {
    this.set('visible', false);
    return this;
  };

  Element.prototype._removeFromParent = function _removeFromParent() {
    var parent = this.get('parent');
    if (parent) {
      var children = parent.get('children');
      Util.Array.remove(children, this);
    }

    return this;
  };

  /**
   * 移除
   * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除自己
   */


  Element.prototype.remove = function remove(destroy) {
    if (destroy) {
      this.destroy();
    } else {
      this._removeFromParent();
    }
  };

  /**
   * 销毁并将自己从父元素中移除（如果有父元素的话）
   */


  Element.prototype.destroy = function destroy() {
    var destroyed = this.get('destroyed');

    if (destroyed) {
      return;
    }

    this._removeFromParent();

    this._attrs = {};
    this.set('destroyed', true);
  };

  Element.prototype.getBBox = function getBBox() {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    };
  };

  Element.prototype.initTransform = function initTransform() {
    this._attrs.matrix = [1, 0, 0, 1, 0, 0];
  };

  Element.prototype.getMatrix = function getMatrix() {
    return this._attrs.matrix;
  };

  Element.prototype.setMatrix = function setMatrix(m) {
    this._attrs.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
    this.clearTotalMatrix();
  };

  Element.prototype.cloneMatrix = function cloneMatrix(m) {
    return [m[0], m[1], m[2], m[3], m[4], m[5]];
  };

  /**
   * 平移、旋转、缩放
   * @param  {Array} actions 操作集合
   * @return {Element}         返回自身
   */


  Element.prototype.transform = function transform(actions) {
    var self = this;
    for (var i = 0; i < actions.length; i++) {
      var action = actions[i];
      switch (action[0]) {
        case 't':
          self.translate(action[1], action[2]);
          break;
        case 's':
          self.scale(action[1], action[2]);
          break;
        case 'r':
          self.rotate(action[1]);
          break;
        default:
          break;
      }
    }

    return self;
  };

  Element.prototype.setTransform = function setTransform(actions) {
    this._attrs.matrix = [1, 0, 0, 1, 0, 0];
    return this.transform(actions);
  };

  Element.prototype.translate = function translate(x, y) {
    var matrix = this._attrs.matrix;
    matrix[4] += matrix[0] * x + matrix[2] * y;
    matrix[5] += matrix[1] * x + matrix[3] * y;
    this.clearTotalMatrix();
  };

  Element.prototype.rotate = function rotate(rad) {
    var matrix = this._attrs.matrix;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var m11 = matrix[0] * c + matrix[2] * s;
    var m12 = matrix[1] * c + matrix[3] * s;
    var m21 = matrix[0] * -s + matrix[2] * c;
    var m22 = matrix[1] * -s + matrix[3] * c;
    matrix[0] = m11;
    matrix[1] = m12;
    matrix[2] = m21;
    matrix[3] = m22;
    this.clearTotalMatrix();
  };

  Element.prototype.scale = function scale(sx, sy) {
    var matrix = this._attrs.matrix;
    matrix[0] *= sx;
    matrix[1] *= sx;
    matrix[2] *= sy;
    matrix[3] *= sy;

    this.clearTotalMatrix();
  };

  /**
   * 移动的到位置
   * @param  {Number} x 移动到x
   * @param  {Number} y 移动到y
   */


  Element.prototype.moveTo = function moveTo(x, y) {
    var cx = this._attrs.x || 0; // 当前的x
    var cy = this._attrs.y || 0; // 当前的y
    this.translate(x - cx, y - cy);
    this.set('x', x);
    this.set('y', y);
  };

  /**
   * 应用到当前元素上的总的矩阵
   * @return {Matrix} 矩阵
   */


  Element.prototype.getTotalMatrix = function getTotalMatrix() {
    var m = this._attrs.totalMatrix;
    if (!m) {
      m = [1, 0, 0, 1, 0, 0];
      var parent = this._attrs.parent;
      if (parent) {
        var pm = parent.getTotalMatrix();
        m = MatrixUtil.multiple(m, pm);
      }

      m = MatrixUtil.multiple(m, this._attrs.matrix);
      this._attrs.totalMatrix = m;
    }
    return m;
  };

  // 清除当前的矩阵


  Element.prototype.clearTotalMatrix = function clearTotalMatrix() {}
  // this.__cfg.totalMatrix = null;


  // TODO
  ;

  Element.prototype.invert = function invert(px, py) {
    var m = this.getTotalMatrix();
    var x = px;
    var y = py;
    px = x * m[0] + y * m[2] + m[4];
    py = x * m[1] + y * m[3] + m[5];
    return [px, py];
  };

  Element.prototype.resetTransform = function resetTransform(context) {
    var mo = this._attrs.matrix;
    // 不改变时
    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
    }
  };

  return Element;
}(Base);

module.exports = Element;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Element = __webpack_require__(19);
var Container = __webpack_require__(18);
var Vector2 = __webpack_require__(5);

var Group = function (_Element) {
  _inherits(Group, _Element);

  function Group() {
    _classCallCheck(this, Group);

    return _possibleConstructorReturn(this, _Element.apply(this, arguments));
  }

  Group.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Element.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      isGroup: true,
      children: []
    });
  };

  Group.prototype.drawInner = function drawInner(context) {
    var children = this.get('children');
    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child.draw(context);
    }
    return this;
  };

  Group.prototype.clearTotalMatrix = function clearTotalMatrix() {
    var m = this._attrs.totalMatrix;
    if (m) {
      this._attrs.totalMatrix = null;
      var children = this._attrs.children;
      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        child.clearTotalMatrix();
      }
    }
  };

  /**
   * 获取最小包围盒
   * @return {Object} 返回包围盒
   */


  Group.prototype.getBBox = function getBBox() {
    var self = this;
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var children = self.get('children');
    for (var i = 0, length = children.length; i < length; i++) {
      var child = children[i];
      if (child.get('visible')) {
        var box = child.getBBox();
        if (!box) {
          continue;
        }

        var leftTop = [box.minX, box.minY];
        var leftBottom = [box.minX, box.maxY];
        var rightTop = [box.maxX, box.minY];
        var rightBottom = [box.maxX, box.maxY];

        Vector2.transformMat2d(leftTop, leftTop, child.get('matrix'));
        Vector2.transformMat2d(leftBottom, leftBottom, child.get('matrix'));
        Vector2.transformMat2d(rightTop, rightTop, child.get('matrix'));
        Vector2.transformMat2d(rightBottom, rightBottom, child.get('matrix'));

        minX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], minX);
        maxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], maxX);
        minY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], minY);
        maxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], maxY);
      }
    }

    return {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  Group.prototype.destroy = function destroy() {
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    _Element.prototype.destroy.call(this);
  };

  return Group;
}(Element);

Util.mix(Group.prototype, Container, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});

module.exports = Group;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 将折线转换成平滑曲线
 * @author dxq613@gmail.com
 */
var Vector2 = __webpack_require__(5);

function getPoint(v) {
  return [v.x, v.y];
}

function smoothBezier(points, smooth, isLoop, constraint) {
  var cps = [];

  var prevPoint = void 0;
  var nextPoint = void 0;
  var hasConstraint = !!constraint;
  var min = void 0;
  var max = void 0;
  var point = void 0;
  var len = void 0;
  var l = void 0;
  var i = void 0;
  if (hasConstraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (i = 0, l = points.length; i < l; i++) {
      point = getPoint(points[i]);
      Vector2.min(min, min, point);
      Vector2.max(max, max, point);
    }
    Vector2.min(min, min, constraint[0]);
    Vector2.max(max, max, constraint[1]);
  }

  for (i = 0, len = points.length; i < len; i++) {
    point = getPoint(points[i]);
    if (isLoop) {
      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
      nextPoint = getPoint(points[(i + 1) % len]);
    } else {
      if (i === 0 || i === len - 1) {
        cps.push([point[0], point[1]]);
        continue;
      } else {
        prevPoint = getPoint(points[i - 1]);
        nextPoint = getPoint(points[i + 1]);
      }
    }

    var v = Vector2.sub([], nextPoint, prevPoint);
    Vector2.scale(v, v, smooth);
    var d0 = Vector2.distance(point, prevPoint);
    var d1 = Vector2.distance(point, nextPoint);

    var sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    var v1 = Vector2.scale([], v, -d0);
    var v2 = Vector2.scale([], v, d1);

    var cp0 = Vector2.add([], point, v1);
    var cp1 = Vector2.add([], point, v2);

    if (hasConstraint) {
      Vector2.max(cp0, cp0, min);
      Vector2.min(cp0, cp0, max);
      Vector2.max(cp1, cp1, min);
      Vector2.min(cp1, cp1, max);
    }

    cps.push([cp0[0], cp0[1]]);
    cps.push([cp1[0], cp1[1]]);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
}

function catmullRom2bezier(pointList, z, constraint) {
  var isLoop = !!z;

  var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  var len = pointList.length;
  var d1 = [];

  var cp1 = void 0;
  var cp2 = void 0;
  var p = void 0;

  for (var i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];

    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }
  return d1;
}

module.exports = {
  smooth: catmullRom2bezier
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileOverview the scale function to process the categories
 * @author dxq613@gmail.com
 */
var Base = __webpack_require__(7);
var Util = __webpack_require__(0);
var catAuto = __webpack_require__(23);

/**
 * 度量的构造函数
 * @class Scale.Category
 */

var Category = function (_Base) {
  _inherits(Category, _Base);

  function Category() {
    _classCallCheck(this, Category);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  /**
   * @override
   */
  Category.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Base.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      /**
       * type of the scale
       * @type {String}
       */
      type: 'cat',

      /**
       * 自动生成标记时的个数
       * @type {Number}
       * @default null
       */
      tickCount: null,

      /**
       * 是否分类度量
       * @type {Boolean}
       */
      isCategory: true
    });
  };

  /**
   * @override
   */


  Category.prototype.init = function init() {
    var self = this;
    var values = self.values;
    var tickCount = self.tickCount;

    Util.each(values, function (v, i) {
      values[i] = v.toString();
    });
    if (!self.ticks) {
      var ticks = values;
      if (tickCount) {
        var temp = catAuto({
          maxCount: tickCount,
          data: values
        });
        ticks = temp.ticks;
      }
      this.ticks = ticks;
    }
  };

  /**
   * @override
   */


  Category.prototype.getText = function getText(value) {
    if (this.values.indexOf(value) === -1 && Util.isNumber(value)) {
      value = this.values[Math.round(value)];
    }

    return _Base.prototype.getText.call(this, value);
  };

  /**
   * @override
   */


  Category.prototype.translate = function translate(value) {
    var index = this.values.indexOf(value);
    if (index === -1 && Util.isNumber(value)) {
      index = value;
    } else if (index === -1) {
      index = NaN;
    }
    return index;
  };
  /**
   * @override
   */


  Category.prototype.scale = function scale(value) {
    var rangeMin = this.rangeMin();
    var rangeMax = this.rangeMax();
    var percent = void 0;

    if (Util.isString(value) || this.values.indexOf(value) !== -1) {
      value = this.translate(value);
    }
    if (this.values.length > 1) {
      percent = value / (this.values.length - 1);
    } else {
      percent = value;
    }
    return rangeMin + percent * (rangeMax - rangeMin);
  };

  /**
   * @override
   */


  Category.prototype.invert = function invert(value) {
    if (Util.isString(value)) {
      // 如果已经是字符串
      return value;
    }
    var min = this.rangeMin();
    var max = this.rangeMax();

    // 归一到 范围内
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    var percent = (value - min) / (max - min);
    var index = Math.round(percent * (this.values.length - 1)) % this.values.length;
    index = index || 0;
    return this.values[index];
  };

  return Category;
}(Base);

Base.Cat = Category;
module.exports = Category;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 计算分类的的坐标点
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);
var MAX_COUNT = 8;

function getSimpleArray(data) {
  var arr = [];
  Util.each(data, function (sub) {
    if (Util.isArray(sub)) {
      arr = arr.concat(sub);
    } else {
      arr.push(sub);
    }
  });
  return arr;
}

module.exports = function (info) {
  var rst = {};
  var ticks = [];
  var tickCount = info.maxCount || MAX_COUNT;

  var categories = getSimpleArray(info.data);
  if (categories.length <= tickCount + tickCount / 2) {
    ticks = [].concat(categories);
  } else {
    var length = categories.length;
    var step = parseInt(length / (tickCount - 1), 10);

    var groups = categories.map(function (e, i) {
      return i % step === 0 ? categories.slice(i, i + step) : null;
    }).filter(function (e) {
      return e;
    });

    ticks.push(categories[0]);
    for (var i = 1, groupLen = groups.length; i < groupLen && i < tickCount - 1; i++) {
      ticks.push(groups[i][0]);
    }

    ticks.push(categories[length - 1]);
  }

  rst.categories = categories;
  rst.ticks = ticks;
  return rst;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Geom = __webpack_require__(3);
var ShapeUtil = __webpack_require__(14);
var Util = __webpack_require__(0);
__webpack_require__(17);

var Path = function (_Geom) {
  _inherits(Path, _Geom);

  function Path() {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, _Geom.apply(this, arguments));
  }

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  Path.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);
    cfg.type = 'path';
    cfg.shapeType = 'line';
    return cfg;
  };

  Path.prototype.getDrawCfg = function getDrawCfg(obj) {
    var cfg = _Geom.prototype.getDrawCfg.call(this, obj);
    cfg.isStack = this.hasAdjust('stack');
    return cfg;
  };

  Path.prototype.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var yScale = self.getYScale();
    var splitArray = ShapeUtil.splitArray(data, yScale.field);

    var cfg = this.getDrawCfg(data[0]);
    cfg.origin = data; // path,line 等图的origin 是整个序列
    Util.each(splitArray, function (subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
      cfg.points = subData;
      shapeFactory.drawShape(cfg.shape, cfg, container);
    });
  };

  return Path;
}(Geom);

Geom.Path = Path;
module.exports = Path;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 需要计算所占x轴上的宽度的辅助类
 * @author sima.zhang1990@gmail.com
 * @author dxq613@gmail.com
 */

var Global = __webpack_require__(1);
var Util = __webpack_require__(0);

// 已经排序后的数据查找距离最小的
function findMinDistance(arr, scale) {
  var count = arr.length;
  // 日期类型的 values 经常上文本类型，所以需要转换一下
  if (Util.isString(arr[0])) {
    arr = arr.map(function (v) {
      return scale.translate(v);
    });
  }
  var distance = arr[1] - arr[0];
  for (var i = 2; i < count; i++) {
    var tmp = arr[i] - arr[i - 1];
    if (distance > tmp) {
      distance = tmp;
    }
  }
  return distance;
}

var SizeMixin = {
  getDefalutSize: function getDefalutSize() {
    var defaultSize = this.get('defaultSize');
    if (!defaultSize) {
      var coord = this.get('coord');
      var xScale = this.getXScale();
      var xValues = xScale.values;
      var dataArray = this.get('dataArray');
      var count = void 0;
      if (xScale.isLinear && xValues.length > 1) {
        xValues.sort(function (a, b) {
          return a - b;
        });
        var interval = findMinDistance(xValues, xScale);
        count = (xScale.max - xScale.min) / interval;
        if (xValues.length > count) {
          count = xValues.length;
        }
      } else {
        count = xValues.length;
      }
      var range = xScale.range;
      var normalizeSize = 1 / count;
      var widthRatio = 1;

      if (this.isInCircle()) {
        if (coord.transposed && count > 1) {
          // 极坐标下多层环图
          widthRatio = Global.widthRatio.multiplePie;
        } else {
          widthRatio = Global.widthRatio.rose;
        }
        /* if (dataArray.length > 1) {
          normalizeSize *= (range[1] - range[0]);
        } */
      } else {
        if (xScale.isLinear) {
          normalizeSize *= range[1] - range[0];
        }
        widthRatio = Global.widthRatio.column; // 柱状图要除以2
      }
      normalizeSize *= widthRatio;
      if (this.hasAdjust('dodge')) {
        normalizeSize = normalizeSize / dataArray.length;
      }
      defaultSize = normalizeSize;
      this.set('defaultSize', defaultSize);
    }
    return defaultSize;
  },
  getDimWidth: function getDimWidth(dimName) {
    var coord = this.get('coord');
    var start = coord.convertPoint({
      x: 0,
      y: 0
    });
    var end = coord.convertPoint({
      x: dimName === 'x' ? 1 : 0,
      y: dimName === 'x' ? 0 : 1
    });
    var width = 0;
    if (start && end) {
      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    }
    return width;
  },
  _getWidth: function _getWidth() {
    var coord = this.get('coord');
    var width = void 0; // x轴的长度
    if (this.isInCircle() && !coord.isTransposed) {
      // 极坐标下 width 为弧长
      width = (coord.endAngle - coord.startAngle) * coord.radius;
    } else {
      width = this.getDimWidth('x'); // 不需要判断transpose
    }
    return width;
  },
  _toNormalizedSize: function _toNormalizedSize(size) {
    var width = this._getWidth();
    return size / width;
  },
  _toCoordSize: function _toCoordSize(normalizeSize) {
    var width = this._getWidth();
    return width * normalizeSize;
  },
  getNormalizedSize: function getNormalizedSize(obj) {
    var size = this.getAttrValue('size', obj);
    if (Util.isNil(size)) {
      size = this.getDefalutSize();
    } else {
      size = this._toNormalizedSize(size);
    }
    return size;
  },
  getSize: function getSize(obj) {
    var size = this.getAttrValue('size', obj);
    if (Util.isNil(size)) {
      var normalizeSize = this.getDefalutSize();
      size = this._toCoordSize(normalizeSize);
    }
    return size;
  }
};

module.exports = SizeMixin;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 默认皮肤
 * @author dxq613@gail.com
 */
var Util = __webpack_require__(0);
var color1 = '#E8E8E8'; // 坐标轴线、坐标轴网格线的颜色
var color2 = '#808080'; // 字体颜色

var defaultAxis = {
  label: {
    fill: color2,
    fontSize: 20
  },
  line: {
    stroke: color1,
    lineWidth: 1,
    top: true
  },
  grid: {
    stroke: color1,
    lineWidth: 1,
    lineDash: [4]
  },
  tickLine: null,
  labelOffset: 15
};

var Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
  defaultColor: '#1890FF',
  pixelRatio: 1,
  padding: 'auto',
  colors: ['#1890FF', '#73C9E6', '#13C2C2', '#6CD9B3', '#2FC25B', '#9DD96C', '#FACC14', '#E6965C', '#F04864', '#D66BCA', '#8543E0', '#8E77ED', '#3436C7', '#737EE6', '#223273', '#7EA2E6'],
  shapes: {
    line: ['line', 'dash'],
    point: ['circle', 'hollowCircle']
  },
  opacities: [0.1, 0.9],
  sizes: [4, 10],
  axis: {
    bottom: Util.mix({}, defaultAxis, {
      grid: null
    }),
    left: Util.mix({}, defaultAxis, {
      line: null
    }),
    right: Util.mix({}, defaultAxis, {
      line: null,
      grid: null
    }),
    circle: Util.mix({}, defaultAxis, {
      line: null
    }),
    radius: Util.mix({}, defaultAxis, {
      labelOffset: 8
    })
  },
  shape: {
    line: {
      lineWidth: 4 // 线的默认宽度
    },
    point: {
      lineWidth: 0,
      size: 5 // 圆的默认半径
    },
    area: {
      fillOpacity: 0.4 // TODO: 需要确认
    }
  },
  _defaultAxis: defaultAxis
};

module.exports = Theme;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Position: __webpack_require__(28),
  Shape: __webpack_require__(29),
  Size: __webpack_require__(30),
  Color: __webpack_require__(31)
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Base = __webpack_require__(10);

var Position = function (_Base) {
  _inherits(Position, _Base);

  function Position(cfg) {
    _classCallCheck(this, Position);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    _this.names = ['x', 'y'];
    _this.type = 'position';
    return _this;
  }

  Position.prototype.mapping = function mapping(x, y) {
    var scales = this.scales;
    var coord = this.coord;
    var scaleX = scales[0];
    var scaleY = scales[1];
    var rstX = void 0;
    var rstY = void 0;
    var obj = void 0;
    if (Util.isNil(x) || Util.isNil(y)) {
      return [];
    }
    if (Util.isArray(y) && Util.isArray(x)) {
      rstX = [];
      rstY = [];
      for (var i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i++, j++) {
        obj = coord.convertPoint({
          x: scaleX.scale(x[i]),
          y: scaleY.scale(y[j])
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (Util.isArray(y)) {
      x = scaleX.scale(x);
      rstY = [];
      Util.each(y, function (yVal) {
        yVal = scaleY.scale(yVal);
        obj = coord.convertPoint({
          x: x,
          y: yVal
        });
        if (rstX && rstX !== obj.x) {
          if (!Util.isArray(rstX)) {
            rstX = [rstX];
          }
          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }
        rstY.push(obj.y);
      });
    } else if (Util.isArray(x)) {
      y = scaleY.scale(y);
      rstX = [];
      Util.each(x, function (xVal) {
        xVal = scaleX.scale(xVal);
        obj = coord.convertPoint({
          x: xVal,
          y: y
        });
        if (rstY && rstY !== obj.y) {
          if (!Util.isArray(rstY)) {
            rstY = [rstY];
          }
          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }
        rstX.push(obj.x);
      });
    } else {
      x = scaleX.scale(x);
      y = scaleY.scale(y);
      var point = coord.convertPoint({
        x: x,
        y: y
      });
      rstX = point.x;
      rstY = point.y;
    }
    return [rstX, rstY];
  };

  return Position;
}(Base);

module.exports = Position;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(10);

var Shape = function (_Base) {
  _inherits(Shape, _Base);

  function Shape(cfg) {
    _classCallCheck(this, Shape);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    _this.names = ['shape'];
    _this.type = 'shape';
    _this.gradient = null;
    return _this;
  }

  /**
   * @override
   */


  Shape.prototype.getLinearValue = function getLinearValue(percent) {
    var values = this.values;
    var index = Math.round((values.length - 1) * percent);
    return values[index];
  };

  return Shape;
}(Base);

module.exports = Shape;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(10);

var Size = function (_Base) {
  _inherits(Size, _Base);

  function Size(cfg) {
    _classCallCheck(this, Size);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    _this.names = ['size'];
    _this.type = 'size';
    _this.gradient = null;
    return _this;
  }

  return Size;
}(Base);

module.exports = Size;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorUtil = __webpack_require__(32);
var Base = __webpack_require__(10);
var Util = __webpack_require__(0);

var Color = function (_Base) {
  _inherits(Color, _Base);

  function Color(cfg) {
    _classCallCheck(this, Color);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    _this.names = ['color'];
    _this.type = 'color';
    _this.gradient = null;
    if (Util.isString(_this.values)) {
      _this.linear = true;
    }
    return _this;
  }

  /**
   * @override
   */


  Color.prototype.getLinearValue = function getLinearValue(percent) {
    var gradient = this.gradient;
    if (!gradient) {
      var values = this.values;
      gradient = ColorUtil.gradient(values);
      this.gradient = gradient;
    }
    return gradient(percent);
  };

  return Color;
}(Base);

module.exports = Color;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * TODO: 优化，最好去除 document
 */
var Util = __webpack_require__(0);
var RGB_REG = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;

// 创建辅助 tag 取颜色
function createTmp() {
  var i = document.createElement('i');
  i.title = 'Web Colour Picker';
  i.style.display = 'none';
  document.body.appendChild(i);
  return i;
}

// 获取颜色之间的插值
function getValue(start, end, percent, index) {
  var value = start[index] + (end[index] - start[index]) * percent;
  return value;
}

// 数组转换成颜色
function arr2rgb(arr) {
  return '#' + toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2]);
}

// 将数值从 0-255 转换成16进制字符串
function toHex(value) {
  value = Math.round(value);
  value = value.toString(16);
  if (value.length === 1) {
    value = '0' + value;
  }
  return value;
}

function calColor(colors, percent) {
  var steps = colors.length - 1;
  var step = Math.floor(steps * percent);
  var left = steps * percent - step;
  var start = colors[step];
  var end = step === steps ? start : colors[step + 1];
  var rgb = arr2rgb([getValue(start, end, left, 0), getValue(start, end, left, 1), getValue(start, end, left, 2)]);
  return rgb;
}

// rgb 颜色转换成数组
function rgb2arr(str) {
  var arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

var colorCache = {};
var iEl = null;
var ColorUtil = {
  /**
   * 将颜色转换到 rgb 的格式
   * @param  {String} color 颜色
   * @return {String} 将颜色转换到 '#ffffff' 的格式
   */
  toRGB: function toRGB(color) {
    // 如果已经是 rgb的格式
    if (color[0] === '#' && color.length === 7) {
      return color;
    }
    if (!iEl) {
      // 防止防止在页头报错
      iEl = createTmp();
    }
    var rst = void 0;
    if (colorCache[color]) {
      rst = colorCache[color];
    } else {
      iEl.style.color = color;
      rst = document.defaultView.getComputedStyle(iEl, '').getPropertyValue('color');
      var cArray = RGB_REG.exec(rst);
      cArray.shift();
      rst = arr2rgb(cArray);
      colorCache[color] = rst;
    }
    return rst;
  },


  rgb2arr: rgb2arr,

  /**
   * 获取渐变函数
   * @param  {Array} colors 多个颜色
   * @return {String} 颜色值
   */
  gradient: function gradient(colors) {
    var points = [];
    if (Util.isString(colors)) {
      colors = colors.split('-');
    }
    Util.each(colors, function (color) {
      if (color.indexOf('#') === -1) {
        color = ColorUtil.toRGB(color);
      }
      points.push(rgb2arr(color));
    });
    return function (percent) {
      return calColor(points, percent);
    };
  }
};

module.exports = ColorUtil;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Path = __webpack_require__(24);
var Geom = __webpack_require__(3);

__webpack_require__(17);

var Line = function (_Path) {
  _inherits(Line, _Path);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _Path.apply(this, arguments));
  }

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  Line.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Path.prototype.getDefaultCfg.call(this);
    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  };

  return Line;
}(Path);

Geom.Line = Line;
module.exports = Line;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Geom = __webpack_require__(3);
var Util = __webpack_require__(0);
var SizeMixin = __webpack_require__(25);
__webpack_require__(35);

var Interval = function (_Geom) {
  _inherits(Interval, _Geom);

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  Interval.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);
    cfg.type = 'interval';
    cfg.shapeType = 'interval';
    cfg.generatePoints = true;
    return cfg;
  };

  function Interval(cfg) {
    _classCallCheck(this, Interval);

    var _this = _possibleConstructorReturn(this, _Geom.call(this, cfg));

    Util.mix(_this, SizeMixin);
    return _this;
  }

  Interval.prototype.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);
    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  };

  Interval.prototype.clearInner = function clearInner() {
    _Geom.prototype.clearInner.call(this);
    this.set('defaultSize', null);
  };

  return Interval;
}(Geom);

Geom.Interval = Interval;

module.exports = Interval;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
var Shape = __webpack_require__(4);
var Vector2 = __webpack_require__(5);

function getRectPoints(cfg) {
  var x = cfg.x,
      y = cfg.y,
      y0 = cfg.y0,
      size = cfg.size;

  // 有3种情况，
  // 1. y，x都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是

  var ymin = y0;
  var ymax = y;
  if (Util.isArray(y)) {
    ymax = y[1];
    ymin = y[0];
  }

  var xmin = void 0;
  var xmax = void 0;
  if (Util.isArray(x)) {
    xmin = x[0];
    xmax = x[1];
  } else {
    xmin = x - size / 2;
    xmax = x + size / 2;
  }

  return [{ x: xmin, y: ymin }, { x: xmin, y: ymax }, { x: xmax, y: ymax }, { x: xmax, y: ymin }];
}

function getRectRange(points) {
  var xValues = [];
  var yValues = [];
  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];
    xValues.push(point.x);
    yValues.push(point.y);
  }
  var xMin = Math.min.apply(null, xValues);
  var yMin = Math.min.apply(null, yValues);
  var xMax = Math.max.apply(null, xValues);
  var yMax = Math.max.apply(null, yValues);

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

var Interval = Shape.registerFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints: function getDefaultPoints(cfg) {
    return getRectPoints(cfg);
  }
});

Shape.registerShape('interval', 'rect', {
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      fill: cfg.color
    }, cfg.style);
    if (cfg.isInCircle) {
      var newPoints = points.slice(0);
      if (this._coord.transposed) {
        newPoints = [points[0], points[3], points[2], points[1]];
      }

      var _cfg$center = cfg.center,
          x = _cfg$center.x,
          y = _cfg$center.y;

      var v = [1, 0];
      var v0 = [newPoints[0].x - x, newPoints[0].y - y];
      var v1 = [newPoints[1].x - x, newPoints[1].y - y];
      var v2 = [newPoints[2].x - x, newPoints[2].y - y];

      var startAngle = Vector2.angleTo(v, v1);
      var endAngle = Vector2.angleTo(v, v2);
      var r0 = Vector2.length(v0);
      var r = Vector2.length(v1);

      container.addShape('Sector', {
        className: 'interval',
        attrs: Util.mix({
          x: x,
          y: y,
          r: r,
          r0: r0,
          startAngle: startAngle,
          endAngle: endAngle
        }, style)
      });
    } else {
      var rectCfg = getRectRange(points);

      container.addShape('rect', {
        className: 'interval',
        attrs: Util.mix(rectCfg, style)
      });
    }
  }
});

module.exports = Interval;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var Adjust = __webpack_require__(11);

__webpack_require__(37);
__webpack_require__(38);

module.exports = Adjust;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileOverview 数据分组
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);
var Adjust = __webpack_require__(11);
var Global = __webpack_require__(1);

var Dodge = function (_Adjust) {
  _inherits(Dodge, _Adjust);

  function Dodge() {
    _classCallCheck(this, Dodge);

    return _possibleConstructorReturn(this, _Adjust.apply(this, arguments));
  }

  Dodge.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Adjust.prototype.getDefaultCfg.call(this);
    Util.mix(cfg, {
      /**
       * 调整过程中,2个数据的间距
       * @type {Number}
       */
      marginRatio: Global.widthRatio.dodgeMargin,

      /**
       * 调整占单位宽度的比例,例如：占2个分类间距的 1/2
       * @type {Number}
       */
      dodgeRatio: Global.widthRatio.column
    });
    return cfg;
  };

  Dodge.prototype.getDodgeOffset = function getDodgeOffset(range, index, count) {
    var self = this;
    var pre = range.pre;
    var next = range.next;
    var tickLength = next - pre;
    var width = tickLength * self.dodgeRatio / count;
    var margin = self.marginRatio * width;
    var offset = 1 / 2 * (tickLength - count * width - (count - 1) * margin) + ((index + 1) * width + index * margin) - 1 / 2 * width - 1 / 2 * tickLength;
    return (pre + next) / 2 + offset;
  };

  Dodge.prototype.processAdjust = function processAdjust(dataArray) {
    var self = this;
    var count = dataArray.length;
    var xField = self.xField;
    Util.each(dataArray, function (data, index) {
      for (var i = 0, len = data.length; i < len; i++) {
        var obj = data[i];
        var value = obj[xField];
        var range = {
          pre: value - 0.5,
          next: value + 0.5
        };
        var dodgeValue = self.getDodgeOffset(range, index, count);
        obj[xField] = dodgeValue;
      }
    });
  };

  return Dodge;
}(Adjust);

Adjust.Dodge = Dodge;
module.exports = Dodge;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileOverview Stack data
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);
var Adjust = __webpack_require__(11);

var Stack = function (_Adjust) {
  _inherits(Stack, _Adjust);

  function Stack() {
    _classCallCheck(this, Stack);

    return _possibleConstructorReturn(this, _Adjust.apply(this, arguments));
  }

  Stack.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      xField: null,
      yField: null
    };
  };

  Stack.prototype.processAdjust = function processAdjust(dataArray) {
    var self = this;
    var xField = self.xField;
    var yField = self.yField;
    var count = dataArray.length;
    var stackCache = {};

    for (var i = 0; i < count; i++) {
      var data = dataArray[i];
      for (var j = 0, len = data.length; j < len; j++) {
        var item = data[j];
        var x = item[xField];
        var y = item[yField];
        var xkey = x.toString();
        y = Util.isArray(y) ? y[1] : y;
        if (!stackCache[xkey]) {
          stackCache[xkey] = 0;
        }
        item[yField] = [stackCache[xkey], y + stackCache[xkey]];
        stackCache[xkey] += y;
      }
    }
  };

  return Stack;
}(Adjust);

Adjust.Stack = Stack;
module.exports = Stack;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(15);
var Vector2 = __webpack_require__(5);

var Polar = function (_Base) {
  _inherits(Polar, _Base);

  function Polar() {
    _classCallCheck(this, Polar);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  Polar.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      type: 'polar',
      startAngle: -Math.PI / 2,
      endAngle: Math.PI * 3 / 2,
      inner: 0,
      innerRadius: 0, // alias
      isPolar: true,
      transposed: false,
      center: null,
      radius: null
    };
  };

  Polar.prototype.init = function init(start, end) {
    var self = this;
    var inner = self.inner || self.innerRadius;
    var width = Math.abs(end.x - start.x);
    var height = Math.abs(end.y - start.y);

    var radius = void 0;
    var center = void 0;
    if (self.startAngle === -Math.PI && self.endAngle === 0) {
      radius = Math.min(width / 2, height);
      center = {
        x: (start.x + end.x) / 2,
        y: start.y
      };
    } else {
      radius = Math.min(width, height) / 2;
      center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
    }

    this.x = {
      start: self.startAngle,
      end: self.endAngle
    };

    this.y = {
      start: radius * inner,
      end: radius
    };
    this.center = center;
    this.radius = radius;
  };

  Polar.prototype.convertPoint = function convertPoint(point) {
    var self = this;
    var center = self.center;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';

    var x = self.x;
    var y = self.y;

    var angle = x.start + (x.end - x.start) * point[xDim];
    var radius = y.start + (y.end - y.start) * point[yDim];

    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  };

  Polar.prototype.invertPoint = function invertPoint(point) {
    var self = this;
    var center = self.center;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;

    var startV = [1, 0];
    var pointV = [point.x - center.x, point.y - center.y];

    if (Vector2.zero(pointV)) {
      return {
        x: 0,
        y: 0
      };
    }

    var theta = Vector2.angleTo(startV, pointV);
    while (theta > x.end) {
      theta = theta - 2 * Math.PI;
    }
    var l = Vector2.length(pointV);
    var percentX = (theta - x.start) / (x.end - x.start);
    var percentY = (l - y.start) / (y.end - y.start);
    var rst = {};
    rst[xDim] = percentX;
    rst[yDim] = percentY;
    return rst;
  };

  return Polar;
}(Base);

Base.Polar = Polar;
module.exports = Polar;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var Core = {};

Core.version = '3.1.0-beta.1';
Core.Global = __webpack_require__(1);
Core.Chart = __webpack_require__(41);
Core.Shape = __webpack_require__(4);
Core.G = __webpack_require__(8);
Core.Util = __webpack_require__(0);

module.exports = Core;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(9);
var Plot = __webpack_require__(42);
var Util = __webpack_require__(0);
var Coord = __webpack_require__(43);
var Geom = __webpack_require__(3);
var ScaleController = __webpack_require__(45);
var AxisController = __webpack_require__(51);
var Global = __webpack_require__(1);

var _require = __webpack_require__(8),
    Canvas = _require.Canvas;

function isFullCircle(coord) {
  var startAngle = coord.startAngle;
  var endAngle = coord.endAngle;
  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && endAngle - startAngle < Math.PI * 2) {
    return false;
  }
  return true;
}

var ViewGeoms = {};
Util.each(Geom, function (geomConstructor, className) {
  var methodName = Util.lowerFirst(className);
  ViewGeoms[methodName] = function (cfg) {
    var geom = new geomConstructor(cfg);
    this.addGeom(geom);
    return geom;
  };
});

var Chart = function (_Base) {
  _inherits(Chart, _Base);

  Chart.initPlugins = function initPlugins() {
    return {
      _plugins: [],
      _cacheId: 0,
      register: function register(plugins) {
        var p = this._plugins;
        [].concat(plugins).forEach(function (plugin) {
          if (p.indexOf(plugin) === -1) {
            p.push(plugin);
          }
        });

        this._cacheId++;
      },
      unregister: function unregister(plugins) {
        var p = this._plugins;
        [].concat(plugins).forEach(function (plugin) {
          var idx = p.indexOf(plugin);
          if (idx !== -1) {
            p.splice(idx, 1);
          }
        });

        this._cacheId++;
      },
      clear: function clear() {
        this._plugins = [];
        this._cacheId++;
      },
      count: function count() {
        return this._plugins.length;
      },
      getAll: function getAll() {
        return this._plugins;
      },
      notify: function notify(chart, hook, args) {
        var descriptors = this.descriptors(chart);
        var ilen = descriptors.length;
        var i = void 0;
        var descriptor = void 0;
        var plugin = void 0;
        var params = void 0;
        var method = void 0;

        for (i = 0; i < ilen; ++i) {
          descriptor = descriptors[i];
          plugin = descriptor.plugin;
          method = plugin[hook];
          if (typeof method === 'function') {
            params = [chart].concat(args || []);
            if (method.apply(plugin, params) === false) {
              return false;
            }
          }
        }

        return true;
      },
      descriptors: function descriptors(chart) {
        var cache = chart._plugins || (chart._plugins = {});
        if (cache.id === this._cacheId) {
          return cache.descriptors;
        }

        var plugins = [];
        var descriptors = [];

        this._plugins.concat(chart && chart.get('plugins') || []).forEach(function (plugin) {
          var idx = plugins.indexOf(plugin);
          if (idx !== -1) {
            return;
          }

          plugins.push(plugin);
          descriptors.push({
            plugin: plugin
          });
        });

        cache.descriptors = descriptors;
        cache.id = this._cacheId;
        return descriptors;
      }
    };
  };

  Chart.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * 画布的Id
       * @type {String}
       */
      id: null,
      /**
       * 画布中绘制图形的边距
       * @type {Array|Number}
       */
      padding: Global.padding,

      /**
       * 数据
       * @type {Array}
       */
      data: null,
      /**
       * chart 保有的度量
       * @type {Object}
       */
      scales: {},
      /**
       * 坐标系的配置信息
       * @private
       * @type {Object}
       */
      coordCfg: {
        type: 'cartesian'
      },
      /**
       * @private
       * 图层对应的图形
       * @type {Array}
       */
      geoms: null,
      /**
       * 列定义
       * @type {Object}
       */
      colDefs: null,
      pixelRatio: Global.pixelRatio,
      /**
       * 过滤设置
       * @type {Object}
       */
      filters: {},
      appendPadding: 30
    };
  };

  Chart.prototype._getFieldsForLegend = function _getFieldsForLegend() {
    var fields = [];
    var geoms = this.get('geoms');
    Util.each(geoms, function (geom) {
      var attrOptions = geom.get('attrOptions');
      var attrCfg = attrOptions.color;
      if (attrCfg && attrCfg.field && Util.isString(attrCfg.field)) {
        var arr = attrCfg.field.split('*');
        arr.map(function (item) {
          if (fields.indexOf(item) === -1) {
            fields.push(item);
          }
          return item;
        });
      }
    });
    return fields;
  };

  Chart.prototype._createScale = function _createScale(field, data, sortable) {
    var scaleController = this.get('scaleController');
    return scaleController.createScale(field, data, sortable);
  };

  Chart.prototype._adjustScale = function _adjustScale() {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScales = self.getYScales();
    var scales = [];

    xScale && scales.push(xScale);
    scales = scales.concat(yScales);
    var inFullCircle = coord.isPolar && isFullCircle(coord);
    var scaleController = self.get('scaleController');
    var colDefs = scaleController.defs;
    Util.each(scales, function (scale) {
      if ((scale.isCategory || scale.isIdentity) && scale.values && !(colDefs[scale.field] && colDefs[scale.field].range)) {
        var count = scale.values.length;
        var range = void 0;
        if (count === 1) {
          range = [0.5, 1]; // 只有一个分类时,防止计算出现 [0.5,0.5]的状态
        } else {
          var widthRatio = 1;
          var offset = 0;
          if (inFullCircle) {
            if (!coord.isTransposed) {
              range = [0, 1 - 1 / count];
            } else {
              widthRatio = Global.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [offset / 2, 1 - offset / 2];
            }
          } else {
            offset = 1 / count * 1 / 2; // 两边留下分类空间的一半
            range = [offset, 1 - offset]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
          }
        }
        scale.range = range;
      }
    });
  };

  Chart.prototype._removeGeoms = function _removeGeoms() {
    var geoms = this.get('geoms');
    while (geoms.length > 0) {
      var geom = geoms.shift();
      geom.destroy();
    }
  };

  Chart.prototype._clearGeoms = function _clearGeoms() {
    var geoms = this.get('geoms');
    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.clear();
    }
  };

  Chart.prototype._clearInner = function _clearInner() {
    this.set('scales', {});
    this._clearGeoms();

    Chart.plugins.notify(this, 'clearInner'); // TODO
    this.get('axisController') && this.get('axisController').clear();
    var frontPlot = this.get('frontPlot');
    var backPlot = this.get('backPlot');
    frontPlot && frontPlot.clear();
    backPlot && backPlot.clear();
  };

  Chart.prototype._execFilter = function _execFilter(data) {
    var filters = this.get('filters');
    if (filters) {
      data = data.filter(function (obj) {
        var rst = true;
        Util.each(filters, function (fn, k) {
          if (fn) {
            rst = fn(obj[k], obj);
            if (!rst) {
              return false;
            }
          }
        });
        return rst;
      });
    }
    return data;
  };

  Chart.prototype._initGeoms = function _initGeoms(geoms) {
    var coord = this.get('coord');
    var data = this.get('filteredData');
    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.set('data', data);
      geom.set('coord', coord);
      geom.init();
    }
  };

  Chart.prototype._initCoord = function _initCoord() {
    var plot = this.get('plotRange');
    var coordCfg = Util.mix({}, this.get('coordCfg'), {
      plot: plot
    });
    var type = coordCfg.type;
    var C = Coord[Util.upperFirst(type)] || Coord.Cartesian;
    var coord = new C(coordCfg);
    this.set('coord', coord);
  };

  Chart.prototype._initLayout = function _initLayout() {
    var padding = this.get('margin') || this.get('padding'); // 兼容margin 的写法
    padding = Util.parsePadding(padding);
    var top = padding[0] === 'auto' ? 0 : padding[0];
    var right = padding[1] === 'auto' ? 0 : padding[1];
    var bottom = padding[2] === 'auto' ? 0 : padding[2];
    var left = padding[3] === 'auto' ? 0 : padding[3];

    var width = this.get('width');
    var height = this.get('height');
    var plot = new Plot({
      start: {
        x: left,
        y: top
      },
      end: {
        x: width - right,
        y: height - bottom
      }
    });
    this.set('plotRange', plot);
    this.set('plot', plot);
  };

  Chart.prototype._initCanvas = function _initCanvas() {
    var self = this;
    try {
      var canvas = new Canvas({
        el: self.get('el') || self.get('id'),
        context: self.get('context'),
        pixelRatio: self.get('pixelRatio'),
        width: self.get('width'),
        height: self.get('height'),
        fontFamily: Global.fontFamily
      });
      self.set('canvas', canvas);
      self.set('width', canvas.get('width'));
      self.set('height', canvas.get('height'));
    } catch (info) {
      // 绘制时异常，中断重绘
      console.warn('error in init canvas');
      console.warn(info);
    }
    self._initLayout();
  };

  Chart.prototype._initLayers = function _initLayers() {
    var canvas = this.get('canvas');
    this.set('backPlot', canvas.addGroup({
      zIndex: 1
    }));
    this.set('middlePlot', canvas.addGroup({
      zIndex: 2
    }));
    this.set('frontPlot', canvas.addGroup({
      zIndex: 3
    }));
  };

  Chart.prototype.initColDefs = function initColDefs() {
    var colDefs = this.get('colDefs');
    if (colDefs) {
      var scaleController = this.get('scaleController');
      scaleController.defs = colDefs;
    }
  };

  Chart.prototype._init = function _init() {
    var self = this;
    self._initCanvas();
    self._initLayers();
    self.set('geoms', []);
    self.set('scaleController', new ScaleController());
    self.set('axisController', new AxisController({
      frontPlot: self.get('frontPlot'),
      backPlot: self.get('backPlot')
    }));
    self.initColDefs();
    Chart.plugins.notify(self, 'init'); // TODO: beforeInit afterInit
  };

  function Chart(cfg) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    Util.mix(_this, ViewGeoms); // 附加各种 geometry 对应的方法
    _this._init();
    return _this;
  }

  /**
   * 设置数据源和数据字段定义
   * @chainable
   * @param  {Array} data 数据集合
   * @param  {Object} colDefs 数据字段定义
   * @return {Chart} 返回当前 chart 的引用
   */


  Chart.prototype.source = function source(data, colDefs) {
    this.set('data', data);
    if (colDefs) {
      this.set('colDefs', colDefs);
    }
    this.initColDefs();
    return this;
  };

  /**
   * 设置坐标轴配置项
   * @chainable
   * @param  {String|Boolean} field 坐标轴对应的字段
   * @param  {Object} cfg 坐标轴的配置信息
   * @return {Chart} 返回当前 chart 的引用
   */


  Chart.prototype.axis = function axis(field, cfg) {
    var axisController = this.get('axisController');
    if (!field) {
      axisController.axisCfg = null;
    } else {
      axisController.axisCfg = axisController.axisCfg || {};
      axisController.axisCfg[field] = cfg;
    }
    return this;
  };

  /**
   * 设置图例
   * @chainable
   * @param  {Boolean|String|Object} field Boolean 表示关闭开启图例，String 表示指定具体的图例，Object 表示为所有的图例设置
   * @param  {Object|Boolean} cfg   图例的配置，Object 表示为对应的图例进行配置，Boolean 表示关闭对应的图例
   * @return {Chart}       返回当前 chart 的引用
   */


  Chart.prototype.legend = function legend(field, cfg) {
    var legendController = this.get('legendController');
    if (!legendController) {
      return this;
    }

    var legendCfg = legendController.legendCfg;

    if (Util.isBoolean(field)) {
      legendController.enable = field;
      legendCfg = cfg || {};
    } else if (Util.isObject(field)) {
      legendCfg = field;
    } else {
      legendCfg[field] = cfg;
    }

    legendController.legendCfg = legendCfg;

    return this;
  };

  /**
   * 设置坐标系配置项
   * @chainable
   * @param  {String} type 坐标系类型
   * @param  {Object} cfg 配置项
   * @return {Chart} 返回当前 chart 的引用
   */


  Chart.prototype.coord = function coord(type, cfg) {
    if (!type) {
      return;
    }
    var coordCfg = void 0;
    if (Util.isObject(type)) {
      coordCfg = type;
    } else {
      coordCfg = cfg || {};
      coordCfg.type = type;
    }
    this.set('coordCfg', coordCfg);

    return this;
  };

  Chart.prototype.filter = function filter(field, condition) {
    var filters = this.get('filters');
    filters[field] = condition;
  };

  /**
   * 配置 tooltip
   * @param  {Boolean|Object} enable Boolean 表示是否开启tooltip，Object 则表示配置项
   * @param  {Object} cfg 配置项
   * @return {Chart} 返回 Chart 实例
   */


  Chart.prototype.tooltip = function tooltip(enable) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var tooltipController = this.get('tooltipController');
    if (!tooltipController) {
      return this;
    }
    if (Util.isObject(enable)) {
      cfg = enable;
      enable = true;
    }
    tooltipController.enable = enable;
    tooltipController.cfg = cfg;

    return this;
  };

  /**
   * 为图表添加 guide
   * @return {GuideController} 返回 guide 控制器
   */


  Chart.prototype.guide = function guide() {
    return this.get('guideController');
  };

  /**
   * 图表绘制
   * @chainable
   * @return {Chart} 返回当前 chart 的引用
   */


  Chart.prototype.render = function render() {
    var self = this;
    var canvas = self.get('canvas');
    var geoms = self.get('geoms');
    // 处理数据
    var data = this.get('data') || [];
    var filteredData = this._execFilter(data);
    this.set('filteredData', filteredData);
    // 初始化坐标系
    self._initCoord();
    // 初始化 geoms
    self._initGeoms(geoms);
    // 调整度量
    self._adjustScale();

    // 绘制坐标轴
    Chart.plugins.notify(self, 'beforeGeomDraw');
    self._renderAxis();

    // 绘制 geom
    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.paint();
    }

    Chart.plugins.notify(self, 'afterGeomDraw');
    canvas.sort();
    canvas.draw();
    return self;
  };

  /**
   * 清空图表上面的图层
   * @chainable
   * @return {Chart} 返回当前 chart 的引用
   */


  Chart.prototype.clear = function clear() {
    Chart.plugins.notify(this, 'clear'); // TODO: beforeClear afterClear
    this._removeGeoms();
    this._clearInner();
    this.set('filters', {});

    var canvas = this.get('canvas');
    canvas.draw();
    return this;
  };

  Chart.prototype.repaint = function repaint() {
    Chart.plugins.notify(this, 'repaint');
    this._clearInner();
    this.render();
  };

  Chart.prototype.changeData = function changeData(data) {
    this.set('data', data);
    this.repaint();
  };

  Chart.prototype.destroy = function destroy() {
    this.clear();
    var canvas = this.get('canvas');
    canvas.destroy();
    _Base.prototype.destroy.call(this);
  };

  /**
   * 获取图例的 items
   * [getLegendItems description]
   * @return {[type]} [description]
   */


  Chart.prototype.getLegendItems = function getLegendItems() {
    var result = {};
    var legendController = this.get('legendController');
    if (legendController) {
      var legends = legendController.legends;
      Util.each(legends, function (legendItems) {
        Util.each(legendItems, function (legend) {
          var field = legend.field,
              items = legend.items;

          result[field] = items;
        });
      });
    }
    return result;
  };

  /**
   * 创建度量
   * @param  {String} field 度量对应的名称
   * @param  {Boolean} sortable 是否需要排序
   * @return {Scale} 度量
   */


  Chart.prototype.createScale = function createScale(field, sortable) {
    var data = this.get('data');
    var filteredData = this.get('filteredData');
    // 过滤导致数据为空时，需要使用全局数据
    // 参与过滤的字段的度量也根据全局数据来生成
    if (filteredData.length) {
      var legendFields = this._getFieldsForLegend();
      if (legendFields.indexOf(field) === -1) {
        data = filteredData;
      }
    }

    var scales = this.get('scales');
    if (!scales[field]) {
      scales[field] = this._createScale(field, data, sortable);
    }
    return scales[field];
  };

  /**
   * @protected
   * 添加几何标记
   * @param {Geom} geom 几何标记
   */


  Chart.prototype.addGeom = function addGeom(geom) {
    var geoms = this.get('geoms');
    geoms.push(geom);
    geom.set('chart', this);
    geom.set('container', this.get('middlePlot'));
  };

  /**
   * 获取 x 对应的度量
   * @return {Scale} x 对应的度量
   */


  Chart.prototype.getXScale = function getXScale() {
    var self = this;
    var geoms = self.get('geoms');
    var xScale = geoms[0].getXScale();
    return xScale;
  };

  /**
   * 获取 y 对应的度量
   * @return {Array} 返回所有 y 的度量
   */


  Chart.prototype.getYScales = function getYScales() {
    var geoms = this.get('geoms');
    var rst = [];

    Util.each(geoms, function (geom) {
      var yScale = geom.getYScale();
      if (Util.indexOf(rst, yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  };

  Chart.prototype._renderAxis = function _renderAxis() {
    var axisController = this.get('axisController');
    var xScale = this.getXScale();
    var yScales = this.getYScales();
    var coord = this.get('coord');
    axisController.createAxis(coord, xScale, yScales, this);
  };

  Chart.prototype._isAutoPadding = function _isAutoPadding() {
    var padding = this.get('padding');
    if (Util.isArray(padding)) {
      return padding.indexOf('auto') !== -1;
    }
    return padding === 'auto';
  };

  Chart.prototype._updateLayout = function _updateLayout(padding) {
    var width = this.get('width');
    var height = this.get('height');
    var start = {
      x: padding[3],
      y: padding[0]
    };
    var end = {
      x: width - padding[1],
      y: height - padding[2]
    };

    var plot = this.get('plot');
    var coord = this.get('coord');
    plot.reset(start, end);
    coord.reset(plot);
  };

  return Chart;
}(Base);

Chart.plugins = Chart.initPlugins();

module.exports = Chart;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var Plot = function () {
  function Plot(cfg) {
    _classCallCheck(this, Plot);

    Util.mix(this, cfg);
    this._init();
  }

  Plot.prototype._init = function _init() {
    var self = this;
    var start = self.start;
    var end = self.end;
    var xMin = Math.min(start.x, end.x);
    var xMax = Math.max(start.x, end.x);
    var yMin = Math.min(start.y, end.y);
    var yMax = Math.max(start.y, end.y);

    this.tl = {
      x: xMin,
      y: yMin
    };
    this.tr = {
      x: xMax,
      y: yMin
    };
    this.bl = {
      x: xMin,
      y: yMax
    };
    this.br = {
      x: xMax,
      y: yMax
    };
    this.width = xMax - xMin;
    this.height = yMax - yMin;
  };

  /**
   * 重置
   * @param  {Object} start 起始点
   * @param  {Object} end  结束点
   */


  Plot.prototype.reset = function reset(start, end) {
    this.start = start;
    this.end = end;
    this._init();
  };

  /**
   * 点是否在图表的绘制区域内
   * @param  {Nubmer}  x x坐标点
   * @param  {[type]}  y y坐标点
   * @return {Boolean} 是否在绘制区域内
   */


  Plot.prototype.isInRange = function isInRange(x, y) {
    if (Util.isObject(x)) {
      y = x.y;
      x = x.x;
    }
    var tl = this.tl;
    var br = this.br;
    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
  };

  return Plot;
}();

module.exports = Plot;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var Coord = __webpack_require__(15);

__webpack_require__(44);

module.exports = Coord;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(15);

var Cartesian = function (_Base) {
  _inherits(Cartesian, _Base);

  function Cartesian() {
    _classCallCheck(this, Cartesian);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  Cartesian.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      type: 'cartesian',
      transposed: false,
      isRect: true
    };
  };

  Cartesian.prototype.init = function init(start, end) {
    this.x = {
      start: start.x,
      end: end.x
    };

    this.y = {
      start: start.y,
      end: end.y
    };
  };

  Cartesian.prototype.convertPoint = function convertPoint(point) {
    var self = this;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    return {
      x: x.start + (x.end - x.start) * point[xDim],
      y: y.start + (y.end - y.start) * point[yDim]
    };
  };

  Cartesian.prototype.invertPoint = function invertPoint(point) {
    var self = this;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    var rst = {};
    rst[xDim] = (point.x - x.start) / (x.end - x.start);
    rst[yDim] = (point.y - y.start) / (y.end - y.start);
    return rst;
  };

  return Cartesian;
}(Base);

Base.Cartesian = Cartesian;
Base.Rect = Cartesian;
module.exports = Cartesian;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);
var Global = __webpack_require__(1);
var Scale = __webpack_require__(46);
var SCALE_TYPES_MAP = {
  linear: 'Linear',
  cat: 'Cat',
  timeCat: 'TimeCat',
  identity: 'Identity'
};

function getRange(values) {
  var max = Math.max.apply(null, values);
  var min = Math.min.apply(null, values);
  return {
    min: min,
    max: max
  };
}

var ScaleController = function () {
  function ScaleController(cfg) {
    _classCallCheck(this, ScaleController);

    // defs 列定义
    this.defs = {};
    Util.mix(this, cfg);
  }

  ScaleController.prototype._getDef = function _getDef(field) {
    var defs = this.defs;
    var def = null;
    if (Global.scales[field] || defs[field]) {
      def = Util.mix({}, Global.scales[field]);
      // 处理覆盖属性的问题
      Util.each(defs[field], function (v, k) {
        if (Util.isNil(v)) {
          delete def[k];
        } else {
          def[k] = v;
        }
      });
    }
    return def;
  };

  ScaleController.prototype._getDefaultType = function _getDefaultType(field, data) {
    var type = 'linear';
    var value = Util.Array.firstValue(data, field);
    if (Util.isArray(value)) {
      value = value[0];
    }
    if (Util.isString(value)) {
      type = 'cat';
    }
    return type;
  };

  ScaleController.prototype._getScaleCfg = function _getScaleCfg(type, field, data) {
    var cfg = {
      field: field
    };
    var values = Util.Array.values(data, field);
    cfg.values = values;
    if (type !== 'cat' && type !== 'timeCat') {
      var _getRange = getRange(values),
          min = _getRange.min,
          max = _getRange.max;

      cfg.min = min;
      cfg.max = max;
    }
    return cfg;
  };

  ScaleController.prototype.createScale = function createScale(field, data, sortable) {
    var self = this;
    var def = self._getDef(field);
    var scale = void 0;
    // 如果数据为空直接返回常量度量
    if (!data || !data.length) {
      if (def && def.type) {
        scale = new Scale[SCALE_TYPES_MAP[def.type]](def);
      } else {
        scale = new Scale.Identity({
          value: field,
          field: field.toString(),
          values: [field]
        });
      }
      return scale;
    }
    var firstObj = data[0];
    var firstValue = firstObj[field];
    if (firstValue === null) {
      firstValue = Util.Array.firstValue(data, field);
    }

    if (Util.isNumber(field) || Util.isNil(firstValue) && !def) {
      scale = new Scale.Identity({
        value: field,
        field: field.toString(),
        values: [field]
      });
    } else {
      // 如果已经定义过这个度量
      var type = void 0;
      if (def) {
        type = def.type;
      }
      type = type || self._getDefaultType(field, data);
      var cfg = self._getScaleCfg(type, field, data);
      if (def) {
        Util.mix(cfg, def);
      }
      cfg.sortable = sortable;
      scale = new Scale[SCALE_TYPES_MAP[type]](cfg);
    }
    return scale;
  };

  return ScaleController;
}();

module.exports = ScaleController;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview Scale entry, used to reference all the scales
 * @author dxq613@gmail.com
 */
var Scale = __webpack_require__(7);

__webpack_require__(47);
__webpack_require__(50);
__webpack_require__(22);

module.exports = Scale;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileOverview The measurement of linear data scale function
 * @author dxq613@gmail.com
 */

var Base = __webpack_require__(7);
var Util = __webpack_require__(0);
var numberAuto = __webpack_require__(48);

/**
 * 线性度量
 * @class Scale.Linear
 */

var Linear = function (_Base) {
  _inherits(Linear, _Base);

  function Linear() {
    _classCallCheck(this, Linear);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  /**
   * @override
   */
  Linear.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Base.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      /**
       * type of the scale
       * @type {String}
       */
      type: 'linear',

      /**
       * 是否线性
       * @type {Boolean}
       * @readOnly
       * @default true
       */
      isLinear: true,

      /**
       * min value of the scale
       * @type {Number}
       * @default null
       */
      min: null,

      /**
       * max value of the scale
       * @type {Number}
       * @default null
       */
      max: null,

      /**
       * 是否为了用户习惯，优化min,max和ticks，如果进行优化，则会根据生成的ticks调整min,max，否则舍弃(min,max)范围之外的ticks
       * @type {Boolean}
       * @default false
       */
      nice: true,

      /**
       * 自动生成标记时的个数
       * @type {Number}
       * @default null
       */
      tickCount: null,

      /**
       * 坐标轴点之间的间距，指的是真实数据的差值
       * @type {Number}
       * @default null
       */
      tickInterval: null
    });
  };
  /**
   * @protected
   * @override
   */


  Linear.prototype.init = function init() {
    var self = this;
    if (!self.ticks) {
      self.min = self.translate(self.min);
      self.max = self.translate(self.max);
      self.initTicks();
    } else {
      var ticks = self.ticks;
      var firstValue = self.translate(ticks[0]);
      var lastValue = self.translate(ticks[ticks.length - 1]);
      if (Util.isNil(self.min) || self.min > firstValue) {
        self.min = firstValue;
      }
      if (Util.isNil(self.max) || self.max < lastValue) {
        self.max = lastValue;
      }
    }
  };

  /**
   * 计算坐标点
   * @protected
   * @return {Array} 计算完成的坐标点
   */


  Linear.prototype.calculateTicks = function calculateTicks() {
    var self = this;
    var min = self.min;
    var max = self.max;
    var count = self.tickCount;
    var interval = self.tickInterval;
    if (max < min) {
      throw new Error('max: ' + max + ' should not be less than min: ' + min);
    }
    var tmp = numberAuto({
      min: min,
      max: max,
      minCount: count,
      maxCount: count,
      interval: interval
    });
    return tmp.ticks;
  };

  // 初始化ticks


  Linear.prototype.initTicks = function initTicks() {
    var self = this;
    var calTicks = self.calculateTicks();
    if (self.nice) {
      // 如果需要优化显示的tick
      self.ticks = calTicks;
      self.min = calTicks[0];
      self.max = calTicks[calTicks.length - 1];
    } else {
      var ticks = [];
      Util.each(calTicks, function (tick) {
        if (tick >= self.min && tick <= self.max) {
          ticks.push(tick);
        }
      });
      self.ticks = ticks;
    }
  };

  /**
   * @override
   */


  Linear.prototype.scale = function scale(value) {
    if (value === null || value === undefined) {
      return NaN;
    }
    var max = this.max;
    var min = this.min;
    if (max === min) {
      return 0;
    }

    var percent = (value - min) / (max - min);
    var rangeMin = this.rangeMin();
    var rangeMax = this.rangeMax();
    return rangeMin + percent * (rangeMax - rangeMin);
  };

  /**
   * @override
   */


  Linear.prototype.invert = function invert(value) {
    var percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
    return this.min + percent * (this.max - this.min);
  };

  return Linear;
}(Base);

Base.Linear = Linear;
module.exports = Linear;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 自动计算数字坐标轴
 * @author dxq613@gmail.com
 */

var Util = __webpack_require__(0);
var AutoUtil = __webpack_require__(49);
var MIN_COUNT = 5;
var MAX_COUNT = 7;
var INTERVAL_ARRAY = [0, 1, 2, 4, 5, 10];

module.exports = function (info) {
  var min = info.min;
  var max = info.max;
  var interval = info.interval;
  var ticks = [];
  var minCount = info.minCount || MIN_COUNT;
  var maxCount = info.maxCount || MAX_COUNT;
  var avgCount = (minCount + maxCount) / 2;
  var count = void 0;

  if (Util.isNil(min)) {
    min = 0;
  }
  if (Util.isNil(max)) {
    max = 0;
  }
  if (max === min) {
    if (min === 0) {
      max = 1;
    } else {
      if (min > 0) {
        min = 0;
      } else {
        max = 0;
      }
    }
    if (max - min < 5 && !interval && max - min >= 1) {
      interval = 1;
    }
  }

  if (Util.isNil(interval)) {
    // 计算间距
    var temp = (max - min) / (avgCount - 1);
    interval = AutoUtil.snapFactorTo(temp, INTERVAL_ARRAY, 'ceil');
    if (maxCount !== minCount) {
      count = parseInt((max - min) / interval, 10);
      if (count > maxCount) {
        count = maxCount;
      }
      if (count < minCount) {
        count = minCount;
      }
      // 不确定tick的个数时，使得tick偏小
      interval = AutoUtil.snapFactorTo((max - min) / (count - 1), INTERVAL_ARRAY, 'floor');
    } else {
      count = avgCount;
    }
  }
  if (info.interval || maxCount !== minCount) {
    // 校正 max 和 min
    max = AutoUtil.snapMultiple(max, interval, 'ceil'); // 向上逼近
    min = AutoUtil.snapMultiple(min, interval, 'floor'); // 向下逼近
    count = Math.round((max - min) / interval);
    min = Util.fixedBase(min, interval);
    max = Util.fixedBase(max, interval);
  } else {
    avgCount = parseInt(avgCount, 10); // 取整
    var avg = (max + min) / 2;
    var avgTick = AutoUtil.snapMultiple(avg, interval, 'ceil');
    var sideCount = Math.floor((avgCount - 2) / 2);
    var maxTick = avgTick + sideCount * interval;
    var minTick = void 0;
    if (avgCount % 2 === 0) {
      minTick = avgTick - sideCount * interval;
    } else {
      minTick = avgTick - (sideCount + 1) * interval;
    }
    if (maxTick < max) {
      maxTick = maxTick + interval;
    }
    if (minTick > min) {
      minTick = minTick - interval;
    }
    max = Util.fixedBase(maxTick, interval);
    min = Util.fixedBase(minTick, interval);
  }

  ticks.push(min);
  for (var i = 1; i < count; i++) {
    ticks.push(Util.fixedBase(interval * i + min, interval));
  }
  if (ticks[ticks.length - 1] < max) {
    ticks.push(max);
  }
  return {
    min: min,
    max: max,
    interval: interval,
    count: count,
    ticks: ticks
  };
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

/**
 * @fileOverview 计算方法
 * @author dxq613@gmail.com
 */

// 获取系数
function getFactor(v) {
  var factor = 1;
  if (v < 1) {
    var count = 0;
    while (v < 1) {
      factor = factor / 10;
      v = v * 10;
      count++;
    }
    // 浮点数计算出现问题
    if (factor.toString().length > 20) {
      factor = parseFloat(factor.toFixed(count));
    }
  } else {
    while (v > 10) {
      factor = factor * 10;
      v = v / 10;
    }
  }

  return factor;
}

// 取小于当前值的
function arrayFloor(values, value) {
  var length = values.length;
  if (length === 0) {
    return NaN;
  }

  var pre = values[0];

  if (value < values[0]) {
    return NaN;
  }

  if (value >= values[length - 1]) {
    return values[length - 1];
  }
  for (var i = 1, len = values.length; i < len; i++) {
    if (value < values[i]) {
      break;
    }
    pre = values[i];
  }

  return pre;
}

// 大于当前值的第一个
function arrayCeiling(values, value) {
  var length = values.length;
  if (length === 0) {
    return NaN;
  }
  // var pre = values[0];
  var rst = void 0;
  if (value > values[length - 1]) {
    return NaN;
  }
  if (value < values[0]) {
    return values[0];
  }

  for (var i = 1, len = values.length; i < len; i++) {
    if (value <= values[i]) {
      rst = values[i];
      break;
    }
  }

  return rst;
}

var Util = {
  // 获取逼近的数值
  snapFactorTo: function snapFactorTo(v, arr, snapType) {
    // 假设 v = -512,isFloor = true
    if (isNaN(v)) {
      return NaN;
    }
    var factor = 1; // 计算系数
    if (v !== 0) {
      if (v < 0) {
        factor = -1;
      }
      v = v * factor; // v = 512
      var tmpFactor = getFactor(v);
      factor = factor * tmpFactor; // factor = -100

      v = v / tmpFactor; // v = 5.12
    }
    if (snapType === 'floor') {
      v = Util.snapFloor(arr, v); // v = 5
    } else if (snapType === 'ceil') {
      v = Util.snapCeiling(arr, v); // v = 6
    } else {
      v = Util.snapTo(arr, v); // 四舍五入 5
    }
    var rst = v * factor;
    // 如果出现浮点数计算问题，需要处理一下
    if (Math.abs(factor) < 1 && rst.toString().length > 20) {
      var decimalVal = parseInt(1 / factor);
      var symbol = factor > 0 ? 1 : -1;
      rst = v / decimalVal * symbol;
    }
    return rst;
  },

  // 获取逼近的倍数
  snapMultiple: function snapMultiple(v, base, snapType) {
    var div = void 0;
    if (snapType === 'ceil') {
      div = Math.ceil(v / base);
    } else if (snapType === 'floor') {
      div = Math.floor(v / base);
    } else {
      div = Math.round(v / base);
    }
    return div * base;
  },

  /**
   * 获取逼近的值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的值
   */
  snapTo: function snapTo(values, value) {
    // 这里假定values是升序排列
    var floorVal = arrayFloor(values, value);
    var ceilingVal = arrayCeiling(values, value);
    if (isNaN(floorVal) || isNaN(ceilingVal)) {
      if (values[0] >= value) {
        return values[0];
      }
      var last = values[values.length - 1];
      if (last <= value) {
        return last;
      }
    }
    if (Math.abs(value - floorVal) < Math.abs(ceilingVal - value)) {
      return floorVal;
    }
    return ceilingVal;
  },

  /**
   * 获取逼近的最小值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最小值
   */
  snapFloor: function snapFloor(values, value) {
    // 这里假定values是升序排列
    return arrayFloor(values, value);
  },

  /**
   * 获取逼近的最大值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最大值
   */
  snapCeiling: function snapCeiling(values, value) {
    // 这里假定values是升序排列
    return arrayCeiling(values, value);
  }
};

module.exports = Util;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileOverview The data is replaced with constant
 * @author dxq613@gmail.com
 */

var Base = __webpack_require__(7);
var Util = __webpack_require__(0);

var Identity = function (_Base) {
  _inherits(Identity, _Base);

  function Identity() {
    _classCallCheck(this, Identity);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  /**
   * @override
   */
  Identity.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Base.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      isIdentity: true,
      /**
       * @override
       * @type {String}
       */
      type: 'identity',

      /**
       * 常量值
       * @type {*}
       */
      value: null
    });
  };

  /**
   * @override
   */


  Identity.prototype.getText = function getText() {
    return this.value.toString();
  };

  /**
   * @override
   */


  Identity.prototype.scale = function scale(value) {
    if (this.value !== value && Util.isNumber(value)) {
      return value;
    }
    return this.range[0];
  };

  /**
   * @override
   */


  Identity.prototype.invert = function invert() {
    return this.value;
  };

  return Identity;
}(Base);

Base.Identity = Identity;
module.exports = Identity;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);
var Axis = __webpack_require__(52);
var Global = __webpack_require__(1);

var _require = __webpack_require__(8),
    Shape = _require.Shape;

function formatTicks(ticks) {
  var tmp = ticks.slice(0);
  if (tmp.length > 0) {
    var first = tmp[0];
    var last = tmp[tmp.length - 1];
    if (first.value !== 0) {
      tmp.unshift({
        value: 0
      });
    }
    if (last.value !== 1) {
      tmp.push({
        value: 1
      });
    }
  }

  return tmp;
}

var AxisController = function () {
  function AxisController(cfg) {
    _classCallCheck(this, AxisController);

    this.axisCfg = {};
    this.frontPlot = null;
    this.backPlot = null;
    this.axes = {}; // 存储各个坐标轴的配置
    Util.mix(this, cfg);
  }

  // 对应的坐标轴是否隐藏


  AxisController.prototype._isHide = function _isHide(field) {
    var axisCfg = this.axisCfg;
    return !axisCfg || axisCfg[field] === false;
  };

  AxisController.prototype._getLinePosition = function _getLinePosition(scale, dimType, index) {
    var position = '';
    var field = scale.field;
    var axisCfg = this.axisCfg;
    if (axisCfg[field] && axisCfg[field].position) {
      position = axisCfg[field].position;
    } else if (dimType === 'x') {
      position = 'bottom';
    } else if (dimType === 'y') {
      position = index ? 'right' : 'left';
    }

    return position;
  };

  AxisController.prototype._getLineCfg = function _getLineCfg(coord, position) {
    var start = void 0;
    var end = void 0;
    var factor = 1; // 文本的对齐方式，是顺时针方向还是逆时针方向
    if (position === 'bottom') {
      // x轴的坐标轴,底部的横坐标
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
    } else if (position === 'right') {
      // 左侧 Y 轴
      start = { x: 1, y: 0 };
      end = { x: 1, y: 1 };
    } else if (position === 'left') {
      // 右侧 Y 轴
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
      factor = -1;
    }
    if (coord.transposed) {
      factor *= -1;
    }

    return {
      offsetFactor: factor,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  };

  AxisController.prototype._getCircleCfg = function _getCircleCfg(coord) {
    return {
      startAngle: coord.startAngle,
      endAngle: coord.endAngle,
      center: coord.center,
      radius: coord.radius
    };
  };

  AxisController.prototype._getRadiusCfg = function _getRadiusCfg(coord) {
    var transposed = coord.transposed;
    var start = void 0;
    var end = void 0;
    if (transposed) {
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
    } else {
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
    }
    return {
      offsetFactor: -1,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  };

  AxisController.prototype._getAxisCfg = function _getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg) {
    var axisCfg = this.axisCfg;
    var ticks = scale.getTicks();

    var cfg = Util.deepMix({
      ticks: ticks,
      frontContainer: this.frontPlot,
      backContainer: this.backPlot
    }, defaultCfg, axisCfg[scale.field]);

    var labels = [];
    var label = cfg.label;
    var count = ticks.length;
    var maxWidth = 0;
    var maxHeight = 0;
    var labelCfg = label;
    ticks.map(function (tick, index) {
      if (Util.isFunction(label)) {
        // 文本的配置项动态可配置
        labelCfg = Util.mix({}, Global._defaultAxis.label, label(tick.text, index, count));
      }
      if (labelCfg) {
        var textStyle = {};
        if (labelCfg.textAlign) {
          textStyle.textAlign = labelCfg.textAlign;
        }
        if (labelCfg.textBaseline) {
          textStyle.textBaseline = labelCfg.textBaseline;
        }
        var axisLabel = new Shape.Text({
          className: 'axis-label',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: tick.text
          }, labelCfg),
          value: tick.value,
          textStyle: textStyle,
          top: labelCfg.top
        });
        labels.push(axisLabel);

        var _axisLabel$getBBox = axisLabel.getBBox(),
            width = _axisLabel$getBBox.width,
            height = _axisLabel$getBBox.height;

        maxWidth = Math.max(maxWidth, width);
        maxHeight = Math.max(maxHeight, height);
      }
      return tick;
    });

    cfg.labels = labels;
    cfg.maxWidth = maxWidth;
    cfg.maxHeight = maxHeight;
    return cfg;
  };

  AxisController.prototype._createAxis = function _createAxis(coord, scale, verticalScale, dimType, index) {
    var self = this;
    var coordType = coord.type;
    var transposed = coord.transposed;
    var type = void 0;
    var key = void 0;
    var defaultCfg = void 0;
    if (coordType === 'cartesian' || coordType === 'rect') {
      // 直角坐标系下
      var position = self._getLinePosition(scale, dimType, index);
      defaultCfg = Global.axis[position];
      defaultCfg.position = position;
      type = 'Line';
      key = position;
    } else {
      // 极坐标系下
      if (dimType === 'x' && !transposed || dimType === 'y' && transposed) {
        // 圆形坐标轴
        defaultCfg = Global.axis.circle;
        type = 'Circle';
        key = 'circle';
      } else {
        // 半径坐标轴
        defaultCfg = Global.axis.radius;
        type = 'Line';
        key = 'radius';
      }
    }
    var cfg = self._getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg); // 坐标轴的配置项
    cfg.type = type;
    cfg.dimType = dimType;
    cfg.verticalScale = verticalScale;
    this.axes[key] = cfg;
  };

  AxisController.prototype.createAxis = function createAxis(coord, xScale, yScales, chart) {
    var self = this;
    if (xScale && !self._isHide(xScale.field)) {
      self._createAxis(coord, xScale, yScales[0], 'x'); // 绘制 x 轴
    }
    Util.each(yScales, function (yScale, index) {
      if (!self._isHide(yScale.field)) {
        self._createAxis(coord, yScale, xScale, 'y', index);
      }
    });

    var axes = this.axes;
    if (chart._isAutoPadding()) {
      var userPadding = Util.parsePadding(chart.get('padding'));
      var appendPadding = chart.get('appendPadding');
      var legendRange = chart.get('legendRange') || {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };

      var padding = [userPadding[0] === 'auto' ? 0 : userPadding[0], userPadding[1] === 'auto' ? 0 : userPadding[1], userPadding[2] === 'auto' ? 0 : userPadding[2], userPadding[3] === 'auto' ? 0 : userPadding[3]];
      padding[0] += legendRange.top + appendPadding * 2; // top 需要给 tooltip 留一些距离
      padding[1] += legendRange.right + appendPadding;
      padding[2] += legendRange.bottom + appendPadding;
      padding[3] += legendRange.left + appendPadding;

      if (coord.isPolar) {
        var circleAxis = axes.circle;
        if (circleAxis) {
          var maxHeight = circleAxis.maxHeight,
              maxWidth = circleAxis.maxWidth,
              labelOffset = circleAxis.labelOffset;

          padding[0] += maxHeight + labelOffset;
          padding[1] += maxWidth + labelOffset;
          padding[2] += maxHeight + labelOffset;
          padding[3] += maxWidth + labelOffset;
        }
      } else {
        if (axes.right && userPadding[1] === 'auto') {
          var _axes$right = axes.right,
              _maxWidth = _axes$right.maxWidth,
              _maxHeight = _axes$right.maxHeight,
              _labelOffset = _axes$right.labelOffset;

          padding[1] += _maxWidth + _labelOffset;
          padding[0] = Math.max(_maxHeight, padding[0]);
          padding[2] = Math.max(_maxHeight, padding[2]);
        }

        if (axes.left && userPadding[3] === 'auto') {
          var _axes$left = axes.left,
              _maxWidth2 = _axes$left.maxWidth,
              _maxHeight2 = _axes$left.maxHeight,
              _labelOffset2 = _axes$left.labelOffset;

          padding[3] += _maxWidth2 + _labelOffset2;
          padding[0] = Math.max(_maxHeight2, padding[0]);
          padding[2] = Math.max(_maxHeight2, padding[2]);
        }

        if (axes.bottom && userPadding[2] === 'auto') {
          var _axes$bottom = axes.bottom,
              _maxWidth3 = _axes$bottom.maxWidth,
              _maxHeight3 = _axes$bottom.maxHeight,
              _labelOffset3 = _axes$bottom.labelOffset;

          padding[2] += _maxHeight3 + _labelOffset3;
          // padding[1] = Math.max(maxWidth, padding[1]);
          // padding[3] = Math.max(maxWidth, padding[3]);
        }
      }

      chart._updateLayout(padding);
    }

    Util.each(axes, function (axis) {
      var type = axis.type,
          position = axis.position,
          grid = axis.grid,
          verticalScale = axis.verticalScale,
          ticks = axis.ticks,
          dimType = axis.dimType;

      var appendCfg = void 0;
      if (coord.isPolar) {
        if (type === 'Line') {
          appendCfg = self._getRadiusCfg(coord);
        } else if (type === 'Circle') {
          appendCfg = self._getCircleCfg(coord);
        }
      } else {
        appendCfg = self._getLineCfg(coord, position);
      }

      if (grid && verticalScale) {
        var gridPoints = [];
        var verticalTicks = formatTicks(verticalScale.getTicks());

        Util.each(ticks, function (tick) {
          var subPoints = [];
          Util.each(verticalTicks, function (verticalTick) {
            var x = dimType === 'x' ? tick.value : verticalTick.value;
            var y = dimType === 'x' ? verticalTick.value : tick.value;
            var point = coord.convertPoint({
              x: x,
              y: y
            });
            subPoints.push({
              x: point.x,
              y: point.y
            });
          });
          gridPoints.push(subPoints);
        });
        axis.gridPoints = gridPoints;
      }

      new Axis[type](Util.mix(axis, appendCfg));
    });
  };

  AxisController.prototype.clear = function clear() {
    this.axes = {};
  };

  return AxisController;
}();

module.exports = AxisController;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Abstract = __webpack_require__(16);

// require('./circle');
__webpack_require__(53);

module.exports = Abstract;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Abstract = __webpack_require__(16);

var Line = function (_Abstract) {
  _inherits(Line, _Abstract);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _Abstract.apply(this, arguments));
  }

  Line.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Abstract.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      start: null,
      end: null
    });
  };
  // 获取坐标轴上的点


  Line.prototype.getOffsetPoint = function getOffsetPoint(value) {
    var start = this.start,
        end = this.end;

    return {
      x: start.x + (end.x - start.x) * value,
      y: start.y + (end.y - start.y) * value
    };
  };

  // 获取坐标轴上点的向量，极坐标下覆盖此方法


  Line.prototype.getAxisVector = function getAxisVector() {
    var start = this.start,
        end = this.end;

    return [end.x - start.x, end.y - start.y];
  };

  Line.prototype.drawLine = function drawLine(lineCfg) {
    var container = this.getContainer(lineCfg.top);
    var start = this.start,
        end = this.end;

    container.addShape('line', {
      className: 'axis-line',
      attrs: Util.mix({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
      }, lineCfg)
    });
  };

  return Line;
}(Abstract);

Abstract.Line = Line;
module.exports = Line;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var DOMUtil = __webpack_require__(12);
var Base = __webpack_require__(9);
var Container = __webpack_require__(18);
var Group = __webpack_require__(20);

var Canvas = function (_Base) {
  _inherits(Canvas, _Base);

  Canvas.prototype.getDefaultCfg = function getDefaultCfg() {
    return {
      type: 'canvas',
      el: null,
      context: null,
      width: null,
      height: null,
      children: [],
      pixelRatio: null
    };
  };

  function Canvas(cfg) {
    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, _Base.call(this, cfg));

    _this._initPixelRatio();
    _this._initCanvas();
    return _this;
  }

  Canvas.prototype._initPixelRatio = function _initPixelRatio() {
    var pixelRatio = this.get('pixelRatio');
    if (!pixelRatio) {
      this.set('pixelRatio', DOMUtil.getPixelRatio());
    }
  };

  Canvas.prototype._beforeDraw = function _beforeDraw() {
    var context = this.get('context');
    var el = this.get('el');
    context && context.clearRect(0, 0, el.width, el.height);
  };

  Canvas.prototype._initCanvas = function _initCanvas() {
    var self = this;
    var el = self.get('el');
    var context = self.get('context');
    var canvas = void 0;

    if (context) {
      // CanvasRenderingContext2D
      canvas = context.canvas;
    } else if (Util.isString(el)) {
      // HTMLElement's id
      canvas = DOMUtil.getDomById(el);
    } else {
      // HTMLElement
      canvas = el;
    }

    if (!canvas) {
      throw new Error('Please specify the id or el of the chart!');
    }

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function () {
        return context;
      };
    }

    var width = self.get('width');
    if (!width) {
      width = DOMUtil.getWidth(canvas);
      self.set('width', width);
    }

    var height = self.get('height');
    if (!height) {
      height = DOMUtil.getHeight(canvas);
      self.set('height', height);
    }

    var ratio = self.get('pixelRatio');
    if (ratio) {
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.height = height + 'px';
      canvas.style.width = width + 'px';
      if (ratio !== 1) {
        var ctx = canvas.getContext('2d');
        ctx.scale(ratio, ratio);
      }
    }
    self.set('canvas', this);
    self.set('el', canvas);
    self.set('context', context || canvas.getContext('2d'));
  };

  /**
   * 获取 canvas 对应 dom 元素的宽度
   * @return {Number} 返回宽度
   */


  Canvas.prototype.getWidth = function getWidth() {
    var pixelRatio = this.get('pixelRatio');
    var width = this.get('width');
    return width * pixelRatio;
  };

  /**
   * 获取 canvas 对应 dom 元素的高度
   * @return {Number} 返回高度
   */


  Canvas.prototype.getHeight = function getHeight() {
    var pixelRatio = this.get('pixelRatio');
    var height = this.get('height');
    return height * pixelRatio;
  };

  /**
   * 改变 canvas 的宽高
   * @param  {Number} width  宽度
   * @param  {Number} height 高度
   */


  Canvas.prototype.changeSize = function changeSize(width, height) {
    var pixelRatio = this.get('pixelRatio');
    var canvasDOM = this.get('el');
    canvasDOM.style.width = width + 'px';
    canvasDOM.style.height = height + 'px';
    canvasDOM.setAttribute('width', width * pixelRatio);
    canvasDOM.setAttribute('height', height * pixelRatio);
  };

  /**
   * 将窗口坐标转变成 canvas 坐标
   * @param  {Number} clientX 窗口x坐标
   * @param  {Number} clientY 窗口y坐标
   * @return {Object} canvas坐标
   */


  Canvas.prototype.getPointByClient = function getPointByClient(clientX, clientY) {
    var el = this.get('el');
    var bbox = el.getBoundingClientRect();
    var width = bbox.right - bbox.left;
    var height = bbox.bottom - bbox.top;
    return {
      x: (clientX - bbox.left) * (el.width / width),
      y: (clientY - bbox.top) * (el.height / height)
    };
  };

  Canvas.prototype.draw = function draw() {
    var self = this;
    if (self.get('destroyed')) {
      return;
    }
    self._beforeDraw();
    try {
      var context = self.get('context');
      var children = self.get('children');
      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        child.draw(context);
      }
    } catch (ev) {
      // 绘制时异常，中断重绘
      console.warn('error in draw canvas, detail as:');
      console.warn(ev);
    }
  };

  Canvas.prototype.destroy = function destroy() {
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    this._attrs = {};
    this.set('destroyed', true);
  };

  return Canvas;
}(Base);

Util.mix(Canvas.prototype, Container, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});

module.exports = Canvas;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = {
  multiply: function multiply(m1, m2) {
    var m11 = m1[0] * m2[0] + m1[2] * m2[1];
    var m12 = m1[1] * m2[0] + m1[3] * m2[1];

    var m21 = m1[0] * m2[2] + m1[2] * m2[3];
    var m22 = m1[1] * m2[2] + m1[3] * m2[3];

    var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

    return [m11, m12, m21, m22, dx, dy];
  },
  invert: function invert(m) {
    var d = 1 / (m[0] * m[3] - m[1] * m[2]);
    var m0 = m[3] * d;
    var m1 = -m[1] * d;
    var m2 = -m[2] * d;
    var m3 = m[0] * d;
    var m4 = d * (m[2] * m[5] - m[3] * m[4]);
    var m5 = d * (m[1] * m[4] - m[0] * m[5]);
    return [m0, m1, m2, m3, m4, m5];
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);

var Rect = function (_Shape) {
  _inherits(Rect, _Shape);

  function Rect() {
    _classCallCheck(this, Rect);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Rect.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'rect'
    });
  };

  Rect.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      radius: 0,
      lineWidth: 0
    };
  };

  Rect.prototype.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        width = attrs.width,
        height = attrs.height,
        radius = attrs.radius;

    context = context || self.get('context');

    context.beginPath();
    if (radius === 0) {
      context.rect(x, y, width, height);
    } else {
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
      context.lineTo(x + width, y + height - radius);
      context.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
      context.lineTo(x + radius, y + height);
      context.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
      context.lineTo(x, y + radius);
      context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
    }
  };

  Rect.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        width = attrs.width,
        height = attrs.height;

    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  };

  return Rect;
}(Shape);

Shape.Rect = Rect;
module.exports = Rect;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);

var Circle = function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Circle.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'circle'
    });
  };

  Circle.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      lineWidth: 0
    };
  };

  Circle.prototype.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r;

    context = context || this.get('context');
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
  };

  Circle.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r;


    return {
      minX: x - r,
      maxX: x + r,
      minY: y - r,
      maxY: y + r
    };
  };

  return Circle;
}(Shape);

Shape.Circle = Circle;
module.exports = Circle;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);
var bbox = __webpack_require__(6);

var Line = function (_Shape) {
  _inherits(Line, _Shape);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Line.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canStroke: true,
      type: 'line'
    });
  };

  Line.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      lineWidth: 1
    };
  };

  Line.prototype.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;

    context = context || this.get('context');
    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  };

  Line.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;

    return bbox.getBBoxFromLine(x1, y1, x2, y2);
  };

  return Line;
}(Shape);

Shape.Line = Line;
module.exports = Line;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);
var bbox = __webpack_require__(6);

var Polygon = function (_Shape) {
  _inherits(Polygon, _Shape);

  function Polygon() {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Polygon.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'polygon'
    });
  };

  Polygon.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 0
    };
  };

  Polygon.prototype.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var points = attrs.points;
    if (points.length < 2) {
      return;
    }
    context = context || self.get('context');
    context.beginPath();

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.closePath();
  };

  Polygon.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var points = attrs.points;

    return bbox.getBBoxFromPoints(points);
  };

  return Polygon;
}(Shape);

Shape.Polygon = Polygon;
module.exports = Polygon;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);
var Smooth = __webpack_require__(21);
var bbox = __webpack_require__(6);

var Polyline = function (_Shape) {
  _inherits(Polyline, _Shape);

  function Polyline() {
    _classCallCheck(this, Polyline);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Polyline.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canStroke: true,
      canFill: true,
      type: 'polyline'
    });
  };

  Polyline.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 1,
      smooth: false
    };
  };

  Polyline.prototype.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var points = attrs.points,
        smooth = attrs.smooth;


    if (points.length < 2) {
      return;
    }
    context = context || self.get('context');
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    if (smooth) {
      var constaint = [[0, 0], [1, 1]];
      var sps = Smooth.smooth(points, false, constaint);
      for (var i = 0, n = sps.length; i < n; i++) {
        var sp = sps[i];
        context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
      }
    } else {
      var _i = void 0;
      var l = void 0;
      for (_i = 1, l = points.length - 1; _i < l; _i++) {
        context.lineTo(points[_i].x, points[_i].y);
      }
      context.lineTo(points[l].x, points[l].y);
    }
  };

  Polyline.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var points = attrs.points,
        smooth = attrs.smooth;


    if (smooth) {
      var newPoints = [];
      var constaint = [[0, 0], [1, 1]];
      var sps = Smooth.smooth(points, false, constaint);
      for (var i = 0, n = sps.length; i < n; i++) {
        var sp = sps[i];
        if (i === 0) {
          newPoints.push([points[0].x, points[0].y, sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
        } else {
          var lastPoint = sps[i - 1];
          newPoints.push([lastPoint[5], lastPoint[6], sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
        }
      }
      return bbox.getBBoxFromBezierGroup(newPoints);
    }
    return bbox.getBBoxFromPoints(points);
  };

  return Polyline;
}(Shape);

Shape.Polyline = Polyline;
module.exports = Polyline;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);
var bbox = __webpack_require__(6);

var Arc = function (_Shape) {
  _inherits(Arc, _Shape);

  function Arc() {
    _classCallCheck(this, Arc);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Arc.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canStroke: true,
      type: 'arc'
    });
  };

  Arc.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: false,
      lineWidth: 1
    };
  };

  Arc.prototype.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        clockwise = attrs.clockwise;


    context = context || this.get('context');
    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle, clockwise);
  };

  Arc.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        clockwise = attrs.clockwise;


    return bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, clockwise);
  };

  return Arc;
}(Shape);

Shape.Arc = Arc;
module.exports = Arc;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);
var bbox = __webpack_require__(6);

var Sector = function (_Shape) {
  _inherits(Sector, _Shape);

  function Sector() {
    _classCallCheck(this, Sector);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Sector.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'sector'
    });
  };

  Sector.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0,
      r: 0,
      r0: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: false
    };
  };

  Sector.prototype.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        r = attrs.r,
        r0 = attrs.r0,
        clockwise = attrs.clockwise;

    context = context || this.get('context');
    context.beginPath();
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);

    context.moveTo(unitX * r0 + x, unitY * r0 + y);
    context.lineTo(unitX * r + x, unitY * r + y);
    context.arc(x, y, r, startAngle, endAngle, clockwise);
    context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);
    if (r0 !== 0) {
      context.arc(x, y, r0, endAngle, startAngle, !clockwise);
    }
    context.closePath();
  };

  Sector.prototype.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        r0 = attrs.r0,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        clockwise = attrs.clockwise;

    var outerBBox = bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, clockwise);
    var innerBBox = bbox.getBBoxFromArc(x, y, r0, startAngle, endAngle, clockwise);
    return {
      minX: Math.min(outerBBox.minX, innerBBox.minX),
      minY: Math.min(outerBBox.minY, innerBBox.minY),
      maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
      maxY: Math.max(outerBBox.maxY, innerBBox.maxY)
    };
  };

  return Sector;
}(Shape);

Shape.Sector = Sector;
module.exports = Sector;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var DOMUtil = __webpack_require__(12);
var Shape = __webpack_require__(2);

var dummyContext = void 0;
var textWidthCacheCounter = 0;
var textWidthCache = {};
var TEXT_CACHE_MAX = 5000;

var Text = function (_Shape) {
  _inherits(Text, _Shape);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Text.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'text'
    });
  };

  Text.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {
      lineWidth: 0,
      lineCount: 1,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textAlign: 'start',
      textBaseline: 'bottom',
      lineHeight: null,
      textArr: null
    };
  };

  Text.prototype.initTransform = function initTransform() {
    var attrs = this._attrs.attrs;
    this._attrs.matrix = [1, 0, 0, 1, 0, 0];
    var fontSize = attrs.fontSize;
    if (fontSize && +fontSize < 12) {
      // 小于 12 像素的文本进行 scale 处理
      this.transform([['t', attrs.x, attrs.y], ['s', +fontSize / 12, +fontSize / 12], ['t', -attrs.x, -attrs.y]]);
    }
  };

  Text.prototype._getFontStyle = function _getFontStyle() {
    var attrs = this._attrs.attrs;
    var fontSize = attrs.fontSize,
        fontFamily = attrs.fontFamily,
        fontWeight = attrs.fontWeight,
        fontStyle = attrs.fontStyle,
        fontVariant = attrs.fontVariant;

    return fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + fontSize + 'px ' + fontFamily;
  };

  Text.prototype._afterAttrsSet = function _afterAttrsSet() {
    var attrs = this._attrs.attrs;
    attrs.font = this._getFontStyle();

    if (attrs.text) {
      var text = attrs.text;
      var textArr = void 0;
      if (Util.isString(text) && text.indexOf('\n') !== -1) {
        textArr = text.split('\n');
        var lineCount = textArr.length;
        attrs.lineCount = lineCount;
        attrs.textArr = textArr;
      }
    }
    this.set('attrs', attrs);
  };

  Text.prototype._getTextHeight = function _getTextHeight() {
    var attrs = this._attrs.attrs;
    var lineCount = attrs.lineCount;
    var fontSize = attrs.fontSize * 1;
    if (lineCount > 1) {
      var spaceingY = this._getSpaceingY();
      return fontSize * lineCount + spaceingY * (lineCount - 1);
    }
    return fontSize;
  };

  Text.prototype._getSpaceingY = function _getSpaceingY() {
    var attrs = this._attrs.attrs;
    var lineHeight = attrs.lineHeight;
    var fontSize = attrs.fontSize * 1;
    return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
  };

  Text.prototype.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self._attrs.attrs;
    var text = attrs.text;
    if (!text) {
      return;
    }
    var textArr = attrs.textArr;
    var fontSize = attrs.fontSize * 1;
    var spaceingY = self._getSpaceingY();
    var x = attrs.x;
    var y = attrs.y;
    var textBaseline = attrs.textBaseline;
    var height = void 0;
    if (textArr) {
      height = self._getTextHeight();
    }
    var subY = void 0;

    // context.beginPath();
    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;
      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
      }
      if (textArr) {
        for (var i = 0, len = textArr.length; i < len; i++) {
          var subText = textArr[i];
          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;
          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }
          if (textBaseline === 'top') {
            subY += height - fontSize;
          }
          context.fillText(subText, x, subY);
        }
      } else {
        context.fillText(text, x, y);
      }
    }

    if (self.hasStroke()) {
      if (textArr) {
        for (var _i = 0, _len = textArr.length; _i < _len; _i++) {
          var _subText = textArr[_i];
          subY = y + _i * (spaceingY + fontSize) - height + fontSize; // bottom;
          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }
          if (textBaseline === 'top') {
            subY += height - fontSize;
          }
          context.strokeText(_subText, x, subY);
        }
      } else {
        context.strokeText(text, x, y);
      }
    }
  };

  Text.prototype.calculateBox = function calculateBox() {
    var self = this;
    var attrs = self._attrs.attrs;
    var x = attrs.x,
        y = attrs.y,
        textAlign = attrs.textAlign,
        textBaseline = attrs.textBaseline;

    var width = self._getTextWidth(); // attrs.width
    if (!width) {
      // 如果width不存在，四点共其实点
      return {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      };
    }
    var height = self._getTextHeight(); // attrs.height
    var point = {
      x: x,
      y: y - height
    }; // default textAlign: start, textBaseline: bottom

    if (textAlign) {
      if (textAlign === 'end' || textAlign === 'right') {
        point.x -= width;
      } else if (textAlign === 'center') {
        point.x -= width / 2;
      }
    }

    if (textBaseline) {
      if (textBaseline === 'top') {
        point.y += height;
      } else if (textBaseline === 'middle') {
        point.y += height / 2;
      }
    }

    return {
      minX: point.x,
      minY: point.y,
      maxX: point.x + width,
      maxY: point.y + height
    };
  };

  Text.prototype._getDummyContext = function _getDummyContext() {
    if (dummyContext) {
      return dummyContext;
    }
    dummyContext = DOMUtil.createCanvas().getContext('2d');
    return dummyContext;
  };

  Text.prototype._getTextWidth = function _getTextWidth() {
    var attrs = this._attrs.attrs;
    var text = attrs.text;

    if (Util.isNil(text)) return undefined;

    var font = attrs.font;
    var textArr = attrs.textArr;
    var key = text + '' + font;
    if (textWidthCache[key]) {
      return textWidthCache[key];
    }

    var width = 0;
    var context = this._getDummyContext();
    context.font = font;
    if (textArr) {
      for (var i = 0, length = textArr.length; i < length; i++) {
        var subText = textArr[i];
        width = Math.max(width, context.measureText(subText).width);
      }
    } else {
      width = context.measureText(text).width;
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
      textWidthCacheCounter = 0;
      textWidthCache = {};
    }
    textWidthCacheCounter++;
    textWidthCache[key] = width;

    return width;
  };

  return Text;
}(Shape);

Shape.Text = Text;
module.exports = Text;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var Shape = __webpack_require__(2);

var Custom = function (_Shape) {
  _inherits(Custom, _Shape);

  function Custom() {
    _classCallCheck(this, Custom);

    return _possibleConstructorReturn(this, _Shape.apply(this, arguments));
  }

  Custom.prototype.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Shape.prototype.getDefaultCfg.call(this);
    return Util.mix({}, cfg, {
      type: 'custom',
      createPath: null,
      canFill: true,
      canStroke: true
    });
  };

  Custom.prototype.createPath = function createPath(context) {
    var createPath = this.get('createPath');
    if (createPath) {
      createPath(context);
    }
  };

  // TODO


  Custom.prototype.calculateBox = function calculateBox() {
    return null;
  };

  return Custom;
}(Shape);

Shape.Custom = Custom;
module.exports = Custom;

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 仅包含简单的折、柱、饼
 */
__webpack_require__(33); // 折线图
__webpack_require__(34); // 柱状图

__webpack_require__(36); // 数据调整

__webpack_require__(39); // 极坐标系

var F2 = __webpack_require__(40);

module.exports = F2;

/***/ })
/******/ ]);
});
//# sourceMappingURL=f2-simple.js.map