import { jsx, render, renderJSXElement } from '../../jsx';
import Component from '../../base/component';

export default View => {
  return class Legend extends Component {

    chart: any;

    mount() {
      const { chart, container } = this;
      const { coord } = chart;
      const shape = render(renderJSXElement(this.render()), container);
      const bbox = shape.getBBox();
      shape.remove();
      const { top, height } = coord;
      coord.update({
        top: top + bbox.height,
        height: height - bbox.height,
      });
    }

    getItems() {
      const { chart } = this;
      return chart.getLegendItems();
    }

    render() {
      const { props } = this;
      // 自定义items
      if (props.items) {
        return <View { ...props } />
      }
      const items = this.getItems();
      return <View
        items={ items }
        { ...props }
      />
    }
  }
}
