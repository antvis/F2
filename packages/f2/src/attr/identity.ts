import { Identity as IdentityScale, ScaleConfig } from '@antv/scale';
import Base from './base';

class Identity extends Base {
  createScale(scaleConfig: ScaleConfig) {
    return new IdentityScale(scaleConfig);
  }

  _mapping() {
    const { field, range } = this;
    return field || (range && range[0]);
  }
}

export default Identity;
