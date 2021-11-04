import { each, isArray, isNil } from '@antv/util';

function splitArray(data, yField, connectNulls) {
  if (!data.length) return [];
  const arr = [];
  let tmp = [];
  let yValue;
  each(data, function(obj) {
    yValue = obj.origin ? obj.origin[yField] : obj[yField];
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
  splitArray,
};
