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
      innerRadius: 0, // alias
      isPolar: true,
      transposed: false,
      center: null,
      radius: null
    };
  }

  init() {
    const self = this;
    const plot = self.get('plot');
    const start = plot ? plot.get('bl') : self.get('start');
    const end = plot ? plot.get('tr') : self.get('end');
    const inner = self.get('inner') || self.get('innerRadius');
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    let radius;
    let center;
    if (self.get('startAngle') === -Math.PI && self.get('endAngle') === 0) {
      radius = Math.min(width / 2, height);
      center = {
        x: (start.x + end.x) / 2,
        y: start.y
      };
    } else {
      radius = Math.min(width, height) / 2;
      center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
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
