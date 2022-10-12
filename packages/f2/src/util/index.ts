import { isDate, isString } from '@antv/util';

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
  // const { minX, maxX, minY, maxY } = bbox;
  const { left, top, width, height } = bbox;
  const minX = left;
  const maxX = left + width;
  const minY = top;
  const maxY = top + height;
  const { x, y } = point;
  return minX <= x && maxX >= x && minY <= y && maxY >= y;
}

export { toTimeStamp, isInBBox };
