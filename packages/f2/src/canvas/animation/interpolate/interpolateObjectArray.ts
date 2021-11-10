import { interpolateObject } from 'd3-interpolate';

function interpolateObjectArray(a, b) {
  const na = a ? a.length : 0;
  const nb = b ? b.length : 0;
  const maxLen = Math.max(nb, na);
  const c = new Array(maxLen);
  const x = new Array(maxLen);

  let i;
  // 将a、b长度补齐后再进行插值计算
  for (i = 0; i < maxLen; i++) {
    const ia = i < na ? (a || [])[i] : (a || [])[na - 1];
    const ib = i < nb ? (b || [])[i] : (b || [])[nb - 1];
    x[i] = interpolateObject(ia, ib);
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

export default interpolateObjectArray;
