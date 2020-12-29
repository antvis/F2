// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class Interval extends Component {
    mount() {
      const { chart, props } = this;
      const { position, color } = props;
      const geom = chart.interval().position(position);
      if (color) {
        geom.color(color);
      }
    }
    render() {
      return <View />
    }
  }
}
