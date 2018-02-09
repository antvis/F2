const Base = require('./base');

class Cartesian extends Base {
  _initDefaultCfg() {
    this.type = 'cartesian';
    this.transposed = false;
    this.isRect = true;
  }

  init(start, end) {
    this.x = {
      start: start.x,
      end: end.x
    };

    this.y = {
      start: start.y,
      end: end.y
    };
  }

  convertPoint(point) {
    const self = this;
    const transposed = self.transposed;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    const x = self.x;
    const y = self.y;
    return {
      x: x.start + (x.end - x.start) * point[xDim],
      y: y.start + (y.end - y.start) * point[yDim]
    };
  }

  invertPoint(point) {
    const self = this;
    const transposed = self.transposed;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    const x = self.x;
    const y = self.y;
    const rst = {};
    rst[xDim] = (point.x - x.start) / (x.end - x.start);
    rst[yDim] = (point.y - y.start) / (y.end - y.start);
    return rst;
  }
}

Base.Cartesian = Cartesian;
Base.Rect = Cartesian;
module.exports = Cartesian;
