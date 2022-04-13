import { jsx } from '../../jsx';
import { renderShape } from '../../base/diff';
import Component from '../../base/component';
import Chart from '../../chart';
import { find } from '@antv/util';
import { getElementsByClassName, isInBBox } from '../../util';
import { Style, TextAttrs } from '../../types';

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
   * 图例宽度
   */
  width?: number | string;
  /**
   * 图例高度
   */
  height?: number | string;
  /**
   * legend 和图表内容的间距
   */
  margin?: number | string;
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
  style?: Style;
  /**
   * 图例标记。
   */
  marker?: 'circle' | 'square';
  /**
   * 用于设置图例项的文本样式
   */
  nameStyle?: TextAttrs;
  /**
   * 用于设置图例项的文本样式
   */
  valueStyle?: TextAttrs;
  /**
   * 是否可点击
   */
  clickable?: boolean;
}

export default (View) => {
  return class Legend extends Component<LegendProps> {
    style: Style;
    constructor(props) {
      super(props);
      this.state = {
        filtered: {},
        items: [],
      };
    }

    getOriginItems() {
      const { chart } = this.props;
      return chart.getLegendItems();
    }

    getItems() {
      const { props, state } = this;
      const { filtered } = state;
      const renderItems = props.items?.length ? props.items : this.getOriginItems();
      if (!renderItems) return null;
      return renderItems.map((item) => {
        const { tickValue } = item;
        return {
          ...item,
          filtered: filtered[tickValue],
        };
      });
    }

    setItems(items) {
      this.setState({
        items,
      });
    }

    getMaxItemBox(legendShape) {
      let maxItemWidth = 0;
      let maxItemHeight = 0;
      (legendShape.get('children') || []).forEach((child) => {
        const { width, height } = child.get('attrs');
        maxItemWidth = Math.max(maxItemWidth, width);
        maxItemHeight = Math.max(maxItemHeight, height);
      });
      return {
        width: maxItemWidth,
        height: maxItemHeight,
      };
    }

    // 计算 legend 的位置
    _init() {
      const { props, context } = this;
      const {
        // @ts-ignore
        layout: parentLayout,
        width: customWidth,
        height: customHeight,
        position = 'top',
      } = props;
      const items = this.getItems();
      if (!items || !items.length) return;
      const { left, top, right, bottom, width: layoutWidth, height: layoutHeight } = parentLayout;
      const width = context.px2hd(customWidth) || layoutWidth;
      const shape = renderShape(this, this.render(), false);
      const { width: itemMaxWidth, height: itemMaxHeight } = this.getMaxItemBox(shape);
      // 每行最多的个数
      const lineMaxCount = Math.floor(width / itemMaxWidth);
      const itemCount = items.length;
      // legend item 的行数
      const lineCount = Math.ceil(itemCount / lineMaxCount);
      const itemWidth = width / lineMaxCount;
      const autoHeight = itemMaxHeight * lineCount;

      const style: Style = {
        left,
        top,
        width,
        // height 默认自适应
        height: undefined,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
      };

      // 如果只有一行，2端对齐
      if (lineCount === 1) {
        style.justifyContent = 'space-between';
      }

      if (position === 'top') {
        style.height = customHeight ? customHeight : autoHeight;
      }

      if (position === 'left') {
        style.flexDirection = 'column';
        style.justifyContent = 'center';
        style.width = itemMaxWidth;
        style.height = customHeight ? customHeight : layoutHeight;
      }

      if (position === 'right') {
        style.flexDirection = 'column';
        style.alignItems = 'flex-start';
        style.justifyContent = 'center';
        style.width = itemMaxWidth;
        style.height = customHeight ? customHeight : layoutHeight;
        style.left = right - itemMaxWidth;
      }

      if (position === 'bottom') {
        style.top = bottom - autoHeight;
        style.height = customHeight ? customHeight : autoHeight;
      }

      this.setState({
        items,
        itemWidth,
        style,
      });

      this.style = style;

      shape.remove();
    }

    updateCoord() {
      const { context, props, style } = this;
      const { position = 'top', margin = '30px', chart } = props;
      const { width, height } = style;
      const marginNumber = context.px2hd(margin);

      chart.updateCoordFor(this, {
        position,
        width: width + marginNumber,
        height: height + marginNumber,
      });
    }

    willMount() {
      const items = this.getItems();
      if (!items || !items.length) return;
      this._init();
      this.updateCoord();
    }

    didMount() {
      this._initEvent();
    }

    willUpdate(): void {
      const items = this.getItems();
      if (!items || !items.length) return;
      this.updateCoord();
    }

    _initEvent() {
      const { context, props, container } = this;
      const { canvas } = context;
      const { chart, clickable = true } = props;

      if (!clickable) return;

      // item 点击事件
      canvas.on('click', (ev) => {
        const { points } = ev;
        const point = points[0];
        const bbox = container.getBBox();
        if (!isInBBox(bbox, point)) {
          return;
        }
        const legendItems = getElementsByClassName('legend-item', container);
        if (!legendItems.length) {
          return;
        }
        const clickItem = find(legendItems, (item) => {
          const itemBBox = item.getBBox();
          return isInBBox(itemBBox, point);
        });
        if (!clickItem) {
          return;
        }
        const dataItem = clickItem.get('data-item');
        if (!dataItem) {
          return;
        }
        const { field, tickValue } = dataItem;

        const { filtered: prevFiltered } = this.state;
        const filtered = {
          ...prevFiltered,
          [tickValue]: !prevFiltered[tickValue],
        };
        this.setState({
          filtered,
        });
        chart.filter(field, (value) => {
          return !filtered[value];
        });
      });
    }

    render() {
      const { props, state } = this;
      const items = this.getItems();
      if (!items || !items.length) {
        return null;
      }
      const { itemWidth, style } = state;

      return (
        <View
          {...props}
          items={items}
          itemWidth={itemWidth}
          style={{
            ...style,
            ...props.style,
          }}
        />
      );
    }
  };
};
