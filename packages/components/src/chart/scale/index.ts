import { getScale, registerTickMethod, getTickMethod } from '@antv/scale';
import {
  isArray,
  isNil,
  each,
  firstValue,
  isString,
  getRange,
} from '@antv/util';

import {
  values as arrayValues
} from '../util/array';

import CatTick from './cat-tick';
import LinearTick from './linear-tick';

// 覆盖0.3.x的 cat 方法
registerTickMethod('cat', CatTick);
registerTickMethod('time-cat', CatTick);
// 覆盖linear 度量的tick算法
registerTickMethod('wilkinson-extended', LinearTick);


class ScaleController {
  // scale定义
  defs: any = {};
  // 已经实例化的scale
  scales: any = {};

  constructor(defs) {
    this.defs = defs || {};
  }

  setDef(field, cfg) {
    const { defs } = this;
    const def = defs[field];
    defs[field] = {
      ...def,
      ...cfg,
    };
  }

  getDef(field) {
    const defs = this.defs;
    return defs[field];
  }

  _getDefaultType(field, data, def) {
    if (def && def.type) {
      return def.type;
    }
    let type = 'linear';
    let value = firstValue(data, field);
    if (isArray(value)) {
      value = value[0];
    }
    if (isString(value)) {
      type = 'cat';
    }
    return type;
  }

  _getScaleDef(type, field, data, def) {
    let values;
    if (def && def.values) {
      values = def.values;
    } else {
      values = arrayValues(data, field);
    }
    const cfg = {
      ...def,
      field,
      values
    };

    // 设置默认nice
    if (type === 'linear' && typeof cfg.nice !== 'boolean') {
      cfg.nice = true;
    }

    if (type !== 'cat' && type !== 'timeCat') {
      if (!def || isNil(def.min) || isNil(def.max)) {
        const { min, max } = getRange(values);
        if (isNil(def.min)) {
          cfg.min = min;
        }
        if (isNil(def.max)) {
          cfg.max = max;
        }
        cfg.nice = true;
      }
    } else {
      cfg.isRounding = false; // used for tickCount calculation
    }
    return cfg;
  }


  _getScaleCfg(field, data) {
    // const self = this;
    // const def = self._getDef(field);
    // if (!data || !data.length) {
    //   if (def && def.type) {
    //     return {
    //       type: def.type,
    //       cfg: {
    //         ...def,
    //         field,
    //       }
    //     };
    //   }
    //   return {
    //     type: 'identity',
    //     cfg: {
    //       value: field,
    //       field: field.toString(),
    //       values: [ field ]
    //     }
    //   };
    // }
    // const fieldFirstValue = firstValue(data, field);

    // if (isNumber(field) || (isNil(firstValue)) && !def) {
    //   return {
    //     type: 'identity',
    //     cfg: {
    //       value: field,
    //       field: field.toString(),
    //       values: [ field ]
    //     }
    //   };
    // }
    const def = this.getDef(field);
    const type = this._getDefaultType(field, data, def);
    let cfg = this._getScaleDef(type, field, data, def);
    return {
      type,
      cfg
    };
  }

  createScale(field, data) {
    const { scales } = this;
    const { type, cfg } = this._getScaleCfg(field, data);
    const scale = scales[field];
    // 如果已经存在，且类型相等时直接返回
    if (scale && scale.type === type) {
      scale.change(cfg);
      return scale;
    }
    const Scale = getScale(type);
    const newScale = new Scale(cfg);
    scales[field] = newScale;

    return newScale;
  }

  updateScale(field, cfg) {
    const { scales } = this;
    const scale = scales[field];

    // 触发ticks重新计算
    cfg.ticks = [];

    scale.change(cfg);
    return scale;
  }
}

export default ScaleController;




// const Linear = getScale('linear');
// const Identity = getScale('identity');
// const Category = getScale('category');
// const TimeCat = getScale('timeCat');


// // @ts-ignore
// Scale.Linear = Linear;
// // @ts-ignore
// Scale.Identity = Identity;
// // @ts-ignore
// Scale.Category = Category;
// // @ts-ignore
// Scale.Cat = Category;
// // @ts-ignore
// Scale.TimeCat = TimeCat;

// export default Scale;
// export { getScale, getTickMethod };
