import { Category } from '@antv/scale';
import Base from './base';

class CategoryAttr extends Base {

  createScale(scale) {
    return new Category(scale);
  }

  mapping(value: any) {
    const { scale, options } = this;
    // 值域列表
    const { values } = options;

    const index = scale.translate(value);
    return values[index % values.length];
  }
}

export default CategoryAttr;
