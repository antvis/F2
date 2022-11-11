import { ScaleConfig } from '../types';
import { calBase } from '../util/math';
import pretty from '../util/pretty';
/**
 * 计算 Pow 的 ticks
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export default function calculatePowTicks(cfg: ScaleConfig) {
  const { exponent, tickCount } = cfg;
  const max = Math.ceil(calBase(exponent, cfg.max));
  const min = Math.floor(calBase(exponent, cfg.min));
  const ticks = pretty(min, max, tickCount).ticks;
  return ticks.map((tick) => {
    const factor = tick >= 0 ? 1 : -1;
    return Math.pow(tick, exponent) * factor;
  });
}
