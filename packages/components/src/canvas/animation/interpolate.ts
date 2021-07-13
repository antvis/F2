import {
  interpolateNumber,
  interpolateNumberArray,
  interpolateRgb,
  interpolateObject
} from './d3-interpolate';

// const hasNaN = (obj) => {
//   return Object.keys(obj).find(key => isNaN(obj[key]))
// }

function interpolateObjectArray(a, b) {
  const na = a ? a.length : 0;
  const nb = b ? b.length : 0;
  const maxLen = Math.max(nb, na);
  const c = new Array(maxLen)
  const x = new Array(maxLen)

  let i;
  // 将a、b长度补齐后再进行插值计算
  for (i = 0; i < maxLen; i++) {
    const ia = i < na ? (a || [])[i] : (a || [])[na - 1]
    const ib = i < nb ? (b || [])[i] : (b || [])[nb - 1]
    x[i] = interpolateObject(ia, ib)
  }

  return (t) => {
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

export default (a: any, b: any) => {
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
