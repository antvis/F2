import { Linear as LinearScale } from '@antv/scale';
import { isArray } from '@antv/util';
import Base from './base';

class Linear extends Base {

  createScale(scale) {
    return new LinearScale(scale);
  }

  mapping(value: any) {
    const { scale, range } = this;
    const [ min, max ] = range;

    if (isArray(value)) {
      return value.map(v => {
        return min + (max - min) * scale.scale(v);
      });
    }
    return min + (max - min) * scale.scale(value);
  }
}

export default Linear;
