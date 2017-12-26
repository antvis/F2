const Base = require('./base');
const Vector2 = require('../graphic/util/vector2');

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
    const plot = self.plot;
    const start = plot ? plot.bl : self.start;
    const end = plot ? plot.tr : self.end;
    const inner = self.inner || self.innerRadius;
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    let radius;
    let center;
    if (self.startAngle === -Math.PI && self.endAngle === 0) {
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

    this.x = {
      start: self.startAngle,
      end: self.endAngle
    };

    this.y = {
      start: radius * inner,
      end: radius
    };
    this.center = center;
    this.radius = radius;
  }

  convertPoint(point) {
    const self = this;
    const center = self.center;
    const transposed = self.transposed;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const x = self.x;
    const y = self.y;

    const angle = x.start + (x.end - x.start) * point[xDim];
    const radius = y.start + (y.end - y.start) * point[yDim];

    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  }

  invertPoint(point) {
    const self = this;
    const center = self.center;
    const transposed = self.transposed;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    const x = self.x;
    const y = self.y;

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
