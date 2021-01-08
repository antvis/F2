// @ts-nocheck
import Component from '../base'

export default View => {
  return class Axis extends Component {
    mount() {
      const { props, chart } = this;
      const { xField } = props; 
      chart.scale(xField, {
        type: 'timeCat',
        tickCount: 3,
        range: [0, 1],
      });
    }
    render() {
      return <View />
    }
  }
}
