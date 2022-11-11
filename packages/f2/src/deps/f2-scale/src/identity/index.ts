import { has, isNumber } from '@antv/util';
import Base from '../base';
import { ScaleType } from '../types';

/**
 * identity scale原则上是定义域和值域一致，scale/invert方法也是一致的
 * 参考R的实现：https://github.com/r-lib/scales/blob/master/R/pal-identity.r
 * 参考d3的实现（做了下转型）：https://github.com/d3/d3-scale/blob/master/src/identity.js
 */
export default class Identity extends Base {
  public readonly type: ScaleType = 'identity';
  public readonly isIdentity: boolean = true;

  public calculateTicks() {
    return this.values;
  }

  public scale(value: any): number {
    // 如果传入的值不等于 identity 的值，则直接返回，用于一维图时的 dodge
    if (this.values[0] !== value && isNumber(value)) {
      return value;
    }
    return this.range[0];
  }

  public invert(value?: number): number {
    const range = this.range;
    if (value < range[0] || value > range[1]) {
      return NaN;
    }
    return this.values[0];
  }
}
