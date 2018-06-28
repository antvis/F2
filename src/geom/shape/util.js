/**
 * @fileOverview shape util
 * @author dxq613@gmail.com
 */

const Util = require('../../util/common');

const ShapeUtil = {
  splitPoints(obj) {
    const points = [];
    const x = obj.x;
    let y = obj.y;
    y = Util.isArray(y) ? y : [ y ];
    y.forEach(function(yItem, index) {
      const point = {
        x: Util.isArray(x) ? x[index] : x,
        y: yItem
      };
      points.push(point);
    });
    return points;
  },
  splitArray(data, yField, connectNulls) {
    if (!data.length) return [];
    const arr = [];
    let tmp = [];
    let yValue;
    Util.each(data, function(obj) {
      yValue = obj._origin ? obj._origin[yField] : obj[yField];
      if (connectNulls) {
        if (!Util.isNil(yValue)) {
          tmp.push(obj);
        }
      } else {
        if ((Util.isArray(yValue) && Util.isNil(yValue[0])) || Util.isNil(yValue)) {
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
};

module.exports = ShapeUtil;
