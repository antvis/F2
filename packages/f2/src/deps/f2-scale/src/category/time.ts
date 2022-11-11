import { each, isNumber } from '@antv/util';
import { timeFormat, toTimeStamp } from '../util/time';
import Category from './base';

/**
 * 时间分类度量
 * @class
 */
class TimeCat extends Category {
  public readonly type: string = 'timeCat';
  public mask;
  /**
   * @override
   */
  public translate(value) {
    value = toTimeStamp(value);
    let index = this.values.indexOf(value);
    if (index === -1) {
      if (isNumber(value) && value < this.values.length) {
        index = value;
      } else {
        index = NaN;
      }
    }
    return index;
  }

  /**
   * 由于时间类型数据需要转换一下，所以复写 getText
   * @override
   */
  public getText(value: string | number, tickIndex?: number) {
    const index = this.translate(value);
    if (index > -1) {
      let result = this.values[index];
      const formatter = this.formatter;
      result = formatter ? formatter(result, tickIndex) : timeFormat(result, this.mask);
      return result;
    }
    return value;
  }
  protected initCfg() {
    this.tickMethod = 'time-cat';
    this.mask = 'YYYY-MM-DD';
    this.tickCount = 7; // 一般时间数据会显示 7， 14， 30 天的数字
  }

  protected setDomain() {
    const values = this.values;
    // 针对时间分类类型，会将时间统一转换为时间戳
    each(values, (v, i) => {
      values[i] = toTimeStamp(v);
    });
    values.sort((v1, v2) => {
      return v1 - v2;
    });
    super.setDomain();
  }
}

export default TimeCat;
