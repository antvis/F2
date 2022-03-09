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
}

export default Rect;
