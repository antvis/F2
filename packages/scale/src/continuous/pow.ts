import { calBase } from '../util/math';
import Continuous from './base';

/**
 * Pow 度量，处理非均匀分布
 */
class Pow extends Continuous {
  public readonly type: string = 'pow';
  /**
   * 指数
   */
  public exponent: number;

  /**
   * @override
   */
  public invert(value: number) {
    const percent = this.getInvertPercent(value);
    const exponent = this.exponent;
    const max = calBase(exponent, this.max);
    const min = calBase(exponent, this.min);
    const tmp = percent * (max - min) + min;
    const factor = tmp >= 0 ? 1 : -1;
    return Math.pow(tmp, exponent) * factor;
  }

  protected initCfg() {
    this.tickMethod = 'pow';
    this.exponent = 2;
    this.tickCount = 5;
    this.nice = true;
  }

  // 获取度量计算时，value占的定义域百分比
  protected getScalePercent(value: number) {
    const max = this.max;
    const min = this.min;
    if (max === min) {
      return 0;
    }
    const exponent = this.exponent;
    const percent =
      (calBase(exponent, value) - calBase(exponent, min)) / (calBase(exponent, max) - calBase(exponent, min));
    return percent;
  }
}

export default Pow;
