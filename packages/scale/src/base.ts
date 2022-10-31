import { assign, isEmpty, isFunction, isNil, isNumber, isObject, isString, map } from '@antv/util';
import { getTickMethod } from './tick-method/register';
import { ScaleConfig, Tick } from './types';
export default abstract class Scale {
  /**
   * 度量的类型
   */
  public type: string = 'base';
  /**
   * 是否分类类型的度量
   */
  public isCategory?: boolean = false;
  /**
   * 是否线性度量，有linear, time 度量
   */
  public isLinear?: boolean = false;
  /**
   * 是否连续类型的度量，linear,time,log, pow, quantile, quantize 都支持
   */
  public isContinuous?: boolean = false;
  /**
   * 是否是常量的度量，传入和传出一致
   */
  public isIdentity: boolean = false;

  public field?: ScaleConfig['field'];
  public alias?: ScaleConfig['alias'];
  public values: ScaleConfig['values'] = [];
  public min?: ScaleConfig['min'];
  public max?: ScaleConfig['max'];
  public minLimit?: ScaleConfig['minLimit'];
  public maxLimit?: ScaleConfig['maxLimit'];
  public range: ScaleConfig['range'] = [0, 1];
  public ticks: ScaleConfig['ticks'] = [];
  public tickCount: ScaleConfig['tickCount'];
  public tickInterval: ScaleConfig['tickInterval'];
  public formatter?: ScaleConfig['formatter'];
  public tickMethod?: ScaleConfig['tickMethod'];
  protected __cfg__: ScaleConfig; // 缓存的旧配置, 用于 clone

  constructor(cfg: ScaleConfig) {
    this.__cfg__ = cfg;
    this.initCfg();
    this.init();
  }

  // 对于原始值的必要转换，如分类、时间字段需转换成数值，用transform/map命名可能更好
  public translate(v: any) {
    return v;
  }

  /** 将定义域转换为值域 */
  public abstract scale(value: any): number;

  /** 将值域转换为定义域 */
  public abstract invert(scaled: number): any;

  /** 重新初始化 */
  public change(cfg: ScaleConfig) {
    // 覆盖配置项，而不替代
    assign(this.__cfg__, cfg);
    this.init();
  }

  public clone(): Scale {
    return this.constructor(this.__cfg__);
  }

  /** 获取坐标轴需要的ticks */
  public getTicks(): Tick[] {
    return map(this.ticks, (tick: any, idx: number) => {
      if (isObject(tick)) {
        // 仅当符合Tick类型时才有意义
        return tick as Tick;
      }
      return {
        text: this.getText(tick, idx),
        tickValue: tick, // 原始value
        value: this.scale(tick), // scaled
      };
    });
  }

  /** 获取Tick的格式化结果 */
  public getText(value: any, key?: number): string {
    const formatter = this.formatter;
    const res = formatter ? formatter(value, key) : value;
    if (isNil(res) || !isFunction(res.toString)) {
      return '';
    }
    return res.toString();
  }

  // 获取配置项中的值，当前 scale 上的值可能会被修改
  protected getConfig(key) {
    return this.__cfg__[key];
  }

  // scale初始化
  protected init(): void {
    assign(this, this.__cfg__);
    this.setDomain();
    if (isEmpty(this.getConfig('ticks'))) {
      this.ticks = this.calculateTicks();
    }
  }

  // 子类上覆盖某些属性，不能直接在类上声明，否则会被覆盖
  protected initCfg() {}

  protected setDomain(): void {}

  protected calculateTicks(): any[] {
    const tickMethod = this.tickMethod;
    let ticks = [];
    if (isString(tickMethod)) {
      const method = getTickMethod(tickMethod);
      if (!method) {
        throw new Error('There is no method to to calculate ticks!');
      }
      ticks = method(this);
    } else if (isFunction(tickMethod)) {
      ticks = tickMethod(this);
    }
    return ticks;
  }

  // range 的最小值
  protected rangeMin() {
    return this.range[0];
  }

  // range 的最大值
  protected rangeMax() {
    return this.range[1];
  }

  /** 定义域转 0~1 */
  protected calcPercent(value: any, min: number, max: number): number {
    if (isNumber(value)) {
      return (value - min) / (max - min);
    }
    return NaN;
  }

  /** 0~1转定义域 */
  protected calcValue(percent: number, min: number, max: number): number {
    return min + percent * (max - min);
  }
}
