/**
 * @fileOverview Utility for F2
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
const DomUtil = require('./dom');
const Util = {
  upperFirst: require('@antv/util/lib/string/upper-first'),
  lowerFirst: require('@antv/util/lib/string/lower-first'),
  isString: require('@antv/util/lib/type/is-string'),
  isNumber: require('@antv/util/lib/type/is-number'),
  isBoolean: require('@antv/util/lib/type/is-boolean'),
  isFunction: require('@antv/util/lib/type/is-function'),
  isDate: require('@antv/util/lib/type/is-date'),
  isArray: require('@antv/util/lib/type/is-array'),
  isNil: require('@antv/util/lib/type/is-nil'),
  isObject: require('@antv/util/lib/type/is-object'),
  isPlainObject: require('@antv/util/lib/type/is-plain-object'),
  deepMix: require('@antv/util/lib/deep-mix'),
  mix: require('@antv/util/lib/mix'),
  each: require('@antv/util/lib/each'),
  uniq: require('@antv/util/lib/array/uniq'),
  isObjectValueEqual(a, b) {
    // for vue.js
    a = Object.assign({}, a);
    b = Object.assign({}, b);
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0, len = aProps.length; i < len; i++) {
      const propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  },
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
  },
  directionEnabled(mode, dir) {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
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
      let unique = '_';
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
  },
  getRange(values) {
    if (!values.length) {
      return {
        min: 0,
        max: 0
      };
    }
    const max = Math.max.apply(null, values);
    const min = Math.min.apply(null, values);
    return {
      min,
      max
    };
  }
};

Util.mix(Util, DomUtil);

module.exports = Util;
