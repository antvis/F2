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
  }

  convertPoint(point) {
    const { x, y, transposed } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const [xStart, xEnd] = x;
    const [yStart, yEnd] = y;
    return {
      x: xStart + (xEnd - xStart) * point[xDim],
      y: yStart + (yEnd - yStart) * point[yDim]
    };
  }
}

export default Rect;
