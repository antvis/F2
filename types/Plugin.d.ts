import { Chart } from './Chart';

/**
 * 插件可用的生命周期。
 */
export type PluginLifecycle =
  | 'init'
  | 'beforeGeomDraw'
  | 'afterGeomDraw'
  | 'beforeCanvasDraw'
  | 'clear'
  | 'clearInner'
  | 'repaint';

/**
 * 插件。
 */
export type Plugin = Partial<Record<PluginLifecycle, (chart: Chart) => void>>;
