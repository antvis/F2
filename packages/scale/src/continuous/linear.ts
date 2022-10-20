import Continuous from './base';

/**
 * 线性度量
 * @class
 */
export default class Linear extends Continuous {
  public minTickInterval: number;
  public type = 'linear';
  public readonly isLinear: boolean = true;

  public invert(value: number): any {
    const percent = this.getInvertPercent(value);
    return this.min + percent * (this.max - this.min);
  }

  protected initCfg() {
    this.tickMethod = 'wilkinson-extended';
    this.nice = false;
  }
}
