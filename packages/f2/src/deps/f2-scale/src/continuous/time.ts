import { each, isDate, isNil, isNumber, isString } from '@antv/util';
import { timeFormat, toTimeStamp } from '../util/time';
import Linear from './linear';

/**
 * 时间度量
 * @class
 */
class Time extends Linear {
  public readonly type: string = 'time';
  public mask: string;

  /**
   * @override
   */
  public getText(value: string | number | Date, index?: number) {
    const numberValue = this.translate(value);
    const formatter = this.formatter;
    return formatter ? formatter(numberValue, index) : timeFormat(numberValue, this.mask);
  }
  /**
   * @override
   */
  public scale(value): number {
    let v = value;
    if (isString(v) || isDate(v)) {
      v = this.translate(v);
    }
    return super.scale(v);
  }
  /**
   * 将时间转换成数字
   * @override
   */
  public translate(v): number {
    return toTimeStamp(v);
  }
  protected initCfg() {
    this.tickMethod = 'time-pretty';
    this.mask = 'YYYY-MM-DD';
    this.tickCount = 7;
    this.nice = false;
  }

  protected setDomain() {
    const values = this.values;
    // 是否设置了 min, max，而不是直接取 this.min, this.max
    const minConfig = this.getConfig('min');
    const maxConfig = this.getConfig('max');
    // 如果设置了 min,max 则转换成时间戳
    if (!isNil(minConfig) || !isNumber(minConfig)) {
      this.min = this.translate(this.min);
    }
    if (!isNil(maxConfig) || !isNumber(maxConfig)) {
      this.max = this.translate(this.max);
    }
    // 没有设置 min, max 时
    if (values && values.length) {
      // 重新计算最大最小值
      const timeStamps = [];
      let min = Infinity; // 最小值
      let secondMin = min; // 次小值
      let max = 0;
      // 使用一个循环，计算min,max,secondMin
      each(values, (v) => {
        const timeStamp = toTimeStamp(v);
        if (isNaN(timeStamp)) {
          throw new TypeError(`Invalid Time: ${v} in time scale!`);
        }
        if (min > timeStamp) {
          secondMin = min;
          min = timeStamp;
        } else if (secondMin > timeStamp) {
          secondMin = timeStamp;
        }
        if (max < timeStamp) {
          max = timeStamp;
        }
        timeStamps.push(timeStamp);
      });
      // 存在多个值时，设置最小间距
      if (values.length > 1) {
        this.minTickInterval = secondMin - min;
      }
      if (isNil(minConfig)) {
        this.min = min;
      }
      if (isNil(maxConfig)) {
        this.max = max;
      }
    }
  }
}
export default Time;
