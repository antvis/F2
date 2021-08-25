import { Linear } from '@antv/scale';
import { isArray } from '@antv/util';
import Base from './base';

class LinearAttr extends Base {

  createScale(scale) {
    return new Linear(scale);
  }

  mapping(value: any) {
    const { scale, options } = this;
    // 值域的范围
    const { range } = options;
    const [ min, max ] = range;

    if (isArray(value)) {
      return value.map(v => {
        return min + (max - min) * scale.scale(v);
      });
    }
    return min + (max - min) * scale.scale(value);
  }
}

export default LinearAttr;
