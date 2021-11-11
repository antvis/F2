import { jsx } from '../../jsx';
import { renderShape } from '../../base/diff';
import Component from '../../base/component';
import Chart from '../../chart';

interface LegendItem {
  /**
   * 标记颜色。
   */
  color: string;
  /**
   * 名称。
   */
  name: string;
  /**
   * 值。
   */
  value?: string | number;
  /**
   * 图例标记。
   */
  marker?: string;
}
export interface LegendProps {
  /**
   * 代表图例对应的数据字段名。
   */
  field?: string;
  /**
   * 图表。
   */
  readonly chart?: Chart;
  /**
   * 图例的显示位置。默认为 top。
   */
  position?: 'right' | 'left' | 'top' | 'bottom';
  /**
   * 回调函数，用于格式化图例每项的文本显示。
   */
  itemFormatter?: (value: string) => string;
  /**
   * 图例项列表。
   */
  items?: LegendItem[];
  /**
   * 图例样式。
   */
  style?: any;
  /**
   * 图例标记。
   */
  marker?: 'circle' | 'square';
}

export default View => {
  return class Legend extends Component<LegendProps> {
    maxItemWidth: number;

    getItems() {
      const { props } = this;
      const { chart } = props;
      return chart.getLegendItems();
    }

    getMaxItemWidth(legendShape) {
      let maxItemWidth = 0;
      (legendShape.get('children') || []).forEach(child => {
        const childWidth = child.getBBox().width;
        if (childWidth > maxItemWidth) {
          maxItemWidth = childWidth;
        }
      });
      return maxItemWidth;
    }

    willMount() {
      const { props } = this;
      const shape = renderShape(this, this.render(), false);
      const { height, width } = shape.get('attrs');

      const { position = 'top', chart } = props;
      const isVertical = position === 'left' || position === 'right';
      if (!isVertical) {
        chart.layoutCoord(position, { width, height });
        return;
      }
      const maxItemWidth = this.getMaxItemWidth(shape);
      this.maxItemWidth = maxItemWidth;
      shape.remove();
      chart.layoutCoord(position, { width: maxItemWidth, height });
    }

    render() {
      const { props, maxItemWidth, context } = this;
      const { width } = context;
      const items = props.items || this.getItems();

      return (
        <View {...props} items={items} maxItemWidth={maxItemWidth || width} />
      );
    }
  };
};
