/**
 * @fileOverview 极坐标系
 * @author dxq613@gmail.com
 */

const Base = require('./base');
const Vector2 = require('../graphic/vector2');

class Polar extends Base {

  getDefaultCfg() {
    return {
      type: 'polar',
      startAngle: -Math.PI / 2,
      endAngle: Math.PI * 3 / 2,
      inner: 0,
      isPolar: true,
      transposed: false,
      center: null,
      radius: null
    };
  }

  init() {
    const self = this;
    const plot = self.get('plot');
    const inner = self.get('inner');
    let radius;
    let center;
    if (self.get('startAngle') === -Math.PI && self.get('endAngle') === 0) {
      radius = Math.min(plot.get('width') / 2, plot.get('height'));
      center = {
        x: (plot.get('bl').x + plot.get('br').x) / 2,
        y: plot.get('bl').y
      };
    } else {
      radius = Math.min(plot.get('width'), plot.get('height')) / 2;
      center = {
        x: (plot.get('bl').x + plot.get('br').x) / 2,
        y: (plot.get('tl').y + plot.get('bl').y) / 2
      };
    }

    const x = {
      start: self.get('startAngle'),
      end: self.get('endAngle')
    };

    const y = {
      start: radius * inner,
      end: radius
    };
    self.set('center', center);
    self.set('radius', radius);
    self.set('x', x);
    self.set('y', y);
  }

  convertPoint(point) {
    const self = this;
    const center = self.get('center');
    const transposed = self.get('transposed');
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const x = self.get('x');
    const y = self.get('y');

    const angle = x.start + (x.end - x.start) * point[xDim];
    const radius = y.start + (y.end - y.start) * point[yDim];

    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  }

  invertPoint(point) {
    const self = this;
    const center = self.get('center');
    const transposed = self.get('transposed');
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    const x = self.get('x');
    const y = self.get('y');

    const startv = new Vector2(1, 0);

    const pointv = new Vector2(point.x - center.x, point.y - center.y);

    if (pointv.zero()) {
      return {
        x: 0,
        y: 0
      };
    }

    let theta = startv.angleTo(pointv);
    while (theta > x.end) {
      theta = theta - 2 * Math.PI;
    }
    const l = pointv.length();
    const percentX = (theta - x.start) / (x.end - x.start);
    const percentY = (l - y.start) / (y.end - y.start);
    const rst = {};
    rst[xDim] = percentX;
    rst[yDim] = percentY;
    return rst;
  }
}

module.exports = Polar;
