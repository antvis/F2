// @ts-nocheck

import Component from '../base/index';

export default View => {
  return class Geometry extends Component {
    mount() {
      const { chart, props } = this;
      const { type, position, size, color, shape, style, ...config } = props;
      const geom = chart[type](config).position(position);
      if (color) {
        geom.color(color);
      }
      if (size) {
        geom.size(size);
      }
      if (shape) {
        geom.shape(shape);
      }
      if (style) {
        geom.style(style);
      }
    }
    render() {
      return <View />
    }
  }
}
