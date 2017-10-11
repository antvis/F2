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

    const x = {
      start: plot.get('bl').x,
      end: plot.get('br').x
    };

    const y = {
      start: plot.get('bl').y,
      end: plot.get('tl').y
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
