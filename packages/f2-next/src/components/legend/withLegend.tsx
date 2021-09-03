import { jsx } from '../../jsx';
import Component from '../../base/component';
import Layout from '../../base/layout';

export default View => {
  return class Legend extends Component {

    chart: any;
    layout: Layout;

    getGeometry() {
      const { chart } = this;
      
      const geometrys = chart.getGeometrys();
      // 默认处理第一个图形
      return geometrys[0];
    }

    mount() {
      // const { layout } = this;
      // this.layout = new Layout({
      //   left: layout.left,
      //   top: layout.top,
      //   width: 0,
      //   height: 0,
      // });
      // this.getItems();
    }

    getItems() {
      const geometry = this.getGeometry();
      const colorOption = geometry.getAttrOption('color');
      if (!colorOption) return null;
      const { field } = colorOption;
      const { chart } = this;
      const scale = chart.getScale(field);
      if (!scale.isCategory) return null;

      return [{
        color: 'red',
        name: '1',
        value: '11'
      }, {
        color: 'red',
        name: '1',
        value: '11'
      }]
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
