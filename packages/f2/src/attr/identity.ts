import { Identity as IdentityScale } from '@antv/scale';
import Base from './base';

class Identity extends Base {
  createScale(scale) {
    return new IdentityScale(scale);
  }

  _mapping() {
    const { field, range } = this;
    return field || (range && range[0]);
  }
}

export default Identity;
