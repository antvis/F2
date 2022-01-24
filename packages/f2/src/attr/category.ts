import { Category as CategoryScale, ScaleConfig } from '@antv/scale';
import Base from './base';

class Category extends Base {
  createScale(scaleConfig: ScaleConfig) {
    return new CategoryScale(scaleConfig);
  }

  _mapping(value) {
    const { scale, range } = this;
    if (scale.type === 'cat') {
      const index = scale.translate(value);
      return range[index % range.length];
    }
    const normalizeValue = scale.scale(value);
    const index = Math.round(normalizeValue * (range.length - 1));
    return range[index];
  }
}

export default Category;
