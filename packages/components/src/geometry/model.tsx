// @ts-nocheck

import Component from '../base/index';

export default View => {
  return class Interval extends Component {
    mount() {
      const { chart, props } = this;
      const { position, color } = props;
      const geom = chart.line().position(position);
      if (color) {
        geom.color(color);
      }
    }
    render() {
      return <View />
    }
  }
}
