import { indexOf, isNil, isNumber } from '@antv/util';
import Base from '../base';

/**
 * 分类度量
 * @class
 */
class Category extends Base {
  public readonly type: string = 'cat';
  public readonly isCategory: boolean = true;

  // 用于缓存 translate 函数
  private translateIndexMap;

  private buildIndexMap() {
    if (!this.translateIndexMap) {
      this.translateIndexMap = new Map();
      // 重新构建缓存
      for (let i = 0; i < this.values.length; i ++) {
        this.translateIndexMap.set(this.values[i], i);
      }
    }
  }

  public translate(value: any): number {
    // 按需构建 map
    this.buildIndexMap();
    // 找得到
    let idx = this.translateIndexMap.get(value);
    
    if (idx === undefined) {
      idx = isNumber(value) ? value : NaN;
    }
    return idx;
  }

  public scale(value: any): number {
    const order = this.translate(value);
    // 分类数据允许 0.5 范围内调整
    // if (order < this.min - 0.5 || order > this.max + 0.5) {
    //   return NaN;
    // }
    const percent = this.calcPercent(order, this.min, this.max);
    return this.calcValue(percent, this.rangeMin(), this.rangeMax());
  }

  public invert(scaledValue: number) {
    const domainRange = this.max - this.min;
    const percent = this.calcPercent(scaledValue, this.rangeMin(), this.rangeMax());
    const idx = Math.round(domainRange * percent) + this.min;
    if (idx < this.min || idx > this.max) {
      return NaN;
    }
    return this.values[idx];
  }

  public getText(value: any, ...args: any[]): string {
    let v = value;
    // value为index
    if (isNumber(value) && !this.values.includes(value)) {
      v = this.values[v];
    }
    return super.getText(v, ...args);
  }
  // 复写属性
  protected initCfg() {
    this.tickMethod = 'cat';
  }
  // 设置 min, max
  protected setDomain() {
    // 用户有可能设置 min
    if (isNil(this.getConfig('min'))) {
      this.min = 0;
    }
    if (isNil(this.getConfig('max'))) {
      const size = this.values.length;
      this.max = size > 1 ? size - 1 : size;
    }

    // scale.init 的时候清除缓存
    if (this.translateIndexMap) {
      this.translateIndexMap = undefined;
    }
  }
}

export default Category;
