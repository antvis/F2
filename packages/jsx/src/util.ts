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

const isString = is('String');
const isArray = is('Array');
const isObject = is('Object');



function batch2hd(value: any) {
  // 处理带px的数据
  if (isString(value) && /^-?\d+px$/.test(value)) {
    const num = value.substr(0, value.length - 2);
    return px2hd(Number(num));
  }
  if (isArray(value)) {
    return value.map(v => {
      return batch2hd(v);
    });
  }
  if (isObject(value)) {
    const result = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = batch2hd(value[key]);
      }
    }
    return result;
  }
  // 默认直接返回
  return value;
}


export { isString, isArray, isObject, batch2hd };
