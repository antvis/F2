import { ScaleConfig } from '../types';
import catTicks from './cat';
/**
 * 计算时间分类的 ticks, 保头，保尾
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export default function timeCat(cfg: ScaleConfig): any[] {
  // 默认保留最后一条
  const ticks = catTicks({ showLast: true, ...cfg });
  return ticks;
}
