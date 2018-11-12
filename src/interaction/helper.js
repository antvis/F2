const TimeUtil = require('@antv/scale/lib/time-util');
const Util = require('../util/common');

module.exports = {
  getColDef(chart, field) {
    let colDef;
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }
    return colDef;
  },
  getFieldRange(scale, limitRange, type) {
    if (!scale) return [ 0, 1 ];
    let minRatio = 0;
    let maxRatio = 0;
    if (type === 'linear') {
      const { min, max } = limitRange;
      minRatio = (scale.min - min) / (max - min);
      maxRatio = (scale.max - min) / (max - min);
    } else {
      const originValues = limitRange;
      const values = scale.values;
      const firstIndex = originValues.indexOf(values[0]);
      const lastIndex = originValues.indexOf(values[values.length - 1]);
      minRatio = firstIndex / (originValues.length - 1);
      maxRatio = lastIndex / (originValues.length - 1);
    }
    return [ minRatio, maxRatio ];
  },
  getLimitRange(data, scale) {
    let result;
    const { field, type } = scale;
    const values = Util.Array.values(data, field);
    if (type === 'linear') {
      result = Util.Array.getRange(values);
      if (scale.min < result.min) {
        result.min = scale.min;
      }
      if (scale.max > result.max) {
        result.max = scale.max;
      }
    } else if (type === 'timeCat') {
      Util.each(values, (v, i) => {
        values[i] = TimeUtil.toTimeStamp(v);
      });
      values.sort(function(v1, v2) {
        return v1 - v2;
      });
      result = values;
    } else {
      result = values;
    }
    return result;
  }
};
