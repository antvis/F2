(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.F2 = {})));
})(this, function (exports) {
  'use strict';

  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')
      ? x['default']
      : x;
  }

  function createCommonjsModule(fn, basedir, module) {
    return (
      (module = {
        path: basedir,
        exports: {},
        require: function (path, base) {
          return commonjsRequire(path, base === undefined || base === null ? module.path : base);
        },
      }),
      fn(module, module.exports),
      module.exports
    );
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var _typeof_1 = createCommonjsModule(function (module) {
    function _typeof(obj) {
      '@babel/helpers - typeof';

      return (
        ((module.exports = _typeof =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (obj) {
                return typeof obj;
              }
            : function (obj) {
                return obj &&
                  'function' == typeof Symbol &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj;
              }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports)),
        _typeof(obj)
      );
    }
    (module.exports = _typeof),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _typeof = /*@__PURE__*/ getDefaultExportFromCjs(_typeof_1);

  var toPrimitive = createCommonjsModule(function (module) {
    var _typeof = _typeof_1['default'];
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== 'object' || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || 'default');
        if (_typeof(res) !== 'object') return res;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return (hint === 'string' ? String : Number)(input);
    }
    (module.exports = _toPrimitive),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var toPropertyKey = createCommonjsModule(function (module) {
    var _typeof = _typeof_1['default'];

    function _toPropertyKey(arg) {
      var key = toPrimitive(arg, 'string');
      return _typeof(key) === 'symbol' ? key : String(key);
    }
    (module.exports = _toPropertyKey),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var defineProperty = createCommonjsModule(function (module) {
    function _defineProperty(obj, key, value) {
      key = toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    (module.exports = _defineProperty),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _defineProperty = /*@__PURE__*/ getDefaultExportFromCjs(defineProperty);

  var objectSpread2 = createCommonjsModule(function (module) {
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly &&
          (symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })),
          keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2
          ? ownKeys(Object(source), !0).forEach(function (key) {
              defineProperty(target, key, source[key]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
          : ownKeys(Object(source)).forEach(function (key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
      }
      return target;
    }
    (module.exports = _objectSpread2),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _objectSpread = /*@__PURE__*/ getDefaultExportFromCjs(objectSpread2);

  var isArrayLike = function (value) {
    /**
     * isArrayLike([1, 2, 3]) => true
     * isArrayLike(document.body.children) => true
     * isArrayLike('abc') => true
     * isArrayLike(Function) => false
     */
    return value !== null && typeof value !== 'function' && isFinite(value.length);
  };

  var filter = function (arr, func) {
    if (!isArrayLike(arr)) {
      return arr;
    }
    var result = [];
    for (var index = 0; index < arr.length; index++) {
      var value = arr[index];
      if (func(value, index)) {
        result.push(value);
      }
    }
    return result;
  };

  var toString = {}.toString;
  var isType = function (value, type) {
    return toString.call(value) === '[object ' + type + ']';
  };

  /**
   * 是否为函数
   * @param  {*} fn 对象
   * @return {Boolean}  是否函数
   */
  var isFunction = function (value) {
    return isType(value, 'Function');
  };

  // isFinite,
  var isNil = function (value) {
    /**
     * isNil(null) => true
     * isNil() => true
     */
    return value === null || value === undefined;
  };

  var isArray = function (value) {
    return Array.isArray ? Array.isArray(value) : isType(value, 'Array');
  };

  var isObject = function (value) {
    /**
     * isObject({}) => true
     * isObject([1, 2, 3]) => true
     * isObject(Function) => true
     * isObject(null) => false
     */
    var type = typeof value;
    return (value !== null && type === 'object') || type === 'function';
  };

  function each(elements, func) {
    if (!elements) {
      return;
    }
    var rst;
    if (isArray(elements)) {
      for (var i = 0, len = elements.length; i < len; i++) {
        rst = func(elements[i], i);
        if (rst === false) {
          break;
        }
      }
    } else if (isObject(elements)) {
      for (var k in elements) {
        if (elements.hasOwnProperty(k)) {
          rst = func(elements[k], k);
          if (rst === false) {
            break;
          }
        }
      }
    }
  }

  var keys = Object.keys
    ? function (obj) {
        return Object.keys(obj);
      }
    : function (obj) {
        var result = [];
        each(obj, function (value, key) {
          if (!(isFunction(obj) && key === 'prototype')) {
            result.push(key);
          }
        });
        return result;
      };

  function isMatch(obj, attrs) {
    var _keys = keys(attrs);
    var length = _keys.length;
    if (isNil(obj)) return !length;
    for (var i = 0; i < length; i += 1) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) {
        return false;
      }
    }
    return true;
  }

  var isObjectLike = function (value) {
    /**
     * isObjectLike({}) => true
     * isObjectLike([1, 2, 3]) => true
     * isObjectLike(Function) => false
     * isObjectLike(null) => false
     */
    return typeof value === 'object' && value !== null;
  };

  var isPlainObject = function (value) {
    /**
     * isObjectLike(new Foo) => false
     * isObjectLike([1, 2, 3]) => false
     * isObjectLike({ x: 0, y: 0 }) => true
     * isObjectLike(Object.create(null)) => true
     */
    if (!isObjectLike(value) || !isType(value, 'Object')) {
      return false;
    }
    if (Object.getPrototypeOf(value) === null) {
      return true;
    }
    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  };

  function find(arr, predicate) {
    if (!isArray(arr)) return null;
    var _predicate;
    if (isFunction(predicate)) {
      _predicate = predicate;
    }
    if (isPlainObject(predicate)) {
      _predicate = function (a) {
        return isMatch(a, predicate);
      };
    }
    if (_predicate) {
      for (var i = 0; i < arr.length; i += 1) {
        if (_predicate(arr[i])) {
          return arr[i];
        }
      }
    }
    return null;
  }

  function findIndex(arr, predicate, fromIndex) {
    if (fromIndex === void 0) {
      fromIndex = 0;
    }
    for (var i = fromIndex; i < arr.length; i++) {
      if (predicate(arr[i], i)) {
        // 找到终止循环
        return i;
      }
    }
    return -1;
  }

  /**
   * Flattens `array` a single level deep.
   *
   * @param {Array} arr The array to flatten.
   * @return {Array} Returns the new flattened array.
   * @example
   *
   * flatten([1, [2, [3, [4]], 5]]);  // => [1, 2, [3, [4]], 5]
   */
  var flatten = function (arr) {
    if (!isArray(arr)) {
      return [];
    }
    var rst = [];
    for (var i = 0; i < arr.length; i++) {
      rst = rst.concat(arr[i]);
    }
    return rst;
  };

  /**
   * @param {Array} arr The array to iterate over.
   * @return {*} Returns the maximum value.
   * @example
   *
   * max([1, 2]);
   * // => 2
   *
   * max([]);
   * // => undefined
   *
   * const data = new Array(1250010).fill(1).map((d,idx) => idx);
   *
   * max(data);
   * // => 1250010
   * // Math.max(...data) will encounter "Maximum call stack size exceeded" error
   */
  var getMax = function (arr) {
    if (!isArray(arr)) {
      return undefined;
    }
    return arr.reduce(function (prev, curr) {
      return Math.max(prev, curr);
    }, arr[0]);
  };

  /**
   * @param {Array} arr The array to iterate over.
   * @return {*} Returns the minimum value.
   * @example
   *
   * min([1, 2]);
   * // => 1
   *
   * min([]);
   * // => undefined
   *
   * const data = new Array(1250010).fill(1).map((d,idx) => idx);
   *
   * min(data);
   * // => 1250010
   * // Math.min(...data) will encounter "Maximum call stack size exceeded" error
   */
  var getMin = function (arr) {
    if (!isArray(arr)) {
      return undefined;
    }
    return arr.reduce(function (prev, curr) {
      return Math.min(prev, curr);
    }, arr[0]);
  };

  var getRange = function (values) {
    // 存在 NaN 时，min,max 判定会出问题
    var filterValues = values.filter(function (v) {
      return !isNaN(v);
    });
    if (!filterValues.length) {
      // 如果没有数值则直接返回0
      return {
        min: 0,
        max: 0,
      };
    }
    if (isArray(values[0])) {
      var tmp = [];
      for (var i = 0; i < values.length; i++) {
        tmp = tmp.concat(values[i]);
      }
      filterValues = tmp;
    }
    var max = getMax(filterValues);
    var min = getMin(filterValues);
    return {
      min: min,
      max: max,
    };
  };

  var reduce = function (arr, fn, init) {
    if (!isArray(arr) && !isPlainObject(arr)) {
      return arr;
    }
    var result = init;
    each(arr, function (data, i) {
      result = fn(result, data, i);
    });
    return result;
  };

  var isString = function (str) {
    return isType(str, 'String');
  };

  var valuesOfKey = function (data, name) {
    var rst = [];
    var tmpMap = {};
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      var value = obj[name];
      if (!isNil(value)) {
        // flatten
        if (!isArray(value)) {
          value = [value];
        }
        for (var j = 0; j < value.length; j++) {
          var val = value[j];
          // unique
          if (!tmpMap[val]) {
            rst.push(val);
            tmpMap[val] = true;
          }
        }
      }
    }
    return rst;
  };

  function head(o) {
    if (isArrayLike(o)) {
      return o[0];
    }
    return undefined;
  }

  function last(o) {
    if (isArrayLike(o)) {
      var arr = o;
      return arr[arr.length - 1];
    }
    return undefined;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function groupBy(data, condition) {
    if (!condition || !isArray(data)) {
      return {};
    }
    var result = {};
    // 兼容方法和 字符串的写法
    var predicate = isFunction(condition)
      ? condition
      : function (item) {
          return item[condition];
        };
    var key;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      key = predicate(item);
      if (hasOwnProperty.call(result, key)) {
        result[key].push(item);
      } else {
        result[key] = [item];
      }
    }
    return result;
  }

  /**
   * 将数据分组成 map
   * @param data
   * @param condition
   */
  function groupToMap(data, condition) {
    if (!condition) {
      return {
        0: data,
      };
    }
    if (!isFunction(condition)) {
      // 如果是字符串，则按照 a*b 风格成数组
      var paramscondition_1 = isArray(condition)
        ? condition
        : condition.replace(/\s+/g, '').split('*');
      condition = function (row) {
        var unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
        // 根据字段列表的值，拼接成 key
        for (var i = 0, l = paramscondition_1.length; i < l; i++) {
          unique += row[paramscondition_1[i]] && row[paramscondition_1[i]].toString();
        }
        return unique;
      };
    }
    return groupBy(data, condition);
  }

  var group = function (data, condition) {
    if (!condition) {
      // 没有条件，则自身改成数组
      return [data];
    }
    var groups = groupToMap(data, condition);
    var array = [];
    for (var i in groups) {
      array.push(groups[i]);
    }
    return array;
  };

  var fixedBase = function (v, base) {
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
  };

  /**
   * 判断是否数字
   * @return {Boolean} 是否数字
   */
  var isNumber = function (value) {
    return isType(value, 'Number');
  };

  var PRECISION = 0.00001; // numbers less than this is considered as 0
  function isNumberEqual(a, b, precision) {
    if (precision === void 0) {
      precision = PRECISION;
    }
    return Math.abs(a - b) < precision;
  }

  // @ts-ignore
  var values = Object.values
    ? function (obj) {
        return Object.values(obj);
      }
    : function (obj) {
        var result = [];
        each(obj, function (value, key) {
          if (!(isFunction(obj) && key === 'prototype')) {
            result.push(value);
          }
        });
        return result;
      };

  var toString$1 = function (value) {
    if (isNil(value)) return '';
    return value.toString();
  };

  function substitute(str, o) {
    if (!str || !o) {
      return str;
    }
    return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
      if (match.charAt(0) === '\\') {
        return match.slice(1);
      }
      return o[name] === undefined ? '' : o[name];
    });
  }

  var upperFirst = function (value) {
    var str = toString$1(value);
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  var toString$2 = {}.toString;
  var getType = function (value) {
    return toString$2
      .call(value)
      .replace(/^\[object /, '')
      .replace(/]$/, '');
  };

  /**
   * 是否是布尔类型
   *
   * @param {Object} value 测试的值
   * @return {Boolean}
   */
  var isBoolean = function (value) {
    return isType(value, 'Boolean');
  };

  var isDate = function (value) {
    return isType(value, 'Date');
  };

  var objectProto = Object.prototype;
  var isPrototype = function (value) {
    var Ctor = value && value.constructor;
    var proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
    return value === proto;
  };

  var isUndefined = function (value) {
    return value === undefined;
  };

  // FIXME: Mutable param should be forbidden in static lang.
  function _mix(dist, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
        dist[key] = obj[key];
      }
    }
  }
  function mix(dist, src1, src2, src3) {
    if (src1) _mix(dist, src1);
    if (src2) _mix(dist, src2);
    if (src3) _mix(dist, src3);
    return dist;
  }

  var clone = function (obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    var rst;
    if (isArray(obj)) {
      rst = [];
      for (var i = 0, l = obj.length; i < l; i++) {
        if (typeof obj[i] === 'object' && obj[i] != null) {
          rst[i] = clone(obj[i]);
        } else {
          rst[i] = obj[i];
        }
      }
    } else {
      rst = {};
      for (var k in obj) {
        if (typeof obj[k] === 'object' && obj[k] != null) {
          rst[k] = clone(obj[k]);
        } else {
          rst[k] = obj[k];
        }
      }
    }
    return rst;
  };

  /**
   * _.memoize(calColor);
   * _.memoize(calColor, (...args) => args[0]);
   * @param f
   * @param resolver
   */
  var memoize = function (f, resolver) {
    if (!isFunction(f)) {
      throw new TypeError('Expected a function');
    }
    var memoized = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      // 使用方法构造 key，如果不存在 resolver，则直接取第一个参数作为 key
      var key = resolver ? resolver.apply(this, args) : args[0];
      var cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = f.apply(this, args);
      // 缓存起来
      cache.set(key, result);
      return result;
    };
    memoized.cache = new Map();
    return memoized;
  };

  var MAX_MIX_LEVEL = 5;
  function _deepMix(dist, src, level, maxLevel) {
    level = level || 0;
    maxLevel = maxLevel || MAX_MIX_LEVEL;
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        var value = src[key];
        if (value !== null && isPlainObject(value)) {
          if (!isPlainObject(dist[key])) {
            dist[key] = {};
          }
          if (level < maxLevel) {
            _deepMix(dist[key], value, level + 1, maxLevel);
          } else {
            dist[key] = src[key];
          }
        } else if (isArray(value)) {
          dist[key] = [];
          dist[key] = dist[key].concat(value);
        } else if (value !== undefined) {
          dist[key] = value;
        }
      }
    }
  }
  // todo 重写
  var deepMix = function (rst) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < args.length; i += 1) {
      _deepMix(rst, args[i]);
    }
    return rst;
  };

  var indexOf = function (arr, obj) {
    if (!isArrayLike(arr)) {
      return -1;
    }
    var m = Array.prototype.indexOf;
    if (m) {
      return m.call(arr, obj);
    }
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === obj) {
        index = i;
        break;
      }
    }
    return index;
  };

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function isEmpty(value) {
    /**
     * isEmpty(null) => true
     * isEmpty() => true
     * isEmpty(true) => true
     * isEmpty(1) => true
     * isEmpty([1, 2, 3]) => false
     * isEmpty('abc') => false
     * isEmpty({ a: 1 }) => false
     */
    if (isNil(value)) {
      return true;
    }
    if (isArrayLike(value)) {
      return !value.length;
    }
    var type = getType(value);
    if (type === 'Map' || type === 'Set') {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !Object.keys(value).length;
    }
    for (var key in value) {
      if (hasOwnProperty$1.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  var map = function (arr, func) {
    if (!isArrayLike(arr)) {
      // @ts-ignore
      return arr;
    }
    var result = [];
    for (var index = 0; index < arr.length; index++) {
      var value = arr[index];
      result.push(func(value, index));
    }
    return result;
  };

  var identity = function (v) {
    return v;
  };
  var mapValues = function (object, func) {
    if (func === void 0) {
      func = identity;
    }
    var r = {};
    if (isObject(object) && !isNil(object)) {
      Object.keys(object).forEach(function (key) {
        // @ts-ignore
        r[key] = func(object[key], key);
      });
    }
    return r;
  };

  /**
   * https://github.com/developit/dlv/blob/master/index.js
   * @param obj
   * @param key
   * @param defaultValue
   */
  var get = function (obj, key, defaultValue) {
    var p = 0;
    var keyArr = isString(key) ? key.split('.') : key;
    while (obj && p < keyArr.length) {
      obj = obj[keyArr[p++]];
    }
    return obj === undefined || p < keyArr.length ? defaultValue : obj;
  };

  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  var pick = function (object, keys) {
    if (object === null || !isPlainObject(object)) {
      return {};
    }
    var result = {};
    each(keys, function (key) {
      if (hasOwnProperty$2.call(object, key)) {
        result[key] = object[key];
      }
    });
    return result;
  };

  var omit = function (obj, keys) {
    return reduce(
      obj,
      function (r, curr, key) {
        if (!keys.includes(key)) {
          r[key] = curr;
        }
        return r;
      },
      {}
    );
  };

  function size(o) {
    if (isNil(o)) {
      return 0;
    }
    if (isArrayLike(o)) {
      return o.length;
    }
    return Object.keys(o).length;
  }

  /******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function (d, b) {
    extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (d, b) {
          d.__proto__ = b;
        }) ||
      function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
    return extendStatics(d, b);
  };

  function __extends(d, b) {
    if (typeof b !== 'function' && b !== null)
      throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  }

  var __assign = function () {
    __assign =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };

  /** @deprecated */
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  }

  var ctx;
  /**
   * 计算文本的宽度
   */
  memoize(
    function (text, font) {
      if (font === void 0) {
        font = {};
      }
      var fontSize = font.fontSize,
        fontFamily = font.fontFamily,
        fontWeight = font.fontWeight,
        fontStyle = font.fontStyle,
        fontVariant = font.fontVariant;
      if (!ctx) {
        ctx = document.createElement('canvas').getContext('2d');
      }
      ctx.font = [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' ');
      return ctx.measureText(isString(text) ? text : '').width;
    },
    function (text, font) {
      if (font === void 0) {
        font = {};
      }
      return __spreadArrays([text], values(font)).join('');
    }
  );

  /**
   * k-v 存储
   */
  var default_1 = /** @class */ (function () {
    function default_1() {
      this.map = {};
    }
    default_1.prototype.has = function (key) {
      return this.map[key] !== undefined;
    };
    default_1.prototype.get = function (key, def) {
      var v = this.map[key];
      return v === undefined ? def : v;
    };
    default_1.prototype.set = function (key, value) {
      this.map[key] = value;
    };
    default_1.prototype.clear = function () {
      this.map = {};
    };
    default_1.prototype.delete = function (key) {
      delete this.map[key];
    };
    default_1.prototype.size = function () {
      return Object.keys(this.map).length;
    };
    return default_1;
  })();

  function cloneElement(element, props) {
    if (!element) return element;
    return _objectSpread(
      _objectSpread({}, element),
      {},
      {
        props: _objectSpread(_objectSpread({}, element.props), props),
      }
    );
  }
  function map$1(children, fn) {
    if (!children) {
      return fn(children);
    }
    if (isArray(children)) {
      return children.map(function (child) {
        return map$1(child, fn);
      });
    }
    return fn(children);
  }
  function compareArray(nextElements, lastElements, callback) {
    var keyed = {};
    var nextLength = nextElements.length;
    var lastLength = lastElements.length;
    for (var i = 0, len = lastLength; i < len; i++) {
      var element = lastElements[i];
      if (element && !isNil(element.key)) {
        var key = element.key;
        keyed[key] = element;
      }
    }
    // 比较元素
    for (var _i = 0, _len = Math.max(nextLength, lastLength); _i < _len; _i++) {
      var _element = nextElements[_i];
      if (!_element) {
        compare(_element, lastElements[_i], callback);
        continue;
      }
      var _key = _element.key;
      // 有key值定义
      if (!isNil(_element.key)) {
        var lastElement = keyed[_key];
        if (lastElement) delete keyed[_key];
        compare(_element, lastElement, callback);
        continue;
      }
      compare(_element, lastElements[_i], callback);
    }
    // 说明是删除的元素
    Object.keys(keyed).forEach(function (key) {
      compare(null, keyed[key], callback);
    });
  }
  // 比较2棵树
  function compare(nextElement, lastElement, callback) {
    // 有一个为空
    if (!nextElement || !lastElement) {
      callback(nextElement, lastElement);
      return;
    }
    if (isArray(nextElement) || isArray(lastElement)) {
      var nextElementArray = isArray(nextElement) ? nextElement : [nextElement];
      var lastElementArray = isArray(lastElement) ? lastElement : [lastElement];
      compareArray(nextElementArray, lastElementArray, callback);
      return;
    }
    callback(nextElement, lastElement);
  }
  function toArray(element) {
    if (!element) {
      return element;
    }
    if (!isArray(element)) {
      return [element];
    }
    var newArray = [];
    for (var i = 0, len = element.length; i < len; i++) {
      var item = element[i];
      if (isArray(item)) {
        // @ts-ignore
        newArray = newArray.concat(toArray(item));
      } else {
        newArray.push(item);
      }
    }
    return newArray;
  }
  var Children = {
    cloneElement: cloneElement,
    map: map$1,
    toArray: toArray,
    compare: compare,
  };

  var classCallCheck = createCommonjsModule(function (module) {
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    (module.exports = _classCallCheck),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _classCallCheck = /*@__PURE__*/ getDefaultExportFromCjs(classCallCheck);

  var createClass = createCommonjsModule(function (module) {
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, 'prototype', {
        writable: false,
      });
      return Constructor;
    }
    (module.exports = _createClass),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _createClass = /*@__PURE__*/ getDefaultExportFromCjs(createClass);

  var Component = /*#__PURE__*/ (function () {
    function Component(props, context, updater) {
      _classCallCheck(this, Component);
      this.destroyed = false;
      this.props = props;
      this.state = {};
      this.context = context;
      this.updater = updater;
    }
    _createClass(Component, [
      {
        key: 'willMount',
        value: function willMount() {},
      },
      {
        key: 'didMount',
        value: function didMount() {},
      },
      {
        key: 'willReceiveProps',
        value: function willReceiveProps(_props, context) {},
      },
      {
        key: 'willUpdate',
        value: function willUpdate() {},
      },
      {
        key: 'didUpdate',
        value: function didUpdate() {},
      },
      {
        key: 'render',
        value: function render() {
          return null;
        },
      },
      {
        key: 'didUnmount',
        value: function didUnmount() {},
      },
      {
        key: 'setState',
        value: function setState(partialState, callback) {
          this.updater.enqueueSetState(this, partialState, callback);
        },
      },
      {
        key: 'forceUpdate',
        value: function forceUpdate(callback) {
          this.updater.enqueueForceUpdate(this, {}, callback);
        },
      },
      {
        key: 'setAnimate',
        value: function setAnimate(animate) {
          this.animate = animate;
        },
      },
      {
        key: 'destroy',
        value: function destroy() {
          this.destroyed = true;
        },
      },
    ]);
    return Component;
  })(); // 标识是否是组件
  // @ts-ignore
  Component.prototype.isF2Component = true;

  var assertThisInitialized = createCommonjsModule(function (module) {
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    (module.exports = _assertThisInitialized),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _assertThisInitialized = /*@__PURE__*/ getDefaultExportFromCjs(assertThisInitialized);

  var setPrototypeOf = createCommonjsModule(function (module) {
    function _setPrototypeOf(o, p) {
      (module.exports = _setPrototypeOf =
        Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function _setPrototypeOf(o, p) {
              o.__proto__ = p;
              return o;
            }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports);
      return _setPrototypeOf(o, p);
    }
    (module.exports = _setPrototypeOf),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var inherits = createCommonjsModule(function (module) {
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true,
        },
      });
      Object.defineProperty(subClass, 'prototype', {
        writable: false,
      });
      if (superClass) setPrototypeOf(subClass, superClass);
    }
    (module.exports = _inherits),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _inherits = /*@__PURE__*/ getDefaultExportFromCjs(inherits);

  var getPrototypeOf = createCommonjsModule(function (module) {
    function _getPrototypeOf(o) {
      (module.exports = _getPrototypeOf =
        Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
            }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports);
      return _getPrototypeOf(o);
    }
    (module.exports = _getPrototypeOf),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _getPrototypeOf = /*@__PURE__*/ getDefaultExportFromCjs(getPrototypeOf);

  var isNativeReflectConstruct = createCommonjsModule(function (module) {
    function _isNativeReflectConstruct() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }
    (module.exports = _isNativeReflectConstruct),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var possibleConstructorReturn = createCommonjsModule(function (module) {
    var _typeof = _typeof_1['default'];

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError('Derived constructors may only return object or undefined');
      }
      return assertThisInitialized(self);
    }
    (module.exports = _possibleConstructorReturn),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _possibleConstructorReturn = /*@__PURE__*/ getDefaultExportFromCjs(possibleConstructorReturn);

  var createSuper = createCommonjsModule(function (module) {
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = getPrototypeOf(Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return possibleConstructorReturn(this, result);
      };
    }
    (module.exports = _createSuper),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _createSuper = /*@__PURE__*/ getDefaultExportFromCjs(createSuper);

  var Timeline = /*#__PURE__*/ (function (_Component) {
    _inherits(Timeline, _Component);
    var _super = _createSuper(Timeline);
    function Timeline(props) {
      var _this;
      _classCallCheck(this, Timeline);
      _this = _super.call(this, props);
      _this.next = function () {
        var _assertThisInitialize = _assertThisInitialized(_this),
          state = _assertThisInitialize.state,
          props = _assertThisInitialize.props;
        var index = state.index,
          count = state.count,
          delay = state.delay;
        var loop = props.loop;
        var next = loop ? (index + 1) % count : index + 1;
        if (next < count) {
          setTimeout(function () {
            _this.setState({
              index: next,
            });
          }, delay || 0);
        }
      };
      var delay = props.delay,
        _props$start = props.start,
        start = _props$start === void 0 ? 0 : _props$start,
        children = props.children;
      var count = Children.toArray(children).length;
      _this.state = {
        delay: delay,
        count: count,
        index: start,
      };
      return _this;
    }
    _createClass(Timeline, [
      {
        key: 'didMount',
        value: function didMount() {
          var context = this.context;
          var root = context.root;
          root.on('animationEnd', this.next);
        },
      },
      {
        key: 'didUnmount',
        value: function didUnmount() {
          var context = this.context;
          var root = context.root;
          root.off('animationEnd', this.next);
        },
      },
      {
        key: 'render',
        value: function render() {
          var state = this.state,
            props = this.props;
          var children = props.children;
          var index = state.index;
          var childrenArray = Children.toArray(children);
          return childrenArray[index];
        },
      },
    ]);
    return Timeline;
  })(Component);

  var WILDCARD = '*';
  /* event-emitter */
  var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
      this._events = {};
    }
    /**
     * 监听一个事件
     * @param evt
     * @param callback
     * @param once
     */
    EventEmitter.prototype.on = function (evt, callback, once) {
      if (!this._events[evt]) {
        this._events[evt] = [];
      }
      this._events[evt].push({
        callback: callback,
        once: !!once,
      });
      return this;
    };
    /**
     * 监听一个事件一次
     * @param evt
     * @param callback
     */
    EventEmitter.prototype.once = function (evt, callback) {
      return this.on(evt, callback, true);
    };
    /**
     * 触发一个事件
     * @param evt
     * @param args
     */
    EventEmitter.prototype.emit = function (evt) {
      var _this = this;
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var events = this._events[evt] || [];
      var wildcardEvents = this._events[WILDCARD] || [];
      // 实际的处理 emit 方法
      var doEmit = function (es) {
        var length = es.length;
        for (var i = 0; i < length; i++) {
          if (!es[i]) {
            continue;
          }
          var _a = es[i],
            callback = _a.callback,
            once = _a.once;
          if (once) {
            es.splice(i, 1);
            if (es.length === 0) {
              delete _this._events[evt];
            }
            length--;
            i--;
          }
          callback.apply(_this, args);
        }
      };
      doEmit(events);
      doEmit(wildcardEvents);
    };
    /**
     * 取消监听一个事件，或者一个channel
     * @param evt
     * @param callback
     */
    EventEmitter.prototype.off = function (evt, callback) {
      if (!evt) {
        // evt 为空全部清除
        this._events = {};
      } else {
        if (!callback) {
          // evt 存在，callback 为空，清除事件所有方法
          delete this._events[evt];
        } else {
          // evt 存在，callback 存在，清除匹配的
          var events = this._events[evt] || [];
          var length_1 = events.length;
          for (var i = 0; i < length_1; i++) {
            if (events[i].callback === callback) {
              events.splice(i, 1);
              length_1--;
              i--;
            }
          }
          if (events.length === 0) {
            delete this._events[evt];
          }
        }
      }
      return this;
    };
    /* 当前所有的事件 */
    EventEmitter.prototype.getEvents = function () {
      return this._events;
    };
    return EventEmitter;
  })();

  var Matrix = {
    generateDefault: function generateDefault() {
      return [1, 0, 0, 1, 0, 0];
    },
    isChanged: function isChanged(m) {
      return m[0] !== 1 || m[1] !== 0 || m[2] !== 0 || m[3] !== 1 || m[4] !== 0 || m[5] !== 0;
    },
    multiply: function multiply(m1, m2) {
      var m11 = m1[0] * m2[0] + m1[2] * m2[1];
      var m12 = m1[1] * m2[0] + m1[3] * m2[1];
      var m21 = m1[0] * m2[2] + m1[2] * m2[3];
      var m22 = m1[1] * m2[2] + m1[3] * m2[3];
      var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
      var dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
      return [m11, m12, m21, m22, dx, dy];
    },
    scale: function scale(out, m, v) {
      out[0] = m[0] * v[0];
      out[1] = m[1] * v[0];
      out[2] = m[2] * v[1];
      out[3] = m[3] * v[1];
      out[4] = m[4];
      out[5] = m[5];
      return out;
    },
    rotate: function rotate(out, m, radian) {
      var c = Math.cos(radian);
      var s = Math.sin(radian);
      var m11 = m[0] * c + m[2] * s;
      var m12 = m[1] * c + m[3] * s;
      var m21 = m[0] * -s + m[2] * c;
      var m22 = m[1] * -s + m[3] * c;
      out[0] = m11;
      out[1] = m12;
      out[2] = m21;
      out[3] = m22;
      out[4] = m[4];
      out[5] = m[5];
      return out;
    },
    translate: function translate(out, m, v) {
      out[0] = m[0];
      out[1] = m[1];
      out[2] = m[2];
      out[3] = m[3];
      out[4] = m[4] + m[0] * v[0] + m[2] * v[1];
      out[5] = m[5] + m[1] * v[0] + m[3] * v[1];
      return out;
    },
    transform: function transform(m, actions) {
      var out = [].concat(m);
      for (var i = 0, len = actions.length; i < len; i++) {
        var action = actions[i];
        switch (action[0]) {
          case 't':
            Matrix.translate(out, out, [action[1], action[2]]);
            break;
          case 's':
            Matrix.scale(out, out, [action[1], action[2]]);
            break;
          case 'r':
            Matrix.rotate(out, out, action[1]);
            break;
        }
      }
      return out;
    },
  };

  /**
   * 2 Dimensional Vector
   * @module vector2
   */
  var Vector2 = {
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
    },
  };

  /**
   * @fileOverview convert the line to curve
   * @author dxq613@gmail.com
   */
  function getPoint(v) {
    return [v.x, v.y];
  }
  function smoothBezier(points, smooth, isLoop, constraint) {
    var cps = [];
    var prevPoint;
    var nextPoint;
    var hasConstraint = !!constraint;
    var min;
    var max;
    var point;
    var len;
    var l;
    var i;
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
    var cp1;
    var cp2;
    var p;
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

  var start = Vector2.create();
  var end = Vector2.create();
  var extremity = Vector2.create();
  function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
    var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
    var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
    return {
      x: x,
      y: y,
    };
  }
  // cubic helper formula at T distance
  function CubicN(T, a, b, c, d) {
    var t2 = T * T;
    var t3 = t2 * T;
    return (
      a +
      (-a * 3 + T * (3 * a - a * T)) * T +
      (3 * b + T * (-6 * b + b * 3 * T)) * T +
      (c * 3 - c * 3 * T) * t2 +
      d * t3
    );
  }
  function cubicBezierBounds(c) {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var s = {
      x: c[0],
      y: c[1],
    };
    var c1 = {
      x: c[2],
      y: c[3],
    };
    var c2 = {
      x: c[4],
      y: c[5],
    };
    var e = {
      x: c[6],
      y: c[7],
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
      maxY: maxY,
    };
  }
  function getBBoxFromPoints(points, lineWidth) {
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
    lineWidth = lineWidth / 2 || 0;
    return {
      minX: left - lineWidth,
      minY: top - lineWidth,
      maxX: right + lineWidth,
      maxY: bottom + lineWidth,
    };
  }
  function getBBoxFromLine(x0, y0, x1, y1, lineWidth) {
    lineWidth = lineWidth / 2 || 0;
    return {
      minX: Math.min(x0, x1) - lineWidth,
      minY: Math.min(y0, y1) - lineWidth,
      maxX: Math.max(x0, x1) + lineWidth,
      maxY: Math.max(y0, y1) + lineWidth,
    };
  }
  function getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
    var diff = Math.abs(startAngle - endAngle);
    if (diff % (Math.PI * 2) < 1e-4 && diff > 1e-4) {
      // Is a circle
      return {
        minX: x - r,
        minY: y - r,
        maxX: x + r,
        maxY: y + r,
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
      maxY: max[1],
    };
  }
  function getBBoxFromBezierGroup(points, lineWidth) {
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
    lineWidth = lineWidth / 2 || 0;
    return {
      minX: minX - lineWidth,
      minY: minY - lineWidth,
      maxX: maxX + lineWidth,
      maxY: maxY + lineWidth,
    };
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _typeof$1(obj) {
    '@babel/helpers - typeof';

    return (
      (_typeof$1 =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (obj) {
              return typeof obj;
            }
          : function (obj) {
              return obj &&
                'function' == typeof Symbol &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            }),
      _typeof$1(obj)
    );
  }

  function _toPrimitive(input, hint) {
    if (_typeof$1(input) !== 'object' || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || 'default');
      if (_typeof$1(res) !== 'object') return res;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (hint === 'string' ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, 'string');
    return _typeof$1(key) === 'symbol' ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, 'prototype', {
      writable: false,
    });
    return Constructor;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };
    return _setPrototypeOf(o, p);
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function');
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    Object.defineProperty(subClass, 'prototype', {
      writable: false,
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf$1(o);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (_typeof$1(call) === 'object' || typeof call === 'function')) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError('Derived constructors may only return object or undefined');
    }
    return _assertThisInitialized$1(self);
  }

  function _createSuper$1(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf$1(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$1(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$1(this, result);
    };
  }

  // 多个事件分隔符
  var TYPE_SEP = ' ';
  var EventEmit = /*#__PURE__*/ (function () {
    function EventEmit() {
      _classCallCheck$1(this, EventEmit);
      this.__events = {};
    }
    _createClass$1(EventEmit, [
      {
        key: 'on',
        value: function on(type, listener) {
          var _this = this;
          if (!type || !listener) {
            return;
          }
          type.split(TYPE_SEP).forEach(function (item) {
            var events = _this.__events[item] || [];
            events.push(listener);
            _this.__events[item] = events;
          });
        },
      },
      {
        key: 'emit',
        value: function emit(type, e) {
          var _this2 = this;
          if (isObject(type)) {
            e = type;
            type = e && e.type;
          }
          if (!type) {
            return;
          }
          var events = this.__events[type];
          if (!events || !events.length) {
            return;
          }
          events.forEach(function (listener) {
            listener.call(_this2, e);
          });
        },
      },
      {
        key: 'off',
        value: function off(type, listener) {
          var __events = this.__events;
          type.split(TYPE_SEP).forEach(function (item) {
            var events = __events[item];
            if (!events || !events.length) {
              return;
            }
            // 如果没有指定方法，则删除所有项
            if (!listener) {
              delete __events[item];
              return;
            }
            // 删除指定的 listener
            for (var i = 0, len = events.length; i < len; i++) {
              if (events[i] === listener) {
                events.splice(i, 1);
                i--;
              }
            }
          });
        },
      },
    ]);
    return EventEmit;
  })();

  /**
   * Detects support for options object argument in addEventListener.
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
   * @private
   */
  var supportsEventListenerOptions = (function () {
    var supports = false;
    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function get() {
          supports = true;
        },
      });
      window.addEventListener('e', null, options);
    } catch (e) {
      // continue regardless of error
    }
    return supports;
  })();
  /* global wx, my */
  // weixin miniprogram
  // @ts-ignore
  var isWx =
    (typeof wx === 'undefined' ? 'undefined' : _typeof$1(wx)) === 'object' &&
    typeof wx.getSystemInfoSync === 'function';
  // ant miniprogram
  // @ts-ignore
  var isMy =
    (typeof my === 'undefined' ? 'undefined' : _typeof$1(my)) === 'object' &&
    typeof my.getSystemInfoSync === 'function';
  // in node
  // @ts-ignore
  var isNode =
    (typeof global === 'undefined' ? 'undefined' : _typeof$1(global)) &&
    !(typeof window === 'undefined' ? 'undefined' : _typeof$1(window));
  function isCanvasElement(el) {
    if (!el || _typeof$1(el) !== 'object') return false;
    if (el.nodeType === 1 && el.nodeName) {
      // HTMLCanvasElement
      return true;
    }
    // CanvasElement
    return !!el.isCanvasElement;
  }
  function getPixelRatio() {
    return (window && window.devicePixelRatio) || 1;
  }
  function getStyle(el, property) {
    var _document$defaultView, _document$defaultView2;
    return el.currentStyle
      ? el.currentStyle[property]
      : (_document$defaultView = document.defaultView) === null || _document$defaultView === void 0
      ? void 0
      : (_document$defaultView2 = _document$defaultView.getComputedStyle(el, null)) === null ||
        _document$defaultView2 === void 0
      ? void 0
      : _document$defaultView2.getPropertyValue(property);
  }
  function getWidth(el) {
    var width = getStyle(el, 'width');
    if (width === 'auto') {
      width = el.offsetWidth;
    }
    return parseFloat(width);
  }
  function getHeight(el) {
    var height = getStyle(el, 'height');
    if (height === 'auto') {
      height = el.offsetHeight;
    }
    return parseFloat(height);
  }
  function getDomById(id) {
    if (!id) {
      return null;
    }
    return document.getElementById(id);
  }
  function getRelativePosition(point, canvas) {
    var canvasDom = canvas.get('el');
    if (!canvasDom) return point;
    var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
      top = _canvasDom$getBoundin.top,
      left = _canvasDom$getBoundin.left;
    var paddingLeft = parseFloat(getStyle(canvasDom, 'padding-left')) || 0;
    var paddingTop = parseFloat(getStyle(canvasDom, 'padding-top')) || 0;
    var mouseX = point.x - left - paddingLeft;
    var mouseY = point.y - top - paddingTop;
    return {
      x: mouseX,
      y: mouseY,
    };
  }
  function landscapePoint(point, canvas) {
    var landscape = canvas.get('landscape');
    if (!landscape) {
      return point;
    }
    if (isFunction(landscape)) {
      return landscape(point, canvas);
    }
    // 默认顺时针旋转90度
    var height = canvas.get('height');
    var x = point.y;
    var y = height - point.x;
    return {
      x: x,
      y: y,
    };
  }
  function convertPoints(ev, canvas) {
    var touches = ev.touches;
    // 认为是mouse事件
    if (!touches) {
      var point = getRelativePosition(
        {
          x: ev.clientX,
          y: ev.clientY,
        },
        canvas
      );
      return [landscapePoint(point, canvas)];
    }
    // 单指 touchend 后，touchs 会变空，最后的触点要从changedTouches里拿
    if (!touches.length) {
      // 为了防止万一，加个空逻辑
      touches = ev.changedTouches || [];
    }
    var points = [];
    for (var i = 0, len = touches.length; i < len; i++) {
      var touch = touches[i];
      // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置
      var x = touch.x,
        y = touch.y,
        clientX = touch.clientX,
        clientY = touch.clientY;
      var _point = void 0;
      // 小程序环境会有x,y
      if (isNumber(x) || isNumber(y)) {
        _point = {
          x: x,
          y: y,
        };
      } else {
        // 浏览器环境再计算下canvas的相对位置
        _point = getRelativePosition(
          {
            x: clientX,
            y: clientY,
          },
          canvas
        );
      }
      points.push(landscapePoint(_point, canvas));
    }
    return points;
  }
  function measureText(text, font, ctx) {
    if (!ctx) {
      ctx = document.createElement('canvas').getContext('2d');
    }
    ctx.font = font || '12px sans-serif';
    return ctx.measureText(text);
  }

  var convertPoints$1 = convertPoints;
  // 计算滑动的方向
  var calcDirection = function calcDirection(start, end) {
    var xDistance = end.x - start.x;
    var yDistance = end.y - start.y;
    // x 的距离大于y 说明是横向，否则就是纵向
    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      return xDistance > 0 ? 'right' : 'left';
    }
    return yDistance > 0 ? 'down' : 'up';
  };
  // 计算2点之间的距离
  var calcDistance = function calcDistance(point1, point2) {
    var xDistance = Math.abs(point2.x - point1.x);
    var yDistance = Math.abs(point2.y - point1.y);
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };
  var getCenter = function getCenter(point1, point2) {
    var x = point1.x + (point2.x - point1.x) / 2;
    var y = point1.y + (point2.y - point1.y) / 2;
    return {
      x: x,
      y: y,
    };
  };
  var PRESS_DELAY = 250;
  var EventController = /*#__PURE__*/ (function () {
    function EventController(_ref) {
      var _this = this;
      var canvas = _ref.canvas,
        el = _ref.el;
      _classCallCheck$1(this, EventController);
      this._click = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        ev.points = points;
        _this.emitEvent('click', ev);
      };
      this._start = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        if (!points) {
          return;
        }
        ev.points = points;
        _this.emitEvent('touchstart', ev);
        // 防止上次的内容没有清理掉，重新reset下
        _this.reset();
        // 记录touch start 的时间
        _this.startTime = Date.now();
        // 记录touch start 的点
        _this.startPoints = points;
        if (points.length > 1) {
          _this.startDistance = calcDistance(points[0], points[1]);
          _this.center = getCenter(points[0], points[1]);
        } else {
          // 如果touchstart后停顿250ms, 则也触发press事件
          _this.pressTimeout = setTimeout(function () {
            // 这里固定触发press事件
            var eventType = 'press';
            var direction = 'none';
            ev.direction = direction;
            _this.emitStart(eventType, ev);
            _this.emitEvent(eventType, ev);
            _this.eventType = eventType;
            _this.direction = direction;
          }, PRESS_DELAY);
        }
      };
      this._move = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        if (!points) return;
        _this.clearPressTimeout();
        ev.points = points;
        _this.emitEvent('touchmove', ev);
        var startPoints = _this.startPoints;
        if (!startPoints) return;
        // 多指触控
        if (points.length > 1) {
          // touchstart的距离
          var startDistance = _this.startDistance;
          var currentDistance = calcDistance(points[0], points[1]);
          ev.zoom = currentDistance / startDistance;
          ev.center = _this.center;
          // 触发缩放事件
          _this.emitStart('pinch', ev);
          _this.emitEvent('pinch', ev);
        } else {
          var deltaX = points[0].x - startPoints[0].x;
          var deltaY = points[0].y - startPoints[0].y;
          var direction = _this.direction || calcDirection(startPoints[0], points[0]);
          _this.direction = direction;
          // 获取press或者pan的事件类型
          // press 按住滑动, pan表示平移
          // 如果start后立刻move，则触发pan, 如果有停顿，则触发press
          var eventType = _this.getEventType(points);
          ev.direction = direction;
          ev.deltaX = deltaX;
          ev.deltaY = deltaY;
          _this.emitStart(eventType, ev);
          _this.emitEvent(eventType, ev);
          // 记录最后2次move的时间和坐标，为了给swipe事件用
          var prevMoveTime = _this.lastMoveTime;
          var now = Date.now();
          // 最后2次的时间间隔一定要大于0，否则swipe没发计算
          if (now - prevMoveTime > 0) {
            _this.prevMoveTime = prevMoveTime;
            _this.prevMovePoints = _this.lastMovePoints;
            _this.lastMoveTime = now;
            _this.lastMovePoints = points;
          }
        }
      };
      this._end = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        ev.points = points;
        _this.emitEnd(ev);
        _this.emitEvent('touchend', ev);
        // swipe事件处理, 在touchend之后触发
        var lastMoveTime = _this.lastMoveTime;
        var now = Date.now();
        // 做这个判断是为了最后一次touchmove后到end前，还有一个停顿的过程
        // 100 是拍的一个值，理论这个值会很短，一般不卡顿的话在10ms以内
        if (now - lastMoveTime < 100) {
          var prevMoveTime = _this.prevMoveTime || _this.startTime;
          var intervalTime = lastMoveTime - prevMoveTime;
          // 时间间隔一定要大于0, 否则计算没意义
          if (intervalTime > 0) {
            var prevMovePoints = _this.prevMovePoints || _this.startPoints;
            var lastMovePoints = _this.lastMovePoints;
            // move速率
            var velocity = calcDistance(prevMovePoints[0], lastMovePoints[0]) / intervalTime;
            // 0.3 是参考hammerjs的设置
            if (velocity > 0.3) {
              ev.velocity = velocity;
              ev.direction = calcDirection(prevMovePoints[0], lastMovePoints[0]);
              ev.velocityX = (lastMovePoints[0].x - prevMovePoints[0].x) / intervalTime;
              ev.velocityY = (lastMovePoints[0].y - prevMovePoints[0].y) / intervalTime;
              _this.emitEvent('swipe', ev);
            }
          }
        }
        _this.reset();
        var touches = ev.touches;
        // 当多指只释放了1指时也会触发end, 这时重新触发一次start
        if (touches && touches.length > 0) {
          _this._start(ev);
        }
      };
      this._cancel = function (ev) {
        _this.emitEvent('touchcancel', ev);
        _this.reset();
      };
      // canvasEl
      this.canvas = canvas;
      this.delegateEvent(el);
      // 用来记录当前触发的事件
      this.processEvent = {};
    }
    _createClass$1(EventController, [
      {
        key: 'delegateEvent',
        value: function delegateEvent(canvasEl) {
          // 代理这几个事件
          canvasEl.addEventListener('click', this._click);
          canvasEl.addEventListener('touchstart', this._start);
          canvasEl.addEventListener('touchmove', this._move);
          canvasEl.addEventListener('touchend', this._end);
          canvasEl.addEventListener('touchcancel', this._cancel);
        },
      },
      {
        key: 'emitEvent',
        value: function emitEvent(type, ev) {
          var canvas = this.canvas;
          canvas.emit(type, ev);
        },
      },
      {
        key: 'getEventType',
        value: function getEventType(points) {
          var eventType = this.eventType,
            canvas = this.canvas,
            startTime = this.startTime,
            startPoints = this.startPoints;
          if (eventType) {
            return eventType;
          }
          var type;
          var panEventListeners = canvas.__events.pan;
          // 如果没有pan事件的监听，默认都是press
          if (!panEventListeners || !panEventListeners.length) {
            type = 'press';
          } else {
            // 如果有pan事件的处理，press则需要停顿250ms, 且移动距离小于10
            var now = Date.now();
            if (now - startTime > PRESS_DELAY && calcDistance(startPoints[0], points[0]) < 10) {
              type = 'press';
            } else {
              type = 'pan';
            }
          }
          this.eventType = type;
          return type;
        },
      },
      {
        key: 'enable',
        value: function enable(eventType) {
          this.processEvent[eventType] = true;
        },
        // 是否进行中的事件
      },
      {
        key: 'isProcess',
        value: function isProcess(eventType) {
          return this.processEvent[eventType];
        },
        // 触发start事件
      },
      {
        key: 'emitStart',
        value: function emitStart(type, ev) {
          if (this.isProcess(type)) {
            return;
          }
          this.enable(type);
          this.emitEvent(''.concat(type, 'start'), ev);
        },
        // 触发end事件
      },
      {
        key: 'emitEnd',
        value: function emitEnd(ev) {
          var _this2 = this;
          var processEvent = this.processEvent;
          Object.keys(processEvent).forEach(function (type) {
            _this2.emitEvent(''.concat(type, 'end'), ev);
            delete processEvent[type];
          });
        },
      },
      {
        key: 'clearPressTimeout',
        value: function clearPressTimeout() {
          if (this.pressTimeout) {
            clearTimeout(this.pressTimeout);
            this.pressTimeout = null;
          }
        },
      },
      {
        key: 'reset',
        value: function reset() {
          this.clearPressTimeout();
          this.startTime = 0;
          this.startPoints = null;
          this.startDistance = 0;
          this.direction = null;
          this.eventType = null;
          this.pinch = false;
          this.prevMoveTime = 0;
          this.prevMovePoints = null;
          this.lastMoveTime = 0;
          this.lastMovePoints = null;
        },
      },
    ]);
    return EventController;
  })();

  var CanvasElement = /*#__PURE__*/ (function (_EventEmit) {
    _inherits$1(CanvasElement, _EventEmit);
    var _super = _createSuper$1(CanvasElement);
    /* eslint-enable */
    function CanvasElement(ctx) {
      var _this;
      _classCallCheck$1(this, CanvasElement);
      _this = _super.call(this);
      _this.context = ctx;
      // canvas实际的宽高 (width/height) * pixelRatio
      // 有可能是 node canvas 创建的 context 对象
      var canvas = ctx.canvas || {};
      _this.width = canvas.width || 0;
      _this.height = canvas.height || 0;
      _this.style = {};
      _this.currentStyle = {};
      _this.attrs = {};
      // 用来标识是CanvasElement实例
      _this.isCanvasElement = true;
      return _this;
    }
    _createClass$1(CanvasElement, [
      {
        key: 'getContext',
        value: function getContext /* type */() {
          return this.context;
        },
      },
      {
        key: 'getBoundingClientRect',
        value: function getBoundingClientRect() {
          var width = this.width;
          var height = this.height;
          // 默认都处理成可视窗口的顶部位置
          return {
            top: 0,
            right: width,
            bottom: height,
            left: 0,
          };
        },
      },
      {
        key: 'setAttribute',
        value: function setAttribute(key, value) {
          this.attrs[key] = value;
        },
      },
      {
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
          this.on(type, listener);
        },
      },
      {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener) {
          this.off(type, listener);
        },
      },
      {
        key: 'dispatchEvent',
        value: function dispatchEvent(type, e) {
          this.emit(type, e);
        },
      },
    ]);
    return CanvasElement;
  })(EventEmit);
  function supportEventListener(canvas) {
    if (!canvas) {
      return false;
    }
    // 非 HTMLCanvasElement
    if (canvas.nodeType !== 1 || !canvas.nodeName || canvas.nodeName.toLowerCase() !== 'canvas') {
      return false;
    }
    // 微信小程序canvas.getContext('2d')时也是CanvasRenderingContext2D
    // 也会有ctx.canvas, 而且nodeType也是1，所以还要在看下是否支持addEventListener
    var support = false;
    try {
      canvas.addEventListener('eventTest', function () {
        support = true;
      });
      canvas.dispatchEvent(new Event('eventTest'));
    } catch (error) {
      support = false;
    }
    return support;
  }
  var CanvasElement$1 = {
    create: function create(ctx) {
      if (!ctx) {
        return null;
      }
      if (supportEventListener(ctx.canvas)) {
        return ctx.canvas;
      }
      return new CanvasElement(ctx);
    },
  };

  function remove(arr, obj) {
    if (!arr) {
      return;
    }
    var index = arr.indexOf(obj);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  function _defineProperty$1(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
    }
    return target;
  }

  function _mod(n, m) {
    return ((n % m) + m) % m;
  }
  function _addStop(steps, gradient) {
    each(steps, function (item) {
      item = item.split(':');
      gradient.addColorStop(Number(item[0]), item[1]);
    });
  }
  // the string format: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
  function _parseLineGradient(color, shape, context) {
    var arr = color.split(' ');
    var angle = arr[0].slice(2, arr[0].length - 1);
    angle = _mod((parseFloat(angle) * Math.PI) / 180, Math.PI * 2);
    var steps = arr.slice(1);
    var _shape$getBBox = shape.getBBox(),
      minX = _shape$getBBox.minX,
      minY = _shape$getBBox.minY,
      maxX = _shape$getBBox.maxX,
      maxY = _shape$getBBox.maxY;
    var start;
    var end;
    if (angle >= 0 && angle < 0.5 * Math.PI) {
      start = {
        x: minX,
        y: minY,
      };
      end = {
        x: maxX,
        y: maxY,
      };
    } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
      start = {
        x: maxX,
        y: minY,
      };
      end = {
        x: minX,
        y: maxY,
      };
    } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
      start = {
        x: maxX,
        y: maxY,
      };
      end = {
        x: minX,
        y: minY,
      };
    } else {
      start = {
        x: minX,
        y: maxY,
      };
      end = {
        x: maxX,
        y: minY,
      };
    }
    var tanTheta = Math.tan(angle);
    var tanTheta2 = tanTheta * tanTheta;
    var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
    var y =
      (tanTheta * (end.x - start.x + tanTheta * (end.y - start.y))) / (tanTheta2 + 1) + start.y;
    var gradient = context.createLinearGradient(start.x, start.y, x, y);
    _addStop(steps, gradient);
    return gradient;
  }
  // the string format: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'
  function _parseRadialGradient(color, shape, context) {
    var arr = color.split(' ');
    var circleCfg = arr[0].slice(2, arr[0].length - 1);
    circleCfg = circleCfg.split(',');
    var fx = parseFloat(circleCfg[0]);
    var fy = parseFloat(circleCfg[1]);
    var fr = parseFloat(circleCfg[2]);
    var steps = arr.slice(1);
    // if radius is 0, no gradient, stroke with the last color
    if (fr === 0) {
      var _color = steps[steps.length - 1];
      return _color.split(':')[1];
    }
    var _shape$getBBox2 = shape.getBBox(),
      width = _shape$getBBox2.width,
      height = _shape$getBBox2.height,
      minX = _shape$getBBox2.minX,
      minY = _shape$getBBox2.minY;
    var r = Math.sqrt(width * width + height * height) / 2;
    var gradient = context.createRadialGradient(
      minX + width * fx,
      minY + height * fy,
      fr * r,
      minX + width / 2,
      minY + height / 2,
      r
    );
    _addStop(steps, gradient);
    return gradient;
  }
  function parseStyle(color, shape, context) {
    if (color[1] === '(') {
      try {
        var firstCode = color[0];
        if (firstCode === 'l') {
          return _parseLineGradient(color, shape, context);
        } else if (firstCode === 'r') {
          return _parseRadialGradient(color, shape, context);
        }
      } catch (ev) {
        console.error(
          'error in parsing gradient string, please check if there are any extra whitespaces.'
        );
        console.error(ev);
      }
    }
    return color;
  }

  var ALIAS_ATTRS_MAP = {
    stroke: 'strokeStyle',
    fill: 'fillStyle',
    opacity: 'globalAlpha',
  };
  var SHAPE_ATTRS = [
    'fillStyle',
    'font',
    'globalAlpha',
    'lineCap',
    'lineWidth',
    'lineJoin',
    'miterLimit',
    'shadowBlur',
    'shadowColor',
    'shadowOffsetX',
    'shadowOffsetY',
    'strokeStyle',
    'textAlign',
    'textBaseline',
    'lineDash',
    'shadow', // 兼容支付宝小程序
  ];

  var CLIP_SHAPES = ['circle', 'sector', 'polygon', 'rect', 'polyline', 'custom'];
  var Element = /*#__PURE__*/ (function () {
    function Element(cfg) {
      _classCallCheck$1(this, Element);
      this._initProperties();
      mix(this._attrs, cfg);
      var attrs = this._attrs.attrs;
      if (attrs) {
        this.initAttrs(attrs);
      }
      this.initTransform();
    }
    _createClass$1(Element, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          this._attrs = _objectSpread2(
            _objectSpread2({}, this._attrs),
            {},
            {
              zIndex: 0,
              visible: true,
              destroyed: false,
            }
          );
        },
      },
      {
        key: 'get',
        value: function get(name) {
          return this._attrs[name];
        },
      },
      {
        key: 'set',
        value: function set(name, value) {
          this._attrs[name] = value;
        },
      },
      {
        key: 'isGroup',
        value: function isGroup() {
          return this.get('isGroup');
        },
      },
      {
        key: 'isShape',
        value: function isShape() {
          return this.get('isShape');
        },
      },
      {
        key: 'initAttrs',
        value: function initAttrs(attrs) {
          this.attr(mix(this.getDefaultAttrs(), attrs));
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {};
        },
      },
      {
        key: '_setAttr',
        value: function _setAttr(name, value) {
          var attrs = this._attrs.attrs;
          if (name === 'clip') {
            value = this._setAttrClip(value);
          } else {
            var alias = ALIAS_ATTRS_MAP[name];
            if (alias) {
              attrs[alias] = value;
            }
          }
          attrs[name] = value;
        },
      },
      {
        key: '_getAttr',
        value: function _getAttr(name) {
          var _this$_attrs, _this$_attrs$attrs;
          return (_this$_attrs = this._attrs) === null || _this$_attrs === void 0
            ? void 0
            : (_this$_attrs$attrs = _this$_attrs.attrs) === null || _this$_attrs$attrs === void 0
            ? void 0
            : _this$_attrs$attrs[name];
        },
      },
      {
        key: '_afterAttrsSet',
        value: function _afterAttrsSet() {},
      },
      {
        key: '_setAttrClip',
        value: function _setAttrClip(clip) {
          if (clip && CLIP_SHAPES.indexOf(clip._attrs.type) > -1) {
            if (clip.get('canvas') === null) {
              clip = _objectSpread2({}, clip);
            }
            clip.set('parent', this.get('parent'));
            clip.set('context', this.get('context'));
            return clip;
          }
          return null;
        },
      },
      {
        key: 'attr',
        value: function attr(name, value) {
          if (this.get('destroyed')) return null;
          var argumentsLen = arguments.length;
          if (argumentsLen === 0) {
            return this._attrs.attrs;
          }
          if (isObject(name)) {
            this._attrs.bbox = null;
            for (var k in name) {
              this._setAttr(k, name[k]);
            }
            if (this._afterAttrsSet) {
              this._afterAttrsSet();
            }
            return this;
          }
          if (argumentsLen === 2) {
            this._attrs.bbox = null;
            this._setAttr(name, value);
            if (this._afterAttrsSet) {
              this._afterAttrsSet();
            }
            return this;
          }
          return this._getAttr(name);
        },
      },
      {
        key: 'getParent',
        value: function getParent() {
          return this.get('parent');
        },
      },
      {
        key: 'draw',
        value: function draw(context) {
          if (this.get('destroyed')) {
            return;
          }
          if (this.get('visible')) {
            this.setContext(context);
            this.drawInner(context);
            this.restoreContext(context);
          }
        },
      },
      {
        key: 'setContext',
        value: function setContext(context) {
          var clip = this._attrs.attrs.clip;
          context.save();
          if (clip && !clip._attrs.destroyed) {
            clip.resetTransform(context);
            clip.createPath(context);
            context.clip();
          }
          this.resetContext(context);
          this.resetTransform(context);
        },
      },
      {
        key: 'restoreContext',
        value: function restoreContext(context) {
          context.restore();
        },
      },
      {
        key: 'resetContext',
        value: function resetContext(context) {
          var elAttrs = this._attrs.attrs;
          for (var k in elAttrs) {
            if (SHAPE_ATTRS.indexOf(k) > -1) {
              var v = elAttrs[k];
              if ((k === 'fillStyle' || k === 'strokeStyle') && v) {
                v = parseStyle(v, this, context);
              }
              if (k === 'lineDash' && context.setLineDash && isArray(v)) {
                context.setLineDash(v);
              } else {
                context[k] = v;
              }
            }
          }
        },
      },
      {
        key: 'hasFill',
        value: function hasFill() {
          return this.get('canFill') && this._attrs.attrs.fillStyle;
        },
      },
      {
        key: 'hasStroke',
        value: function hasStroke() {
          return this.get('canStroke') && this._attrs.attrs.strokeStyle;
        },
      },
      {
        key: 'drawInner',
        value: function drawInner(_context) {},
      },
      {
        key: 'show',
        value: function show() {
          this.set('visible', true);
          return this;
        },
      },
      {
        key: 'hide',
        value: function hide() {
          this.set('visible', false);
          return this;
        },
      },
      {
        key: 'isVisible',
        value: function isVisible() {
          return this.get('visible');
        },
      },
      {
        key: 'getAriaLabel',
        value: function getAriaLabel() {
          var _this$_attrs2 = this._attrs,
            destroyed = _this$_attrs2.destroyed,
            visible = _this$_attrs2.visible,
            isShape = _this$_attrs2.isShape,
            aria = _this$_attrs2.aria;
          if (destroyed || !visible || (isShape && !aria)) {
            return;
          }
          return this._getAriaLabel();
        },
      },
      {
        key: '_getAriaLabel',
        value: function _getAriaLabel() {
          return this._attrs.ariaLabel;
        },
      },
      {
        key: '_removeFromParent',
        value: function _removeFromParent() {
          var parent = this.get('parent');
          if (parent) {
            var children = parent.get('children');
            remove(children, this);
          }
          return this;
        },
      },
      {
        key: 'remove',
        value: function remove(destroy) {
          if (destroy) {
            this.destroy();
          } else {
            this._removeFromParent();
          }
        },
      },
      {
        key: 'destroy',
        value: function destroy() {
          var destroyed = this.get('destroyed');
          if (destroyed) {
            return null;
          }
          this._removeFromParent();
          // 保留 attrs
          var attrs = this._attrs.attrs;
          this._attrs = {
            attrs: attrs,
          };
          this.set('destroyed', true);
        },
      },
      {
        key: 'getBBox',
        value: function getBBox() {
          return {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
            width: 0,
            height: 0,
          };
        },
      },
      {
        key: 'initTransform',
        value: function initTransform() {
          var attrs = this._attrs.attrs;
          if (!attrs) {
            attrs = {};
          }
          if (!attrs.matrix) {
            attrs.matrix = [1, 0, 0, 1, 0, 0];
          }
          this._attrs.attrs = attrs;
        },
      },
      {
        key: 'getMatrix',
        value: function getMatrix() {
          return this._attrs.attrs.matrix;
        },
      },
      {
        key: 'setMatrix',
        value: function setMatrix(m) {
          this._attrs.attrs.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
        },
      },
      {
        key: 'transform',
        value: function transform(actions) {
          var matrix = this._attrs.attrs.matrix;
          this._attrs.attrs.matrix = Matrix.transform(matrix, actions);
          return this;
        },
      },
      {
        key: 'setTransform',
        value: function setTransform(actions) {
          this._attrs.attrs.matrix = [1, 0, 0, 1, 0, 0];
          return this.transform(actions);
        },
      },
      {
        key: 'translate',
        value: function translate(x, y) {
          var matrix = this._attrs.attrs.matrix;
          Matrix.translate(matrix, matrix, [x, y]);
        },
      },
      {
        key: 'rotate',
        value: function rotate(rad) {
          var matrix = this._attrs.attrs.matrix;
          Matrix.rotate(matrix, matrix, rad);
        },
      },
      {
        key: 'scale',
        value: function scale(sx, sy) {
          var matrix = this._attrs.attrs.matrix;
          Matrix.scale(matrix, matrix, [sx, sy]);
        },
      },
      {
        key: 'moveTo',
        value: function moveTo(x, y) {
          var cx = this._attrs.x || 0;
          var cy = this._attrs.y || 0;
          this.translate(x - cx, y - cy);
          this.set('x', x);
          this.set('y', y);
        },
      },
      {
        key: 'apply',
        value: function apply(v) {
          var m = this._attrs.attrs.matrix;
          Vector2.transformMat2d(v, v, m);
          return this;
        },
      },
      {
        key: 'resetTransform',
        value: function resetTransform(context) {
          var mo = this._attrs.attrs.matrix;
          if (Matrix.isChanged(mo)) {
            context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
          }
        },
      },
      {
        key: 'isDestroyed',
        value: function isDestroyed() {
          return this.get('destroyed');
        },
      },
    ]);
    return Element;
  })();

  var Shape = /*#__PURE__*/ (function (_Element) {
    _inherits$1(Shape, _Element);
    var _super = _createSuper$1(Shape);
    function Shape() {
      _classCallCheck$1(this, Shape);
      return _super.apply(this, arguments);
    }
    _createClass$1(Shape, [
      {
        key: '_initProperties',
        /* eslint-enable */
        value: function _initProperties() {
          this._attrs = _objectSpread2(
            _objectSpread2({}, this._attrs),
            {},
            {
              zIndex: 0,
              visible: true,
              destroyed: false,
              isShape: true,
              attrs: {},
            }
          );
        },
      },
      {
        key: 'getType',
        value: function getType() {
          return this._attrs.type;
        },
      },
      {
        key: 'drawInner',
        value: function drawInner(context) {
          var attrs = this.get('attrs');
          this.createPath(context);
          var originOpacity = context.globalAlpha;
          if (this.hasFill()) {
            var fillOpacity = attrs.fillOpacity;
            if (!isNil(fillOpacity) && fillOpacity !== 1) {
              context.globalAlpha = fillOpacity;
              context.fill();
              context.globalAlpha = originOpacity;
            } else {
              context.fill();
            }
          }
          if (this.hasStroke()) {
            var lineWidth = attrs.lineWidth;
            if (lineWidth > 0) {
              var strokeOpacity = attrs.strokeOpacity;
              if (!isNil(strokeOpacity) && strokeOpacity !== 1) {
                context.globalAlpha = strokeOpacity;
              }
              context.stroke();
            }
          }
        },
      },
      {
        key: 'getBBox',
        value: function getBBox() {
          var bbox = this._attrs.bbox;
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
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          return null;
        },
      },
      {
        key: 'createPath',
        value: function createPath(_context) {},
      },
    ]);
    return Shape;
  })(Element);

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$1(object);
      if (object === null) break;
    }
    return object;
  }

  function _get() {
    if (typeof Reflect !== 'undefined' && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }

  function parsePadding(padding) {
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;
    if (isNumber(padding)) {
      top = bottom = left = right = padding;
    } else if (isArray(padding)) {
      top = padding[0];
      right = !isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !isNil(padding[2]) ? padding[2] : padding[0];
      left = !isNil(padding[3]) ? padding[3] : right;
    }
    return [top, right, bottom, left];
  }
  // 为了处理radius 大于 width 或 height 的场景
  function parseRadius(radius, width, height) {
    radius = parsePadding(radius);
    // 都为0
    if (!radius[0] && !radius[1] && !radius[2] && !radius[3]) {
      return radius;
    }
    var minWidth = Math.max(radius[0] + radius[1], radius[2] + radius[3]);
    var minHeight = Math.max(radius[0] + radius[3], radius[1] + radius[2]);
    var scale = Math.min(width / minWidth, height / minHeight);
    if (scale < 1) {
      return radius.map(function (r) {
        return r * scale;
      });
    }
    return radius;
  }
  var Rect = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Rect, _Shape);
    var _super = _createSuper$1(Rect);
    function Rect() {
      _classCallCheck$1(this, Rect);
      return _super.apply(this, arguments);
    }
    _createClass$1(Rect, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Rect.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'rect';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            radius: 0,
            lineWidth: 0,
          };
        },
      },
      {
        key: 'createRadiusPath',
        value: function createRadiusPath(context, x, y, width, height, radius) {
          radius = parseRadius(radius, width, height);
          context.moveTo(x + radius[0], y);
          context.lineTo(x + width - radius[1], y);
          context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
          context.lineTo(x + width, y + height - radius[2]);
          context.arc(
            x + width - radius[2],
            y + height - radius[2],
            radius[2],
            0,
            Math.PI / 2,
            false
          );
          context.lineTo(x + radius[3], y + height);
          context.arc(
            x + radius[3],
            y + height - radius[3],
            radius[3],
            Math.PI / 2,
            Math.PI,
            false
          );
          context.lineTo(x, y + radius[0]);
          context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, (Math.PI * 3) / 2, false);
          context.closePath();
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            width = attrs.width,
            height = attrs.height,
            radius = attrs.radius;
          context.beginPath();
          if (!radius || !(width * height)) {
            context.rect(x, y, width, height);
          } else {
            this.createRadiusPath(context, x, y, width, height, radius);
          }
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            width = attrs.width,
            height = attrs.height;
          return {
            minX: x,
            minY: y,
            maxX: x + width,
            maxY: y + height,
          };
        },
      },
    ]);
    return Rect;
  })(Shape);

  var imageCaches = {};
  var ImageShape = /*#__PURE__*/ (function (_Rect) {
    _inherits$1(ImageShape, _Rect);
    var _super = _createSuper$1(ImageShape);
    function ImageShape() {
      _classCallCheck$1(this, ImageShape);
      return _super.apply(this, arguments);
    }
    _createClass$1(ImageShape, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(ImageShape.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = false;
          this._attrs.canStroke = false;
          this._attrs.loading = false;
          this._attrs.image = null;
          this._attrs.type = 'image';
        },
      },
      {
        key: 'draw',
        value: function draw(context) {
          var _this = this;
          // 如果图片还在loading中直接返回，等下次绘制
          if (this.get('loading')) {
            return;
          }
          // 如果已经有image对象，直接绘制，会调用createPath绘制
          var image = this.get('image');
          if (image) {
            _get(_getPrototypeOf$1(ImageShape.prototype), 'draw', this).call(this, context);
            return;
          }
          var attrs = this.get('attrs');
          var src = attrs.src,
            img = attrs.img;
          if (img) {
            this.set('image', img);
            _get(_getPrototypeOf$1(ImageShape.prototype), 'draw', this).call(this, context);
            return;
          }
          if (src) {
            var cacheImage = this.get('cacheImage');
            // 如果有缓存，则直接从缓存中拿
            if (cacheImage && imageCaches[src]) {
              this.set('image', imageCaches[src]);
              this.draw(context);
              return;
            }
            var _image = null;
            var canvas = this.get('canvas');
            if (canvas && canvas.get('createImage')) {
              var createImage = canvas.get('createImage');
              _image = createImage();
            } else if (window.Image) {
              _image = new Image();
            }
            if (_image) {
              this.set('loading', true);
              // 设置跨域, 等同于 image.crossOrigin = 'anonymous'
              _image.crossOrigin = '';
              _image.onload = function () {
                _this.set('loading', false);
                _this.set('image', _image);
                // this.draw(context);
                // 这里需要调用 canvas.draw 进行重新绘制，否则 image 会一直在最上层
                canvas.draw();
              };
              // src 一定要在 crossOrigin 之后，否则 toDataURL 就会报 SecurityError
              _image.src = src;
              // 设置全局缓存
              if (cacheImage) {
                imageCaches[src] = _image;
              }
            }
          }
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var image = this.get('image');
          this.drawImage(context, image);
        },
      },
      {
        key: 'drawImage',
        value: function drawImage(context, image) {
          var _this$_attrs = this._attrs,
            attrs = _this$_attrs.attrs,
            destroyed = _this$_attrs.destroyed;
          if (destroyed) {
            return;
          }
          var x = attrs.x,
            y = attrs.y,
            width = attrs.width,
            height = attrs.height,
            sx = attrs.sx,
            sy = attrs.sy,
            swidth = attrs.swidth,
            sheight = attrs.sheight,
            radius = attrs.radius,
            fillOpacity = attrs.fillOpacity;
          if (radius) {
            context.save();
            this.createRadiusPath(context, x, y, width, height, radius);
            context.clip();
          }
          // 设置透明度
          var originOpacity = context.globalAlpha;
          if (!isNil(fillOpacity)) {
            context.globalAlpha = fillOpacity;
          }
          if (!isNil(sx) && !isNil(sy) && !isNil(swidth) && !isNil(sheight)) {
            context.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
          } else {
            context.drawImage(image, x, y, width, height);
          }
          context.globalAlpha = originOpacity;
          if (radius) {
            // 因为 save 和 restore 会一定程度上影响绘图性能，所以只在必要是调用
            context.restore();
          }
        },
      },
    ]);
    return ImageShape;
  })(Rect);

  var Circle = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Circle, _Shape);
    var _super = _createSuper$1(Circle);
    function Circle() {
      _classCallCheck$1(this, Circle);
      return _super.apply(this, arguments);
    }
    _createClass$1(Circle, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Circle.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'circle';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            x: 0,
            y: 0,
            r: 0,
            lineWidth: 0,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            r = attrs.r;
          context.beginPath();
          context.arc(x, y, r, 0, Math.PI * 2, false);
          context.closePath();
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            r = attrs.r;
          return {
            minX: x - r,
            maxX: x + r,
            minY: y - r,
            maxY: y + r,
          };
        },
      },
    ]);
    return Circle;
  })(Shape);

  var Line = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Line, _Shape);
    var _super = _createSuper$1(Line);
    function Line() {
      _classCallCheck$1(this, Line);
      return _super.apply(this, arguments);
    }
    _createClass$1(Line, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Line.prototype), '_initProperties', this).call(this);
          this._attrs.canStroke = true;
          this._attrs.type = 'line';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            lineWidth: 1,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var x1 = attrs.x1,
            y1 = attrs.y1,
            x2 = attrs.x2,
            y2 = attrs.y2;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var x1 = attrs.x1,
            y1 = attrs.y1,
            x2 = attrs.x2,
            y2 = attrs.y2,
            lineWidth = attrs.lineWidth;
          return getBBoxFromLine(x1, y1, x2, y2, lineWidth);
        },
      },
    ]);
    return Line;
  })(Shape);

  var Polygon = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Polygon, _Shape);
    var _super = _createSuper$1(Polygon);
    function Polygon() {
      _classCallCheck$1(this, Polygon);
      return _super.apply(this, arguments);
    }
    _createClass$1(Polygon, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Polygon.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'polygon';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            points: null,
            lineWidth: 0,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var points = attrs.points;
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
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var points = attrs.points;
          return getBBoxFromPoints(points);
        },
      },
    ]);
    return Polygon;
  })(Shape);

  // filter the point which x or y is NaN
  function _filterPoints(points) {
    var filteredPoints = [];
    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      if (!isNaN(point.x) && !isNaN(point.y)) {
        filteredPoints.push(point);
      }
    }
    return filteredPoints;
  }
  var Polyline = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Polyline, _Shape);
    var _super = _createSuper$1(Polyline);
    function Polyline() {
      _classCallCheck$1(this, Polyline);
      return _super.apply(this, arguments);
    }
    _createClass$1(Polyline, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Polyline.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'polyline';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            points: null,
            lineWidth: 1,
            smooth: false,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var points = attrs.points,
            smooth = attrs.smooth;
          var filteredPoints = _filterPoints(points);
          context.beginPath();
          if (filteredPoints.length) {
            context.moveTo(filteredPoints[0].x, filteredPoints[0].y);
            if (smooth) {
              var constaint = [
                [0, 0],
                [1, 1],
              ];
              var sps = catmullRom2bezier(filteredPoints, false, constaint);
              for (var i = 0, n = sps.length; i < n; i++) {
                var sp = sps[i];
                context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
              }
            } else {
              var _i;
              var l;
              for (_i = 1, l = filteredPoints.length - 1; _i < l; _i++) {
                context.lineTo(filteredPoints[_i].x, filteredPoints[_i].y);
              }
              context.lineTo(filteredPoints[l].x, filteredPoints[l].y);
            }
          }
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var points = attrs.points,
            smooth = attrs.smooth,
            lineWidth = attrs.lineWidth;
          var filteredPoints = _filterPoints(points);
          if (smooth) {
            var newPoints = [];
            var constaint = [
              [0, 0],
              [1, 1],
            ];
            var sps = catmullRom2bezier(filteredPoints, false, constaint);
            for (var i = 0, n = sps.length; i < n; i++) {
              var sp = sps[i];
              if (i === 0) {
                newPoints.push([
                  filteredPoints[0].x,
                  filteredPoints[0].y,
                  sp[1],
                  sp[2],
                  sp[3],
                  sp[4],
                  sp[5],
                  sp[6],
                ]);
              } else {
                var lastPoint = sps[i - 1];
                newPoints.push([
                  lastPoint[5],
                  lastPoint[6],
                  sp[1],
                  sp[2],
                  sp[3],
                  sp[4],
                  sp[5],
                  sp[6],
                ]);
              }
            }
            return getBBoxFromBezierGroup(newPoints, lineWidth);
          }
          return getBBoxFromPoints(filteredPoints, lineWidth);
        },
      },
    ]);
    return Polyline;
  })(Shape);

  var Arc = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Arc, _Shape);
    var _super = _createSuper$1(Arc);
    function Arc() {
      _classCallCheck$1(this, Arc);
      return _super.apply(this, arguments);
    }
    _createClass$1(Arc, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Arc.prototype), '_initProperties', this).call(this);
          this._attrs.canStroke = true;
          this._attrs.canFill = true;
          this._attrs.type = 'arc';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            x: 0,
            y: 0,
            r: 0,
            startAngle: 0,
            endAngle: Math.PI * 2,
            anticlockwise: false,
            lineWidth: 1,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            r = attrs.r,
            startAngle = attrs.startAngle,
            endAngle = attrs.endAngle,
            anticlockwise = attrs.anticlockwise;
          context.beginPath();
          if (startAngle !== endAngle) {
            context.arc(x, y, r, startAngle, endAngle, anticlockwise);
          }
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            r = attrs.r,
            startAngle = attrs.startAngle,
            endAngle = attrs.endAngle,
            anticlockwise = attrs.anticlockwise;
          return getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
        },
      },
    ]);
    return Arc;
  })(Shape);

  var Sector = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Sector, _Shape);
    var _super = _createSuper$1(Sector);
    function Sector() {
      _classCallCheck$1(this, Sector);
      return _super.apply(this, arguments);
    }
    _createClass$1(Sector, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Sector.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'sector';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            x: 0,
            y: 0,
            lineWidth: 0,
            r: 0,
            r0: 0,
            startAngle: 0,
            endAngle: Math.PI * 2,
            anticlockwise: false,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            startAngle = attrs.startAngle,
            r = attrs.r,
            r0 = attrs.r0,
            anticlockwise = attrs.anticlockwise;
          // 最大为整个圆
          var endAngle = Math.min(attrs.endAngle, startAngle + Math.PI * 2);
          context.beginPath();
          var unitX = Math.cos(startAngle);
          var unitY = Math.sin(startAngle);
          context.moveTo(unitX * r0 + x, unitY * r0 + y);
          context.lineTo(unitX * r + x, unitY * r + y);
          // 当扇形的角度非常小的时候，就不进行弧线的绘制；或者整个只有1个扇形时，会出现end<0的情况不绘制
          if (Math.abs(endAngle - startAngle) > 0.0001 || (startAngle === 0 && endAngle < 0)) {
            context.arc(x, y, r, startAngle, endAngle, anticlockwise);
            context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);
            if (r0 !== 0) {
              context.arc(x, y, r0, endAngle, startAngle, !anticlockwise);
            }
          }
          context.closePath();
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            r = attrs.r,
            r0 = attrs.r0,
            startAngle = attrs.startAngle,
            endAngle = attrs.endAngle,
            anticlockwise = attrs.anticlockwise;
          var outerBBox = getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
          var innerBBox = getBBoxFromArc(x, y, r0, startAngle, endAngle, anticlockwise);
          return {
            minX: Math.min(outerBBox.minX, innerBBox.minX),
            minY: Math.min(outerBBox.minY, innerBBox.minY),
            maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
            maxY: Math.max(outerBBox.maxY, innerBBox.maxY),
          };
        },
      },
    ]);
    return Sector;
  })(Shape);

  var Rect$1 = {
    calcRotatedBox: function calcRotatedBox(_ref) {
      var width = _ref.width,
        height = _ref.height,
        rotate = _ref.rotate;
      var absRotate = Math.abs(rotate);
      return {
        width: Math.abs(width * Math.cos(absRotate) + height * Math.sin(absRotate)),
        height: Math.abs(height * Math.cos(absRotate) + width * Math.sin(absRotate)),
      };
    },
  };

  var measureText$1 = measureText;
  var textWidthCacheCounter = 0;
  var textWidthCache = {};
  var TEXT_CACHE_MAX = 5000;
  var Text = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Text, _Shape);
    var _super = _createSuper$1(Text);
    function Text() {
      _classCallCheck$1(this, Text);
      return _super.apply(this, arguments);
    }
    _createClass$1(Text, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Text.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'text';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            lineWidth: 0,
            lineCount: 1,
            fontSize: 12,
            fontFamily: '',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontVariant: 'normal',
            textAlign: 'start',
            textBaseline: 'bottom',
            lineHeight: null,
            textArr: null,
          };
        },
      },
      {
        key: '_getFontStyle',
        value: function _getFontStyle() {
          var attrs = this._attrs.attrs;
          var fontSize = attrs.fontSize,
            fontFamily = attrs.fontFamily,
            fontWeight = attrs.fontWeight,
            fontStyle = attrs.fontStyle,
            fontVariant = attrs.fontVariant;
          return ''
            .concat(fontStyle, ' ')
            .concat(fontVariant, ' ')
            .concat(fontWeight, ' ')
            .concat(fontSize, 'px ')
            .concat(fontFamily);
        },
      },
      {
        key: '_afterAttrsSet',
        value: function _afterAttrsSet() {
          var attrs = this._attrs.attrs;
          attrs.font = this._getFontStyle();
          if (attrs.text) {
            var text = attrs.text;
            var textArr = null;
            var lineCount = 1;
            if (isString(text) && text.indexOf('\n') !== -1) {
              textArr = text.split('\n');
              lineCount = textArr.length;
            }
            attrs.lineCount = lineCount;
            attrs.textArr = textArr;
          }
          this.set('attrs', attrs);
        },
      },
      {
        key: '_getTextHeight',
        value: function _getTextHeight() {
          var attrs = this._attrs.attrs;
          if (attrs.height) {
            return attrs.height;
          }
          var lineCount = attrs.lineCount;
          var fontSize = attrs.fontSize * 1;
          if (lineCount > 1) {
            var spaceingY = this._getSpaceingY();
            return fontSize * lineCount + spaceingY * (lineCount - 1);
          }
          return fontSize;
        },
      },
      {
        key: '_getSpaceingY',
        value: function _getSpaceingY() {
          var attrs = this._attrs.attrs;
          var lineHeight = attrs.lineHeight;
          var fontSize = attrs.fontSize * 1;
          return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
        },
      },
      {
        key: 'drawInner',
        value: function drawInner(context) {
          var attrs = this._attrs.attrs;
          var text = attrs.text;
          var x = attrs.x;
          var y = attrs.y;
          if (isNil(text) || isNaN(x) || isNaN(y)) {
            // text will be 0
            return;
          }
          var textArr = attrs.textArr;
          var fontSize = attrs.fontSize * 1;
          var spaceingY = this._getSpaceingY();
          if (attrs.rotate) {
            // do rotation
            context.translate(x, y);
            context.rotate(attrs.rotate);
            x = 0;
            y = 0;
          }
          var textBaseline = attrs.textBaseline;
          var height;
          if (textArr) {
            height = this._getTextHeight();
          }
          var subY;
          // context.beginPath();
          if (this.hasFill()) {
            var fillOpacity = attrs.fillOpacity;
            if (!isNil(fillOpacity) && fillOpacity !== 1) {
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
          if (this.hasStroke()) {
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
        },
      },
      {
        key: '_getAriaLabel',
        value: function _getAriaLabel() {
          return this._attrs.attrs.text;
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this._attrs.attrs;
          var x = attrs.x,
            y = attrs.y,
            textAlign = attrs.textAlign,
            textBaseline = attrs.textBaseline;
          var width = this._getTextWidth(); // attrs.width
          if (!width) {
            return {
              minX: x,
              minY: y,
              maxX: x,
              maxY: y,
            };
          }
          var height = this._getTextHeight(); // attrs.height
          if (attrs.rotate) {
            var rotatedBox = Rect$1.calcRotatedBox({
              width: width,
              height: height,
              rotate: attrs.rotate,
            });
            width = rotatedBox.width;
            height = rotatedBox.height;
          }
          var point = {
            x: x,
            y: y - height,
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
            maxY: point.y + height,
          };
        },
      },
      {
        key: '_getTextWidth',
        value: function _getTextWidth() {
          var attrs = this._attrs.attrs;
          if (attrs.width) {
            return attrs.width;
          }
          var text = attrs.text;
          var context = this.get('context');
          if (isNil(text)) return undefined;
          var font = attrs.font;
          var textArr = attrs.textArr;
          var key = text + '' + font;
          if (textWidthCache[key]) {
            return textWidthCache[key];
          }
          var width = 0;
          if (textArr) {
            for (var i = 0, length = textArr.length; i < length; i++) {
              var subText = textArr[i];
              width = Math.max(width, measureText$1(subText, font, context).width);
            }
          } else {
            width = measureText$1(text, font, context).width;
          }
          if (textWidthCacheCounter > TEXT_CACHE_MAX) {
            textWidthCacheCounter = 0;
            textWidthCache = {};
          }
          textWidthCacheCounter++;
          textWidthCache[key] = width;
          return width;
        },
      },
    ]);
    return Text;
  })(Shape);

  var Custom = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Custom, _Shape);
    var _super = _createSuper$1(Custom);
    function Custom() {
      _classCallCheck$1(this, Custom);
      return _super.apply(this, arguments);
    }
    _createClass$1(Custom, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Custom.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.createPath = null;
          this._attrs.type = 'custom';
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var createPath = this.get('createPath');
          createPath && createPath.call(this, context);
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var calculateBox = this.get('calculateBox');
          return calculateBox && calculateBox.call(this);
        },
      },
    ]);
    return Custom;
  })(Shape);

  var SYMBOLS = {
    circle: function circle(x, y, r, ctx) {
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
    },
    square: function square(x, y, r, ctx) {
      ctx.moveTo(x - r, y - r);
      ctx.lineTo(x + r, y - r);
      ctx.lineTo(x + r, y + r);
      ctx.lineTo(x - r, y + r);
      ctx.closePath();
    },
  };
  var Marker = /*#__PURE__*/ (function (_Shape) {
    _inherits$1(Marker, _Shape);
    var _super = _createSuper$1(Marker);
    function Marker() {
      _classCallCheck$1(this, Marker);
      return _super.apply(this, arguments);
    }
    _createClass$1(Marker, [
      {
        key: '_initProperties',
        value: function _initProperties() {
          _get(_getPrototypeOf$1(Marker.prototype), '_initProperties', this).call(this);
          this._attrs.canFill = true;
          this._attrs.canStroke = true;
          this._attrs.type = 'marker';
        },
      },
      {
        key: 'getDefaultAttrs',
        value: function getDefaultAttrs() {
          return {
            x: 0,
            y: 0,
            lineWidth: 0,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            radius = attrs.radius;
          var symbol = attrs.symbol || 'circle';
          var method;
          if (isFunction(symbol)) {
            method = symbol;
          } else {
            method = SYMBOLS[symbol];
          }
          context.beginPath();
          method(x, y, radius, context, this);
        },
      },
      {
        key: 'calculateBox',
        value: function calculateBox() {
          var attrs = this.get('attrs');
          var x = attrs.x,
            y = attrs.y,
            radius = attrs.radius;
          return {
            minX: x - radius,
            minY: y - radius,
            maxX: x + radius,
            maxY: y + radius,
          };
        },
      },
    ]);
    return Marker;
  })(Shape);

  Shape.Rect = Rect;
  Shape.Image = ImageShape;
  Shape.Circle = Circle;
  Shape.Line = Line;
  Shape.Polygon = Polygon;
  Shape.Polyline = Polyline;
  Shape.Arc = Arc;
  Shape.Sector = Sector;
  Shape.Text = Text;
  Shape.Custom = Custom;
  Shape.Marker = Marker;

  var SHAPE_MAP = {};
  var INDEX = '_INDEX';
  function getComparer(compare) {
    return function (left, right) {
      var result = compare(left, right);
      return result === 0 ? left[INDEX] - right[INDEX] : result;
    };
  }
  var Container = {
    getGroupClass: function getGroupClass() {},
    getChildren: function getChildren() {
      return this.get('children');
    },
    addShape: function addShape(type) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var shapeType = SHAPE_MAP[type];
      if (!shapeType) {
        shapeType = upperFirst(type);
        SHAPE_MAP[type] = shapeType;
      }
      var shape = new Shape[shapeType](cfg);
      this.add(shape);
      return shape;
    },
    addGroup: function addGroup(cfg) {
      var groupClass = this.getGroupClass();
      var rst = new groupClass(cfg);
      this.add(rst);
      return rst;
    },
    contain: function contain(item) {
      var children = this.get('children');
      return children.indexOf(item) > -1;
    },
    sort: function sort() {
      var children = this.get('children');
      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        child[INDEX] = i;
      }
      children.sort(
        getComparer(function (obj1, obj2) {
          return obj1.get('zIndex') - obj2.get('zIndex');
        })
      );
      return this;
    },
    drawChildren: function drawChildren(context) {
      this.sort();
      var children = this.get('children');
      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        child.draw(context);
      }
      return this;
    },
    clear: function clear() {
      var children = this.get('children') || [];
      while (children.length !== 0) {
        children[children.length - 1].remove(true);
      }
      return this;
    },
    add: function add(items) {
      var children = this.get('children');
      if (!children) {
        children = [];
        this.set('children', children);
      }
      if (!isArray(items)) {
        items = [items];
      }
      for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        var parent = item.get('parent');
        if (parent) {
          var descendants = parent.get('children');
          remove(descendants, item);
        }
        this._setEvn(item);
        children.push(item);
      }
      return this;
    },
    _setEvn: function _setEvn(item) {
      var _item$_attrs$attrs, _item$_attrs$attrs2;
      var _this$_attrs = this._attrs,
        context = _this$_attrs.context,
        canvas = _this$_attrs.canvas,
        aria = _this$_attrs.aria;
      var _item$_attrs = item._attrs,
        isGroup = _item$_attrs.isGroup,
        type = _item$_attrs.type;
      item._attrs.parent = this;
      item._attrs.context = context;
      item._attrs.canvas = canvas;
      // 是否需要无障碍处理
      if (aria && item._attrs.aria !== false) {
        item._attrs.aria = aria;
      }
      if (
        type === 'text' &&
        canvas &&
        canvas.get('fontFamily') &&
        !((_item$_attrs$attrs = item._attrs.attrs) === null || _item$_attrs$attrs === void 0
          ? void 0
          : _item$_attrs$attrs.fontFamily)
      ) {
        item.attr('fontFamily', canvas.get('fontFamily'));
      }
      var clip =
        (_item$_attrs$attrs2 = item._attrs.attrs) === null || _item$_attrs$attrs2 === void 0
          ? void 0
          : _item$_attrs$attrs2.clip;
      if (clip) {
        clip._attrs.parent = this;
        clip._attrs.context = context;
        clip._attrs.canvas = canvas;
      }
      if (isGroup) {
        var children = item._attrs.children;
        for (var i = 0, len = children.length; i < len; i++) {
          item._setEvn(children[i]);
        }
      }
    },
    _getAriaLabel: function _getAriaLabel() {
      var _this$_attrs2 = this._attrs,
        aria = _this$_attrs2.aria,
        ariaLabel = _this$_attrs2.ariaLabel,
        children = _this$_attrs2.children;
      // 主动关闭
      if (!aria) return;
      var childAriaLabels = [];
      if (children && children.length) {
        for (var i = 0, len = children.length; i < len; i++) {
          var _childAriaLabel = children[i].getAriaLabel();
          if (_childAriaLabel) {
            childAriaLabels.push(_childAriaLabel);
          }
        }
      }
      var childAriaLabel = childAriaLabels.join(' ');
      // 2个都有时拼接成完整句子
      if (ariaLabel && childAriaLabel) {
        return ''.concat(ariaLabel, ' ').concat(childAriaLabel, ' ');
      }
      // 只有1个，或者都没有
      return ariaLabel || childAriaLabel;
    },
  };

  var Group = /*#__PURE__*/ (function (_Rect) {
    _inherits$1(Group, _Rect);
    var _super = _createSuper$1(Group);
    function Group() {
      _classCallCheck$1(this, Group);
      return _super.apply(this, arguments);
    }
    _createClass$1(Group, [
      {
        key: '_initProperties',
        /* eslint-enable */
        value: function _initProperties() {
          this._attrs = {
            type: 'group',
            zIndex: 0,
            visible: true,
            destroyed: false,
            isGroup: true,
            canFill: true,
            canStroke: true,
            children: [],
            attrs: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
              radius: 0,
              lineWidth: 0,
            },
          };
        },
      },
      {
        key: 'getBBox',
        value: function getBBox() {
          var minX = Infinity;
          var maxX = -Infinity;
          var minY = Infinity;
          var maxY = -Infinity;
          var children = this.get('children');
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
              var matrix = child.attr('matrix');
              Vector2.transformMat2d(leftTop, leftTop, matrix);
              Vector2.transformMat2d(leftBottom, leftBottom, matrix);
              Vector2.transformMat2d(rightTop, rightTop, matrix);
              Vector2.transformMat2d(rightBottom, rightBottom, matrix);
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
            height: maxY - minY,
          };
        },
      },
      {
        key: 'createPath',
        value: function createPath(context) {
          var attrs = this.get('attrs');
          // 只有在有fillStyle或strokeStyle 时才需要绘制
          if (!attrs.fillStyle && !attrs.strokeStyle) {
            return;
          }
          _get(_getPrototypeOf$1(Group.prototype), 'createPath', this).call(this, context);
        },
      },
      {
        key: 'drawInner',
        value: function drawInner(context) {
          _get(_getPrototypeOf$1(Group.prototype), 'drawInner', this).call(this, context);
          this.drawChildren(context);
        },
      },
      {
        key: 'destroy',
        value: function destroy() {
          if (this.get('destroyed')) {
            return;
          }
          this.clear();
          _get(_getPrototypeOf$1(Group.prototype), 'destroy', this).call(this);
        },
      },
    ]);
    return Group;
  })(Rect); // @ts-ignore
  mix(Group.prototype, Container, {
    getGroupClass: function getGroupClass() {
      return Group;
    },
  });

  var requestAnimationFrame$1 =
    (typeof window === 'undefined' ? 'undefined' : _typeof$1(window)) === 'object' &&
    window.requestAnimationFrame
      ? window.requestAnimationFrame
      : function (fn) {
          return setTimeout(fn, 16);
        };

  var lang = {
    general: {
      title: '这是一个图表，',
      withTitle: '这是一个关于“{title}”的图表。',
    },
    coord: {
      cartesian: 'X轴是{xLabel}Y轴是{yLabel}',
      // polar: '弧度是{xLabel}半径是{yLabel}'
    },

    scale: {
      linear: '数值型，数据最小值为{min}，最大值为{max}；',
      cat: '分类型, 分类类型有：{values}；',
      timeCat: '时间型，时间范围从{start}到{end}；',
    },
    geometry: {
      prefix: '共有{count}种分类组成，',
      oneData: '第{index}类是{name}，数据是{values};',
      partData: '第{index}类是{name}，共有{count}项数据，前{part}项是{values};',
      allData: '第{index}类是{name}，有{count}项数据，分别是{values};',
    },
    legend: {
      prefix: '图例分类有：',
    },
  };

  var getPixelRatio$1 = getPixelRatio,
    getDomById$1 = getDomById,
    getWidth$1 = getWidth,
    getHeight$1 = getHeight,
    isCanvasElement$1 = isCanvasElement;
  var Canvas = /*#__PURE__*/ (function (_EventEmit) {
    _inherits$1(Canvas, _EventEmit);
    var _super = _createSuper$1(Canvas);
    function Canvas(cfg) {
      var _this;
      _classCallCheck$1(this, Canvas);
      _this = _super.call(this);
      var title = cfg.title;
      var ariaLabel = title
        ? substitute(lang.general.withTitle, {
            title: title,
          })
        : lang.general.title;
      _this._attrs = mix(
        {
          type: 'canvas',
          children: [],
          ariaLabel: ariaLabel,
        },
        cfg
      );
      _this._initPixelRatio();
      _this._initCanvas();
      return _this;
    }
    _createClass$1(Canvas, [
      {
        key: 'get',
        /* eslint-enable */
        value: function get(name) {
          return this._attrs[name];
        },
      },
      {
        key: 'set',
        value: function set(name, value) {
          this._attrs[name] = value;
        },
      },
      {
        key: '_initPixelRatio',
        value: function _initPixelRatio() {
          var pixelRatio = this.get('pixelRatio');
          if (!pixelRatio) {
            this.set('pixelRatio', getPixelRatio$1());
          }
        },
      },
      {
        key: 'beforeDraw',
        value: function beforeDraw() {
          var context = this._attrs.context;
          var el = this._attrs.el;
          context && context.clearRect && context.clearRect(0, 0, el.width, el.height);
        },
      },
      {
        key: '_initCanvas',
        value: function _initCanvas() {
          var el = this.get('el');
          var context = this.get('context');
          if (!el && !context) {
            throw new Error('Please specify the id, el or context of the chart!');
          }
          var canvas;
          if (el) {
            // DOMElement or String
            canvas = isString(el) ? getDomById$1(el) : el;
          } else {
            // 说明没有指定el
            canvas = CanvasElement$1.create(context);
          }
          if (context && canvas && !canvas.getContext) {
            canvas.getContext = function () {
              return context;
            };
          }
          var width = this.get('width') || getWidth$1(canvas) || canvas.width;
          var height = this.get('height') || getHeight$1(canvas) || canvas.height;
          this.set('canvas', this);
          this.set('el', canvas);
          this.set('context', context || canvas.getContext('2d'));
          this.changeSize(width, height);
          // 初始化事件控制器
          var eventController = new EventController({
            canvas: this,
            el: canvas,
          });
          this.set('eventController', eventController);
        },
      },
      {
        key: 'changeSize',
        value: function changeSize(width, height) {
          var pixelRatio = this.get('pixelRatio');
          var canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement
          // 浏览器环境设置style样式
          if (canvasDOM.style) {
            canvasDOM.style.width = width + 'px';
            canvasDOM.style.height = height + 'px';
          }
          if (isCanvasElement$1(canvasDOM)) {
            canvasDOM.width = width * pixelRatio;
            canvasDOM.height = height * pixelRatio;
            if (pixelRatio !== 1) {
              var ctx = this.get('context');
              ctx.scale(pixelRatio, pixelRatio);
            }
          }
          this.set('width', width);
          this.set('height', height);
        },
      },
      {
        key: 'getWidth',
        value: function getWidth() {
          var pixelRatio = this.get('pixelRatio');
          var width = this.get('width');
          return width * pixelRatio;
        },
      },
      {
        key: 'getHeight',
        value: function getHeight() {
          var pixelRatio = this.get('pixelRatio');
          var height = this.get('height');
          return height * pixelRatio;
        },
      },
      {
        key: 'getPointByClient',
        value: function getPointByClient(clientX, clientY) {
          var el = this.get('el');
          var bbox = el.getBoundingClientRect();
          var width = bbox.right - bbox.left;
          var height = bbox.bottom - bbox.top;
          return {
            x: (clientX - bbox.left) * (el.width / width),
            y: (clientY - bbox.top) * (el.height / height),
          };
        },
      },
      {
        key: '_beginDraw',
        value: function _beginDraw() {
          this._attrs.toDraw = true;
        },
      },
      {
        key: '_endDraw',
        value: function _endDraw() {
          this._attrs.toDraw = false;
          this.emit('afterdraw', {});
        },
      },
      {
        key: 'draw',
        value: function draw() {
          var _this2 = this;
          var drawInner = function drawInner() {
            _this2.set(
              'animateHandler',
              requestAnimationFrame$1(function () {
                _this2.set('animateHandler', undefined);
                if (_this2.get('toDraw')) {
                  drawInner();
                }
              })
            );
            _this2.beforeDraw();
            try {
              var context = _this2._attrs.context;
              _this2.drawChildren(context);
              // 支付宝，微信小程序，需要调context.draw才能完成绘制， 所以这里直接判断是否有.draw方法
              if (context.draw) {
                context.draw();
              }
              // 设置无障碍文本
              _this2.setAriaLabel();
            } catch (ev) {
              console.warn('error in draw canvas, detail as:');
              console.warn(ev);
              _this2._endDraw();
            }
            _this2._endDraw();
          };
          if (this.get('destroyed')) {
            return;
          }
          if (this.get('animateHandler')) {
            this._beginDraw();
          } else {
            drawInner();
          }
        },
        // 设置无障碍文本
      },
      {
        key: 'setAriaLabel',
        value: function setAriaLabel() {
          var el = this._attrs.el;
          var ariaLabel = this._getAriaLabel();
          if (ariaLabel && el.setAttribute) {
            el.setAttribute('aria-label', ariaLabel);
          }
        },
      },
      {
        key: 'destroy',
        value: function destroy() {
          if (this.get('destroyed')) {
            return;
          }
          // 需要清理 canvas 画布内容，否则会导致 spa 应用 ios 下 canvas 白屏
          // https://stackoverflow.com/questions/52532614/total-canvas-memory-use-exceeds-the-maximum-limit-safari-12
          // https://github.com/antvis/F2/issues/630
          var el = this.get('el');
          el.width = 0;
          el.height = 0;
          this.clear();
          this._attrs = {};
          this.set('destroyed', true);
        },
      },
      {
        key: 'isDestroyed',
        value: function isDestroyed() {
          return this.get('destroyed');
        },
      },
    ]);
    return Canvas;
  })(EventEmit); // @ts-ignore
  mix(Canvas.prototype, Container, {
    getGroupClass: function getGroupClass() {
      return Group;
    },
  });

  var engines = {};
  function getEngine(name) {
    var G = engines[name];
    if (G) {
      return G;
    }
    return {
      Canvas: Canvas,
      Group: Group,
      Shape: Shape,
    };
  }
  function createCanvas(cfg) {
    var renderer = cfg.renderer;
    var G = getEngine(renderer);
    return new G.Canvas(cfg);
  }

  var objectWithoutPropertiesLoose = createCommonjsModule(function (module) {
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    (module.exports = _objectWithoutPropertiesLoose),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var objectWithoutProperties = createCommonjsModule(function (module) {
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    (module.exports = _objectWithoutProperties),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _objectWithoutProperties = /*@__PURE__*/ getDefaultExportFromCjs(objectWithoutProperties);

  var _excluded = ['key', 'ref'];
  // 实现jsx-classic 入口
  function jsx(type, config) {
    var _ref = config || {},
      key = _ref.key,
      ref = _ref.ref,
      props = _objectWithoutProperties(_ref, _excluded);
    // 保持和automatic模式一致
    for (
      var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2;
      _key < _len;
      _key++
    ) {
      children[_key - 2] = arguments[_key];
    }
    if (children.length) {
      props.children = children.length === 1 ? children[0] : children;
    }
    return {
      key: key,
      ref: ref,
      type: type,
      props: props,
      // 存储一些过程中的cache值
      _cache: {},
    };
  }

  var fragment = function (props) {
    return props.children;
  };

  // 默认设置50
  var ONE_REM;
  try {
    // xgraph下这段会抛错
    ONE_REM = parseInt(document.documentElement.style.fontSize, 10) || 50;
  } catch (e) {
    ONE_REM = 50;
  }
  var SCALE = ONE_REM / 100;
  /**
   * 像素转换
   * @param {Number} px - 750视觉稿像素
   * @return {Number} 屏幕上实际像素
   */
  function defaultPx2hd(px) {
    if (!px) {
      return 0;
    }
    return Number((px * SCALE).toFixed(1));
  }
  function parsePadding$1(padding) {
    if (isNumber(padding)) {
      return [padding, padding, padding, padding];
    }
    var top = padding[0];
    var right = isNumber(padding[1]) ? padding[1] : padding[0];
    var bottom = isNumber(padding[2]) ? padding[2] : top;
    var left = isNumber(padding[3]) ? padding[3] : right;
    return [top, right, bottom, left];
  }
  function batch2hd(px2hd) {
    var batchPx2hd = function batchPx2hd(value) {
      // 处理带px的数据
      if (isString(value) && /^-?\d+(\.\d+)?px$/.test(value)) {
        var num = value.substr(0, value.length - 2);
        return px2hd(Number(num));
      }
      if (isArray(value)) {
        return value.map(function (v) {
          return batchPx2hd(v);
        });
      }
      if (isPlainObject(value)) {
        var result = {};
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            var rst = batchPx2hd(value[key]);
            if (!rst) {
              result[key] = rst;
              continue;
            }
            if (key === 'padding' || key === 'margin') {
              var paddingArray = parsePadding$1(rst);
              result[key] = paddingArray;
              result[''.concat(key, 'Top')] = paddingArray[0];
              result[''.concat(key, 'Right')] = paddingArray[1];
              result[''.concat(key, 'Bottom')] = paddingArray[2];
              result[''.concat(key, 'Left')] = paddingArray[3];
              continue;
            }
            result[key] = rst;
          }
        }
        return result;
      }
      // 默认直接返回
      return value;
    };
    return batchPx2hd;
  }
  // 展开数组
  function extendMap(arr, fn) {
    if (!arr) {
      return arr;
    }
    if (!isArray(arr)) {
      return [fn(arr)];
    }
    var newArray = [];
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (isArray(element)) {
        newArray = newArray.concat(extendMap(element, fn));
      } else if (element) {
        newArray.push(fn(element));
      }
    }
    return newArray;
  }
  function toTimeStamp(value) {
    if (isString(value)) {
      if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        // new Date('2010/01/10') 和 new Date('2010-01-10') 的差别在于:
        // 如果仅有年月日时，前者是带有时区的: Fri Jan 10 2020 02:40:13 GMT+0800 (中国标准时间)
        // 后者会格式化成 Sun Jan 10 2010 08:00:00 GMT+0800 (中国标准时间)
        value = new Date(value.replace(/-/gi, '/')).getTime();
      }
    }
    if (isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
  function isInBBox(bbox, point) {
    var minX = bbox.minX,
      maxX = bbox.maxX,
      minY = bbox.minY,
      maxY = bbox.maxY;
    var x = point.x,
      y = point.y;
    return minX <= x && maxX >= x && minY <= y && maxY >= y;
  }
  function getElementsByClassName(className, element) {
    if (!element || !className) return [];
    var rst = [];
    if (element.get('className') === className) {
      rst.push(element);
    }
    var children = element.get('children');
    if (children && children.length) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        rst = rst.concat(getElementsByClassName(className, child));
      }
    }
    return rst;
  }
  var px2hd = batch2hd(defaultPx2hd);

  /* eslint-disable */
  // @ts-nocheck
  // from css-layout
  var CSS_UNDEFINED;
  var CSS_DIRECTION_INHERIT = 'inherit';
  var CSS_DIRECTION_LTR = 'ltr';
  var CSS_DIRECTION_RTL = 'rtl';
  var CSS_FLEX_DIRECTION_ROW = 'row';
  var CSS_FLEX_DIRECTION_ROW_REVERSE = 'row-reverse';
  var CSS_FLEX_DIRECTION_COLUMN = 'column';
  var CSS_FLEX_DIRECTION_COLUMN_REVERSE = 'column-reverse';
  var CSS_JUSTIFY_FLEX_START = 'flex-start';
  var CSS_JUSTIFY_CENTER = 'center';
  var CSS_JUSTIFY_FLEX_END = 'flex-end';
  var CSS_JUSTIFY_SPACE_BETWEEN = 'space-between';
  var CSS_JUSTIFY_SPACE_AROUND = 'space-around';
  var CSS_ALIGN_FLEX_START = 'flex-start';
  var CSS_ALIGN_CENTER = 'center';
  var CSS_ALIGN_FLEX_END = 'flex-end';
  var CSS_ALIGN_STRETCH = 'stretch';
  var CSS_POSITION_RELATIVE = 'relative';
  var CSS_POSITION_ABSOLUTE = 'absolute';
  var leading = {
    row: 'left',
    'row-reverse': 'right',
    column: 'top',
    'column-reverse': 'bottom',
  };
  var trailing = {
    row: 'right',
    'row-reverse': 'left',
    column: 'bottom',
    'column-reverse': 'top',
  };
  var pos = {
    row: 'left',
    'row-reverse': 'right',
    column: 'top',
    'column-reverse': 'bottom',
  };
  var dim = {
    row: 'width',
    'row-reverse': 'width',
    column: 'height',
    'column-reverse': 'height',
  };
  // When transpiled to Java / C the node type has layout, children and style
  // properties. For the JavaScript version this function adds these properties
  // if they don't already exist.
  function fillNodes(node) {
    if (!node.layout || node.isDirty) {
      node.layout = {
        width: undefined,
        height: undefined,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };
    }
    if (!node.style) {
      node.style = {};
    }
    if (!node.children) {
      node.children = [];
    }
    node.children.forEach(fillNodes);
    return node;
  }
  function isUndefined$1(value) {
    return value === undefined;
  }
  function isRowDirection(flexDirection) {
    return (
      flexDirection === CSS_FLEX_DIRECTION_ROW || flexDirection === CSS_FLEX_DIRECTION_ROW_REVERSE
    );
  }
  function isColumnDirection(flexDirection) {
    return (
      flexDirection === CSS_FLEX_DIRECTION_COLUMN ||
      flexDirection === CSS_FLEX_DIRECTION_COLUMN_REVERSE
    );
  }
  function getLeadingMargin(node, axis) {
    if (node.style.marginStart !== undefined && isRowDirection(axis)) {
      return node.style.marginStart;
    }
    var value = null;
    switch (axis) {
      case 'row':
        value = node.style.marginLeft;
        break;
      case 'row-reverse':
        value = node.style.marginRight;
        break;
      case 'column':
        value = node.style.marginTop;
        break;
      case 'column-reverse':
        value = node.style.marginBottom;
        break;
    }
    if (value !== undefined) {
      return value;
    }
    if (node.style.margin !== undefined) {
      return node.style.margin;
    }
    return 0;
  }
  function getTrailingMargin(node, axis) {
    if (node.style.marginEnd !== undefined && isRowDirection(axis)) {
      return node.style.marginEnd;
    }
    var value = null;
    switch (axis) {
      case 'row':
        value = node.style.marginRight;
        break;
      case 'row-reverse':
        value = node.style.marginLeft;
        break;
      case 'column':
        value = node.style.marginBottom;
        break;
      case 'column-reverse':
        value = node.style.marginTop;
        break;
    }
    if (value != null) {
      return value;
    }
    if (node.style.margin !== undefined) {
      return node.style.margin;
    }
    return 0;
  }
  function getLeadingPadding(node, axis) {
    if (
      node.style.paddingStart !== undefined &&
      node.style.paddingStart >= 0 &&
      isRowDirection(axis)
    ) {
      return node.style.paddingStart;
    }
    var value = null;
    switch (axis) {
      case 'row':
        value = node.style.paddingLeft;
        break;
      case 'row-reverse':
        value = node.style.paddingRight;
        break;
      case 'column':
        value = node.style.paddingTop;
        break;
      case 'column-reverse':
        value = node.style.paddingBottom;
        break;
    }
    if (value != null && value >= 0) {
      return value;
    }
    if (node.style.padding !== undefined && node.style.padding >= 0) {
      return node.style.padding;
    }
    return 0;
  }
  function getTrailingPadding(node, axis) {
    if (node.style.paddingEnd !== undefined && node.style.paddingEnd >= 0 && isRowDirection(axis)) {
      return node.style.paddingEnd;
    }
    var value = null;
    switch (axis) {
      case 'row':
        value = node.style.paddingRight;
        break;
      case 'row-reverse':
        value = node.style.paddingLeft;
        break;
      case 'column':
        value = node.style.paddingBottom;
        break;
      case 'column-reverse':
        value = node.style.paddingTop;
        break;
    }
    if (value != null && value >= 0) {
      return value;
    }
    if (node.style.padding !== undefined && node.style.padding >= 0) {
      return node.style.padding;
    }
    return 0;
  }
  function getLeadingBorder(node, axis) {
    if (
      node.style.borderStartWidth !== undefined &&
      node.style.borderStartWidth >= 0 &&
      isRowDirection(axis)
    ) {
      return node.style.borderStartWidth;
    }
    var value = null;
    switch (axis) {
      case 'row':
        value = node.style.borderLeftWidth;
        break;
      case 'row-reverse':
        value = node.style.borderRightWidth;
        break;
      case 'column':
        value = node.style.borderTopWidth;
        break;
      case 'column-reverse':
        value = node.style.borderBottomWidth;
        break;
    }
    if (value != null && value >= 0) {
      return value;
    }
    if (node.style.borderWidth !== undefined && node.style.borderWidth >= 0) {
      return node.style.borderWidth;
    }
    return 0;
  }
  function getTrailingBorder(node, axis) {
    if (
      node.style.borderEndWidth !== undefined &&
      node.style.borderEndWidth >= 0 &&
      isRowDirection(axis)
    ) {
      return node.style.borderEndWidth;
    }
    var value = null;
    switch (axis) {
      case 'row':
        value = node.style.borderRightWidth;
        break;
      case 'row-reverse':
        value = node.style.borderLeftWidth;
        break;
      case 'column':
        value = node.style.borderBottomWidth;
        break;
      case 'column-reverse':
        value = node.style.borderTopWidth;
        break;
    }
    if (value != null && value >= 0) {
      return value;
    }
    if (node.style.borderWidth !== undefined && node.style.borderWidth >= 0) {
      return node.style.borderWidth;
    }
    return 0;
  }
  function getLeadingPaddingAndBorder(node, axis) {
    return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
  }
  function getTrailingPaddingAndBorder(node, axis) {
    return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
  }
  function getBorderAxis(node, axis) {
    return getLeadingBorder(node, axis) + getTrailingBorder(node, axis);
  }
  function getMarginAxis(node, axis) {
    return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
  }
  function getPaddingAndBorderAxis(node, axis) {
    return getLeadingPaddingAndBorder(node, axis) + getTrailingPaddingAndBorder(node, axis);
  }
  function getJustifyContent(node) {
    if (node.style.justifyContent) {
      return node.style.justifyContent;
    }
    return 'flex-start';
  }
  function getAlignContent(node) {
    if (node.style.alignContent) {
      return node.style.alignContent;
    }
    return 'flex-start';
  }
  function getAlignItem(node, child) {
    if (child.style.alignSelf) {
      return child.style.alignSelf;
    }
    if (node.style.alignItems) {
      return node.style.alignItems;
    }
    return 'stretch';
  }
  function resolveAxis(axis, direction) {
    if (direction === CSS_DIRECTION_RTL) {
      if (axis === CSS_FLEX_DIRECTION_ROW) {
        return CSS_FLEX_DIRECTION_ROW_REVERSE;
      } else if (axis === CSS_FLEX_DIRECTION_ROW_REVERSE) {
        return CSS_FLEX_DIRECTION_ROW;
      }
    }
    return axis;
  }
  function resolveDirection(node, parentDirection) {
    var direction;
    if (node.style.direction) {
      direction = node.style.direction;
    } else {
      direction = CSS_DIRECTION_INHERIT;
    }
    if (direction === CSS_DIRECTION_INHERIT) {
      direction = parentDirection === undefined ? CSS_DIRECTION_LTR : parentDirection;
    }
    return direction;
  }
  function getFlexDirection(node) {
    if (node.style.flexDirection) {
      return node.style.flexDirection;
    }
    return CSS_FLEX_DIRECTION_COLUMN;
  }
  function getCrossFlexDirection(flexDirection, direction) {
    if (isColumnDirection(flexDirection)) {
      return resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);
    } else {
      return CSS_FLEX_DIRECTION_COLUMN;
    }
  }
  function getPositionType(node) {
    if (node.style.position) {
      return node.style.position;
    }
    return 'relative';
  }
  function isFlex(node) {
    return getPositionType(node) === CSS_POSITION_RELATIVE && node.style.flex > 0;
  }
  function isFlexWrap(node) {
    return node.style.flexWrap === 'wrap';
  }
  function getDimWithMargin(node, axis) {
    return node.layout[dim[axis]] + getMarginAxis(node, axis);
  }
  function isDimDefined(node, axis) {
    return node.style[dim[axis]] !== undefined && node.style[dim[axis]] >= 0;
  }
  function isPosDefined(node, pos) {
    return node.style[pos] !== undefined;
  }
  function isMeasureDefined(node) {
    return node.style.measure !== undefined;
  }
  function getPosition(node, pos) {
    if (node.style[pos] !== undefined) {
      return node.style[pos];
    }
    return 0;
  }
  function boundAxis(node, axis, value) {
    var min = {
      row: node.style.minWidth,
      'row-reverse': node.style.minWidth,
      column: node.style.minHeight,
      'column-reverse': node.style.minHeight,
    }[axis];
    var max = {
      row: node.style.maxWidth,
      'row-reverse': node.style.maxWidth,
      column: node.style.maxHeight,
      'column-reverse': node.style.maxHeight,
    }[axis];
    var boundValue = value;
    if (max !== undefined && max >= 0 && boundValue > max) {
      boundValue = max;
    }
    if (min !== undefined && min >= 0 && boundValue < min) {
      boundValue = min;
    }
    return boundValue;
  }
  function fmaxf(a, b) {
    if (a > b) {
      return a;
    }
    return b;
  }
  // When the user specifically sets a value for width or height
  function setDimensionFromStyle(node, axis) {
    // The parent already computed us a width or height. We just skip it
    if (node.layout[dim[axis]] !== undefined) {
      return;
    }
    // We only run if there's a width or height defined
    if (!isDimDefined(node, axis)) {
      return;
    }
    // The dimensions can never be smaller than the padding and border
    node.layout[dim[axis]] = fmaxf(
      boundAxis(node, axis, node.style[dim[axis]]),
      getPaddingAndBorderAxis(node, axis)
    );
  }
  function setTrailingPosition(node, child, axis) {
    child.layout[trailing[axis]] =
      node.layout[dim[axis]] - child.layout[dim[axis]] - child.layout[pos[axis]];
  }
  // If both left and right are defined, then use left. Otherwise return
  // +left or -right depending on which is defined.
  function getRelativePosition$1(node, axis) {
    if (node.style[leading[axis]] !== undefined) {
      return getPosition(node, leading[axis]);
    }
    return -getPosition(node, trailing[axis]);
  }
  function layoutNodeImpl(node, parentMaxWidth, /*css_direction_t*/ parentDirection) {
    var /*css_direction_t*/ direction = resolveDirection(node, parentDirection);
    var /*(c)!css_flex_direction_t*/ /*(java)!int*/ mainAxis = resolveAxis(
        getFlexDirection(node),
        direction
      );
    var /*(c)!css_flex_direction_t*/ /*(java)!int*/ crossAxis = getCrossFlexDirection(
        mainAxis,
        direction
      );
    var /*(c)!css_flex_direction_t*/ /*(java)!int*/ resolvedRowAxis = resolveAxis(
        CSS_FLEX_DIRECTION_ROW,
        direction
      );
    // Handle width and height style attributes
    setDimensionFromStyle(node, mainAxis);
    setDimensionFromStyle(node, crossAxis);
    // Set the resolved resolution in the node's layout
    node.layout.direction = direction;
    // The position is set by the parent, but we need to complete it with a
    // delta composed of the margin and left/top/right/bottom
    node.layout[leading[mainAxis]] +=
      getLeadingMargin(node, mainAxis) + getRelativePosition$1(node, mainAxis);
    node.layout[trailing[mainAxis]] +=
      getTrailingMargin(node, mainAxis) + getRelativePosition$1(node, mainAxis);
    node.layout[leading[crossAxis]] +=
      getLeadingMargin(node, crossAxis) + getRelativePosition$1(node, crossAxis);
    node.layout[trailing[crossAxis]] +=
      getTrailingMargin(node, crossAxis) + getRelativePosition$1(node, crossAxis);
    // Inline immutable values from the target node to avoid excessive method
    // invocations during the layout calculation.
    var /*int*/ childCount = node.children.length;
    var /*float*/ paddingAndBorderAxisResolvedRow = getPaddingAndBorderAxis(node, resolvedRowAxis);
    if (isMeasureDefined(node)) {
      var /*bool*/ isResolvedRowDimDefined = !isUndefined$1(node.layout[dim[resolvedRowAxis]]);
      var /*float*/ width = CSS_UNDEFINED;
      if (isDimDefined(node, resolvedRowAxis)) {
        width = node.style.width;
      } else if (isResolvedRowDimDefined) {
        width = node.layout[dim[resolvedRowAxis]];
      } else {
        width = parentMaxWidth - getMarginAxis(node, resolvedRowAxis);
      }
      width -= paddingAndBorderAxisResolvedRow;
      // We only need to give a dimension for the text if we haven't got any
      // for it computed yet. It can either be from the style attribute or because
      // the element is flexible.
      var /*bool*/ isRowUndefined =
          !isDimDefined(node, resolvedRowAxis) && !isResolvedRowDimDefined;
      var /*bool*/ isColumnUndefined =
          !isDimDefined(node, CSS_FLEX_DIRECTION_COLUMN) &&
          isUndefined$1(node.layout[dim[CSS_FLEX_DIRECTION_COLUMN]]);
      // Let's not measure the text if we already know both dimensions
      if (isRowUndefined || isColumnUndefined) {
        var /*css_dim_t*/ measureDim = node.style.measure(
            /*(c)!node->context,*/
            /*(java)!layoutContext.measureOutput,*/
            width
          );
        if (isRowUndefined) {
          node.layout.width = measureDim.width + paddingAndBorderAxisResolvedRow;
        }
        if (isColumnUndefined) {
          node.layout.height =
            measureDim.height + getPaddingAndBorderAxis(node, CSS_FLEX_DIRECTION_COLUMN);
        }
      }
      if (childCount === 0) {
        return;
      }
    }
    var /*bool*/ isNodeFlexWrap = isFlexWrap(node);
    var /*css_justify_t*/ justifyContent = getJustifyContent(node);
    var /*float*/ leadingPaddingAndBorderMain = getLeadingPaddingAndBorder(node, mainAxis);
    var /*float*/ leadingPaddingAndBorderCross = getLeadingPaddingAndBorder(node, crossAxis);
    var /*float*/ paddingAndBorderAxisMain = getPaddingAndBorderAxis(node, mainAxis);
    var /*float*/ paddingAndBorderAxisCross = getPaddingAndBorderAxis(node, crossAxis);
    var /*bool*/ isMainDimDefined = !isUndefined$1(node.layout[dim[mainAxis]]);
    var /*bool*/ isCrossDimDefined = !isUndefined$1(node.layout[dim[crossAxis]]);
    var /*bool*/ isMainRowDirection = isRowDirection(mainAxis);
    var /*int*/ i;
    var /*int*/ ii;
    var /*css_node_t**/ child;
    var /*(c)!css_flex_direction_t*/ /*(java)!int*/ axis;
    var /*css_node_t**/ firstAbsoluteChild = null;
    var /*css_node_t**/ currentAbsoluteChild = null;
    var /*float*/ definedMainDim = CSS_UNDEFINED;
    if (isMainDimDefined) {
      definedMainDim = node.layout[dim[mainAxis]] - paddingAndBorderAxisMain;
    }
    // We want to execute the next two loops one per line with flex-wrap
    var /*int*/ startLine = 0;
    var /*int*/ endLine = 0;
    // var/*int*/ nextOffset = 0;
    var /*int*/ alreadyComputedNextLayout = 0;
    // We aggregate the total dimensions of the container in those two variables
    var /*float*/ linesCrossDim = 0;
    var /*float*/ linesMainDim = 0;
    var /*int*/ linesCount = 0;
    while (endLine < childCount) {
      // <Loop A> Layout non flexible children and count children by type
      // mainContentDim is accumulation of the dimensions and margin of all the
      // non flexible children. This will be used in order to either set the
      // dimensions of the node if none already exist, or to compute the
      // remaining space left for the flexible children.
      var /*float*/ mainContentDim = 0;
      // There are three kind of children, non flexible, flexible and absolute.
      // We need to know how many there are in order to distribute the space.
      var /*int*/ flexibleChildrenCount = 0;
      var /*float*/ totalFlexible = 0;
      var /*int*/ nonFlexibleChildrenCount = 0;
      // Use the line loop to position children in the main axis for as long
      // as they are using a simple stacking behaviour. Children that are
      // immediately stacked in the initial loop will not be touched again
      // in <Loop C>.
      var /*bool*/ isSimpleStackMain =
          (isMainDimDefined && justifyContent === CSS_JUSTIFY_FLEX_START) ||
          (!isMainDimDefined && justifyContent !== CSS_JUSTIFY_CENTER);
      var /*int*/ firstComplexMain = isSimpleStackMain ? childCount : startLine;
      // Use the initial line loop to position children in the cross axis for
      // as long as they are relatively positioned with alignment STRETCH or
      // FLEX_START. Children that are immediately stacked in the initial loop
      // will not be touched again in <Loop D>.
      var /*bool*/ isSimpleStackCross = true;
      var /*int*/ firstComplexCross = childCount;
      var /*css_node_t**/ firstFlexChild = null;
      var /*css_node_t**/ currentFlexChild = null;
      var /*float*/ mainDim = leadingPaddingAndBorderMain;
      var /*float*/ crossDim = 0;
      var /*float*/ maxWidth;
      for (i = startLine; i < childCount; ++i) {
        child = node.children[i];
        child.lineIndex = linesCount;
        child.nextAbsoluteChild = null;
        child.nextFlexChild = null;
        var /*css_align_t*/ alignItem = getAlignItem(node, child);
        // Pre-fill cross axis dimensions when the child is using stretch before
        // we call the recursive layout pass
        if (
          alignItem === CSS_ALIGN_STRETCH &&
          getPositionType(child) === CSS_POSITION_RELATIVE &&
          isCrossDimDefined &&
          !isDimDefined(child, crossAxis)
        ) {
          child.layout[dim[crossAxis]] = fmaxf(
            boundAxis(
              child,
              crossAxis,
              node.layout[dim[crossAxis]] -
                paddingAndBorderAxisCross -
                getMarginAxis(child, crossAxis)
            ),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(child, crossAxis)
          );
        } else if (getPositionType(child) === CSS_POSITION_ABSOLUTE) {
          // Store a private linked list of absolutely positioned children
          // so that we can efficiently traverse them later.
          if (firstAbsoluteChild === null) {
            firstAbsoluteChild = child;
          }
          if (currentAbsoluteChild !== null) {
            currentAbsoluteChild.nextAbsoluteChild = child;
          }
          currentAbsoluteChild = child;
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = ii !== 0 ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;
            if (
              !isUndefined$1(node.layout[dim[axis]]) &&
              !isDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])
            ) {
              child.layout[dim[axis]] = fmaxf(
                boundAxis(
                  child,
                  axis,
                  node.layout[dim[axis]] -
                    getPaddingAndBorderAxis(node, axis) -
                    getMarginAxis(child, axis) -
                    getPosition(child, leading[axis]) -
                    getPosition(child, trailing[axis])
                ),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              );
            }
          }
        }
        var /*float*/ nextContentDim = 0;
        // It only makes sense to consider a child flexible if we have a computed
        // dimension for the node.
        if (isMainDimDefined && isFlex(child)) {
          flexibleChildrenCount++;
          totalFlexible += child.style.flex;
          // Store a private linked list of flexible children so that we can
          // efficiently traverse them later.
          if (firstFlexChild === null) {
            firstFlexChild = child;
          }
          if (currentFlexChild !== null) {
            currentFlexChild.nextFlexChild = child;
          }
          currentFlexChild = child;
          // Even if we don't know its exact size yet, we already know the padding,
          // border and margin. We'll use this partial information, which represents
          // the smallest possible size for the child, to compute the remaining
          // available space.
          nextContentDim =
            getPaddingAndBorderAxis(child, mainAxis) + getMarginAxis(child, mainAxis);
        } else {
          maxWidth = CSS_UNDEFINED;
          if (!isMainRowDirection) {
            if (isDimDefined(node, resolvedRowAxis)) {
              maxWidth = node.layout[dim[resolvedRowAxis]] - paddingAndBorderAxisResolvedRow;
            } else {
              maxWidth =
                parentMaxWidth -
                getMarginAxis(node, resolvedRowAxis) -
                paddingAndBorderAxisResolvedRow;
            }
          }
          // This is the main recursive call. We layout non flexible children.
          if (alreadyComputedNextLayout === 0) {
            layoutNode(/*(java)!layoutContext, */ child, maxWidth, direction);
          }
          // Absolute positioned elements do not take part of the layout, so we
          // don't use them to compute mainContentDim
          if (getPositionType(child) === CSS_POSITION_RELATIVE) {
            nonFlexibleChildrenCount++;
            // At this point we know the final size and margin of the element.
            nextContentDim = getDimWithMargin(child, mainAxis);
          }
        }
        // The element we are about to add would make us go to the next line
        if (
          isNodeFlexWrap &&
          isMainDimDefined &&
          mainContentDim + nextContentDim > definedMainDim &&
          // If there's only one element, then it's bigger than the content
          // and needs its own line
          i !== startLine
        ) {
          nonFlexibleChildrenCount--;
          alreadyComputedNextLayout = 1;
          break;
        }
        // Disable simple stacking in the main axis for the current line as
        // we found a non-trivial child. The remaining children will be laid out
        // in <Loop C>.
        if (
          isSimpleStackMain &&
          (getPositionType(child) !== CSS_POSITION_RELATIVE || isFlex(child))
        ) {
          isSimpleStackMain = false;
          firstComplexMain = i;
        }
        // Disable simple stacking in the cross axis for the current line as
        // we found a non-trivial child. The remaining children will be laid out
        // in <Loop D>.
        if (
          isSimpleStackCross &&
          (getPositionType(child) !== CSS_POSITION_RELATIVE ||
            (alignItem !== CSS_ALIGN_STRETCH && alignItem !== CSS_ALIGN_FLEX_START) ||
            isUndefined$1(child.layout[dim[crossAxis]]))
        ) {
          isSimpleStackCross = false;
          firstComplexCross = i;
        }
        if (isSimpleStackMain) {
          child.layout[pos[mainAxis]] += mainDim;
          if (isMainDimDefined) {
            setTrailingPosition(node, child, mainAxis);
          }
          mainDim += getDimWithMargin(child, mainAxis);
          crossDim = fmaxf(
            crossDim,
            boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis))
          );
        }
        if (isSimpleStackCross) {
          child.layout[pos[crossAxis]] += linesCrossDim + leadingPaddingAndBorderCross;
          if (isCrossDimDefined) {
            setTrailingPosition(node, child, crossAxis);
          }
        }
        alreadyComputedNextLayout = 0;
        mainContentDim += nextContentDim;
        endLine = i + 1;
      }
      // <Loop B> Layout flexible children and allocate empty space
      // In order to position the elements in the main axis, we have two
      // controls. The space between the beginning and the first element
      // and the space between each two elements.
      var /*float*/ leadingMainDim = 0;
      var /*float*/ betweenMainDim = 0;
      // The remaining available space that needs to be allocated
      var /*float*/ remainingMainDim = 0;
      if (isMainDimDefined) {
        remainingMainDim = definedMainDim - mainContentDim;
      } else {
        remainingMainDim = fmaxf(mainContentDim, 0) - mainContentDim;
      }
      // If there are flexible children in the mix, they are going to fill the
      // remaining space
      if (flexibleChildrenCount !== 0) {
        var /*float*/ flexibleMainDim = remainingMainDim / totalFlexible;
        var /*float*/ baseMainDim;
        var /*float*/ boundMainDim;
        // If the flex share of remaining space doesn't meet min/max bounds,
        // remove this child from flex calculations.
        currentFlexChild = firstFlexChild;
        while (currentFlexChild !== null) {
          baseMainDim =
            flexibleMainDim * currentFlexChild.style.flex +
            getPaddingAndBorderAxis(currentFlexChild, mainAxis);
          boundMainDim = boundAxis(currentFlexChild, mainAxis, baseMainDim);
          if (baseMainDim !== boundMainDim) {
            remainingMainDim -= boundMainDim;
            totalFlexible -= currentFlexChild.style.flex;
          }
          currentFlexChild = currentFlexChild.nextFlexChild;
        }
        flexibleMainDim = remainingMainDim / totalFlexible;
        // The non flexible children can overflow the container, in this case
        // we should just assume that there is no space available.
        if (flexibleMainDim < 0) {
          flexibleMainDim = 0;
        }
        currentFlexChild = firstFlexChild;
        while (currentFlexChild !== null) {
          // At this point we know the final size of the element in the main
          // dimension
          currentFlexChild.layout[dim[mainAxis]] = boundAxis(
            currentFlexChild,
            mainAxis,
            flexibleMainDim * currentFlexChild.style.flex +
              getPaddingAndBorderAxis(currentFlexChild, mainAxis)
          );
          maxWidth = CSS_UNDEFINED;
          if (isDimDefined(node, resolvedRowAxis)) {
            maxWidth = node.layout[dim[resolvedRowAxis]] - paddingAndBorderAxisResolvedRow;
          } else if (!isMainRowDirection) {
            maxWidth =
              parentMaxWidth -
              getMarginAxis(node, resolvedRowAxis) -
              paddingAndBorderAxisResolvedRow;
          }
          // And we recursively call the layout algorithm for this child
          layoutNode(/*(java)!layoutContext, */ currentFlexChild, maxWidth, direction);
          child = currentFlexChild;
          currentFlexChild = currentFlexChild.nextFlexChild;
          child.nextFlexChild = null;
        }
        // We use justifyContent to figure out how to allocate the remaining
        // space available
      } else if (justifyContent !== CSS_JUSTIFY_FLEX_START) {
        if (justifyContent === CSS_JUSTIFY_CENTER) {
          leadingMainDim = remainingMainDim / 2;
        } else if (justifyContent === CSS_JUSTIFY_FLEX_END) {
          leadingMainDim = remainingMainDim;
        } else if (justifyContent === CSS_JUSTIFY_SPACE_BETWEEN) {
          remainingMainDim = fmaxf(remainingMainDim, 0);
          if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 !== 0) {
            betweenMainDim =
              remainingMainDim / (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
          } else {
            betweenMainDim = 0;
          }
        } else if (justifyContent === CSS_JUSTIFY_SPACE_AROUND) {
          // Space on the edges is half of the space between elements
          betweenMainDim = remainingMainDim / (flexibleChildrenCount + nonFlexibleChildrenCount);
          leadingMainDim = betweenMainDim / 2;
        }
      }
      // <Loop C> Position elements in the main axis and compute dimensions
      // At this point, all the children have their dimensions set. We need to
      // find their position. In order to do that, we accumulate data in
      // variables that are also useful to compute the total dimensions of the
      // container!
      mainDim += leadingMainDim;
      for (i = firstComplexMain; i < endLine; ++i) {
        child = node.children[i];
        if (
          getPositionType(child) === CSS_POSITION_ABSOLUTE &&
          isPosDefined(child, leading[mainAxis])
        ) {
          // In case the child is position absolute and has left/top being
          // defined, we override the position to whatever the user said
          // (and margin/border).
          child.layout[pos[mainAxis]] =
            getPosition(child, leading[mainAxis]) +
            getLeadingBorder(node, mainAxis) +
            getLeadingMargin(child, mainAxis);
        } else {
          // If the child is position absolute (without top/left) or relative,
          // we put it at the current accumulated offset.
          child.layout[pos[mainAxis]] += mainDim;
          // Define the trailing position accordingly.
          if (isMainDimDefined) {
            setTrailingPosition(node, child, mainAxis);
          }
          // Now that we placed the element, we need to update the variables
          // We only need to do that for relative elements. Absolute elements
          // do not take part in that phase.
          if (getPositionType(child) === CSS_POSITION_RELATIVE) {
            // The main dimension is the sum of all the elements dimension plus
            // the spacing.
            mainDim += betweenMainDim + getDimWithMargin(child, mainAxis);
            // The cross dimension is the max of the elements dimension since there
            // can only be one element in that cross dimension.
            crossDim = fmaxf(
              crossDim,
              boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis))
            );
          }
        }
      }
      var /*float*/ containerCrossAxis = node.layout[dim[crossAxis]];
      if (!isCrossDimDefined) {
        containerCrossAxis = fmaxf(
          // For the cross dim, we add both sides at the end because the value
          // is aggregate via a max function. Intermediate negative values
          // can mess this computation otherwise
          boundAxis(node, crossAxis, crossDim + paddingAndBorderAxisCross),
          paddingAndBorderAxisCross
        );
      }
      // <Loop D> Position elements in the cross axis
      for (i = firstComplexCross; i < endLine; ++i) {
        child = node.children[i];
        if (
          getPositionType(child) === CSS_POSITION_ABSOLUTE &&
          isPosDefined(child, leading[crossAxis])
        ) {
          // In case the child is absolutely positionned and has a
          // top/left/bottom/right being set, we override all the previously
          // computed positions to set it correctly.
          child.layout[pos[crossAxis]] =
            getPosition(child, leading[crossAxis]) +
            getLeadingBorder(node, crossAxis) +
            getLeadingMargin(child, crossAxis);
        } else {
          var /*float*/ leadingCrossDim = leadingPaddingAndBorderCross;
          // For a relative children, we're either using alignItems (parent) or
          // alignSelf (child) in order to determine the position in the cross axis
          if (getPositionType(child) === CSS_POSITION_RELATIVE) {
            // This variable is intentionally re-defined as the code is transpiled to a block scope language
            var /*css_align_t*/ alignItem = getAlignItem(node, child);
            if (alignItem === CSS_ALIGN_STRETCH) {
              // You can only stretch if the dimension has not already been set
              // previously.
              if (isUndefined$1(child.layout[dim[crossAxis]])) {
                child.layout[dim[crossAxis]] = fmaxf(
                  boundAxis(
                    child,
                    crossAxis,
                    containerCrossAxis - paddingAndBorderAxisCross - getMarginAxis(child, crossAxis)
                  ),
                  // You never want to go smaller than padding
                  getPaddingAndBorderAxis(child, crossAxis)
                );
              }
            } else if (alignItem !== CSS_ALIGN_FLEX_START) {
              // The remaining space between the parent dimensions+padding and child
              // dimensions+margin.
              var /*float*/ remainingCrossDim =
                  containerCrossAxis -
                  paddingAndBorderAxisCross -
                  getDimWithMargin(child, crossAxis);
              if (alignItem === CSS_ALIGN_CENTER) {
                leadingCrossDim += remainingCrossDim / 2;
              } else {
                // CSS_ALIGN_FLEX_END
                leadingCrossDim += remainingCrossDim;
              }
            }
          }
          // And we apply the position
          child.layout[pos[crossAxis]] += linesCrossDim + leadingCrossDim;
          // Define the trailing position accordingly.
          if (isCrossDimDefined) {
            setTrailingPosition(node, child, crossAxis);
          }
        }
      }
      linesCrossDim += crossDim;
      linesMainDim = fmaxf(linesMainDim, mainDim);
      linesCount += 1;
      startLine = endLine;
    }
    // <Loop E>
    //
    // Note(prenaux): More than one line, we need to layout the crossAxis
    // according to alignContent.
    //
    // Note that we could probably remove <Loop D> and handle the one line case
    // here too, but for the moment this is safer since it won't interfere with
    // previously working code.
    //
    // See specs:
    // http://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#layout-algorithm
    // section 9.4
    //
    if (linesCount > 1 && isCrossDimDefined) {
      var /*float*/ nodeCrossAxisInnerSize =
          node.layout[dim[crossAxis]] - paddingAndBorderAxisCross;
      var /*float*/ remainingAlignContentDim = nodeCrossAxisInnerSize - linesCrossDim;
      var /*float*/ crossDimLead = 0;
      var /*float*/ currentLead = leadingPaddingAndBorderCross;
      var /*css_align_t*/ alignContent = getAlignContent(node);
      if (alignContent === CSS_ALIGN_FLEX_END) {
        currentLead += remainingAlignContentDim;
      } else if (alignContent === CSS_ALIGN_CENTER) {
        currentLead += remainingAlignContentDim / 2;
      } else if (alignContent === CSS_ALIGN_STRETCH) {
        if (nodeCrossAxisInnerSize > linesCrossDim) {
          crossDimLead = remainingAlignContentDim / linesCount;
        }
      }
      var /*int*/ endIndex = 0;
      for (i = 0; i < linesCount; ++i) {
        var /*int*/ startIndex = endIndex;
        // compute the line's height and find the endIndex
        var /*float*/ lineHeight = 0;
        for (ii = startIndex; ii < childCount; ++ii) {
          child = node.children[ii];
          if (getPositionType(child) !== CSS_POSITION_RELATIVE) {
            continue;
          }
          if (child.lineIndex !== i) {
            break;
          }
          if (!isUndefined$1(child.layout[dim[crossAxis]])) {
            lineHeight = fmaxf(
              lineHeight,
              child.layout[dim[crossAxis]] + getMarginAxis(child, crossAxis)
            );
          }
        }
        endIndex = ii;
        lineHeight += crossDimLead;
        for (ii = startIndex; ii < endIndex; ++ii) {
          child = node.children[ii];
          if (getPositionType(child) !== CSS_POSITION_RELATIVE) {
            continue;
          }
          var /*css_align_t*/ alignContentAlignItem = getAlignItem(node, child);
          if (alignContentAlignItem === CSS_ALIGN_FLEX_START) {
            child.layout[pos[crossAxis]] = currentLead + getLeadingMargin(child, crossAxis);
          } else if (alignContentAlignItem === CSS_ALIGN_FLEX_END) {
            child.layout[pos[crossAxis]] =
              currentLead +
              lineHeight -
              getTrailingMargin(child, crossAxis) -
              child.layout[dim[crossAxis]];
          } else if (alignContentAlignItem === CSS_ALIGN_CENTER) {
            var /*float*/ childHeight = child.layout[dim[crossAxis]];
            child.layout[pos[crossAxis]] = currentLead + (lineHeight - childHeight) / 2;
          } else if (alignContentAlignItem === CSS_ALIGN_STRETCH) {
            child.layout[pos[crossAxis]] = currentLead + getLeadingMargin(child, crossAxis);
            // TODO(prenaux): Correctly set the height of items with undefined
            //                (auto) crossAxis dimension.
          }
        }

        currentLead += lineHeight;
      }
    }
    var /*bool*/ needsMainTrailingPos = false;
    var /*bool*/ needsCrossTrailingPos = false;
    // If the user didn't specify a width or height, and it has not been set
    // by the container, then we set it via the children.
    if (!isMainDimDefined) {
      node.layout[dim[mainAxis]] = fmaxf(
        // We're missing the last padding at this point to get the final
        // dimension
        boundAxis(node, mainAxis, linesMainDim + getTrailingPaddingAndBorder(node, mainAxis)),
        // We can never assign a width smaller than the padding and borders
        paddingAndBorderAxisMain
      );
      if (
        mainAxis === CSS_FLEX_DIRECTION_ROW_REVERSE ||
        mainAxis === CSS_FLEX_DIRECTION_COLUMN_REVERSE
      ) {
        needsMainTrailingPos = true;
      }
    }
    if (!isCrossDimDefined) {
      node.layout[dim[crossAxis]] = fmaxf(
        // For the cross dim, we add both sides at the end because the value
        // is aggregate via a max function. Intermediate negative values
        // can mess this computation otherwise
        boundAxis(node, crossAxis, linesCrossDim + paddingAndBorderAxisCross),
        paddingAndBorderAxisCross
      );
      if (
        crossAxis === CSS_FLEX_DIRECTION_ROW_REVERSE ||
        crossAxis === CSS_FLEX_DIRECTION_COLUMN_REVERSE
      ) {
        needsCrossTrailingPos = true;
      }
    }
    // <Loop F> Set trailing position if necessary
    if (needsMainTrailingPos || needsCrossTrailingPos) {
      for (i = 0; i < childCount; ++i) {
        child = node.children[i];
        if (needsMainTrailingPos) {
          setTrailingPosition(node, child, mainAxis);
        }
        if (needsCrossTrailingPos) {
          setTrailingPosition(node, child, crossAxis);
        }
      }
    }
    // <Loop G> Calculate dimensions for absolutely positioned elements
    currentAbsoluteChild = firstAbsoluteChild;
    while (currentAbsoluteChild !== null) {
      // Pre-fill dimensions when using absolute position and both offsets for
      // the axis are defined (either both left and right or top and bottom).
      for (ii = 0; ii < 2; ii++) {
        axis = ii !== 0 ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;
        if (
          !isUndefined$1(node.layout[dim[axis]]) &&
          !isDimDefined(currentAbsoluteChild, axis) &&
          isPosDefined(currentAbsoluteChild, leading[axis]) &&
          isPosDefined(currentAbsoluteChild, trailing[axis])
        ) {
          currentAbsoluteChild.layout[dim[axis]] = fmaxf(
            boundAxis(
              currentAbsoluteChild,
              axis,
              node.layout[dim[axis]] -
                getBorderAxis(node, axis) -
                getMarginAxis(currentAbsoluteChild, axis) -
                getPosition(currentAbsoluteChild, leading[axis]) -
                getPosition(currentAbsoluteChild, trailing[axis])
            ),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(currentAbsoluteChild, axis)
          );
        }
        if (
          isPosDefined(currentAbsoluteChild, trailing[axis]) &&
          !isPosDefined(currentAbsoluteChild, leading[axis])
        ) {
          currentAbsoluteChild.layout[leading[axis]] =
            node.layout[dim[axis]] -
            currentAbsoluteChild.layout[dim[axis]] -
            getPosition(currentAbsoluteChild, trailing[axis]);
        }
      }
      child = currentAbsoluteChild;
      currentAbsoluteChild = currentAbsoluteChild.nextAbsoluteChild;
      child.nextAbsoluteChild = null;
    }
  }
  // 在外层做的margin补丁
  function saveMargin(node) {
    var style = node.style;
    var margin = {};
    [
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft', // 只支持marginLeft
    ].forEach(function (key) {
      // 只处理百分号
      var value = style[key];
      if (value && /^-?\d+%$/.test(value)) {
        margin[key] = value;
        style[key] = 0;
      }
    });
    node.margin = margin;
  }
  function percent2Num(value) {
    var percent = Number(value.substr(0, value.length - 1));
    return percent / 100;
  }
  function layoutMargin(node) {
    var margin = node.margin,
      layout = node.layout;
    Object.keys(margin).forEach(function (key) {
      var percent = percent2Num(margin[key]);
      if ((key === 'marginLeft' || key === 'marginRight') && layout.width) {
        layout.left += layout.width * percent;
      } else if ((key === 'marginTop' || key === 'marginBottom') && layout.height) {
        layout.top += layout.height * percent;
      }
    });
  }
  function layoutNode(node, parentMaxWidth, parentDirection) {
    node.shouldUpdate = true;
    // hack
    saveMargin(node);
    var direction = node.style.direction || CSS_DIRECTION_LTR;
    var skipLayout =
      !node.isDirty &&
      node.lastLayout &&
      node.lastLayout.requestedHeight === node.layout.height &&
      node.lastLayout.requestedWidth === node.layout.width &&
      node.lastLayout.parentMaxWidth === parentMaxWidth &&
      node.lastLayout.direction === direction;
    if (skipLayout) {
      node.layout.width = node.lastLayout.width;
      node.layout.height = node.lastLayout.height;
      node.layout.top = node.lastLayout.top;
      node.layout.left = node.lastLayout.left;
    } else {
      if (!node.lastLayout) {
        node.lastLayout = {};
      }
      node.lastLayout.requestedWidth = node.layout.width;
      node.lastLayout.requestedHeight = node.layout.height;
      node.lastLayout.parentMaxWidth = parentMaxWidth;
      node.lastLayout.direction = direction;
      // Reset child layouts
      node.children.forEach(function (child) {
        child.layout.width = undefined;
        child.layout.height = undefined;
        child.layout.top = 0;
        child.layout.left = 0;
      });
      layoutNodeImpl(node, parentMaxWidth, parentDirection);
      node.lastLayout.width = node.layout.width;
      node.lastLayout.height = node.layout.height;
      node.lastLayout.top = node.layout.top;
      node.lastLayout.left = node.layout.left;
    }
    // hack
    layoutMargin(node);
  }
  /* eslint-enable */
  function computeLayout(node) {
    if (!node) return node;
    var style = node.style,
      children = node.children;
    if (style) {
      fillNodes(node);
      layoutNode(node, null, null);
      return node;
    }
    if (children && children.length) {
      for (var i = 0, len = children.length; i < len; i++) {
        computeLayout(children[i]);
      }
    }
    return node;
  }

  var rect = function (layout) {
    var left = layout.left,
      top = layout.top,
      width = layout.width,
      height = layout.height;
    return {
      x: left,
      y: top,
      width: width,
      height: height,
    };
  };

  var line = function (layout) {
    var left = layout.left,
      top = layout.top,
      width = layout.width,
      height = layout.height;
    return {
      x1: left,
      y1: top,
      x2: left + width,
      y2: top + height,
    };
  };

  var text = function (layout) {
    var height = layout.height,
      left = layout.left,
      top = layout.top;
    return {
      x: left,
      y: top + height / 2,
      // 通过middle + top 才能比较好的实现文本对齐
      textBaseline: 'middle',
    };
  };

  var circle = function (layout) {
    var left = layout.left,
      top = layout.top,
      width = layout.width;
    var r = width / 2;
    return {
      x: left + r,
      y: top + r,
      r: r,
    };
  };

  var marker = function (layout) {
    var left = layout.left,
      top = layout.top,
      width = layout.width;
    var r = width / 2;
    return {
      x: left + r,
      y: top,
      radius: r,
    };
  };

  var map$2 = {
    rect: rect,
    line: line,
    text: text,
    circle: circle,
    marker: marker,
    group: rect,
  };
  var getShapeAttrs = function (type, layout) {
    if (!layout) return null;
    var fn = map$2[type] || rect;
    return fn(layout);
  };

  var ELEMENT_APPEAR = 'appear';
  // 标识元素更新
  var ELEMENT_UPDATE = 'update';
  // 标识是删除的元素
  var ELEMENT_DELETE = 'delete';

  function createClipElement(type, config) {
    return new Shape[upperFirst(type)](config);
  }

  var getAnimation = function (element, animation, nextAttrs, lastAttrs) {
    if (!animation) return null;
    // 获取shape的默认属性
    var status = element.get('status');
    var clip = animation.clip,
      start = animation.start,
      end = animation.end,
      easing = animation.easing,
      delay = animation.delay,
      duration = animation.duration;
    var clipConfig = isFunction(clip) ? clip(element._attrs.attrs) : clip;
    // 裁剪动画
    if (clipConfig) {
      var type = clipConfig.type,
        attrs = clipConfig.attrs,
        clipStart = clipConfig.start;
      var clipElement = createClipElement(type, {
        attrs: _objectSpread(_objectSpread({}, attrs), clipStart),
      });
      // 默认用 animation 配置里的 easing 和 duration
      clipConfig.easing = clipConfig.easing || easing;
      clipConfig.delay = typeof clipConfig.delay === 'number' ? clipConfig.delay : delay;
      clipConfig.duration = clipConfig.duration || duration;
      clipConfig.element = clipElement;
    }
    var defaultAttrs = element.getDefaultAttrs();
    return _objectSpread(
      _objectSpread({}, animation),
      {},
      {
        clip: clipConfig,
        start: _objectSpread(_objectSpread(_objectSpread({}, defaultAttrs), lastAttrs), start),
        end: _objectSpread(_objectSpread({}, status === ELEMENT_DELETE ? null : nextAttrs), end),
      }
    );
  };

  // 转换成布局所需要的布局树
  function createNodeTree(element, container, px2hd) {
    var key = element.key,
      ref = element.ref,
      _cache = element._cache,
      type = element.type,
      props = element.props,
      status = element.status,
      animation = element.animation;
    var children = extendMap(props.children, function (child) {
      return createNodeTree(child, container, px2hd);
    });
    // const { style, attrs } = props;
    var style = px2hd(props.style);
    var attrs = px2hd(props.attrs);
    // 文本要自动计算文本的宽高, TODO, 后面再优化
    if (type === 'text') {
      var shape = container.addShape(type, {
        attrs: _objectSpread(
          {
            x: 0,
            y: 0,
          },
          attrs
        ),
      });
      var _shape$getBBox = shape.getBBox(),
        width = _shape$getBBox.width,
        height = _shape$getBBox.height;
      style = _objectSpread(
        {
          width: width,
          height: height,
        },
        style
      );
      // 无用，销毁掉
      shape.remove(true);
    }
    return {
      key: key,
      ref: ref,
      _cache: _cache,
      type: type,
      props: props,
      children: children,
      status: status,
      animation: animation,
      // 处理px2hd之后的配置
      style: style,
      attrs: attrs,
    };
  }
  function mergeLayout(parent, layout) {
    if (!parent || !layout) return layout;
    var parentLeft = parent.left,
      parentTop = parent.top;
    var left = layout.left,
      top = layout.top;
    return _objectSpread(
      _objectSpread({}, layout),
      {},
      {
        left: parentLeft + left,
        top: parentTop + top,
      }
    );
  }
  function createElement(node, container, parentLayout, animate) {
    var _node$_cache = node._cache,
      _cache = _node$_cache === void 0 ? {} : _node$_cache,
      ref = node.ref,
      type = node.type,
      props = node.props,
      attrs = node.attrs,
      originLayout = node.layout,
      renderChildren = node.renderChildren,
      nodeChildren = node.children,
      status = node.status,
      animation = node.animation;
    var layout = mergeLayout(parentLayout, originLayout);
    // 该元素上一次的attrs
    var lastAttrs = _cache.attrs;
    var elementAttrs = _objectSpread(
      _objectSpread(
        _objectSpread({}, getShapeAttrs(type, layout)),
        status === ELEMENT_DELETE ? lastAttrs : null
      ),
      attrs
    );
    // 缓存这次新的attrs
    _cache.attrs = elementAttrs;
    if (elementAttrs.clip) {
      var clip = elementAttrs.clip;
      var clipConfig = isFunction(clip) ? clip(elementAttrs) : clip;
      elementAttrs.clip = createClipElement(clipConfig.type, clipConfig);
    }
    var element;
    if (type === 'group') {
      element = container.addGroup(
        _objectSpread(
          _objectSpread({}, omit(props, ['children'])),
          {},
          {
            status: status,
            attrs: elementAttrs,
          }
        )
      );
      // 如果元素被删除了，就不会有renderChildren， 直接拿node.children渲染
      var children = renderChildren ? renderChildren : nodeChildren;
      // 只有group才需要处理children
      if (children && children.length) {
        for (var i = 0, len = children.length; i < len; i++) {
          createElement(children[i], element, layout, animate);
        }
      }
    } else {
      element = container.addShape(
        type,
        _objectSpread(
          _objectSpread({}, props),
          {},
          {
            status: status,
            attrs: elementAttrs,
          }
        )
      );
    }
    if (animate !== false) {
      element.set('animation', getAnimation(element, animation, elementAttrs, lastAttrs));
    }
    if (ref) {
      ref.current = element;
    }
    return element;
  }
  // 过滤删除的元素，让其不参与布局计算
  function filterDeleteElement(node) {
    var status = node.status,
      children = node.children;
    if (status === ELEMENT_DELETE) {
      return null;
    }
    if (!children || !children.length) {
      return node;
    }
    var newChildren = children.filter(function (child) {
      return !!filterDeleteElement(child);
    });
    // 要保留引用
    node.children = newChildren;
    node.renderChildren = children;
    return node;
  }
  function render(element, container, animate) {
    var px2hd$1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : px2hd;
    if (!element) {
      return;
    }
    var nodeTree = createNodeTree(element, container, px2hd$1);
    var computeLayoutTree = filterDeleteElement(nodeTree);
    computeLayout(computeLayoutTree);
    return createElement(nodeTree, container, null, animate);
  }
  var render$1 = function (element, container, animate) {
    return render(element, container, animate);
  };

  // 主要是把function节点，全部转换成string标签节点
  function renderJSXElement(element, context, updater) {
    if (!element) return element;
    var _element = element,
      type = _element.type,
      key = _element.key,
      ref = _element.ref,
      props = _element.props,
      _element$_cache = _element._cache,
      _cache = _element$_cache === void 0 ? {} : _element$_cache;
    // render children first
    var children = Children.map(props.children, function (child) {
      return renderJSXElement(child, context, updater);
    });
    element = {
      type: type,
      key: key,
      ref: ref,
      _cache: _cache,
      props: _objectSpread(
        _objectSpread({}, props),
        {},
        {
          children: children,
        }
      ),
    };
    if (typeof type === 'function') {
      // @ts-ignore
      var newElement = type(element.props, context, updater);
      if (!newElement) return newElement;
      // recursive render until type is string
      return renderJSXElement(
        _objectSpread(
          _objectSpread({}, newElement),
          {},
          {
            // 保留原始的key和ref
            key: key !== undefined ? key : newElement.key,
            ref: ref !== undefined ? ref : newElement.ref,
          }
        ),
        context,
        updater
      );
    }
    // return element if type is string
    return element;
  }
  var renderJSXElement$1 = function (element, context, updater) {
    return renderJSXElement(element, context, updater);
  };

  var _excluded$1 = ['children', 'animation'],
    _excluded2 = ['children', 'animation'],
    _excluded3 = ['children', 'animation'],
    _excluded4 = ['animation'],
    _excluded5 = ['animation'];
  // 处理删除的元素
  function deleteElement(element) {
    // 是否有非空的子元素
    var hasElement = false;
    var receiveElement = Children.map(element, function (item) {
      if (!item) return item;
      var ref = item.ref,
        key = item.key,
        type = item.type,
        props = item.props,
        _cache = item._cache;
      var children = props.children,
        animation = props.animation,
        receiveProps = _objectWithoutProperties(props, _excluded$1);
      var status = ELEMENT_DELETE;
      var receiveAnimation = animation && animation.leave;
      var receiveChildren = deleteElement(children);
      // 没有子元素，且自身也不需要动画，则直接删除
      if (!receiveChildren && !receiveAnimation) {
        return null;
      }
      hasElement = true;
      return {
        ref: ref,
        key: key,
        type: type,
        props: _objectSpread(
          _objectSpread({}, receiveProps),
          {},
          {
            children: receiveChildren,
          }
        ),
        _cache: _cache,
        animation: receiveAnimation,
        status: status,
      };
    });
    // 如果没有非空的子元素，都删除
    if (!hasElement) {
      return null;
    }
    return receiveElement;
  }
  function appearElement(element) {
    return Children.map(element, function (item) {
      if (!item) return item;
      var ref = item.ref,
        key = item.key,
        type = item.type,
        props = item.props,
        _cache = item._cache;
      var children = props.children,
        animation = props.animation,
        receiveProps = _objectWithoutProperties(props, _excluded2);
      var status = ELEMENT_APPEAR;
      var receiveAnimation = animation && animation.appear;
      var receiveChildren = appearElement(children);
      return {
        ref: ref,
        key: key,
        type: type,
        props: _objectSpread(
          _objectSpread({}, receiveProps),
          {},
          {
            children: receiveChildren,
          }
        ),
        _cache: _cache,
        animation: receiveAnimation,
        status: status,
      };
    });
  }
  function updateElement(nextElement, lastElement) {
    var ref = nextElement.ref,
      key = nextElement.key,
      type = nextElement.type,
      _nextCache = nextElement._cache,
      nextProps = nextElement.props;
    var _lastCache = lastElement._cache,
      lastProps = lastElement.props;
    var nextChildren = nextProps.children,
      nextAnimation = nextProps.animation,
      nextReceiveProps = _objectWithoutProperties(nextProps, _excluded3);
    var lastChildren = lastProps.children;
    // 继续比较子元素
    var children = compareElement(nextChildren, lastChildren);
    // 保留缓存值
    var _cache = mix(_nextCache, _lastCache);
    // 动画
    var animation = nextAnimation && nextAnimation.update;
    // 生成新对象
    return {
      ref: ref,
      key: key,
      type: type,
      props: _objectSpread(
        _objectSpread({}, nextReceiveProps),
        {},
        {
          children: children,
        }
      ),
      _cache: _cache,
      animation: animation,
      status: ELEMENT_UPDATE,
    };
  }
  // 形变动画， TODO
  function morphElement(nextElement, lastElement) {
    return [deleteElement(lastElement), appearElement(nextElement)];
  }
  function changeTypeToGroup(nextGroupElement, lastShapeElement) {
    var key = nextGroupElement.key,
      type = nextGroupElement.type,
      ref = nextGroupElement.ref,
      groupProps = nextGroupElement.props,
      _groupCache = nextGroupElement._cache;
    var lastType = lastShapeElement.type,
      _lastCache = lastShapeElement._cache;
    var groupChildren = groupProps.children;
    // let existTransform = false;
    var children = Children.map(groupChildren, function (nextElement) {
      if (!nextElement) return nextElement;
      var key = nextElement.key,
        ref = nextElement.ref,
        nextType = nextElement.type,
        nextProps = nextElement.props,
        _nextCache = nextElement._cache;
      // if (nextType === 'group') {
      //   return changeTypeToGroup(nextElement, lastShapeElement);
      // }
      if (nextType !== lastType) {
        return morphElement(nextElement, lastShapeElement);
      }
      // existTransform = true;
      var nextAnimation = nextProps.animation,
        nextReceiveProps = _objectWithoutProperties(nextProps, _excluded4);
      var animation = nextAnimation && nextAnimation.update;
      return {
        ref: ref,
        key: key,
        type: nextType,
        props: nextReceiveProps,
        _cache: mix(_nextCache, _lastCache),
        animation: animation,
        status: ELEMENT_UPDATE,
      };
    });
    return {
      key: key,
      type: type,
      ref: ref,
      props: _objectSpread(
        _objectSpread({}, groupProps),
        {},
        {
          children: children,
        }
      ),
      _cache: _groupCache,
      status: ELEMENT_UPDATE,
    };
  }
  function changeTypeFromGroup(nextShapeElement, lastGroupElement) {
    var nextRef = nextShapeElement.ref,
      nextKey = nextShapeElement.key,
      nextType = nextShapeElement.type,
      nextShapeProps = nextShapeElement.props,
      _nextCache = nextShapeElement._cache;
    var lastType = lastGroupElement.type,
      lastProps = lastGroupElement.props;
    var nextAnimation = nextShapeProps.animation,
      nextReceiveProps = _objectWithoutProperties(nextShapeProps, _excluded5);
    var groupChildren = lastProps.children;
    var animation = nextAnimation && nextAnimation.update;
    if (!animation) {
      return [deleteElement(lastGroupElement), appearElement[nextShapeElement]];
    }
    var transformChild = null;
    var children = Children.map(groupChildren, function (child) {
      if (!child) return child;
      var childType = child.type,
        _childCache = child._cache;
      if (childType !== nextType) {
        // TODO: child 形变
        return deleteElement(child);
      }
      if (!transformChild) {
        transformChild = child;
      }
      return {
        type: nextType,
        props: nextShapeProps,
        _cache: _childCache,
        animation: animation,
        status: ELEMENT_UPDATE,
      };
    });
    if (!transformChild) {
      return [deleteElement(lastGroupElement), appearElement(nextShapeElement)];
    }
    var nextElement = {
      ref: nextRef,
      key: nextKey,
      type: nextType,
      props: nextReceiveProps,
      _cache: mix(_nextCache, transformChild._cache),
      animation: animation,
      status: ELEMENT_UPDATE,
    };
    // 保留group 结构
    return [
      {
        type: lastType,
        props: _objectSpread(
          _objectSpread({}, lastProps),
          {},
          {
            children: children,
          }
        ),
        status: ELEMENT_DELETE,
      },
      nextElement,
    ];
  }
  function changeElementType(nextElement, lastElement) {
    var nextType = nextElement.type;
    var lastType = lastElement.type;
    if (nextType === 'group') {
      return changeTypeToGroup(nextElement, lastElement);
    }
    if (lastType === 'group') {
      return changeTypeFromGroup(nextElement, lastElement);
    }
    // 都不是group, 形变动画 TODO
    return morphElement(nextElement, lastElement);
  }
  // 对比2个数组
  function compareArray$1(nextElements, lastElements) {
    var keyed = {};
    var nextLength = nextElements.length;
    var lastLength = lastElements.length;
    for (var i = 0; i < lastLength; i++) {
      var element = lastElements[i];
      if (element && !isNil(element.key)) {
        var key = element.key;
        keyed[key] = element;
      }
    }
    // 比较元素
    var maxLength = Math.max(nextLength, lastLength);
    var returnElements = [];
    for (var _i = 0; _i < maxLength; _i++) {
      var nextElement = nextElements[_i];
      if (!nextElement) {
        returnElements.push(compareElement(nextElement, lastElements[_i]));
        continue;
      }
      var _key = nextElement.key;
      // 有key值定义
      if (!isNil(_key)) {
        var lastElement = keyed[_key];
        if (lastElement) delete keyed[_key];
        returnElements.push(compareElement(nextElement, lastElement));
        continue;
      }
      returnElements.push(compareElement(nextElement, lastElements[_i]));
    }
    // 说明是删除的元素
    Object.keys(keyed).forEach(function (key) {
      returnElements.push(compareElement(null, keyed[key]));
    });
    return returnElements;
  }
  // 比较2个元素，会被递归执行
  function compareElement(nextElement, lastElement) {
    // 都为空
    if (!nextElement && !lastElement) {
      return null;
    }
    // 新增
    if (!lastElement) {
      return appearElement(nextElement);
    }
    // 删除
    if (!nextElement) {
      return deleteElement(lastElement);
    }
    // nextElement & lastElement 都不为空了
    // 如果有数组，比较数组
    if (isArray(nextElement) || isArray(lastElement)) {
      var nextElementArray = isArray(nextElement) ? nextElement : [nextElement];
      var lastElementArray = isArray(lastElement) ? lastElement : [lastElement];
      return compareArray$1(nextElementArray, lastElementArray);
    }
    // 普通的jsx元素, 且都非空
    var nextKey = nextElement.key,
      nextType = nextElement.type;
    var lastKey = lastElement.key,
      lastType = lastElement.type;
    // key 值不相等
    if (!isNil(nextKey) && nextKey !== lastKey) {
      return [deleteElement(lastElement), appearElement(nextElement)];
    }
    // shape 类型的变化
    if (nextType !== lastType) {
      // return [deleteElement(lastElement), nextElement];
      return changeElementType(nextElement, lastElement);
    }
    return updateElement(nextElement, lastElement);
  }

  function objToString(obj) {
    return Object.prototype.toString.call(obj);
  }
  function objectKeys(obj) {
    return Object.keys(obj);
  }
  function equal(a, b) {
    if (a === b) return true;
    if (_typeof(a) !== _typeof(b)) {
      return false;
    }
    // null 和 undefined
    if (a == null || b == null) {
      return false;
    }
    // 特殊处理NaN
    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    }
    if (objToString(a) !== objToString(b)) {
      return false;
    }
    // 如果是function， 则认为是相对
    if (isFunction(a)) {
      return true;
    }
    // 值类型，Number String Boolean
    if (_typeof(a) !== 'object') {
      return false;
    }
    if (isArray(a)) {
      if (a.length !== b.length) {
        return false;
      }
      for (var i = a.length - 1; i >= 0; i--) {
        if (!equal(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    if (!isPlainObject(a)) {
      return false;
    }
    var ka = objectKeys(a);
    var kb = objectKeys(b);
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (ka.length !== kb.length) {
      return false;
    }
    // the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    // ~~~cheap key test
    for (var _i = ka.length - 1; _i >= 0; _i--) {
      if (ka[_i] != kb[_i]) {
        return false;
      }
    }
    // equivalent values for every corresponding key, and ~~~possibly expensive deep test
    for (var _i2 = ka.length - 1; _i2 >= 0; _i2--) {
      var key = ka[_i2];
      if (!equal(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  var _excluded$2 = ['transformFrom'];
  function pickElement(element) {
    if (!element) return element;
    return Children.map(element, function (item) {
      if (!item) return item;
      // 只需要这几个元素就可以了
      return pick(item, ['key', 'ref', 'type', 'props']);
    });
  }
  function renderShape(component, children, animate) {
    var container = component.container,
      context = component.context,
      updater = component.updater,
      __lastElement = component.__lastElement,
      transformFrom = component.transformFrom,
      componentAnimate = component.animate;
    // 先清空绘制内容
    container.clear();
    animate = isBoolean(animate) ? animate : componentAnimate;
    var px2hd = context.px2hd;
    var lastElement = __lastElement || (transformFrom && transformFrom.__lastElement);
    // children 是 shape 的 jsx 结构, component.render() 返回的结构
    var shapeElement = renderJSXElement$1(children, context, updater);
    // @ts-ignore
    component.__lastElement = shapeElement;
    var renderElement =
      animate !== false ? compareElement(shapeElement, lastElement) : shapeElement;
    if (!renderElement) return null;
    // 生成G的节点树, 存在数组的情况是根节点有变化，之前的树删除，新的树创建
    if (isArray(renderElement)) {
      return renderElement.map(function (element) {
        return render(element, container, animate, px2hd);
      });
    } else {
      return render(renderElement, container, animate, px2hd);
    }
  }
  function setComponentAnimate(child, parent) {
    var parentAnimate = parent.animate;
    // 如果父组件不需要动画，子组件全不不执行动画
    if (parentAnimate === false) {
      child.animate = false;
      return;
    }
    var childProps = child.props;
    var childAnimate = childProps.animate;
    child.animate = isBoolean(childAnimate) ? childAnimate : parentAnimate;
  }
  function getTransformComponent(component) {
    if (!component) return null;
    // @ts-ignore
    var __lastElement = component.__lastElement,
      children = component.children;
    if (__lastElement) {
      return component;
    }
    if (!children) {
      return null;
    }
    var componentFromChildren = null;
    Children.map(children, function (item) {
      if (componentFromChildren) return;
      if (!item) return;
      var component = getTransformComponent(item.component);
      if (component) {
        componentFromChildren = component;
      }
    });
    return componentFromChildren;
  }
  function getTransformFromComponentRef(transformFromRef) {
    if (!transformFromRef || !transformFromRef.current) {
      return null;
    }
    var transformFromComponent = transformFromRef.current;
    return getTransformComponent(transformFromComponent);
  }
  function createComponent(parent, element) {
    var type = element.type,
      props = element.props,
      ref = element.ref;
    var container = parent.container,
      context = parent.context,
      updater = parent.updater,
      transformFrom = parent.transformFrom;
    var transformFromRef = props.transformFrom,
      receiveProps = _objectWithoutProperties(props, _excluded$2);
    var component;
    // @ts-ignore
    if (type.prototype && type.prototype.isF2Component) {
      // @ts-ignore
      component = new type(receiveProps, context, updater);
    } else {
      component = new Component(receiveProps, context, updater);
      component.render = function () {
        // @ts-ignore
        return type(this.props, context, updater);
      };
    }
    // 设置ref
    if (ref) {
      ref.current = component;
    }
    // 因为view 可能在子组件，所以这里要透传到子组件
    if (transformFrom) {
      // @ts-ignore
      component.transformFrom = transformFrom;
    }
    if (transformFromRef) {
      var transformFromComponent = transformFromRef
        ? getTransformFromComponentRef(transformFromRef)
        : null;
      // @ts-ignore
      component.transformFrom = transformFromComponent;
    }
    var zIndex = props.zIndex;
    // 每个组件都新建一个独立容器
    component.container = container.addGroup({
      zIndex: zIndex,
    });
    component.context = context;
    component.updater = updater;
    return component;
  }
  function renderComponent(component) {
    Children.map(component, function (item) {
      var lastChildren = item.children;
      var mount = isUndefined(lastChildren);
      if (mount) {
        if (item.willMount) item.willMount();
      } else if (item.willUpdate) {
        item.willUpdate();
      }
    });
    Children.map(component, function (item) {
      var lastChildren = item.children;
      var mount = isUndefined(lastChildren);
      var newChildren = item.render();
      renderChildren(item, newChildren, lastChildren);
      if (mount) {
        if (item.didMount) item.didMount();
      } else if (item.didUpdate) {
        item.didUpdate();
      }
    });
  }
  function destroyElement(elements) {
    Children.map(elements, function (element) {
      if (!element) return;
      var component = element.component;
      if (!component) {
        return;
      }
      if (component.willUnmount) {
        component.willUnmount();
      }
      destroyElement(component.children);
      var container = component.container;
      container.remove(true);
      if (component.didUnmount) {
        component.didUnmount();
      }
      component.destroy();
    });
  }
  function diffElement(parent, nextElement, lastElement) {
    if (!nextElement && !lastElement) {
      return null;
    }
    // 删除
    if (!nextElement && lastElement) {
      destroyElement(lastElement);
      return null;
    }
    // 新建
    if (nextElement && !lastElement) {
      return nextElement;
    }
    // diff
    var nextType = nextElement.type,
      nextProps = nextElement.props;
    var lastType = lastElement.type,
      lastProps = lastElement.props,
      lastComponent = lastElement.component;
    if (nextType !== lastType) {
      destroyElement(lastElement);
      return nextElement;
    }
    // 保留component， 等下一阶段处理
    nextElement.component = lastComponent;
    if (equal(nextProps, lastProps) && lastComponent.context === parent.context) {
      return null;
    }
    return nextElement;
  }
  function diff(parent, nextChildren, lastChildren) {
    // destroy
    // 生命周期的几个阶段
    // should create / update
    // create / Receive props
    // willMount / willUpdate
    // render
    // didMount / didUpdate
    var childrenArray = [];
    // 1. 第一轮比较， 直接destroy的元素处理掉，destroy 的元素不需要进入下一阶段
    Children.compare(nextChildren, lastChildren, function (next, last) {
      var element = diffElement(parent, next, last);
      if (element) {
        childrenArray = childrenArray.concat(Children.toArray(element).filter(Boolean));
      }
    });
    // 2. 处理 shouldCreate 和 shouldUpdate
    var shouldProcessChildren = childrenArray.filter(function (element) {
      var component = element.component,
        props = element.props;
      // 说明是新增的元素，需要新建
      if (!component) return true;
      // 不需要更新
      if (component.shouldUpdate && component.shouldUpdate(props) === false) {
        return false;
      }
      return true;
    });
    // 3. 处理 create 和 Receive props
    var shouldRenderComponent = shouldProcessChildren.map(function (element) {
      var component = element.component;
      if (!component) {
        component = createComponent(parent, element);
      } else {
        var props = element.props;
        if (component.willReceiveProps) {
          component.willReceiveProps(props, parent.context);
        }
        var zIndex = props.zIndex;
        component.container.set('zIndex', zIndex);
        component.props = props;
        component.context = parent.context;
      }
      element.component = component;
      setComponentAnimate(component, parent);
      return component;
    });
    // 4. 处理 render
    renderComponent(shouldRenderComponent);
    // 按子组件顺序渲染内容
    childrenArray.forEach(function (element) {
      var component = element.component;
      var parentGroup = parent.container;
      parentGroup.add(component.container);
    });
    return nextChildren;
  }
  function isContainer(children) {
    if (!children) return false;
    if (!isArray(children)) {
      var type = children.type;
      return typeof type === 'function';
    }
    for (var i = 0, len = children.length; i < len; i++) {
      if (isContainer(children[i])) {
        return true;
      }
    }
    return false;
  }
  function renderChildren(parent, nextChildren, lastChildren) {
    // react 生成的 element 是 not extensible 的，这里新建一个新对象，并把需要的内容pick 出来
    nextChildren = pickElement(nextChildren);
    parent.children = nextChildren;
    if (isContainer(nextChildren)) {
      nextChildren = diff(parent, nextChildren, lastChildren);
    } else {
      renderShape(parent, nextChildren);
    }
    return nextChildren;
  }

  var arrayWithHoles = createCommonjsModule(function (module) {
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    (module.exports = _arrayWithHoles),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var iterableToArrayLimit = createCommonjsModule(function (module) {
    function _iterableToArrayLimit(arr, i) {
      var _i =
        null == arr
          ? null
          : ('undefined' != typeof Symbol && arr[Symbol.iterator]) || arr['@@iterator'];
      if (null != _i) {
        var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;
        try {
          if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
            if (Object(_i) !== _i) return;
            _n = !1;
          } else
            for (
              ;
              !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i);
              _n = !0
            );
        } catch (err) {
          (_d = !0), (_e = err);
        } finally {
          try {
            if (!_n && null != _i['return'] && ((_r = _i['return']()), Object(_r) !== _r)) return;
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
    }
    (module.exports = _iterableToArrayLimit),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var arrayLikeToArray = createCommonjsModule(function (module) {
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    (module.exports = _arrayLikeToArray),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var unsupportedIterableToArray = createCommonjsModule(function (module) {
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === 'string') return arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === 'Object' && o.constructor) n = o.constructor.name;
      if (n === 'Map' || n === 'Set') return Array.from(o);
      if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return arrayLikeToArray(o, minLen);
    }
    (module.exports = _unsupportedIterableToArray),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var nonIterableRest = createCommonjsModule(function (module) {
    function _nonIterableRest() {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    }
    (module.exports = _nonIterableRest),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var slicedToArray = createCommonjsModule(function (module) {
    function _slicedToArray(arr, i) {
      return (
        arrayWithHoles(arr) ||
        iterableToArrayLimit(arr, i) ||
        unsupportedIterableToArray(arr, i) ||
        nonIterableRest()
      );
    }
    (module.exports = _slicedToArray),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _slicedToArray = /*@__PURE__*/ getDefaultExportFromCjs(slicedToArray);

  var Layout = /*#__PURE__*/ (function () {
    function Layout(layout) {
      _classCallCheck(this, Layout);
      this.left = 0;
      this.top = 0;
      this.width = 0;
      this.height = 0;
      this.update(layout);
    }
    _createClass(
      Layout,
      [
        {
          key: 'update',
          value: function update(layout) {
            mix(this, layout);
            var left = this.left,
              top = this.top,
              width = this.width,
              height = this.height;
            this.right = left + width;
            this.bottom = top + height;
            return this;
          },
        },
        {
          key: 'padding',
          value: function padding(style) {
            if (!style) {
              return this;
            }
            var _style$top = style.top,
              paddingTop = _style$top === void 0 ? 0 : _style$top,
              _style$right = style.right,
              paddingRight = _style$right === void 0 ? 0 : _style$right,
              _style$bottom = style.bottom,
              paddingBottom = _style$bottom === void 0 ? 0 : _style$bottom,
              _style$left = style.left,
              paddingLeft = _style$left === void 0 ? 0 : _style$left;
            var top = this.top,
              right = this.right,
              bottom = this.bottom,
              left = this.left;
            this.top = top + paddingTop;
            this.right = right - paddingRight;
            this.bottom = bottom - paddingBottom;
            this.left = left + paddingLeft;
            this.width = this.right - this.left;
            this.height = this.bottom - this.top;
            return this;
          },
        },
        {
          key: 'clone',
          value: function clone() {
            var left = this.left,
              top = this.top,
              width = this.width,
              height = this.height;
            return new Layout({
              left: left,
              top: top,
              width: width,
              height: height,
            });
          },
        },
      ],
      [
        {
          key: 'fromStyle',
          value: function fromStyle(style) {
            var left = style.left,
              top = style.top,
              width = style.width,
              height = style.height,
              padding = style.padding;
            var _padding = _slicedToArray(padding, 4),
              paddingTop = _padding[0],
              paddingRight = _padding[1],
              paddingBottom = _padding[2],
              paddingLeft = _padding[3];
            return new Layout({
              left: left + paddingLeft,
              top: top + paddingTop,
              width: width - paddingLeft - paddingRight,
              height: height - paddingTop - paddingBottom,
            });
          },
        },
      ]
    );
    return Layout;
  })();

  function createUpdater(canvas) {
    var setStateQueue = [];
    var renderQueue = [];
    var callbackQueue = [];
    function process() {
      var item;
      // let component;
      while ((item = setStateQueue.shift())) {
        var _item = item,
          state = _item.state,
          component = _item.component,
          callback = _item.callback;
        if (component.destroyed) {
          continue;
        }
        // 如果没有prevState，则将当前的state作为初始的prevState
        if (!component.prevState) {
          component.prevState = Object.assign({}, component.state);
        }
        // 如果stateChange是一个方法，也就是setState的第二种形式
        if (typeof state === 'function') {
          Object.assign(component.state, state(component.prevState, component.props));
        } else {
          // 如果stateChange是一个对象，则直接合并到setState中
          Object.assign(component.state, state);
        }
        component.prevState = component.state;
        if (typeof callback === 'function') {
          callbackQueue.push({
            callback: callback,
            component: component,
          });
        }
      }
      var renderComponents = [].concat(renderQueue);
      canvas.renderComponents(renderComponents);
      // callback queue
      commitRenderQueue();
      // 清空
      renderQueue.length = 0;
      callbackQueue.length = 0;
    }
    function enqueueSetState(component, state, callback) {
      if (setStateQueue.length === 0) {
        setTimeout(process, 0);
      }
      setStateQueue.push({
        component: component,
        state: state,
        callback: callback,
      });
      if (renderQueue.indexOf(component) < 0) {
        renderQueue.push(component);
      }
    }
    function commitRenderQueue() {
      for (var i = 0; i < callbackQueue.length; i++) {
        var _callbackQueue$i = callbackQueue[i],
          callback = _callbackQueue$i.callback,
          component = _callbackQueue$i.component;
        callback.call(component);
      }
    }
    var updater = {
      // isMounted: function(publicInstance) {
      //   return false;
      // },
      enqueueForceUpdate: enqueueSetState,
      // enqueueReplaceState: function(publicInstance, completeState) {
      // },
      enqueueSetState: enqueueSetState,
    };
    return updater;
  }

  var axis = {
    labelOffset: '15px',
    line: {
      stroke: '#E8E8E8',
      lineWidth: '1px',
    },
    label: {
      fill: '#808080',
      fontSize: '20px',
    },
    grid: {
      stroke: '#E8E8E8',
      lineWidth: '1px',
      lineDash: ['4px'],
    },
  };
  var guide = {
    line: {
      style: {
        stroke: '#a3a3a3',
        lineWidth: 1,
      },
      offsetX: 0,
      offsetY: 0,
    },
    text: {
      style: {
        fill: '#787878',
        // textAlign: 'center',
        textBaseline: 'middle',
      },
      offsetX: 0,
      offsetY: 0,
    },
    rect: {
      style: {
        fill: '#fafafa',
      },
    },
    arc: {
      style: {
        stroke: '#a3a3a3',
      },
    },
    html: {
      offsetX: 0,
      offsetY: 0,
      alignX: 'center',
      alignY: 'middle',
    },
    tag: {
      offsetX: 0,
      offsetY: 0,
      side: 4,
      background: {
        padding: 5,
        radius: 2,
        fill: '#1890FF',
      },
      textStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle',
      },
    },
    point: {
      offsetX: 0,
      offsetY: 0,
      style: {
        fill: '#fff',
        r: 3,
        lineWidth: 2,
        stroke: '#1890ff',
      },
    },
  };
  var chart = {
    padding: ['30px', '30px', '30px', '30px'],
  };
  var Theme = {
    fontFamily:
      '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif',
    pixelRatio: 1,
    padding: [0, 0, 0, 0],
    chart: chart,
    colors: [
      '#1890FF',
      '#2FC25B',
      '#FACC14',
      '#223273',
      '#8543E0',
      '#13C2C2',
      '#3436C7',
      '#F04864',
    ],
    shapes: {
      line: ['line', 'dash', 'smooth'],
      point: ['circle', 'hollowCircle', 'rect'],
      area: ['area', 'smooth'],
      interval: ['rect', 'pyramid', 'funnel'],
    },
    sizes: ['4px', '6px', '8px', '10px', '12px'],
    shape: {
      line: {
        default: {
          lineWidth: '4px',
          lineJoin: 'round',
          lineCap: 'round',
        },
        smooth: {
          smooth: true,
        },
        dash: {
          lineDash: ['8px', '8px'],
        },
      },
      point: {
        default: {
          size: '6px',
        },
        hollowCircle: {
          lineWidth: '2px',
        },
      },
      area: {
        default: {
          fillOpacity: 0.1,
        },
      },
      interval: {
        default: {},
      },
    },
    axis: axis,
    guide: guide,
  };

  var requestAnimationFrame$2 =
    (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' &&
    window.requestAnimationFrame
      ? window.requestAnimationFrame
      : function (fn) {
          return setTimeout(fn, 16);
        };
  var cancelAnimationFrame$1 =
    (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' &&
    window.cancelAnimationFrame
      ? window.cancelAnimationFrame
      : function (number) {
          return clearTimeout(number);
        };
  var clock =
    (typeof performance === 'undefined' ? 'undefined' : _typeof(performance)) === 'object' &&
    performance.now
      ? performance
      : Date;
  var Timeline$1 = /*#__PURE__*/ (function () {
    function Timeline() {
      _classCallCheck(this, Timeline);
      this.playing = false;
      // 暂停中
      this.paused = false;
      // 暂停的时间点
      this.pausedTime = 0;
    }
    _createClass(Timeline, [
      {
        key: 'play',
        value: function play(duration, onUpdate, onEnd) {
          var _this = this;
          if (duration <= 0) {
            onEnd();
            return;
          }
          // 上次动画未结束
          if (this.playing) {
            return;
          }
          // 记录 duration、onUpdate、onEnd
          this.duration = duration;
          this.onUpdate = onUpdate;
          this.onEnd = onEnd;
          var paused = this.paused,
            pausedTime = this.pausedTime;
          this.playing = true;
          var startTime = clock.now();
          // 如果当前正在暂停状态， 从暂停态继续播放
          if (paused && pausedTime) {
            startTime = startTime - pausedTime;
            this.paused = false;
            this.pausedTime = 0;
          }
          var play = function play() {
            var now = clock.now();
            var time = now - startTime;
            if (time >= duration) {
              onUpdate(duration);
              onEnd();
              _this.playing = false;
              return;
            }
            if (_this.paused) {
              onUpdate(time);
              _this.pausedTime = time;
              _this.playing = false;
              return;
            }
            onUpdate(time);
            _this.animationFrameNumber = requestAnimationFrame$2(play);
          };
          this.animationFrameNumber = requestAnimationFrame$2(play);
        },
      },
      {
        key: 'pause',
        value: function pause() {
          this.paused = true;
        },
      },
      {
        key: 'stop',
        value: function stop() {
          this.playing = false;
        },
      },
      {
        key: 'end',
        value: function end() {
          if (!this.playing) {
            return;
          }
          // 停掉动画
          this.abort();
          // 更新到最后一帧状态
          this.onUpdate(this.duration);
          this.onEnd();
        },
      },
      {
        key: 'abort',
        value: function abort() {
          if (!this.animationFrameNumber) {
            return;
          }
          cancelAnimationFrame$1(this.animationFrameNumber);
          this.playing = false;
          this.animationFrameNumber = null;
        },
      },
    ]);
    return Timeline;
  })();

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}
  var _darker = 0.7;
  var _brighter = 1 / _darker;
  var reI = '\\s*([+-]?\\d+)\\s*',
    reN = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
    reP = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp('^rgb\\(' + [reI, reI, reI] + '\\)$'),
    reRgbPercent = new RegExp('^rgb\\(' + [reP, reP, reP] + '\\)$'),
    reRgbaInteger = new RegExp('^rgba\\(' + [reI, reI, reI, reN] + '\\)$'),
    reRgbaPercent = new RegExp('^rgba\\(' + [reP, reP, reP, reN] + '\\)$'),
    reHslPercent = new RegExp('^hsl\\(' + [reN, reP, reP] + '\\)$'),
    reHslaPercent = new RegExp('^hsla\\(' + [reN, reP, reP, reN] + '\\)$');
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32,
  };
  define(Color, color, {
    copy: function copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb,
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format) {
    var m, l;
    format = (format + '').trim().toLowerCase();
    return (m = reHex.exec(format))
      ? ((l = m[1].length),
        (m = parseInt(m[1], 16)),
        l === 6
          ? rgbn(m) // #ff0000
          : l === 3
          ? new Rgb(
              ((m >> 8) & 0xf) | ((m >> 4) & 0xf0),
              ((m >> 4) & 0xf) | (m & 0xf0),
              ((m & 0xf) << 4) | (m & 0xf),
              1
            ) // #f00
          : l === 8
          ? rgba((m >> 24) & 0xff, (m >> 16) & 0xff, (m >> 8) & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4
          ? rgba(
              ((m >> 12) & 0xf) | ((m >> 8) & 0xf0),
              ((m >> 8) & 0xf) | ((m >> 4) & 0xf0),
              ((m >> 4) & 0xf) | (m & 0xf0),
              (((m & 0xf) << 4) | (m & 0xf)) / 0xff
            ) // #f000
          : null) // invalid hex
      : (m = reRgbInteger.exec(format))
      ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format))
      ? new Rgb((m[1] * 255) / 100, (m[2] * 255) / 100, (m[3] * 255) / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format))
      ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format))
      ? rgba((m[1] * 255) / 100, (m[2] * 255) / 100, (m[3] * 255) / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format))
      ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format))
      ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format)
      ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === 'transparent'
      ? new Rgb(NaN, NaN, NaN, 0)
      : null;
  }
  function rgbn(n) {
    return new Rgb((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff, 1);
  }
  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(
    Rgb,
    rgb,
    extend(Color, {
      brighter: function brighter(k) {
        k = k == null ? _brighter : Math.pow(_brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function darker(k) {
        k = k == null ? _darker : Math.pow(_darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function rgb() {
        return this;
      },
      displayable: function displayable() {
        return (
          -0.5 <= this.r &&
          this.r < 255.5 &&
          -0.5 <= this.g &&
          this.g < 255.5 &&
          -0.5 <= this.b &&
          this.b < 255.5 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      hex: rgb_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb,
    })
  );
  function rgb_formatHex() {
    return '#' + hex(this.r) + hex(this.g) + hex(this.b);
  }
  function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (
      (a === 1 ? 'rgb(' : 'rgba(') +
      Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
      ', ' +
      Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
      ', ' +
      Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
      (a === 1 ? ')' : ', ' + a + ')')
    );
  }
  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? '0' : '') + value.toString(16);
  }
  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define(
    Hsl,
    hsl,
    extend(Color, {
      brighter: function brighter(k) {
        k = k == null ? _brighter : Math.pow(_brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function darker(k) {
        k = k == null ? _darker : Math.pow(_darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function rgb() {
        var h = (this.h % 360) + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function displayable() {
        return (
          ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
          0 <= this.l &&
          this.l <= 1 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      formatHsl: function formatHsl() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (
          (a === 1 ? 'hsl(' : 'hsla(') +
          (this.h || 0) +
          ', ' +
          (this.s || 0) * 100 +
          '%, ' +
          (this.l || 0) * 100 +
          '%' +
          (a === 1 ? ')' : ', ' + a + ')')
        );
      },
    })
  );

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (
      (h < 60
        ? m1 + ((m2 - m1) * h) / 60
        : h < 180
        ? m2
        : h < 240
        ? m1 + ((m2 - m1) * (240 - h)) / 60
        : m1) * 255
    );
  }

  var constant = function (x) {
    return function () {
      return x;
    };
  };

  function linear(a, d) {
    return function (t) {
      return a + t * d;
    };
  }
  function exponential(a, b, y) {
    return (
      (a = Math.pow(a, y)),
      (b = Math.pow(b, y) - a),
      (y = 1 / y),
      function (t) {
        return Math.pow(a + t * b, y);
      }
    );
  }
  function gamma(y) {
    return (y = +y) === 1
      ? nogamma
      : function (a, b) {
          return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
        };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);
    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + '';
      };
    }
    rgb$1.gamma = rgbGamma;
    return rgb$1;
  })(1);

  function interpolateNumberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
    return function (t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }
  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;
    for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];
    return function (t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date();
    return (
      (a = +a),
      (b = +b),
      function (t) {
        return d.setTime(a * (1 - t) + b * t), d;
      }
    );
  }

  function interpolateNumber(a, b) {
    return (
      (a = +a),
      (b = +b),
      function (t) {
        return a * (1 - t) + b * t;
      }
    );
  }

  function interpolateObject(a, b) {
    var i = {},
      c = {},
      k;
    if (a === null || _typeof(a) !== 'object') a = {};
    if (b === null || _typeof(b) !== 'object') b = {};
    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }
    return function (t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, 'g');
  function zero(b) {
    return function () {
      return b;
    };
  }
  function one(b) {
    return function (t) {
      return b(t) + '';
    };
  }
  function string(a, b) {
    var bi = (reA.lastIndex = reB.lastIndex = 0),
      // scan index for next number in b
      am,
      // current match in a
      bm,
      // current match in b
      bs,
      // string preceding current number in b, if any
      i = -1,
      // index in s
      s = [],
      // string constants and placeholders
      q = []; // number interpolators

    // Coerce inputs to strings.
    (a = a + ''), (b = b + '');

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else {
        // interpolate non-matching numbers
        s[++i] = null;
        q.push({
          i: i,
          x: interpolateNumber(am, bm),
        });
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2
      ? q[0]
        ? one(q[0].x)
        : zero(b)
      : ((b = q.length),
        function (t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join('');
        });
  }

  function interpolate(a, b) {
    var t = _typeof(b),
      c;
    return b == null || t === 'boolean'
      ? constant(b)
      : (t === 'number'
          ? interpolateNumber
          : t === 'string'
          ? (c = color(b))
            ? ((b = c), interpolateRgb)
            : string
          : b instanceof color
          ? interpolateRgb
          : b instanceof Date
          ? date
          : isNumberArray(b)
          ? interpolateNumberArray
          : Array.isArray(b)
          ? genericArray
          : (typeof b.valueOf !== 'function' && typeof b.toString !== 'function') || isNaN(b)
          ? interpolateObject
          : interpolateNumber)(a, b);
  }

  function interpolateObjectArray(a, b) {
    var na = a ? a.length : 0;
    var nb = b ? b.length : 0;
    var maxLen = Math.max(nb, na);
    var c = new Array(maxLen);
    var x = new Array(maxLen);
    var i;
    // 将a、b长度补齐后再进行插值计算
    for (i = 0; i < maxLen; i++) {
      var ia = i < na ? (a || [])[i] : (a || [])[na - 1];
      var ib = i < nb ? (b || [])[i] : (b || [])[nb - 1];
      x[i] = interpolateObject(ia, ib);
    }
    return function (t) {
      // 清除补间的多余点
      if (t >= 1) {
        return b;
      }
      for (i = 0; i < maxLen; ++i) {
        c[i] = x[i](t);
      }
      return c;
    };
  }

  var interpolate$1 = function (a, b) {
    if (typeof b === 'string') {
      return interpolateRgb(a, b);
    }
    if (Array.isArray(b)) {
      if (typeof b[0] !== 'number') {
        // if (hasNaN(a[0])) {
        //   return interpolateObjectArray(b, b);
        // }
        return interpolateObjectArray(a, b);
      }
      return interpolateNumberArray(a, b);
    }
    // if (isNaN(a)) {
    //   return interpolateNumber(b, b);
    // }
    return interpolateNumber(a, b);
  };

  // https://github.com/tweenjs/tween.js
  function linear$1(k) {
    return k;
  }
  function quadraticIn(k) {
    return k * k;
  }
  function quadraticOut(k) {
    return k * (2 - k);
  }
  function quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  }
  function cubicIn(k) {
    return k * k * k;
  }
  function cubicOut(k) {
    return --k * k * k + 1;
  }
  function cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  }
  function quarticIn(k) {
    return k * k * k * k;
  }
  function quarticOut(k) {
    return 1 - k * k * k * k;
  }
  function quarticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
  }
  function quinticIn(k) {
    return k * k * k * k * k;
  }
  function quinticOut(k) {
    return --k * k * k * k * k + 1;
  }
  function quinticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }
  function exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }
  function exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }
  function elasticIn(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
  }
  function elasticOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    return a * Math.pow(2, -10 * k) * Math.sin(((k - s) * (2 * Math.PI)) / p) + 1;
  }
  function elasticInOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
    }
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p) * 0.5 + 1;
  }
  function backIn(k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }
  function backOut(k) {
    var s = 1.70158;
    return (k = k - 1) * k * ((s + 1) * k + s) + 1;
  }
  function backInOut(k) {
    var s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }
  function bounceIn(k) {
    return 1 - bounceOut(1 - k);
  }
  function bounceOut(k) {
    if ((k /= 1) < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    }
    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
  }
  function bounceInOut(k) {
    if (k < 0.5) {
      return bounceIn(k * 2) * 0.5;
    }
    return bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }

  var Easing = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    linear: linear$1,
    quadraticIn: quadraticIn,
    quadraticOut: quadraticOut,
    quadraticInOut: quadraticInOut,
    cubicIn: cubicIn,
    cubicOut: cubicOut,
    cubicInOut: cubicInOut,
    quarticIn: quarticIn,
    quarticOut: quarticOut,
    quarticInOut: quarticInOut,
    elasticIn: elasticIn,
    elasticOut: elasticOut,
    elasticInOut: elasticInOut,
    backIn: backIn,
    backOut: backOut,
    backInOut: backInOut,
    bounceIn: bounceIn,
    bounceOut: bounceOut,
    bounceInOut: bounceInOut,
    exponentialIn: exponentialIn,
    exponentialOut: exponentialOut,
    quinticIn: quinticIn,
    quinticOut: quinticOut,
    quinticInOut: quinticInOut,
  });

  var Animator = /*#__PURE__*/ (function () {
    function Animator(element, animation) {
      _classCallCheck(this, Animator);
      // 是否是裁剪动画
      this.isClip = false;
      this.end = false;
      this.element = element;
      this.animation = animation;
      var _animation$property = animation.property,
        property = _animation$property === void 0 ? [] : _animation$property,
        easing = animation.easing,
        duration = animation.duration,
        _animation$delay = animation.delay,
        delay = _animation$delay === void 0 ? 0 : _animation$delay,
        start = animation.start,
        end = animation.end,
        onFrame = animation.onFrame,
        isClip = animation.isClip;
      var interpolates = property.map(function (name) {
        if (isString(name)) {
          return interpolate$1(start[name], end[name]);
        }
        // @ts-ignore
        if (name.interpolate) {
          // @ts-ignore
          return name.interpolate(start, end);
        }
      });
      this.easing = typeof easing === 'function' ? easing : Easing[easing] || linear$1;
      this.property = property;
      this.interpolates = interpolates;
      this.duration = duration;
      this.delay = delay;
      this.onFrame = onFrame;
      this.totalDuration = duration + delay;
      this.isClip = isClip;
      // 更新到初始状态
      this.update(0, 0);
    }
    _createClass(Animator, [
      {
        key: 'to',
        value: function to(time) {
          var duration = this.duration,
            delay = this.delay,
            totalDuration = this.totalDuration,
            easing = this.easing,
            end = this.end;
          // 已结束
          if (end) {
            return;
          }
          // 未开始
          if (time <= delay || !duration) {
            return;
          }
          // 最大为1
          var t = time >= totalDuration ? 1 : (time - delay) / duration;
          this.update(easing(t), time);
          // 最后一帧
          if (t === 1) {
            this.onEnd();
          }
        },
      },
      {
        key: 'update',
        value: function update(t, time) {
          var element = this.element,
            interpolates = this.interpolates,
            property = this.property,
            onFrame = this.onFrame;
          var attrs = {};
          for (var i = property.length - 1; i >= 0; i--) {
            var name = property[i];
            if (isString(name)) {
              attrs[name] = interpolates[i](t);
            } else {
              // @ts-ignore
              attrs[name.name] = interpolates[i](t);
            }
          }
          if (onFrame) {
            attrs = _objectSpread(_objectSpread({}, attrs), this.onFrame(t, time));
          }
          element.attr(attrs);
        },
      },
      {
        key: 'onEnd',
        value: function onEnd() {
          var animation = this.animation,
            isClip = this.isClip,
            element = this.element;
          var onEnd = animation.onEnd;
          onEnd && onEnd.call(this);
          if (isClip) {
            // 如果是裁剪区动画，要移除裁剪区
            element.remove(true);
          }
          // 如果当前元素状态被标记为删除，等动画结束后直接删除
          if (element._attrs.status === ELEMENT_DELETE) {
            element.remove(true);
          }
          // 清空 不需要重复执行
          element.set('animation', null);
          this.end = true;
        },
      },
    ]);
    return Animator;
  })();

  // 遍历全部节点
  function eachElement(element, fn) {
    fn(element);
    var children = element.get('children');
    if (children && children.length) {
      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        eachElement(child, fn);
      }
    }
  }
  var Animation = /*#__PURE__*/ (function () {
    function Animation(canvas) {
      _classCallCheck(this, Animation);
      this.timeline = new Timeline$1();
      this.canvas = canvas;
    }
    _createClass(Animation, [
      {
        key: 'createAnimator',
        value: function createAnimator(element, animation) {
          var duration = animation.duration,
            property = animation.property,
            onFrame = animation.onFrame;
          // 校验关键参数
          if (!duration || ((!property || !property.length) && !onFrame)) {
            return;
          }
          return new Animator(element, animation);
        },
      },
      {
        key: 'play',
        value: function play(container, onAnimationEnd) {
          var _this = this;
          var canvas = this.canvas;
          var animators = [];
          var maxDuration = 0;
          var deleteElements = [];
          // 遍历整个树，找到全部需要动画的元素
          eachElement(container, function (element) {
            // TODO: status 需要提取状态
            var _element$_attrs = element._attrs,
              animation = _element$_attrs.animation,
              status = _element$_attrs.status;
            if (!animation) {
              if (status === ELEMENT_DELETE) {
                // element.remove(true);
                deleteElements.push(element);
              }
              return;
            }
            var animator = _this.createAnimator(element, animation);
            if (animator) {
              maxDuration = Math.max(maxDuration, animator.totalDuration);
              animators.push(animator);
            }
            var clip = animation.clip;
            // 如果有裁剪区动画，处理裁剪区动画
            if (clip) {
              clip.isClip = true;
              var clipElement = clip.element;
              var _animator = _this.createAnimator(clipElement, clip);
              if (_animator) {
                maxDuration = Math.max(maxDuration, _animator.totalDuration);
                element.attr('clip', clipElement);
                animators.push(_animator);
              }
            }
          });
          for (var i = 0, len = deleteElements.length; i < len; i++) {
            var element = deleteElements[i];
            var children = element._attrs.children;
            // 因为group的子元素也有可能有动画，所以这里先把叶子节点删除掉，等动画结束后，再把所有删除的元素删除掉
            if (!children || !children.length) {
              element.remove(true);
            }
          }
          // 开始播放动画
          this.timeline.play(
            maxDuration,
            function (time) {
              for (var _i = 0, _len = animators.length; _i < _len; _i++) {
                var animator = animators[_i];
                animator.to(time);
              }
              // 最后一帧放在end里统一draw， 避免重复draw
              if (time < maxDuration) {
                canvas.draw();
              }
            },
            function () {
              for (var _i2 = 0, _len2 = deleteElements.length; _i2 < _len2; _i2++) {
                var _element = deleteElements[_i2];
                _element.remove(true);
              }
              canvas.draw();
              onAnimationEnd && onAnimationEnd();
            }
          );
        },
        // 直接跳到动画最终态
      },
      {
        key: 'end',
        value: function end() {
          this.timeline.end();
        },
      },
      {
        key: 'abort',
        value: function abort() {
          this.timeline.abort();
        },
      },
    ]);
    return Animation;
  })();

  function measureText$2(canvas, px2hd) {
    return function (text, font) {
      var _ref = font || {},
        fontSize = _ref.fontSize,
        fontFamily = _ref.fontFamily,
        fontStyle = _ref.fontStyle,
        fontWeight = _ref.fontWeight,
        fontVariant = _ref.fontVariant;
      var shape = canvas.addShape('text', {
        attrs: {
          x: 0,
          y: 0,
          fontSize: px2hd(fontSize),
          fontFamily: fontFamily,
          fontStyle: fontStyle,
          fontWeight: fontWeight,
          fontVariant: fontVariant,
          text: text,
        },
      });
      var _shape$getBBox = shape.getBBox(),
        width = _shape$getBBox.width,
        height = _shape$getBBox.height;
      shape.remove(true);
      return {
        width: width,
        height: height,
      };
    };
  }
  // 顶层Canvas标签
  var Canvas$1 = /*#__PURE__*/ (function (_Component) {
    _inherits(Canvas, _Component);
    var _super = _createSuper(Canvas);
    function Canvas(props) {
      var _this;
      _classCallCheck(this, Canvas);
      _this = _super.call(this, props);
      var context = props.context,
        pixelRatio = props.pixelRatio,
        width = props.width,
        height = props.height,
        _props$animate = props.animate,
        animate = _props$animate === void 0 ? true : _props$animate,
        customPx2hd = props.px2hd,
        customTheme = props.theme,
        customStyle = props.style,
        createImage = props.createImage,
        landscape = props.landscape;
      var px2hd$1 = isFunction(customPx2hd) ? batch2hd(customPx2hd) : px2hd;
      var theme = px2hd$1(deepMix({}, Theme, customTheme));
      // 创建G的canvas
      var canvas = createCanvas({
        context: context,
        pixelRatio: pixelRatio,
        fontFamily: theme.fontFamily,
        width: width,
        height: height,
        createImage: createImage,
        landscape: landscape,
      });
      // 组件更新器
      var updater = createUpdater(_assertThisInitialized(_this));
      // 供全局使用的一些变量
      var componentContext = {
        root: _assertThisInitialized(_this),
        ctx: context,
        canvas: canvas,
        theme: theme,
        px2hd: px2hd$1,
        measureText: measureText$2(canvas, px2hd$1),
      };
      // 动画模块
      var animation = new Animation(canvas);
      canvas.on('afterdraw', function () {
        var onAfterDraw = _this.props.onAfterDraw;
        onAfterDraw && onAfterDraw();
      });
      _this.canvas = canvas;
      _this.container = canvas;
      _this.context = componentContext;
      _this.updater = updater;
      _this.animate = animate;
      _this.animation = animation;
      _this.theme = theme;
      _this._ee = new EventEmitter();
      _this.updateLayout(props);
      return _this;
    }
    _createClass(Canvas, [
      {
        key: 'renderComponents',
        value: function renderComponents(components) {
          if (!components || !components.length) {
            return;
          }
          renderComponent(components);
          this.draw();
        },
      },
      {
        key: 'update',
        value: function update(nextProps) {
          var props = this.props;
          if (equal(nextProps, props)) {
            return;
          }
          this.props = nextProps;
          this.render();
        },
      },
      {
        key: 'resize',
        value: function resize(width, height) {
          var _this$canvas$_attrs = this.canvas._attrs,
            canvasWidth = _this$canvas$_attrs.width,
            canvasHeight = _this$canvas$_attrs.height;
          this.canvas.changeSize(width || canvasWidth, height || canvasHeight);
          // this.canvas.clear();
          // this.children = null;
          this.updateLayout(
            _objectSpread(
              _objectSpread({}, this.props),
              {},
              {
                width: width,
                height: height,
              }
            )
          );
          this.render();
        },
      },
      {
        key: 'updateLayout',
        value: function updateLayout(props) {
          var _this$canvas$_attrs2 = this.canvas._attrs,
            canvasWidth = _this$canvas$_attrs2.width,
            canvasHeight = _this$canvas$_attrs2.height;
          var style = this.context.px2hd(
            _objectSpread(
              {
                left: 0,
                top: 0,
                width: (props === null || props === void 0 ? void 0 : props.width) || canvasWidth,
                height:
                  (props === null || props === void 0 ? void 0 : props.height) || canvasHeight,
                padding: this.theme.padding,
              },
              props.style
            )
          );
          this.layout = Layout.fromStyle(style);
          this.context = _objectSpread(
            _objectSpread({}, this.context),
            {},
            {
              left: this.layout.left,
              top: this.layout.top,
              width: this.layout.width,
              height: this.layout.height,
            }
          );
        },
      },
      {
        key: 'draw',
        value: function draw() {
          var canvas = this.canvas,
            animate = this.animate;
          if (animate === false) {
            canvas.draw();
            return;
          }
          this.play();
        },
      },
      {
        key: 'play',
        value: function play() {
          var _this2 = this;
          var canvas = this.canvas,
            animation = this.animation;
          // 执行动画
          animation.abort();
          animation.play(canvas, function () {
            _this2.emit('animationEnd');
          });
        },
      },
      {
        key: 'render',
        value: function render() {
          var lastChildren = this.children,
            props = this.props;
          var nextChildren = props.children;
          renderChildren(this, nextChildren, lastChildren);
          this.draw();
          return null;
        },
      },
      {
        key: 'destroy',
        value: function destroy() {
          var canvas = this.canvas,
            children = this.children;
          destroyElement(children);
          canvas.destroy();
        },
      },
      {
        key: 'on',
        value: function on(type, listener) {
          this._ee.on(type, listener);
        },
      },
      {
        key: 'emit',
        value: function emit(type, event) {
          this._ee.emit(type, event);
        },
      },
      {
        key: 'off',
        value: function off(type, listener) {
          this._ee.off(type, listener);
        },
      },
    ]);
    return Canvas;
  })(Component);

  var LayoutController = /*#__PURE__*/ (function () {
    function LayoutController() {
      _classCallCheck(this, LayoutController);
    }
    _createClass(LayoutController, [
      {
        key: 'getRectRange',
        value: function getRectRange(style) {
          var left = style.left,
            top = style.top,
            width = style.width,
            height = style.height,
            padding = style.padding;
          var _padding = _slicedToArray(padding, 4),
            paddingTop = _padding[0],
            paddingRight = _padding[1],
            paddingBottom = _padding[2],
            paddingLeft = _padding[3];
          return {
            left: left + paddingLeft,
            top: top + paddingTop,
            width: width - paddingLeft - paddingRight,
            height: height - paddingTop - paddingBottom,
          };
        },
      },
      {
        key: 'create',
        value: function create(style) {
          var rectRange = this.getRectRange(style);
          var layout = new Layout(rectRange);
          this.layout = layout;
          return layout;
        },
      },
      {
        key: 'update',
        value: function update(style) {
          var rectRange = this.getRectRange(style);
          var layout = this.layout;
          layout.update(rectRange);
          return layout;
        },
      },
    ]);
    return LayoutController;
  })();

  var superPropBase = createCommonjsModule(function (module) {
    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = getPrototypeOf(object);
        if (object === null) break;
      }
      return object;
    }
    (module.exports = _superPropBase),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var get$1 = createCommonjsModule(function (module) {
    function _get() {
      if (typeof Reflect !== 'undefined' && Reflect.get) {
        (module.exports = _get = Reflect.get.bind()),
          (module.exports.__esModule = true),
          (module.exports['default'] = module.exports);
      } else {
        (module.exports = _get =
          function _get(target, property, receiver) {
            var base = superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
              return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
          }),
          (module.exports.__esModule = true),
          (module.exports['default'] = module.exports);
      }
      return _get.apply(this, arguments);
    }
    (module.exports = _get),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _get$1 = /*@__PURE__*/ getDefaultExportFromCjs(get$1);

  function transposedRect(_ref) {
    var xMin = _ref.xMin,
      xMax = _ref.xMax,
      yMin = _ref.yMin,
      yMax = _ref.yMax;
    return {
      xMin: yMin,
      xMax: yMax,
      yMin: xMin,
      yMax: xMax,
    };
  }
  function _convertRect(_ref2) {
    var x = _ref2.x,
      y = _ref2.y,
      size = _ref2.size,
      y0 = _ref2.y0;
    var xMin;
    var xMax;
    if (isArray(x)) {
      xMin = x[0];
      xMax = x[1];
    } else {
      xMin = x - size / 2;
      xMax = x + size / 2;
    }
    var yMin;
    var yMax;
    if (isArray(y)) {
      yMin = y[0];
      yMax = y[1];
    } else {
      yMin = Math.min(y0, y);
      yMax = Math.max(y0, y);
    }
    return {
      xMin: xMin,
      xMax: xMax,
      yMin: yMin,
      yMax: yMax,
    };
  }
  /**
   * 直角坐标系
   * convert相关的方法，涉及将标准坐标系映射到实际坐标系内
   * transform相关的方法，是仅将某一种关键点转换成另一种关键点 (比如将x/y/size/y0转换成yMin/yMax/..)
   */
  var Base = /*#__PURE__*/ (function (_Layout) {
    _inherits(Base, _Layout);
    var _super = _createSuper(Base);
    function Base(option) {
      var _this;
      _classCallCheck(this, Base);
      _this = _super.call(this, option);
      // x y 调换
      _this.transposed = false;
      // x，y 的值域，在极坐标中对应的就是弧度和半径
      _this.x = [0, 1];
      _this.y = [0, 1];
      _this.update(option);
      return _this;
    }
    _createClass(Base, [
      {
        key: 'update',
        value: function update(option) {
          _get$1(_getPrototypeOf(Base.prototype), 'update', this).call(this, option);
          var left = this.left,
            top = this.top,
            width = this.width,
            height = this.height;
          var center = option.center;
          var coordCenter = center
            ? isFunction(center)
              ? center(width, height)
              : center
            : [width / 2, height / 2];
          this.center = {
            x: left + coordCenter[0],
            y: top + coordCenter[1],
          };
          return this;
        },
        // 是循环， 比如极坐标是以 2π 循环的
      },
      {
        key: 'isCyclic',
        value: function isCyclic() {
          return false;
        },
      },
      {
        key: '_zoomVal',
        value: function _zoomVal(val, func) {
          return isArray(val)
            ? val.map(function (v) {
                return func(v);
              })
            : func(val);
        },
        /**
         * 把归一后的值映射到对应的定义域
         * @param point
         */
      },
      {
        key: 'convert',
        value: function convert(point) {
          var transposed = this.transposed,
            x = this.x,
            y = this.y;
          var xDim = transposed ? 'y' : 'x';
          var yDim = transposed ? 'x' : 'y';
          var pointX = point[xDim];
          var pointY = point[yDim];
          // 超出边界不绘制
          if (pointX < 0 || pointX > 1 || pointY < 0 || pointY > 1) {
            return {
              x: NaN,
              y: NaN,
            };
          }
          return {
            x: this._zoomVal(point[xDim], function (v) {
              return x[0] + (x[1] - x[0]) * v;
            }),
            y: this._zoomVal(point[yDim], function (v) {
              return y[0] + (y[1] - y[0]) * v;
            }),
          };
        },
        /**
         * convert 的反处理，把定义域的值，反处理到归一的值
         */
      },
      {
        key: 'invert',
        value: function invert(point) {
          var _ref3;
          var transposed = this.transposed,
            x = this.x,
            y = this.y;
          var xDim = transposed ? 'y' : 'x';
          var yDim = transposed ? 'x' : 'y';
          return (
            (_ref3 = {}),
            _defineProperty(
              _ref3,
              xDim,
              this._zoomVal(point.x, function (v) {
                return (v - x[0]) / (x[1] - x[0]);
              })
            ),
            _defineProperty(
              _ref3,
              yDim,
              this._zoomVal(point.y, function (v) {
                return (v - y[0]) / (y[1] - y[0]);
              })
            ),
            _ref3
          );
        },
        /**
         * 把归一化的值映射到 canvas 的坐标点
         * @param point
         * @returns
         */
      },
      {
        key: 'convertPoint',
        value: function convertPoint(point) {
          return this.convert(point);
        },
        /**
         * 把canvas坐标的点位映射回归一的值
         */
      },
      {
        key: 'invertPoint',
        value: function invertPoint(point) {
          return this.invert(point);
        },
        // 将标准坐标系下的矩形绘制关键点映射成实际绘制的坐标点
      },
      {
        key: 'convertRect',
        value: function convertRect(rectPoint) {
          var xRange = this.x,
            yRange = this.y,
            transposed = this.transposed;
          var _xRange = _slicedToArray(xRange, 2),
            xStart = _xRange[0],
            xEnd = _xRange[1];
          var _yRange = _slicedToArray(yRange, 2),
            yStart = _yRange[0],
            yEnd = _yRange[1];
          var rect = _convertRect(rectPoint);
          var _ref4 = transposed ? transposedRect(rect) : rect,
            xMin = _ref4.xMin,
            xMax = _ref4.xMax,
            yMin = _ref4.yMin,
            yMax = _ref4.yMax;
          var x0 = xStart + (xEnd - xStart) * xMin;
          var x1 = xStart + (xEnd - xStart) * xMax;
          var y0 = yStart + (yEnd - yStart) * yMin;
          var y1 = yStart + (yEnd - yStart) * yMax;
          return {
            xMin: Math.min(x0, x1),
            xMax: Math.max(x0, x1),
            yMin: Math.min(y0, y1),
            yMax: Math.max(y0, y1),
          };
        },
        // 将已经映射好的矩形绘制关键点转换成实际绘制的坐标点
      },
      {
        key: 'transformToRect',
        value: function transformToRect(rectPoint) {
          var x = rectPoint.x,
            y = rectPoint.y,
            y0 = rectPoint.y0,
            size = rectPoint.size;
          var coordOrigin = this.convertPoint({
            x: 0,
            y: y0,
          });
          var transposed = this.transposed;
          var _rectPoint = {
            size: size,
            x: transposed ? y : x,
            y: transposed ? x : y,
            y0: transposed ? coordOrigin.x : coordOrigin.y,
          };
          var rect = _convertRect(_rectPoint);
          var _ref5 = transposed ? transposedRect(rect) : rect,
            xMin = _ref5.xMin,
            xMax = _ref5.xMax,
            yMin = _ref5.yMin,
            yMax = _ref5.yMax;
          return {
            xMin: xMin,
            xMax: xMax,
            yMin: yMin,
            yMax: yMax,
          };
        },
      },
    ]);
    return Base;
  })(Layout);

  var Rect$2 = /*#__PURE__*/ (function (_Base) {
    _inherits(Rect, _Base);
    var _super = _createSuper(Rect);
    function Rect() {
      var _this;
      _classCallCheck(this, Rect);
      _this = _super.apply(this, arguments);
      _this.type = 'rect';
      return _this;
    }
    _createClass(Rect, [
      {
        key: 'update',
        value: function update(option) {
          _get$1(_getPrototypeOf(Rect.prototype), 'update', this).call(this, option);
          var left = this.left,
            top = this.top,
            right = this.right,
            bottom = this.bottom;
          var x = [left, right];
          var y = [bottom, top];
          this.x = x;
          this.y = y;
          return this;
        },
      },
    ]);
    return Rect;
  })(Base);

  var Polar = /*#__PURE__*/ (function (_Base) {
    _inherits(Polar, _Base);
    var _super = _createSuper(Polar);
    function Polar() {
      var _this;
      _classCallCheck(this, Polar);
      _this = _super.apply(this, arguments);
      _this.type = 'polar';
      _this.isPolar = true;
      return _this;
    }
    _createClass(Polar, [
      {
        key: 'update',
        value: function update(option) {
          _get$1(_getPrototypeOf(Polar.prototype), 'update', this).call(this, option);
          if (!this.option) {
            this.option = option;
          }
          var _this$option = this.option,
            _this$option$radius = _this$option.radius,
            radiusRatio = _this$option$radius === void 0 ? 1 : _this$option$radius,
            _this$option$innerRad = _this$option.innerRadius,
            innerRadiusRatio = _this$option$innerRad === void 0 ? 0 : _this$option$innerRad;
          var width = this.width,
            height = this.height,
            _this$startAngle = this.startAngle,
            startAngle = _this$startAngle === void 0 ? -Math.PI / 2 : _this$startAngle,
            _this$endAngle = this.endAngle,
            endAngle = _this$endAngle === void 0 ? (Math.PI * 3) / 2 : _this$endAngle;
          // 半径取宽高的最小值
          var radius = radiusRatio * (Math.min(width, height) / 2);
          // 极坐标下 x 表示弧度， y 代表 半径
          var x = [startAngle, endAngle];
          var y = [innerRadiusRatio * radius, radius];
          this.x = x;
          this.y = y;
          this.startAngle = startAngle;
          this.endAngle = endAngle;
          this.radius = radius;
          this.innnerRadius = innerRadiusRatio * radius;
          return this;
        },
      },
      {
        key: 'isCyclic',
        value: function isCyclic() {
          var startAngle = this.startAngle,
            endAngle = this.endAngle;
          if (endAngle - startAngle < Math.PI * 2) {
            return false;
          }
          return true;
        },
      },
      {
        key: 'convertPoint',
        value: function convertPoint(point) {
          var center = this.center,
            transposed = this.transposed,
            x = this.x,
            y = this.y;
          var xDim = transposed ? 'y' : 'x';
          var yDim = transposed ? 'x' : 'y';
          var _x = _slicedToArray(x, 2),
            xStart = _x[0],
            xEnd = _x[1];
          var _y = _slicedToArray(y, 2),
            yStart = _y[0],
            yEnd = _y[1];
          var angle = xStart + (xEnd - xStart) * point[xDim];
          var radius = yStart + (yEnd - yStart) * point[yDim];
          return {
            x: center.x + Math.cos(angle) * radius,
            y: center.y + Math.sin(angle) * radius,
          };
        },
      },
      {
        key: 'invertPoint',
        value: function invertPoint(point) {
          var center = this.center,
            transposed = this.transposed,
            x = this.x,
            y = this.y;
          var xDim = transposed ? 'y' : 'x';
          var yDim = transposed ? 'x' : 'y';
          var _x2 = _slicedToArray(x, 2),
            xStart = _x2[0],
            xEnd = _x2[1];
          var _y2 = _slicedToArray(y, 2),
            yStart = _y2[0],
            yEnd = _y2[1];
          var m = [1, 0, 0, 1, 0, 0];
          Matrix.rotate(m, m, xStart);
          var startV = [1, 0];
          Vector2.transformMat2d(startV, startV, m);
          startV = [startV[0], startV[1]];
          var pointV = [point.x - center.x, point.y - center.y];
          if (Vector2.zero(pointV)) {
            return {
              x: 0,
              y: 0,
            };
          }
          var theta = Vector2.angleTo(startV, pointV, xEnd < xStart);
          if (Math.abs(theta - Math.PI * 2) < 0.001) {
            theta = 0;
          }
          var l = Vector2.length(pointV);
          var percentX = theta / (xEnd - xStart);
          percentX = xEnd - xStart > 0 ? percentX : -percentX;
          var percentY = (l - yStart) / (yEnd - yStart);
          var rst = {};
          rst[xDim] = percentX;
          rst[yDim] = percentY;
          return rst;
        },
      },
    ]);
    return Polar;
  })(Base);

  var coordMap = {
    rect: Rect$2,
    polar: Polar,
  };
  var coordController = /*#__PURE__*/ (function () {
    function coordController() {
      _classCallCheck(this, coordController);
    }
    _createClass(coordController, [
      {
        key: 'getOption',
        value: function getOption(cfg) {
          if (isString(cfg)) {
            return {
              type: coordMap[cfg] || Rect$2,
            };
          }
          if (isFunction(cfg)) {
            return {
              type: cfg,
            };
          }
          var _ref = cfg || {},
            type = _ref.type;
          return _objectSpread(
            _objectSpread({}, cfg),
            {},
            {
              // 默认直角坐标系
              type: isFunction(type) ? type : coordMap[type] || Rect$2,
            }
          );
        },
      },
      {
        key: 'create',
        value: function create(cfg, layout) {
          var option = this.getOption(cfg);
          var type = option.type;
          var coord = new type(_objectSpread(_objectSpread({}, option), layout));
          this.coord = coord;
          return coord;
        },
      },
      {
        key: 'updateLayout',
        value: function updateLayout(layout) {
          this.coord.update(layout);
        },
      },
      {
        key: 'update',
        value: function update() {},
      },
    ]);
    return coordController;
  })();

  var methodCache = {};
  /**
   * 获取计算 ticks 的方法
   * @param key 键值
   * @returns 计算 ticks 的方法
   */
  function getTickMethod(key) {
    return methodCache[key];
  }
  /**
   * 注册计算 ticks 的方法
   * @param key 键值
   * @param method 方法
   */
  function registerTickMethod(key, method) {
    methodCache[key] = method;
  }

  var Scale = /** @class */ (function () {
    function Scale(cfg) {
      /**
       * 度量的类型
       */
      this.type = 'base';
      /**
       * 是否分类类型的度量
       */
      this.isCategory = false;
      /**
       * 是否线性度量，有linear, time 度量
       */
      this.isLinear = false;
      /**
       * 是否连续类型的度量，linear,time,log, pow, quantile, quantize 都支持
       */
      this.isContinuous = false;
      /**
       * 是否是常量的度量，传入和传出一致
       */
      this.isIdentity = false;
      this.values = [];
      this.range = [0, 1];
      this.ticks = [];
      this.__cfg__ = cfg;
      this.initCfg();
      this.init();
    }
    // 对于原始值的必要转换，如分类、时间字段需转换成数值，用transform/map命名可能更好
    Scale.prototype.translate = function (v) {
      return v;
    };
    /** 重新初始化 */
    Scale.prototype.change = function (cfg) {
      // 覆盖配置项，而不替代
      mix(this.__cfg__, cfg);
      this.init();
    };
    Scale.prototype.clone = function () {
      return this.constructor(this.__cfg__);
    };
    /** 获取坐标轴需要的ticks */
    Scale.prototype.getTicks = function () {
      var _this = this;
      return map(this.ticks, function (tick, idx) {
        if (isObject(tick)) {
          // 仅当符合Tick类型时才有意义
          return tick;
        }
        return {
          text: _this.getText(tick, idx),
          tickValue: tick,
          value: _this.scale(tick),
        };
      });
    };
    /** 获取Tick的格式化结果 */
    Scale.prototype.getText = function (value, key) {
      var formatter = this.formatter;
      var res = formatter ? formatter(value, key) : value;
      if (isNil(res) || !isFunction(res.toString)) {
        return '';
      }
      return res.toString();
    };
    // 获取配置项中的值，当前 scale 上的值可能会被修改
    Scale.prototype.getConfig = function (key) {
      return this.__cfg__[key];
    };
    // scale初始化
    Scale.prototype.init = function () {
      mix(this, this.__cfg__);
      this.setDomain();
      if (isEmpty(this.getConfig('ticks'))) {
        this.ticks = this.calculateTicks();
      }
    };
    // 子类上覆盖某些属性，不能直接在类上声明，否则会被覆盖
    Scale.prototype.initCfg = function () {};
    Scale.prototype.setDomain = function () {};
    Scale.prototype.calculateTicks = function () {
      var tickMethod = this.tickMethod;
      var ticks = [];
      if (isString(tickMethod)) {
        var method = getTickMethod(tickMethod);
        if (!method) {
          throw new Error('There is no method to to calculate ticks!');
        }
        ticks = method(this);
      } else if (isFunction(tickMethod)) {
        ticks = tickMethod(this);
      }
      return ticks;
    };
    // range 的最小值
    Scale.prototype.rangeMin = function () {
      return this.range[0];
    };
    // range 的最大值
    Scale.prototype.rangeMax = function () {
      return this.range[1];
    };
    /** 定义域转 0~1 */
    Scale.prototype.calcPercent = function (value, min, max) {
      if (isNumber(value)) {
        return (value - min) / (max - min);
      }
      return NaN;
    };
    /** 0~1转定义域 */
    Scale.prototype.calcValue = function (percent, min, max) {
      return min + percent * (max - min);
    };
    return Scale;
  })();

  /**
   * 分类度量
   * @class
   */
  var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'cat';
      _this.isCategory = true;
      return _this;
    }
    Category.prototype.buildIndexMap = function () {
      if (!this.translateIndexMap) {
        this.translateIndexMap = new Map();
        // 重新构建缓存
        for (var i = 0; i < this.values.length; i++) {
          this.translateIndexMap.set(this.values[i], i);
        }
      }
    };
    Category.prototype.translate = function (value) {
      // 按需构建 map
      this.buildIndexMap();
      // 找得到
      var idx = this.translateIndexMap.get(value);
      if (idx === undefined) {
        idx = isNumber(value) ? value : NaN;
      }
      return idx;
    };
    Category.prototype.scale = function (value) {
      var order = this.translate(value);
      // 分类数据允许 0.5 范围内调整
      // if (order < this.min - 0.5 || order > this.max + 0.5) {
      //   return NaN;
      // }
      var percent = this.calcPercent(order, this.min, this.max);
      return this.calcValue(percent, this.rangeMin(), this.rangeMax());
    };
    Category.prototype.invert = function (scaledValue) {
      var domainRange = this.max - this.min;
      var percent = this.calcPercent(scaledValue, this.rangeMin(), this.rangeMax());
      var idx = Math.round(domainRange * percent) + this.min;
      if (idx < this.min || idx > this.max) {
        return NaN;
      }
      return this.values[idx];
    };
    Category.prototype.getText = function (value) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var v = value;
      // value为index
      if (isNumber(value) && !this.values.includes(value)) {
        v = this.values[v];
      }
      return _super.prototype.getText.apply(this, __spreadArrays([v], args));
    };
    // 复写属性
    Category.prototype.initCfg = function () {
      this.tickMethod = 'cat';
    };
    // 设置 min, max
    Category.prototype.setDomain = function () {
      // 用户有可能设置 min
      if (isNil(this.getConfig('min'))) {
        this.min = 0;
      }
      if (isNil(this.getConfig('max'))) {
        var size = this.values.length;
        this.max = size > 1 ? size - 1 : size;
      }
      // scale.init 的时候清除缓存
      if (this.translateIndexMap) {
        this.translateIndexMap = undefined;
      }
    };
    return Category;
  })(Scale);

  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
  var twoDigitsOptional = '\\d\\d?';
  var twoDigits = '\\d\\d';
  var threeDigits = '\\d{3}';
  var fourDigits = '\\d{4}';
  var word = '[^\\s]+';
  var literal = /\[([^]*?)\]/gm;
  function shorten(arr, sLen) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen));
    }
    return newArr;
  }
  var monthUpdate = function (arrName) {
    return function (v, i18n) {
      var lowerCaseArr = i18n[arrName].map(function (v) {
        return v.toLowerCase();
      });
      var index = lowerCaseArr.indexOf(v.toLowerCase());
      if (index > -1) {
        return index;
      }
      return null;
    };
  };
  function assign(origObj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
      var obj = args_1[_a];
      for (var key in obj) {
        // @ts-ignore ex
        origObj[key] = obj[key];
      }
    }
    return origObj;
  }
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var monthNamesShort = shorten(monthNames, 3);
  var dayNamesShort = shorten(dayNames, 3);
  var defaultI18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ['am', 'pm'],
    DoFn: function (dayOfMonth) {
      return (
        dayOfMonth +
        ['th', 'st', 'nd', 'rd'][
          dayOfMonth % 10 > 3
            ? 0
            : ((dayOfMonth - (dayOfMonth % 10) !== 10 ? 1 : 0) * dayOfMonth) % 10
        ]
      );
    },
  };
  var globalI18n = assign({}, defaultI18n);
  var setGlobalDateI18n = function (i18n) {
    return (globalI18n = assign(globalI18n, i18n));
  };
  var regexEscape = function (str) {
    return str.replace(/[|\\{()[^$+*?.-]/g, '\\$&');
  };
  var pad = function (val, len) {
    if (len === void 0) {
      len = 2;
    }
    val = String(val);
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  };
  var formatFlags = {
    D: function (dateObj) {
      return String(dateObj.getDate());
    },
    DD: function (dateObj) {
      return pad(dateObj.getDate());
    },
    Do: function (dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate());
    },
    d: function (dateObj) {
      return String(dateObj.getDay());
    },
    dd: function (dateObj) {
      return pad(dateObj.getDay());
    },
    ddd: function (dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function (dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()];
    },
    M: function (dateObj) {
      return String(dateObj.getMonth() + 1);
    },
    MM: function (dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    MMM: function (dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function (dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function (dateObj) {
      return pad(String(dateObj.getFullYear()), 4).substr(2);
    },
    YYYY: function (dateObj) {
      return pad(dateObj.getFullYear(), 4);
    },
    h: function (dateObj) {
      return String(dateObj.getHours() % 12 || 12);
    },
    hh: function (dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function (dateObj) {
      return String(dateObj.getHours());
    },
    HH: function (dateObj) {
      return pad(dateObj.getHours());
    },
    m: function (dateObj) {
      return String(dateObj.getMinutes());
    },
    mm: function (dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function (dateObj) {
      return String(dateObj.getSeconds());
    },
    ss: function (dateObj) {
      return pad(dateObj.getSeconds());
    },
    S: function (dateObj) {
      return String(Math.round(dateObj.getMilliseconds() / 100));
    },
    SS: function (dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function (dateObj) {
      return pad(dateObj.getMilliseconds(), 3);
    },
    a: function (dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function (dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function (dateObj) {
      var offset = dateObj.getTimezoneOffset();
      return (
        (offset > 0 ? '-' : '+') +
        pad(Math.floor(Math.abs(offset) / 60) * 100 + (Math.abs(offset) % 60), 4)
      );
    },
    Z: function (dateObj) {
      var offset = dateObj.getTimezoneOffset();
      return (
        (offset > 0 ? '-' : '+') +
        pad(Math.floor(Math.abs(offset) / 60), 2) +
        ':' +
        pad(Math.abs(offset) % 60, 2)
      );
    },
  };
  var monthParse = function (v) {
    return +v - 1;
  };
  var emptyDigits = [null, twoDigitsOptional];
  var emptyWord = [null, word];
  var amPm = [
    'isPm',
    word,
    function (v, i18n) {
      var val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        return 0;
      } else if (val === i18n.amPm[1]) {
        return 1;
      }
      return null;
    },
  ];
  var timezoneOffset = [
    'timezoneOffset',
    '[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?',
    function (v) {
      var parts = (v + '').match(/([+-]|\d\d)/gi);
      if (parts) {
        var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
        return parts[0] === '+' ? minutes : -minutes;
      }
      return 0;
    },
  ];
  var parseFlags = {
    D: ['day', twoDigitsOptional],
    DD: ['day', twoDigits],
    Do: [
      'day',
      twoDigitsOptional + word,
      function (v) {
        return parseInt(v, 10);
      },
    ],
    M: ['month', twoDigitsOptional, monthParse],
    MM: ['month', twoDigits, monthParse],
    YY: [
      'year',
      twoDigits,
      function (v) {
        var now = new Date();
        var cent = +('' + now.getFullYear()).substr(0, 2);
        return +('' + (+v > 68 ? cent - 1 : cent) + v);
      },
    ],
    h: ['hour', twoDigitsOptional, undefined, 'isPm'],
    hh: ['hour', twoDigits, undefined, 'isPm'],
    H: ['hour', twoDigitsOptional],
    HH: ['hour', twoDigits],
    m: ['minute', twoDigitsOptional],
    mm: ['minute', twoDigits],
    s: ['second', twoDigitsOptional],
    ss: ['second', twoDigits],
    YYYY: ['year', fourDigits],
    S: [
      'millisecond',
      '\\d',
      function (v) {
        return +v * 100;
      },
    ],
    SS: [
      'millisecond',
      twoDigits,
      function (v) {
        return +v * 10;
      },
    ],
    SSS: ['millisecond', threeDigits],
    d: emptyDigits,
    dd: emptyDigits,
    ddd: emptyWord,
    dddd: emptyWord,
    MMM: ['month', word, monthUpdate('monthNamesShort')],
    MMMM: ['month', word, monthUpdate('monthNames')],
    a: amPm,
    A: amPm,
    ZZ: timezoneOffset,
    Z: timezoneOffset,
  };
  // Some common format strings
  var globalMasks = {
    default: 'ddd MMM DD YYYY HH:mm:ss',
    shortDate: 'M/D/YY',
    mediumDate: 'MMM D, YYYY',
    longDate: 'MMMM D, YYYY',
    fullDate: 'dddd, MMMM D, YYYY',
    isoDate: 'YYYY-MM-DD',
    isoDateTime: 'YYYY-MM-DDTHH:mm:ssZ',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS',
  };
  var setGlobalDateMasks = function (masks) {
    return assign(globalMasks, masks);
  };
  /***
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
   * @returns {string} Formatted date string
   */
  var format = function (dateObj, mask, i18n) {
    if (mask === void 0) {
      mask = globalMasks['default'];
    }
    if (i18n === void 0) {
      i18n = {};
    }
    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj);
    }
    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
      throw new Error('Invalid Date pass to format');
    }
    mask = globalMasks[mask] || mask;
    var literals = [];
    // Make literals inactive by replacing them with @@@
    mask = mask.replace(literal, function ($0, $1) {
      literals.push($1);
      return '@@@';
    });
    var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
    // Apply formatting rules
    mask = mask.replace(token, function ($0) {
      return formatFlags[$0](dateObj, combinedI18nSettings);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/@@@/g, function () {
      return literals.shift();
    });
  };
  /**
   * Parse a date string into a Javascript Date object /
   * @method parse
   * @param {string} dateStr Date string
   * @param {string} format Date parse format
   * @param {i18n} I18nSettingsOptional Full or subset of I18N settings
   * @returns {Date|null} Returns Date object. Returns null what date string is invalid or doesn't match format
   */
  function parse(dateStr, format, i18n) {
    if (i18n === void 0) {
      i18n = {};
    }
    if (typeof format !== 'string') {
      throw new Error('Invalid format in fecha parse');
    }
    // Check to see if the format is actually a mask
    format = globalMasks[format] || format;
    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) {
      return null;
    }
    // Default to the beginning of the year.
    var today = new Date();
    var dateInfo = {
      year: today.getFullYear(),
      month: 0,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      isPm: null,
      timezoneOffset: null,
    };
    var parseInfo = [];
    var literals = [];
    // Replace all the literals with @@@. Hopefully a string that won't exist in the format
    var newFormat = format.replace(literal, function ($0, $1) {
      literals.push(regexEscape($1));
      return '@@@';
    });
    var specifiedFields = {};
    var requiredFields = {};
    // Change every token that we find into the correct regex
    newFormat = regexEscape(newFormat).replace(token, function ($0) {
      var info = parseFlags[$0];
      var field = info[0],
        regex = info[1],
        requiredField = info[3];
      // Check if the person has specified the same field twice. This will lead to confusing results.
      if (specifiedFields[field]) {
        throw new Error('Invalid format. ' + field + ' specified twice in format');
      }
      specifiedFields[field] = true;
      // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
      if (requiredField) {
        requiredFields[requiredField] = true;
      }
      parseInfo.push(info);
      return '(' + regex + ')';
    });
    // Check all the required fields are present
    Object.keys(requiredFields).forEach(function (field) {
      if (!specifiedFields[field]) {
        throw new Error('Invalid format. ' + field + ' is required in specified format');
      }
    });
    // Add back all the literals after
    newFormat = newFormat.replace(/@@@/g, function () {
      return literals.shift();
    });
    // Check if the date string matches the format. If it doesn't return null
    var matches = dateStr.match(new RegExp(newFormat, 'i'));
    if (!matches) {
      return null;
    }
    var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
    // For each match, call the parser function for that date part
    for (var i = 1; i < matches.length; i++) {
      var _a = parseInfo[i - 1],
        field = _a[0],
        parser = _a[2];
      var value = parser ? parser(matches[i], combinedI18nSettings) : +matches[i];
      // If the parser can't make sense of the value, return null
      if (value == null) {
        return null;
      }
      dateInfo[field] = value;
    }
    if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
      dateInfo.hour = +dateInfo.hour + 12;
    } else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
      dateInfo.hour = 0;
    }
    var dateTZ;
    if (dateInfo.timezoneOffset == null) {
      dateTZ = new Date(
        dateInfo.year,
        dateInfo.month,
        dateInfo.day,
        dateInfo.hour,
        dateInfo.minute,
        dateInfo.second,
        dateInfo.millisecond
      );
      var validateFields = [
        ['month', 'getMonth'],
        ['day', 'getDate'],
        ['hour', 'getHours'],
        ['minute', 'getMinutes'],
        ['second', 'getSeconds'],
      ];
      for (var i = 0, len = validateFields.length; i < len; i++) {
        // Check to make sure the date field is within the allowed range. Javascript dates allows values
        // outside the allowed range. If the values don't match the value was invalid
        if (
          specifiedFields[validateFields[i][0]] &&
          dateInfo[validateFields[i][0]] !== dateTZ[validateFields[i][1]]()
        ) {
          return null;
        }
      }
    } else {
      dateTZ = new Date(
        Date.UTC(
          dateInfo.year,
          dateInfo.month,
          dateInfo.day,
          dateInfo.hour,
          dateInfo.minute - dateInfo.timezoneOffset,
          dateInfo.second,
          dateInfo.millisecond
        )
      );
      // We can't validate dates in another timezone unfortunately. Do a basic check instead
      if (
        dateInfo.month > 11 ||
        dateInfo.month < 0 ||
        dateInfo.day > 31 ||
        dateInfo.day < 1 ||
        dateInfo.hour > 23 ||
        dateInfo.hour < 0 ||
        dateInfo.minute > 59 ||
        dateInfo.minute < 0 ||
        dateInfo.second > 59 ||
        dateInfo.second < 0
      ) {
        return null;
      }
    }
    // Don't allow invalid dates
    return dateTZ;
  }
  var fecha = {
    format: format,
    parse: parse,
    defaultI18n: defaultI18n,
    setGlobalDateI18n: setGlobalDateI18n,
    setGlobalDateMasks: setGlobalDateMasks,
  };

  var fecha1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    default: fecha,
    assign: assign,
    format: format,
    parse: parse,
    defaultI18n: defaultI18n,
    setGlobalDateI18n: setGlobalDateI18n,
    setGlobalDateMasks: setGlobalDateMasks,
  });

  /**
   * 二分右侧查找
   * https://github.com/d3/d3-array/blob/master/src/bisector.js
   */
  function bisector(getter) {
    /**
     * x: 目标值
     * lo: 起始位置
     * hi: 结束位置
     */
    return function (a, x, _lo, _hi) {
      var lo = isNil(_lo) ? 0 : _lo;
      var hi = isNil(_hi) ? a.length : _hi;
      while (lo < hi) {
        var mid = (lo + hi) >>> 1;
        if (getter(a[mid]) > x) {
          hi = mid;
        } else {
          lo = mid + 1;
        }
      }
      return lo;
    };
  }

  var FORMAT_METHOD = 'format';
  function timeFormat(time, mask) {
    var method = fecha1[FORMAT_METHOD] || fecha[FORMAT_METHOD];
    return method(time, mask);
  }
  /**
   * 转换成时间戳
   * @param value 时间值
   */
  function toTimeStamp$1(value) {
    if (isString(value)) {
      if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        // new Date('2010/01/10') 和 new Date('2010-01-10') 的差别在于:
        // 如果仅有年月日时，前者是带有时区的: Fri Jan 10 2020 02:40:13 GMT+0800 (中国标准时间)
        // 后者会格式化成 Sun Jan 10 2010 08:00:00 GMT+0800 (中国标准时间)
        value = new Date(value.replace(/-/gi, '/')).getTime();
      }
    }
    if (isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
  var SECOND = 1000;
  var MINUTE = 60 * SECOND;
  var HOUR = 60 * MINUTE;
  var DAY = 24 * HOUR;
  var MONTH = DAY * 31;
  var YEAR = DAY * 365;
  var intervals = [
    ['HH:mm:ss', SECOND],
    ['HH:mm:ss', SECOND * 10],
    ['HH:mm:ss', SECOND * 30],
    ['HH:mm', MINUTE],
    ['HH:mm', MINUTE * 10],
    ['HH:mm', MINUTE * 30],
    ['HH', HOUR],
    ['HH', HOUR * 6],
    ['HH', HOUR * 12],
    ['YYYY-MM-DD', DAY],
    ['YYYY-MM-DD', DAY * 4],
    ['YYYY-WW', DAY * 7],
    ['YYYY-MM', MONTH],
    ['YYYY-MM', MONTH * 4],
    ['YYYY-MM', MONTH * 6],
    ['YYYY', DAY * 380],
  ];
  function getTickInterval(min, max, tickCount) {
    var target = (max - min) / tickCount;
    var idx =
      bisector(function (o) {
        return o[1];
      })(intervals, target) - 1;
    var interval = intervals[idx];
    if (idx < 0) {
      interval = intervals[0];
    } else if (idx >= intervals.length) {
      interval = last(intervals);
    }
    return interval;
  }

  /**
   * 时间分类度量
   * @class
   */
  var TimeCat = /** @class */ (function (_super) {
    __extends(TimeCat, _super);
    function TimeCat() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'timeCat';
      return _this;
    }
    /**
     * @override
     */
    TimeCat.prototype.translate = function (value) {
      value = toTimeStamp$1(value);
      var index = this.values.indexOf(value);
      if (index === -1) {
        if (isNumber(value) && value < this.values.length) {
          index = value;
        } else {
          index = NaN;
        }
      }
      return index;
    };
    /**
     * 由于时间类型数据需要转换一下，所以复写 getText
     * @override
     */
    TimeCat.prototype.getText = function (value, tickIndex) {
      var index = this.translate(value);
      if (index > -1) {
        var result = this.values[index];
        var formatter = this.formatter;
        result = formatter ? formatter(result, tickIndex) : timeFormat(result, this.mask);
        return result;
      }
      return value;
    };
    TimeCat.prototype.initCfg = function () {
      this.tickMethod = 'time-cat';
      this.mask = 'YYYY-MM-DD';
      this.tickCount = 7; // 一般时间数据会显示 7， 14， 30 天的数字
    };
    TimeCat.prototype.setDomain = function () {
      var values = this.values;
      // 针对时间分类类型，会将时间统一转换为时间戳
      each(values, function (v, i) {
        values[i] = toTimeStamp$1(v);
      });
      values.sort(function (v1, v2) {
        return v1 - v2;
      });
      _super.prototype.setDomain.call(this);
    };
    return TimeCat;
  })(Category);

  /**
   * 连续度量的基类
   * @class
   */
  var Continuous = /** @class */ (function (_super) {
    __extends(Continuous, _super);
    function Continuous() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.isContinuous = true;
      return _this;
    }
    Continuous.prototype.scale = function (value) {
      if (isNil(value)) {
        return NaN;
      }
      var rangeMin = this.rangeMin();
      var rangeMax = this.rangeMax();
      var max = this.max;
      var min = this.min;
      if (max === min) {
        return rangeMin;
      }
      var percent = this.getScalePercent(value);
      return rangeMin + percent * (rangeMax - rangeMin);
    };
    Continuous.prototype.init = function () {
      _super.prototype.init.call(this);
      // init 完成后保证 min, max 包含 ticks 的范围
      var ticks = this.ticks;
      var firstTick = head(ticks);
      var lastTick = last(ticks);
      if (firstTick < this.min) {
        this.min = firstTick;
      }
      if (lastTick > this.max) {
        this.max = lastTick;
      }
      // strict-limit 方式
      if (!isNil(this.minLimit)) {
        this.min = firstTick;
      }
      if (!isNil(this.maxLimit)) {
        this.max = lastTick;
      }
    };
    Continuous.prototype.setDomain = function () {
      var _a = getRange(this.values),
        min = _a.min,
        max = _a.max;
      if (isNil(this.min)) {
        this.min = min;
      }
      if (isNil(this.max)) {
        this.max = max;
      }
      if (this.min > this.max) {
        this.min = min;
        this.max = max;
      }
    };
    Continuous.prototype.calculateTicks = function () {
      var _this = this;
      var ticks = _super.prototype.calculateTicks.call(this);
      if (!this.nice) {
        ticks = filter(ticks, function (tick) {
          return tick >= _this.min && tick <= _this.max;
        });
      }
      return ticks;
    };
    // 计算原始值值占的百分比
    Continuous.prototype.getScalePercent = function (value) {
      var max = this.max;
      var min = this.min;
      return (value - min) / (max - min);
    };
    Continuous.prototype.getInvertPercent = function (value) {
      return (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
    };
    return Continuous;
  })(Scale);

  /**
   * 线性度量
   * @class
   */
  var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'linear';
      _this.isLinear = true;
      return _this;
    }
    Linear.prototype.invert = function (value) {
      var percent = this.getInvertPercent(value);
      return this.min + percent * (this.max - this.min);
    };
    Linear.prototype.initCfg = function () {
      this.tickMethod = 'wilkinson-extended';
      this.nice = false;
    };
    return Linear;
  })(Continuous);

  // 求以a为次幂，结果为b的基数，如 x^^a = b;求x
  // 虽然数学上 b 不支持负数，但是这里需要支持 负数
  function calBase(a, b) {
    var e = Math.E;
    var value;
    if (b >= 0) {
      value = Math.pow(e, Math.log(b) / a); // 使用换底公式求底
    } else {
      value = Math.pow(e, Math.log(-b) / a) * -1; // 使用换底公式求底
    }
    return value;
  }
  function log(a, b) {
    if (a === 1) {
      return 1;
    }
    return Math.log(b) / Math.log(a);
  }
  function getLogPositiveMin(values, base, max) {
    if (isNil(max)) {
      max = Math.max.apply(null, values);
    }
    var positiveMin = max;
    each(values, function (value) {
      if (value > 0 && value < positiveMin) {
        positiveMin = value;
      }
    });
    if (positiveMin === max) {
      positiveMin = max / base;
    }
    if (positiveMin > 1) {
      positiveMin = 1;
    }
    return positiveMin;
  }

  /**
   * Log 度量，处理非均匀分布
   */
  var Log = /** @class */ (function (_super) {
    __extends(Log, _super);
    function Log() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'log';
      return _this;
    }
    /**
     * @override
     */
    Log.prototype.invert = function (value) {
      var base = this.base;
      var max = log(base, this.max);
      var rangeMin = this.rangeMin();
      var range = this.rangeMax() - rangeMin;
      var min;
      var positiveMin = this.positiveMin;
      if (positiveMin) {
        if (value === 0) {
          return 0;
        }
        min = log(base, positiveMin / base);
        var appendPercent = (1 / (max - min)) * range; // 0 到 positiveMin的占比
        if (value < appendPercent) {
          // 落到 0 - positiveMin 之间
          return (value / appendPercent) * positiveMin;
        }
      } else {
        min = log(base, this.min);
      }
      var percent = (value - rangeMin) / range;
      var tmp = percent * (max - min) + min;
      return Math.pow(base, tmp);
    };
    Log.prototype.initCfg = function () {
      this.tickMethod = 'log';
      this.base = 10;
      this.tickCount = 6;
      this.nice = true;
    };
    // 设置
    Log.prototype.setDomain = function () {
      _super.prototype.setDomain.call(this);
      var min = this.min;
      if (min < 0) {
        throw new Error('When you use log scale, the minimum value must be greater than zero!');
      }
      if (min === 0) {
        this.positiveMin = getLogPositiveMin(this.values, this.base, this.max);
      }
    };
    // 根据当前值获取占比
    Log.prototype.getScalePercent = function (value) {
      var max = this.max;
      var min = this.min;
      if (max === min) {
        return 0;
      }
      // 如果值小于等于0，则按照0处理
      if (value <= 0) {
        return 0;
      }
      var base = this.base;
      var positiveMin = this.positiveMin;
      // 如果min == 0, 则根据比0大的最小值，计算比例关系。这个最小值作为坐标轴上的第二个tick，第一个是0但是不显示
      if (positiveMin) {
        min = (positiveMin * 1) / base;
      }
      var percent;
      // 如果数值小于次小值，那么就计算 value / 次小值 占整体的比例
      if (value < positiveMin) {
        percent = value / positiveMin / (log(base, max) - log(base, min));
      } else {
        percent = (log(base, value) - log(base, min)) / (log(base, max) - log(base, min));
      }
      return percent;
    };
    return Log;
  })(Continuous);

  /**
   * Pow 度量，处理非均匀分布
   */
  var Pow = /** @class */ (function (_super) {
    __extends(Pow, _super);
    function Pow() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'pow';
      return _this;
    }
    /**
     * @override
     */
    Pow.prototype.invert = function (value) {
      var percent = this.getInvertPercent(value);
      var exponent = this.exponent;
      var max = calBase(exponent, this.max);
      var min = calBase(exponent, this.min);
      var tmp = percent * (max - min) + min;
      var factor = tmp >= 0 ? 1 : -1;
      return Math.pow(tmp, exponent) * factor;
    };
    Pow.prototype.initCfg = function () {
      this.tickMethod = 'pow';
      this.exponent = 2;
      this.tickCount = 5;
      this.nice = true;
    };
    // 获取度量计算时，value占的定义域百分比
    Pow.prototype.getScalePercent = function (value) {
      var max = this.max;
      var min = this.min;
      if (max === min) {
        return 0;
      }
      var exponent = this.exponent;
      var percent =
        (calBase(exponent, value) - calBase(exponent, min)) /
        (calBase(exponent, max) - calBase(exponent, min));
      return percent;
    };
    return Pow;
  })(Continuous);

  /**
   * 时间度量
   * @class
   */
  var Time = /** @class */ (function (_super) {
    __extends(Time, _super);
    function Time() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'time';
      return _this;
    }
    /**
     * @override
     */
    Time.prototype.getText = function (value, index) {
      var numberValue = this.translate(value);
      var formatter = this.formatter;
      return formatter ? formatter(numberValue, index) : timeFormat(numberValue, this.mask);
    };
    /**
     * @override
     */
    Time.prototype.scale = function (value) {
      var v = value;
      if (isString(v) || isDate(v)) {
        v = this.translate(v);
      }
      return _super.prototype.scale.call(this, v);
    };
    /**
     * 将时间转换成数字
     * @override
     */
    Time.prototype.translate = function (v) {
      return toTimeStamp$1(v);
    };
    Time.prototype.initCfg = function () {
      this.tickMethod = 'time-pretty';
      this.mask = 'YYYY-MM-DD';
      this.tickCount = 7;
      this.nice = false;
    };
    Time.prototype.setDomain = function () {
      var values = this.values;
      // 是否设置了 min, max，而不是直接取 this.min, this.max
      var minConfig = this.getConfig('min');
      var maxConfig = this.getConfig('max');
      // 如果设置了 min,max 则转换成时间戳
      if (!isNil(minConfig) || !isNumber(minConfig)) {
        this.min = this.translate(this.min);
      }
      if (!isNil(maxConfig) || !isNumber(maxConfig)) {
        this.max = this.translate(this.max);
      }
      // 没有设置 min, max 时
      if (values && values.length) {
        // 重新计算最大最小值
        var timeStamps_1 = [];
        var min_1 = Infinity; // 最小值
        var secondMin_1 = min_1; // 次小值
        var max_1 = 0;
        // 使用一个循环，计算min,max,secondMin
        each(values, function (v) {
          var timeStamp = toTimeStamp$1(v);
          if (isNaN(timeStamp)) {
            throw new TypeError('Invalid Time: ' + v + ' in time scale!');
          }
          if (min_1 > timeStamp) {
            secondMin_1 = min_1;
            min_1 = timeStamp;
          } else if (secondMin_1 > timeStamp) {
            secondMin_1 = timeStamp;
          }
          if (max_1 < timeStamp) {
            max_1 = timeStamp;
          }
          timeStamps_1.push(timeStamp);
        });
        // 存在多个值时，设置最小间距
        if (values.length > 1) {
          this.minTickInterval = secondMin_1 - min_1;
        }
        if (isNil(minConfig)) {
          this.min = min_1;
        }
        if (isNil(maxConfig)) {
          this.max = max_1;
        }
      }
    };
    return Time;
  })(Linear);

  /**
   * 分段度量
   */
  var Quantize = /** @class */ (function (_super) {
    __extends(Quantize, _super);
    function Quantize() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'quantize';
      return _this;
    }
    Quantize.prototype.invert = function (value) {
      var ticks = this.ticks;
      var length = ticks.length;
      var percent = this.getInvertPercent(value);
      var minIndex = Math.floor(percent * (length - 1));
      // 最后一个
      if (minIndex >= length - 1) {
        return last(ticks);
      }
      // 超出左边界， 则取第一个
      if (minIndex < 0) {
        return head(ticks);
      }
      var minTick = ticks[minIndex];
      var nextTick = ticks[minIndex + 1];
      // 比当前值小的 tick 在度量上的占比
      var minIndexPercent = minIndex / (length - 1);
      var maxIndexPercent = (minIndex + 1) / (length - 1);
      return (
        minTick +
        ((percent - minIndexPercent) / (maxIndexPercent - minIndexPercent)) * (nextTick - minTick)
      );
    };
    Quantize.prototype.initCfg = function () {
      this.tickMethod = 'r-pretty';
      this.tickCount = 5;
      this.nice = true;
    };
    Quantize.prototype.calculateTicks = function () {
      var ticks = _super.prototype.calculateTicks.call(this);
      if (!this.nice) {
        // 如果 nice = false ,补充 min, max
        if (last(ticks) !== this.max) {
          ticks.push(this.max);
        }
        if (head(ticks) !== this.min) {
          ticks.unshift(this.min);
        }
      }
      return ticks;
    };
    // 计算当前值在刻度中的占比
    Quantize.prototype.getScalePercent = function (value) {
      var ticks = this.ticks;
      // 超出左边界
      if (value < head(ticks)) {
        return 0;
      }
      // 超出右边界
      if (value > last(ticks)) {
        return 1;
      }
      var minIndex = 0;
      each(ticks, function (tick, index) {
        if (value >= tick) {
          minIndex = index;
        } else {
          return false;
        }
      });
      return minIndex / (ticks.length - 1);
    };
    return Quantize;
  })(Continuous);

  var Quantile = /** @class */ (function (_super) {
    __extends(Quantile, _super);
    function Quantile() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'quantile';
      return _this;
    }
    Quantile.prototype.initCfg = function () {
      this.tickMethod = 'quantile';
      this.tickCount = 5;
      this.nice = true;
    };
    return Quantile;
  })(Quantize);

  var map$3 = {};
  function getClass(key) {
    return map$3[key];
  }
  function registerClass(key, cls) {
    if (getClass(key)) {
      throw new Error("type '" + key + "' existed.");
    }
    map$3[key] = cls;
  }

  /**
   * identity scale原则上是定义域和值域一致，scale/invert方法也是一致的
   * 参考R的实现：https://github.com/r-lib/scales/blob/master/R/pal-identity.r
   * 参考d3的实现（做了下转型）：https://github.com/d3/d3-scale/blob/master/src/identity.js
   */
  var Identity = /** @class */ (function (_super) {
    __extends(Identity, _super);
    function Identity() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.type = 'identity';
      _this.isIdentity = true;
      return _this;
    }
    Identity.prototype.calculateTicks = function () {
      return this.values;
    };
    Identity.prototype.scale = function (value) {
      // 如果传入的值不等于 identity 的值，则直接返回，用于一维图时的 dodge
      if (this.values[0] !== value && isNumber(value)) {
        return value;
      }
      return this.range[0];
    };
    Identity.prototype.invert = function (value) {
      var range = this.range;
      if (value < range[0] || value > range[1]) {
        return NaN;
      }
      return this.values[0];
    };
    return Identity;
  })(Scale);

  /**
   * 计算分类 ticks
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function calculateCatTicks(cfg) {
    var values = cfg.values,
      tickInterval = cfg.tickInterval,
      tickCount = cfg.tickCount,
      showLast = cfg.showLast;
    if (isNumber(tickInterval)) {
      var ticks_1 = filter(values, function (__, i) {
        return i % tickInterval === 0;
      });
      var lastValue = last(values);
      if (showLast && last(ticks_1) !== lastValue) {
        ticks_1.push(lastValue);
      }
      return ticks_1;
    }
    var len = values.length;
    var min = cfg.min,
      max = cfg.max;
    if (isNil(min)) {
      min = 0;
    }
    if (isNil(max)) {
      max = values.length - 1;
    }
    if (!isNumber(tickCount) || tickCount >= len) return values.slice(min, max + 1);
    if (tickCount <= 0 || max <= 0) return [];
    var interval = tickCount === 1 ? len : Math.floor(len / (tickCount - 1));
    var ticks = [];
    var idx = min;
    for (var i = 0; i < tickCount; i++) {
      if (idx >= max) break;
      idx = Math.min(min + i * interval, max);
      if (i === tickCount - 1 && showLast) ticks.push(values[max]);
      else ticks.push(values[idx]);
    }
    return ticks;
  }

  function d3Linear(cfg) {
    var min = cfg.min,
      max = cfg.max,
      nice = cfg.nice,
      tickCount = cfg.tickCount;
    var linear = new D3Linear();
    linear.domain([min, max]);
    if (nice) {
      linear.nice(tickCount);
    }
    return linear.ticks(tickCount);
  }
  var DEFAULT_COUNT = 5;
  var e10 = Math.sqrt(50);
  var e5 = Math.sqrt(10);
  var e2 = Math.sqrt(2);
  // https://github.com/d3/d3-scale
  var D3Linear = /** @class */ (function () {
    function D3Linear() {
      this._domain = [0, 1];
    }
    D3Linear.prototype.domain = function (domain) {
      if (domain) {
        this._domain = Array.from(domain, Number);
        return this;
      }
      return this._domain.slice();
    };
    D3Linear.prototype.nice = function (count) {
      var _a, _b;
      if (count === void 0) {
        count = DEFAULT_COUNT;
      }
      var d = this._domain.slice();
      var i0 = 0;
      var i1 = this._domain.length - 1;
      var start = this._domain[i0];
      var stop = this._domain[i1];
      var step;
      if (stop < start) {
        (_a = [stop, start]), (start = _a[0]), (stop = _a[1]);
        (_b = [i1, i0]), (i0 = _b[0]), (i1 = _b[1]);
      }
      step = tickIncrement(start, stop, count);
      if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
        step = tickIncrement(start, stop, count);
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
        step = tickIncrement(start, stop, count);
      }
      if (step > 0) {
        d[i0] = Math.floor(start / step) * step;
        d[i1] = Math.ceil(stop / step) * step;
        this.domain(d);
      } else if (step < 0) {
        d[i0] = Math.ceil(start * step) / step;
        d[i1] = Math.floor(stop * step) / step;
        this.domain(d);
      }
      return this;
    };
    D3Linear.prototype.ticks = function (count) {
      if (count === void 0) {
        count = DEFAULT_COUNT;
      }
      return d3ArrayTicks(
        this._domain[0],
        this._domain[this._domain.length - 1],
        count || DEFAULT_COUNT
      );
    };
    return D3Linear;
  })();
  function d3ArrayTicks(start, stop, count) {
    var reverse;
    var i = -1;
    var n;
    var ticks;
    var step;
    (stop = +stop), (start = +start), (count = +count);
    if (start === stop && count > 0) {
      return [start];
    }
    // tslint:disable-next-line
    if ((reverse = stop < start)) {
      (n = start), (start = stop), (stop = n);
    }
    // tslint:disable-next-line
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) {
      return [];
    }
    if (step > 0) {
      start = Math.ceil(start / step);
      stop = Math.floor(stop / step);
      ticks = new Array((n = Math.ceil(stop - start + 1)));
      while (++i < n) {
        ticks[i] = (start + i) * step;
      }
    } else {
      start = Math.floor(start * step);
      stop = Math.ceil(stop * step);
      ticks = new Array((n = Math.ceil(start - stop + 1)));
      while (++i < n) {
        ticks[i] = (start - i) / step;
      }
    }
    if (reverse) {
      ticks.reverse();
    }
    return ticks;
  }
  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count);
    var power = Math.floor(Math.log(step) / Math.LN10);
    var error = step / Math.pow(10, power);
    return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }

  function snapMultiple(v, base, snapType) {
    var div;
    if (snapType === 'ceil') {
      div = Math.ceil(v / base);
    } else if (snapType === 'floor') {
      div = Math.floor(v / base);
    } else {
      div = Math.round(v / base);
    }
    return div * base;
  }
  function intervalTicks(min, max, interval) {
    // 变成 interval 的倍数
    var minTick = snapMultiple(min, interval, 'floor');
    var maxTick = snapMultiple(max, interval, 'ceil');
    // 统一小数位数
    minTick = fixedBase(minTick, interval);
    maxTick = fixedBase(maxTick, interval);
    var ticks = [];
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Invalid_array_length
    var availableInterval = Math.max((maxTick - minTick) / (Math.pow(2, 12) - 1), interval);
    for (var i = minTick; i <= maxTick; i = i + availableInterval) {
      var tickValue = fixedBase(i, availableInterval); // 防止浮点数加法出现问题
      ticks.push(tickValue);
    }
    return {
      min: minTick,
      max: maxTick,
      ticks: ticks,
    };
  }

  /**
   * 按照给定的 minLimit/maxLimit/tickCount 均匀计算出刻度 ticks
   *
   * @param cfg Scale 配置项
   * @return ticks
   */
  function strictLimit(cfg, defaultMin, defaultMax) {
    var _a;
    var minLimit = cfg.minLimit,
      maxLimit = cfg.maxLimit,
      min = cfg.min,
      max = cfg.max,
      _b = cfg.tickCount,
      tickCount = _b === void 0 ? 5 : _b;
    var tickMin = isNil(minLimit) ? (isNil(defaultMin) ? min : defaultMin) : minLimit;
    var tickMax = isNil(maxLimit) ? (isNil(defaultMax) ? max : defaultMax) : maxLimit;
    if (tickMin > tickMax) {
      (_a = [tickMin, tickMax]), (tickMax = _a[0]), (tickMin = _a[1]);
    }
    if (tickCount <= 2) {
      return [tickMin, tickMax];
    }
    var step = (tickMax - tickMin) / (tickCount - 1);
    var ticks = [];
    for (var i = 0; i < tickCount; i++) {
      ticks.push(tickMin + step * i);
    }
    return ticks;
  }

  function d3LinearTickMethod(cfg) {
    var min = cfg.min,
      max = cfg.max,
      tickInterval = cfg.tickInterval,
      minLimit = cfg.minLimit,
      maxLimit = cfg.maxLimit;
    var ticks = d3Linear(cfg);
    if (!isNil(minLimit) || !isNil(maxLimit)) {
      return strictLimit(cfg, head(ticks), last(ticks));
    }
    if (tickInterval) {
      return intervalTicks(min, max, tickInterval).ticks;
    }
    return ticks;
  }

  // 为了解决 js 运算的精度问题
  function prettyNumber(n) {
    return Math.abs(n) < 1e-15 ? n : parseFloat(n.toFixed(15));
  }

  var DEFAULT_Q = [1, 5, 2, 2.5, 4, 3];
  var eps = Number.EPSILON * 100;
  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  function round(n) {
    return Math.round(n * 1e12) / 1e12;
  }
  function simplicity(q, Q, j, lmin, lmax, lstep) {
    var n = size(Q);
    var i = indexOf(Q, q);
    var v = 0;
    var m = mod(lmin, lstep);
    if ((m < eps || lstep - m < eps) && lmin <= 0 && lmax >= 0) {
      v = 1;
    }
    return 1 - i / (n - 1) - j + v;
  }
  function simplicityMax(q, Q, j) {
    var n = size(Q);
    var i = indexOf(Q, q);
    var v = 1;
    return 1 - i / (n - 1) - j + v;
  }
  function density(k, m, dMin, dMax, lMin, lMax) {
    var r = (k - 1) / (lMax - lMin);
    var rt = (m - 1) / (Math.max(lMax, dMax) - Math.min(dMin, lMin));
    return 2 - Math.max(r / rt, rt / r);
  }
  function densityMax(k, m) {
    if (k >= m) {
      return 2 - (k - 1) / (m - 1);
    }
    return 1;
  }
  function coverage(dMin, dMax, lMin, lMax) {
    var range = dMax - dMin;
    return (
      1 - (0.5 * (Math.pow(dMax - lMax, 2) + Math.pow(dMin - lMin, 2))) / Math.pow(0.1 * range, 2)
    );
  }
  function coverageMax(dMin, dMax, span) {
    var range = dMax - dMin;
    if (span > range) {
      var half = (span - range) / 2;
      return 1 - Math.pow(half, 2) / Math.pow(0.1 * range, 2);
    }
    return 1;
  }
  function legibility() {
    return 1;
  }
  /**
   * An Extension of Wilkinson's Algorithm for Position Tick Labels on Axes
   * https://www.yuque.com/preview/yuque/0/2019/pdf/185317/1546999150858-45c3b9c2-4e86-4223-bf1a-8a732e8195ed.pdf
   * @param dMin 最小值
   * @param dMax 最大值
   * @param m tick个数
   * @param onlyLoose 是否允许扩展min、max，不绝对强制，例如[3, 97]
   * @param Q nice numbers集合
   * @param w 四个优化组件的权重
   */
  function extended(dMin, dMax, n, onlyLoose, Q, w) {
    if (n === void 0) {
      n = 5;
    }
    if (onlyLoose === void 0) {
      onlyLoose = true;
    }
    if (Q === void 0) {
      Q = DEFAULT_Q;
    }
    if (w === void 0) {
      w = [0.25, 0.2, 0.5, 0.05];
    }
    // 处理小于 0 和小数的 tickCount
    var m = n < 0 ? 0 : Math.round(n);
    // nan 也会导致异常
    if (
      Number.isNaN(dMin) ||
      Number.isNaN(dMax) ||
      typeof dMin !== 'number' ||
      typeof dMax !== 'number' ||
      !m
    ) {
      return {
        min: 0,
        max: 0,
        ticks: [],
      };
    }
    // js 极大值极小值问题，差值小于 1e-15 会导致计算出错
    if (dMax - dMin < 1e-15 || m === 1) {
      return {
        min: dMin,
        max: dMax,
        ticks: [dMin],
      };
    }
    // js 超大值问题
    if (dMax - dMin > 1e148) {
      var count = n || 5;
      var step_1 = (dMax - dMin) / count;
      return {
        min: dMin,
        max: dMax,
        ticks: Array(count)
          .fill(null)
          .map(function (_, idx) {
            return prettyNumber(dMin + step_1 * idx);
          }),
      };
    }
    var best = {
      score: -2,
      lmin: 0,
      lmax: 0,
      lstep: 0,
    };
    var j = 1;
    while (j < Infinity) {
      for (var i = 0; i < Q.length; i += 1) {
        var q = Q[i];
        var sm = simplicityMax(q, Q, j);
        if (w[0] * sm + w[1] + w[2] + w[3] < best.score) {
          j = Infinity;
          break;
        }
        var k = 2;
        while (k < Infinity) {
          var dm = densityMax(k, m);
          if (w[0] * sm + w[1] + w[2] * dm + w[3] < best.score) {
            break;
          }
          var delta = (dMax - dMin) / (k + 1) / j / q;
          var z = Math.ceil(Math.log10(delta));
          while (z < Infinity) {
            var step = j * q * Math.pow(10, z);
            var cm = coverageMax(dMin, dMax, step * (k - 1));
            if (w[0] * sm + w[1] * cm + w[2] * dm + w[3] < best.score) {
              break;
            }
            var minStart = Math.floor(dMax / step) * j - (k - 1) * j;
            var maxStart = Math.ceil(dMin / step) * j;
            if (minStart <= maxStart) {
              var count = maxStart - minStart;
              for (var i_1 = 0; i_1 <= count; i_1 += 1) {
                var start = minStart + i_1;
                var lMin = start * (step / j);
                var lMax = lMin + step * (k - 1);
                var lStep = step;
                var s = simplicity(q, Q, j, lMin, lMax, lStep);
                var c = coverage(dMin, dMax, lMin, lMax);
                var g = density(k, m, dMin, dMax, lMin, lMax);
                var l = legibility();
                var score = w[0] * s + w[1] * c + w[2] * g + w[3] * l;
                if (score > best.score && (!onlyLoose || (lMin <= dMin && lMax >= dMax))) {
                  best.lmin = lMin;
                  best.lmax = lMax;
                  best.lstep = lStep;
                  best.score = score;
                }
              }
            }
            z += 1;
          }
          k += 1;
        }
      }
      j += 1;
    }
    // 处理精度问题，保证这三个数没有精度问题
    var lmax = prettyNumber(best.lmax);
    var lmin = prettyNumber(best.lmin);
    var lstep = prettyNumber(best.lstep);
    // 加 round 是为处理 extended(0.94, 1, 5)
    // 保证生成的 tickCount 没有精度问题
    var tickCount = Math.floor(round((lmax - lmin) / lstep)) + 1;
    var ticks = new Array(tickCount);
    // 少用乘法：防止出现 -1.2 + 1.2 * 3 = 2.3999999999999995 的情况
    ticks[0] = prettyNumber(lmin);
    for (var i = 1; i < tickCount; i++) {
      ticks[i] = prettyNumber(ticks[i - 1] + lstep);
    }
    return {
      min: Math.min(dMin, head(ticks)),
      max: Math.max(dMax, last(ticks)),
      ticks: ticks,
    };
  }

  /**
   * 计算线性的 ticks，使用 wilkinson extended 方法
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function linear$2(cfg) {
    var min = cfg.min,
      max = cfg.max,
      tickCount = cfg.tickCount,
      nice = cfg.nice,
      tickInterval = cfg.tickInterval,
      minLimit = cfg.minLimit,
      maxLimit = cfg.maxLimit;
    var ticks = extended(min, max, tickCount, nice).ticks;
    if (!isNil(minLimit) || !isNil(maxLimit)) {
      return strictLimit(cfg, head(ticks), last(ticks));
    }
    if (tickInterval) {
      return intervalTicks(min, max, tickInterval).ticks;
    }
    return ticks;
  }

  /**
   * 计算 log 的 ticks，考虑 min = 0 的场景
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function calculateLogTicks(cfg) {
    var base = cfg.base,
      tickCount = cfg.tickCount,
      min = cfg.min,
      max = cfg.max,
      values = cfg.values;
    var minTick;
    var maxTick = log(base, max);
    if (min > 0) {
      minTick = Math.floor(log(base, min));
    } else {
      var positiveMin = getLogPositiveMin(values, base, max);
      minTick = Math.floor(log(base, positiveMin));
    }
    var count = maxTick - minTick;
    var avg = Math.ceil(count / tickCount);
    var ticks = [];
    for (var i = minTick; i < maxTick + avg; i = i + avg) {
      ticks.push(Math.pow(base, i));
    }
    if (min <= 0) {
      // 最小值 <= 0 时显示 0
      ticks.unshift(0);
    }
    return ticks;
  }

  function pretty(min, max, m) {
    if (m === void 0) {
      m = 5;
    }
    if (min === max) {
      return {
        max: max,
        min: min,
        ticks: [min],
      };
    }
    var n = m < 0 ? 0 : Math.round(m);
    if (n === 0) return { max: max, min: min, ticks: [] };
    /*
	      R pretty:
	      https://svn.r-project.org/R/trunk/src/appl/pretty.c
	      https://www.rdocumentation.org/packages/base/versions/3.5.2/topics/pretty
	      */
    var h = 1.5; // high.u.bias
    var h5 = 0.5 + 1.5 * h; // u5.bias
    // 反正我也不会调参，跳过所有判断步骤
    var d = max - min;
    var c = d / n;
    // 当d非常小的时候触发，但似乎没什么用
    // const min_n = Math.floor(n / 3);
    // const shrink_sml = Math.pow(2, 5);
    // if (Math.log10(d) < -2) {
    //   c = (_.max([ Math.abs(max), Math.abs(min) ]) * shrink_sml) / min_n;
    // }
    var base = Math.pow(10, Math.floor(Math.log10(c)));
    var unit = base;
    if (2 * base - c < h * (c - unit)) {
      unit = 2 * base;
      if (5 * base - c < h5 * (c - unit)) {
        unit = 5 * base;
        if (10 * base - c < h * (c - unit)) {
          unit = 10 * base;
        }
      }
    }
    var nu = Math.ceil(max / unit);
    var ns = Math.floor(min / unit);
    var hi = Math.max(nu * unit, max);
    var lo = Math.min(ns * unit, min);
    var size = Math.floor((hi - lo) / unit) + 1;
    var ticks = new Array(size);
    for (var i = 0; i < size; i++) {
      ticks[i] = prettyNumber(lo + i * unit);
    }
    return {
      min: lo,
      max: hi,
      ticks: ticks,
    };
  }

  /**
   * 计算 Pow 的 ticks
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function calculatePowTicks(cfg) {
    var exponent = cfg.exponent,
      tickCount = cfg.tickCount;
    var max = Math.ceil(calBase(exponent, cfg.max));
    var min = Math.floor(calBase(exponent, cfg.min));
    var ticks = pretty(min, max, tickCount).ticks;
    return ticks.map(function (tick) {
      var factor = tick >= 0 ? 1 : -1;
      return Math.pow(tick, exponent) * factor;
    });
  }

  /**
   * 计算几分位 https://github.com/simple-statistics/simple-statistics/blob/master/src/quantile_sorted.js
   * @param x  数组
   * @param p  百分比
   */
  function quantileSorted(x, p) {
    var idx = x.length * p;
    /*if (x.length === 0) { // 当前场景这些条件不可能命中
	      throw new Error('quantile requires at least one value.');
	    } else if (p < 0 || p > 1) {
	      throw new Error('quantiles must be between 0 and 1');
	    } else */
    if (p === 1) {
      // If p is 1, directly return the last element
      return x[x.length - 1];
    } else if (p === 0) {
      // If p is 0, directly return the first element
      return x[0];
    } else if (idx % 1 !== 0) {
      // If p is not integer, return the next element in array
      return x[Math.ceil(idx) - 1];
    } else if (x.length % 2 === 0) {
      // If the list has even-length, we'll take the average of this number
      // and the next value, if there is one
      return (x[idx - 1] + x[idx]) / 2;
    } else {
      // Finally, in the simple case of an integer value
      // with an odd-length list, return the x value at the index.
      return x[idx];
    }
  }
  function calculateTicks(cfg) {
    var tickCount = cfg.tickCount,
      values = cfg.values;
    if (!values || !values.length) {
      return [];
    }
    var sorted = values.slice().sort(function (a, b) {
      return a - b;
    });
    var ticks = [];
    for (var i = 0; i < tickCount; i++) {
      var p = i / (tickCount - 1);
      ticks.push(quantileSorted(sorted, p));
    }
    return ticks;
  }

  /**
   * 计算线性的 ticks，使用 R's pretty 方法
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function linearPretty(cfg) {
    var min = cfg.min,
      max = cfg.max,
      tickCount = cfg.tickCount,
      tickInterval = cfg.tickInterval,
      minLimit = cfg.minLimit,
      maxLimit = cfg.maxLimit;
    var ticks = pretty(min, max, tickCount).ticks;
    if (!isNil(minLimit) || !isNil(maxLimit)) {
      return strictLimit(cfg, head(ticks), last(ticks));
    }
    if (tickInterval) {
      return intervalTicks(min, max, tickInterval).ticks;
    }
    return ticks;
  }

  function calculateTimeTicks(cfg) {
    var min = cfg.min,
      max = cfg.max,
      minTickInterval = cfg.minTickInterval;
    var tickInterval = cfg.tickInterval;
    var tickCount = cfg.tickCount;
    // 指定 tickInterval 后 tickCount 不生效，需要重新计算
    if (tickInterval) {
      tickCount = Math.ceil((max - min) / tickInterval);
    } else {
      tickInterval = getTickInterval(min, max, tickCount)[1];
      var count = (max - min) / tickInterval;
      var ratio = count / tickCount;
      if (ratio > 1) {
        tickInterval = tickInterval * Math.ceil(ratio);
      }
      // 如果设置了最小间距，则使用最小间距
      if (minTickInterval && tickInterval < minTickInterval) {
        tickInterval = minTickInterval;
      }
    }
    tickInterval = Math.max(Math.floor((max - min) / (Math.pow(2, 12) - 1)), tickInterval);
    var ticks = [];
    for (var i = min; i < max + tickInterval; i += tickInterval) {
      ticks.push(i);
    }
    return ticks;
  }

  /**
   * 计算时间分类的 ticks, 保头，保尾
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function timeCat(cfg) {
    // 默认保留最后一条
    var ticks = calculateCatTicks(__assign({ showLast: true }, cfg));
    return ticks;
  }

  function getYear(date) {
    return new Date(date).getFullYear();
  }
  function createYear(year) {
    return new Date(year, 0, 1).getTime();
  }
  function getMonth(date) {
    return new Date(date).getMonth();
  }
  function diffMonth(min, max) {
    var minYear = getYear(min);
    var maxYear = getYear(max);
    var minMonth = getMonth(min);
    var maxMonth = getMonth(max);
    return (maxYear - minYear) * 12 + ((maxMonth - minMonth) % 12);
  }
  function creatMonth(year, month) {
    return new Date(year, month, 1).getTime();
  }
  function diffDay(min, max) {
    return Math.ceil((max - min) / DAY);
  }
  function diffHour(min, max) {
    return Math.ceil((max - min) / HOUR);
  }
  function diffMinus(min, max) {
    return Math.ceil((max - min) / (60 * 1000));
  }
  /**
   * 计算 time 的 ticks，对 month, year 进行 pretty 处理
   * @param cfg 度量的配置项
   * @returns 计算后的 ticks
   */
  function timePretty(cfg) {
    var min = cfg.min,
      max = cfg.max,
      minTickInterval = cfg.minTickInterval,
      tickCount = cfg.tickCount;
    var tickInterval = cfg.tickInterval;
    var ticks = [];
    // 指定 tickInterval 后 tickCount 不生效，需要重新计算
    if (!tickInterval) {
      tickInterval = (max - min) / tickCount;
      // 如果设置了最小间距，则使用最小间距
      if (minTickInterval && tickInterval < minTickInterval) {
        tickInterval = minTickInterval;
      }
    }
    tickInterval = Math.max(Math.floor((max - min) / (Math.pow(2, 12) - 1)), tickInterval);
    var minYear = getYear(min);
    // 如果间距大于 1 年，则将开始日期从整年开始
    if (tickInterval > YEAR) {
      var maxYear = getYear(max);
      var yearInterval = Math.ceil(tickInterval / YEAR);
      for (var i = minYear; i <= maxYear + yearInterval; i = i + yearInterval) {
        ticks.push(createYear(i));
      }
    } else if (tickInterval > MONTH) {
      // 大于月时
      var monthInterval = Math.ceil(tickInterval / MONTH);
      var mmMoth = getMonth(min);
      var dMonths = diffMonth(min, max);
      for (var i = 0; i <= dMonths + monthInterval; i = i + monthInterval) {
        ticks.push(creatMonth(minYear, i + mmMoth));
      }
    } else if (tickInterval > DAY) {
      // 大于天
      var date = new Date(min);
      var year = date.getFullYear();
      var month = date.getMonth();
      var mday = date.getDate();
      var day = Math.ceil(tickInterval / DAY);
      var ddays = diffDay(min, max);
      for (var i = 0; i < ddays + day; i = i + day) {
        ticks.push(new Date(year, month, mday + i).getTime());
      }
    } else if (tickInterval > HOUR) {
      // 大于小时
      var date = new Date(min);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var hours = Math.ceil(tickInterval / HOUR);
      var dHours = diffHour(min, max);
      for (var i = 0; i <= dHours + hours; i = i + hours) {
        ticks.push(new Date(year, month, day, hour + i).getTime());
      }
    } else if (tickInterval > MINUTE) {
      // 大于分钟
      var dMinus = diffMinus(min, max);
      var minutes = Math.ceil(tickInterval / MINUTE);
      for (var i = 0; i <= dMinus + minutes; i = i + minutes) {
        ticks.push(min + i * MINUTE);
      }
    } else {
      // 小于分钟
      var interval = tickInterval;
      if (interval < SECOND) {
        interval = SECOND;
      }
      var minSecond = Math.floor(min / SECOND) * SECOND;
      var dSeconds = Math.ceil((max - min) / SECOND);
      var seconds = Math.ceil(interval / SECOND);
      for (var i = 0; i < dSeconds + seconds; i = i + seconds) {
        ticks.push(minSecond + i * SECOND);
      }
    }
    // 最好是能从算法能解决这个问题，但是如果指定了 tickInterval，计算 ticks，也只能这么算，所以
    // 打印警告提示
    if (ticks.length >= 512) {
      console.warn(
        'Notice: current ticks length(' +
          ticks.length +
          ') >= 512, may cause performance issues, even out of memory. Because of the configure "tickInterval"(in milliseconds, current is ' +
          tickInterval +
          ') is too small, increase the value to solve the problem!'
      );
    }
    return ticks;
  }

  registerTickMethod('cat', calculateCatTicks);
  registerTickMethod('time-cat', timeCat);
  registerTickMethod('wilkinson-extended', linear$2);
  registerTickMethod('r-pretty', linearPretty);
  registerTickMethod('time', calculateTimeTicks);
  registerTickMethod('time-pretty', timePretty);
  registerTickMethod('log', calculateLogTicks);
  registerTickMethod('pow', calculatePowTicks);
  registerTickMethod('quantile', calculateTicks);
  registerTickMethod('d3-linear', d3LinearTickMethod);

  registerClass('cat', Category);
  registerClass('category', Category);
  registerClass('identity', Identity);
  registerClass('linear', Linear);
  registerClass('log', Log);
  registerClass('pow', Pow);
  registerClass('time', Time);
  registerClass('timeCat', TimeCat);
  registerClass('quantize', Quantize);
  registerClass('quantile', Quantile);

  // cat平均算法，保头保尾
  var CatTick = function (cfg) {
    var values = cfg.values,
      tickCount = cfg.tickCount;
    if (!tickCount) {
      return values;
    }
    if (values.length <= 1) {
      return values;
    }
    // 获取间隔步长, 最小是1
    var step = Math.floor(values.length / (tickCount - 1)) || 1;
    var ticks = [];
    // 按间隔数取对应节点
    for (var index = 0; index < values.length; index = index + step) {
      ticks.push(values[index]);
    }
    var last = values[values.length - 1];
    // 如果最后一个tick不等于原数据的最后一个
    if (ticks[ticks.length - 1] !== last) {
      if (ticks.length >= tickCount) {
        // 如果当前的tick个数满足要求
        ticks[ticks.length - 1] = last;
      } else {
        // 不满足tickCount则直接加入最后一个
        ticks.push(last);
      }
    }
    return ticks;
  };

  // 认为是nice的刻度
  var SNAP_COUNT_ARRAY = [1, 1.2, 1.5, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10];
  var DEFAULT_COUNT$1 = 5; // 默认刻度值
  var LinearTick = function (cfg) {
    var _ref = cfg || {},
      tickCount = _ref.tickCount,
      tickInterval = _ref.tickInterval;
    var _ref2 = cfg || {},
      min = _ref2.min,
      max = _ref2.max;
    min = isNaN(min) ? 0 : min;
    max = isNaN(max) ? 0 : max;
    var count = tickCount && tickCount >= 2 ? tickCount : DEFAULT_COUNT$1;
    // 计算interval， 优先取tickInterval
    var interval =
      tickInterval ||
      getBestInterval({
        tickCount: count,
        max: max,
        min: min,
      });
    // 通过interval计算最小tick
    var minTick = Math.floor(min / interval) * interval;
    // 如果指定了tickInterval, count 需要根据指定的tickInterval来算计
    if (tickInterval) {
      var intervalCount = Math.abs(Math.ceil((max - minTick) / tickInterval)) + 1;
      // tickCount 作为最小 count 处理
      count = Math.max(count, intervalCount);
    }
    var tickLength = 0;
    var fixedLength = getFixedLength(interval);
    if (min < 0 && max > 0 && count === 2) {
      return [
        toFixed(minTick, fixedLength),
        toFixed(Math.ceil(max / interval) * interval, fixedLength),
      ];
    }
    var ticks = [];
    while (tickLength < count) {
      ticks.push(toFixed(minTick + tickLength * interval, fixedLength));
      tickLength++;
    }
    return ticks;
  };
  var DECIMAL_LENGTH = 12;
  function getFactor(number) {
    // 取正数
    number = Math.abs(number);
    var factor = 1;
    if (number === 0) {
      return factor;
    }
    // 小于1,逐渐放大
    if (number < 1) {
      var count = 0;
      while (number < 1) {
        factor = factor / 10;
        number = number * 10;
        count++;
      }
      // 浮点数计算出现问题
      if (factor.toString().length > DECIMAL_LENGTH) {
        factor = parseFloat(factor.toFixed(count));
      }
      return factor;
    }
    // 大于10逐渐缩小
    while (number > 10) {
      factor = factor * 10;
      number = number / 10;
    }
    return factor;
  }
  // 获取最佳匹配刻度
  function getBestInterval(_ref3) {
    var tickCount = _ref3.tickCount,
      min = _ref3.min,
      max = _ref3.max;
    // 如果最大最小相等，则直接按1处理
    if (min === max) {
      return 1 * getFactor(max);
    }
    // 1.计算平均刻度间隔
    var avgInterval = (max - min) / (tickCount - 1);
    // 2.数据标准归一化 映射到[1-10]区间
    var factor = getFactor(avgInterval);
    var calInterval = avgInterval / factor;
    var calMax = max / factor;
    var calMin = min / factor;
    // 根据平均值推算最逼近刻度值
    var similarityIndex = 0;
    for (var index = 0; index < SNAP_COUNT_ARRAY.length; index++) {
      var item = SNAP_COUNT_ARRAY[index];
      if (calInterval <= item) {
        similarityIndex = index;
        break;
      }
    }
    var similarityInterval =
      min < 0 && max > 0 && tickCount === 2
        ? SNAP_COUNT_ARRAY[similarityIndex]
        : getInterval(similarityIndex, tickCount, calMin, calMax);
    // 小数点位数还原到数据的位数, 因为similarityIndex有可能是小数，所以需要保留similarityIndex自己的小数位数
    var fixedLength = getFixedLength(similarityInterval) + getFixedLength(factor);
    return toFixed(similarityInterval * factor, fixedLength);
  }
  function getInterval(startIndex, tickCount, min, max) {
    var verify = false;
    var interval = SNAP_COUNT_ARRAY[startIndex];
    // 刻度值校验，如果不满足，循环下去
    for (var i = startIndex; i < SNAP_COUNT_ARRAY.length; i++) {
      if (
        intervalIsVerify({
          interval: SNAP_COUNT_ARRAY[i],
          tickCount: tickCount,
          max: max,
          min: min,
        })
      ) {
        // 有符合条件的interval
        interval = SNAP_COUNT_ARRAY[i];
        verify = true;
        break;
      }
    }
    // 如果不满足, 依次缩小10倍，再计算
    if (!verify) {
      return 10 * getInterval(0, tickCount, min / 10, max / 10);
    }
    return interval;
  }
  // 刻度是否满足展示需求
  function intervalIsVerify(_ref4) {
    var interval = _ref4.interval,
      tickCount = _ref4.tickCount,
      max = _ref4.max,
      min = _ref4.min;
    var minTick = Math.floor(min / interval) * interval;
    if (minTick + (tickCount - 1) * interval >= max) {
      return true;
    }
    return false;
  }
  // 计算小数点应该保留的位数
  function getFixedLength(num) {
    var str = num.toString();
    var index = str.indexOf('.');
    var indexOfExp = str.indexOf('e-');
    var length =
      indexOfExp >= 0 ? parseInt(str.substr(indexOfExp + 2), 10) : str.substr(index + 1).length;
    if (length > 20) {
      // 最多保留20位小数
      length = 20;
    }
    return length;
  }
  // @antv/util fixedbase不支持科学计数法的判断，需要提mr
  function toFixed(v, length) {
    return parseFloat(v.toFixed(length));
  }

  // 覆盖0.3.x的 cat 方法
  registerTickMethod('cat', CatTick);
  registerTickMethod('time-cat', CatTick);
  // 覆盖linear 度量的tick算法
  registerTickMethod('wilkinson-extended', LinearTick);
  var ScaleController = /*#__PURE__*/ (function () {
    function ScaleController(data) {
      _classCallCheck(this, ScaleController);
      this.data = data;
      this.options = {};
      this.scales = {};
    }
    _createClass(ScaleController, [
      {
        key: '_getType',
        value: function _getType(option) {
          var type = option.type,
            values = option.values,
            field = option.field;
          if (type) {
            return type;
          }
          if (isNumber(field) || (isNil(values[0]) && field)) {
            return 'identity';
          }
          if (typeof values[0] === 'number') {
            return 'linear';
          }
          return 'cat';
        },
      },
      {
        key: '_getOption',
        value: function _getOption(option) {
          var values = option.values,
            field = option.field,
            justifyContent = option.justifyContent;
          var type = this._getType(option);
          option.type = type;
          // identity
          if (type === 'identity') {
            option.field = field.toString();
            option.values = [field];
            return option;
          }
          // linear 类型
          if (type === 'linear') {
            // 设置默认nice
            if (typeof option.nice !== 'boolean') {
              option.nice = true;
            }
            // 重置最大最小
            var _getRange = getRange(values),
              min = _getRange.min,
              max = _getRange.max;
            if (isNil(option.min)) {
              option.min = min;
            }
            if (isNil(option.max)) {
              option.max = max;
            }
            option.values = values.sort(function (a, b) {
              return a - b;
            });
            return option;
          }
          // 分类类型和 timeCat 类型，调整 range
          if (type === 'cat' || type === 'timeCat') {
            if (option.range) {
              return option;
            }
            var count = values.length;
            var range = [0, 1];
            // 如果只有一项，显示在中间
            if (count === 1) {
              range = [0.5, 1];
            } else if (justifyContent) {
              // 居中
              var offset = (1 / count) * 0.5;
              range = [offset, 1 - offset];
            } else {
              // 最后留 1 / count
              var _offset = 1 / count;
              range = [0, 1 - _offset];
            }
            option.range = range;
          }
          return option;
        },
      },
      {
        key: 'createScale',
        value: function createScale(option) {
          var type = option.type;
          if (isFunction(type)) {
            return new type(option);
          }
          var ScaleClass = getClass(type);
          return new ScaleClass(option);
        },
        // 更新或创建scale
      },
      {
        key: 'setScale',
        value: function setScale(field, option) {
          var options = this.options,
            scales = this.scales;
          options[field] = mix({}, options[field], option);
          // 如果scale有更新，scale 也需要重新创建
          if (scales[field]) {
            delete scales[field];
          }
        },
      },
      {
        key: 'create',
        value: function create(options) {
          this.update(options);
        },
      },
      {
        key: 'update',
        value: function update(options) {
          var _this = this;
          if (!options) return;
          each(options, function (option, field) {
            _this.setScale(field, option);
          });
          // 为了让外部感知到scale有变化
          this.scales = _objectSpread({}, this.scales);
        },
      },
      {
        key: 'changeData',
        value: function changeData(data) {
          this.data = data;
          this.scales = {};
        },
      },
      {
        key: 'getData',
        value: function getData() {
          return this.data;
        },
      },
      {
        key: 'getScale',
        value: function getScale(field) {
          var scales = this.scales,
            options = this.options,
            data = this.data;
          var scale = scales[field];
          if (scale) {
            return scale;
          }
          var option = options[field];
          if (!option) {
            return null;
          }
          var values = option.values ? option.values : data ? valuesOfKey(data, field) : [];
          var scaleOption = this._getOption(
            _objectSpread(
              _objectSpread({}, option),
              {},
              {
                field: field,
                values: values,
              }
            )
          );
          var newScale = this.createScale(scaleOption);
          scales[field] = newScale;
          return newScale;
        },
      },
      {
        key: 'getScales',
        value: function getScales() {
          var _this2 = this;
          var options = this.options,
            scales = this.scales;
          each(options, function (option, field) {
            _this2.getScale(field);
          });
          return scales;
        },
      },
      {
        key: 'adjustStartZero',
        value: function adjustStartZero(scale) {
          var options = this.options;
          var field = scale.field,
            min = scale.min,
            max = scale.max;
          var option = options[field];
          // 如果有定义，则不处理
          if (option && option.min) {
            return;
          }
          if (min > 0) {
            scale.change({
              min: 0,
            });
          } else if (max < 0) {
            scale.change({
              max: 0,
            });
          }
        },
        // 饼图下的scale调整
      },
      {
        key: 'adjustPieScale',
        value: function adjustPieScale(scale) {
          var options = this.options;
          var field = scale.field;
          var option = options[field];
          if (option && !isNil(option.nice)) {
            return null;
          }
          scale.change({
            nice: false,
          });
        },
        // 获取scale 在 0点对位置的值
      },
      {
        key: 'getZeroValue',
        value: function getZeroValue(scale) {
          var min = scale.min,
            max = scale.max;
          var value;
          if (min >= 0) {
            value = min;
          } else if (max <= 0) {
            value = max;
          } else {
            value = 0;
          }
          return scale.scale(value);
        },
      },
    ]);
    return ScaleController;
  })();

  // 统计图表
  var Chart = /*#__PURE__*/ (function (_Component) {
    _inherits(Chart, _Component);
    var _super = _createSuper(Chart);
    function Chart(props, context, updater) {
      var _this;
      _classCallCheck(this, Chart);
      _this = _super.call(this, props, context, updater);
      _this.componentsPosition = [];
      var data = props.data,
        coordOption = props.coord,
        _props$scale = props.scale,
        scale = _props$scale === void 0 ? [] : _props$scale;
      _this.layoutController = new LayoutController();
      _this.coordController = new coordController();
      _this.scaleController = new ScaleController(data);
      _this.scale = _this.scaleController;
      var _assertThisInitialize = _assertThisInitialized(_this),
        layoutController = _assertThisInitialize.layoutController,
        coordController$1 = _assertThisInitialize.coordController,
        scaleController = _assertThisInitialize.scaleController;
      // 布局
      var style = _this.getStyle(props, context);
      _this.layout = layoutController.create(style);
      // 坐标系
      _this.coord = coordController$1.create(coordOption, _this.layout);
      // scale
      scaleController.create(scale);
      _this.data = data;
      // state
      _this.state = {
        filters: {},
      };
      return _this;
    }
    // props 更新
    _createClass(Chart, [
      {
        key: 'willReceiveProps',
        value: function willReceiveProps(nextProps, context) {
          var layoutController = this.layoutController,
            coordController = this.coordController,
            scaleController = this.scaleController,
            lastProps = this.props;
          var nextStyle = nextProps.style,
            nextData = nextProps.data,
            nextScale = nextProps.scale;
          var lastStyle = lastProps.style,
            lastData = lastProps.data,
            lastScale = lastProps.scale;
          // 布局
          if (!equal(nextStyle, lastStyle) || context !== this.context) {
            var style = this.getStyle(nextProps, context);
            this.layout = layoutController.create(style);
            coordController.updateLayout(this.layout);
          }
          if (nextData !== lastData) {
            scaleController.changeData(nextData);
          }
          // scale
          if (!equal(nextScale, lastScale)) {
            scaleController.update(nextScale);
          }
        },
      },
      {
        key: 'willUpdate',
        value: function willUpdate() {
          var coordController = this.coordController,
            props = this.props;
          // render 时要重置 coord 范围，重置后需要让所有子组件都重新render
          // 所以这里不比较是否有差异，每次都新建，让所有子组件重新render
          this.coord = coordController.create(props.coord, this.layout);
        },
      },
      {
        key: 'getStyle',
        value: function getStyle(props, context) {
          var theme = context.theme,
            px2hd = context.px2hd,
            left = context.left,
            top = context.top,
            width = context.width,
            height = context.height;
          var style = props.style;
          return px2hd(
            _objectSpread(
              _objectSpread(
                {
                  left: left,
                  top: top,
                  width: width,
                  height: height,
                },
                theme.chart
              ),
              style
            )
          );
        },
        // 给需要显示的组件留空
      },
      {
        key: 'layoutCoord',
        value: function layoutCoord(layout) {
          var coord = this.coord,
            props = this.props;
          var position = layout.position,
            boxWidth = layout.width,
            boxHeight = layout.height;
          var left = coord.left,
            top = coord.top,
            width = coord.width,
            height = coord.height;
          switch (position) {
            case 'left':
              left += boxWidth;
              width = Math.max(0, width - boxWidth);
              break;
            case 'right':
              width = Math.max(0, width - boxWidth);
              break;
            case 'top':
              top += boxHeight;
              height = Math.max(0, height - boxHeight);
              break;
            case 'bottom':
              height = Math.max(0, height - boxHeight);
              break;
          }
          coord.update(
            _objectSpread(
              _objectSpread({}, props.coord),
              {},
              {
                left: left,
                top: top,
                width: width,
                height: height,
              }
            )
          );
        },
      },
      {
        key: 'resetCoordLayout',
        value: function resetCoordLayout() {
          var coord = this.coord,
            layout = this.layout;
          coord.update(layout);
        },
      },
      {
        key: 'updateCoordLayout',
        value: function updateCoordLayout(layout) {
          var _this2 = this;
          if (isArray(layout)) {
            layout.forEach(function (item) {
              _this2.layoutCoord(item);
            });
            return;
          }
          this.layoutCoord(layout);
        },
      },
      {
        key: 'updateCoordFor',
        value: function updateCoordFor(component, layout) {
          var _this3 = this;
          if (!layout) return;
          var componentsPosition = this.componentsPosition;
          var componentPosition = {
            component: component,
            layout: layout,
          };
          var existIndex = findIndex(componentsPosition, function (item) {
            return item.component === component;
          });
          // 说明是已经存在的组件
          if (existIndex > -1) {
            componentsPosition.splice(existIndex, 1, componentPosition);
            // 先重置，然后整体重新算一次
            this.resetCoordLayout();
            componentsPosition.forEach(function (componentPosition) {
              var layout = componentPosition.layout;
              _this3.updateCoordLayout(layout);
            });
            return;
          }
          // 是新组件，直接添加
          componentsPosition.push(componentPosition);
          this.updateCoordLayout(layout);
        },
      },
      {
        key: 'getGeometrys',
        value: function getGeometrys() {
          var children = this.children;
          var geometrys = [];
          // @ts-ignore
          Children.toArray(children).forEach(function (element) {
            if (!element) return false;
            var component = element.component;
            if (component && component.isGeometry) {
              geometrys.push(component);
            }
          });
          return geometrys;
        },
        /**
         * calculate dataset's position on canvas
         * @param  {Object} record the dataset
         * @return {Object} return the position
         */
      },
      {
        key: 'getPosition',
        value: function getPosition(record) {
          var coord = this.getCoord();
          var xScale = this.getXScales()[0];
          var xField = xScale.field;
          var yScales = this.getYScales();
          // default first
          var yScale = yScales[0];
          var yField = yScale.field;
          for (var i = 0, len = yScales.length; i < len; i++) {
            var scale = yScales[i];
            var field = scale.field;
            if (record[field]) {
              yScale = scale;
              yField = field;
              break;
            }
          }
          var x = xScale.scale(record[xField]);
          var y = yScale.scale(record[yField]);
          return coord.convertPoint({
            x: x,
            y: y,
          });
        },
      },
      {
        key: 'getSnapRecords',
        value: function getSnapRecords(point, inCoordRange) {
          var geometrys = this.getGeometrys();
          if (!geometrys.length) return;
          // @ts-ignore
          return geometrys[0].getSnapRecords(point, inCoordRange);
        },
      },
      {
        key: 'getRecords',
        value: function getRecords(data, field) {
          var geometrys = this.getGeometrys();
          if (!geometrys.length) return;
          // @ts-ignore
          return geometrys[0].getRecords(data, field);
        },
      },
      {
        key: 'getLegendItems',
        value: function getLegendItems(point) {
          var geometrys = this.getGeometrys();
          if (!geometrys.length) return;
          // @ts-ignore
          return geometrys[0].getLegendItems(point);
        },
      },
      {
        key: 'setScale',
        value: function setScale(field, option) {
          this.scaleController.setScale(field, option);
        },
      },
      {
        key: 'getScale',
        value: function getScale(field) {
          return this.scaleController.getScale(field);
        },
      },
      {
        key: 'getScales',
        value: function getScales() {
          return this.scaleController.getScales();
        },
      },
      {
        key: 'getXScales',
        value: function getXScales() {
          var geometrys = this.getGeometrys();
          return geometrys.map(function (component) {
            // @ts-ignore
            return component.getXScale();
          });
        },
      },
      {
        key: 'getYScales',
        value: function getYScales() {
          var geometrys = this.getGeometrys();
          return geometrys.map(function (component) {
            // @ts-ignore
            return component.getYScale();
          });
        },
      },
      {
        key: 'getCoord',
        value: function getCoord() {
          return this.coord;
        },
      },
      {
        key: 'filter',
        value: function filter(field, condition) {
          var filters = this.state.filters;
          this.setState({
            filters: _objectSpread(
              _objectSpread({}, filters),
              {},
              _defineProperty({}, field, condition)
            ),
          });
        },
      },
      {
        key: '_getRenderData',
        value: function _getRenderData() {
          var props = this.props,
            state = this.state;
          var data = props.data;
          var filters = state.filters;
          if (!filters || !Object.keys(filters).length) {
            return data;
          }
          var filteredData = data;
          each(filters, function (condition, field) {
            if (!condition) return;
            filteredData = filteredData.filter(function (record) {
              return condition(record[field], record);
            });
          });
          return filteredData;
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this4 = this;
          var props = this.props,
            layout = this.layout,
            coord = this.coord;
          var children = props.children,
            originData = props.data;
          if (!originData) return null;
          var data = this._getRenderData();
          return Children.map(children, function (child) {
            return Children.cloneElement(child, {
              chart: _this4,
              coord: coord,
              data: data,
              layout: layout,
            });
          });
        },
      },
    ]);
    return Chart;
  })(Component);

  function isEqual(origin1, origin2, fields) {
    if (origin1 === origin2) {
      return true;
    }
    for (var i = 0, len = fields.length; i < len; i++) {
      var field = fields[i];
      if (origin1[field] !== origin2[field]) {
        return false;
      }
    }
    return true;
  }
  var Selection = /*#__PURE__*/ (function (_Component) {
    _inherits(Selection, _Component);
    var _super = _createSuper(Selection);
    function Selection(props, context) {
      var _this;
      _classCallCheck(this, Selection);
      _this = _super.call(this, props, context);
      var selection = props.selection;
      if (!selection) return _possibleConstructorReturn(_this);
      var defaultSelected = selection.defaultSelected;
      _this.state.selected = defaultSelected;
      return _this;
    }
    _createClass(Selection, [
      {
        key: 'didMount',
        value: function didMount() {
          var _this2 = this;
          var props = this.props,
            state = this.state,
            container = this.container;
          var canvas = container.get('canvas');
          var selection = props.selection,
            chart = props.chart;
          if (!selection) return;
          // 默认为 click
          var _selection$triggerOn = selection.triggerOn,
            triggerOn = _selection$triggerOn === void 0 ? 'click' : _selection$triggerOn;
          canvas.on(triggerOn, function (ev) {
            var points = ev.points;
            var records = _this2.getSnapRecords(points[0]);
            var _selection$type = selection.type,
              type = _selection$type === void 0 ? 'single' : _selection$type,
              _selection$cancelable = selection.cancelable,
              cancelable = _selection$cancelable === void 0 ? true : _selection$cancelable;
            if (!records || !records.length) {
              if (cancelable) {
                _this2.setState({
                  selected: null,
                });
              }
              return;
            }
            var selected = state.selected;
            var origins = records.map(function (record) {
              return record.origin;
            });
            if (!selected || !selected.length) {
              _this2.setState({
                selected: origins,
              });
            }
            if (type === 'single') {
              if (!cancelable) {
                _this2.setState({
                  selected: origins,
                });
                return;
              }
              var _newSelected = [];
              records.forEach(function (record) {
                if (!_this2.isSelected(record)) {
                  _newSelected.push(record.origin);
                }
              });
              _this2.setState({
                selected: _newSelected,
              });
              return;
            }
            // 多选
            var scales = chart.getScales();
            var fields = Object.keys(scales);
            var selectedMap = {};
            selected.forEach(function (item) {
              var key = fields
                .map(function (field) {
                  return item[field];
                })
                .join('-');
              selectedMap[key] = item;
            });
            records.forEach(function (record) {
              var origin = record.origin;
              var key = fields
                .map(function (field) {
                  return origin[field];
                })
                .join('-');
              selectedMap[key] = selectedMap[key] ? null : origin;
            });
            var newSelected = Object.keys(selectedMap)
              .map(function (key) {
                return selectedMap[key];
              })
              .filter(Boolean);
            _this2.setState({
              selected: newSelected,
            });
          });
        },
      },
      {
        key: 'willReceiveProps',
        value: function willReceiveProps(nextProps) {
          var nextSelection = nextProps.selection;
          var lastSelection = this.props.selection;
          if (!nextSelection || !lastSelection) {
            return;
          }
          var nextDefaultSelected = nextSelection.defaultSelected;
          var lastDefaultSelected = lastSelection.defaultSelected;
          if (!equal(nextDefaultSelected, lastDefaultSelected)) {
            this.state.selected = nextDefaultSelected;
          }
        },
      },
      {
        key: 'getSnapRecords',
        value: function getSnapRecords(_point) {
          return null;
        },
      },
      {
        key: 'isSelected',
        value: function isSelected(record) {
          var state = this.state,
            props = this.props;
          var selected = state.selected;
          if (!selected || !selected.length) {
            return false;
          }
          var chart = props.chart;
          var scales = chart.getScales();
          var fields = Object.keys(scales);
          for (var i = 0, len = selected.length; i < len; i++) {
            var item = selected[i];
            if (isEqual(record.origin, item, fields)) {
              return true;
            }
          }
          return false;
        },
      },
      {
        key: 'getSelectionStyle',
        value: function getSelectionStyle(record) {
          var state = this.state,
            props = this.props;
          var selected = state.selected;
          if (!selected || !selected.length) {
            return null;
          }
          var selection = props.selection;
          var selectedStyle = selection.selectedStyle,
            unSelectedStyle = selection.unSelectedStyle;
          var isSelected = this.isSelected(record);
          if (isSelected) {
            return isFunction(selectedStyle) ? selectedStyle(record) : selectedStyle;
          }
          return isFunction(unSelectedStyle) ? unSelectedStyle(record) : unSelectedStyle;
        },
      },
    ]);
    return Selection;
  })(Component);

  var DEFAULT_Y = 0; // 默认的 y 的值
  // 偏移之后，间距
  var MARGIN_RATIO = 1 / 2;
  var DODGE_RATIO = 1 / 2;
  // 散点分开之后，距离边界的距离
  var GAP = 0.05;

  var Adjust = /** @class */ (function () {
    function Adjust(cfg) {
      var xField = cfg.xField,
        yField = cfg.yField,
        _a = cfg.adjustNames,
        adjustNames = _a === void 0 ? ['x', 'y'] : _a,
        dimValuesMap = cfg.dimValuesMap;
      this.adjustNames = adjustNames;
      this.xField = xField;
      this.yField = yField;
      this.dimValuesMap = dimValuesMap;
    }
    /**
     * 查看维度是否是 adjust 字段
     * @param dim
     */
    Adjust.prototype.isAdjust = function (dim) {
      return this.adjustNames.indexOf(dim) >= 0;
    };
    Adjust.prototype.getAdjustRange = function (dim, dimValue, values) {
      var yField = this.yField;
      var index = values.indexOf(dimValue);
      var length = values.length;
      var pre;
      var next;
      // 没有 y 字段，但是需要根据 y 调整
      if (!yField && this.isAdjust('y')) {
        pre = 0;
        next = 1;
      } else if (length > 1) {
        // 如果以其开头，则取之，否则取他前面一个
        pre = values[index === 0 ? 0 : index - 1];
        // 如果以其结尾，则取之，否则取他后面一个
        next = values[index === length - 1 ? length - 1 : index + 1];
        if (index !== 0) {
          pre += (dimValue - pre) / 2;
        } else {
          pre -= (next - dimValue) / 2;
        }
        if (index !== length - 1) {
          next -= (next - dimValue) / 2;
        } else {
          next += (dimValue - values[length - 2]) / 2;
        }
      } else {
        pre = dimValue === 0 ? 0 : dimValue - 0.5;
        next = dimValue === 0 ? 1 : dimValue + 0.5;
      }
      return {
        pre: pre,
        next: next,
      };
    };
    Adjust.prototype.adjustData = function (groupedDataArray, mergedData) {
      var _this = this;
      // 所有调整维度的值数组
      var dimValuesMap = this.getDimValues(mergedData);
      // 按照每一个分组来进行调整
      each(groupedDataArray, function (dataArray, index) {
        // 遍历所有数据集合
        // 每个分组中，分别按照不同的 dim 进行调整
        each(dimValuesMap, function (values, dim) {
          // 根据不同的度量分别调整位置
          _this.adjustDim(dim, values, dataArray, index);
        });
      });
    };
    /**
     * 对数据进行分组adjustData
     * @param data 数据
     * @param dim 分组的字段
     * @return 分组结果
     */
    Adjust.prototype.groupData = function (data, dim) {
      // 补齐数据空数据为默认值
      each(data, function (record) {
        if (record[dim] === undefined) {
          record[dim] = DEFAULT_Y;
        }
      });
      // 按照 dim 维度分组
      return groupBy(data, dim);
    };
    /** @override */
    Adjust.prototype.adjustDim = function (dim, values, data, index) {};
    /**
     * 获取可调整度量对应的值
     * @param mergedData 数据
     * @return 值的映射
     */
    Adjust.prototype.getDimValues = function (mergedData) {
      var _a = this,
        xField = _a.xField,
        yField = _a.yField;
      var dimValuesMap = mix({}, this.dimValuesMap);
      // 所有的维度
      var dims = [];
      if (xField && this.isAdjust('x')) {
        dims.push(xField);
      }
      if (yField && this.isAdjust('y')) {
        dims.push(yField);
      }
      dims.forEach(function (dim) {
        if (dimValuesMap && dimValuesMap[dim]) {
          return;
        }
        // 在每个维度上，所有的值
        dimValuesMap[dim] = valuesOfKey(mergedData, dim).sort(function (v1, v2) {
          return v1 - v2;
        });
      });
      // 只有一维的情况下，同时调整 y，赋予默认值
      if (!yField && this.isAdjust('y')) {
        var dim = 'y';
        dimValuesMap[dim] = [DEFAULT_Y, 1]; // 默认分布在 y 轴的 0 与 1 之间
      }
      return dimValuesMap;
    };
    return Adjust;
  })();

  var ADJUST_MAP = {};
  /**
   * 根据类型获取 Adjust 类
   * @param type
   */
  var getAdjust = function (type) {
    return ADJUST_MAP[type.toLowerCase()];
  };
  /**
   * 注册自定义 Adjust
   * @param type
   * @param ctor
   */
  var registerAdjust = function (type, ctor) {
    // 注册的时候，需要校验 type 重名，不区分大小写
    if (getAdjust(type)) {
      throw new Error("Adjust type '" + type + "' existed.");
    }
    // 存储到 map 中
    ADJUST_MAP[type.toLowerCase()] = ctor;
  };

  /*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
  /* global Reflect, Promise */

  var _extendStatics = function extendStatics(d, b) {
    _extendStatics =
      Object.setPrototypeOf ||
      ({
        __proto__: [],
      } instanceof Array &&
        function (d, b) {
          d.__proto__ = b;
        }) ||
      function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return _extendStatics(d, b);
  };
  function __extends$1(d, b) {
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  }
  var _assign = function __assign() {
    _assign =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return _assign.apply(this, arguments);
  };

  var Dodge = /** @class */ (function (_super) {
    __extends$1(Dodge, _super);
    function Dodge(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.cacheMap = {};
      _this.adjustDataArray = [];
      _this.mergeData = [];
      var _a = cfg.marginRatio,
        marginRatio = _a === void 0 ? MARGIN_RATIO : _a,
        _b = cfg.dodgeRatio,
        dodgeRatio = _b === void 0 ? DODGE_RATIO : _b,
        dodgeBy = cfg.dodgeBy,
        intervalPadding = cfg.intervalPadding,
        dodgePadding = cfg.dodgePadding,
        xDimensionLength = cfg.xDimensionLength,
        groupNum = cfg.groupNum,
        defaultSize = cfg.defaultSize,
        maxColumnWidth = cfg.maxColumnWidth,
        minColumnWidth = cfg.minColumnWidth,
        columnWidthRatio = cfg.columnWidthRatio,
        customOffset = cfg.customOffset;
      _this.marginRatio = marginRatio;
      _this.dodgeRatio = dodgeRatio;
      _this.dodgeBy = dodgeBy;
      _this.intervalPadding = intervalPadding;
      _this.dodgePadding = dodgePadding;
      _this.xDimensionLegenth = xDimensionLength;
      _this.groupNum = groupNum;
      _this.defaultSize = defaultSize;
      _this.maxColumnWidth = maxColumnWidth;
      _this.minColumnWidth = minColumnWidth;
      _this.columnWidthRatio = columnWidthRatio;
      _this.customOffset = customOffset;
      return _this;
    }
    Dodge.prototype.process = function (groupDataArray) {
      var groupedDataArray = clone(groupDataArray);
      // 将数据数组展开一层
      var mergeData = flatten(groupedDataArray);
      var dodgeBy = this.dodgeBy;
      // 如果指定了分组 dim 的字段
      var adjustDataArray = dodgeBy ? group(mergeData, dodgeBy) : groupedDataArray;
      this.cacheMap = {};
      this.adjustDataArray = adjustDataArray;
      this.mergeData = mergeData;
      this.adjustData(adjustDataArray, mergeData);
      this.adjustDataArray = [];
      this.mergeData = [];
      return groupedDataArray;
    };
    Dodge.prototype.adjustDim = function (dim, values, data, frameIndex) {
      var _this = this;
      var customOffset = this.customOffset;
      var map = this.getDistribution(dim);
      var groupData = this.groupData(data, dim); // 根据值分组
      each(groupData, function (group, key) {
        var range;
        // xField 中只有一个值，不需要做 dodge
        if (values.length === 1) {
          range = {
            pre: values[0] - 1,
            next: values[0] + 1,
          };
        } else {
          // 如果有多个，则需要获取调整的范围
          range = _this.getAdjustRange(dim, parseFloat(key), values);
        }
        each(group, function (d) {
          var value = d[dim];
          var valueArr = map[value];
          var valIndex = valueArr.indexOf(frameIndex);
          if (!isNil(customOffset)) {
            var pre = range.pre,
              next = range.next;
            d[dim] = isFunction(customOffset)
              ? customOffset(d, range)
              : (pre + next) / 2 + customOffset;
          } else {
            d[dim] = _this.getDodgeOffset(range, valIndex, valueArr.length);
          }
        });
      });
      return [];
    };
    Dodge.prototype.getDodgeOffset = function (range, idx, len) {
      var _a = this,
        dodgeRatio = _a.dodgeRatio,
        marginRatio = _a.marginRatio,
        intervalPadding = _a.intervalPadding,
        dodgePadding = _a.dodgePadding;
      var pre = range.pre,
        next = range.next;
      var tickLength = next - pre;
      var position;
      // 分多种输入情况
      if (!isNil(intervalPadding) && isNil(dodgePadding) && intervalPadding >= 0) {
        // 仅配置intervalPadding
        var offset = this.getIntervalOnlyOffset(len, idx);
        position = pre + offset;
      } else if (!isNil(dodgePadding) && isNil(intervalPadding) && dodgePadding >= 0) {
        // 仅配置dodgePadding
        var offset = this.getDodgeOnlyOffset(len, idx);
        position = pre + offset;
      } else if (
        !isNil(intervalPadding) &&
        !isNil(dodgePadding) &&
        intervalPadding >= 0 &&
        dodgePadding >= 0
      ) {
        // 同时配置intervalPadding和dodgePadding
        var offset = this.getIntervalAndDodgeOffset(len, idx);
        position = pre + offset;
      } else {
        // 默认情况
        var width = (tickLength * dodgeRatio) / len;
        var margin = marginRatio * width;
        var offset =
          (1 / 2) * (tickLength - len * width - (len - 1) * margin) +
          ((idx + 1) * width + idx * margin) -
          (1 / 2) * width -
          (1 / 2) * tickLength;
        position = (pre + next) / 2 + offset;
      }
      return position;
    };
    Dodge.prototype.getIntervalOnlyOffset = function (len, idx) {
      var _a = this,
        defaultSize = _a.defaultSize,
        intervalPadding = _a.intervalPadding,
        xDimensionLegenth = _a.xDimensionLegenth,
        groupNum = _a.groupNum,
        dodgeRatio = _a.dodgeRatio,
        maxColumnWidth = _a.maxColumnWidth,
        minColumnWidth = _a.minColumnWidth,
        columnWidthRatio = _a.columnWidthRatio;
      var normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
      var normalizedDodgePadding =
        (((1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum) * dodgeRatio) / (len - 1);
      var geomWidth =
        ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum -
          normalizedDodgePadding * (len - 1)) /
        len;
      // 根据columnWidthRatio/defaultSize/maxColumnWidth/minColumnWidth调整宽度
      geomWidth = !isNil(columnWidthRatio) ? (1 / groupNum / len) * columnWidthRatio : geomWidth;
      if (!isNil(maxColumnWidth)) {
        var normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
        geomWidth = Math.min(geomWidth, normalizedMaxWidht);
      }
      if (!isNil(minColumnWidth)) {
        var normalizedMinWidht = minColumnWidth / xDimensionLegenth;
        geomWidth = Math.max(geomWidth, normalizedMinWidht);
      }
      geomWidth = defaultSize ? defaultSize / xDimensionLegenth : geomWidth;
      // 调整组内间隔
      normalizedDodgePadding =
        ((1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum - len * geomWidth) / (len - 1);
      var offset =
        ((1 / 2 + idx) * geomWidth +
          idx * normalizedDodgePadding +
          (1 / 2) * normalizedIntervalPadding) *
          groupNum -
        normalizedIntervalPadding / 2;
      return offset;
    };
    Dodge.prototype.getDodgeOnlyOffset = function (len, idx) {
      var _a = this,
        defaultSize = _a.defaultSize,
        dodgePadding = _a.dodgePadding,
        xDimensionLegenth = _a.xDimensionLegenth,
        groupNum = _a.groupNum,
        marginRatio = _a.marginRatio,
        maxColumnWidth = _a.maxColumnWidth,
        minColumnWidth = _a.minColumnWidth,
        columnWidthRatio = _a.columnWidthRatio;
      var normalizedDodgePadding = dodgePadding / xDimensionLegenth;
      var normalizedIntervalPadding = (1 * marginRatio) / (groupNum - 1);
      var geomWidth =
        ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum -
          normalizedDodgePadding * (len - 1)) /
        len;
      // 根据columnWidthRatio/defaultSize/maxColumnWidth/minColumnWidth调整宽度
      geomWidth = columnWidthRatio ? (1 / groupNum / len) * columnWidthRatio : geomWidth;
      if (!isNil(maxColumnWidth)) {
        var normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
        geomWidth = Math.min(geomWidth, normalizedMaxWidht);
      }
      if (!isNil(minColumnWidth)) {
        var normalizedMinWidht = minColumnWidth / xDimensionLegenth;
        geomWidth = Math.max(geomWidth, normalizedMinWidht);
      }
      geomWidth = defaultSize ? defaultSize / xDimensionLegenth : geomWidth;
      // 调整组间距
      normalizedIntervalPadding =
        (1 - (geomWidth * len + normalizedDodgePadding * (len - 1)) * groupNum) / (groupNum - 1);
      var offset =
        ((1 / 2 + idx) * geomWidth +
          idx * normalizedDodgePadding +
          (1 / 2) * normalizedIntervalPadding) *
          groupNum -
        normalizedIntervalPadding / 2;
      return offset;
    };
    Dodge.prototype.getIntervalAndDodgeOffset = function (len, idx) {
      var _a = this,
        intervalPadding = _a.intervalPadding,
        dodgePadding = _a.dodgePadding,
        xDimensionLegenth = _a.xDimensionLegenth,
        groupNum = _a.groupNum;
      var normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
      var normalizedDodgePadding = dodgePadding / xDimensionLegenth;
      var geomWidth =
        ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum -
          normalizedDodgePadding * (len - 1)) /
        len;
      var offset =
        ((1 / 2 + idx) * geomWidth +
          idx * normalizedDodgePadding +
          (1 / 2) * normalizedIntervalPadding) *
          groupNum -
        normalizedIntervalPadding / 2;
      return offset;
    };
    Dodge.prototype.getDistribution = function (dim) {
      var groupedDataArray = this.adjustDataArray;
      var cacheMap = this.cacheMap;
      var map = cacheMap[dim];
      if (!map) {
        map = {};
        each(groupedDataArray, function (data, index) {
          var values = valuesOfKey(data, dim);
          if (!values.length) {
            values.push(0);
          }
          each(values, function (val) {
            if (!map[val]) {
              map[val] = [];
            }
            map[val].push(index);
          });
        });
        cacheMap[dim] = map;
      }
      return map;
    };
    return Dodge;
  })(Adjust);

  function randomNumber(min, max) {
    return (max - min) * Math.random() + min;
  }
  var Jitter = /** @class */ (function (_super) {
    __extends$1(Jitter, _super);
    function Jitter() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Jitter.prototype.process = function (groupDataArray) {
      var groupedDataArray = clone(groupDataArray);
      // 之前分组之后的数据，然后有合并回去（和分组前可以理解成是一样的）
      var mergeData = flatten(groupedDataArray);
      // 返回值
      this.adjustData(groupedDataArray, mergeData);
      return groupedDataArray;
    };
    /**
     * 当前数据分组（index）中，按照维度 dim 进行 jitter 调整
     * @param dim
     * @param values
     * @param dataArray
     */
    Jitter.prototype.adjustDim = function (dim, values, dataArray) {
      var _this = this;
      // 在每一个分组中，将数据再按照 dim 分组，用于散列
      var groupDataArray = this.groupData(dataArray, dim);
      return each(groupDataArray, function (data, dimValue) {
        return _this.adjustGroup(data, dim, parseFloat(dimValue), values);
      });
    };
    // 随机出来的字段值
    Jitter.prototype.getAdjustOffset = function (range) {
      var pre = range.pre,
        next = range.next;
      // 随机的范围
      var margin = (next - pre) * GAP;
      return randomNumber(pre + margin, next - margin);
    };
    // adjust group data
    Jitter.prototype.adjustGroup = function (group, dim, dimValue, values) {
      var _this = this;
      // 调整范围
      var range = this.getAdjustRange(dim, dimValue, values);
      each(group, function (data) {
        data[dim] = _this.getAdjustOffset(range); // 获取调整的位置
      });
      return group;
    };
    return Jitter;
  })(Adjust);

  var Cache = default_1;
  var Stack = /** @class */ (function (_super) {
    __extends$1(Stack, _super);
    function Stack(cfg) {
      var _this = _super.call(this, cfg) || this;
      var _a = cfg.adjustNames,
        adjustNames = _a === void 0 ? ['y'] : _a,
        _b = cfg.height,
        height = _b === void 0 ? NaN : _b,
        _c = cfg.size,
        size = _c === void 0 ? 10 : _c,
        _d = cfg.reverseOrder,
        reverseOrder = _d === void 0 ? false : _d;
      _this.adjustNames = adjustNames;
      _this.height = height;
      _this.size = size;
      _this.reverseOrder = reverseOrder;
      return _this;
    }
    /**
     * 方法入参是经过数据分组、数据数字化之后的二维数组
     * @param groupDataArray 分组之后的数据
     */
    Stack.prototype.process = function (groupDataArray) {
      var _a = this,
        yField = _a.yField,
        reverseOrder = _a.reverseOrder;
      // 如果有指定 y 字段，那么按照 y 字段来 stack
      // 否则，按照高度均分
      var d = yField ? this.processStack(groupDataArray) : this.processOneDimStack(groupDataArray);
      return reverseOrder ? this.reverse(d) : d;
    };
    Stack.prototype.reverse = function (groupedDataArray) {
      return groupedDataArray.slice(0).reverse();
    };
    Stack.prototype.processStack = function (groupDataArray) {
      var _a = this,
        xField = _a.xField,
        yField = _a.yField,
        reverseOrder = _a.reverseOrder;
      // 层叠顺序翻转
      var groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;
      // 用来缓存，正数和负数的堆叠问题
      var positive = new Cache();
      var negative = new Cache();
      return groupedDataArray.map(function (dataArray) {
        return dataArray.map(function (data) {
          var _a;
          var x = get(data, xField, 0);
          var y = get(data, [yField]);
          var xKey = x.toString();
          // todo 是否应该取 _origin？因为 y 可能取到的值不正确，比如先 symmetric，再 stack！
          y = isArray(y) ? y[1] : y;
          if (!isNil(y)) {
            var cache = y >= 0 ? positive : negative;
            if (!cache.has(xKey)) {
              cache.set(xKey, 0);
            }
            var xValue = cache.get(xKey);
            var newXValue = y + xValue;
            // 存起来
            cache.set(xKey, newXValue);
            return _assign(_assign({}, data), ((_a = {}), (_a[yField] = [xValue, newXValue]), _a));
          }
          // 没有修改，则直接返回
          return data;
        });
      });
    };
    Stack.prototype.processOneDimStack = function (groupDataArray) {
      var _this = this;
      var _a = this,
        xField = _a.xField,
        height = _a.height,
        reverseOrder = _a.reverseOrder;
      var yField = 'y';
      // 如果层叠的顺序翻转
      var groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;
      // 缓存累加数据
      var cache = new Cache();
      return groupedDataArray.map(function (dataArray) {
        return dataArray.map(function (data) {
          var _a;
          var size = _this.size;
          var xValue = data[xField];
          // todo 没有看到这个 stack 计算原理
          var stackHeight = (size * 2) / height;
          if (!cache.has(xValue)) {
            cache.set(xValue, stackHeight / 2); // 初始值大小
          }
          var stackValue = cache.get(xValue);
          // 增加一层 stackHeight
          cache.set(xValue, stackValue + stackHeight);
          return _assign(_assign({}, data), ((_a = {}), (_a[yField] = stackValue), _a));
        });
      });
    };
    return Stack;
  })(Adjust);

  var Symmetric = /** @class */ (function (_super) {
    __extends$1(Symmetric, _super);
    function Symmetric() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Symmetric.prototype.process = function (groupDataArray) {
      var mergeData = flatten(groupDataArray);
      var _a = this,
        xField = _a.xField,
        yField = _a.yField;
      // 每个 x 值对应的 最大值
      var cache = this.getXValuesMaxMap(mergeData);
      // 所有数据的最大的值
      var max = Math.max.apply(
        Math,
        Object.keys(cache).map(function (key) {
          return cache[key];
        })
      );
      return map(groupDataArray, function (dataArray) {
        return map(dataArray, function (data) {
          var _a, _b;
          var yValue = data[yField];
          var xValue = data[xField];
          // 数组处理逻辑
          if (isArray(yValue)) {
            var off_1 = (max - cache[xValue]) / 2;
            return _assign(
              _assign({}, data),
              ((_a = {}),
              (_a[yField] = map(yValue, function (y) {
                return off_1 + y;
              })),
              _a)
            );
          }
          // 非数组处理逻辑
          var offset = (max - yValue) / 2;
          return _assign(
            _assign({}, data),
            ((_b = {}), (_b[yField] = [offset, yValue + offset]), _b)
          );
        });
      });
    };
    // 获取每个 x 对应的最大的值
    Symmetric.prototype.getXValuesMaxMap = function (mergeData) {
      var _this = this;
      var _a = this,
        xField = _a.xField,
        yField = _a.yField;
      // 根据 xField 的值进行分组
      var groupDataArray = groupBy(mergeData, function (data) {
        return data[xField];
      });
      // 获取每个 xField 值中的最大值
      return mapValues(groupDataArray, function (dataArray) {
        return _this.getDimMaxValue(dataArray, yField);
      });
    };
    Symmetric.prototype.getDimMaxValue = function (mergeData, dim) {
      // 所有的 value 值
      var dimValues = map(mergeData, function (data) {
        return get(data, dim, []);
      });
      // 将数组打平（dim value 有可能是数组，比如 stack 之后的）
      var flattenValues = flatten(dimValues);
      // 求出数组的最大值
      return Math.max.apply(Math, flattenValues);
    };
    return Symmetric;
  })(Adjust);

  // 注册内置的 adjust
  registerAdjust('Dodge', Dodge);
  registerAdjust('Jitter', Jitter);
  registerAdjust('Stack', Stack);
  registerAdjust('Symmetric', Symmetric);

  var Base$1 = /*#__PURE__*/ (function () {
    function Base(options) {
      _classCallCheck(this, Base);
      mix(this, options);
      var scale = this.scale,
        field = this.field,
        data = this.data;
      if (!scale && data) {
        var values = valuesOfKey(data, field);
        this.scale = this.createScale({
          values: values,
          field: field,
        });
      }
    }
    _createClass(Base, [
      {
        key: 'createScale',
        value: function createScale(_scaleConfig) {
          return null;
        },
        // 数据映射方法
      },
      {
        key: '_mapping',
        value: function _mapping(value) {
          return value;
        },
      },
      {
        key: 'update',
        value: function update(options) {
          mix(this, options);
        },
      },
      {
        key: 'setRange',
        value: function setRange(range) {
          this.range = range;
        },
        // 归一化，参数是原始数据，返回是归一化的数据
      },
      {
        key: 'normalize',
        value: function normalize(value) {
          var scale = this.scale;
          if (isArray(value)) {
            return value.map(function (v) {
              return scale.scale(v);
            });
          }
          return scale.scale(value);
        },
        // convert 参数是归一化的数据，返回定义域的值
      },
      {
        key: 'convert',
        value: function convert(value) {
          return value;
        },
        // 等于 normalize + convert， 参数是原始数据，返回是定义域的值
      },
      {
        key: 'mapping',
        value: function mapping(value) {
          var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var rst = isFunction(this.callback) ? this.callback(value, child) : null;
          if (!isNil(rst)) {
            return rst;
          }
          return this._mapping(value);
        },
      },
    ]);
    return Base;
  })();

  var Linear$1 = /*#__PURE__*/ (function (_Base) {
    _inherits(Linear$1, _Base);
    var _super = _createSuper(Linear$1);
    function Linear$1(options) {
      var _this;
      _classCallCheck(this, Linear$1);
      _this = _super.call(this, options);
      _this._updateInterpolate();
      return _this;
    }
    _createClass(Linear$1, [
      {
        key: 'createScale',
        value: function createScale(scaleConfig) {
          return new Linear(scaleConfig);
        },
      },
      {
        key: '_updateInterpolate',
        value: function _updateInterpolate() {
          var _this$range = _slicedToArray(this.range, 2),
            min = _this$range[0],
            max = _this$range[1];
          this.interpolate = interpolate(min, max);
        },
      },
      {
        key: 'update',
        value: function update(options) {
          _get$1(_getPrototypeOf(Linear$1.prototype), 'update', this).call(this, options);
          this._updateInterpolate();
        },
      },
      {
        key: '_mapping',
        value: function _mapping(value) {
          var scale = this.scale,
            interpolate = this.interpolate;
          if (isArray(value)) {
            return value.map(function (v) {
              return interpolate(scale.scale(v));
            });
          }
          return interpolate(scale.scale(value));
        },
      },
      {
        key: 'normalize',
        value: function normalize(value) {
          var scale = this.scale;
          if (isArray(value)) {
            return value.map(function (v) {
              return scale.scale(v);
            });
          }
          return scale.scale(value);
        },
      },
      {
        key: 'convert',
        value: function convert(value) {
          var range = this.range;
          var _range = _slicedToArray(range, 2),
            min = _range[0],
            max = _range[1];
          if (isArray(value)) {
            return value.map(function (v) {
              return min + (max - min) * v;
            });
          }
          return min + (max - min) * value;
        },
      },
    ]);
    return Linear$1;
  })(Base$1);

  var Category$1 = /*#__PURE__*/ (function (_Base) {
    _inherits(Category$1, _Base);
    var _super = _createSuper(Category$1);
    function Category$1() {
      _classCallCheck(this, Category$1);
      return _super.apply(this, arguments);
    }
    _createClass(Category$1, [
      {
        key: 'createScale',
        value: function createScale(scaleConfig) {
          return new Category(scaleConfig);
        },
      },
      {
        key: '_mapping',
        value: function _mapping(value) {
          var scale = this.scale,
            range = this.range;
          if (scale.type === 'cat') {
            var _index = scale.translate(value);
            return range[_index % range.length];
          }
          var normalizeValue = scale.scale(value);
          var index = Math.round(normalizeValue * (range.length - 1));
          return range[index];
        },
      },
    ]);
    return Category$1;
  })(Base$1);

  var Identity$1 = /*#__PURE__*/ (function (_Base) {
    _inherits(Identity$1, _Base);
    var _super = _createSuper(Identity$1);
    function Identity$1() {
      _classCallCheck(this, Identity$1);
      return _super.apply(this, arguments);
    }
    _createClass(Identity$1, [
      {
        key: 'createScale',
        value: function createScale(scaleConfig) {
          return new Identity(scaleConfig);
        },
      },
      {
        key: '_mapping',
        value: function _mapping() {
          var field = this.field,
            range = this.range;
          return field || (range && range[0]);
        },
      },
    ]);
    return Identity$1;
  })(Base$1);

  var Attrs = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Attr: Base$1,
    Linear: Linear$1,
    Category: Category$1,
    Identity: Identity$1,
  });

  var Identity$2 = Identity$1,
    Linear$2 = Linear$1,
    Category$2 = Category$1;
  // 需要映射的属性名
  var ATTRS = ['x', 'y', 'color', 'size', 'shape'];
  // 分组处理的属性
  var GROUP_ATTRS = ['color', 'size', 'shape'];
  function cloneScale(scale, scaleConfig) {
    // @ts-ignore
    return new scale.constructor(_objectSpread(_objectSpread({}, scale.__cfg__), scaleConfig));
  }
  var AttrController = /*#__PURE__*/ (function () {
    function AttrController(scaleController, attrsRange) {
      _classCallCheck(this, AttrController);
      this.scaleController = scaleController;
      this.attrsRange = attrsRange;
      this.options = {};
      this.attrs = {};
    }
    _createClass(AttrController, [
      {
        key: 'parseOption',
        value: function parseOption(option, attrName) {
          if (!option) {
            return {
              type: 'identity',
            };
          }
          if (isString(option)) {
            return {
              field: option,
              type: 'category',
            };
          }
          if (isNumber(option)) {
            if (attrName === 'size') {
              return {
                type: 'identity',
                field: option,
              };
            }
          }
          if (isArray(option)) {
            return {
              field: option[0],
              range: option[1],
            };
          }
          return option;
        },
      },
      {
        key: 'getAttrOptions',
        value: function getAttrOptions(props, justifyContentCenter) {
          var _this = this;
          if (!props.x || !props.y) {
            throw new Error('x, y are required !');
          }
          var options = {};
          var ranges = this.attrsRange;
          ATTRS.forEach(function (attrName) {
            if (!props[attrName]) return;
            var option = _this.parseOption(props[attrName], attrName);
            if (!option.range) {
              option.range = ranges[attrName];
            }
            options[attrName] = option;
          });
          // @ts-ignore
          var x = options.x,
            y = options.y;
          x.justifyContent = justifyContentCenter;
          // x, y 都是固定Linear 映射
          x.type = Linear$2;
          y.type = Linear$2;
          return options;
        },
      },
      {
        key: 'getDefaultAttrValues',
        value: function getDefaultAttrValues() {
          var _this$attrsRange = this.attrsRange,
            color = _this$attrsRange.color,
            shape = _this$attrsRange.shape;
          return {
            color: color[0],
            shape: shape && shape[0],
          };
        },
      },
      {
        key: 'getGroupScales',
        value: function getGroupScales() {
          var attrs = this.attrs;
          var scales = [];
          each(GROUP_ATTRS, function (attrName) {
            var attr = attrs[attrName];
            if (!attr) {
              return;
            }
            var scale = attr.scale;
            if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
              scales.push(scale);
            }
          });
          return scales;
        },
      },
      {
        key: 'createAttr',
        value: function createAttr(option) {
          var type = option.type,
            field = option.field,
            scaleConfig = option.scale;
          if (isNil(field) || type === Identity$2) {
            return new Identity$2(option);
          }
          var scale = this.scaleController.getScale(field);
          var attrOption = _objectSpread(
            _objectSpread({}, option),
            {},
            {
              data: this.scaleController.getData(),
              // scaleConfig 只在属性映射中生效
              scale: scaleConfig ? cloneScale(scale, scaleConfig) : scale,
            }
          );
          // identity
          if (scale && scale.type === 'identity') {
            return new Identity$2(attrOption);
          }
          // Attr的默认类型和scale类型保持一致
          var AttrConstructor = scale.isLinear ? Linear$2 : Category$2;
          // custom Attr Constructor
          if (isFunction(type)) {
            AttrConstructor = type;
          }
          if (isString(type) && Attrs[upperFirst(type)]) {
            AttrConstructor = Attrs[upperFirst(type)];
          }
          return new AttrConstructor(attrOption);
        },
      },
      {
        key: 'create',
        value: function create(options) {
          this.update(options);
        },
      },
      {
        key: 'update',
        value: function update(nextOptions) {
          var scaleController = this.scaleController,
            lastOptions = this.options,
            lastAttrs = this.attrs;
          var nextAttrs = {};
          each(nextOptions, function (nextOption, attrName) {
            var lastOption = lastOptions[attrName];
            if (equal(nextOption, lastOption)) {
              nextAttrs[attrName] = lastAttrs[attrName];
            }
            var field = nextOption.field,
              justifyContent = nextOption.justifyContent;
            if (field) {
              scaleController.setScale(field, {
                justifyContent: justifyContent,
              });
            }
          });
          this.options = nextOptions;
          this.attrs = nextAttrs;
        },
      },
      {
        key: 'getAttr',
        value: function getAttr(attrName) {
          var attrs = this.attrs,
            options = this.options;
          var attr = attrs[attrName];
          if (attr) {
            return attr;
          }
          var option = options[attrName];
          if (!option) {
            return null;
          }
          var newAttr = this.createAttr(option);
          attrs[attrName] = newAttr;
          return newAttr;
        },
      },
      {
        key: 'getAttrs',
        value: function getAttrs() {
          var _this2 = this;
          var options = this.options,
            attrs = this.attrs;
          each(options, function (option, attrName) {
            _this2.getAttr(attrName);
          });
          return attrs;
        },
      },
      {
        key: 'isGroupAttr',
        value: function isGroupAttr(attrName) {
          return GROUP_ATTRS.indexOf(attrName) !== -1;
        },
      },
      {
        key: 'getAttrsByLinear',
        value: function getAttrsByLinear() {
          var attrs = this.attrs;
          var attrNames = Object.keys(attrs);
          var linearAttrs = [];
          var nonlinearAttrs = [];
          attrNames.forEach(function (attrName) {
            if (attrName === 'x' || attrName === 'y') {
              linearAttrs.push(attrName);
              return;
            }
            var scale = attrs[attrName].scale;
            if (scale && scale.type === 'linear') {
              linearAttrs.push(attrName);
            } else {
              nonlinearAttrs.push(attrName);
            }
          });
          return {
            linearAttrs: linearAttrs,
            nonlinearAttrs: nonlinearAttrs,
          };
        },
      },
    ]);
    return AttrController;
  })();

  var _excluded$3 = ['field'];
  // 保留原始数据的字段
  var FIELD_ORIGIN = 'origin';
  var Geometry = /*#__PURE__*/ (function (_Selection) {
    _inherits(Geometry, _Selection);
    var _super = _createSuper(Geometry);
    function Geometry(props, context) {
      var _this;
      _classCallCheck(this, Geometry);
      _this = _super.call(this, props, context);
      _this.isGeometry = true;
      // x 轴居中
      _this.justifyContent = false;
      // y 轴是否从0开始
      _this.startOnZero = false;
      // 是否连接空值
      _this.connectNulls = false;
      // 是否需要排序
      _this.sortable = false;
      mix(_assertThisInitialized(_this), _this.getDefaultCfg());
      var chart = props.chart,
        coord = props.coord;
      var attrsRange = _this._getThemeAttrsRange();
      _this.attrController = new AttrController(chart.scale, attrsRange);
      var _assertThisInitialize = _assertThisInitialized(_this),
        attrController = _assertThisInitialize.attrController,
        justifyContent = _assertThisInitialize.justifyContent;
      var attrOptions = attrController.getAttrOptions(props, !coord.isCyclic() || justifyContent);
      attrController.create(attrOptions);
      return _this;
    }
    _createClass(Geometry, [
      {
        key: 'getDefaultCfg',
        value: function getDefaultCfg() {
          return {};
        },
      },
      {
        key: 'willReceiveProps',
        value: function willReceiveProps(nextProps) {
          _get$1(_getPrototypeOf(Geometry.prototype), 'willReceiveProps', this).call(
            this,
            nextProps
          );
          var lastProps = this.props,
            attrController = this.attrController,
            justifyContent = this.justifyContent;
          var nextData = nextProps.data,
            nextAdjust = nextProps.adjust,
            nextZoomRange = nextProps.zoomRange,
            coord = nextProps.coord;
          var lastData = lastProps.data,
            lastAdjust = lastProps.adjust,
            lastZoomRange = lastProps.zoomRange;
          var justifyContentCenter = !coord.isCyclic() || justifyContent;
          var nextAttrOptions = attrController.getAttrOptions(nextProps, justifyContentCenter);
          var lastAttrOptions = attrController.getAttrOptions(lastProps, justifyContentCenter);
          if (!equal(nextAttrOptions, lastAttrOptions)) {
            attrController.update(nextAttrOptions);
            this.records = null;
          }
          // 重新处理数据
          if (nextData !== lastData) {
            this.records = null;
          }
          // 重新处理数据
          if (nextAdjust !== lastAdjust) {
            this.records = null;
          }
          // zoomRange发生变化,records也需要重新计算
          if (!equal(nextZoomRange, lastZoomRange)) {
            this.records = null;
          }
        },
      },
      {
        key: 'willMount',
        value: function willMount() {
          this._createAttrs();
          if (!this.records) {
            this._processData();
          }
        },
      },
      {
        key: 'willUpdate',
        value: function willUpdate() {
          this._createAttrs();
          if (!this.records) {
            this._processData();
          }
        },
      },
      {
        key: 'didMount',
        value: function didMount() {
          _get$1(_getPrototypeOf(Geometry.prototype), 'didMount', this).call(this);
          this._initEvent();
        },
      },
      {
        key: '_createAttrs',
        value: function _createAttrs() {
          var attrController = this.attrController;
          attrController.attrs = {};
          this.attrs = attrController.getAttrs();
        },
      },
      {
        key: '_getThemeAttrsRange',
        value: function _getThemeAttrsRange() {
          var context = this.context,
            props = this.props,
            geomType = this.geomType;
          var coord = props.coord;
          var theme = context.theme;
          var colors = theme.colors,
            sizes = theme.sizes,
            shapes = theme.shapes;
          return {
            x: coord.x,
            y: coord.y,
            color: colors,
            size: sizes,
            shape: shapes[geomType],
          };
        },
      },
      {
        key: '_adjustScales',
        value: function _adjustScales() {
          var attrs = this.attrs,
            props = this.props,
            defaultStartOnZero = this.startOnZero;
          var chart = props.chart,
            _props$startOnZero = props.startOnZero,
            startOnZero = _props$startOnZero === void 0 ? defaultStartOnZero : _props$startOnZero,
            coord = props.coord,
            adjust = props.adjust;
          var isPolar = coord.isPolar,
            transposed = coord.transposed;
          var y = attrs.y;
          var yField = y.field;
          // 如果从 0 开始，只调整 y 轴 scale
          if (startOnZero) {
            var _y = attrs.y;
            chart.scale.adjustStartZero(_y.scale);
          }
          // 饼图的scale调整，关闭nice
          if (
            isPolar &&
            transposed &&
            (adjust === 'stack' ||
              (adjust === null || adjust === void 0 ? void 0 : adjust.type) === 'stack')
          ) {
            var _y2 = attrs.y;
            chart.scale.adjustPieScale(_y2.scale);
          }
          if (
            adjust === 'stack' ||
            (adjust === null || adjust === void 0 ? void 0 : adjust.type) === 'stack'
          ) {
            this._updateStackRange(yField, y.scale, this.dataArray);
          }
        },
      },
      {
        key: '_groupData',
        value: function _groupData(data) {
          var attrController = this.attrController;
          var groupScales = attrController.getGroupScales();
          if (!groupScales.length) {
            return [
              {
                children: data,
              },
            ];
          }
          var names = [];
          groupScales.forEach(function (scale) {
            var field = scale.field;
            names.push(field);
          });
          var groups = groupToMap(data, names);
          var records = [];
          for (var key in groups) {
            records.push({
              key: key.replace(/^_/, ''),
              children: groups[key],
            });
          }
          return records;
        },
      },
      {
        key: '_saveOrigin',
        value: function _saveOrigin(originData) {
          var len = originData.length;
          var data = new Array(len);
          for (var i = 0; i < len; i++) {
            var record = originData[i];
            data[i] = _objectSpread(
              _objectSpread({}, record),
              {},
              _defineProperty({}, FIELD_ORIGIN, record)
            );
          }
          return data;
        },
      },
      {
        key: '_numberic',
        value: function _numberic(data) {
          var attrs = this.attrs;
          var scales = [attrs.x.scale, attrs.y.scale];
          for (var j = 0, len = data.length; j < len; j++) {
            var obj = data[j];
            var count = scales.length;
            for (var i = 0; i < count; i++) {
              var scale = scales[i];
              if (scale.isCategory) {
                var field = scale.field;
                obj[field] = scale.translate(obj[field]);
              }
            }
          }
        },
      },
      {
        key: '_adjustData',
        value: function _adjustData(records) {
          var attrs = this.attrs,
            props = this.props;
          var adjust = props.adjust;
          // groupedArray 是二维数组
          var groupedArray = records.map(function (record) {
            return record.children;
          });
          if (!adjust) {
            return groupedArray;
          }
          var adjustCfg =
            typeof adjust === 'string'
              ? {
                  type: adjust,
                }
              : adjust;
          var adjustType = upperFirst(adjustCfg.type);
          var AdjustConstructor = getAdjust(adjustType);
          if (!AdjustConstructor) {
            throw new Error('not support such adjust : ' + adjust);
          }
          if (adjustType === 'Dodge') {
            for (var i = 0, len = groupedArray.length; i < len; i++) {
              // 如果是dodge, 需要处理数字再处理
              this._numberic(groupedArray[i]);
            }
            adjustCfg.adjustNames = ['x'];
          }
          var x = attrs.x,
            y = attrs.y;
          adjustCfg.xField = x.field;
          adjustCfg.yField = y.field;
          var adjustInstance = new AdjustConstructor(adjustCfg);
          var adjustData = adjustInstance.process(groupedArray);
          this.adjust = {
            type: adjustCfg.type,
            adjust: adjustInstance,
          };
          // process 返回的是新数组，所以要修改 records
          records.forEach(function (record, index) {
            record.children = adjustData[index];
          });
          return adjustData;
        },
      },
      {
        key: '_updateStackRange',
        value: function _updateStackRange(field, scale, dataArray) {
          var flattenArray = flatten(dataArray);
          var min = Infinity;
          var max = -Infinity;
          for (var i = 0, len = flattenArray.length; i < len; i++) {
            var obj = flattenArray[i];
            var tmpMin = Math.min.apply(null, obj[field]);
            var tmpMax = Math.max.apply(null, obj[field]);
            if (tmpMin < min) {
              min = tmpMin;
            }
            if (tmpMax > max) {
              max = tmpMax;
            }
          }
          if (min !== scale.min || max !== scale.max) {
            scale.change({
              min: min,
              max: max,
            });
          }
        },
      },
      {
        key: '_processData',
        value: function _processData() {
          var props = this.props;
          var originData = props.data;
          var data = this._saveOrigin(originData);
          // 根据分类度量进行数据分组
          var records = this._groupData(data);
          // 根据adjust分组
          var dataArray = this._adjustData(records);
          this.dataArray = dataArray;
          // scale适配调整，主要是调整 y 轴是否从 0 开始 以及 饼图
          this._adjustScales();
          // 数据排序（非必须）
          if (this.sortable) {
            this._sortData(records);
          }
          this.records = records;
        },
      },
      {
        key: '_sortData',
        value: function _sortData(records) {
          var xScale = this.getXScale();
          var field = xScale.field,
            type = xScale.type;
          if (type !== 'identity' && xScale.values.length > 1) {
            each(records, function (_ref) {
              var children = _ref.children;
              children.sort(function (record1, record2) {
                if (type === 'timeCat') {
                  return (
                    toTimeStamp(record1[FIELD_ORIGIN][field]) -
                    toTimeStamp(record2[FIELD_ORIGIN][field])
                  );
                }
                return (
                  xScale.translate(record1[FIELD_ORIGIN][field]) -
                  xScale.translate(record2[FIELD_ORIGIN][field])
                );
              });
            });
          }
        },
      },
      {
        key: '_initEvent',
        value: function _initEvent() {
          var _this2 = this;
          var container = this.container,
            props = this.props;
          var canvas = container.get('canvas');
          ['onPressStart', 'onPress', 'onPressEnd', 'onPan', 'onPanStart', 'onPanEnd'].forEach(
            function (eventName) {
              if (props[eventName]) {
                canvas.on(eventName.substr(2).toLowerCase(), function (ev) {
                  ev.geometry = _this2;
                  props[eventName](ev);
                });
              }
            }
          );
        },
      },
      {
        key: 'getY0Value',
        value: function getY0Value() {
          var attrs = this.attrs,
            props = this.props;
          var chart = props.chart;
          var field = attrs.y.field;
          var scale = chart.getScale(field);
          return chart.scale.getZeroValue(scale);
        },
        // 根据各属性映射的值域来获取真正的绘图属性
      },
      {
        key: '_getShapeStyle',
        value: function _getShapeStyle(shape, origin) {
          var context = this.context,
            props = this.props,
            geomType = this.geomType;
          var theme = context.theme;
          var shapeTheme = theme.shape[geomType] || {};
          var defaultShapeStyle = shapeTheme.default;
          var shapeThemeStyle = shapeTheme[shape];
          var style = props.style;
          var shapeStyle = _objectSpread(_objectSpread({}, defaultShapeStyle), shapeThemeStyle);
          if (!style || !isObject(style)) {
            return shapeStyle;
          }
          // @ts-ignore
          var field = style.field,
            styles = _objectWithoutProperties(style, _excluded$3);
          var value = field ? origin[field] : origin;
          each(styles, function (attr, key) {
            if (isFunction(attr)) {
              shapeStyle[key] = attr(value);
            } else {
              shapeStyle[key] = attr;
            }
          });
          return shapeStyle;
        },
        /**
         * 数据映射到视图属性核心逻辑
         * x、y 每个元素走 normalize 然后 convertPoint
         * color、size、shape
         *  如果是Linear，则每个元素 走 mapping
         *  如果是Category/Identity 则第一个元素走 mapping
         */
      },
      {
        key: '_mapping',
        value: function _mapping(records) {
          var attrs = this.attrs,
            props = this.props,
            attrController = this.attrController;
          var coord = props.coord;
          var _attrController$getAt = attrController.getAttrsByLinear(),
            linearAttrs = _attrController$getAt.linearAttrs,
            nonlinearAttrs = _attrController$getAt.nonlinearAttrs;
          var defaultAttrValues = attrController.getDefaultAttrValues();
          for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            var children = record.children;
            var attrValues = _objectSpread({}, defaultAttrValues);
            var firstChild = children[0];
            if (children.length === 0) {
              continue;
            }
            // 非线性映射
            for (var k = 0, _len = nonlinearAttrs.length; k < _len; k++) {
              var attrName = nonlinearAttrs[k];
              var attr = attrs[attrName];
              // 非线性映射只用映射第一项就可以了
              attrValues[attrName] = attr.mapping(firstChild[attr.field]);
            }
            // 线性属性映射
            for (var j = 0, childrenLen = children.length; j < childrenLen; j++) {
              var child = children[j];
              var normalized = {};
              for (var _k = 0; _k < linearAttrs.length; _k++) {
                var _attrName = linearAttrs[_k];
                var _attr = attrs[_attrName];
                // 分类属性的线性映射
                if (attrController.isGroupAttr(_attrName)) {
                  attrValues[_attrName] = _attr.mapping(child[_attr.field], child);
                } else {
                  normalized[_attrName] = _attr.normalize(child[_attr.field]);
                }
              }
              var _coord$convertPoint = coord.convertPoint({
                  x: normalized.x,
                  y: normalized.y,
                }),
                x = _coord$convertPoint.x,
                y = _coord$convertPoint.y;
              // 获取 shape 的 style
              var shapeName = attrValues.shape;
              var shape = this._getShapeStyle(shapeName, child.origin);
              var selected = this.isSelected(child);
              mix(child, attrValues, {
                normalized: normalized,
                x: x,
                y: y,
                shapeName: shapeName,
                shape: shape,
                selected: selected,
              });
            }
          }
          return records;
        },
        // 数据映射
      },
      {
        key: 'mapping',
        value: function mapping() {
          var records = this.records;
          // 数据映射
          this._mapping(records);
          return records;
        },
      },
      {
        key: 'getClip',
        value: function getClip() {
          var _this$props = this.props,
            coord = _this$props.coord,
            viewClip = _this$props.viewClip;
          var contentWidth = coord.width,
            contentHeight = coord.height,
            left = coord.left,
            top = coord.top;
          if (viewClip) {
            return {
              type: 'rect',
              attrs: {
                x: left,
                y: top,
                width: contentWidth,
                height: contentHeight,
              },
            };
          }
          return null;
        },
      },
      {
        key: 'getAttr',
        value: function getAttr(attrName) {
          return this.attrController.getAttr(attrName);
        },
      },
      {
        key: 'getXScale',
        value: function getXScale() {
          return this.getAttr('x').scale;
        },
      },
      {
        key: 'getYScale',
        value: function getYScale() {
          return this.getAttr('y').scale;
        },
      },
      {
        key: '_getXSnap',
        value: function _getXSnap(invertPointX) {
          var xScale = this.getXScale();
          if (xScale.isCategory) {
            return xScale.invert(invertPointX);
          }
          // linear 类型
          var invertValue = xScale.invert(invertPointX);
          var values = xScale.values;
          var len = values.length;
          // 如果只有1个点直接返回第1个点
          if (len === 1) {
            return values[0];
          }
          // 第1个点和第2个点之间
          if ((values[0] + values[1]) / 2 > invertValue) {
            return values[0];
          }
          // 最后2个点
          if ((values[len - 2] + values[len - 1]) / 2 <= invertValue) {
            return values[len - 1];
          }
          for (var i = 1; i < len; i++) {
            // 中间的点
            if (
              (values[i - 1] + values[i]) / 2 <= invertValue &&
              (values[i + 1] + values[i]) / 2 > invertValue
            ) {
              return values[i];
            }
          }
          return null;
        },
      },
      {
        key: '_getYSnapRecords',
        value: function _getYSnapRecords(invertPointY, records) {
          var yScale = this.getYScale();
          var yField = yScale.field;
          var yValue = yScale.invert(invertPointY);
          // category
          if (yScale.isCategory) {
            return records.filter(function (record) {
              return record[FIELD_ORIGIN][yField] === yValue;
            });
          }
          // linear
          return records.filter(function (record) {
            var rangeY = record[yField];
            if (rangeY[0] <= yValue && rangeY[1] >= yValue) {
              return true;
            }
            return false;
          });
        },
        // 把 records 拍平
      },
      {
        key: 'flatRecords',
        value: function flatRecords() {
          var records = this.records;
          return records.reduce(function (prevRecords, record) {
            return prevRecords.concat(record.children);
          }, []);
        },
      },
      {
        key: 'getSnapRecords',
        value: function getSnapRecords(point, inCoordRange) {
          var props = this.props;
          var coord = props.coord,
            adjust = props.adjust;
          var invertPoint = coord.invertPoint(point);
          var xScale = this.getXScale();
          var yScale = this.getYScale();
          // 如果不在coord坐标范围内，直接返回空
          // if (invertPoint.x < 0 || invertPoint.y < 0) {
          //   return [];
          // }
          // 是否调整 point，默认为不调整
          if (inCoordRange) {
            var xRange = xScale.range;
            var yRange = yScale.range;
            // 如果 inCoordRange=true，当 point 不在 coord 坐标范围内时，调整到 range 内
            invertPoint.x = Math.min(Math.max(invertPoint.x, xRange[0]), xRange[1]);
            invertPoint.y = Math.min(Math.max(invertPoint.y, yRange[0]), yRange[1]);
          }
          var records = this.flatRecords();
          // 处理饼图
          if (adjust === 'stack' && coord.isPolar && coord.transposed) {
            // 弧度在半径范围内
            if (invertPoint.x >= 0 && invertPoint.x <= 1) {
              var snapRecords = this._getYSnapRecords(invertPoint.y, records);
              return snapRecords;
            }
          }
          var rst = [];
          var value = this._getXSnap(invertPoint.x);
          if (!value) {
            return rst;
          }
          var xField = xScale.field;
          var yField = yScale.field;
          for (var i = 0, len = records.length; i < len; i++) {
            var record = _objectSpread(
              _objectSpread({}, records[i]),
              {},
              {
                xField: xField,
                yField: yField,
              }
            );
            var originValue = record[FIELD_ORIGIN][xField];
            if (xScale.type === 'timeCat' && toTimeStamp(originValue) === value) {
              rst.push(record);
            } else if (originValue === value) {
              rst.push(record);
            }
          }
          return rst;
        },
      },
      {
        key: 'getRecords',
        value: function getRecords(data) {
          var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'xfield';
          var records = this.flatRecords();
          var xScale = this.getXScale();
          var yScale = this.getYScale();
          var xField = xScale.field;
          var yField = yScale.field;
          var value = data[xField];
          var rst = [];
          for (var i = 0, len = records.length; i < len; i++) {
            var record = _objectSpread(
              _objectSpread({}, records[i]),
              {},
              {
                xField: xField,
                yField: yField,
              }
            );
            var originValue = record[FIELD_ORIGIN][field === 'xfield' ? xField : yField];
            if (originValue === value) {
              rst.push(record);
            }
          }
          return rst;
        },
      },
      {
        key: 'getLegendItems',
        value: function getLegendItems() {
          var attrController = this.attrController;
          var colorAttr = attrController.getAttr('color');
          if (!colorAttr) return null;
          var scale = colorAttr.scale;
          if (!scale.isCategory) return null;
          var ticks = scale.getTicks();
          var items = ticks.map(function (tick) {
            var text = tick.text,
              tickValue = tick.tickValue;
            var color = colorAttr.mapping(tickValue);
            return {
              field: scale.field,
              color: color,
              name: text,
              tickValue: tickValue,
            };
          });
          return items;
        },
      },
    ]);
    return Geometry;
  })(Selection);

  var arrayWithoutHoles = createCommonjsModule(function (module) {
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return arrayLikeToArray(arr);
    }
    (module.exports = _arrayWithoutHoles),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var iterableToArray = createCommonjsModule(function (module) {
    function _iterableToArray(iter) {
      if (
        (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
        iter['@@iterator'] != null
      )
        return Array.from(iter);
    }
    (module.exports = _iterableToArray),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var nonIterableSpread = createCommonjsModule(function (module) {
    function _nonIterableSpread() {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    }
    (module.exports = _nonIterableSpread),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var toConsumableArray = createCommonjsModule(function (module) {
    function _toConsumableArray(arr) {
      return (
        arrayWithoutHoles(arr) ||
        iterableToArray(arr) ||
        unsupportedIterableToArray(arr) ||
        nonIterableSpread()
      );
    }
    (module.exports = _toConsumableArray),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _toConsumableArray = /*@__PURE__*/ getDefaultExportFromCjs(toConsumableArray);

  var withLine = function (View) {
    return /*#__PURE__*/ (function (_Geometry) {
      _inherits(Line, _Geometry);
      var _super = _createSuper(Line);
      function Line() {
        _classCallCheck(this, Line);
        return _super.apply(this, arguments);
      }
      _createClass(Line, [
        {
          key: 'getDefaultCfg',
          value: function getDefaultCfg() {
            return {
              geomType: 'line',
              sortable: true,
            };
          },
        },
        {
          key: 'splitPoints',
          value: function splitPoints(points) {
            var topPoints = [];
            var bottomPoints = [];
            for (var i = 0, len = points.length; i < len; i++) {
              var point = points[i];
              var x = point.x,
                y = point.y;
              topPoints.push(
                _objectSpread(
                  _objectSpread({}, point),
                  {},
                  {
                    x: x,
                    y: y[1],
                  }
                )
              );
              bottomPoints.push(
                _objectSpread(
                  _objectSpread({}, point),
                  {},
                  {
                    x: x,
                    y: y[0],
                  }
                )
              );
            }
            return [topPoints, bottomPoints];
          },
        },
        {
          key: 'splitNulls',
          value: function splitNulls(points, connectNulls) {
            if (connectNulls) {
              var _tmpPoints = [];
              for (var i = 0, len = points.length; i < len; i++) {
                var point = points[i];
                var y = point.y;
                if (isArray(y)) {
                  if (isNaN(y[0])) {
                    continue;
                  }
                  _tmpPoints.push(point);
                  continue;
                }
                if (isNaN(y)) {
                  continue;
                }
                _tmpPoints.push(point);
              }
              if (_tmpPoints.length) {
                return [_tmpPoints];
              }
              return [];
            }
            var result = [];
            var tmpPoints = [];
            for (var _i = 0, _len = points.length; _i < _len; _i++) {
              var _point = points[_i];
              var _y = _point.y;
              if (isArray(_y)) {
                if (isNaN(_y[0])) {
                  if (tmpPoints.length) {
                    result.push(tmpPoints);
                    tmpPoints = [];
                  }
                  continue;
                }
                tmpPoints.push(_point);
                continue;
              }
              if (isNaN(_y)) {
                if (tmpPoints.length) {
                  result.push(tmpPoints);
                  tmpPoints = [];
                }
                continue;
              }
              tmpPoints.push(_point);
            }
            if (tmpPoints.length) {
              result.push(tmpPoints);
            }
            return result;
          },
        },
        {
          key: 'mapping',
          value: function mapping() {
            var _this = this;
            var records = _get$1(_getPrototypeOf(Line.prototype), 'mapping', this).call(this);
            var props = this.props,
              defaultConnectNulls = this.connectNulls;
            var coord = props.coord,
              _props$connectNulls = props.connectNulls,
              connectNulls =
                _props$connectNulls === void 0 ? defaultConnectNulls : _props$connectNulls;
            return records.map(function (record) {
              var children = record.children;
              // children 有可能为空
              var _ref = children[0] || {},
                size = _ref.size,
                color = _ref.color,
                shape = _ref.shape,
                y = _ref.y;
              // 极坐标时，需加入起点，从而闭合所绘图形
              var points = coord.isPolar
                ? [].concat(_toConsumableArray(children), [children[0]])
                : children;
              var splitPoints = _this.splitNulls(points, connectNulls);
              var newChildren = splitPoints.map(function (points) {
                var _ref2 = isArray(y) ? _this.splitPoints(points) : [points, undefined],
                  _ref3 = _slicedToArray(_ref2, 2),
                  topPoints = _ref3[0],
                  bottomPoints = _ref3[1];
                return {
                  size: size,
                  color: color,
                  shape: shape,
                  points: topPoints,
                  bottomPoints: bottomPoints,
                };
              });
              return _objectSpread(
                _objectSpread({}, record),
                {},
                {
                  children: newChildren,
                }
              );
            });
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props;
            var coord = props.coord;
            var records = this.mapping();
            var clip = this.getClip();
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  coord: coord,
                  records: records,
                  clip: clip,
                }
              )
            );
          },
        },
      ]);
      return Line;
    })(Geometry);
  };

  function concatPoints(children) {
    var result = [];
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      result = result.concat(child.points);
    }
    return result;
  }
  function formatPoint(point) {
    var y = point.y;
    return {
      x: point.x,
      y: isArray(y) ? y[1] : y,
    };
  }
  function getPoint$1(points, t) {
    var formatedPoints = points.map(function (p) {
      return formatPoint(p);
    });
    var firstPoint = formatedPoints[0];
    var lastPoint = formatedPoints[formatedPoints.length - 1];
    var xOffset = lastPoint.x - firstPoint.x;
    var x = firstPoint.x + xOffset * t;
    for (var i = 1; i < formatedPoints.length; i++) {
      var point = formatedPoints[i];
      var prevPoint = formatedPoints[i - 1];
      if (x >= prevPoint.x && x <= point.x) {
        // x 在 2 点之间的比例，根据比例再算出 y 的值
        var ratio = (x - prevPoint.x) / (point.x - prevPoint.x);
        return {
          x: x,
          y: prevPoint.y + (point.y - prevPoint.y) * ratio,
        };
      }
    }
  }
  function AnimationEndView(props) {
    var record = props.record,
      appear = props.appear,
      EndView = props.EndView;
    var children = record.children;
    var points = concatPoints(children);
    var origin = points[0].origin;
    return jsx(
      'group',
      {
        animation: {
          appear: {
            easing: appear.easing,
            duration: appear.duration,
            onFrame: function onFrame(t) {
              // 这段逻辑有点恶心。。
              var element = this.element;
              var children = element.get('children');
              var point = getPoint$1(points, t);
              children.forEach(function (child) {
                child.moveTo(point.x, point.y);
              });
            },
          },
        },
      },
      jsx(EndView, {
        origin: origin,
      })
    );
  }
  var LineView = function (props) {
    var records = props.records,
      coord = props.coord,
      animation = props.animation,
      EndView = props.endView,
      clip = props.clip;
    var left = coord.left,
      top = coord.top,
      width = coord.width,
      height = coord.height,
      center = coord.center,
      startAngle = coord.startAngle,
      endAngle = coord.endAngle,
      radius = coord.radius;
    var appear = coord.isPolar
      ? {
          easing: 'quadraticOut',
          duration: 450,
          clip: {
            type: 'sector',
            property: ['endAngle'],
            attrs: {
              x: center.x,
              y: center.y,
              startAngle: startAngle,
              r: radius,
            },
            start: {
              endAngle: startAngle,
            },
            end: {
              endAngle: endAngle,
            },
          },
        }
      : {
          easing: 'quadraticOut',
          duration: 450,
          clip: {
            type: 'rect',
            property: ['width'],
            attrs: {
              x: left,
              y: top,
              height: height,
            },
            start: {
              width: 0,
            },
            end: {
              width: width,
            },
          },
        };
    return jsx(
      'group',
      {
        attrs: {
          clip: clip,
        },
      },
      records.map(function (record) {
        var key = record.key,
          children = record.children;
        return jsx(
          'group',
          {
            key: key,
          },
          children.map(function (child) {
            var points = child.points,
              color = child.color,
              size = child.size,
              shape = child.shape;
            return jsx('polyline', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    points: points.map(function (point) {
                      return {
                        x: point.x,
                        y: point.y,
                      };
                    }),
                    stroke: color,
                  },
                  shape
                ),
                {},
                {
                  lineWidth: size || shape.lineWidth,
                }
              ),
              animation: deepMix(
                {
                  update: {
                    easing: 'linear',
                    duration: 450,
                    property: ['points'],
                  },
                  appear: appear,
                },
                animation
              ),
            });
          }),
          EndView
            ? jsx(AnimationEndView, {
                record: record,
                EndView: EndView,
                appear: appear,
              })
            : null
        );
      })
    );
  };

  var index = withLine(LineView);

  var withArea = function (View) {
    return /*#__PURE__*/ (function (_withLine) {
      _inherits(Area, _withLine);
      var _super = _createSuper(Area);
      function Area() {
        _classCallCheck(this, Area);
        return _super.apply(this, arguments);
      }
      _createClass(Area, [
        {
          key: 'getDefaultCfg',
          value: function getDefaultCfg() {
            return {
              geomType: 'area',
              // 面积图默认设为从0开始
              startOnZero: true,
              // 点需要排序
              sortable: true,
            };
          },
        },
        {
          key: 'mapping',
          value: function mapping() {
            var records = _get$1(_getPrototypeOf(Area.prototype), 'mapping', this).call(this);
            // 坐标轴 y0
            var y0 = this.getY0Value();
            var props = this.props,
              defaultStartOnZero = this.startOnZero;
            var coord = props.coord,
              _props$startOnZero = props.startOnZero,
              startOnZero = _props$startOnZero === void 0 ? defaultStartOnZero : _props$startOnZero;
            var baseY = coord.y[0];
            if (startOnZero) {
              // 零点映射到绝对坐标
              var originCoord = coord.convertPoint({
                x: 0,
                y: y0,
              });
              baseY = originCoord.y;
            }
            for (var i = 0, len = records.length; i < len; i++) {
              var record = records[i];
              var children = record.children;
              for (var j = 0, _len = children.length; j < _len; j++) {
                var child = children[j];
                var points = child.points,
                  bottomPoints = child.bottomPoints;
                if (bottomPoints && bottomPoints.length) {
                  bottomPoints.reverse();
                  child.points = points.concat(bottomPoints);
                } else {
                  points.push({
                    x: points[points.length - 1].x,
                    y: baseY,
                  });
                  points.push({
                    x: points[0].x,
                    y: baseY,
                  });
                }
              }
            }
            return records;
          },
        },
      ]);
      return Area;
    })(withLine(View));
  };

  var AreaView = function (props) {
    var coord = props.coord,
      records = props.records,
      shape = props.shape,
      animation = props.animation;
    var isSmooth = shape === 'smooth';
    var left = coord.left,
      top = coord.top,
      width = coord.width,
      height = coord.height,
      center = coord.center,
      startAngle = coord.startAngle,
      endAngle = coord.endAngle,
      radius = coord.radius;
    var appear = coord.isPolar
      ? {
          easing: 'quadraticOut',
          duration: 450,
          clip: {
            type: 'sector',
            property: ['endAngle'],
            attrs: {
              x: center.x,
              y: center.y,
              startAngle: startAngle,
              r: radius,
            },
            start: {
              endAngle: startAngle,
            },
            end: {
              endAngle: endAngle,
            },
          },
        }
      : {
          easing: 'quadraticOut',
          duration: 450,
          clip: {
            type: 'rect',
            property: ['width'],
            attrs: {
              x: left,
              y: top,
              height: height,
            },
            start: {
              width: 0,
            },
            end: {
              width: width,
            },
          },
        };
    return jsx(
      'group',
      null,
      records.map(function (record) {
        var key = record.key,
          children = record.children;
        return jsx(
          'group',
          {
            key: key,
          },
          children.map(function (child) {
            var points = child.points,
              bottomPoints = child.bottomPoints,
              color = child.color,
              shape = child.shape;
            if (isSmooth) {
              return jsx('custom', {
                attrs: _objectSpread(
                  {
                    points: points,
                    lineWidth: '2px',
                    fill: color,
                  },
                  shape
                ),
                createPath: function createPath(context) {
                  var constaint = [
                    [0, 0],
                    [1, 1],
                  ];
                  var bottomPointsLen =
                    (bottomPoints === null || bottomPoints === void 0
                      ? void 0
                      : bottomPoints.length) || 0;
                  var topPoints = points.slice(0, points.length - bottomPointsLen);
                  var topSps = catmullRom2bezier(topPoints, false, constaint);
                  context.beginPath();
                  context.moveTo(topPoints[0].x, topPoints[0].y);
                  for (var i = 0, n = topSps.length; i < n; i++) {
                    var sp = topSps[i];
                    context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
                  }
                  if (bottomPointsLen) {
                    var bottomSps = catmullRom2bezier(bottomPoints, false, constaint);
                    context.lineTo(bottomPoints[0].x, bottomPoints[0].y);
                    for (var _i = 0, _n = bottomSps.length; _i < _n; _i++) {
                      var _sp = bottomSps[_i];
                      context.bezierCurveTo(_sp[1], _sp[2], _sp[3], _sp[4], _sp[5], _sp[6]);
                    }
                  }
                  context.closePath();
                },
                calculateBox: function calculateBox() {
                  return getBBoxFromPoints(points);
                },
              });
            }
            return jsx('polygon', {
              attrs: _objectSpread(
                {
                  points: points,
                  lineWidth: '2px',
                  fill: color,
                },
                shape
              ),
              animation: deepMix(
                {
                  appear: appear,
                  update: {
                    easing: 'linear',
                    duration: 450,
                    property: ['points'],
                  },
                },
                animation
              ),
            });
          })
        );
      })
    );
  };

  var index$1 = withArea(AreaView);

  /**
   * 计算两个坐标的中点坐标
   * @param start 起始点{x:number, y:number}
   * @param end 结束点{x:number, y:number}
   * @returns 中点坐标{x:number, y:number}
   */
  function getMiddlePoint(start, end) {
    var x = (end.x - start.x) / 2 + start.x;
    var y = (end.y - start.y) / 2 + start.y;
    return {
      x: x,
      y: y,
    };
  }

  var DEFAULT_LABEL_CFG = {
    textBaseline: 'middle',
    fill: '#808080',
  };
  function LabelView(props) {
    var record = props.record,
      offsetX = props.offsetX,
      offsetY = props.offsetY,
      points = props.points,
      label = props.label,
      guide = props.guide;
    var origin = record.origin,
      color = record.color;
    var labelAttrs, guideAttrs;
    if (isFunction(label)) {
      var point =
        points.length === 4 // 如果是金字塔图，顶部只有 3 个点
          ? getMiddlePoint(points[1], points[2])
          : getMiddlePoint(points[0], points[1]);
      labelAttrs = mix(
        {
          x: point.x + offsetX,
          y: point.y + offsetY,
        },
        DEFAULT_LABEL_CFG,
        label(origin, color)
      );
    }
    if (isFunction(guide)) {
      var _points$;
      var _point = getMiddlePoint(
        points.length === 4 ? getMiddlePoint(points[0], points[1]) : points[0],
        getMiddlePoint(
          points[2],
          (_points$ = points[3]) !== null && _points$ !== void 0 ? _points$ : points[1]
        )
      );
      guideAttrs = mix(
        {
          x: _point.x,
          y: _point.y,
          textBaseline: 'middle',
          textAlign: 'center',
        },
        DEFAULT_LABEL_CFG,
        guide(origin, color)
      );
    }
    return jsx(
      'group',
      null,
      labelAttrs &&
        jsx('text', {
          attrs: labelAttrs,
        }),
      guideAttrs &&
        jsx('text', {
          attrs: guideAttrs,
        })
    );
  }

  var LabelViews = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    pyramid: LabelView,
    funnel: LabelView,
  });

  var withInterval = function (Views) {
    return /*#__PURE__*/ (function (_Geometry) {
      _inherits(Interval, _Geometry);
      var _super = _createSuper(Interval);
      function Interval() {
        _classCallCheck(this, Interval);
        return _super.apply(this, arguments);
      }
      _createClass(Interval, [
        {
          key: 'getDefaultCfg',
          value: function getDefaultCfg() {
            return {
              geomType: 'interval',
              justifyContent: true,
              startOnZero: true,
            };
          },
        },
        {
          key: 'getDefaultSize',
          value: function getDefaultSize() {
            var attrs = this.attrs,
              props = this.props,
              adjust = this.adjust,
              records = this.records;
            var coord = props.coord,
              sizeRatio = props.sizeRatio;
            var x = attrs.x;
            var scale = x.scale;
            var values = scale.values;
            if (sizeRatio) {
              return (1 / values.length) * sizeRatio;
            }
            var defaultWithRatio = {
              column: 1 / 2,
              rose: 0.999999,
              multiplePie: 3 / 4, // 多饼图
            };

            var count = values.length;
            var ratio;
            if (coord.isPolar) {
              if (coord.transposed && count > 1) {
                ratio = defaultWithRatio.multiplePie;
              } else {
                ratio = defaultWithRatio.rose;
              }
            } else {
              ratio = defaultWithRatio.column;
            }
            var size = (1 / values.length) * ratio;
            // 分组时size要除以类别个数
            if (adjust && adjust.type === 'dodge') {
              return size / records.length;
            }
            return size;
          },
        },
        {
          key: 'mapping',
          value: function mapping() {
            var records = _get$1(_getPrototypeOf(Interval.prototype), 'mapping', this).call(this);
            var props = this.props;
            var coord = props.coord;
            var y0 = this.getY0Value();
            var defaultSize = this.getDefaultSize();
            for (var i = 0, len = records.length; i < len; i++) {
              var record = records[i];
              var children = record.children;
              for (var j = 0, _len = children.length; j < _len; j++) {
                var child = children[j];
                var normalized = child.normalized,
                  mappedSize = child.size;
                // 没有指定size，则根据数据来计算默认size
                if (isNil(mappedSize)) {
                  var x = normalized.x,
                    y = normalized.y,
                    _normalized$size = normalized.size,
                    size = _normalized$size === void 0 ? defaultSize : _normalized$size;
                  mix(
                    child,
                    coord.convertRect({
                      x: x,
                      y: y,
                      y0: y0,
                      size: size,
                    })
                  );
                } else {
                  var _x = child.x,
                    _y = child.y;
                  var rect = {
                    size: mappedSize,
                    x: _x,
                    y: _y,
                    y0: y0,
                  };
                  mix(child, coord.transformToRect(rect));
                }
                mix(child.shape, this.getSelectionStyle(child));
              }
            }
            return records;
          },
          // 获取Y轴坐标零点的画布位置
        },
        {
          key: 'getPointY0',
          value: function getPointY0() {
            var props = this.props;
            var coord = props.coord;
            var y0 = this.getY0Value();
            var y0Point = coord.convertPoint({
              y: y0,
              x: 0,
            });
            return y0Point === null || y0Point === void 0 ? void 0 : y0Point.y;
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              state = this.state,
              container = this.container;
            var coord = props.coord,
              _props$shape = props.shape,
              shape = _props$shape === void 0 ? 'rect' : _props$shape,
              animation = props.animation,
              showLabel = props.showLabel,
              customLabelCfg = props.labelCfg;
            var View = isFunction(Views) ? Views : Views[shape];
            var LabelView = LabelViews[shape];
            var labelCfg = deepMix(
              {
                label: null,
                offsetX: 0,
                offsetY: 0,
              },
              customLabelCfg
            );
            if (!View) return null;
            var selected = state.selected;
            var records = this.mapping();
            var pointY0 = this.getPointY0();
            var clip = this.getClip();
            return jsx(View, {
              coord: coord,
              records: records,
              selected: selected,
              shape: shape,
              animation: animation,
              showLabel: showLabel,
              labelCfg: labelCfg,
              LabelView: LabelView,
              y0: pointY0,
              clip: clip,
            });
          },
        },
      ]);
      return Interval;
    })(Geometry);
  };

  var Rect$3 = function (props) {
    var records = props.records,
      animation = props.animation,
      y0 = props.y0,
      clip = props.clip;
    return jsx(
      'group',
      {
        attrs: {
          clip: clip,
        },
      },
      records.map(function (record) {
        var key = record.key,
          children = record.children;
        return jsx(
          'group',
          {
            key: key,
          },
          children.map(function (item) {
            var key = item.key,
              xMin = item.xMin,
              xMax = item.xMax,
              yMin = item.yMin,
              yMax = item.yMax,
              color = item.color,
              shape = item.shape;
            if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
              return null;
            }
            return jsx('rect', {
              key: key,
              attrs: _objectSpread(
                {
                  x: xMin,
                  y: yMin,
                  width: xMax - xMin,
                  height: yMax - yMin,
                  fill: color,
                },
                shape
              ),
              animation: deepMix(
                {
                  appear: {
                    easing: 'linear',
                    duration: 450,
                    property: ['y', 'height'],
                    start: {
                      y: y0,
                      height: 0,
                    },
                  },
                  update: {
                    easing: 'linear',
                    duration: 450,
                    property: ['x', 'y', 'width', 'height'],
                  },
                },
                animation
              ),
            });
          })
        );
      })
    );
  };

  var Polar$1 = function (props) {
    var coord = props.coord,
      records = props.records,
      animation = props.animation;
    var center = coord.center,
      startAngle = coord.startAngle,
      endAngle = coord.endAngle,
      radius = coord.radius;
    return jsx(
      'group',
      {
        animation: {
          appear: _objectSpread(
            _objectSpread(
              {
                easing: 'quadraticOut',
                duration: 450,
              },
              animation && animation.appear
            ),
            {},
            {
              clip: {
                type: 'sector',
                property: ['endAngle'],
                attrs: {
                  x: center.x,
                  y: center.y,
                  startAngle: startAngle,
                  r: radius,
                },
                start: {
                  endAngle: startAngle,
                },
                end: {
                  endAngle: endAngle,
                },
              },
            }
          ),
        },
      },
      records.map(function (record) {
        var key = record.key,
          children = record.children;
        return jsx(
          'group',
          {
            key: key,
          },
          children.map(function (item) {
            var key = item.key,
              xMin = item.xMin,
              xMax = item.xMax,
              yMin = item.yMin,
              yMax = item.yMax,
              color = item.color,
              shape = item.shape;
            return jsx('sector', {
              key: key,
              attrs: _objectSpread(
                {
                  x: center.x,
                  y: center.y,
                  fill: color,
                  startAngle: xMin,
                  endAngle: xMax,
                  r0: yMin,
                  r: yMax,
                },
                shape
              ),
              animation: deepMix(
                {
                  update: {
                    easing: 'linear',
                    duration: 450,
                    property: ['x', 'y', 'startAngle', 'endAngle', 'r0', 'r'],
                  },
                },
                animation
              ),
            });
          })
        );
      })
    );
  };

  var intervalView = function (props) {
    var coord = props.coord;
    var coordType = coord.type;
    // 直角坐标系
    if (coordType === 'rect') {
      return jsx(Rect$3, _objectSpread({}, props));
    }
    // 极坐标系
    return jsx(Polar$1, _objectSpread({}, props));
  };

  function convertToPoints(_ref) {
    var xMin = _ref.xMin,
      xMax = _ref.xMax,
      yMin = _ref.yMin,
      yMax = _ref.yMax;
    return [
      {
        x: xMin,
        y: yMin,
      },
      {
        x: xMax,
        y: yMin,
      },
      {
        x: xMax,
        y: yMax,
      },
      {
        x: xMin,
        y: yMax,
      }, // bl
    ];
  }

  // 金字塔图和漏斗图的View
  var polygonView = function (props) {
    var records = props.records,
      shape = props.shape,
      showLabel = props.showLabel,
      labelCfg = props.labelCfg,
      LabelView = props.LabelView;
    // 是否倒置
    var overturn = false;
    return jsx(
      'group',
      null,
      records.map(function (record, index) {
        var key = record.key,
          children = record.children;
        var isLastRecord = index === records.length - 1;
        var nextRecord = isLastRecord ? record : records[index + 1];
        var nextChildren = nextRecord.children;
        var nextFirstPoint = convertToPoints(nextChildren[0]);
        var nextLastPoints = convertToPoints(nextChildren[nextChildren.length - 1]);
        if (!overturn) {
          overturn = nextChildren[0].yMax > children[0].yMax;
        }
        if (overturn) {
          nextFirstPoint.reverse();
          nextLastPoints.reverse();
        }
        var polygonPoints = children.map(function (child, childIndex) {
          var points = convertToPoints(child);
          if (overturn) {
            points.reverse();
          }
          if (isLastRecord) {
            if (shape === 'pyramid') {
              points = [getMiddlePoint(points[0], points[1]), points[2], points[3]];
            }
          } else {
            if (childIndex === 0) {
              points[0] = nextFirstPoint[3];
            }
            if (childIndex === children.length - 1) {
              points[1] = nextLastPoints[2];
            }
          }
          return _objectSpread(
            _objectSpread({}, child),
            {},
            {
              points: points,
            }
          );
        });
        return jsx(
          'group',
          {
            key: key,
          },
          polygonPoints.map(function (child) {
            var points = child.points,
              color = child.color,
              shape = child.shape;
            return jsx(
              'group',
              null,
              jsx('polygon', {
                attrs: _objectSpread(
                  {
                    points: points,
                    fill: color,
                  },
                  shape
                ),
              }),
              showLabel && LabelView
                ? jsx(
                    LabelView,
                    _objectSpread(
                      {
                        record: child,
                        points: points,
                      },
                      labelCfg
                    )
                  )
                : null
            );
          })
        );
      })
    );
  };

  // 柱图/条图

  var Views = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    rect: intervalView,
    pyramid: polygonView,
    funnel: polygonView,
  });

  var index$2 = withInterval(Views);

  var withPoint = function (View) {
    return /*#__PURE__*/ (function (_Geometry) {
      _inherits(Point, _Geometry);
      var _super = _createSuper(Point);
      function Point() {
        _classCallCheck(this, Point);
        return _super.apply(this, arguments);
      }
      _createClass(Point, [
        {
          key: 'getDefaultCfg',
          value: function getDefaultCfg() {
            return {
              geomType: 'point',
            };
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              container = this.container;
            var coord = props.coord;
            var records = this.mapping();
            var clip = this.getClip();
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  coord: coord,
                  records: records,
                  clip: clip,
                }
              )
            );
          },
        },
      ]);
      return Point;
    })(Geometry);
  };

  var PointView = function (props) {
    var records = props.records,
      animation = props.animation,
      clip = props.clip;
    return jsx(
      'group',
      {
        attrs: {
          clip: clip,
        },
      },
      records.map(function (record) {
        var key = record.key,
          children = record.children;
        return jsx(
          'group',
          {
            key: key,
          },
          children.map(function (item) {
            var x = item.x,
              y = item.y,
              size = item.size,
              color = item.color,
              shapeName = item.shapeName,
              shape = item.shape;
            if (isNaN(x) || isNaN(y)) {
              return null;
            }
            if (shapeName === 'rect') {
              var rectSize = isNil(size) ? shape.size : size;
              return jsx('rect', {
                attrs: _objectSpread(
                  _objectSpread(
                    {
                      x: x - rectSize,
                      y: y - rectSize,
                      fill: color,
                      stroke: color,
                    },
                    shape
                  ),
                  {},
                  {
                    width: rectSize * 2,
                    height: rectSize * 2,
                  }
                ),
                animation: deepMix(
                  {
                    appear: {
                      easing: 'linear',
                      duration: 450,
                    },
                    update: {
                      easing: 'linear',
                      duration: 450,
                      property: ['x', 'y', 'width', 'height', 'fill'],
                    },
                  },
                  animation
                ),
              });
            }
            return jsx('circle', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x: x,
                    y: y,
                    fill: shapeName === 'circle' ? color : null,
                    stroke: shapeName === 'hollowCircle' ? color : null,
                  },
                  shape
                ),
                {},
                {
                  r: isNil(size) ? shape.size : size,
                }
              ),
              animation: deepMix(
                {
                  appear: {
                    easing: 'linear',
                    duration: 450,
                  },
                  update: {
                    easing: 'linear',
                    duration: 450,
                    property: ['x', 'y', 'r', 'fill'],
                  },
                },
                animation
              ),
            });
          })
        );
      })
    );
  };

  var index$3 = withPoint(PointView);

  var withAxis = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Axis, _Component);
      var _super = _createSuper(Axis);
      function Axis(props) {
        var _this;
        _classCallCheck(this, Axis);
        _this = _super.call(this, props);
        _this.style = {};
        var _this$props = _this.props,
          chart = _this$props.chart,
          field = _this$props.field;
        var scaleOption = _this.getScaleOption(props);
        chart.setScale(field, scaleOption);
        return _this;
      }
      _createClass(Axis, [
        {
          key: 'willReceiveProps',
          value: function willReceiveProps(nextProps) {
            var lastProps = this.props;
            var chart = nextProps.chart,
              field = nextProps.field;
            var nextScaleOption = this.getScaleOption(nextProps);
            var lastScaleOption = this.getScaleOption(lastProps);
            if (!equal(nextScaleOption, lastScaleOption)) {
              chart.setScale(field, nextScaleOption);
            }
          },
        },
        {
          key: 'willMount',
          value: function willMount() {
            this.updateCoord();
          },
        },
        {
          key: 'willUpdate',
          value: function willUpdate() {
            this.updateCoord();
          },
        },
        {
          key: 'getScaleOption',
          value: function getScaleOption(props) {
            var type = props.type,
              tickCount = props.tickCount,
              range = props.range,
              mask = props.mask,
              formatter = props.formatter,
              ticks = props.ticks,
              min = props.min,
              max = props.max,
              nice = props.nice;
            return {
              type: type,
              tickCount: tickCount,
              range: range,
              mask: mask,
              formatter: formatter,
              min: min,
              max: max,
              nice: nice,
              ticks: ticks,
            };
          },
        },
        {
          key: '_getDimType',
          value: function _getDimType() {
            var props = this.props;
            var field = props.field,
              chart = props.chart;
            var xScales = chart.getXScales();
            var scales = xScales.filter(function (scale) {
              return scale.field === field;
            });
            return scales.length > 0 ? 'x' : 'y';
          },
          // 获取ticks最大的宽高
        },
        {
          key: 'getMaxBBox',
          value: function getMaxBBox(ticks, style) {
            var context = this.context;
            var measureText = context.measureText;
            var label = style.label,
              labelOffset = style.labelOffset;
            var width = 0;
            var height = 0;
            ticks.forEach(function (tick) {
              if (!label) return;
              var _tick$labelStyle = tick.labelStyle,
                labelStyle = _tick$labelStyle === void 0 ? {} : _tick$labelStyle,
                text = tick.text;
              var bbox = measureText(
                labelStyle.text || text,
                _objectSpread(_objectSpread({}, label), labelStyle)
              );
              width = Math.max(width, bbox.width);
              height = Math.max(height, bbox.height);
            });
            if (!width && !height) {
              return {
                width: width,
                height: height,
              };
            }
            var bbox = {
              width: width + labelOffset,
              height: height + labelOffset,
            };
            return bbox;
          },
        },
        {
          key: '_getPosition',
          value: function _getPosition() {
            var props = this.props;
            var position = props.position,
              coord = props.coord;
            if (position) {
              return position;
            }
            var dimType = this._getDimType();
            if (coord.transposed) {
              return dimType === 'x' ? 'left' : 'bottom';
            }
            return dimType === 'x' ? 'bottom' : 'left';
          },
        },
        {
          key: 'getTicks',
          value: function getTicks() {
            var props = this.props;
            var field = props.field,
              chart = props.chart;
            var scale = chart.getScale(field);
            var ticks = scale.getTicks();
            // 设置tick的样式
            ticks = this._setTicksStyle(ticks);
            ticks = this._generateGridPoints(ticks);
            return ticks;
          },
          /**
           * 生成极坐标下网格线的交叉点
           * @param ticks
           * @returns
           */
        },
        {
          key: '_generateGridPoints',
          value: function _generateGridPoints(ticks) {
            var props = this.props;
            var chart = props.chart,
              coord = props.coord;
            if (!coord.isPolar) {
              return ticks;
            }
            var dimType = this._getDimType();
            // 只需要在 y 的时候生成
            if (dimType !== 'y') {
              return ticks;
            }
            var xScale = chart.getXScales()[0];
            var xTicks = xScale.getTicks();
            ticks.forEach(function (tick) {
              var gridPoints = xTicks.map(function (xTick) {
                return coord.convertPoint({
                  x: xTick.value,
                  y: tick.value,
                });
              });
              // 添加第 1 个点，形成环状
              gridPoints.push(gridPoints[0]);
              tick.gridPoints = gridPoints;
            });
            return ticks;
          },
        },
        {
          key: '_setTicksStyle',
          value: function _setTicksStyle(ticks) {
            var _this2 = this;
            var props = this.props,
              context = this.context;
            var theme = context.theme,
              px2hd = context.px2hd;
            var _props$style = props.style,
              style = _props$style === void 0 ? {} : _props$style;
            var themeAxis = theme.axis;
            each(themeAxis, function (value, key) {
              // 关闭tick的样式
              if (style[key] === null) {
                return;
              }
              var styleValue = isFunction(style[key]) ? undefined : style[key];
              if (isString(value) || isNumber(value)) {
                _this2.style[key] = px2hd(styleValue) || value;
              } else {
                _this2.style[key] = px2hd(deepMix(clone(value), styleValue));
              }
            });
            return ticks.map(function (tick, index) {
              var label = style.label,
                grid = style.grid;
              var defaultLabelStyle = themeAxis.label,
                defaultGridStyle = themeAxis.grid;
              if (isFunction(label)) {
                tick.labelStyle = px2hd(mix({}, defaultLabelStyle, label(tick.text, index, ticks)));
              }
              if (isFunction(grid)) {
                tick.gridStyle = px2hd(
                  mix({}, defaultGridStyle, grid(tick.text, index, ticks.length))
                );
              }
              return tick;
            });
          },
        },
        {
          key: 'convertTicks',
          value: function convertTicks(ticks) {
            var props = this.props;
            var coord = props.coord;
            var dimType = this._getDimType();
            var otherDim = dimType === 'x' ? 'y' : 'x';
            return ticks.map(function (tick) {
              var _coord$convertPoint, _coord$convertPoint2;
              var start = coord.convertPoint(
                ((_coord$convertPoint = {}),
                _defineProperty(_coord$convertPoint, dimType, tick.value),
                _defineProperty(_coord$convertPoint, otherDim, 0),
                _coord$convertPoint)
              );
              var end = coord.convertPoint(
                ((_coord$convertPoint2 = {}),
                _defineProperty(_coord$convertPoint2, dimType, tick.value),
                _defineProperty(_coord$convertPoint2, otherDim, 1),
                _coord$convertPoint2)
              );
              return _objectSpread(
                _objectSpread({}, tick),
                {},
                {
                  points: [start, end],
                }
              );
            });
          },
        },
        {
          key: 'measureLayout',
          value: function measureLayout() {
            var props = this.props;
            var visible = props.visible,
              coord = props.coord;
            if (visible === false) {
              return null;
            }
            var ticks = this.getTicks();
            var bbox = this.getMaxBBox(ticks, this.style);
            var isPolar = coord.isPolar;
            var dimType = this._getDimType();
            var width = bbox.width,
              height = bbox.height;
            if (isPolar) {
              // 机坐标系的 y 不占位置
              if (dimType === 'y') {
                return null;
              }
              // 4 个方向都需要留空
              return ['top', 'right', 'bottom', 'left'].map(function (position) {
                return {
                  position: position,
                  width: width,
                  height: height,
                };
              });
            }
            // 直角坐标系下
            var position = this._getPosition();
            return {
              position: position,
              width: width,
              height: height,
            };
          },
          // 主要是计算coord的布局
        },
        {
          key: 'updateCoord',
          value: function updateCoord() {
            var props = this.props;
            var chart = props.chart;
            var layout = this.measureLayout();
            chart.updateCoordFor(this, layout);
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              style = this.style;
            var visible = props.visible,
              coord = props.coord;
            if (visible === false) {
              return null;
            }
            var ticks = this.getTicks();
            var position = this._getPosition();
            var dimType = this._getDimType();
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  style: style,
                  ticks: this.convertTicks(ticks),
                  coord: coord,
                  position: position,
                  dimType: dimType,
                }
              )
            );
          },
        },
      ]);
      return Axis;
    })(Component);
  };

  // const { Vector2 } = G;
  // 相对圆心偏移量的点
  function getOffsetPoint(center, point, offset) {
    var vectorX = point.x - center.x;
    var vectorY = point.y - center.y;
    var vector = [vectorX, vectorY];
    var vectorLength = Vector2.length(vector);
    var offsetLength = vectorLength + offset;
    var x = (vectorX / vectorLength) * offsetLength;
    var y = (vectorY / vectorLength) * offsetLength;
    return {
      x: center.x + x,
      y: center.y + y,
    };
  }
  // 获取文本的对齐方式
  function getTextAlignInfo(center, point) {
    // 文本点向量
    var vector = [point.x - center.x, point.y - center.y];
    var align;
    var baseLine;
    // 水平对齐
    if (vector[0] > 0) {
      align = 'left';
    } else if (vector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
    }
    // 垂直对齐
    if (vector[1] > 0) {
      baseLine = 'top';
    } else if (vector[1] < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }
    return {
      textAlign: align,
      textBaseline: baseLine,
    };
  }
  var Line$1 = function Line(props) {
    var line = props.line,
      gridType = props.gridType,
      center = props.center,
      radius = props.radius,
      ticks = props.ticks;
    if (!line) return null;
    if (gridType !== 'line') {
      return jsx('arc', {
        attrs: _objectSpread(
          {
            x: center.x,
            y: center.y,
            r: radius,
          },
          line
        ),
      });
    }
    var points = ticks.map(function (tick) {
      var points = tick.points;
      return points[points.length - 1];
    });
    // 头尾相连
    points.push(points[0]);
    return jsx('polyline', {
      attrs: _objectSpread(
        {
          points: points,
        },
        line
      ),
    });
  };
  var PolarX = function (props) {
    var ticks = props.ticks,
      coord = props.coord,
      style = props.style,
      gridType = props.grid;
    var center = coord.center;
    var grid = style.grid,
      tickLine = style.tickLine,
      line = style.line,
      labelOffset = style.labelOffset,
      label = style.label;
    var firstTicks = ticks[0];
    var points = firstTicks.points;
    var end = points[points.length - 1];
    var radius = Vector2.length([end.x - center.x, end.y - center.y]);
    return jsx(
      'group',
      null,
      grid
        ? ticks.map(function (tick) {
            var points = tick.points,
              gridStyle = tick.gridStyle;
            var end = points[points.length - 1];
            return jsx('line', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x1: center.x,
                    y1: center.y,
                    x2: end.x,
                    y2: end.y,
                  },
                  grid
                ),
                gridStyle
              ),
            });
          })
        : null,
      tickLine && tickLine.length
        ? ticks.map(function (tick) {
            var points = tick.points;
            var end = points[points.length - 1];
            var offsetPoint = getOffsetPoint(center, end, tickLine.length);
            return jsx('line', {
              attrs: _objectSpread(
                {
                  x1: end.x,
                  y1: end.y,
                  x2: offsetPoint.x,
                  y2: offsetPoint.y,
                },
                tickLine
              ),
            });
          })
        : null,
      jsx(Line$1, {
        line: line,
        gridType: gridType,
        center: center,
        radius: radius,
        ticks: ticks,
      }),
      label
        ? ticks.map(function (tick) {
            var points = tick.points,
              text = tick.text,
              labelStyle = tick.labelStyle;
            var end = points[points.length - 1];
            var offsetPoint = getOffsetPoint(center, end, labelOffset);
            return jsx('text', {
              attrs: _objectSpread(
                _objectSpread(
                  _objectSpread(
                    {
                      x: offsetPoint.x,
                      y: offsetPoint.y,
                      text: text,
                    },
                    getTextAlignInfo(center, end)
                  ),
                  label
                ),
                labelStyle
              ),
            });
          })
        : null
    );
  };

  var PolarY = function (props) {
    var ticks = props.ticks,
      coord = props.coord,
      style = props.style,
      gridType = props.grid;
    var center = coord.center;
    var grid = style.grid,
      tickLine = style.tickLine,
      line = style.line,
      labelOffset = style.labelOffset,
      label = style.label;
    return jsx(
      'group',
      null,
      grid
        ? ticks.map(function (tick) {
            var points = tick.points,
              gridStyle = tick.gridStyle,
              gridPoints = tick.gridPoints;
            var end = points[points.length - 1];
            if (gridType !== 'line') {
              return jsx('arc', {
                attrs: _objectSpread(
                  _objectSpread(
                    {
                      x: center.x,
                      y: center.y,
                      r: Vector2.length([end.x - center.x, end.y - center.y]),
                    },
                    grid
                  ),
                  gridStyle
                ),
              });
            }
            return jsx('polyline', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    points: gridPoints,
                  },
                  grid
                ),
                gridStyle
              ),
            });
          })
        : null,
      tickLine && tickLine.length
        ? ticks.map(function (tick) {
            var points = tick.points;
            var end = points[points.length - 1];
            return jsx('line', {
              attrs: _objectSpread(
                {
                  x1: end.x,
                  y1: end.y,
                  x2: end.x - tickLine.length,
                  y2: end.y,
                },
                tickLine
              ),
            });
          })
        : null,
      line
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: ticks[0].points[0].x,
                y1: ticks[0].points[0].y,
                x2: ticks[ticks.length - 1].points[0].x,
                y2: ticks[ticks.length - 1].points[0].y,
              },
              line
            ),
          })
        : null,
      label
        ? ticks.map(function (tick) {
            var points = tick.points,
              text = tick.text,
              labelStyle = tick.labelStyle;
            var end = points[points.length - 1];
            return jsx('text', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x: end.x - labelOffset,
                    y: end.y,
                    text: text,
                    textAlign: 'right',
                    textBaseline: 'middle',
                  },
                  label
                ),
                labelStyle
              ),
            });
          })
        : null
    );
  };

  var Top = function (props) {
    var ticks = props.ticks,
      coord = props.coord,
      style = props.style;
    var left = coord.left,
      top = coord.top,
      right = coord.right;
    var grid = style.grid,
      tickLine = style.tickLine,
      line = style.line,
      labelOffset = style.labelOffset,
      label = style.label;
    return jsx(
      'group',
      null,
      grid
        ? ticks.map(function (tick) {
            var points = tick.points,
              gridStyle = tick.gridStyle;
            var start = points[0];
            var end = points[points.length - 1];
            return jsx('line', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y,
                  },
                  grid
                ),
                gridStyle
              ),
            });
          })
        : null,
      tickLine && tickLine.length
        ? ticks.map(function (tick) {
            var points = tick.points;
            var end = points[points.length - 1];
            return jsx('line', {
              attrs: _objectSpread(
                {
                  x1: end.x,
                  y1: end.y,
                  x2: end.x,
                  y2: end.y - tickLine.length,
                },
                tickLine
              ),
            });
          })
        : null,
      line
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: left,
                y1: top,
                x2: right,
                y2: top,
              },
              line
            ),
          })
        : null,
      label
        ? ticks.map(function (tick, _index) {
            var points = tick.points,
              text = tick.text,
              labelStyle = tick.labelStyle;
            var end = points[points.length - 1];
            return jsx('text', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x: end.x,
                    y: end.y - labelOffset,
                    textAlign: 'center',
                    textBaseline: 'bottom',
                    text: text,
                  },
                  label
                ),
                labelStyle
              ),
            });
          })
        : null
    );
  };

  var Bottom = function (props, context) {
    var ticks = props.ticks,
      coord = props.coord,
      style = props.style,
      animation = props.animation;
    var px2hd = context.px2hd;
    var left = coord.left,
      right = coord.right,
      bottom = coord.bottom;
    var grid = style.grid,
      tickLine = style.tickLine,
      line = style.line,
      labelOffset = style.labelOffset,
      label = style.label;
    return jsx(
      'group',
      null,
      grid
        ? ticks.map(function (tick) {
            var points = tick.points,
              tickValue = tick.tickValue,
              gridStyle = tick.gridStyle;
            var start = points[0];
            var end = points[points.length - 1];
            return jsx('line', {
              key: tickValue,
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y,
                  },
                  grid
                ),
                gridStyle
              ),
            });
          })
        : null,
      tickLine && tickLine.length
        ? ticks.map(function (tick) {
            var points = tick.points,
              tickValue = tick.tickValue;
            var start = points[0];
            return jsx('line', {
              key: tickValue,
              attrs: _objectSpread(
                {
                  x1: start.x,
                  y1: start.y,
                  x2: start.x,
                  y2: start.y + px2hd(tickLine.length),
                },
                tickLine
              ),
            });
          })
        : null,
      line
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: left,
                y1: bottom,
                x2: right,
                y2: bottom,
              },
              line
            ),
          })
        : null,
      label
        ? ticks.map(function (tick, index) {
            var points = tick.points,
              text = tick.text,
              tickValue = tick.tickValue,
              labelStyle = tick.labelStyle;
            var start = points[0];
            var _ref = labelStyle || label || {},
              _ref$align = _ref.align,
              align = _ref$align === void 0 ? 'center' : _ref$align;
            var textAttrs = _objectSpread(
              _objectSpread(
                {
                  x: start.x,
                  y: start.y + labelOffset,
                  textBaseline: 'top',
                  text: text,
                },
                label
              ),
              labelStyle
            );
            if (align === 'between') {
              if (index === 0) {
                textAttrs.textAlign = 'start';
              } else if (index === ticks.length - 1) {
                textAttrs.textAlign = 'end';
              } else {
                textAttrs.textAlign = 'center';
              }
            } else {
              textAttrs.textAlign = align;
            }
            return jsx('text', {
              key: tickValue,
              attrs: textAttrs,
              animation: animation || {
                appear: {
                  easing: 'linear',
                  duration: 300,
                  delay: 0,
                  property: ['fillOpacity'],
                  start: {
                    fillOpacity: 0,
                  },
                  end: {
                    fillOpacity: 1,
                  },
                },
                update: {
                  easing: 'linear',
                  duration: 450,
                  delay: 0,
                  property: ['x', 'y'],
                },
                leave: {
                  easing: 'linear',
                  duration: 450,
                  delay: 0,
                  property: ['fillOpacity'],
                  start: {
                    fillOpacity: 1,
                  },
                  end: {
                    fillOpacity: 0,
                  },
                },
              },
            });
          })
        : null
    );
  };

  var Right = function (props) {
    var ticks = props.ticks,
      coord = props.coord,
      style = props.style;
    var top = coord.top,
      right = coord.right,
      bottom = coord.bottom;
    var grid = style.grid,
      tickLine = style.tickLine,
      line = style.line,
      labelOffset = style.labelOffset,
      label = style.label;
    return jsx(
      'group',
      null,
      grid
        ? ticks.map(function (tick) {
            var points = tick.points,
              gridStyle = tick.gridStyle;
            var start = points[0];
            var end = points[points.length - 1];
            return jsx('line', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y,
                  },
                  grid
                ),
                gridStyle
              ),
            });
          })
        : null,
      tickLine && tickLine.length
        ? ticks.map(function (tick) {
            var points = tick.points;
            var end = points[points.length - 1];
            return jsx('line', {
              attrs: _objectSpread(
                {
                  x1: end.x,
                  y1: end.y,
                  x2: end.x + tickLine.length,
                  y2: end.y,
                },
                tickLine
              ),
            });
          })
        : null,
      line
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: right,
                y1: top,
                x2: right,
                y2: bottom,
              },
              line
            ),
          })
        : null,
      label
        ? ticks.map(function (tick, _index) {
            var points = tick.points,
              text = tick.text,
              labelStyle = tick.labelStyle;
            var end = points[points.length - 1];
            return jsx('text', {
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x: end.x + labelOffset,
                    y: end.y,
                    textAlign: 'left',
                    textBaseline: 'middle',
                    text: text,
                  },
                  label
                ),
                labelStyle
              ),
            });
          })
        : null
    );
  };

  var Left = function (props) {
    var ticks = props.ticks,
      coord = props.coord,
      style = props.style,
      animation = props.animation;
    var left = coord.left,
      top = coord.top,
      bottom = coord.bottom;
    var grid = style.grid,
      tickLine = style.tickLine,
      line = style.line,
      labelOffset = style.labelOffset,
      label = style.label;
    return jsx(
      'group',
      null,
      grid
        ? ticks.map(function (tick) {
            var points = tick.points,
              tickValue = tick.tickValue,
              gridStyle = tick.gridStyle;
            var start = points[0];
            var end = points[points.length - 1];
            return jsx('line', {
              key: tickValue,
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y,
                  },
                  grid
                ),
                gridStyle
              ),
            });
          })
        : null,
      tickLine && tickLine.length
        ? ticks.map(function (tick) {
            var points = tick.points,
              tickValue = tick.tickValue;
            var start = points[0];
            return jsx('line', {
              key: tickValue,
              attrs: _objectSpread(
                {
                  x1: start.x,
                  y1: start.y,
                  x2: start.x - tickLine.length,
                  y2: start.y,
                },
                tickLine
              ),
            });
          })
        : null,
      line
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: left,
                y1: top,
                x2: left,
                y2: bottom,
              },
              line
            ),
          })
        : null,
      label
        ? ticks.map(function (tick, _index) {
            var tickValue = tick.tickValue,
              points = tick.points,
              text = tick.text,
              labelStyle = tick.labelStyle;
            var start = points[0];
            return jsx('text', {
              key: tickValue,
              attrs: _objectSpread(
                _objectSpread(
                  {
                    x: start.x - labelOffset,
                    y: start.y,
                    textAlign: 'right',
                    textBaseline: 'middle',
                    text: text,
                  },
                  label
                ),
                labelStyle
              ),
              animation: animation || {
                appear: {
                  easing: 'linear',
                  duration: 300,
                  delay: 0,
                  property: ['fillOpacity'],
                  start: {
                    fillOpacity: 0,
                  },
                  end: {
                    fillOpacity: 1,
                  },
                },
                update: {
                  easing: 'linear',
                  duration: 450,
                  delay: 0,
                  property: ['x', 'y'],
                },
                leave: {
                  easing: 'linear',
                  duration: 450,
                  delay: 0,
                  property: ['fillOpacity'],
                  start: {
                    fillOpacity: 1,
                  },
                  end: {
                    fillOpacity: 0,
                  },
                },
              },
            });
          })
        : null
    );
  };

  function isPolar(props) {
    return props.coord.isPolar;
  }
  var AxisView = function (props) {
    // 极坐标
    if (isPolar(props)) {
      var dimType = props.dimType;
      if (dimType === 'x') {
        return jsx(PolarX, _objectSpread({}, props));
      }
      return jsx(PolarY, _objectSpread({}, props));
    }
    var position = props.position;
    // 直角坐标
    if (position === 'right') {
      return jsx(Right, _objectSpread({}, props));
    }
    if (position === 'left') {
      return jsx(Left, _objectSpread({}, props));
    }
    if (position === 'top') {
      return jsx(Top, _objectSpread({}, props));
    }
    return jsx(Bottom, _objectSpread({}, props));
  };

  var index$4 = withAxis(AxisView);

  var withLegend = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Legend, _Component);
      var _super = _createSuper(Legend);
      function Legend(props) {
        var _this;
        _classCallCheck(this, Legend);
        _this = _super.call(this, props);
        _this.state = {
          filtered: {},
          items: [],
        };
        return _this;
      }
      _createClass(Legend, [
        {
          key: 'getOriginItems',
          value: function getOriginItems() {
            var chart = this.props.chart;
            return chart.getLegendItems();
          },
        },
        {
          key: 'getItems',
          value: function getItems() {
            var _props$items;
            var props = this.props,
              state = this.state;
            var filtered = state.filtered;
            var renderItems = (
              (_props$items = props.items) === null || _props$items === void 0
                ? void 0
                : _props$items.length
            )
              ? props.items
              : this.getOriginItems();
            if (!renderItems) return null;
            return renderItems.map(function (item) {
              var tickValue = item.tickValue;
              return _objectSpread(
                _objectSpread({}, item),
                {},
                {
                  filtered: filtered[tickValue],
                }
              );
            });
          },
        },
        {
          key: 'setItems',
          value: function setItems(items) {
            this.setState({
              items: items,
            });
          },
        },
        {
          key: 'getMaxItemBox',
          value: function getMaxItemBox(legendShape) {
            var maxItemWidth = 0;
            var maxItemHeight = 0;
            (legendShape.get('children') || []).forEach(function (child) {
              var _child$get = child.get('attrs'),
                width = _child$get.width,
                height = _child$get.height;
              maxItemWidth = Math.max(maxItemWidth, width);
              maxItemHeight = Math.max(maxItemHeight, height);
            });
            return {
              width: maxItemWidth,
              height: maxItemHeight,
            };
          },
          // 计算 legend 的位置
        },
        {
          key: '_init',
          value: function _init() {
            var props = this.props,
              context = this.context;
            var parentLayout = props.layout,
              customWidth = props.width,
              customHeight = props.height,
              _props$position = props.position,
              position = _props$position === void 0 ? 'top' : _props$position;
            var items = this.getItems();
            if (!items || !items.length) return;
            var left = parentLayout.left,
              top = parentLayout.top,
              right = parentLayout.right,
              bottom = parentLayout.bottom,
              layoutWidth = parentLayout.width,
              layoutHeight = parentLayout.height;
            var width = context.px2hd(customWidth) || layoutWidth;
            var shape = renderShape(this, this.render(), false);
            var _this$getMaxItemBox = this.getMaxItemBox(shape),
              itemMaxWidth = _this$getMaxItemBox.width,
              itemMaxHeight = _this$getMaxItemBox.height;
            // 每行最多的个数
            var lineMaxCount = Math.floor(width / itemMaxWidth);
            var itemCount = items.length;
            // legend item 的行数
            var lineCount = Math.ceil(itemCount / lineMaxCount);
            var itemWidth = width / lineMaxCount;
            var autoHeight = itemMaxHeight * lineCount;
            var style = {
              left: left,
              top: top,
              width: width,
              // height 默认自适应
              height: undefined,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
            };
            // 如果只有一行，2端对齐
            if (lineCount === 1) {
              style.justifyContent = 'space-between';
            }
            if (position === 'top') {
              style.height = customHeight ? customHeight : autoHeight;
            }
            if (position === 'left') {
              style.flexDirection = 'column';
              style.justifyContent = 'center';
              style.width = itemMaxWidth;
              style.height = customHeight ? customHeight : layoutHeight;
            }
            if (position === 'right') {
              style.flexDirection = 'column';
              style.alignItems = 'flex-start';
              style.justifyContent = 'center';
              style.width = itemMaxWidth;
              style.height = customHeight ? customHeight : layoutHeight;
              style.left = right - itemMaxWidth;
            }
            if (position === 'bottom') {
              style.top = bottom - autoHeight;
              style.height = customHeight ? customHeight : autoHeight;
            }
            this.itemWidth = itemWidth;
            this.style = style;
            shape.remove();
          },
        },
        {
          key: 'updateCoord',
          value: function updateCoord() {
            var context = this.context,
              props = this.props,
              style = this.style;
            var _props$position2 = props.position,
              position = _props$position2 === void 0 ? 'top' : _props$position2,
              _props$margin = props.margin,
              margin = _props$margin === void 0 ? '30px' : _props$margin,
              chart = props.chart;
            var width = style.width,
              height = style.height;
            var marginNumber = context.px2hd(margin);
            chart.updateCoordFor(this, {
              position: position,
              width: width + marginNumber,
              height: height + marginNumber,
            });
          },
        },
        {
          key: 'willMount',
          value: function willMount() {
            var items = this.getItems();
            if (!items || !items.length) return;
            this._init();
            this.updateCoord();
          },
        },
        {
          key: 'didMount',
          value: function didMount() {
            this._initEvent();
          },
        },
        {
          key: 'willUpdate',
          value: function willUpdate() {
            var items = this.getItems();
            if (!items || !items.length) return;
            this.updateCoord();
          },
        },
        {
          key: '_initEvent',
          value: function _initEvent() {
            var _this2 = this;
            var context = this.context,
              props = this.props,
              container = this.container;
            var canvas = context.canvas;
            var chart = props.chart,
              _props$clickable = props.clickable,
              clickable = _props$clickable === void 0 ? true : _props$clickable,
              onClick = props.onClick;
            if (!clickable) return;
            // item 点击事件
            canvas.on('click', function (ev) {
              var points = ev.points;
              var point = points[0];
              var bbox = container.getBBox();
              if (!isInBBox(bbox, point)) {
                return;
              }
              var legendItems = getElementsByClassName('legend-item', container);
              if (!legendItems.length) {
                return;
              }
              var clickItem = find(legendItems, function (item) {
                var itemBBox = item.getBBox();
                return isInBBox(itemBBox, point);
              });
              if (!clickItem) {
                return;
              }
              var dataItem = clickItem.get('data-item');
              if (!dataItem) {
                return;
              }
              if (isFunction(onClick)) {
                onClick(dataItem);
              }
              var field = dataItem.field,
                tickValue = dataItem.tickValue;
              var prevFiltered = _this2.state.filtered;
              var filtered = _objectSpread(
                _objectSpread({}, prevFiltered),
                {},
                _defineProperty({}, tickValue, !prevFiltered[tickValue])
              );
              _this2.setState({
                filtered: filtered,
              });
              chart.filter(field, function (value) {
                return !filtered[value];
              });
            });
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              itemWidth = this.itemWidth,
              style = this.style;
            var items = this.getItems();
            if (!items || !items.length) {
              return null;
            }
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  items: items,
                  itemWidth: itemWidth,
                  style: _objectSpread(_objectSpread({}, style), props.style),
                }
              )
            );
          },
        },
      ]);
      return Legend;
    })(Component);
  };

  var Marker$1 = function Marker(_ref) {
    var type = _ref.type,
      color = _ref.color;
    if (type === 'square') {
      return jsx('rect', {
        style: {
          width: '12px',
          height: '12px',
          marginRight: '10px',
        },
        attrs: {
          fill: color,
        },
      });
    }
    if (type === 'line') {
      return jsx('line', {
        style: {
          width: '19px',
          marginRight: '10px',
        },
        attrs: {
          strokeStyle: color,
          lineCap: 'round',
          lineWidth: '4px',
        },
      });
    }
    return jsx('circle', {
      style: {
        width: '12px',
        height: '12px',
        marginRight: '10px',
      },
      attrs: {
        fill: color,
      },
    });
  };
  var LegendView = function (props) {
    var items = props.items,
      itemWidth = props.itemWidth,
      itemFormatter = props.itemFormatter,
      style = props.style,
      _props$marker = props.marker,
      marker = _props$marker === void 0 ? 'circle' : _props$marker,
      itemStyle = props.itemStyle,
      nameStyle = props.nameStyle,
      valueStyle = props.valueStyle,
      valuePrefix = props.valuePrefix;
    var formatValue = function formatValue(value) {
      var valuePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ': ';
      return ''.concat(valuePrefix).concat(value);
    };
    return jsx(
      'group',
      {
        style: style,
      },
      items.map(function (item) {
        var color = item.color,
          name = item.name,
          value = item.value,
          filtered = item.filtered,
          tickValue = item.tickValue;
        var valueText = isFunction(itemFormatter) ? itemFormatter(value, tickValue) : value;
        return jsx(
          'group',
          {
            className: 'legend-item',
            style: _objectSpread(
              {
                width: itemWidth,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: ['6px', '6px', '6px', 0],
              },
              itemStyle
            ),
            'data-item': item,
          },
          jsx(Marker$1, {
            color: filtered ? '#bfbfbf' : color,
            type: marker,
          }),
          jsx('text', {
            attrs: _objectSpread(
              {
                fill: filtered ? '#bfbfbf' : '#808080',
                text: name,
              },
              nameStyle
            ),
          }),
          valueText
            ? jsx('text', {
                attrs: _objectSpread(
                  {
                    fill: '#808080',
                    text: formatValue(valueText, valuePrefix),
                  },
                  valueStyle
                ),
              })
            : null
        );
      })
    );
  };

  var index$5 = withLegend(LegendView);

  function isInBBox$1(bbox, point) {
    var minX = bbox.minX,
      maxX = bbox.maxX,
      minY = bbox.minY,
      maxY = bbox.maxY;
    var x = point.x,
      y = point.y;
    return minX <= x && maxX >= x && minY <= y && maxY >= y;
  }
  var withGuide = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Guide, _Component);
      var _super = _createSuper(Guide);
      function Guide(props) {
        var _this;
        _classCallCheck(this, Guide);
        _this = _super.call(this, props);
        // 创建ref
        _this.triggerRef = {};
        _this.state = {};
        return _this;
      }
      _createClass(Guide, [
        {
          key: 'willMount',
          value: function willMount() {
            _get$1(_getPrototypeOf(Guide.prototype), 'willMount', this).call(this);
            this.getGuideBBox();
          },
        },
        {
          key: 'didMount',
          value: function didMount() {
            var _this2 = this;
            var context = this.context,
              props = this.props;
            var canvas = context.canvas;
            var onClick = props.onClick;
            canvas.on('click', function (ev) {
              var points = ev.points;
              var shape = _this2.triggerRef.current;
              if (!shape || shape.isDestroyed()) return;
              var bbox = shape.getBBox();
              if (isInBBox$1(bbox, points[0])) {
                ev.shape = shape;
                onClick && onClick(ev);
              }
            });
          },
        },
        {
          key: 'didUpdate',
          value: function didUpdate() {
            _get$1(_getPrototypeOf(Guide.prototype), 'didUpdate', this).call(this);
            var shape = this.triggerRef.current;
            if (!shape || shape.isDestroyed()) return;
            var _shape$get = shape.get('attrs'),
              x = _shape$get.x,
              y = _shape$get.y,
              width = _shape$get.width,
              height = _shape$get.height;
            var bbox = {
              minX: x,
              minY: y,
              maxX: x + width,
              maxY: y + height,
              width: width,
              height: height,
            };
            this.setState({
              guideBBox: bbox,
            });
          },
        },
        {
          key: 'getGuideBBox',
          value: function getGuideBBox() {
            var shape = renderShape(this, this.render(), false);
            var _shape$get2 = shape.get('attrs'),
              x = _shape$get2.x,
              y = _shape$get2.y,
              width = _shape$get2.width,
              height = _shape$get2.height;
            // getBBox 没有包含 padding 所以这里手动计算 bbox
            var bbox = {
              minX: x,
              minY: y,
              maxX: x + width,
              maxY: y + height,
              width: width,
              height: height,
            };
            this.setState({
              guideBBox: bbox,
            });
            shape.destroy();
          },
          // 解析record里的模板字符串，如min、max、50%...
        },
        {
          key: 'parseReplaceStr',
          value: function parseReplaceStr(value, scale) {
            var replaceMap = {
              min: 0,
              max: 1,
              median: 0.5,
            };
            // 传入的是 min、max、median 的
            if (!isNil(replaceMap[value])) {
              return replaceMap[value];
            }
            // 传入的是 xx%
            if (isString(value) && value.indexOf('%') != -1 && !isNaN(Number(value.slice(0, -1)))) {
              var rateValue = Number(value.slice(0, -1));
              var percent = rateValue / 100;
              return percent;
            }
            return scale.scale(value);
          },
        },
        {
          key: 'parsePoint',
          value: function parsePoint(record) {
            var props = this.props;
            var chart = props.chart,
              coord = props.coord;
            var xScale = chart.getXScales()[0];
            // 只取第一个yScale
            var yScale = chart.getYScales()[0];
            // 解析 record 为归一化后的坐标
            var x = this.parseReplaceStr(record[xScale.field], xScale);
            var y = this.parseReplaceStr(record[yScale.field], yScale);
            return coord.convertPoint({
              x: x,
              y: y,
            });
          },
        },
        {
          key: 'convertPoints',
          value: function convertPoints(records) {
            var _this3 = this;
            return records.map(function (record) {
              return _this3.parsePoint(record);
            });
          },
        },
        {
          key: 'getGuideTheme',
          value: function getGuideTheme() {
            var context = this.context;
            var theme = context.theme;
            return theme.guide;
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              context = this.context;
            var coord = props.coord,
              _props$records = props.records,
              records = _props$records === void 0 ? [] : _props$records,
              animation = props.animation,
              chart = props.chart;
            var width = context.width,
              height = context.height;
            var points = this.convertPoints(records);
            var theme = this.getGuideTheme();
            var guideBBox = this.state.guideBBox;
            var animationCfg = animation;
            if (isFunction(animation)) {
              // 透传绘制关键点和chart实例
              animationCfg = animation(points, chart);
            }
            return jsx(
              View,
              _objectSpread(
                _objectSpread(
                  {
                    triggerRef: this.triggerRef,
                    points: points,
                    theme: theme,
                    coord: coord,
                  },
                  props
                ),
                {},
                {
                  canvasWidth: width,
                  canvasHeight: height,
                  guideBBox: guideBBox,
                  animation: animationCfg,
                }
              )
            );
          },
        },
      ]);
      return Guide;
    })(Component);
  };

  var TextGuideView = function (props, context) {
    var _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme;
    var _deepMix = deepMix(_objectSpread({}, theme.text), props),
      points = _deepMix.points,
      style = _deepMix.style,
      offsetX = _deepMix.offsetX,
      offsetY = _deepMix.offsetY,
      content = _deepMix.content,
      animation = _deepMix.animation;
    var _ref = points[0] || {},
      x = _ref.x,
      y = _ref.y;
    var offsetXNum = context.px2hd(offsetX);
    var offsetYNum = context.px2hd(offsetY);
    var posX = x + (offsetXNum || 0);
    var posY = y + (offsetYNum || 0);
    return jsx('text', {
      attrs: _objectSpread(
        {
          text: content,
          x: posX,
          y: posY,
        },
        style
      ),
      animation: deepMix(
        {
          update: {
            easing: 'linear',
            duration: 450,
            property: ['x', 'y'],
          },
        },
        animation
      ),
    });
  };

  var PointGuideView = function (props, context) {
    var theme = props.theme;
    var _deepMix = deepMix(_objectSpread({}, theme.point), props),
      points = _deepMix.points,
      style = _deepMix.style,
      offsetX = _deepMix.offsetX,
      offsetY = _deepMix.offsetY,
      animation = _deepMix.animation;
    var _ref = points[0] || {},
      x = _ref.x,
      y = _ref.y;
    var offsetXNum = context.px2hd(offsetX);
    var offsetYNum = context.px2hd(offsetY);
    var posX = x + (offsetXNum || 0);
    var posY = y + (offsetYNum || 0);
    return jsx(
      'group',
      null,
      jsx('circle', {
        attrs: _objectSpread(
          {
            x: posX,
            y: posY,
          },
          style
        ),
        animation: animation,
      })
    );
  };

  var LineGuideView = function (props, context) {
    var _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme;
    var _deepMix = deepMix(_objectSpread({}, theme.line), props),
      points = _deepMix.points,
      style = _deepMix.style,
      offsetX = _deepMix.offsetX,
      offsetY = _deepMix.offsetY,
      animation = _deepMix.animation;
    var _ref = points[0] || {},
      x1 = _ref.x,
      y1 = _ref.y;
    var _ref2 = points[1] || {},
      x2 = _ref2.x,
      y2 = _ref2.y;
    var offsetXNum = context.px2hd(offsetX);
    var offsetYNum = context.px2hd(offsetY);
    var posX1 = x1 + (isArray(offsetXNum) ? offsetXNum[0] || 0 : offsetXNum || 0);
    var posY1 = y1 + (isArray(offsetYNum) ? offsetYNum[0] || 0 : offsetYNum || 0);
    var posX2 = x2 + (isArray(offsetXNum) ? offsetXNum[1] || 0 : offsetXNum || 0);
    var posY2 = y2 + (isArray(offsetYNum) ? offsetYNum[1] || 0 : offsetYNum || 0);
    return jsx(
      'group',
      null,
      jsx('line', {
        attrs: _objectSpread(
          {
            x1: posX1,
            y1: posY1,
            x2: posX2,
            y2: posY2,
          },
          style
        ),
        animation: animation,
      })
    );
  };

  var ArcGuideView = function (props) {
    var _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme;
    var _deepMix = deepMix(_objectSpread({}, theme.line), props),
      coord = _deepMix.coord,
      points = _deepMix.points,
      style = _deepMix.style,
      animation = _deepMix.animation;
    var start = points[0] || {};
    var end = points[1] || {};
    var coordCenter = coord.center;
    var radius = Math.sqrt(
      (start.x - coordCenter.x) * (start.x - coordCenter.x) +
        (start.y - coordCenter.y) * (start.y - coordCenter.y)
    );
    var startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
    var endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);
    return jsx(
      'group',
      null,
      jsx('arc', {
        attrs: _objectSpread(
          {
            x: coordCenter.x,
            y: coordCenter.y,
            r: radius,
            startAngle: startAngle,
            endAngle: endAngle,
          },
          style
        ),
        animation: animation,
      })
    );
  };

  var RectGuideView = function (props) {
    var _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme;
    var _deepMix = deepMix(_objectSpread({}, theme.rect), props),
      points = _deepMix.points,
      style = _deepMix.style,
      animation = _deepMix.animation;
    var start = points[0] || {};
    var end = points[1] || {};
    return jsx(
      'group',
      null,
      jsx('rect', {
        attrs: _objectSpread(
          {
            x: Math.min(start.x, end.x),
            y: Math.min(start.y, end.y),
            width: Math.abs(end.x - start.x),
            height: Math.abs(start.y - end.y),
          },
          style
        ),
        animation: animation,
      })
    );
  };

  var defaultProps = {
    offsetX: 0,
    offsetY: 0,
    points: [],
    src: '',
  };
  var baseAttrs = {
    height: '20px',
    width: '20px',
  };
  var ImageGuideView = function (props, context) {
    var cfg = deepMix({}, defaultProps, props);
    var points = cfg.points,
      style = cfg.style,
      attrs = cfg.attrs,
      offsetX = cfg.offsetX,
      offsetY = cfg.offsetY,
      src = cfg.src,
      animation = cfg.animation;
    var _ref = points[0] || {},
      x = _ref.x,
      y = _ref.y;
    var _attrs$height = attrs.height,
      height = _attrs$height === void 0 ? 0 : _attrs$height,
      _attrs$width = attrs.width,
      width = _attrs$width === void 0 ? 0 : _attrs$width;
    var heightNum = context.px2hd(height + 'px');
    var widthNum = context.px2hd(width + 'px');
    var offsetXNum = context.px2hd(offsetX);
    var offsetYNum = context.px2hd(offsetY);
    var posX = x + (offsetXNum || 0) - widthNum / 2;
    var posY = y + (offsetYNum || 0) - heightNum / 2;
    return jsx(
      'group',
      {
        style: style,
      },
      jsx('image', {
        attrs: _objectSpread(
          _objectSpread(_objectSpread({}, baseAttrs), attrs),
          {},
          {
            height: heightNum,
            width: widthNum,
            x: posX,
            y: posY,
            src: src,
          }
        ),
        cacheImage: true,
        animation: deepMix(
          {
            update: {
              easing: 'linear',
              duration: 450,
              property: ['x', 'y'],
            },
          },
          animation
        ),
      })
    );
  };

  var defaultProps$1 = {
    offsetX: 0,
    offsetY: 0,
    points: [],
    direct: 'tl',
    side: 6,
    autoAdjust: true,
  };
  var defaultStyle = {
    container: {
      fill: '#1677FF',
      radius: 2,
      padding: [3, 5],
    },
    text: {
      fontSize: '22px',
      fill: '#fff',
    },
    arrow: {
      fill: '#1677FF',
    },
  };
  var TagGuideView = function (props, context) {
    var cfg = _objectSpread(_objectSpread({}, defaultProps$1), props);
    var points = cfg.points,
      content = cfg.content,
      offsetX = cfg.offsetX,
      offsetY = cfg.offsetY,
      direct = cfg.direct,
      side = cfg.side,
      autoAdjust = cfg.autoAdjust,
      canvasWidth = cfg.canvasWidth,
      canvasHeight = cfg.canvasHeight,
      guideBBox = cfg.guideBBox,
      background = cfg.background,
      textStyle = cfg.textStyle,
      triggerRef = cfg.triggerRef;
    var _ref = points[0] || {},
      x = _ref.x,
      y = _ref.y;
    var _ref2 = guideBBox || {},
      guideWidth = _ref2.width,
      guideHeight = _ref2.height;
    var offsetXNum = context.px2hd(offsetX);
    var offsetYNum = context.px2hd(offsetY);
    var posX = x + (offsetXNum || 0);
    var posY = y + (offsetYNum || 0);
    var _getDirect = function _getDirect(point) {
      var newDirect = direct;
      var x = point.x,
        y = point.y;
      var vertical = newDirect[0];
      var horizontal = newDirect[1];
      // adjust for vertical direction
      if (vertical === 't' && y - side - guideHeight < 0) {
        vertical = 'b';
      } else if (vertical === 'b' && y + side + guideHeight > canvasHeight) {
        vertical = 't';
      }
      // adjust for horizontal direction
      var diff = vertical === 'c' ? side : 0;
      if (horizontal === 'l' && x - diff - guideWidth < 0) {
        horizontal = 'r';
      } else if (horizontal === 'r' && x + diff + guideWidth > canvasWidth) {
        horizontal = 'l';
      } else if (horizontal === 'c') {
        if (guideWidth / 2 + x + diff > canvasWidth) {
          horizontal = 'l';
        } else if (x - guideWidth / 2 - diff < 0) {
          horizontal = 'r';
        }
      }
      newDirect = vertical + horizontal;
      return newDirect;
    };
    var _getArrowPoints = function _getArrowPoints(direct) {
      var arrowPoints = [];
      // const { minX, minY } = guideBBox || {};
      if (direct === 'tl') {
        arrowPoints = [
          {
            x: posX,
            y: posY - side - 1,
          },
          {
            x: posX,
            y: posY,
          },
          {
            x: posX - side,
            y: posY - side - 1,
          },
        ];
        posX -= guideWidth || 0;
        posY = posY - (guideHeight || 0) - side;
      } else if (direct === 'cl') {
        arrowPoints = [
          {
            x: posX - side - 1,
            y: posY - side,
          },
          {
            x: posX - side - 1,
            y: posY + side,
          },
          {
            x: posX,
            y: posY,
          },
        ];
        posX = posX - (guideWidth || 0) - side;
        posY -= guideHeight / 2 || 0;
      } else if (direct === 'bl') {
        arrowPoints = [
          {
            x: posX,
            y: posY,
          },
          {
            x: posX,
            y: posY + side + 1,
          },
          {
            x: posX - side,
            y: posY + side + 1,
          },
        ];
        posX = posX - (guideWidth || 0);
        posY += side;
      } else if (direct === 'bc') {
        // 有问题
        arrowPoints = [
          {
            x: posX,
            y: posY,
          },
          {
            x: posX - side,
            y: posY + side + 1,
          },
          {
            x: posX + side,
            y: posY + side + 1,
          },
        ];
        posX = posX - (guideWidth / 2 || 0);
        posY = posY + side;
      } else if (direct === 'br') {
        arrowPoints = [
          {
            x: posX,
            y: posY,
          },
          {
            x: posX,
            y: posY + side + 1,
          },
          {
            x: posX + side,
            y: posY + side + 1,
          },
        ];
        posY += side;
      } else if (direct === 'cr') {
        arrowPoints = [
          {
            x: posX,
            y: posY,
          },
          {
            x: posX + side,
            y: posY - side,
          },
          {
            x: posX + side,
            y: posY + side,
          },
        ];
        posX += side;
        posY -= guideHeight / 2 || 0;
      } else if (direct === 'tr') {
        arrowPoints = [
          {
            x: posX,
            y: posY,
          },
          {
            x: posX,
            y: posY - side - 1,
          },
          {
            x: posX + side,
            y: posY - side - 1,
          },
        ];
        posY = posY - (guideHeight || 0) - side;
      } else if (direct === 'tc') {
        arrowPoints = [
          {
            x: posX,
            y: posY,
          },
          {
            x: posX - side,
            y: posY - side - 1,
          },
          {
            x: posX + side,
            y: posY - side - 1,
          },
        ];
        posX -= guideWidth / 2 || 0;
        posY = posY - (guideHeight || 0) - side;
      }
      return arrowPoints;
    };
    var dr = autoAdjust ? _getDirect(points[0]) : direct;
    var arrowPoints = _getArrowPoints(dr);
    return jsx(
      'group',
      {
        attrs: _objectSpread(
          {
            fill: defaultStyle.container.fill,
            radius: defaultStyle.container.radius,
          },
          background
        ),
        style: _objectSpread(
          {
            left: posX,
            top: posY,
            padding: defaultStyle.container.padding,
          },
          background
        ),
        ref: triggerRef,
      },
      jsx('text', {
        attrs: _objectSpread(
          {
            text: content,
            fontSize: defaultStyle.text.fontSize,
            fill: defaultStyle.text.fill,
          },
          textStyle
        ),
      }),
      guideBBox &&
        jsx('polygon', {
          attrs: {
            points: arrowPoints,
            fill:
              (background === null || background === void 0 ? void 0 : background.fill) ||
              defaultStyle.arrow.fill,
          },
        })
    );
  };

  var DefaultGuideView = function DefaultGuideView() {
    return null;
  };
  var TextGuide = withGuide(TextGuideView);
  var PointGuide = withGuide(PointGuideView);
  var LineGuide = withGuide(LineGuideView);
  var ArcGuide = withGuide(ArcGuideView);
  var RectGuide = withGuide(RectGuideView);
  var ImageGuide = withGuide(ImageGuideView);
  var TagGuide = withGuide(TagGuideView);
  var index$6 = withGuide(DefaultGuideView);

  var withTooltip = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Tooltip, _Component);
      var _super = _createSuper(Tooltip);
      function Tooltip(props) {
        var _this;
        _classCallCheck(this, Tooltip);
        _this = _super.call(this, props);
        _this._triggerOn = function (ev) {
          var points = ev.points;
          _this.show(points[0], ev);
        };
        _this._triggerOff = function () {
          var _assertThisInitialize = _assertThisInitialized(_this),
            _assertThisInitialize2 = _assertThisInitialize.props.alwaysShow,
            alwaysShow = _assertThisInitialize2 === void 0 ? false : _assertThisInitialize2;
          if (!alwaysShow) {
            _this.hide();
          }
        };
        _this.state = {
          records: null,
        };
        return _this;
      }
      _createClass(Tooltip, [
        {
          key: 'updateCoord',
          value: function updateCoord() {
            var props = this.props,
              context = this.context;
            var _props$padding = props.padding,
              padding = _props$padding === void 0 ? '10px' : _props$padding,
              chart = props.chart;
            chart.updateCoordFor(this, {
              position: 'top',
              width: 0,
              height: context.px2hd(padding),
            });
          },
        },
        {
          key: 'willMount',
          value: function willMount() {
            this.updateCoord();
          },
        },
        {
          key: 'didMount',
          value: function didMount() {
            this._initShow();
            this._initEvent();
          },
        },
        {
          key: 'willReceiveProps',
          value: function willReceiveProps(nextProps) {
            var nextDefaultItem = nextProps.defaultItem,
              nextCoord = nextProps.coord;
            var _this$props = this.props,
              lastDefaultItem = _this$props.defaultItem,
              lastCoord = _this$props.coord;
            // 默认元素或坐标有变动，均需重新渲染
            if (!equal(nextDefaultItem, lastDefaultItem) || !equal(nextCoord, lastCoord)) {
              this._showByData(nextDefaultItem);
            }
          },
        },
        {
          key: '_initShow',
          value: function _initShow() {
            var props = this.props;
            var defaultItem = props.defaultItem;
            this._showByData(defaultItem);
          },
        },
        {
          key: '_showByData',
          value: function _showByData(dataItem) {
            var _this2 = this;
            if (!dataItem) return;
            var props = this.props;
            var chart = props.chart;
            // 因为 tooltip 有可能在 geometry 之前，所以需要等 geometry render 完后再执行
            setTimeout(function () {
              var snapRecords = chart.getRecords(dataItem, 'xfield');
              _this2.showSnapRecords(snapRecords);
            }, 0);
          },
        },
        {
          key: '_initEvent',
          value: function _initEvent() {
            var context = this.context,
              props = this.props;
            var canvas = context.canvas;
            var _props$triggerOn = props.triggerOn,
              triggerOn = _props$triggerOn === void 0 ? 'press' : _props$triggerOn,
              _props$triggerOff = props.triggerOff,
              triggerOff = _props$triggerOff === void 0 ? 'pressend' : _props$triggerOff;
            canvas.on(triggerOn, this._triggerOn);
            canvas.on(triggerOff, this._triggerOff);
          },
        },
        {
          key: 'didUnmount',
          value: function didUnmount() {
            this._clearEvents();
          },
        },
        {
          key: '_clearEvents',
          value: function _clearEvents() {
            var context = this.context,
              props = this.props;
            var canvas = context.canvas;
            var _props$triggerOn2 = props.triggerOn,
              triggerOn = _props$triggerOn2 === void 0 ? 'press' : _props$triggerOn2,
              _props$triggerOff2 = props.triggerOff,
              triggerOff = _props$triggerOff2 === void 0 ? 'pressend' : _props$triggerOff2;
            // 解绑事件
            canvas.off(triggerOn, this._triggerOn);
            canvas.off(triggerOff, this._triggerOff);
          },
        },
        {
          key: 'show',
          value: function show(point, _ev) {
            var props = this.props;
            var chart = props.chart;
            var snapRecords = chart.getSnapRecords(point, true); // 超出边界会自动调整
            this.showSnapRecords(snapRecords);
          },
        },
        {
          key: 'showSnapRecords',
          value: function showSnapRecords(snapRecords) {
            if (!snapRecords || !snapRecords.length) return;
            var _this$props2 = this.props,
              chart = _this$props2.chart,
              onChange = _this$props2.onChange;
            var legendItems = chart.getLegendItems();
            var _snapRecords$ = snapRecords[0],
              xField = _snapRecords$.xField,
              yField = _snapRecords$.yField;
            var xScale = chart.getScale(xField);
            var yScale = chart.getScale(yField);
            var records = snapRecords.map(function (record) {
              var origin = record.origin,
                xField = record.xField,
                yField = record.yField;
              var value = yScale.getText(origin[yField]);
              // 默认取 alias 的配置
              var name = yScale.alias;
              if (!name) {
                name = xScale.getText(origin[xField]);
                if (legendItems && legendItems.length) {
                  var item = find(legendItems, function (item) {
                    var field = item.field,
                      tickValue = item.tickValue;
                    return origin[field] === tickValue;
                  });
                  if (item && item.name) {
                    name = item.name;
                  }
                }
              }
              return _objectSpread(
                _objectSpread({}, record),
                {},
                {
                  name: name,
                  value: value,
                }
              );
            });
            if (!isArray(records) || !records.length) {
              return;
            }
            this.setState({
              records: records,
            });
            if (isFunction(onChange)) {
              onChange(records);
            }
          },
        },
        {
          key: 'hide',
          value: function hide() {
            this.setState({
              records: null,
            });
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              state = this.state;
            var visible = props.visible;
            if (visible === false) {
              return null;
            }
            var records = state.records;
            if (!records || !records.length) return null;
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  records: records,
                }
              )
            );
          },
        },
      ]);
      return Tooltip;
    })(Component);
  };

  function createRef() {
    var ref = {
      current: null,
    };
    return ref;
  }

  // view 的默认配置
  var defaultStyle$1 = {
    showTitle: false,
    showCrosshairs: false,
    crosshairsType: 'y',
    crosshairsStyle: {
      stroke: 'rgba(0, 0, 0, 0.25)',
      lineWidth: '2px',
    },
    showTooltipMarker: false,
    markerBackgroundStyle: {
      fill: '#CCD6EC',
      opacity: 0.3,
      padding: '6px',
    },
    tooltipMarkerStyle: {
      fill: '#fff',
      lineWidth: '3px',
    },
    background: {
      radius: '4px',
      fill: 'rgba(0, 0, 0, 0.65)',
      padding: ['6px', '10px'],
    },
    titleStyle: {
      fontSize: '24px',
      fill: '#fff',
      textAlign: 'start',
      textBaseline: 'top',
    },
    nameStyle: {
      fontSize: '24px',
      fill: 'rgba(255, 255, 255, 0.65)',
      textAlign: 'start',
      textBaseline: 'middle',
    },
    valueStyle: {
      fontSize: '24px',
      fill: '#fff',
      textAlign: 'start',
      textBaseline: 'middle',
    },
    joinString: ': ',
    showItemMarker: true,
    itemMarkerStyle: {
      width: '12px',
      radius: '6px',
      symbol: 'circle',
      lineWidth: '2px',
      stroke: '#fff',
    },
    layout: 'horizontal',
    snap: false,
    xTipTextStyle: {
      fontSize: '24px',
      fill: '#fff',
    },
    yTipTextStyle: {
      fontSize: '24px',
      fill: '#fff',
    },
    xTipBackground: {
      radius: '4px',
      fill: 'rgba(0, 0, 0, 0.65)',
      padding: ['6px', '10px'],
      marginLeft: '-50%',
      marginTop: '6px',
    },
    yTipBackground: {
      radius: '4px',
      fill: 'rgba(0, 0, 0, 0.65)',
      padding: ['6px', '10px'],
      marginLeft: '-100%',
      marginTop: '-50%',
    },
  };
  function directionEnabled(mode, dir) {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }
    return false;
  }
  var RenderItemMarker = function RenderItemMarker(props) {
    var records = props.records,
      coord = props.coord,
      context = props.context,
      markerBackgroundStyle = props.markerBackgroundStyle;
    var point = coord.convertPoint({
      x: 1,
      y: 1,
    });
    var padding = context.px2hd(markerBackgroundStyle.padding || '6px');
    var xPoints = [].concat(
      _toConsumableArray(
        records.map(function (record) {
          return record.xMin;
        })
      ),
      _toConsumableArray(
        records.map(function (record) {
          return record.xMax;
        })
      )
    );
    var yPoints = [].concat(
      _toConsumableArray(
        records.map(function (record) {
          return record.yMin;
        })
      ),
      _toConsumableArray(
        records.map(function (record) {
          return record.yMax;
        })
      )
    );
    if (coord.transposed) {
      xPoints.push(point.x);
    } else {
      yPoints.push(point.y);
    }
    var xMin = Math.min.apply(null, xPoints);
    var xMax = Math.max.apply(null, xPoints);
    var yMin = Math.min.apply(null, yPoints);
    var yMax = Math.max.apply(null, yPoints);
    var x = coord.transposed ? xMin : xMin - padding;
    var y = coord.transposed ? yMin - padding : yMin;
    var width = coord.transposed ? xMax - xMin : xMax - xMin + 2 * padding;
    var height = coord.transposed ? yMax - yMin + 2 * padding : yMax - yMin;
    return jsx('rect', {
      attrs: _objectSpread(
        {
          x: x,
          y: y,
          width: width,
          height: height,
        },
        markerBackgroundStyle
      ),
    });
  };
  var RenderCrosshairs = function RenderCrosshairs(props) {
    var records = props.records,
      coord = props.coord,
      chart = props.chart,
      crosshairsType = props.crosshairsType,
      crosshairsStyle = props.crosshairsStyle;
    var coordLeft = coord.left,
      coordTop = coord.top,
      coordRight = coord.right,
      coordBottom = coord.bottom,
      center = coord.center;
    var firstRecord = records[0];
    var x = firstRecord.x,
      y = firstRecord.y,
      origin = firstRecord.origin,
      xField = firstRecord.xField;
    if (coord.isPolar) {
      // 极坐标下的辅助线
      var xScale = chart.getScale(xField);
      var ticks = xScale.getTicks();
      var tick = find(ticks, function (tick) {
        return origin[xField] === tick.tickValue;
      });
      var end = coord.convertPoint({
        x: tick.value,
        y: 1,
      });
      return jsx('line', {
        attrs: _objectSpread(
          {
            x1: center.x,
            y1: center.y,
            x2: end.x,
            y2: end.y,
          },
          crosshairsStyle
        ),
      });
    }
    return jsx(
      'group',
      null,
      directionEnabled(crosshairsType, 'x')
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: coordLeft,
                y1: y,
                x2: coordRight,
                y2: y,
              },
              crosshairsStyle
            ),
          })
        : null,
      directionEnabled(crosshairsType, 'y')
        ? jsx('line', {
            attrs: _objectSpread(
              {
                x1: x,
                y1: coordTop,
                x2: x,
                y2: coordBottom,
              },
              crosshairsStyle
            ),
          })
        : null
    );
  };
  var TooltipView = /*#__PURE__*/ (function (_Component) {
    _inherits(TooltipView, _Component);
    var _super = _createSuper(TooltipView);
    function TooltipView(props) {
      var _this;
      _classCallCheck(this, TooltipView);
      _this = _super.call(this, props);
      _this.rootRef = createRef();
      _this.arrowRef = createRef();
      return _this;
    }
    // 调整 显示的位置
    _createClass(TooltipView, [
      {
        key: '_position',
        value: function _position() {
          var props = this.props,
            context = this.context,
            rootRef = this.rootRef,
            arrowRef = this.arrowRef;
          var group = rootRef.current;
          if (!group) {
            return;
          }
          var records = props.records,
            coord = props.coord;
          var arrowWidth = context.px2hd('6px');
          var record = records[0];
          // 中心点
          var x = record.x;
          var coordLeft = coord.left,
            coordWidth = coord.width;
          var _group$get = group.get('attrs'),
            y = _group$get.y,
            width = _group$get.width,
            height = _group$get.height,
            radius = _group$get.radius;
          var halfWidth = width / 2;
          // 让 tooltip 限制在 coord 的显示范围内
          var offsetX = Math.min(
            Math.max(x - coordLeft - halfWidth, -arrowWidth - radius),
            coordWidth - width + arrowWidth + radius
          );
          // 因为默认是从 coord 的范围内显示的，所以要往上移，移出 coord，避免挡住 geometry
          var offset = Math.min(y, height + arrowWidth); // 因为不能超出 canvas 画布区域，所以最大只能是 y
          group.moveTo(offsetX, -offset);
          arrowRef.current.moveTo(0, height - offset);
        },
      },
      {
        key: 'didMount',
        value: function didMount() {
          this._position();
        },
      },
      {
        key: 'didUpdate',
        value: function didUpdate() {
          this._position();
        },
      },
      {
        key: 'render',
        value: function render() {
          var props = this.props,
            context = this.context;
          var records = props.records,
            coord = props.coord;
          var coordLeft = coord.left,
            coordTop = coord.top,
            coordBottom = coord.bottom;
          var firstRecord = records[0];
          var x = firstRecord.x,
            y = firstRecord.y;
          var xFirstText = firstRecord.name,
            yFirstText = firstRecord.value;
          var chart = props.chart,
            customBackground = props.background,
            _props$showTooltipMar = props.showTooltipMarker,
            showTooltipMarker =
              _props$showTooltipMar === void 0
                ? defaultStyle$1.showTooltipMarker
                : _props$showTooltipMar,
            _props$markerBackgrou = props.markerBackgroundStyle,
            markerBackgroundStyle =
              _props$markerBackgrou === void 0
                ? defaultStyle$1.markerBackgroundStyle
                : _props$markerBackgrou,
            _props$showItemMarker = props.showItemMarker,
            showItemMarker =
              _props$showItemMarker === void 0
                ? defaultStyle$1.showItemMarker
                : _props$showItemMarker,
            customItemMarkerStyle = props.itemMarkerStyle,
            nameStyle = props.nameStyle,
            valueStyle = props.valueStyle,
            _props$joinString = props.joinString,
            joinString =
              _props$joinString === void 0 ? defaultStyle$1.joinString : _props$joinString,
            _props$showCrosshairs = props.showCrosshairs,
            showCrosshairs =
              _props$showCrosshairs === void 0
                ? defaultStyle$1.showCrosshairs
                : _props$showCrosshairs,
            crosshairsStyle = props.crosshairsStyle,
            _props$crosshairsType = props.crosshairsType,
            crosshairsType =
              _props$crosshairsType === void 0
                ? defaultStyle$1.crosshairsType
                : _props$crosshairsType,
            _props$snap = props.snap,
            snap = _props$snap === void 0 ? defaultStyle$1.snap : _props$snap,
            _props$tooltipMarkerS = props.tooltipMarkerStyle,
            tooltipMarkerStyle =
              _props$tooltipMarkerS === void 0
                ? defaultStyle$1.tooltipMarkerStyle
                : _props$tooltipMarkerS,
            showXTip = props.showXTip,
            showYTip = props.showYTip,
            xTip = props.xTip,
            yTip = props.yTip,
            _props$xTipTextStyle = props.xTipTextStyle,
            xTipTextStyle =
              _props$xTipTextStyle === void 0 ? defaultStyle$1.xTipTextStyle : _props$xTipTextStyle,
            _props$yTipTextStyle = props.yTipTextStyle,
            yTipTextStyle =
              _props$yTipTextStyle === void 0 ? defaultStyle$1.yTipTextStyle : _props$yTipTextStyle,
            _props$xTipBackground = props.xTipBackground,
            xTipBackground =
              _props$xTipBackground === void 0
                ? defaultStyle$1.xTipBackground
                : _props$xTipBackground,
            _props$yTipBackground = props.yTipBackground,
            yTipBackground =
              _props$yTipBackground === void 0
                ? defaultStyle$1.yTipBackground
                : _props$yTipBackground,
            _props$custom = props.custom,
            custom = _props$custom === void 0 ? false : _props$custom,
            customText = props.customText;
          var itemMarkerStyle = _objectSpread(
            _objectSpread({}, customItemMarkerStyle),
            defaultStyle$1.itemMarkerStyle
          );
          var background = _objectSpread(
            _objectSpread({}, defaultStyle$1.background),
            customBackground
          );
          var arrowWidth = context.px2hd('6px');
          return jsx(
            'group',
            null,
            jsx(
              'group',
              {
                style: {
                  left: coordLeft,
                  top: coordTop,
                },
              },
              !custom &&
                jsx(
                  'group',
                  null,
                  jsx(
                    'group',
                    {
                      ref: this.rootRef,
                      style: background,
                      attrs: background,
                    },
                    jsx(
                      'group',
                      {
                        style: {
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          padding: [0, 0, 0, '6px'],
                        },
                      },
                      records.map(function (record) {
                        var name = record.name,
                          value = record.value;
                        return jsx(
                          'group',
                          {
                            style: {
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: [0, '6px', 0, 0],
                            },
                          },
                          showItemMarker
                            ? jsx('marker', {
                                style: {
                                  width: itemMarkerStyle.width,
                                  marginRight: '6px',
                                },
                                attrs: _objectSpread(
                                  _objectSpread({}, itemMarkerStyle),
                                  {},
                                  {
                                    fill: record.color,
                                  }
                                ),
                              })
                            : null,
                          customText && isFunction(customText)
                            ? customText(record)
                            : jsx(
                                'group',
                                {
                                  style: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                  },
                                },
                                jsx('text', {
                                  attrs: _objectSpread(
                                    _objectSpread(
                                      _objectSpread({}, defaultStyle$1.nameStyle),
                                      nameStyle
                                    ),
                                    {},
                                    {
                                      text: value ? ''.concat(name).concat(joinString) : name,
                                    }
                                  ),
                                }),
                                jsx('text', {
                                  attrs: _objectSpread(
                                    _objectSpread(
                                      _objectSpread({}, defaultStyle$1.valueStyle),
                                      valueStyle
                                    ),
                                    {},
                                    {
                                      text: value,
                                    }
                                  ),
                                })
                              )
                        );
                      })
                    )
                  ),
                  jsx('polygon', {
                    ref: this.arrowRef,
                    attrs: {
                      points: [
                        {
                          x: x - arrowWidth,
                          y: coordTop,
                        },
                        {
                          x: x + arrowWidth,
                          y: coordTop,
                        },
                        {
                          x: x,
                          y: coordTop + arrowWidth,
                        },
                      ],
                      fill: background.fill,
                    },
                  })
                ),
              showTooltipMarker
                ? jsx(RenderItemMarker, {
                    coord: coord,
                    context: context,
                    records: records,
                    markerBackgroundStyle: markerBackgroundStyle,
                  })
                : null,
              showCrosshairs
                ? jsx(RenderCrosshairs, {
                    chart: chart,
                    coord: coord,
                    records: records,
                    crosshairsType: crosshairsType,
                    crosshairsStyle: _objectSpread(
                      _objectSpread({}, defaultStyle$1.crosshairsStyle),
                      crosshairsStyle
                    ),
                  })
                : null,
              snap
                ? records.map(function (item) {
                    var x = item.x,
                      y = item.y,
                      color = item.color,
                      shape = item.shape;
                    return jsx('circle', {
                      attrs: _objectSpread(
                        _objectSpread(
                          {
                            x: x,
                            y: y,
                            r: '6px',
                            stroke: color,
                            fill: color,
                          },
                          shape
                        ),
                        tooltipMarkerStyle
                      ),
                    });
                  })
                : null
            ),
            showXTip &&
              jsx(
                'group',
                {
                  style: _objectSpread(
                    _objectSpread(
                      {
                        left: x,
                        top: coordBottom,
                      },
                      defaultStyle$1.xTipBackground
                    ),
                    xTipBackground
                  ),
                  attrs: _objectSpread(
                    _objectSpread({}, defaultStyle$1.xTipBackground),
                    xTipBackground
                  ),
                },
                jsx('text', {
                  attrs: _objectSpread(
                    _objectSpread(_objectSpread({}, defaultStyle$1.xTipTextStyle), xTipTextStyle),
                    {},
                    {
                      text: isFunction(xTip) ? xTip(xFirstText) : xFirstText,
                    }
                  ),
                })
              ),
            showYTip &&
              jsx(
                'group',
                {
                  style: _objectSpread(
                    _objectSpread(
                      {
                        left: coordLeft,
                        top: y,
                      },
                      defaultStyle$1.yTipBackground
                    ),
                    yTipBackground
                  ),
                  attrs: _objectSpread(
                    _objectSpread({}, defaultStyle$1.yTipBackground),
                    yTipBackground
                  ),
                },
                jsx('text', {
                  attrs: _objectSpread(
                    _objectSpread(_objectSpread({}, defaultStyle$1.yTipTextStyle), yTipTextStyle),
                    {},
                    {
                      text: isFunction(yTip) ? yTip(yFirstText) : yFirstText,
                    }
                  ),
                })
              )
          );
        },
      },
    ]);
    return TooltipView;
  })(Component);

  var index$7 = withTooltip(TooltipView);

  function count(node) {
    var sum = 0,
      children = node.children,
      i = children && children.length;
    if (!i) sum = 1;
    else while (--i >= 0) sum += children[i].value;
    node.value = sum;
  }
  function node_count() {
    return this.eachAfter(count);
  }

  var createForOfIteratorHelper = createCommonjsModule(function (module) {
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
      if (!it) {
        if (
          Array.isArray(o) ||
          (it = unsupportedIterableToArray(o)) ||
          (allowArrayLike && o && typeof o.length === 'number')
        ) {
          if (it) o = it;
          var i = 0;
          var F = function F() {};
          return {
            s: F,
            n: function n() {
              if (i >= o.length)
                return {
                  done: true,
                };
              return {
                done: false,
                value: o[i++],
              };
            },
            e: function e(_e) {
              throw _e;
            },
            f: F,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var normalCompletion = true,
        didErr = false,
        err;
      return {
        s: function s() {
          it = it.call(o);
        },
        n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function e(_e2) {
          didErr = true;
          err = _e2;
        },
        f: function f() {
          try {
            if (!normalCompletion && it['return'] != null) it['return']();
          } finally {
            if (didErr) throw err;
          }
        },
      };
    }
    (module.exports = _createForOfIteratorHelper),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  var _createForOfIteratorHelper = /*@__PURE__*/ getDefaultExportFromCjs(createForOfIteratorHelper);

  function node_each(callback, that) {
    var index = -1;
    var _iterator = _createForOfIteratorHelper(this),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var node = _step.value;
        callback.call(that, node, ++index, this);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return this;
  }

  function node_eachBefore(callback, that) {
    var node = this,
      nodes = [node],
      children,
      i,
      index = -1;
    while ((node = nodes.pop())) {
      callback.call(that, node, ++index, this);
      if ((children = node.children)) {
        for (i = children.length - 1; i >= 0; --i) {
          nodes.push(children[i]);
        }
      }
    }
    return this;
  }

  function node_eachAfter(callback, that) {
    var node = this,
      nodes = [node],
      next = [],
      children,
      i,
      n,
      index = -1;
    while ((node = nodes.pop())) {
      next.push(node);
      if ((children = node.children)) {
        for (i = 0, n = children.length; i < n; ++i) {
          nodes.push(children[i]);
        }
      }
    }
    while ((node = next.pop())) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_find(callback, that) {
    var index = -1;
    var _iterator = _createForOfIteratorHelper(this),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var node = _step.value;
        if (callback.call(that, node, ++index, this)) {
          return node;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  function node_sum(value) {
    return this.eachAfter(function (node) {
      var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
      while (--i >= 0) sum += children[i].value;
      node.value = sum;
    });
  }

  function node_sort(compare) {
    return this.eachBefore(function (node) {
      if (node.children) {
        node.children.sort(compare);
      }
    });
  }

  function node_path(end) {
    var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
    while (start !== ancestor) {
      start = start.parent;
      nodes.push(start);
    }
    var k = nodes.length;
    while (end !== ancestor) {
      nodes.splice(k, 0, end);
      end = end.parent;
    }
    return nodes;
  }
  function leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }

  function node_ancestors() {
    var node = this,
      nodes = [node];
    while ((node = node.parent)) {
      nodes.push(node);
    }
    return nodes;
  }

  function node_descendants() {
    return Array.from(this);
  }

  function node_leaves() {
    var leaves = [];
    this.eachBefore(function (node) {
      if (!node.children) {
        leaves.push(node);
      }
    });
    return leaves;
  }

  function node_links() {
    var root = this,
      links = [];
    root.each(function (node) {
      if (node !== root) {
        // Don’t include the root’s parent, if any.
        links.push({
          source: node.parent,
          target: node,
        });
      }
    });
    return links;
  }

  var regeneratorRuntime$1 = createCommonjsModule(function (module) {
    var _typeof = _typeof_1['default'];
    function _regeneratorRuntime() {
      (module.exports = _regeneratorRuntime =
        function _regeneratorRuntime() {
          return exports;
        }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports);
      var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        defineProperty =
          Object.defineProperty ||
          function (obj, key, desc) {
            obj[key] = desc.value;
          },
        $Symbol = 'function' == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || '@@iterator',
        asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator',
        toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
      function define(obj, key, value) {
        return (
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          obj[key]
        );
      }
      try {
        define({}, '');
      } catch (err) {
        define = function define(obj, key, value) {
          return (obj[key] = value);
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator =
            outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
        return (
          defineProperty(generator, '_invoke', {
            value: makeInvokeMethod(innerFn, self, context),
          }),
          generator
        );
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: 'normal',
            arg: fn.call(obj, arg),
          };
        } catch (err) {
          return {
            type: 'throw',
            arg: err,
          };
        }
      }
      exports.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });
      var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
        (IteratorPrototype = NativeIteratorPrototype);
      var Gp =
        (GeneratorFunctionPrototype.prototype =
        Generator.prototype =
          Object.create(IteratorPrototype));
      function defineIteratorMethods(prototype) {
        ['next', 'throw', 'return'].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ('throw' !== record.type) {
            var result = record.arg,
              value = result.value;
            return value && 'object' == _typeof(value) && hasOwn.call(value, '__await')
              ? PromiseImpl.resolve(value.__await).then(
                  function (value) {
                    invoke('next', value, resolve, reject);
                  },
                  function (err) {
                    invoke('throw', err, resolve, reject);
                  }
                )
              : PromiseImpl.resolve(value).then(
                  function (unwrapped) {
                    (result.value = unwrapped), resolve(result);
                  },
                  function (error) {
                    return invoke('throw', error, resolve, reject);
                  }
                );
          }
          reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, '_invoke', {
          value: function value(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return (previousPromise = previousPromise
              ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
              : callInvokeWithMethodAndArg());
          },
        });
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = 'suspendedStart';
        return function (method, arg) {
          if ('executing' === state) throw new Error('Generator is already running');
          if ('completed' === state) {
            if ('throw' === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ; ) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ('next' === context.method) context.sent = context._sent = context.arg;
            else if ('throw' === context.method) {
              if ('suspendedStart' === state) throw ((state = 'completed'), context.arg);
              context.dispatchException(context.arg);
            } else 'return' === context.method && context.abrupt('return', context.arg);
            state = 'executing';
            var record = tryCatch(innerFn, self, context);
            if ('normal' === record.type) {
              if (
                ((state = context.done ? 'completed' : 'suspendedYield'),
                record.arg === ContinueSentinel)
              )
                continue;
              return {
                value: record.arg,
                done: context.done,
              };
            }
            'throw' === record.type &&
              ((state = 'completed'), (context.method = 'throw'), (context.arg = record.arg));
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method,
          method = delegate.iterator[methodName];
        if (undefined === method)
          return (
            (context.delegate = null),
            ('throw' === methodName &&
              delegate.iterator['return'] &&
              ((context.method = 'return'),
              (context.arg = undefined),
              maybeInvokeDelegate(delegate, context),
              'throw' === context.method)) ||
              ('return' !== methodName &&
                ((context.method = 'throw'),
                (context.arg = new TypeError(
                  "The iterator does not provide a '" + methodName + "' method"
                )))),
            ContinueSentinel
          );
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ('throw' === record.type)
          return (
            (context.method = 'throw'),
            (context.arg = record.arg),
            (context.delegate = null),
            ContinueSentinel
          );
        var info = record.arg;
        return info
          ? info.done
            ? ((context[delegate.resultName] = info.value),
              (context.next = delegate.nextLoc),
              'return' !== context.method && ((context.method = 'next'), (context.arg = undefined)),
              (context.delegate = null),
              ContinueSentinel)
            : info
          : ((context.method = 'throw'),
            (context.arg = new TypeError('iterator result is not an object')),
            (context.delegate = null),
            ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0],
        };
        1 in locs && (entry.catchLoc = locs[1]),
          2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
          this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        (record.type = 'normal'), delete record.arg, (entry.completion = record);
      }
      function Context(tryLocsList) {
        (this.tryEntries = [
          {
            tryLoc: 'root',
          },
        ]),
          tryLocsList.forEach(pushTryEntry, this),
          this.reset(!0);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) return iteratorMethod.call(iterable);
          if ('function' == typeof iterable.next) return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                for (; ++i < iterable.length; )
                  if (hasOwn.call(iterable, i))
                    return (next.value = iterable[i]), (next.done = !1), next;
                return (next.value = undefined), (next.done = !0), next;
              };
            return (next.next = next);
          }
        }
        return {
          next: doneResult,
        };
      }
      function doneResult() {
        return {
          value: undefined,
          done: !0,
        };
      }
      return (
        (GeneratorFunction.prototype = GeneratorFunctionPrototype),
        defineProperty(Gp, 'constructor', {
          value: GeneratorFunctionPrototype,
          configurable: !0,
        }),
        defineProperty(GeneratorFunctionPrototype, 'constructor', {
          value: GeneratorFunction,
          configurable: !0,
        }),
        (GeneratorFunction.displayName = define(
          GeneratorFunctionPrototype,
          toStringTagSymbol,
          'GeneratorFunction'
        )),
        (exports.isGeneratorFunction = function (genFun) {
          var ctor = 'function' == typeof genFun && genFun.constructor;
          return (
            !!ctor &&
            (ctor === GeneratorFunction || 'GeneratorFunction' === (ctor.displayName || ctor.name))
          );
        }),
        (exports.mark = function (genFun) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
              : ((genFun.__proto__ = GeneratorFunctionPrototype),
                define(genFun, toStringTagSymbol, 'GeneratorFunction')),
            (genFun.prototype = Object.create(Gp)),
            genFun
          );
        }),
        (exports.awrap = function (arg) {
          return {
            __await: arg,
          };
        }),
        defineIteratorMethods(AsyncIterator.prototype),
        define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
          return this;
        }),
        (exports.AsyncIterator = AsyncIterator),
        (exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
          void 0 === PromiseImpl && (PromiseImpl = Promise);
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
          return exports.isGeneratorFunction(outerFn)
            ? iter
            : iter.next().then(function (result) {
                return result.done ? result.value : iter.next();
              });
        }),
        defineIteratorMethods(Gp),
        define(Gp, toStringTagSymbol, 'Generator'),
        define(Gp, iteratorSymbol, function () {
          return this;
        }),
        define(Gp, 'toString', function () {
          return '[object Generator]';
        }),
        (exports.keys = function (val) {
          var object = Object(val),
            keys = [];
          for (var key in object) keys.push(key);
          return (
            keys.reverse(),
            function next() {
              for (; keys.length; ) {
                var key = keys.pop();
                if (key in object) return (next.value = key), (next.done = !1), next;
              }
              return (next.done = !0), next;
            }
          );
        }),
        (exports.values = values),
        (Context.prototype = {
          constructor: Context,
          reset: function reset(skipTempReset) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = undefined),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = undefined),
              this.tryEntries.forEach(resetTryEntry),
              !skipTempReset)
            )
              for (var name in this)
                't' === name.charAt(0) &&
                  hasOwn.call(this, name) &&
                  !isNaN(+name.slice(1)) &&
                  (this[name] = undefined);
          },
          stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ('throw' === rootRecord.type) throw rootRecord.arg;
            return this.rval;
          },
          dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
              return (
                (record.type = 'throw'),
                (record.arg = exception),
                (context.next = loc),
                caught && ((context.method = 'next'), (context.arg = undefined)),
                !!caught
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i],
                record = entry.completion;
              if ('root' === entry.tryLoc) return handle('end');
              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, 'catchLoc'),
                  hasFinally = hasOwn.call(entry, 'finallyLoc');
                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                  if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                } else {
                  if (!hasFinally) throw new Error('try statement without catch or finally');
                  if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                }
              }
            }
          },
          abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (
                entry.tryLoc <= this.prev &&
                hasOwn.call(entry, 'finallyLoc') &&
                this.prev < entry.finallyLoc
              ) {
                var finallyEntry = entry;
                break;
              }
            }
            finallyEntry &&
              ('break' === type || 'continue' === type) &&
              finallyEntry.tryLoc <= arg &&
              arg <= finallyEntry.finallyLoc &&
              (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return (
              (record.type = type),
              (record.arg = arg),
              finallyEntry
                ? ((this.method = 'next'), (this.next = finallyEntry.finallyLoc), ContinueSentinel)
                : this.complete(record)
            );
          },
          complete: function complete(record, afterLoc) {
            if ('throw' === record.type) throw record.arg;
            return (
              'break' === record.type || 'continue' === record.type
                ? (this.next = record.arg)
                : 'return' === record.type
                ? ((this.rval = this.arg = record.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === record.type && afterLoc && (this.next = afterLoc),
              ContinueSentinel
            );
          },
          finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc)
                return (
                  this.complete(entry.completion, entry.afterLoc),
                  resetTryEntry(entry),
                  ContinueSentinel
                );
            }
          },
          catch: function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if ('throw' === record.type) {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return (
              (this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
              }),
              'next' === this.method && (this.arg = undefined),
              ContinueSentinel
            );
          },
        }),
        exports
      );
    }
    (module.exports = _regeneratorRuntime),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports);
  });

  // TODO(Babel 8): Remove this file.

  var runtime = regeneratorRuntime$1();
  var regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === 'object') {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function('r', 'regeneratorRuntime = r')(runtime);
    }
  }

  var _marked = /*#__PURE__*/ regenerator.mark(_callee);
  function _callee() {
    var node, current, next, children, i, n;
    return regenerator.wrap(
      function _callee$(_context) {
        while (1)
          switch ((_context.prev = _context.next)) {
            case 0:
              (node = this), (next = [node]);
            case 1:
              (current = next.reverse()), (next = []);
            case 2:
              if (!(node = current.pop())) {
                _context.next = 8;
                break;
              }
              _context.next = 5;
              return node;
            case 5:
              if ((children = node.children)) {
                for (i = 0, n = children.length; i < n; ++i) {
                  next.push(children[i]);
                }
              }
              _context.next = 2;
              break;
            case 8:
              if (next.length) {
                _context.next = 1;
                break;
              }
            case 9:
            case 'end':
              return _context.stop();
          }
      },
      _marked,
      this
    );
  }

  function hierarchy(data, children) {
    if (data instanceof Map) {
      data = [undefined, data];
      if (children === undefined) children = mapChildren;
    } else if (children === undefined) {
      children = objectChildren;
    }
    var root = new Node(data),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;
    while ((node = nodes.pop())) {
      if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
        node.children = childs;
        for (i = n - 1; i >= 0; --i) {
          nodes.push((child = childs[i] = new Node(childs[i])));
          child.parent = node;
          child.depth = node.depth + 1;
        }
      }
    }
    return root.eachBefore(computeHeight);
  }
  function node_copy() {
    return hierarchy(this).eachBefore(copyData);
  }
  function objectChildren(d) {
    return d.children;
  }
  function mapChildren(d) {
    return Array.isArray(d) ? d[1] : null;
  }
  function copyData(node) {
    if (node.data.value !== undefined) node.value = node.data.value;
    node.data = node.data.data;
  }
  function computeHeight(node) {
    var height = 0;
    do node.height = height;
    while ((node = node.parent) && node.height < ++height);
  }
  function Node(data) {
    this.data = data;
    this.depth = this.height = 0;
    this.parent = null;
  }
  Node.prototype = hierarchy.prototype = _defineProperty(
    {
      constructor: Node,
      count: node_count,
      each: node_each,
      eachAfter: node_eachAfter,
      eachBefore: node_eachBefore,
      find: node_find,
      sum: node_sum,
      sort: node_sort,
      path: node_path,
      ancestors: node_ancestors,
      descendants: node_descendants,
      leaves: node_leaves,
      links: node_links,
      copy: node_copy,
    },
    Symbol.iterator,
    _callee
  );

  function required(f) {
    if (typeof f !== 'function') throw new Error();
    return f;
  }

  function constantZero() {
    return 0;
  }
  function constant$1(x) {
    return function () {
      return x;
    };
  }

  function roundNode(node) {
    node.x0 = Math.round(node.x0);
    node.y0 = Math.round(node.y0);
    node.x1 = Math.round(node.x1);
    node.y1 = Math.round(node.y1);
  }

  function treemapDice(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (x1 - x0) / parent.value;
    while (++i < n) {
      (node = nodes[i]), (node.y0 = y0), (node.y1 = y1);
      (node.x0 = x0), (node.x1 = x0 += node.value * k);
    }
  }

  function partition() {
    var dx = 1,
      dy = 1,
      padding = 0,
      round = false;
    function partition(root) {
      var n = root.height + 1;
      root.x0 = root.y0 = padding;
      root.x1 = dx;
      root.y1 = dy / n;
      root.eachBefore(positionNode(dy, n));
      if (round) root.eachBefore(roundNode);
      return root;
    }
    function positionNode(dy, n) {
      return function (node) {
        if (node.children) {
          treemapDice(
            node,
            node.x0,
            (dy * (node.depth + 1)) / n,
            node.x1,
            (dy * (node.depth + 2)) / n
          );
        }
        var x0 = node.x0,
          y0 = node.y0,
          x1 = node.x1 - padding,
          y1 = node.y1 - padding;
        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
        node.x0 = x0;
        node.y0 = y0;
        node.x1 = x1;
        node.y1 = y1;
      };
    }
    partition.round = function (x) {
      return arguments.length ? ((round = !!x), partition) : round;
    };
    partition.size = function (x) {
      return arguments.length ? ((dx = +x[0]), (dy = +x[1]), partition) : [dx, dy];
    };
    partition.padding = function (x) {
      return arguments.length ? ((padding = +x), partition) : padding;
    };
    return partition;
  }

  function treemapSlice(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (y1 - y0) / parent.value;
    while (++i < n) {
      (node = nodes[i]), (node.x0 = x0), (node.x1 = x1);
      (node.y0 = y0), (node.y1 = y0 += node.value * k);
    }
  }

  var phi = (1 + Math.sqrt(5)) / 2;
  function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
    var rows = [],
      nodes = parent.children,
      row,
      nodeValue,
      i0 = 0,
      i1 = 0,
      n = nodes.length,
      dx,
      dy,
      value = parent.value,
      sumValue,
      minValue,
      maxValue,
      newRatio,
      minRatio,
      alpha,
      beta;
    while (i0 < n) {
      (dx = x1 - x0), (dy = y1 - y0);

      // Find the next non-empty node.
      do sumValue = nodes[i1++].value;
      while (!sumValue && i1 < n);
      minValue = maxValue = sumValue;
      alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
      beta = sumValue * sumValue * alpha;
      minRatio = Math.max(maxValue / beta, beta / minValue);

      // Keep adding nodes while the aspect ratio maintains or improves.
      for (; i1 < n; ++i1) {
        sumValue += nodeValue = nodes[i1].value;
        if (nodeValue < minValue) minValue = nodeValue;
        if (nodeValue > maxValue) maxValue = nodeValue;
        beta = sumValue * sumValue * alpha;
        newRatio = Math.max(maxValue / beta, beta / minValue);
        if (newRatio > minRatio) {
          sumValue -= nodeValue;
          break;
        }
        minRatio = newRatio;
      }

      // Position and record the row orientation.
      rows.push(
        (row = {
          value: sumValue,
          dice: dx < dy,
          children: nodes.slice(i0, i1),
        })
      );
      if (row.dice) treemapDice(row, x0, y0, x1, value ? (y0 += (dy * sumValue) / value) : y1);
      else treemapSlice(row, x0, y0, value ? (x0 += (dx * sumValue) / value) : x1, y1);
      (value -= sumValue), (i0 = i1);
    }
    return rows;
  }
  var squarify = (function custom(ratio) {
    function squarify(parent, x0, y0, x1, y1) {
      squarifyRatio(ratio, parent, x0, y0, x1, y1);
    }
    squarify.ratio = function (x) {
      return custom((x = +x) > 1 ? x : 1);
    };
    return squarify;
  })(phi);

  function treemap() {
    var tile = squarify,
      round = false,
      dx = 1,
      dy = 1,
      paddingStack = [0],
      paddingInner = constantZero,
      paddingTop = constantZero,
      paddingRight = constantZero,
      paddingBottom = constantZero,
      paddingLeft = constantZero;
    function treemap(root) {
      root.x0 = root.y0 = 0;
      root.x1 = dx;
      root.y1 = dy;
      root.eachBefore(positionNode);
      paddingStack = [0];
      if (round) root.eachBefore(roundNode);
      return root;
    }
    function positionNode(node) {
      var p = paddingStack[node.depth],
        x0 = node.x0 + p,
        y0 = node.y0 + p,
        x1 = node.x1 - p,
        y1 = node.y1 - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x1;
      node.y1 = y1;
      if (node.children) {
        p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
        x0 += paddingLeft(node) - p;
        y0 += paddingTop(node) - p;
        x1 -= paddingRight(node) - p;
        y1 -= paddingBottom(node) - p;
        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
        tile(node, x0, y0, x1, y1);
      }
    }
    treemap.round = function (x) {
      return arguments.length ? ((round = !!x), treemap) : round;
    };
    treemap.size = function (x) {
      return arguments.length ? ((dx = +x[0]), (dy = +x[1]), treemap) : [dx, dy];
    };
    treemap.tile = function (x) {
      return arguments.length ? ((tile = required(x)), treemap) : tile;
    };
    treemap.padding = function (x) {
      return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
    };
    treemap.paddingInner = function (x) {
      return arguments.length
        ? ((paddingInner = typeof x === 'function' ? x : constant$1(+x)), treemap)
        : paddingInner;
    };
    treemap.paddingOuter = function (x) {
      return arguments.length
        ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x)
        : treemap.paddingTop();
    };
    treemap.paddingTop = function (x) {
      return arguments.length
        ? ((paddingTop = typeof x === 'function' ? x : constant$1(+x)), treemap)
        : paddingTop;
    };
    treemap.paddingRight = function (x) {
      return arguments.length
        ? ((paddingRight = typeof x === 'function' ? x : constant$1(+x)), treemap)
        : paddingRight;
    };
    treemap.paddingBottom = function (x) {
      return arguments.length
        ? ((paddingBottom = typeof x === 'function' ? x : constant$1(+x)), treemap)
        : paddingBottom;
    };
    treemap.paddingLeft = function (x) {
      return arguments.length
        ? ((paddingLeft = typeof x === 'function' ? x : constant$1(+x)), treemap)
        : paddingLeft;
    };
    return treemap;
  }

  function treemapBinary(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
      i,
      n = nodes.length,
      sum,
      sums = new Array(n + 1);
    for (sums[0] = sum = i = 0; i < n; ++i) {
      sums[i + 1] = sum += nodes[i].value;
    }
    partition(0, n, parent.value, x0, y0, x1, y1);
    function partition(i, j, value, x0, y0, x1, y1) {
      if (i >= j - 1) {
        var node = nodes[i];
        (node.x0 = x0), (node.y0 = y0);
        (node.x1 = x1), (node.y1 = y1);
        return;
      }
      var valueOffset = sums[i],
        valueTarget = value / 2 + valueOffset,
        k = i + 1,
        hi = j - 1;
      while (k < hi) {
        var mid = (k + hi) >>> 1;
        if (sums[mid] < valueTarget) k = mid + 1;
        else hi = mid;
      }
      if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i + 1 < k) --k;
      var valueLeft = sums[k] - valueOffset,
        valueRight = value - valueLeft;
      if (x1 - x0 > y1 - y0) {
        var xk = value ? (x0 * valueRight + x1 * valueLeft) / value : x1;
        partition(i, k, valueLeft, x0, y0, xk, y1);
        partition(k, j, valueRight, xk, y0, x1, y1);
      } else {
        var yk = value ? (y0 * valueRight + y1 * valueLeft) / value : y1;
        partition(i, k, valueLeft, x0, y0, x1, yk);
        partition(k, j, valueRight, x0, yk, x1, y1);
      }
    }
  }

  var withTreemap = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Treemap, _Component);
      var _super = _createSuper(Treemap);
      function Treemap(props, context, updater) {
        var _this;
        _classCallCheck(this, Treemap);
        _this = _super.call(this, props, context, updater);
        var coord = props.coord,
          color = props.color,
          data = props.data;
        var width = context.width,
          height = context.height,
          theme = context.theme;
        _this.coordController = new coordController();
        var _assertThisInitialize = _assertThisInitialized(_this),
          coordController$1 = _assertThisInitialize.coordController;
        _this.coord = coordController$1.create(coord, {
          width: width,
          height: height,
        });
        _this.color = new Category$1(
          _objectSpread(
            _objectSpread(
              {
                range: theme.colors,
              },
              color
            ),
            {},
            {
              data: data,
            }
          )
        );
        return _this;
      }
      _createClass(Treemap, [
        {
          key: 'treemapLayout',
          value: function treemapLayout() {
            var props = this.props,
              coord = this.coord,
              colorAttr = this.color;
            var data = props.data,
              value = props.value;
            var root = hierarchy({
              children: data,
            })
              .sum(function (d) {
                return d[value];
              })
              .sort(function (a, b) {
                return b[value] - a[value];
              });
            var treemapLayout = treemap()
              // 默认treemapSquarify
              .tile(treemapBinary)
              // .size([1, 1])
              // @ts-ignore
              .round(false);
            // .padding(space)
            // .paddingInner(space);
            // .paddingOuter(options.paddingOuter)
            // .paddingTop(options.paddingTop)
            // .paddingRight(options.paddingRight)
            // .paddingBottom(options.paddingBottom)
            // .paddingLeft(options.paddingLeft);
            var nodes = treemapLayout(root);
            return nodes.children.map(function (item) {
              var data = item.data,
                x0 = item.x0,
                y0 = item.y0,
                x1 = item.x1,
                y1 = item.y1;
              var color = colorAttr.mapping(data[colorAttr.field]);
              var rect = coord.convertRect({
                x: [x0, x1],
                y: [y0, y1],
              });
              return _objectSpread(
                {
                  key: data.key,
                  origin: data,
                  color: color,
                },
                rect
              );
            });
          },
        },
        {
          key: 'render',
          value: function render() {
            var nodes = this.treemapLayout();
            var props = this.props,
              coord = this.coord;
            return jsx(
              View,
              _objectSpread(
                _objectSpread(
                  {
                    nodes: nodes,
                  },
                  props
                ),
                {},
                {
                  coord: coord,
                }
              )
            );
          },
        },
      ]);
      return Treemap;
    })(Component);
  };

  var TreemapView = function (props) {
    var nodes = props.nodes,
      coord = props.coord;
    if (coord.isPolar) {
      var center = coord.center;
      var x = center.x,
        y = center.y;
      return jsx(
        'group',
        null,
        nodes.map(function (node) {
          var xMin = node.xMin,
            xMax = node.xMax,
            yMin = node.yMin,
            yMax = node.yMax,
            color = node.color;
          return jsx('sector', {
            attrs: {
              x: x,
              y: y,
              lineWidth: '1px',
              stroke: '#fff',
              startAngle: xMin,
              endAngle: xMax,
              r0: yMin,
              r: yMax,
              anticlockwise: false,
              fill: color,
            },
          });
        })
      );
    }
    return jsx(
      'group',
      null,
      nodes.map(function (node) {
        var key = node.key,
          xMin = node.xMin,
          xMax = node.xMax,
          yMin = node.yMin,
          yMax = node.yMax,
          color = node.color;
        return jsx('rect', {
          key: key,
          attrs: {
            x: xMin,
            y: yMin,
            width: xMax - xMin,
            height: yMax - yMin,
            fill: color,
            lineWidth: '4px',
            stroke: '#fff',
            radius: '8px',
          },
          animation: {
            appear: {
              easing: 'linear',
              duration: 450,
              property: ['fillOpacity', 'strokeOpacity'],
              start: {
                fillOpacity: 0,
                strokeOpacity: 0,
              },
              end: {
                fillOpacity: 1,
                strokeOpacity: 1,
              },
            },
            update: {
              easing: 'linear',
              duration: 450,
              property: ['x', 'y', 'width', 'height', 'radius', 'lineWidth'],
            },
          },
        });
      })
    );
  };

  var index$8 = withTreemap(TreemapView);

  function rootParent(data) {
    var d = data;
    while (d.depth > 1) {
      d = d.parent;
    }
    return d;
  }
  var withSunburst = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Sunburst, _Component);
      var _super = _createSuper(Sunburst);
      function Sunburst(props, context) {
        var _this;
        _classCallCheck(this, Sunburst);
        _this = _super.call(this, props, context);
        var coord = props.coord,
          color = props.color,
          data = props.data;
        var width = context.width,
          height = context.height,
          theme = context.theme;
        _this.coordController = new coordController();
        var _assertThisInitialize = _assertThisInitialized(_this),
          coordController$1 = _assertThisInitialize.coordController;
        _this.coord = coordController$1.create(coord, {
          width: width,
          height: height,
        });
        _this.color = new Category$1(
          _objectSpread(
            _objectSpread(
              {
                range: theme.colors,
              },
              color
            ),
            {},
            {
              data: data,
            }
          )
        );
        return _this;
      }
      _createClass(Sunburst, [
        {
          key: 'didMount',
          value: function didMount() {
            var _this2 = this;
            var props = this.props,
              container = this.container;
            var onClick = props.onClick;
            var canvas = container.get('canvas');
            this.triggerRef = [];
            canvas.on('click', function (ev) {
              var points = ev.points;
              var shape = _this2.triggerRef.find(function (ref) {
                return isInBBox(ref.current.getBBox(), points[0]);
              });
              if (shape) {
                ev.shape = shape;
                // @ts-ignore
                ev.payload = shape.payload;
                onClick && onClick(ev);
              }
            });
          },
        },
        {
          key: '_mapping',
          value: function _mapping(children) {
            var colorAttr = this.color,
              coord = this.coord;
            for (var i = 0, len = children.length; i < len; i++) {
              var node = children[i];
              var root = rootParent(node);
              var color = colorAttr.mapping(root.data[colorAttr.field]);
              node.color = color;
              var x0 = node.x0,
                x1 = node.x1,
                y0 = node.y0,
                y1 = node.y1;
              var rect = coord.convertRect({
                x: [x0, x1],
                y: [y0, y1],
              });
              mix(node, rect);
              // 递归处理
              if (node.children && node.children.length) {
                this._mapping(node.children);
              }
            }
          },
        },
        {
          key: 'sunburst',
          value: function sunburst() {
            var props = this.props;
            var data = props.data,
              value = props.value,
              _props$sort = props.sort,
              sort = _props$sort === void 0 ? true : _props$sort;
            var root = hierarchy({
              children: data,
            }).sum(function (d) {
              return d[value];
            });
            // 内置按value大小顺序排序，支持传入sort函数
            if (sort === true || isFunction(sort)) {
              var sortFn = isFunction(sort)
                ? sort
                : function (a, b) {
                    return b[value] - a[value];
                  };
              root.sort(sortFn);
            }
            var nodes = partition()(root);
            var children = nodes.children;
            this._mapping(children);
            return nodes;
          },
        },
        {
          key: 'render',
          value: function render() {
            var node = this.sunburst();
            var coord = this.coord,
              props = this.props;
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  coord: coord,
                  node: node,
                  triggerRef: this.triggerRef,
                }
              )
            );
          },
        },
      ]);
      return Sunburst;
    })(Component);
  };

  var SunburstView = function (props) {
    var coord = props.coord,
      node = props.node;
    var children = node.children;
    var _coord$center = coord.center,
      x = _coord$center.x,
      y = _coord$center.y;
    var renderNodes = function renderNodes(nodes) {
      return jsx(
        'group',
        null,
        nodes.map(function (node) {
          var xMin = node.xMin,
            xMax = node.xMax,
            yMin = node.yMin,
            yMax = node.yMax,
            color = node.color,
            children = node.children;
          return jsx(
            'group',
            null,
            jsx('sector', {
              attrs: {
                x: x,
                y: y,
                lineWidth: '1px',
                stroke: '#fff',
                startAngle: xMin,
                endAngle: xMax,
                r0: yMin,
                r: yMax,
                anticlockwise: false,
                fill: color,
              },
            }),
            children && children.length ? renderNodes(children) : null
          );
        })
      );
    };
    return renderNodes(children);
  };

  var IcicleView = function (props) {
    var node = props.node;
    var children = node.children;
    var renderNodes = function renderNodes(nodes) {
      return jsx(
        'group',
        null,
        nodes.map(function (node) {
          var xMin = node.xMin,
            xMax = node.xMax,
            yMin = node.yMin,
            yMax = node.yMax,
            color = node.color,
            children = node.children;
          return jsx(
            'group',
            null,
            jsx('rect', {
              attrs: {
                x: xMin,
                y: yMin,
                width: xMax - xMin,
                height: yMax - yMin,
                lineWidth: '1px',
                stroke: '#fff',
                fill: color,
              },
            }),
            children && children.length ? renderNodes(children) : null
          );
        })
      );
    };
    return renderNodes(children);
  };

  var View = function (props) {
    var coord = props.coord;
    if (coord.type === 'polar') {
      return jsx(SunburstView, _objectSpread({}, props));
    }
    return jsx(IcicleView, _objectSpread({}, props));
  };

  var index$9 = withSunburst(View);

  var DEFAULT_CONFIG = {
    anchorOffset: '10px',
    inflectionOffset: '30px',
    sidePadding: '15px',
    height: '64px',
    adjustOffset: '30',
    triggerOn: 'click',
    // activeShape: false, // 当有图形被选中的时候，是否激活图形
    // activeStyle: {
    //   offset: '1px',
    //   appendRadius: '8px',
    //   fillOpacity: 0.5,
    // },
    label1OffsetY: '-4px',
    label2OffsetY: '4px',
  };
  function getEndPoint(center, angle, r) {
    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
    };
  }
  // 计算中间角度
  function getMiddleAngle(startAngle, endAngle) {
    if (endAngle < startAngle) {
      endAngle += Math.PI * 2;
    }
    return (endAngle + startAngle) / 2;
  }
  function move(from, to, count, center) {
    var x = center.x;
    var sort = from.sort(function (a, b) {
      var aDistance = Math.abs(a.x - x);
      var bDistance = Math.abs(b.x - x);
      return bDistance - aDistance;
    });
    return [sort.slice(0, sort.length - count), sort.slice(sort.length - count).concat(to)];
  }
  // 第一象限
  function isFirstQuadrant(angle) {
    return angle >= -Math.PI / 2 && angle < 0;
  }
  // 第二象限
  function isSecondQuadrant(angle) {
    return angle >= 0 && angle < Math.PI / 2;
  }
  function isThirdQuadrant(angle) {
    return angle >= Math.PI / 2 && angle < Math.PI;
  }
  function isFourthQuadrant(angle) {
    return angle >= Math.PI && angle < (Math.PI * 3) / 2;
  }
  function findShapeByClassName(shape, point, className) {
    var targetShapes = getElementsByClassName(className, shape);
    for (var i = 0, len = targetShapes.length; i < len; i++) {
      var _shape = targetShapes[i];
      if (isInBBox(_shape.getBBox(), point)) {
        return _shape;
      }
    }
  }
  var withPieLabel = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(PieLabel, _Component);
      var _super = _createSuper(PieLabel);
      function PieLabel(props) {
        var _this;
        _classCallCheck(this, PieLabel);
        _this = _super.call(this, props);
        _this._handleEvent = function (ev) {
          var _this$props = _this.props,
            chart = _this$props.chart,
            onClick = _this$props.onClick;
          var ele = _this.triggerRef.current;
          var point = ev.points[0];
          var shape = findShapeByClassName(ele, point, 'click');
          var pieData = chart.getSnapRecords(point);
          if (typeof onClick === 'function') {
            // 点击label
            if (shape) {
              onClick(shape.get('data'));
            }
            // 点击饼图
            else if (isArray(pieData) && pieData.length > 0) {
              onClick(pieData);
            }
          }
        };
        _this.triggerRef = {};
        return _this;
      }
      _createClass(PieLabel, [
        {
          key: 'willMount',
          value: function willMount() {},
          /**
           * 绑定事件
           */
        },
        {
          key: 'didMount',
          value: function didMount() {
            this._initEvent();
          },
        },
        {
          key: 'getLabels',
          value: function getLabels(props) {
            var chart = props.chart,
              coord = props.coord,
              anchorOffset = props.anchorOffset,
              inflectionOffset = props.inflectionOffset,
              label1 = props.label1,
              label2 = props.label2,
              itemHeight = props.height,
              sidePadding = props.sidePadding;
            var center = coord.center,
              radius = coord.radius,
              coordWidth = coord.width,
              coordHeight = coord.height,
              coordLeft = coord.left,
              coordRight = coord.right,
              coordTop = coord.top;
            var maxCountForOneSide = Math.floor(coordHeight / itemHeight);
            var maxCount = maxCountForOneSide * 2;
            var geometry = chart.getGeometrys()[0];
            var records = geometry
              .flatRecords()
              // 按角度大到小排序
              .sort(function (a, b) {
                var angle1 = a.xMax - a.xMin;
                var angle2 = b.xMax - b.xMin;
                return angle2 - angle1;
              })
              // 只取前 maxCount 个显示
              .slice(0, maxCount);
            // 存储左右 labels
            var halves = [
              [],
              [], // right
            ];

            records.forEach(function (record) {
              var xMin = record.xMin,
                xMax = record.xMax,
                color = record.color,
                origin = record.origin;
              // 锚点角度
              var anchorAngle = getMiddleAngle(xMin, xMax);
              // 锚点坐标
              var anchorPoint = getEndPoint(center, anchorAngle, radius + anchorOffset);
              // 拐点坐标
              var inflectionPoint = getEndPoint(center, anchorAngle, radius + inflectionOffset);
              // 锚点方向
              var side = anchorPoint.x < center.x ? 'left' : 'right';
              var label = {
                origin: origin,
                angle: anchorAngle,
                anchor: anchorPoint,
                inflection: inflectionPoint,
                side: side,
                x: inflectionPoint.x,
                y: inflectionPoint.y,
                r: radius + inflectionOffset,
                color: color,
                label1: isFunction(label1) ? label1(origin, record) : label1,
                label2: isFunction(label2) ? label2(origin, record) : label2,
              };
              // 判断文本的方向
              if (side === 'left') {
                halves[0].push(label);
              } else {
                halves[1].push(label);
              }
            });
            // 判断是有一边超过了显示的最大
            if (halves[0].length > maxCountForOneSide) {
              halves = move(halves[0], halves[1], halves[0].length - maxCountForOneSide, center);
            } else if (halves[1].length > maxCountForOneSide) {
              var _move = move(halves[1], halves[0], halves[1].length - maxCountForOneSide, center),
                _move2 = _slicedToArray(_move, 2),
                right = _move2[0],
                left = _move2[1];
              halves = [left, right];
            }
            // label 的最大宽度
            var labelWidth =
              coordWidth / 2 - radius - anchorOffset - inflectionOffset - 2 * sidePadding;
            var labels = [];
            halves.forEach(function (half, index) {
              var showSide = index === 0 ? 'left' : 'right';
              // 顺时针方向排序
              half.sort(function (a, b) {
                var aAngle = a.angle;
                var bAngle = b.angle;
                if (showSide === 'left') {
                  // 是否在第一象限
                  aAngle = isFirstQuadrant(aAngle) ? aAngle + Math.PI * 2 : aAngle;
                  bAngle = isFirstQuadrant(bAngle) ? bAngle + Math.PI * 2 : bAngle;
                  return bAngle - aAngle;
                } else {
                  // 是否在第四象限
                  aAngle = isFourthQuadrant(aAngle) ? aAngle - Math.PI * 2 : aAngle;
                  bAngle = isFourthQuadrant(bAngle) ? bAngle - Math.PI * 2 : bAngle;
                  return aAngle - bAngle;
                }
              });
              var pointsY = half.map(function (label) {
                return label.y;
              });
              var maxY = Math.max.apply(null, pointsY);
              var minY = Math.min.apply(null, pointsY);
              // 每个 label 占用的高度
              var labelCount = half.length;
              var labelHeight = coordHeight / labelCount;
              var halfLabelHeight = labelHeight / 2;
              // 线之间的间隔
              var lineInterval = 2;
              if (showSide === 'left') {
                half.forEach(function (label, index) {
                  var anchor = label.anchor,
                    inflection = label.inflection,
                    angle = label.angle,
                    x = label.x,
                    y = label.y;
                  var points = [anchor, inflection];
                  var endX = coordLeft + sidePadding;
                  var endY = coordTop + halfLabelHeight + labelHeight * index;
                  // 文本开始点
                  var labelStart = {
                    x: endX + labelWidth + lineInterval * index,
                    y: endY,
                  };
                  // 文本结束点
                  var labelEnd = {
                    x: endX,
                    y: endY,
                  };
                  // 第四象限
                  if (isFirstQuadrant(angle)) {
                    var pointY = minY - lineInterval * (labelCount - index);
                    points.push({
                      x: x,
                      y: pointY,
                    });
                    points.push({
                      x: labelStart.x,
                      y: pointY,
                    });
                  } else if (isThirdQuadrant(angle) || isFourthQuadrant(angle)) {
                    points.push({
                      x: labelStart.x,
                      y: y,
                    });
                  } else if (isSecondQuadrant(angle)) {
                    var _pointY = maxY + lineInterval * index;
                    points.push({
                      x: x,
                      y: _pointY,
                    });
                    points.push({
                      x: labelStart.x,
                      y: _pointY,
                    });
                  }
                  points.push(labelStart);
                  points.push(labelEnd);
                  label.points = points;
                  label.side = showSide;
                  labels.push(label);
                });
              } else {
                half.forEach(function (label, index) {
                  var anchor = label.anchor,
                    inflection = label.inflection,
                    angle = label.angle,
                    x = label.x,
                    y = label.y;
                  // 折线的点
                  var points = [anchor, inflection];
                  var endX = coordRight - sidePadding;
                  var endY = coordTop + halfLabelHeight + labelHeight * index;
                  // 文本开始点
                  var labelStart = {
                    x: endX - labelWidth - lineInterval * index,
                    y: endY,
                  };
                  // 文本结束点
                  var labelEnd = {
                    x: endX,
                    y: endY,
                  };
                  // 第四象限
                  if (isFourthQuadrant(angle)) {
                    var pointY = minY - lineInterval * (labelCount - index);
                    points.push({
                      x: x,
                      y: pointY,
                    });
                    points.push({
                      x: labelStart.x,
                      y: pointY,
                    });
                  } else if (isFirstQuadrant(angle) || isSecondQuadrant(angle)) {
                    points.push({
                      x: labelStart.x,
                      y: y,
                    });
                  } else if (isThirdQuadrant(angle)) {
                    var _pointY2 = maxY + lineInterval * index;
                    points.push({
                      x: x,
                      y: _pointY2,
                    });
                    points.push({
                      x: labelStart.x,
                      y: _pointY2,
                    });
                  }
                  points.push(labelStart);
                  points.push(labelEnd);
                  label.points = points;
                  label.side = showSide;
                  labels.push(label);
                });
              }
            });
            return labels;
          },
        },
        {
          key: '_initEvent',
          value: function _initEvent() {
            var context = this.context,
              props = this.props;
            var canvas = context.canvas;
            var _props$triggerOn = props.triggerOn,
              triggerOn = _props$triggerOn === void 0 ? DEFAULT_CONFIG.triggerOn : _props$triggerOn;
            canvas.on(triggerOn, this._handleEvent);
          },
        },
        {
          key: 'render',
          value: function render() {
            var context = this.context;
            var props = context.px2hd(deepMix({}, DEFAULT_CONFIG, this.props));
            var labels = this.getLabels(props);
            return jsx(
              View,
              _objectSpread(
                _objectSpread(
                  {
                    labels: labels,
                  },
                  props
                ),
                {},
                {
                  triggerRef: this.triggerRef,
                }
              )
            );
          },
        },
      ]);
      return PieLabel;
    })(Component);
  };

  var PieLabelView = function (props) {
    var lineStyle = props.lineStyle,
      anchorStyle = props.anchorStyle,
      labels = props.labels,
      label1OffsetY = props.label1OffsetY,
      label2OffsetY = props.label2OffsetY,
      triggerRef = props.triggerRef;
    return jsx(
      'group',
      {
        ref: triggerRef,
      },
      labels.map(function (label) {
        var origin = label.origin,
          anchor = label.anchor,
          side = label.side,
          color = label.color,
          label1 = label.label1,
          label2 = label.label2,
          points = label.points;
        var end = points[points.length - 1];
        return jsx(
          'group',
          null,
          jsx('circle', {
            attrs: _objectSpread(
              {
                r: '4px',
                x: anchor.x,
                y: anchor.y,
                fill: color,
              },
              anchorStyle
            ),
          }),
          jsx('polyline', {
            attrs: _objectSpread(
              {
                points: points,
                lineWidth: '2px',
                stroke: color,
              },
              lineStyle
            ),
          }),
          jsx('text', {
            className: 'click',
            attrs: _objectSpread(
              {
                x: end.x,
                y: end.y + label1OffsetY,
                fontSize: '24px',
                lineHeight: '24px',
                fill: color,
                textBaseline: 'bottom',
                textAlign: side === 'left' ? 'left' : 'right',
              },
              label1
            ),
            data: origin,
          }),
          jsx('text', {
            className: 'click',
            attrs: _objectSpread(
              {
                x: end.x,
                y: end.y + label2OffsetY,
                fontSize: '24px',
                lineHeight: '24px',
                fill: '#808080',
                textBaseline: 'top',
                textAlign: side === 'left' ? 'left' : 'right',
              },
              label2
            ),
            data: origin,
          })
        );
      })
    );
  };

  var index$a = withPieLabel(PieLabelView);

  var getPoint$2 = function getPoint(cener, angle, r) {
    var x = cener.x + Math.cos(angle) * r;
    var y = cener.y + Math.sin(angle) * r;
    return {
      x: x,
      y: y,
    };
  };
  var getTicks = function getTicks(start, end, tickCount, center, r, tickOffset, tickLength) {
    var ticks = [];
    var diff = end - start;
    for (var i = 0; i <= tickCount; i++) {
      var tickValue = start + (diff * i) / tickCount;
      var startPoint = getPoint$2(center, tickValue, r + tickOffset - tickLength);
      var endPoint = getPoint$2(center, tickValue, r + tickOffset);
      ticks.push({
        tickValue: tickValue,
        start: startPoint,
        end: endPoint,
      });
    }
    return ticks;
  };
  var withGauge = function (View) {
    return /*#__PURE__*/ (function (_Component) {
      _inherits(Guage, _Component);
      var _super = _createSuper(Guage);
      function Guage() {
        _classCallCheck(this, Guage);
        return _super.apply(this, arguments);
      }
      _createClass(Guage, [
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              context = this.context;
            var startAngle = props.startAngle,
              endAngle = props.endAngle,
              tickCount = props.tickCount,
              center = props.center,
              r = props.r,
              tickOffset = props.tickOffset,
              tickLength = props.tickLength;
            var ticks = getTicks(
              startAngle,
              endAngle,
              tickCount,
              center,
              context.px2hd(r),
              context.px2hd(tickOffset),
              context.px2hd(tickLength)
            );
            return jsx(
              View,
              _objectSpread(
                _objectSpread({}, props),
                {},
                {
                  ticks: ticks,
                }
              )
            );
          },
        },
      ]);
      return Guage;
    })(Component);
  };

  var GaugeView = function (props) {
    var center = props.center,
      startAngle = props.startAngle,
      endAngle = props.endAngle,
      r = props.r,
      percent = props.percent,
      ticks = props.ticks;
    var x = center.x,
      y = center.y;
    var diff = endAngle - startAngle;
    return jsx(
      'group',
      null,
      jsx('arc', {
        attrs: {
          x: x,
          y: y,
          r: r,
          startAngle: startAngle,
          endAngle: endAngle,
          lineWidth: '20px',
          lineCap: 'round',
          stroke: '#e7e7e7',
        },
      }),
      jsx('arc', {
        attrs: {
          x: x,
          y: y,
          r: r,
          startAngle: startAngle,
          endAngle: startAngle,
          lineWidth: '40px',
          lineCap: 'round',
          stroke: '#0075ff',
        },
        animation: {
          appear: {
            easing: 'linear',
            duration: 500,
            property: ['endAngle'],
            start: {
              endAngle: startAngle,
            },
            end: {
              endAngle: startAngle + diff * percent,
            },
          },
        },
      }),
      ticks.map(function (tick) {
        var start = tick.start,
          end = tick.end;
        return jsx('line', {
          attrs: {
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            lineWidth: '6px',
            lineCap: 'round',
            stroke: '#e7e7e7',
          },
        });
      })
    );
  };

  var index$b = withGauge(GaugeView);

  // 判断新老values是否相等，这里只要判断前后是否相等即可
  function isValuesEqual(values, newValues) {
    if (values.length !== newValues.length) {
      return false;
    }
    var lastIndex = values.length - 1;
    return values[0] === newValues[0] && values[lastIndex] === newValues[lastIndex];
  }
  function updateCategoryRange(scale, originScale, range) {
    var currentValues = scale.values,
      currentTicks = scale.ticks,
      tickMethod = scale.tickMethod,
      tickCount = scale.tickCount;
    var originValues = originScale.values;
    var _range = _slicedToArray(range, 2),
      start = _range[0],
      end = _range[1];
    var len = originValues.length;
    var valueStart = start * len;
    var valueEnd = end * len;
    // 保持滑动时个数的稳定
    var count = Math.round(valueEnd - valueStart);
    var sliceSatrt = Math.round(valueStart);
    // 从原始数据里截取需要显示的数据
    var newValues = originValues.slice(sliceSatrt, sliceSatrt + count);
    // 根据当前数据的比例，和定义的tickCount计算应该需要多少个ticks
    var newTickCount = Math.round((tickCount * originValues.length) / newValues.length);
    // 计算新的ticks
    var catTicks = getTickMethod(tickMethod);
    var newTicks = catTicks({
      tickCount: newTickCount,
      values: originValues,
    });
    // 如果新数组和当前显示的数组相同，则不更新
    if (isValuesEqual(currentValues, newValues) && isValuesEqual(currentTicks, newTicks)) {
      return;
    }
    scale.change({
      values: newValues,
      ticks: newTicks,
    });
    return scale;
  }
  function updateLinearRange(scale, originScale, range) {
    var min = originScale.min,
      max = originScale.max;
    var _range2 = _slicedToArray(range, 2),
      start = _range2[0],
      end = _range2[1];
    var newMin = min + (max - min) * start;
    var newMax = min + (max - min) * end;
    scale.change({
      min: newMin,
      max: newMax,
      nice: false,
    });
  }
  function updateScale(scale, values) {
    var isLinear = scale.isLinear;
    if (isLinear) {
      var _getRange = getRange(values),
        min = _getRange.min,
        max = _getRange.max;
      return scale.change({
        min: min,
        max: max,
        nice: true,
      });
    }
  }
  function updateRange(scale, originScale, range) {
    var isCategory = scale.isCategory,
      isLinear = scale.isLinear;
    if (isCategory) {
      return updateCategoryRange(scale, originScale, range);
    }
    if (isLinear) {
      return updateLinearRange(scale, originScale, range);
    }
  }
  function updateFollow(scales, mainScale, data) {
    var mainField = mainScale.field,
      mainType = mainScale.type,
      mainValues = mainScale.values;
    // 转成 map 提高查询性能
    var mainValuesMap = {};
    mainValues.forEach(function (item) {
      mainValuesMap[item] = true;
    });
    return scales.map(function (scale) {
      var followField = scale.field;
      var values = [];
      data.forEach(function (item) {
        var value = mainType === 'timeCat' ? toTimeStamp(item[mainField]) : item[mainField];
        if (mainValuesMap[value]) {
          values.push(item[followField]);
        }
      });
      return updateScale(scale, values);
    });
  }

  function lerp(min, max, fraction) {
    return (max - min) * fraction + min;
  }
  function isEqual$1(aRange, bRange) {
    for (var i in aRange) {
      if (!isNumberEqual(aRange[i], bRange[i])) return false;
    }
    return true;
  }
  function cloneScale$1(scale, scaleConfig) {
    // @ts-ignore
    return new scale.constructor(_objectSpread(_objectSpread({}, scale.__cfg__), scaleConfig));
  }
  // 缩放
  var Zoom = /*#__PURE__*/ (function (_Component) {
    _inherits(Zoom, _Component);
    var _super = _createSuper(Zoom);
    function Zoom(props) {
      var _this;
      _classCallCheck(this, Zoom);
      var defaultProps = {
        onPanStart: function onPanStart() {},
        onPinchStart: function onPinchStart() {},
        onPan: function onPan() {},
        onPinch: function onPinch() {},
        onInit: function onInit() {},
        onPanEnd: function onPanEnd() {},
        onPinchEnd: function onPinchEnd() {},
        minCount: 10,
      };
      _this = _super.call(this, _objectSpread(_objectSpread({}, defaultProps), props));
      _this.scale = {};
      _this.originScale = {};
      //swipe end x y
      _this.swipeEnd = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      };
      _this.onStart = function () {
        var _assertThisInitialize = _assertThisInitialized(_this),
          state = _assertThisInitialize.state;
        var range = state.range;
        _this.startRange = range;
        _this.loop && cancelAnimationFrame(_this.loop);
      };
      _this.onPan = function (ev) {
        var _assertThisInitialize2 = _assertThisInitialized(_this),
          dims = _assertThisInitialize2.dims;
        var range = {};
        each(dims, function (dim) {
          if (dim === 'x') {
            range['x'] = _this._doXPan(ev);
            return;
          }
          if (dim === 'y') {
            range['y'] = _this._doYPan(ev);
            return;
          }
        });
        if (isEqual$1(range, _this.state.range)) return;
        _this.setState({
          range: range,
        });
        // console.log('pan range', range);
      };

      _this.onSwipe = function (ev) {
        var swipe = _this.props.swipe;
        if (_this.props.mode.length < 2 || !swipe) return;
        var _ev$velocityX = ev.velocityX,
          velocityX = _ev$velocityX === void 0 ? 0 : _ev$velocityX,
          _ev$velocityY = ev.velocityY,
          velocityY = _ev$velocityY === void 0 ? 0 : _ev$velocityY,
          points = ev.points;
        var range = _this.state.range;
        var _points$ = points[0],
          x = _points$.x,
          y = _points$.y;
        // 边界处理
        if (
          Math.abs((range === null || range === void 0 ? void 0 : range.x[0]) - 0) < 0.0005 &&
          velocityX > 0
        )
          return;
        if (
          Math.abs((range === null || range === void 0 ? void 0 : range.x[1]) - 1) < 0.0005 &&
          velocityX < 0
        )
          return;
        if (
          Math.abs((range === null || range === void 0 ? void 0 : range.y[0]) - 0) < 0.0005 &&
          velocityY < 0
        )
          return;
        if (
          Math.abs((range === null || range === void 0 ? void 0 : range.x[1]) - 1) < 0.0005 &&
          velocityY > 0
        )
          return;
        _this.swipeEnd = {
          startX: x,
          startY: y,
          endX: x + velocityX * 50,
          endY: y - velocityY * 50,
        };
        _this.onStart();
        _this.update();
      };
      _this.onPinch = function (ev) {
        var _assertThisInitialize3 = _assertThisInitialized(_this),
          dims = _assertThisInitialize3.dims;
        var range = {};
        each(dims, function (dim) {
          if (dim === 'x') {
            range['x'] = _this._doXPinch(ev);
            return;
          }
          if (dim === 'y') {
            range['y'] = _this._doYPinch(ev);
            return;
          }
        });
        if (isEqual$1(range, _this.state.range)) return;
        _this.setState({
          range: range,
        });
      };
      _this.onEnd = function () {
        _this.startRange = null;
      };
      var _props$range = props.range,
        mode = props.mode;
      _this.dims = mode instanceof Array ? mode : [mode];
      return _this;
    }
    _createClass(Zoom, [
      {
        key: 'didMount',
        value: function didMount() {
          this._bindEvents();
        },
      },
      {
        key: 'willReceiveProps',
        value: function willReceiveProps(nextProps) {
          var nextRange = nextProps.range;
          var lastRange = this.props.range;
          if (!equal(nextRange, lastRange)) {
            var cacheRange = {};
            each(this.dims, function (dim) {
              cacheRange[dim] = nextRange;
            });
            this.state = {
              range: cacheRange,
            };
          }
        },
      },
      {
        key: 'willMount',
        value: function willMount() {
          var _this2 = this;
          var props = this.props,
            dims = this.dims,
            state = this.state;
          var minCount = props.minCount,
            range = props.range;
          // const { range } = state;
          var valueLength = Number.MIN_VALUE;
          var cacheRange = {};
          each(dims, function (dim) {
            var scale = _this2._getScale(dim);
            var values = scale.values;
            valueLength = values.length > valueLength ? values.length : valueLength;
            _this2.scale[dim] = scale;
            _this2.originScale[dim] = cloneScale$1(scale);
            _this2.updateRange(range, dim);
            cacheRange[dim] = range;
          });
          // 图表上最少显示 MIN_COUNT 个数据
          this.minScale = minCount / valueLength;
          this.state = {
            range: cacheRange,
          };
        },
      },
      {
        key: 'didUnmount',
        value: function didUnmount() {
          this.loop && cancelAnimationFrame(this.loop);
          this._clearEvents();
        },
      },
      {
        key: 'update',
        value: function update() {
          var _this3 = this;
          var _this$swipeEnd = this.swipeEnd,
            startX = _this$swipeEnd.startX,
            startY = _this$swipeEnd.startY,
            endX = _this$swipeEnd.endX,
            endY = _this$swipeEnd.endY;
          var x = lerp(startX, endX, 0.05);
          var y = lerp(startY, endY, 0.05);
          this.swipeEnd = {
            startX: x,
            startY: y,
            endX: endX,
            endY: endY,
          };
          var props = this.props;
          var coord = props.coord;
          var coordWidth = coord.width,
            coordHeight = coord.height;
          var range = {};
          range['x'] = this._doPan((x - startX) / coordWidth, 'x');
          range['y'] = this._doPan((y - startY) / coordHeight, 'y');
          this.setState({
            range: range,
          });
          this.startRange = range;
          this.loop = requestAnimationFrame(function () {
            return _this3.update();
          });
          if (Math.abs(x - endX) < 0.0005 && Math.abs(y - endY) < 0.0005) {
            this.onEnd();
            cancelAnimationFrame(this.loop);
          }
        },
      },
      {
        key: '_doXPan',
        value: function _doXPan(ev) {
          var direction = ev.direction,
            deltaX = ev.deltaX;
          if (this.props.mode.length === 1 && (direction === 'up' || direction === 'down')) {
            return this.state.range['x'];
          }
          ev.preventDefault && ev.preventDefault();
          var props = this.props;
          var coord = props.coord,
            _props$panSensitive = props.panSensitive,
            panSensitive = _props$panSensitive === void 0 ? 1 : _props$panSensitive;
          var coordWidth = coord.width;
          var ratio = (deltaX / coordWidth) * panSensitive;
          var newRange = this._doPan(ratio, 'x');
          return newRange;
        },
      },
      {
        key: '_doYPan',
        value: function _doYPan(ev) {
          var direction = ev.direction,
            deltaY = ev.deltaY;
          if (this.props.mode.length === 1 && (direction === 'left' || direction === 'right')) {
            return this.state.range['y'];
          }
          ev.preventDefault && ev.preventDefault();
          var props = this.props;
          var coord = props.coord,
            _props$panSensitive2 = props.panSensitive,
            panSensitive = _props$panSensitive2 === void 0 ? 1 : _props$panSensitive2;
          var coordHeight = coord.height;
          var ratio = (-deltaY / coordHeight) * panSensitive;
          var newRange = this._doPan(ratio, 'y');
          return newRange;
        },
      },
      {
        key: '_doPan',
        value: function _doPan(ratio, dim) {
          var startRange = this.startRange;
          var _startRange$dim = _slicedToArray(startRange[dim], 2),
            start = _startRange$dim[0],
            end = _startRange$dim[1];
          var rangeLen = end - start;
          var rangeOffset = rangeLen * ratio;
          var newStart = start - rangeOffset;
          var newEnd = end - rangeOffset;
          var newRange = this.updateRange([newStart, newEnd], dim);
          return newRange;
        },
      },
      {
        key: '_doXPinch',
        value: function _doXPinch(ev) {
          ev.preventDefault && ev.preventDefault();
          var zoom = ev.zoom,
            center = ev.center;
          var props = this.props;
          var coord = props.coord;
          var coordWidth = coord.width,
            left = coord.left,
            right = coord.right;
          var leftLen = Math.abs(center.x - left);
          var rightLen = Math.abs(right - center.x);
          // 计算左右缩放的比例
          var leftZoom = leftLen / coordWidth;
          var rightZoom = rightLen / coordWidth;
          var newRange = this._doPinch(leftZoom, rightZoom, zoom, 'x');
          return newRange;
        },
      },
      {
        key: '_doYPinch',
        value: function _doYPinch(ev) {
          ev.preventDefault && ev.preventDefault();
          var zoom = ev.zoom,
            center = ev.center;
          var props = this.props;
          var coord = props.coord;
          var coordHeight = coord.height,
            top = coord.top,
            bottom = coord.bottom;
          var topLen = Math.abs(center.y - top);
          var bottomLen = Math.abs(bottom - center.y);
          // 计算左右缩放的比例
          var topZoom = topLen / coordHeight;
          var bottomZoom = bottomLen / coordHeight;
          var newRange = this._doPinch(topZoom, bottomZoom, zoom, 'y');
          return newRange;
        },
      },
      {
        key: '_doPinch',
        value: function _doPinch(startRatio, endRatio, zoom, dim) {
          var startRange = this.startRange,
            minScale = this.minScale,
            props = this.props;
          var _props$pinchSensitive = props.pinchSensitive,
            pinchSensitive = _props$pinchSensitive === void 0 ? 1 : _props$pinchSensitive;
          var _startRange$dim2 = _slicedToArray(startRange[dim], 2),
            start = _startRange$dim2[0],
            end = _startRange$dim2[1];
          var zoomOffset = zoom < 1 ? (1 / zoom - 1) * pinchSensitive : (1 - zoom) * pinchSensitive;
          var rangeLen = end - start;
          var rangeOffset = rangeLen * zoomOffset;
          var startOffset = rangeOffset * startRatio;
          var endOffset = rangeOffset * endRatio;
          var newStart = Math.max(0, start - startOffset);
          var newEnd = Math.min(1, end + endOffset);
          var newRange = [newStart, newEnd];
          // 如果已经到了最小比例，则不能再继续再放大
          if (newEnd - newStart < minScale) {
            return this.state.range[dim];
          }
          return this.updateRange(newRange, dim);
        },
      },
      {
        key: 'updateRange',
        value: function updateRange$1(originalRange, dim) {
          if (!originalRange) return;
          var _originalRange = _slicedToArray(originalRange, 2),
            start = _originalRange[0],
            end = _originalRange[1];
          var rangeLength = end - start;
          // 处理边界值
          var newRange;
          if (start < 0) {
            newRange = [0, rangeLength];
          } else if (end > 1) {
            newRange = [1 - rangeLength, 1];
          } else {
            newRange = originalRange;
          }
          var props = this.props,
            scale = this.scale,
            originScale = this.originScale,
            state = this.state;
          var chart = props.chart,
            data = props.data,
            autoFit = props.autoFit;
          var range = state.range;
          if (range && isEqual$1(newRange, range[dim])) return newRange;
          // 更新主 scale
          updateRange(scale[dim], originScale[dim], newRange);
          if (autoFit) {
            var followScale = this._getFollowScales(dim);
            this.updateFollow(followScale, scale[dim], data);
          }
          // 手势变化不执行动画
          var animate = chart.animate;
          chart.setAnimate(false);
          chart.forceUpdate(function () {
            chart.setAnimate(animate);
          });
          return newRange;
        },
      },
      {
        key: 'updateFollow',
        value: function updateFollow$1(scales, mainScale, data) {
          updateFollow(scales, mainScale, data);
        },
      },
      {
        key: '_getScale',
        value: function _getScale(dim) {
          var _this$props = this.props,
            coord = _this$props.coord,
            chart = _this$props.chart;
          if (dim === 'x') {
            return coord.transposed ? chart.getYScales()[0] : chart.getXScales()[0];
          } else {
            return coord.transposed ? chart.getXScales()[0] : chart.getYScales()[0];
          }
        },
      },
      {
        key: '_getFollowScales',
        value: function _getFollowScales(dim) {
          var _this$props2 = this.props,
            coord = _this$props2.coord,
            chart = _this$props2.chart;
          if (dim === 'x') {
            return coord.transposed ? chart.getXScales() : chart.getYScales();
          }
          if (dim === 'y') {
            return coord.transposed ? chart.getYScales() : chart.getXScales();
          }
        },
      },
      {
        key: '_bindEvents',
        value: function _bindEvents() {
          var _this4 = this;
          var context = this.context,
            props = this.props,
            scale = this.scale;
          var canvas = context.canvas;
          var onPinchStart = props.onPinchStart,
            onPanStart = props.onPanStart,
            onPanEnd = props.onPanEnd,
            pan = props.pan,
            pinch = props.pinch,
            swipe = props.swipe,
            onInit = props.onInit,
            onPan = props.onPan,
            onPinch = props.onPinch,
            onPinchEnd = props.onPinchEnd;
          // 统一绑定事件
          if (pan !== false) {
            canvas.on('panstart', function () {
              _this4.onStart();
              onPanStart({
                scale: scale,
              });
            });
            canvas.on('pan', function (ev) {
              _this4.onPan(ev);
              onPan(ev);
            });
            canvas.on('panend', function () {
              _this4.onEnd();
              onPanEnd({
                scale: scale,
              });
            });
          }
          if (pinch !== false) {
            canvas.on('pinchstart', function () {
              _this4.onStart();
              onPinchStart();
            });
            canvas.on('pinch', function (ev) {
              _this4.onPinch(ev);
              onPinch(ev);
            });
            canvas.on('pinchend', function () {
              _this4.onEnd();
              onPinchEnd({
                scale: scale,
              });
            });
          }
          if (swipe !== false) {
            canvas.on('swipe', this.onSwipe);
          }
          onInit({
            scale: scale,
          });
        },
      },
      {
        key: '_clearEvents',
        value: function _clearEvents() {
          var _this5 = this;
          var context = this.context,
            props = this.props,
            scale = this.scale;
          var canvas = context.canvas;
          var onPinchEnd = props.onPinchEnd,
            onPanEnd = props.onPanEnd,
            onPinchStart = props.onPinchStart,
            pan = props.pan,
            pinch = props.pinch,
            onPan = props.onPan,
            onPinch = props.onPinch,
            swipe = props.swipe;
          // 统一解绑事件
          if (pan !== false) {
            canvas.off('panstart', function () {
              _this5.onStart();
              onPinchStart();
            });
            canvas.off('pan', function (ev) {
              _this5.onPan(ev);
              onPan(ev);
            });
            canvas.off('panend', function () {
              _this5.onEnd();
              onPanEnd({
                scale: scale,
              });
            });
          }
          if (pinch !== false) {
            canvas.off('pinchstart', function () {
              _this5.onStart();
              onPinchStart();
            });
            canvas.off('pinch', function (ev) {
              _this5.onPinch(ev);
              onPinch(ev);
            });
            canvas.off('pinchend', function () {
              _this5.onEnd();
              onPinchEnd({
                scale: scale,
              });
            });
          }
          if (swipe !== false) {
            canvas.off('swipe', this.onSwipe);
          }
        },
      },
    ]);
    return Zoom;
  })(Component);

  var withScrollBar = function (View) {
    return /*#__PURE__*/ (function (_Zoom) {
      _inherits(ScrollBar, _Zoom);
      var _super = _createSuper(ScrollBar);
      function ScrollBar() {
        _classCallCheck(this, ScrollBar);
        return _super.apply(this, arguments);
      }
      _createClass(ScrollBar, [
        {
          key: 'willMount',
          value: function willMount() {
            _get$1(_getPrototypeOf(ScrollBar.prototype), 'willMount', this).call(this);
            var context = this.context,
              props = this.props;
            var visible = props.visible,
              _props$position = props.position,
              position = _props$position === void 0 ? 'bottom' : _props$position,
              _props$margin = props.margin,
              margin = _props$margin === void 0 ? '16px' : _props$margin,
              chart = props.chart;
            var marginNumber = context.px2hd(margin);
            if (visible === false) {
              return null;
            }
            chart.updateCoordFor(this, {
              position: position,
              width: position === 'left' || position === 'right' ? marginNumber : 0,
              height: position === 'bottom' || position === 'top' ? marginNumber : 0,
            });
          },
        },
        {
          key: 'render',
          value: function render() {
            var props = this.props,
              state = this.state;
            var visible = props.visible;
            if (visible === false) {
              return null;
            }
            return jsx(
              View,
              _objectSpread(
                _objectSpread(
                  {
                    position: 'bottom',
                  },
                  props
                ),
                state
              )
            );
          },
        },
      ]);
      return ScrollBar;
    })(Zoom);
  };

  var Horizontal = function (props, context) {
    var coord = props.coord,
      range = props.range,
      position = props.position,
      layout = props.layout;
    var left = coord.left,
      width = coord.width;
    var top = layout.top,
      height = layout.height;
    var _ref =
        (range === null || range === void 0 ? void 0 : range.x) ||
        (range === null || range === void 0 ? void 0 : range.y),
      _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];
    var barLeft = width * start;
    var barWidth = width * (end - start);
    return jsx(
      'group',
      {
        style: {
          left: left,
          top: position === 'top' ? top - context.px2hd('8px') : top + height,
        },
      },
      jsx('line', {
        style: {
          position: 'absolute',
          left: 0,
          width: width,
          height: 0,
        },
        attrs: {
          stroke: 'rgba(202, 215, 239, .2)',
          lineCap: 'round',
          lineWidth: '8px',
        },
      }),
      jsx('line', {
        style: {
          position: 'absolute',
          left: barLeft,
          width: barWidth,
          height: 0,
        },
        attrs: {
          stroke: 'rgba(202, 215, 239, .5)',
          lineCap: 'round',
          lineWidth: '8px',
        },
      })
    );
  };

  var Vertical = function (props, context) {
    var coord = props.coord,
      range = props.range,
      position = props.position,
      layout = props.layout;
    var top = coord.top,
      height = coord.height;
    var left = layout.left,
      width = layout.width;
    var _ref =
        (range === null || range === void 0 ? void 0 : range.y) ||
        (range === null || range === void 0 ? void 0 : range.x),
      _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];
    var barTop = height * start;
    var barHeight = height * (end - start);
    return jsx(
      'group',
      {
        style: {
          top: top,
          left: position === 'left' ? left - context.px2hd('8px') : left + width,
        },
      },
      jsx('line', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: height,
        },
        attrs: {
          stroke: 'rgba(202, 215, 239, .2)',
          lineCap: 'round',
          lineWidth: '8px',
        },
      }),
      jsx('line', {
        style: {
          position: 'absolute',
          top: barTop,
          width: 0,
          height: barHeight,
        },
        attrs: {
          stroke: 'rgba(202, 215, 239, .5)',
          lineCap: 'round',
          lineWidth: '8px',
        },
      })
    );
  };

  var ScrollBarView = function (props) {
    var position = props.position,
      mode = props.mode;
    if (mode.length > 1) {
      return jsx(
        'group',
        null,
        jsx(Vertical, _objectSpread({}, props)),
        jsx(Horizontal, _objectSpread({}, props))
      );
    }
    if (position === 'left' || position === 'right') {
      return jsx(Vertical, _objectSpread({}, props));
    }
    return jsx(Horizontal, _objectSpread({}, props));
  };

  var index$c = withScrollBar(ScrollBarView);

  exports.ArcGuide = ArcGuide;
  exports.Area = index$1;
  exports.AreaView = AreaView;
  exports.Axis = index$4;
  exports.AxisView = AxisView;
  exports.Canvas = Canvas$1;
  exports.Chart = Chart;
  exports.Children = Children;
  exports.Component = Component;
  exports.Fragment = fragment;
  exports.Gauge = index$b;
  exports.GaugeView = GaugeView;
  exports.Geometry = Geometry;
  exports.Guide = index$6;
  exports.ImageGuide = ImageGuide;
  exports.Interval = index$2;
  exports.IntervalView = intervalView;
  exports.Legend = index$5;
  exports.LegendView = LegendView;
  exports.Line = index;
  exports.LineGuide = LineGuide;
  exports.LineView = LineView;
  exports.PieLabel = index$a;
  exports.PieLabelView = PieLabelView;
  exports.Point = index$3;
  exports.PointGuide = PointGuide;
  exports.PointView = PointView;
  exports.RectGuide = RectGuide;
  exports.ScrollBar = index$c;
  exports.ScrollBarView = ScrollBarView;
  exports.Sunburst = index$9;
  exports.SunburstView = SunburstView;
  exports.TagGuide = TagGuide;
  exports.TextGuide = TextGuide;
  exports.Timeline = Timeline;
  exports.Tooltip = index$7;
  exports.TooltipView = TooltipView;
  exports.Treemap = index$8;
  exports.TreemapView = TreemapView;
  exports.Zoom = Zoom;
  exports.createElement = jsx;
  exports.createRef = createRef;
  exports.jsx = jsx;
  exports.render = render$1;
  exports.renderShape = renderShape;
  exports.withArea = withArea;
  exports.withAxis = withAxis;
  exports.withGauge = withGauge;
  exports.withGuide = withGuide;
  exports.withInterval = withInterval;
  exports.withLegend = withLegend;
  exports.withLine = withLine;
  exports.withPieLabel = withPieLabel;
  exports.withPoint = withPoint;
  exports.withScrollBar = withScrollBar;
  exports.withSunburst = withSunburst;
  exports.withTooltip = withTooltip;
  exports.withTreemap = withTreemap;

  Object.defineProperty(exports, '__esModule', { value: true });
});
