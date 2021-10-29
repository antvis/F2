import { isArray } from '@antv/util';
import Base from './base';
import { Range, Option } from './types';

class Rect extends Base {
  type = 'rect';

  update(option: Option) {
    super.update(option);

    const { left, top, right, bottom } = this;
    const x: Range = [left, right];
    const y: Range = [bottom, top];

    this.x = x;
    this.y = y;
    return this;
  }

  _zoomVal(val, func) {
    return isArray(val) ? val.map((v) => func(v)) : func(val);
  }

  convertPoint(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    return {
      x: this._zoomVal(point[xDim], (v) => x[0] + (x[1] - x[0]) * v),
      y: this._zoomVal(point[yDim], (v) => y[0] + (y[1] - y[0]) * v),
    };
  }

  invertPoint(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    return {
      [xDim]: this._zoomVal(point.x, (v) => (v - x[0]) / (x[1] - x[0])),
      [yDim]: this._zoomVal(point.y, (v) => (v - y[0]) / (y[1] - y[0])),
    };
  }
}

export default Rect;
