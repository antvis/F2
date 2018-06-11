/**
 * @fileOverview 时间数据作为分类类型
 * @author dxq613@gmail.com
 */
const Base = require('./base');
const Category = require('./category');
const Util = require('../util/common');
const fecha = require('fecha');
const catAuto = require('./auto/cat');

/**
 * 度量的构造函数
 * @class Scale.TimeCategory
 */
class TimeCategory extends Category {
  _initDefaultCfg() {
    this.type = 'timeCat';
    /**
     * 是否需要排序，默认进行排序
     * @type {Boolean}
     */
    this.sortable = true;
    this.tickCount = 5;
    /**
     * 时间格式化
     * @type {String}
     */
    this.mask = 'YYYY-MM-DD';
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
    /**
     * 是否分类度量
     * @type {Boolean}
     */
    this.isCategory = true;
  }

  init() {
    const self = this;
    const values = this.values;
    // 针对时间分类类型，会将时间统一转换为时间戳
    Util.each(values, function(v, i) {
      values[i] = self._toTimeStamp(v);
    });
    if (this.sortable) { // 允许排序
      values.sort(function(v1, v2) {
        return v1 - v2;
      });
    }

    if (!self.ticks) {
      self.ticks = this.calculateTicks(false);
    }
  }

  /**
   * 计算 ticks
   * @return {array} 返回 ticks 数组
   */
  calculateTicks(/* formated */) {
    const self = this;
    const count = self.tickCount;
    const temp = catAuto({
      maxCount: count,
      data: self.values
    });

    const ticks = temp.ticks;
    // if (formated) {
    //   Util.each(ticks, function(value, index) {
    //     ticks[index] = fecha.format(value, self.mask);
    //   });
    // }
    return ticks;
  }

  /**
   * @override
   */
  translate(value) {
    value = this._toTimeStamp(value);
    let index = this.values.indexOf(value);

    if (index === -1) {
      if (Util.isNumber(value) && value < this.values.length) {
        index = value;
      } else {
        index = NaN;
      }
    }
    return index;
  }

  /**
   * @override
   */
  scale(value) {
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    const index = this.translate(value);
    let percent;

    if (this.values.length === 1) {
      percent = index;
    } else if (index > -1) {
      percent = (index) / (this.values.length - 1);
    } else {
      percent = 0;
    }

    return rangeMin + percent * (rangeMax - rangeMin);
  }

  /**
   * @override
   */
  getText(value) {
    let result = '';
    const index = this.translate(value);
    if (index > -1) {
      result = this.values[index];
    } else {
      result = value;
    }

    const formatter = this.formatter;
    result = parseInt(result, 10);
    result = formatter ? formatter(result) : fecha.format(result, this.mask);
    return result;
  }

  /**
   * @override
   */
  getTicks() {
    const self = this;
    const ticks = this.ticks;
    const rst = [];
    Util.each(ticks, function(tick) {
      let obj;
      if (Util.isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: Util.isString(tick) ? tick : self.getText(tick),
          value: self.scale(tick)
        };
      }
      rst.push(obj);
    });
    return rst;
  }

  // 将时间转换为时间戳
  _toTimeStamp(value) {
    if (Util.isString(value)) {
      if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        value = new Date(value.replace(/-/ig, '/')).getTime();
      }
    }
    if (Util.isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
}

Base.TimeCat = TimeCategory;
module.exports = TimeCategory;
