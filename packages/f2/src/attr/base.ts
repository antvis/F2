import { Scale, ScaleConfig } from '@antv/scale';
import { mix, isFunction, isNil, isArray, valuesOfKey, isObject } from '@antv/util';
import evaluate from 'simple-evaluate';

class Base {
  // eslint-disable-next-line
  data: any;
  field: string;
  scale: Scale;
  // string[] => [#000, #fff], 颜色之类的范围
  range: number[] | string[];
  callback: Function;
  // eslint-disable-next-line
  valuesMap: any;

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
    let rst = null;
    if (isFunction(this.callback)) {
      rst = this.callback(value, child);
    } else if (isObject(this.valuesMap)) {
      if (this.valuesMap[value]) {
        rst = this.valuesMap[value];
      } else {
        rst = Object.keys(this.valuesMap).reduce((prev, curr) => {
          if (evaluate({ value }, curr)) {
            return this.valuesMap[curr];
          }
          return prev;
        }, this.valuesMap.DEFAULT);
      }
    }
    if (!isNil(rst)) {
      return rst;
    }
    return this._mapping(value);
  }
}

export default Base;
