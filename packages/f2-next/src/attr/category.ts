import { Category as CategoryScale } from '@antv/scale';
import Base from './base';

class Category extends Base {

  createScale(scale) {
    return new CategoryScale(scale);
  }

  mapping(value: any) {
    const { scale, range } = this;
    const index = scale.translate(value);
    return range[index % range.length];
  }
}

export default Category;
