import { each, mix, isNil, isFunction, isNumber, valuesOfKey, getRange } from '@antv/util';
import { registerTickMethod, Scale, getScale, ScaleConfig } from '@antv/scale';
import CatTick from './scale/cat-tick';
import LinearTick from './scale/linear-tick';

// 覆盖0.3.x的 cat 方法
registerTickMethod('cat', CatTick);
registerTickMethod('time-cat', CatTick);
// 覆盖linear 度量的tick算法
registerTickMethod('wilkinson-extended', LinearTick);

export type ScaleOption = { type?: string; justifyContent?: boolean } & ScaleConfig;

class ScaleController {
  // eslint-disable-next-line
  private data: any;
  // scale 实例的配置
  private options: { [field: string]: ScaleOption };
  // scale 实例
  private scales: { [field: string]: Scale };

  constructor(data) {
    this.data = data;
    this.options = {};
    this.scales = {};
  }

  private _getType(option: ScaleOption) {
    const { type, values, field } = option;
    if (type) {
      return type;
    }
    if (isNumber(field) || (isNil(values[0]) && field)) {
      return 'identity';
    }
    if (typeof values[0] === 'number') {
      return 'linear';
    }
    return 'cat';
  }

  private _getOption(option: ScaleOption) {
    const { values, field, justifyContent } = option;
    const type = this._getType(option);

    option.type = type;

    // identity
    if (type === 'identity') {
      option.field = field.toString();
      option.values = [field];
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
    // 分类类型和 timeCat 类型，调整 range
    if (type === 'cat' || type === 'timeCat') {
      if (option.range) {
        return option;
      }
      const count = values.length;
      let range = [0, 1];
      // 如果只有一项，显示在中间
      if (count === 1) {
        range = [0.5, 1];
      } else if (justifyContent) {
        // 居中
        const offset = (1 / count) * 0.5;
        range = [offset, 1 - offset];
      } else {
        // 最后留 1 / count
        const offset = 1 / count;
        range = [0, 1 - offset];
      }
      option.range = range;
    }

    return option;
  }

  private createScale(option) {
    const { type } = option;
    if (isFunction(type)) {
      return new type(option);
    }
    const ScaleClass = getScale(type);
    return new ScaleClass(option);
  }

  // 更新或创建scale
  setScale(field: string, option?: ScaleOption) {
    const { options, scales } = this;
    options[field] = mix({}, options[field], option);
    // 如果scale有更新，scale 也需要重新创建
    if (scales[field]) {
      delete scales[field];
    }
  }

  create(options: { [k: string]: ScaleOption }) {
    this.update(options);
  }

  update(options: { [k: string]: ScaleOption }) {
    if (!options) return;
    each(options, (option: ScaleOption, field: string) => {
      this.setScale(field, option);
    });
    // 为了让外部感知到scale有变化
    this.scales = {
      ...this.scales,
    };
  }

  changeData(data) {
    this.data = data;
    this.scales = {};
  }

  getData() {
    return this.data;
  }

  getScale(field: string): Scale {
    const { scales, options, data } = this;

    const scale = scales[field];
    if (scale) {
      return scale;
    }
    const option = options[field];
    if (!option) {
      return null;
    }
    const values = option.values ? option.values : data ? valuesOfKey(data, field) : [];
    const scaleOption = this._getOption({
      ...option,
      field,
      values,
    });
    const newScale = this.createScale(scaleOption);
    scales[field] = newScale;
    return newScale;
  }

  getScales() {
    const { options, scales } = this;
    each(options, (option, field: string) => {
      this.getScale(field);
    });
    return scales;
  }

  adjustStartZero(scale: Scale) {
    const { options } = this;
    const { field, min, max } = scale;
    const option = options[field];
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

  // 饼图下的scale调整
  adjustPieScale(scale: Scale) {
    const { options } = this;
    const { field } = scale;
    const option = options[field];

    if (option && !isNil(option.nice)) {
      return null;
    }
    scale.change({
      nice: false,
    });
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
