import { jsx } from '../../jsx';
import { renderShape } from '../../base/diff';
import Component from '../../base/component';
import Chart from '../../chart';
import { isFunction } from '@antv/util';

type TriggerMap = {
  [triggerType: string]: (items: any[], records: any[], legend) => void;
};
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

  /**
   * 事件触发
   */
  triggerMap?: TriggerMap;
}

export default (View) => {
  return class Legend extends Component<LegendProps> {
    maxItemWidth: number;
    constructor(props) {
      super(props);
      this.state = {
        items: [],
      };
    }

    didMount() {
      this._initEvent();
    }

    _initItems() {
      const { items } = this.props;
      this.setState({
        items: items?.length ? items : this.getOriginItems(),
      });
    }

    _initEvent() {
      const { context, props } = this;
      const { canvas } = context;
      const { triggerMap, chart } = props;

      if (!triggerMap) return;

      Object.keys(triggerMap).forEach((type) => {
        canvas.on(type.toLowerCase(), (event) => {
          const { points } = event;
          const items = this.getOriginItems();
          const records = chart.getSnapRecords(points[0]);
          const cb = triggerMap[type];
          if (isFunction(cb)) {
            cb(items, records, this);
          }
        });
      });
    }

    getItems() {
      return this.state.items;
    }

    setItems(items) {
      this.setState({
        items,
      });
    }

    getOriginItems() {
      const { chart } = this.props;
      return chart.getLegendItems();
    }

    getMaxItemWidth(legendShape) {
      let maxItemWidth = 0;
      (legendShape.get('children') || []).forEach((child) => {
        const childWidth = child.getBBox().width;
        if (childWidth > maxItemWidth) {
          maxItemWidth = childWidth;
        }
      });
      return maxItemWidth;
    }

    willMount() {
      this._initItems();
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
      const items = this.getItems();

      return <View {...props} items={items} maxItemWidth={maxItemWidth || width} />;
    }
  };
};
