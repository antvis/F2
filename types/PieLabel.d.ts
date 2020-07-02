import { CanvasProps } from './CanvasProps';
import { DataRecord } from './Data';
import { Chart } from './Chart';

/**
 * 绘制饼图标签文本的方法。
 */
export type PieLabelText<TRecord extends DataRecord> = (
  data: TRecord,
  color: string,
) => CanvasProps<{
  text: string;
}>;

/**
 * 绘制饼图标签的参数。
 */
export interface PieLabelParams<TRecord extends DataRecord> {
  /**
   * 锚点的偏移量。默认为 5。
   */
  anchorOffset?: number;

  /**
   * 拐点的偏移量。默认为 15。
   */
  inflectionOffset?: number;

  /**
   * 文本距离画布左右两边的距离。默认为 20。
   */
  sidePadding?: number;

  /**
   * 文本的最大行高。默认为 32。
   */
  lineHeight?: number;

  /**
   * 发生调整时的偏移量。默认为 15。
   */
  adjustOffset?: number;

  /**
   * 是否将重叠的文本忽略。默认为 false，即展示全部文本。
   */
  skipOverlapLabels?: boolean;

  /**
   * 连接线的样式，颜色默认同对应饼图颜色相同。
   */
  lineStyle?: CanvasProps;

  /**
   * 锚点的样式，颜色默认同对应饼图的样色相同。
   */
  anchorStyle?: CanvasProps;

  /**
   * 配置 label1 文本内容及其样式，是个回调函数，返回值必须是一个对象。
   */
  label1?: PieLabelText<TRecord>;

  /**
   * 配置 label2 文本内容及其样式，是个回调函数，返回值必须是一个对象。
   */
  label2?: PieLabelText<TRecord>;

  /**
   * 点击行为定义函数。通过 ev 参数我们可以获取被点击图形的原始数据：ev.data，点击的画布坐标：ev.x、ev.y 等。
   */
  onClick?: (ev: {
    chart: Chart<TRecord>;
    data: TRecord;
    x: number;
    y: number;
  }) => any;

  /**
   * 配置点击行为触发的事件类型。默认为 touchstart。
   */
  triggerOn?: string;

  /**
   * 当有图形被选中的时候，是否激活图形。默认为 false，即不激活。
   */
  activeShape?: boolean;

  /**
   * 设置被激活图形的显示样式。默认为 `{ offset: 1, appendRadius: 8, fillOpacity: 0.5 }`。
   */
  activeStyle?: CanvasProps<{
    offset?: number;
    appendRadius?: number;
  }>;
}
