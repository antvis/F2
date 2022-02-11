import { Linear as LinearScale, ScaleConfig } from '@antv/scale';
import { isArray } from '@antv/util';
import { interpolate } from 'd3-interpolate';
import Base from './base';

class Linear extends Base {
  // eslint-disable-next-line
  interpolate: any;
  range: number[];

  constructor(options) {
    super(options);
    this._updateInterpolate();
  }
  createScale(scaleConfig: ScaleConfig) {
    return new LinearScale(scaleConfig);
  }

  _updateInterpolate() {
    const [min, max] = this.range;
    this.interpolate = interpolate(min, max);
  }

  update(options) {
    super.update(options);
    this._updateInterpolate();
  }

  _mapping(value) {
    const { scale, interpolate } = this;

    if (isArray(value)) {
      return value.map((v) => {
        return interpolate(scale.scale(v));
      });
    }

    return interpolate(scale.scale(value));
  }

  normalize(value) {
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
