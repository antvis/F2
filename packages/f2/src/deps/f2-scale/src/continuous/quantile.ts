import Quantize from './quantize';

class Quantile extends Quantize {
  public type = 'quantile';
  protected initCfg() {
    this.tickMethod = 'quantile';
    this.tickCount = 5;
    this.nice = true;
  }
}

export default Quantile;
