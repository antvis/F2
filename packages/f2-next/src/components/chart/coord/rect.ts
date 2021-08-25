import Base from './base';

interface IRect {
  start: any;
  end: any;
  x: any,
  y: any
}

class Rect extends Base implements IRect {

  isRect: boolean;

  constructor(props) {
    super(props);
  }

  _initDefaultCfg() {
    this.type = 'rect';
    this.transposed = false;
    this.isRect = true;
  }

  init(start, end) {
    super.init(start, end);
    this.start = start;
    this.end = end;
    this.x = {
      start: start.x,
      end: end.x
    };


    this.y = {
      start: start.y,
      end: end.y
    };
  }

  _convertPoint(point) {
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

  _invertPoint(point) {
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

export default Rect;
