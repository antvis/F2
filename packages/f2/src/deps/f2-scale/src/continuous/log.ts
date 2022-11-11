import { getLogPositiveMin, log } from '../util/math';
import Continuous from './base';
/**
 * Log 度量，处理非均匀分布
 */
class Log extends Continuous {
  public readonly type: string = 'log';
  public base: number;
  // 用于解决 min: 0 的场景下的问题
  private positiveMin: number;

  /**
   * @override
   */
  public invert(value: number) {
    const base = this.base;
    const max = log(base, this.max);
    const rangeMin = this.rangeMin();
    const range = this.rangeMax() - rangeMin;
    let min;
    const positiveMin = this.positiveMin;
    if (positiveMin) {
      if (value === 0) {
        return 0;
      }
      min = log(base, positiveMin / base);
      const appendPercent = (1 / (max - min)) * range; // 0 到 positiveMin的占比
      if (value < appendPercent) {
        // 落到 0 - positiveMin 之间
        return (value / appendPercent) * positiveMin;
      }
    } else {
      min = log(base, this.min);
    }
    const percent = (value - rangeMin) / range;
    const tmp = percent * (max - min) + min;
    return Math.pow(base, tmp);
  }

  protected initCfg() {
    this.tickMethod = 'log';
    this.base = 10;
    this.tickCount = 6;
    this.nice = true;
  }

  // 设置
  protected setDomain() {
    super.setDomain();
    const min = this.min;
    if (min < 0) {
      throw new Error('When you use log scale, the minimum value must be greater than zero!');
    }
    if (min === 0) {
      this.positiveMin = getLogPositiveMin(this.values, this.base, this.max);
    }
  }

  // 根据当前值获取占比
  protected getScalePercent(value: number) {
    const max = this.max;
    let min = this.min;
    if (max === min) {
      return 0;
    }
    // 如果值小于等于0，则按照0处理
    if (value <= 0) {
      return 0;
    }
    const base = this.base;
    const positiveMin = this.positiveMin;
    // 如果min == 0, 则根据比0大的最小值，计算比例关系。这个最小值作为坐标轴上的第二个tick，第一个是0但是不显示
    if (positiveMin) {
      min = (positiveMin * 1) / base;
    }
    let percent;
    // 如果数值小于次小值，那么就计算 value / 次小值 占整体的比例
    if (value < positiveMin) {
      percent = value / positiveMin / (log(base, max) - log(base, min));
    } else {
      percent = (log(base, value) - log(base, min)) / (log(base, max) - log(base, min));
    }
    return percent;
  }
}

export default Log;
