import { jsx, render, renderJSXElement } from '../../jsx';
import Component from '../../base/component';
import Layout from '../../base/layout';

export default View => {
  return class Legend extends Component {

    chart: any;

    getLayout() {
      const { container, props } = this;
      const { position = 'top' } = props;
      const shape = render(renderJSXElement(this.render()), container);
      const { height, width } = shape.get('attrs');
      shape.remove();
      return { position, width, height };
    }

    setLayout(layout) {
      this.layout = new Layout(layout);
    }

    getItems() {
      const { chart } = this;
      return chart.getLegendItems();
    }

    render() {
      const { layout, props } = this;
      // 自定义items
      if (props.items) {
        return <View { ...props } />
      }
      const items = this.getItems();
      return <View
        { ...props }
        items={ items }
        layout={ layout }
      />
    }
  }
}
