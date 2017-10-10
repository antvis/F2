/**
 * @fileOverview 基础工具类
 * @author dxq613@gmail.com
 */
const objectPrototype = Object.prototype;
const toString = objectPrototype.toString;
const MAX_LEVEL = 5;

let Util;

function deepMix(dst, src, level) {
  level = level || 0;
  for (const k in src) {
    if (src.hasOwnProperty(k)) {
      const value = src[k];
      if (value !== null && Util.isObject(value)) {
        if (!Util.isObject(dst[k])) {
          dst[k] = {};
        }
        if (level < MAX_LEVEL) {
          deepMix(dst[k], src[k], level + 1);
        } else {
          dst[k] = src[k];
        }
      } else if (Util.isArray(value)) {
        // if(!Util.isArray(dst[k])){
        dst[k] = [];
        // }
        dst[k] = dst[k].concat(value);
      } else if (value !== undefined) {
        dst[k] = src[k];
      }
    }
  }
}

function _mix(dist, obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
      dist[k] = obj[k];
    }
  }
}

function isNull(o) {
  return o === undefined || o === null;
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
  ucfirst(s) {
    s += '';
    return s.charAt(0).toUpperCase() + s.substring(1);
  },
  lowerFirst(s) {
    s += '';
    return s.charAt(0).toLowerCase() + s.substring(1);
  },
  /**
   * 判断是否是字符串
   * @param {*} value 判定的值
   * @return {Boolean} 是否是字符串
   */
  isString(value) {
    return typeof value === 'string';
  },
  /**
   * 判断是否数字
   * @param {*} value 判定的值
   * @return {Boolean} 是否数字
   */
  isNumber(value) {
    return typeof value === 'number';
  },
  /**
   * 判断是否数字或者数字字符串，由于$.isNumberic方法会把 '123'认为数字
   * @param {*} value 判定的值
   * @return {Boolean} 是否数字
   */
  isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  /**
   * 是否是布尔类型
   * @param {Object} value 测试的值
   * @return {Boolean} 是否布尔类型
   */
  isBoolean(value) {
    return typeof value === 'boolean';
  },
  /**
   * 是否为函数
   * @param  {*} fn 对象
   * @return {Boolean}  是否函数
   */
  isFunction(fn) {
    return typeof (fn) === 'function';
  },
  /**
   * 是否数组
   * @method
   * @param  {*}  value 是否数组
   * @return {Boolean}  是否数组
   */
  isArray: ('isArray' in Array) ? Array.isArray : function(value) {
    return toString.call(value) === '[object Array]';
  },
  /**
   * 是否日期
   * @param  {*}  value 对象
   * @return {Boolean}  是否日期
   */
  isDate(value) {
    return toString.call(value) === '[object Date]';
  },
  /**
   * 对象是否为空
   * @param  {*}  o 对象
   * @return {Boolean}  是否不存在
   */
  isNull,
  // 别名
  isNil: isNull,
  /**
   * 是否是javascript对象
   * @param {Object} value The value to test
   * @return {Boolean} 返回判定结果
   */
  isObject: (toString.call(null) === '[object Object]') ?
    function(value) {
      // check ownerDocument here as well to exclude DOM nodes
      return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
    } : function(value) {
      return toString.call(value) === '[object Object]';
    },
  /**
   * 转换成数组
   * @param  {*} value 需要转换的对象
   * @return {Array}  数组
   */
  toArray(value) {
    if (!value || !value.length) {
      return [];
    }
    return Array.prototype.slice.call(value);
  },
  deepMix() {
    const args = Util.toArray(arguments);
    const rst = args[0];
    for (let i = 1; i < args.length; i++) {
      const source = args[i];
      deepMix(rst, source);
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
  mix(dist, obj1, obj2, obj3) {

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

  /**
   * 遍历数组或者对象
   * @param {Object|Array} elements 数组中的元素或者对象的值
   * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){}
   */
  each(elements, func) {
    if (!elements) {
      return;
    }
    if (Util.isObject(elements)) {
      for (const k in elements) {
        if (elements.hasOwnProperty(k)) {
          const rst = func(elements[k], k);
          if (rst === false) {
            break;
          }
        }
      }
    } else if (elements.length) {
      for (let i = 0; i < elements.length; i++) {
        const rst = func(elements[i], i);
        if (rst === false) {
          break;
        }
      }
    }
  },
  fixedBase(v, base) {
    const str = base.toString();
    const index = str.indexOf('.');
    if (index === -1) {
      return Math.round(v);
    }
    let length = str.substr(index + 1).length;
    if (length > 20) {
      length = 20;
    }
    return parseFloat(v.toFixed(length));
  },
  requestAnimationFrame(fn) {
    const method = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
      return setTimeout(fn, 16);
    };

    return method(fn);
  },
  cancelAnimationFrame(id) {
    const method = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function(id) {
      return clearTimeout(id);
    };
    return method(id);
  }
};


module.exports = Util;
