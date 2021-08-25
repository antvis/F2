import { Identity } from '@antv/scale';
import Base from './base';

class CategoryAttr extends Base {

  createScale(scale) {
    return new Identity(scale);
  }

  mapping(value: any) {
    const { scale, options } = this;
  }
}

export default CategoryAttr;
