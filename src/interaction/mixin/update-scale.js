const Helper = require('../helper');
const Util = require('../../util/common');
module.exports = {
  updateLinearScale(field, min, max) {
    const chart = this.chart;
    const colDef = Helper.getColDef(chart, field);
    chart.scale(field, Util.mix({}, colDef, {
      min,
      max,
      nice: false
    }));
  },
  updateCatScale(field, newValues, ticks, values, minIndex, maxIndex) {
    const chart = this.chart;
    const colDef = Helper.getColDef(chart, field);
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
        const currentIndex = values.indexOf(value); // 在完整数据集中的索引值
        if (currentIndex >= 0 && currentIndex < minIndex) { // 不在范围内，左侧数据
          max = rangeMin > 0 ? -0.1 : rangeMin - 0.1;
          min = max - range;
          percent = currentIndex / minIndex;
        } else if (currentIndex >= 0 && currentIndex > maxIndex) { // 不在范围内，右侧数据
          min = rangeMax < 1 ? 1.1 : rangeMax + 0.1;
          max = min + range;
          percent = (currentIndex - maxIndex - 1) / (values.length - 1 - maxIndex);
        } else { // 数值在当前 this.values 范围内
          const index = this.translate(value);

          if (this.values.length === 1) {
            percent = index;
          } else {
            percent = (index) / (this.values.length - 1);
          }

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
