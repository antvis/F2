import { head, isNil, last } from '@antv/util';
import { ScaleConfig } from '../types';
import extended from '../util/extended';
import interval from '../util/interval';
import strictLimit from '../util/strict-limit';

/**
 * 计算线性的 ticks，使用 wilkinson extended 方法
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export default function linear(cfg: ScaleConfig): number[] {
  const { min, max, tickCount, nice, tickInterval, minLimit, maxLimit } = cfg;
  const ticks = extended(min, max, tickCount, nice).ticks;

  if (!isNil(minLimit) || !isNil(maxLimit)) {
    return strictLimit(cfg, head(ticks), last(ticks));
  }
  if (tickInterval) {
    return interval(min, max, tickInterval).ticks;
  }
  return ticks;
}
