// @ts-nocheck
import F2 from '@antv/f2';
import Component from '../base/index';
const Shape = F2.Shape;

const EMPTY_SHAPE = 'empty-shape'

export default View => {
  return class Geometry extends Component {
    mount() {
      const { chart, props } = this;
      const _shapes = this._shapes || [];
      const { type, position, size, color, style, ...config } = props;

      // 不画任何东西，在render里面统一画
      Shape.registerShape(type, EMPTY_SHAPE, {
        draw(cfg, container) {
          _shapes.push({ cfg, container });
        }
      });

      const geom = chart[type](config).position(position);
      if (color) {
        geom.color(color, ['#CCCCCC', '#EAB76B']);
      }
      if (size) {
        geom.size(size);
      }

      // 这里不画任何东西，在render的时候画
      geom.shape(EMPTY_SHAPE);
      if (style) {
        geom.style(style);
      }
      this._shapes = _shapes;
      this.geom = geom;
    }
    getMappedData() {
      return this.geom.get('dataArray');
    }
    render() {
      const _shapes = this._shapes;
      if (!_shapes || !_shapes.length) {
        return null;
      }
      // 清空
      // this._shapes = [];
      return (
        <group>
          {
            _shapes.map(shape => {
              return <View { ...shape.cfg } />
            })
          }
        </group>
      );
    }
  }
}
