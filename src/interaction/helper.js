const { Rect } = require('../graphic/shape');

module.exports = {
  directionEnabled: (mode, dir) => {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  },
  isReachMax(rangeMax, scale, flag) {
    const type = scale.type;

    let value;
    if (type === 'timeCat') {
      value = scale.values[scale.values.length - 1];
    } else {
      value = scale.max;
    }

    if (rangeMax && rangeMax[flag]) {
      let max = rangeMax[flag];
      if (type === 'timeCat') {
        max = scale._toTimeStamp(max); // 转换为时间戳
      }
      if (max <= value) {
        return true;
      }
    }
    return false;
  },
  isReachMin(rangeMin, scale, flag) {
    const type = scale.type;
    let value;
    if (type === 'timeCat') {
      value = scale.values[0];
    } else {
      value = scale.min;
    }

    if (rangeMin && rangeMin[flag]) {
      let min = rangeMin[flag];
      if (type === 'timeCat') {
        min = scale._toTimeStamp(min); // 转换为时间戳
      }
      if (min >= value) {
        return true;
      }
    }
    return false;
  },
  limitRangeMin(rangeMin, scale, flag, newMin) {
    const type = scale.type;
    if (rangeMin && rangeMin[flag]) {
      let min = rangeMin[flag];
      if (type === 'timeCat') {
        min = scale._toTimeStamp(min); // 转换为时间戳
      }
      if (min >= newMin) {
        newMin = min;
      }
    }
    return newMin;
  },
  limitRangeMax(rangeMax, scale, flag, newMax) {
    const type = scale.type;
    if (rangeMax && rangeMax[flag]) {
      let max = rangeMax[flag];
      if (type === 'timeCat') {
        max = scale._toTimeStamp(max); // 转换为时间戳
      }
      if (max <= newMax) {
        newMax = max;
      }
    }
    return newMax;
  },
  createClip(chart) {
    const middlePlot = chart.get('middlePlot');
    const coord = chart.get('coord');
    const rect = new Rect({
      attrs: {
        x: coord.start.x,
        y: coord.end.y,
        width: coord.end.x - coord.start.x,
        height: coord.start.y - coord.end.y,
        fillOpacity: 0
      }
    });
    middlePlot.attr('clip', rect);
  }
};
