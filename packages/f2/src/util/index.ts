import { isDate, isPlainObject, isNumber, isString, isArray } from '@antv/util';

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
function defaultPx2hd(px: number): number {
  if (!px) {
    return 0;
  }
  return Number((px * SCALE).toFixed(1));
}

function parsePadding(padding: number | number[]) {
  if (isNumber(padding)) {
    return [padding, padding, padding, padding];
  }
  const top = padding[0];
  const right = isNumber(padding[1]) ? padding[1] : padding[0];
  const bottom = isNumber(padding[2]) ? padding[2] : top;
  const left = isNumber(padding[3]) ? padding[3] : right;
  return [top, right, bottom, left];
}

type pxstr = `${number}px`;

function batch2hd(px2hd) {
  const batchPx2hd = (value: pxstr | pxstr[] | number | number[] | string | string[] | any) => {
    // 处理带px的数据
    if (isString(value) && /^-?\d+px$/.test(value)) {
      const num = value.substr(0, value.length - 2);
      return px2hd(Number(num));
    }
    if (isArray(value)) {
      return value.map((v) => {
        return batchPx2hd(v);
      });
    }
    if (isPlainObject(value)) {
      const result = {};
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          const rst = batchPx2hd(value[key]);
          if (!rst) {
            result[key] = rst;
            continue;
          }
          if (key === 'padding' || key === 'margin') {
            const paddingArray = parsePadding(rst);
            result[key] = paddingArray;
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
  return batchPx2hd;
}

// 展开数组
function extendMap(arr, fn: Function) {
  if (!arr) {
    return arr;
  }
  if (!isArray(arr)) {
    return [fn(arr)];
  }
  let newArray = [];
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
  const { minX, maxX, minY, maxY } = bbox;
  const { x, y } = point;
  return minX <= x && maxX >= x && minY <= y && maxY >= y;
}

function getElementsByClassName(className: string, element) {
  if (!element || !className) return [];
  let rst = [];
  if (element.get('className') === className) {
    rst.push(element);
  }
  const children = element.get('children');
  if (children && children.length) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      rst = rst.concat(getElementsByClassName(className, child));
    }
  }
  return rst;
}

const px2hd = batch2hd(defaultPx2hd);

export { px2hd, batch2hd, extendMap, parsePadding, toTimeStamp, isInBBox, getElementsByClassName };
