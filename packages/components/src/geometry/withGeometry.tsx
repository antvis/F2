import { jsx } from '@ali/f2-jsx';
import F2 from '@antv/f2';
import { isArray } from '@ali/f2x-util';
import Component from '../component/index';

const Shape = F2.Shape;

const EMPTY_SHAPE = 'empty-shape';

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
      const { type, position, size, color, shape, style, order, ...config } = props; 

      let _shapes = this._shapes || [];

      const geom = chart[type](config).position(position);

      if(order && order.length) {
        _shapes = new Array(order[1].length).fill("");
      }
      
      this.applyAttr(geom, 'color', color);
      this.applyAttr(geom, 'size', size);   
      this.applyAttr(geom, 'style', style);

      // 不画任何东西，在render里面统一画
      Shape.registerShape(type, EMPTY_SHAPE, {
        draw(cfg) {
          const { origin } = cfg;
          if(order && order.length) {
            const catField = order[0];
            const orderValues = order[1];
            const key = isArray(origin) ? origin[0][catField] : origin[catField];
            // 按order的倒序处理，因为绘图时，后面的数据会绘在上面
            _shapes.splice(Math.abs(orderValues.indexOf(key) - orderValues.length + 1), 1, cfg);
          } else {
            _shapes.push(cfg);
          }
        },
      });
      
      if (shape) {
        this.applyAttr(geom, 'shape', shape);
      } else {
        // 这里不画任何东西，在render的时候画
        geom.shape(EMPTY_SHAPE);
      }

      this._shapes = _shapes;
      this.geom = geom;

      this.initEvent();
    }
    initEvent() {
      const { chart, props, geom } = this;
      const canvas = chart.get('canvas');
      [
        'onPressStart',
        'onPress',
        'onPressEnd'
      ].forEach((eventName) => {
        if (props[eventName]) {
          canvas.on(eventName.substr(2).toLowerCase(), (ev) => {
            ev.geometry = geom;
            props[eventName](ev);
          });
        }
      });
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
