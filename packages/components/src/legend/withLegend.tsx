import { jsx } from '@ali/f2-jsx';
import Component from '../component/index';

export default View => {
  return class Legend extends Component {

    chart: any;

    getItems() {
      const { props, chart } = this;
      const { field } = props;
      const items = chart.getLegendItems();
      if (field && items[field]) {
        return items[field];
      }
      const keys = Object.keys(items);
      return items[keys[0]];
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
