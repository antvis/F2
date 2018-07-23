/**
 * @fileOverview 基础工具类
 * @author dxq613@gmail.com
 */
const DomUtil = require('./dom');
const Util = {
  upperFirst: require('@antv/util/lib/string/upperFirst'),
  lowerFirst: require('@antv/util/lib/string/lowerFirst'),
  isString: require('@antv/util/lib/type/isString'),
  isNumber: require('@antv/util/lib/type/isNumber'),
  isBoolean: require('@antv/util/lib/type/isBoolean'),
  isFunction: require('@antv/util/lib/type/isFunction'),
  isDate: require('@antv/util/lib/type/isDate'),
  isArray: require('@antv/util/lib/type/isArray'),
  isNil: require('@antv/util/lib/type/isNil'),
  isObject: require('@antv/util/lib/type/isObject'),
  isPlainObject: require('@antv/util/lib/type/isPlainObject'),
  deepMix: require('@antv/util/lib/deepMix'),
  mix: require('@antv/util/lib/mix'),
  each: require('@antv/util/lib/each'),
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
  group(data, fields, appendConditions = {}) {
    if (!fields) {
      return [ data ];
    }
    const groups = Util.Array.groupToMap(data, fields);
    const array = [];
    // 这里就默认按照第一个指定了 values 的列进行排序
    if (fields.length === 1 && appendConditions[fields[0]]) {
      const values = appendConditions[fields[0]];
      Util.each(values, value => {
        value = '_' + value;
        array.push(groups[value]);
      });
    } else {
      for (const i in groups) {
        array.push(groups[i]);
      }
    }

    return array;
  },
  groupToMap(data, fields) {
    if (!fields) {
      return {
        0: data
      };
    }

    const callback = function(row) {
      let unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
      for (let i = 0, l = fields.length; i < l; i++) {
        unique += row[fields[i]] && row[fields[i]].toString();
      }
      return unique;
    };

    const groups = {};
    for (let i = 0, len = data.length; i < len; i++) {
      const row = data[i];
      const key = callback(row);
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
