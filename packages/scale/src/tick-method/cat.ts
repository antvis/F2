import { filter, isNil, isNumber, last } from '@antv/util';
import { ScaleConfig } from '../types';

/**
 * 计算分类 ticks
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export default function calculateCatTicks(cfg: ScaleConfig): any[] {
  const { values, tickInterval, tickCount, showLast } = cfg;

  if (isNumber(tickInterval)) {
    const ticks = filter(values, (__: any, i: number) => i % tickInterval === 0);
    const lastValue = last(values);
    if (showLast && last(ticks) !== lastValue) {
      ticks.push(lastValue);
    }
    return ticks;
  }

  const len = values.length;
  let { min, max } = cfg;
  if (isNil(min)) {
    min = 0;
  }
  if (isNil(max)) {
    max = values.length - 1;
  }

  if (!isNumber(tickCount) || tickCount >= len) return values.slice(min, max + 1);
  if (tickCount <= 0 || max <= 0) return [];

  const interval = tickCount === 1 ? len : Math.floor(len / (tickCount - 1));
  const ticks = [];

  let idx = min;
  for (let i = 0; i < tickCount; i++) {
    if (idx >= max) break;

    idx = Math.min(min + i * interval, max);
    if (i === tickCount - 1 && showLast) ticks.push(values[max]);
    else ticks.push(values[idx]);
  }
  return ticks;
}
