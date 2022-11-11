import { ScaleConfig } from '../types';
import { getTickInterval } from '../util/time';

export default function calculateTimeTicks(cfg: ScaleConfig): number[] {
  const { min, max, minTickInterval } = cfg;
  let tickInterval = cfg.tickInterval;
  let tickCount = cfg.tickCount;
  // 指定 tickInterval 后 tickCount 不生效，需要重新计算
  if (tickInterval) {
    tickCount = Math.ceil((max - min) / tickInterval);
  } else {
    tickInterval = getTickInterval(min, max, tickCount)[1];
    const count = (max - min) / tickInterval;
    const ratio = count / tickCount;
    if (ratio > 1) {
      tickInterval = tickInterval * Math.ceil(ratio);
    }
    // 如果设置了最小间距，则使用最小间距
    if (minTickInterval && tickInterval < minTickInterval) {
      tickInterval = minTickInterval;
    }
  }

  tickInterval = Math.max(Math.floor((max - min) / (2 ** 12 - 1)), tickInterval);
  const ticks = [];
  for (let i = min; i < max + tickInterval; i += tickInterval) {
    ticks.push(i);
  }
  return ticks;
}
