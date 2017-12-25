const Base = require('./base');

class Cartesian extends Base {
  getDefaultCfg() {
    return {
      type: 'cartesian',
      transposed: false,
      isRect: true,
      plot: null
    };
  }

  init() {
    const self = this;
    const plot = self.plot;
    const start = plot ? plot.bl : self.start;
    const end = plot ? plot.tr : self.end;

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

module.exports = Cartesian;
