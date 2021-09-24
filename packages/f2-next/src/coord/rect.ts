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

  convertPoint(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    return {
      x: x[0] + (x[1] - x[0]) * point[xDim],
      y: y[0] + (y[1] - y[0]) * point[yDim]
    };
  }

  invertPoint(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    return {
      [xDim]: (point.x - x[0]) / (x[1] - x[0]),
      [yDim]: (point.y - y[0]) / (y[1] - y[0])
    };
  }
}

export default Rect;
