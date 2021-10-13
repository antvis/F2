import { jsx, render, renderJSXElement } from '../../jsx';
import Component from '../../base/component';
import Layout from '../../base/layout';

export default (View) => {
  return class Legend extends Component {
    chart: any;

    maxItemWidth: number;

    getLayout() {
      const { container, props } = this;
      const { position = 'top' } = props;
      const isVertical = position === 'left' || position === 'right';

      const shape = render(renderJSXElement(this.render()), container);
      const maxItemWidth = this.getMaxItemWidth(shape);
      const { height, width } = shape.get('attrs');
      this.maxItemWidth = maxItemWidth;
      
      shape.remove();

      if (isVertical) {
        return { position, height, width: maxItemWidth };
      }
      return { position, width, height };
    }

    setLayout(layout) {
      this.layout = new Layout(layout);
    }

    getItems() {
      const { chart } = this;
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

    render() {
      const { layout, props, maxItemWidth } = this;
      // 自定义items
      if (props.items) {
        return <View {...props} />;
      }
      const items = this.getItems();
      return (
        <View
          {...props}
          items={items}
          layout={layout}
          maxItemWidth={maxItemWidth}
        />
      );
    }
  };
};
