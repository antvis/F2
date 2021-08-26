import Base from './base';
import { Range, Option } from './types';

class Rect extends Base {

  type = 'rect';

  init(option: Option) {
    super.init(option);

    const { left, top, right, bottom } = this;
    const x: Range = [left, right];
    const y: Range = [bottom, top];

    this.x = x;
    this.y = y;
  }
}

export default Rect;
