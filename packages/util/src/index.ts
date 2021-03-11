// 默认设置50
let ONE_REM: number;
try {
  // xgraph下这段会抛错
  ONE_REM = parseInt(document.documentElement.style.fontSize, 10) || 50;
} catch (e) {
  ONE_REM = 50;
}
const SCALE = ONE_REM / 100;

/**
 * 像素转换
 * @param {Number} px - 750视觉稿像素
 * @return {Number} 屏幕上实际像素
 */
function px2hd(px: number): number {
  if (!px) {
    return 0;
  }
  return Number((px * SCALE).toFixed(1));
}

function is(type: string) {
  return (value: any) => {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  }
}

const isNumber = is('Number');
const isString = is('String');
const isArray = is('Array');
const isObject = is('Object');
const isFunction = is('Function')

function parsePadding(padding: any) {
  if (isNumber(padding) || isString(padding)) {
    return [padding, padding, padding, padding];
  }
  const top = padding[0];
  const right = padding[1] ? padding[1] : padding[0];
  const bottom = padding[2] ? padding[2] : top;
  const left = padding[3] ? padding[3] : right;
  return [ top, right, bottom, left ];
}

function batch2hd(value: any) {
  // 处理带px的数据
  if (isString(value) && /^-?\d+px$/.test(value)) {
    const num = value.substr(0, value.length - 2);
    return px2hd(Number(num));
  }
  if (isArray(value)) {
    return value.map((v: any) => {
      return batch2hd(v);
    });
  }
  if (isObject(value)) {
    const result: any = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const rst = batch2hd(value[key]);
        if (!rst) {
          result[key] = rst;
          continue;
        };
        if (key === 'padding' || key === 'margin') {
          const paddingArray = parsePadding(rst);
          result[`${key}Top`] = paddingArray[0];
          result[`${key}Right`] = paddingArray[1];
          result[`${key}Bottom`] = paddingArray[2];
          result[`${key}Left`] = paddingArray[3];
          continue;
        }
        result[key] = rst;
      }
    }
    return result;
  }
  // 默认直接返回
  return value;
}

// 展开数组
function extendMap(arr: any[], fn: Function) {
  if (!arr) {
    return arr;
  }
  if (!isArray(arr)) {
    return [ fn(arr) ];
  }
  let newArray: any = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (isArray(element)) {
      newArray = newArray.concat(extendMap(element, fn));
    } else if (element) {
      newArray.push(fn(element));
    }
  }
  return newArray;
}

// @ts-ignore
const map = (children: any, fn: any) => {
  if (!children) {
    return fn(children);
  }
  if (isArray(children)) {
    return children.map(child => {
      return map(child, fn);
    });
  }
  return fn(children);
}

// components 和 children 需要是相同的2棵树
// @ts-ignore
function mapTwo(components, children, fn) {
  if (!components) {
    return fn(components, children);
  }
  if (isArray(components)) {
    // 防止children为空的情况
    children = children || [];
    const len = Math.max(components.length, children.length);
    const newComponents = [];
    for (let i = 0; i < len; i++) {
      newComponents.push(mapTwo(components[i], children[i], fn));
    }
    return newComponents;
  }
  return fn(components, children);
}

export {
  isString,
  isArray,
  isObject,
  isFunction,
  // px2hd 含义更清晰
  batch2hd as px2hd,
  batch2hd,
  extendMap,
  map,
  mapTwo,
};
