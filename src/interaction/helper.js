const TimeUtil = require('@antv/scale/lib/time-util');
const Util = require('../util/common');

module.exports = {
  directionEnabled(mode, dir) {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  },
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
  },
  updateCatScale(chart, field, newValues, ticks, values, minIndex, maxIndex) {
    const colDef = this.getColDef(chart, field);
    chart.scale(field, Util.mix({}, colDef, {
      values: newValues,
      ticks,
      scale(value) {
        if (this.type === 'timeCat') {
          value = this._toTimeStamp(value);
        }
        const rangeMin = this.rangeMin();
        const rangeMax = this.rangeMax();
        const range = rangeMax - rangeMin;
        let min;
        let max;
        let percent;
        const currentIndex = values.indexOf(value);
        if (currentIndex < minIndex) {
          min = (rangeMin - range) * 5;
          max = rangeMin;
          percent = currentIndex / minIndex;
        } else if (currentIndex > maxIndex) {
          min = rangeMax;
          max = (rangeMax + range) * 5;
          percent = (currentIndex - maxIndex - 1) / (values.length - 1 - maxIndex);
        } else {
          const index = this.translate(value);
          percent = (index) / (this.values.length - 1);
          min = rangeMin;
          max = rangeMax;
        }
        return min + percent * (max - min);
      },
      getTicks() {
        const self = this;
        const ticks = this.ticks;
        const rst = [];
        Util.each(ticks, tick => {
          let obj;
          if (Util.isObject(tick)) {
            obj = tick;
          } else {
            let value = self.scale(tick);
            value = value >= 0 && value <= 1 ? value : NaN;

            obj = {
              text: Util.isString(tick) ? tick : self.getText(tick),
              value,
              tickValue: tick // 用于坐标轴上文本动画时确定前后帧的对应关系
            };
          }
          rst.push(obj);
        });
        return rst;
      }
    }));
  }
};
