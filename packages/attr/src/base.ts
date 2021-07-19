import { Scale } from '@antv/scale';
import { deepMix } from '@antv/util';
import { values as arrayValues } from './util/array';

class Base {
  field: string;
  options: any;
  scale: Scale;

  constructor(cfg) {
    const options = deepMix({}, cfg);
    const { field, data } = options;

    this.field = field;
    this.options = options;

    if (data) {
      this.source(data);
    }
  }

  source(data: any[]) {
    const { options } = this;
    const { field } = options;
    const values = arrayValues(data, field);
    this.values(values);
  }

  // 设置scale的值域
  values(values: any[]) {
    // const { scale } = this;
    // if (scale) {
    //   // scale.change()
    // }
    this.scale = this.createScale({ values });
  }

  mapping(value): any {
  }

  createScale(scale): Scale {
    return null;
  }
}

export default Base;