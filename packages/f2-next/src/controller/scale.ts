import { each, isObject, mix } from '@antv/util';
import { values as arrayValues } from '../util/array';
import { Scale, Linear, Category } from '@antv/scale';

function adjustCategoryOption(option) {
  if (option.range) {
    return option;
  }
  const { values } = option;
  const count = values.length;

  let range = [0, 1];
  // 如果只有一项，显示在中间
  if (count === 1) {
    range = [0.5, 1];
  } else {
    // 前后都留半个 1 / count
    const offset = 1 / count * 0.5;
    range = [ offset, 1 - offset ];
  }

  option.range = range;

  return option;
}

class ScaleController {

  // scale 实例的配置
  scaleOptions: any;
  // scale 实例
  scales: any;

  // 更新或创建scale
  scale(field, option: any = {}) {
    if (isObject(field)) {
      option = field;
    } else {
      option.field = field; 
    }

    field = option.field;
    const scaleOptions = this.scaleOptions || {};
    const oldOption = scaleOptions[field] || {};
    scaleOptions[field] = mix(oldOption, option);
    this.scaleOptions = scaleOptions;
  }

  // 根据 scaleOptions scale的定义，批量更新所有scale
  updateScales(data) {
    const { scaleOptions, scales = {} } = this;
    each(scaleOptions, (option, field) => {
      const values = option.values ? option.values : arrayValues(data, field);
      const instanceScale = scales[field];
      const scaleOption = {
        ...option,
        values,
      };

      if (instanceScale) {
        this.updateScale(instanceScale, scaleOption);
      } else {
        scales[field] = this.createScale(scaleOption);
      }
    });

    this.scales = scales;
  }

  createScale(option) {
    const { type, values } = option;
    if (type) {
      return new type({ ...option, values });
    }
    if (typeof values[0] === 'number') {
      return new Linear({ ...option, values });
    }
    const newOption = adjustCategoryOption({ ...option, values });
    return new Category(newOption);
  }

  updateScale(scale, option) {
    scale.change(option);
  }

  getScale(field) {
    const { scales, scaleOptions } = this;

    const scale = scales && scales[field];
    if (scale) {
      return scale;
    }
    const option = scaleOptions[field];
    if (!option) {
      return null;
    }
    const newScale = this.createScale(option);
    scales[field] = newScale;
    return newScale;
  }

  adjustStartZero(scale: Scale) {
    const { scaleOptions } = this;
    const { field, min, max } = scale;
    const option = scaleOptions[field];
    // 如果有定义，则不处理
    if (option && option.min) {
      return;
    }
    if (min > 0) {
      scale.change({
        min: 0
      });
    } else if (max < 0) {
      scale.change({
        max: 0
      });
    }
  }

  // 获取scale 在 0点对位置的值
  getZeroValue(scale) {
    const { min, max } = scale;
    let value;

    if (min >= 0) {
      value = min;
    } else if (max <= 0){
      value = max;
    } else {
      value = 0;
    }
    return scale.scale(value);
  }
}

export default ScaleController;
