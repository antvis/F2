import { jsx, Component, computeLayout, GroupStyleProps, TextStyleProps } from '@antv/f-engine';
import { ChartChildProps } from '../../chart';
import { isFunction } from '@antv/util';

interface LegendItem {
  /**
   * 标记颜色。
   */
  color?: string;
  /**
   * 名称。
   */
  name?: string;
  /**
   * 值。
   */
  value?: string | number;
  /**
   * 图例标记。
   */
  marker?: string;
  [key: string]: any;
}
export interface LegendProps {
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
  itemFormatter?: (value, name) => string;
  /**
   * 图例项列表。
   */
  items?: LegendItem[];
  /**
   * 图例样式。
   */
  style?: GroupStyleProps;
  /**
   * 图例标记。
   */
  marker?: 'circle' | 'square' | 'line';
  /**
   * 用于设置图例项的样式
   */
  itemStyle?: GroupStyleProps;
  /**
   * 用于设置图例项的文本样式
   */
  nameStyle?: Omit<TextStyleProps, 'text'>;
  /**
   * 用于设置图例项的文本样式
   */
  valueStyle?: Omit<TextStyleProps, 'text'>;
  /**
   * value展示文案的前缀
   */
  valuePrefix?: string;
  /**
   * 是否可点击
   */
  clickable?: boolean;
  onClick?: (item: LegendItem) => void;
}

export default (View) => {
  return class Legend<IProps extends LegendProps = LegendProps> extends Component<
    IProps & ChartChildProps
  > {
    legendStyle: GroupStyleProps;
    itemWidth: Number;
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

    getMaxItemBox(node) {
      let maxItemWidth = 0;
      let maxItemHeight = 0;
      (node.children || []).forEach((child) => {
        const { layout } = child;
        const { width, height } = layout;

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
      const { left, top, width: layoutWidth, height: layoutHeight } = parentLayout;
      const width = context.px2hd(customWidth) || layoutWidth;
      const node = computeLayout(this, this.render());
      const { width: itemMaxWidth, height: itemMaxHeight } = this.getMaxItemBox(node);
      // 每行最多的个数
      const lineMaxCount = Math.max(1, Math.floor(width / itemMaxWidth));
      const itemCount = items.length;
      // legend item 的行数
      const lineCount = Math.ceil(itemCount / lineMaxCount);
      const itemWidth = width / lineMaxCount;
      const autoHeight = itemMaxHeight * lineCount;
      const style: GroupStyleProps = {
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
        style.left = left + (width - itemMaxWidth);
      }
      if (position === 'bottom') {
        style.top = top + (layoutHeight - autoHeight);
        style.height = customHeight ? customHeight : autoHeight;
      }
      this.itemWidth = itemWidth;
      this.legendStyle = style;
    }

    updateCoord() {
      const { context, props, legendStyle } = this;
      const { position = 'top', margin = '30px', chart } = props;
      const { width, height } = legendStyle;
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
      // this._initEvent();
    }

    willUpdate(): void {
      const items = this.getItems();
      if (!items || !items.length) return;
      this._init();
      this.updateCoord();
    }

    _onclick = (item) => {
      const { props } = this;
      const { chart, clickable = true, onClick } = props;
      if (!clickable) return;
      const clickItem = item.currentTarget;
      if (!clickItem) {
        return;
      }
      // @ts-ignore
      const dataItem = clickItem.config['data-item'];
      if (!dataItem) {
        return;
      }
      if (isFunction(onClick)) {
        onClick(dataItem);
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
    };

    render() {
      const { props, itemWidth, legendStyle } = this;
      const items = this.getItems();
      if (!items || !items.length) {
        return null;
      }

      return (
        <View
          {...props}
          items={items}
          itemWidth={itemWidth}
          style={{
            ...legendStyle,
            ...props.style,
          }}
          onClick={this._onclick}
        />
      );
    }
  };
};
