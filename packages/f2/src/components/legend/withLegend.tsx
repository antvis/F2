import { jsx } from '../../jsx';
import { renderShape } from '../../base/diff';
import Component from '../../base/component';

export default View => {
  return class Legend extends Component {
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
