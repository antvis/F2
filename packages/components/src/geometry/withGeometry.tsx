// @ts-nocheck

import Component from '../base/index';

export default View => {
  return class Interval extends Component {
    mount() {
      const { chart, props } = this;
      const { type, position, color, ...config } = props;
      const geom = chart[type](config).position(position);
      if (color) {
        geom.color(color);
      }
    }
    render() {
      return <View />
    }
  }
}
