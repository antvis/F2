import { Scale, ScaleConfig } from '../deps/f2-scale/src';
import { mix, isFunction, isNil, isArray, valuesOfKey } from '@antv/util';

class Base {
  data: any;
  field: string;
  scale: Scale;
  // string[] => [#000, #fff], 颜色之类的范围
  range: number[] | string[];
  callback: Function;

  constructor(options) {
    mix(this, options);

    const { scale, field, data } = this;
    if (!scale && data) {
      const values = valuesOfKey(data, field);
      this.scale = this.createScale({ values, field });
    }
  }

  createScale(_scaleConfig: ScaleConfig): Scale {
    return null;
  }

  // 数据映射方法
  _mapping(value) {
    return value;
  }

  update(options) {
    mix(this, options);
  }

  setRange(range) {
    this.range = range;
  }

  // 归一化，参数是原始数据，返回是归一化的数据
  normalize(value) {
    const { scale } = this;

    if (isArray(value)) {
      return value.map((v) => {
        return scale.scale(v);
      });
    }
    return scale.scale(value);
  }

  // convert 参数是归一化的数据，返回定义域的值
  convert(value) {
    return value;
  }

  // 等于 normalize + convert， 参数是原始数据，返回是定义域的值
  mapping(value, child = null) {
    const rst = isFunction(this.callback) ? this.callback(value, child) : null;
    if (!isNil(rst)) {
      return rst;
    }
    return this._mapping(value);
  }
}

export default Base;
