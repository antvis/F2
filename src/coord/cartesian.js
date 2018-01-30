/**
 * @fileOverview 直角坐标系
 * @author dxq613@gmail.com
 */

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
    const plot = self.get('plot');
    const start = plot ? plot.get('bl') : self.get('start');
    const end = plot ? plot.get('tr') : self.get('end');

    const x = {
      start: start.x,
      end: end.x
    };

    const y = {
      start: start.y,
      end: end.y
    };
    self.set('x', x);
    self.set('y', y);
  }

  convertPoint(point) {
    const self = this;
    const transposed = self.get('transposed');
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    const x = self.get('x');
    const y = self.get('y');
    return {
      x: x.start + (x.end - x.start) * point[xDim],
      y: y.start + (y.end - y.start) * point[yDim]
    };
  }

  invertPoint(point) {
    const self = this;
    const transposed = self.get('transposed');
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const x = self.get('x');
    const y = self.get('y');

    const rst = {};
    rst[xDim] = (point.x - x.start) / (x.end - x.start);
    rst[yDim] = (point.y - y.start) / (y.end - y.start);
    return rst;
  }
}

module.exports = Cartesian;
