/**
 * @fileOverview shape util
 * @author dxq613@gmail.com
 */

import { each, isArray, isNil } from '../../util/common';

function splitPoints(obj) {
  const points = [];
  const x = obj.x;
  let y = obj.y;
  y = isArray(y) ? y : [ y ];
  y.forEach(function(yItem, index) {
    const point = {
      x: isArray(x) ? x[index] : x,
      y: yItem
    };
    points.push(point);
  });
  return points;
}

function splitArray(data, yField, connectNulls) {
  if (!data.length) return [];
  const arr = [];
  let tmp = [];
  let yValue;
  each(data, function(obj) {
    yValue = obj._origin ? obj._origin[yField] : obj[yField];
    if (connectNulls) {
      if (!isNil(yValue)) {
        tmp.push(obj);
      }
    } else {
      if ((isArray(yValue) && isNil(yValue[0])) || isNil(yValue)) {
        if (tmp.length) {
          arr.push(tmp);
          tmp = [];
        }
      } else {
        tmp.push(obj);
      }
    }
  });

  if (tmp.length) {
    arr.push(tmp);
  }

  return arr;
}


export {
  splitPoints,
  splitArray
};
