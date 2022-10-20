import { each, head, last } from '@antv/util';
import Continuous from './base';

/**
 * 分段度量
 */
class Quantize extends Continuous {
  public type = 'quantize';

  public invert(value): number {
    const ticks = this.ticks;
    const length = ticks.length;
    const percent = this.getInvertPercent(value);
    const minIndex = Math.floor(percent * (length - 1));
    // 最后一个
    if (minIndex >= length - 1) {
      return last(ticks);
    }
    // 超出左边界， 则取第一个
    if (minIndex < 0) {
      return head(ticks);
    }
    const minTick = ticks[minIndex];
    const nextTick = ticks[minIndex + 1];
    // 比当前值小的 tick 在度量上的占比
    const minIndexPercent = minIndex / (length - 1);
    const maxIndexPercent =  (minIndex + 1) / (length - 1);
    return minTick + (percent - minIndexPercent) / (maxIndexPercent - minIndexPercent) * (nextTick - minTick);
  }

  protected initCfg() {
    this.tickMethod = 'r-pretty';
    this.tickCount = 5;
    this.nice = true;
  }

  protected calculateTicks(): any[] {
    const ticks = super.calculateTicks();
    if (!this.nice) { // 如果 nice = false ,补充 min, max
      if (last(ticks) !== this.max) {
        ticks.push(this.max);
      }
      if (head(ticks) !== this.min) {
        ticks.unshift(this.min);
      }
    }
    return ticks;
  }

  // 计算当前值在刻度中的占比
  protected getScalePercent(value) {
    const ticks = this.ticks;
    // 超出左边界
    if (value < head(ticks)) {
      return 0;
    }
    // 超出右边界
    if (value > last(ticks)) {
      return 1;
    }
    let minIndex = 0;
    each(ticks, (tick, index) => {
      if (value >= tick) {
        minIndex = index;
      } else {
        return false;
      }
    });
    return minIndex / (ticks.length - 1);
  }
}

export default Quantize;
