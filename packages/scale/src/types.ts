export type ScaleType = 'base' | 'linear' | 'cat' | 'log' | 'pow' | 'identity' | 'time' | 'timeCat';

export type TickMethod = (ScaleConfig) => any[];

export interface Tick {
  /** 展示名 */
  text: string;
  /** 值域值 */
  value: number;
  /** 定义域值 */
  tickValue: string | number;
}

export type ScaleConfig = Partial<{
  /** 对应的字段id */
  field: string;
  /** 输入域、定义域 */
  values: any[];
  /** 定义域的最小值，d3为domain，ggplot2为limits，分类型下无效 */
  min: any;
  /** 定义域的最大值，分类型下无效 */
  max: any;
  /** 严格模式下的定义域最小值，设置后会强制 ticks 从最小值开始 */
  minLimit?: any;
  /** 严格模式下的定义域最大值，设置后会强制 ticks 已最大值结束 */
  maxLimit?: any;

  /** 数据字段的显示别名，scale内部不感知，外部注入 */
  alias: string;
  /** 输出域、值域，默认值为[0, 1] */
  range: number[];
  /** Log有效，底数 */
  base: number;
  /** Pow有效，指数 */
  exponent: number;

  // tick相关配置
  /** 自动调整min、max */
  nice: boolean;
  /** 用于指定tick，优先级最高 */
  ticks: any[];
  /** tick间隔，只对分类型和时间型适用，优先级高于tickCount */
  tickInterval: number;
  /** tick最小间隔，只对线型适用 */
  minTickInterval: number;
  /** tick个数，默认值为5 */
  tickCount: number;
  /** ticks最大值，默认值为10 */
  maxTickCount: number;
  /** tick格式化函数，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示 */
  formatter: (value: any, index?: number) => any;
  /** 计算 ticks 的算法 */
  tickMethod: string | TickMethod;
  /** 时间度量 time, timeCat 时有效 */
  mask?: string;
  /** 是否始终保留最后一个 tick */
  showLast?: boolean;
}>;
