import { Linear as LinearScale, ScaleConfig } from '../deps/f2-scale/src';
import { isArray, isNumber } from '@antv/util';
import { interpolateNumber, interpolateRgb } from '../deps/d3-interpolate/src';
import Base from './base';

// 只处理 number 和 color
const interpolate = (a, b) => {
  if (isNumber(b)) {
    return interpolateNumber(a, b);
  }
  return interpolateRgb(a, b);
};

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
