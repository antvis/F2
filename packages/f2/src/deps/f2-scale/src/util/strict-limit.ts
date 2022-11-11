import { isNil } from '@antv/util';
import { ScaleConfig } from '../types';

/**
 * 按照给定的 minLimit/maxLimit/tickCount 均匀计算出刻度 ticks
 *
 * @param cfg Scale 配置项
 * @return ticks
 */
export default function strictLimit(cfg: ScaleConfig, defaultMin?: number, defaultMax?: number): number[] {
  const { minLimit, maxLimit, min, max, tickCount = 5 } = cfg;
  let tickMin = isNil(minLimit) ? (isNil(defaultMin) ? min : defaultMin) : minLimit;
  let tickMax = isNil(maxLimit) ? (isNil(defaultMax) ? max : defaultMax) : maxLimit;

  if (tickMin > tickMax) {
    [tickMax, tickMin] = [tickMin, tickMax];
  }

  if (tickCount <= 2) {
    return [tickMin, tickMax];
  }

  const step = (tickMax - tickMin) / (tickCount - 1);
  const ticks: number[] = [];

  for (let i = 0; i < tickCount; i++) {
    ticks.push(tickMin + step * i);
  }

  return ticks;
}
