// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class Line extends Component {
    mount() {
      const { chart, props } = this;
      const { position, color } = props;
      const geom = chart.line().position(position);
      if (color) {
        if (Array.isArray(color)) {
          geom.color(color[0], color[1]);
        } else {
          geom.color(color);
        }
      }
    }
    render() {
      return <View />
    }
  }
}
