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
  find
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
  directionEnabled
};
