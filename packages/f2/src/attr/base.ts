import { Scale } from '@antv/scale';
import { mix, isFunction, isNil, isArray } from '@antv/util';
import { values as arrayValues } from '../util/array';

class Base {
  data: any;
  field: string;
  scale: Scale;
  range: any[];
  callback: Function;

  constructor(options) {
    mix(this, options);

    const { scale, field, data } = this;
    if (!scale && data) {
      const values = arrayValues(data, field);
      this.scale = this.createScale({ values });
    }
  }

  createScale(_scale): Scale {
    return null;
  }

  // 数据映射方法
  _mapping(value): any {
    return value;
  }

  update(options) {
    mix(this, options);
  }

  setRange(range) {
    this.range = range;
  }

  // 归一化，参数是原始数据，返回是归一化的数据
  normalize(value: any) {
    const { scale } = this;

    if (isArray(value)) {
      return value.map(v => {
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
  mapping(value): any {
    const rst = isFunction(this.callback) ? this.callback(value) : null;
    if (!isNil(rst)) {
      return rst;
    }
    return this._mapping(value);
  }
}

export default Base;
