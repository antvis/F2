import { Component, jsx } from '@antv/f-engine';
import { isString } from '@antv/util';

export interface ChartLayoutProps {
  type?: 'horizontal' | 'vertical' | 'grid' | 'circular';
  children?: any;
  style?: any;
  columns?: number; // 列数
  gap?: number | [number, number]; // 间距
  itemStyle?: any; // 子组件容器的样式
}

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const Shape = 2;

export default class Layout extends Component<ChartLayoutProps> {
  getWorkTag(type) {
    if (isString(type)) {
      return Shape;
    }
    if (type.prototype && type.prototype.isF2Component) {
      return ClassComponent;
    }
    return FunctionComponent;
  }
  getLayoutStyle() {
    const { type, style } = this.props;
    const baseStyle = {
      display: 'flex',
      ...style,
    };

    switch (type) {
      case 'horizontal':
        return {
          ...baseStyle,
          flexDirection: 'row',
          alignItems: 'center',
        };
      case 'vertical':
        return {
          ...baseStyle,
          flexDirection: 'column',
          alignItems: 'center',
        };
      case 'grid':
        return {
          ...baseStyle,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        };
      case 'circular':
        return {
          // ...baseStyle,
        };
      default:
        return baseStyle;
    }
  }

  calculateChildrenLayout() {
    const { type, children, columns = 3, gap = 0, itemStyle } = this.props;
    const { width: containerWidth, height: containerHeight } = this.layout;
    const childArray = Array.isArray(children) ? children : [children];
    const [verticalGap, horizontalGap] = Array.isArray(gap) ? gap : [gap, gap];

    return childArray.map((child, index) => {
      const childStyle = this.context.px2hd(child.props?.style);
      let width = childStyle?.width || containerWidth;
      let height = childStyle?.height || containerHeight;
      let top = 0;
      let left = 0;

      if (type === 'horizontal') {
        // 水平布局：子元素平均分配容器宽度
        const totalGapWidth = (childArray.length - 1) * horizontalGap;
        const itemWidth = (containerWidth - totalGapWidth) / childArray.length;
        width = itemWidth;
        left = index * (itemWidth + horizontalGap);
      } else if (type === 'vertical') {
        // 垂直布局：子元素平均分配容器高度
        const totalGapHeight = (childArray.length - 1) * verticalGap;
        const itemHeight = (containerHeight - totalGapHeight) / childArray.length;
        height = itemHeight;
        top = index * (itemHeight + verticalGap);
      } else if (type === 'grid') {
        // 双向布局：根据列数计算每个子元素的宽度和位置
        const row = Math.floor(index / columns);
        const col = index % columns;
        const totalGapWidth = (columns - 1) * horizontalGap;
        const itemWidth = (containerWidth - totalGapWidth) / columns;
        width = itemWidth;
        left = col * (itemWidth + horizontalGap);
        top = row * (height + verticalGap);
      } else if (type === 'circular') {
        // 圆形布局：将子元素均匀分布在圆周上
        const radius = Math.min(containerWidth, containerHeight) / 2;
        const angle = (index * 2 * Math.PI) / childArray.length;
        left = containerWidth / 2 + radius * Math.cos(angle);
        top = containerHeight / 2 + radius * Math.sin(angle);
      }
      const tag = this.getWorkTag(child.type);

      if (tag === Shape) {
        if (type === 'circular') {
          return <group style={{ x: left, y: top, ...itemStyle }}>{child}</group>;
        }
        return child;
      }

      return (
        <group
          style={{
            width,
            height,
            ...itemStyle,
          }}
        >
          {child}
        </group>
      );
    });
  }

  render() {
    const layoutStyle = this.getLayoutStyle();
    const childrenWithLayout = this.calculateChildrenLayout();

    return <group style={layoutStyle}>{childrenWithLayout}</group>;
  }
}
