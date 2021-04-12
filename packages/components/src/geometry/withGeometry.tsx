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
      const _shapes = this._shapes || [];

      const geom = chart[type](config).position(position);

      if(order && order.length) {
        const catField = order[0];
        const orderValues = order[1];
        if (catField && orderValues && orderValues.length) {
          geom.on('afterprocessdata', ev => {
            const { dataArray } = ev;
            dataArray.sort((data1, data2) => {
              // data 是 array, 这里只要取第一个元素比较就可以了
              const item1 = data1[0];
              const item2 = data2[0];
              const orderValue1 = item1[catField];
              const orderValue2 = item2[catField];
              // dataArray需要按order的倒序处理，因为绘图时，后面的数据会绘在上面
              return orderValues.indexOf(orderValue2) - orderValues.indexOf(orderValue1);
            });
          });
        }
      }

      
      this.applyAttr(geom, 'color', color);
      this.applyAttr(geom, 'size', size);   
      this.applyAttr(geom, 'style', style);

      // 不画任何东西，在render里面统一画
      Shape.registerShape(type, EMPTY_SHAPE, {
        draw(cfg) {
          _shapes.push(cfg);
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
