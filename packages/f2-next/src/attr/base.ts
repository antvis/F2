import { Scale } from '@antv/scale';
import { mix } from '@antv/util';
import { values as arrayValues } from '../util/array';

class Base {
  data: any;
  field: string;
  scale: Scale;
  range: any[];

  constructor(options) {
    mix(this, options);

    const { scale, field, data } = this;
    if (!scale && data) {
      const values = arrayValues(data, field);
      this.scale = this.createScale({ values });
    }
  }

  createScale(scale): Scale {
    return null;
  }

  // 数据映射方法
  mapping(value): any {
  }

  update(options) {
    mix(this, options);
  }

  setRange(range) {
    this.range = range;
  }
}

export default Base;