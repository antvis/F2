import { Linear as LinearScale, ScaleConfig } from '@antv/scale';
import { isArray } from '@antv/util';
import Base from './base';

class Linear extends Base {
  createScale(scaleConfig: ScaleConfig) {
    return new LinearScale(scaleConfig);
  }

  _mapping(value: any) {
    const { scale, range } = this;
    const [min, max] = range;

    if (isArray(value)) {
      return value.map((v) => {
        return min + (max - min) * scale.scale(v);
      });
    }
    return min + (max - min) * scale.scale(value);
  }

  normalize(value: any) {
    const { scale } = this;

    if (isArray(value)) {
      return value.map((v) => {
        return scale.scale(v);
      });
    }
    return scale.scale(value);
  }

  convert(value) {
    const { range } = this;
    const [min, max] = range;

    if (isArray(value)) {
      return value.map((v) => {
        return min + (max - min) * v;
      });
    }
    return min + (max - min) * value;
  }
}

export default Linear;
