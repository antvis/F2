import Base from './base';
import { Range, Option } from './types';

class Rect extends Base {
  type = 'rect';

  update(option: Option) {
    super.update(option);

    const { left, top, width, height } = this;
    const x: Range = [left, left + width];
    const y: Range = [top + height, top];

    this.x = x;
    this.y = y;
    return this;
  }
}

export default Rect;
