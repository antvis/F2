/**
 * @fileOverview 基础工具类
 * @author dxq613@gmail.com
 */
const DomUtil = require('./dom');
const objectPrototype = Object.prototype;
const toString = objectPrototype.toString;
const MAX_LEVEL = 5;

let Util;

function deepMix(dst, src, level) {
  level = level || 0;
  for (const k in src) {
    if (src.hasOwnProperty(k)) {
      const value = src[k];
      if (value !== null && Util.isPlainObject(value)) {
        if (!Util.isPlainObject(dst[k])) {
          dst[k] = {};
        }
        if (level < MAX_LEVEL) {
          deepMix(dst[k], src[k], level + 1);
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
  for (const k in obj) {
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
  upperFirst(s) {
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
  isNil(o) {
    return o === undefined || o === null;
  },
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
  isPlainObject(o) {
    if (!Util.isObject(o)) return false;
    if (Object.getPrototypeOf(o) === null) {
      return true;
    }
    let proto = o;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(o) === proto;
  },
  deepMix() {
    const args = new Array(arguments.length);
    const length = args.length;
    for (let i = 0; i < length; i++) {
      args[i] = arguments[i];
    }
    const rst = args[0];
    for (let i = 1; i < length; i++) {
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
  indexOf(arr, element) {
    return arr.indexOf(element);
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
    if (elements.length) {
      for (let i = 0, len = elements.length; i < len; i++) {
        const rst = func(elements[i], i);
        if (rst === false) {
          break;
        }
      }
    } else {
      for (const k in elements) {
        if (elements.hasOwnProperty(k)) {
          const rst = func(elements[k], k);
          if (rst === false) {
            break;
          }
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
   /**
   * 封装事件，便于使用上下文this,和便于解除事件时使用
   * @protected
   * @param  {Object} obj   对象
   * @param  {String} action 事件名称
   * @return {Function}        返回事件处理函数
   */
  wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action];
    }
    const method = e => {
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
  getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
  },
  parsePadding(padding) {
    let top;
    let right;
    let bottom;
    let left;

    if (Util.isNumber(padding) || Util.isString(padding)) {
      top = bottom = left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    }

    return [ top, right, bottom, left ];
  }
};

Util.Array = {
  merge(dataArray) {
    let rst = [];
    for (let i = 0, len = dataArray.length; i < len; i++) {
      rst = rst.concat(dataArray[i]);
    }
    return rst;
  },
  values(data, name) {
    const rst = [];
    const tmpMap = {};
    for (let i = 0, len = data.length; i < len; i++) {
      const obj = data[i];
      const value = obj[name];
      if (!Util.isNil(value)) {
        if (!Util.isArray(value)) {
          if (!tmpMap[value]) {
            rst.push(value);
            tmpMap[value] = true;
          }
        } else {
          Util.each(value, val => {
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
  firstValue(data, name) {
    let rst = null;
    for (let i = 0, len = data.length; i < len; i++) {
      const obj = data[i];
      const value = obj[name];
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
  group(data, condition) {
    if (!condition) {
      return [ data ];
    }
    const groups = Util.Array.groupToMap(data, condition);
    const array = [];
    for (const i in groups) {
      array.push(groups[i]);
    }
    return array;
  },
  groupToMap(data, condition) {
    if (!condition) {
      return {
        0: data
      };
    }
    if (!Util.isFunction(condition)) {
      const paramsCondition = Util.isArray(condition) ? condition : condition.replace(/\s+/g, '').split('*');
      condition = function(row) {
        let unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
        for (let i = 0, l = paramsCondition.length; i < l; i++) {
          unique += row[paramsCondition[i]] && row[paramsCondition[i]].toString();
        }
        return unique;
      };
    }

    const groups = {};
    for (let i = 0, len = data.length; i < len; i++) {
      const row = data[i];
      const key = condition(row);
      if (groups[key]) {
        groups[key].push(row);
      } else {
        groups[key] = [ row ];
      }
    }

    return groups;
  },
  remove(arr, obj) {
    if (!arr) {
      return;
    }
    const index = arr.indexOf(obj);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
};

Util.mix(Util, DomUtil);

module.exports = Util;
