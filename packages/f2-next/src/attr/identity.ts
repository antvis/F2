import { Identity as IdentityScale } from '@antv/scale';
import Base from './base';

class Identity extends Base {
  createScale(scale) {
    return new IdentityScale(scale);
  }

  mapping(value: any) {
    return value;
  }
}

export default Identity;
