/**
 * @fileOverview The measurement of linear data scale function
 * @author dxq613@gmail.com
 */
const Base = require('./base');
const Util = require('../util/common');
const numberAuto = require('./auto/number');

/**
 * 线性度量
 * @class Scale.Linear
 */
class Linear extends Base {

  _initDefaultCfg() {
    this.type = 'linear';
    this.isLinear = true;
    /**
      * min value of the scale
      * @type {Number}
      * @default null
      */
    this.min = null;
    /**
      * max value of the scale
      * @type {Number}
      * @default null
      */
    this.max = null;
    /**
      * 是否为了用户习惯，优化min,max和ticks，如果进行优化，则会根据生成的ticks调整min,max，否则舍弃(min,max)范围之外的ticks
      * @type {Boolean}
      * @default false
      */
    this.nice = true;
    /**
      * 自动生成标记时的个数
      * @type {Number}
      * @default null
      */
    this.tickCount = null;
    /**
      * 坐标轴点之间的间距，指的是真实数据的差值
      * @type {Number}
      * @default null
      */
    this.tickInterval = null;
    /**
     * 格式化函数,输出文本或者tick时的格式化函数
     * @type {Function}
     */
    this.formatter = null;
    /**
     * 输出的值域
     * @type {Array}
     */
    this.range = [ 0, 1 ];
    /**
     * 度量的标记
     * @type {Array}
     */
    this.ticks = null;
    /**
     * 参与度量计算的值，可选项
     * @type {Array}
     */
    this.values = [];
  }

  /**
   * @protected
   * @override
   */
  init() {
    const self = this;
    if (!self.ticks) {
      self.min = self.translate(self.min);
      self.max = self.translate(self.max);
      self.initTicks();
    } else {
      const ticks = self.ticks;
      const firstValue = self.translate(ticks[0]);
      const lastValue = self.translate(ticks[ticks.length - 1]);
      if (Util.isNil(self.min) || self.min > firstValue) {
        self.min = firstValue;
      }
      if (Util.isNil(self.max) || self.max < lastValue) {
        self.max = lastValue;
      }
    }
  }

  /**
   * 计算坐标点
   * @protected
   * @return {Array} 计算完成的坐标点
   */
  calculateTicks() {
    const self = this;
    const min = self.min;
    const max = self.max;
    const count = self.tickCount;
    if (count === 1) {
      throw new Error('linear scale\'tickCount should not be 1');
    }
    const interval = self.tickInterval;
    if (max < min) {
      throw new Error(`max: ${max} should not be less than min: ${min}`);
    }
    const tmp = numberAuto({
      min,
      max,
      minCount: count,
      maxCount: count,
      interval
    });
    return tmp.ticks;
  }

  // 初始化ticks
  initTicks() {
    const self = this;
    const calTicks = self.calculateTicks();
    if (self.nice) { // 如果需要优化显示的tick
      self.ticks = calTicks;
      self.min = calTicks[0];
      self.max = calTicks[calTicks.length - 1];
    } else {
      const ticks = [];
      Util.each(calTicks, function(tick) {
        if (tick >= self.min && tick <= self.max) {
          ticks.push(tick);
        }
      });
      self.ticks = ticks;
    }
  }

  /**
   * @override
   */
  scale(value) {
    if (value === null || value === undefined) {
      return NaN;
    }
    const max = this.max;
    const min = this.min;
    if (max === min) {
      return 0;
    }

    const percent = (value - min) / (max - min);
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    return rangeMin + percent * (rangeMax - rangeMin);
  }

  /**
   * @override
   */
  invert(value) {
    const percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
    return this.min + percent * (this.max - this.min);
  }
}

Base.Linear = Linear;
module.exports = Linear;
