/**
 * @fileOverview Utility for F2
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
import {
  upperFirst,
  lowerFirst,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isDate,
  isArray,
  isNil,
  isObject,
  isPlainObject,
  isEqual,
  deepMix,
  mix,
  each,
  uniq,
  find,
  substitute
} from '@antv/util';
import * as ArrayUtil from './array';

function isObjectValueEqual(a, b) {
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
}

function parsePadding(padding) {
  let top;
  let right;
  let bottom;
  let left;

  if (isNumber(padding) || isString(padding)) {
    top = bottom = left = right = padding;
  } else if (isArray(padding)) {
    top = padding[0];
    right = !isNil(padding[1]) ? padding[1] : padding[0];
    bottom = !isNil(padding[2]) ? padding[2] : padding[0];
    left = !isNil(padding[3]) ? padding[3] : right;
  }

  return [ top, right, bottom, left ];
}

function directionEnabled(mode, dir) {
  if (mode === undefined) {
    return true;
  } else if (typeof mode === 'string') {
    return mode.indexOf(dir) !== -1;
  }

  return false;
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

export { ArrayUtil as Array };
export * from './dom';
export {
  upperFirst,
  lowerFirst,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isDate,
  isArray,
  isNil,
  isObject,
  isPlainObject,
  isEqual,
  deepMix,
  mix,
  each,
  uniq,
  find,
  isObjectValueEqual,
  parsePadding,
  directionEnabled,
  toTimeStamp,
  substitute
};
