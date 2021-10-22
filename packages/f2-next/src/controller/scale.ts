import { each, isObject, mix, isNil, isFunction, isNumber } from '@antv/util';
import { values as arrayValues, getRange } from '../util/array';
import { registerTickMethod, Scale, getScale } from '@antv/scale';
import CatTick from './scale/cat-tick';
import LinearTick from './scale/linear-tick';

// 覆盖0.3.x的 cat 方法
registerTickMethod('cat', CatTick);
registerTickMethod('time-cat', CatTick);
// 覆盖linear 度量的tick算法
registerTickMethod('wilkinson-extended', LinearTick);

class ScaleController {
  data: any;
  // scale 实例的配置
  scaleOptions: any;
  // scale 实例
  scales: any;

  constructor(data) {
    this.data = data;
    this.scaleOptions = {};
    this.scales = {};
  }

  // 更新或创建scale
  scale(field, option: any = {}) {
    if (isObject(field)) {
      option = field;
    } else {
      option.field = field;
    }
    field = option.field;
    const { scaleOptions, scales } = this;
    const oldOption = scaleOptions[field] || {};
    scaleOptions[field] = mix(oldOption, option);
    // 如果scale有更新，scale 也需要重新创建
    scales[field] = undefined;
  }

  _getType(option) {
    const { type, values, field } = option;
    if (type) {
      return type;
    }
    if (isNumber(field) || isNil(values[0]) && field) {
      return 'identity';
    }
    if (typeof values[0] === 'number') {
      return 'linear';
    }
    return 'cat';
  }

  _getOption(option) {
    const { values, field } = option;
    const type = this._getType(option);

    option.type = type;

    // identity
    if (type === 'identity') {
      option.value = field;
      option.field = field.toString()
      option.values = [field]
      return option;
    }

    // linear 类型
    if (type === 'linear') {
      // 设置默认nice
      if (typeof option.nice !== 'boolean') {
        option.nice = true;
      }
      // 重置最大最小
      const { min, max } = getRange(values);
      if (isNil(option.min)) {
        option.min = min;
      }
      if (isNil(option.max)) {
        option.max = max;
      }

      return option;
    }
    // 分类类型
    if (type === 'cat') {
      if (option.range) {
        return option;
      }
      const count = values.length;
      let range = [0, 1];
      // 如果只有一项，显示在中间
      if (count === 1) {
        range = [0.5, 1];
      } else {
        // 前后都留半个 1 / count
        const offset = (1 / count) * 0.5;
        range = [offset, 1 - offset];
      }
      option.range = range;
      return option;
    }
    return option;
  }

  // 根据 scaleOptions scale的定义，批量更新所有scale
  updateScales(data) {
    const { scaleOptions, scales = {} } = this;
    each(scaleOptions, (option, field) => {
      const values = option.values ? option.values : arrayValues(data, field);
      const instanceScale = scales[field];
      const scaleOption = this._getOption({
        ...option,
        field,
        values,
      });

      if (instanceScale) {
        this.updateScale(instanceScale, scaleOption);
      } else {
        scales[field] = this.createScale(scaleOption);
      }
    });

    this.scales = scales;
  }

  createScale(option) {
    const { type } = option;
    if (isFunction(type)) {
      return new type(option);
    }
    const Scale = getScale(type);
    return new Scale(option);
  }

  updateScale(scale, option) {
    scale.change(option);
  }

  getScale(field: string) {
    const { scales, scaleOptions, data } = this;

    const scale = scales[field];
    if (scale) {
      return scale;
    }
    const option = scaleOptions[field];
    if (!option) {
      return null;
    }
    const values = option.values ? option.values : arrayValues(data, field);
    const scaleOption = this._getOption({
      ...option,
      field,
      values,
    });
    const newScale = this.createScale(scaleOption);
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
        min: 0,
      });
    } else if (max < 0) {
      scale.change({
        max: 0,
      });
    }
  }

  // 获取scale 在 0点对位置的值
  getZeroValue(scale) {
    const { min, max } = scale;
    let value;

    if (min >= 0) {
      value = min;
    } else if (max <= 0) {
      value = max;
    } else {
      value = 0;
    }
    return scale.scale(value);
  }
}

export default ScaleController;
