import { Category as CategoryScale, ScaleConfig } from '@antv/scale';
import Base from './base';

class Category extends Base {
  createScale(scaleConfig: ScaleConfig) {
    return new CategoryScale(scaleConfig);
  }

  _mapping(value: any) {
    const { scale, range } = this;
    const index = scale.translate(value);
    return range[index % range.length];
  }
}

export default Category;
