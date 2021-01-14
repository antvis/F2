// @ts-nocheck
import Component from '../base'

export default View => {
  return class Axis extends Component {
    mount() {
      const { props, chart } = this;
      const { field } = props;
      const scale = chart.get('scales')[field];

      console.log(scale);
      
      // chart.scale(xField, {
      //   type: 'timeCat',
      //   tickCount: 3,
      //   range: [0, 1],
      // });
    }
    render() {
      return <View />
    }
  }
}
