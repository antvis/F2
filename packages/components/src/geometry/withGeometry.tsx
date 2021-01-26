import { jsx } from '@ali/f2-jsx';
import F2 from '@antv/f2';
import Component from '../component/index';

const Shape = F2.Shape;

const EMPTY_SHAPE = 'empty-shape'

export default View => {
  return class Geometry extends Component {
    _shapes: any;
    geom: any;
    coord: any;

    applyAttr(geom, attr, config) {
      if (!config) return;
      if (Array.isArray(config)) {
        geom[attr].apply(geom, config);
      } else {
        geom[attr](config);
      }
    }
    mount() {
      const { chart, props } = this;
      const _shapes = this._shapes || [];
      const { type, position, size, color, style, ...config } = props;

      // 不画任何东西，在render里面统一画
      Shape.registerShape(type, EMPTY_SHAPE, {
        draw(cfg) {
          _shapes.push(cfg);
        }
      });

      const geom = chart[type](config).position(position);
      this.applyAttr(geom, 'color', color);
      this.applyAttr(geom, 'size', size);
      this.applyAttr(geom, 'style', style);

      // 这里不画任何东西，在render的时候画
      geom.shape(EMPTY_SHAPE);
      this._shapes = _shapes;
      this.geom = geom;
      // this._pressEvent();
    }
    _pressEvent() {
      const { chart, props, geom } = this;
      const { onPress, onPressEnd } = props;
      const canvas = chart.get('canvas');
      if (onPress) {
        canvas.on('press', (ev) => {
          const { points } = ev || {};
          const point = points[0];
          if (!point) {
            return;
          }
          const records = geom.getSnapRecords(point);
          ev.records = records;
          onPress(ev);
        });
      }
      if (onPressEnd) {
        canvas.on('pressend', (ev) => {
        });
      }
    }
    parsePoints(points) {
      if (!points) return false;
      const { chart } = this;
      const coord = chart.get('coord');
      return points.map(function(point) {
        return coord.convertPoint(point);
      });
    }
    renderShape(props) {
      return <View { ...props } />
    }
    render() {
      const _shapes = this._shapes;
      if (!_shapes || !_shapes.length) {
        return null;
      }
      const { props } = this;
      return (
        <group>
          {
            _shapes.map(shape => {
              return this.renderShape({
                ...props,
                ...shape,
              })
            })
          }
        </group>
      );
    }
  }
}
