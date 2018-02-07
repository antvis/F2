const Base = require('./base');
const Vector2 = require('../graphic/util/vector2');

class Polar extends Base {
  _initDefaultCfg() {
    this.type = 'polar';
    this.startAngle = -Math.PI / 2;
    this.endAngle = Math.PI * 3 / 2;
    this.inner = 0;
    this.innerRadius = 0; // alias
    this.isPolar = true;
    this.transposed = false;
    this.center = null;
    this.radius = null; // 相对半径
  }

  init(start, end) {
    const self = this;
    const inner = self.inner || self.innerRadius;
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    let maxRadius;
    let center;
    if (self.startAngle === -Math.PI && self.endAngle === 0) {
      maxRadius = Math.min(width / 2, height);
      center = {
        x: (start.x + end.x) / 2,
        y: start.y
      };
    } else {
      maxRadius = Math.min(width, height) / 2;
      center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
    }

    const radius = self.radius; // 相对半径
    if (radius > 0 && radius <= 1) {
      maxRadius = maxRadius * radius;
    }

    this.x = {
      start: self.startAngle,
      end: self.endAngle
    };

    this.y = {
      start: maxRadius * inner,
      end: maxRadius
    };
    this.center = center;
    this.circleRadius = maxRadius; // 绝对半径
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

    const startV = [ 1, 0 ];
    const pointV = [ point.x - center.x, point.y - center.y ];

    if (Vector2.zero(pointV)) {
      return {
        x: 0,
        y: 0
      };
    }

    let theta = Vector2.angleTo(startV, pointV);
    while (theta > x.end) {
      theta = theta - 2 * Math.PI;
    }
    const l = Vector2.length(pointV);
    const percentX = (theta - x.start) / (x.end - x.start);
    const percentY = (l - y.start) / (y.end - y.start);
    const rst = {};
    rst[xDim] = percentX;
    rst[yDim] = percentY;
    return rst;
  }
}

Base.Polar = Polar;
module.exports = Polar;
