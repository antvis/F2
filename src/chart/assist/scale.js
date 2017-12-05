/**
 * @fileOverview 度量的控制器
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const Global = require('../../global');
const Scale = require('../../scale/');
const TYPES = {
  LINEAR: 'linear',
  CAT: 'cat'
};

function getRange(values) {
  if (Util.isArray(values[0])) {
    let tmp = [];
    for (let i = 0; i < values.length; i++) {
      tmp = tmp.concat(values[i]);
    }
    values = tmp;
  }
  const max = Math.max.apply(null, values);
  const min = Math.min.apply(null, values);
  return {
    min,
    max
  };
}

class ScaleAssist {
  constructor(cfg) {
    // defs 列定义
    this.defs = {};
    Util.mix(this, cfg);
  }

  _getDef(field) {
    const defs = this.defs;
    let def = null;
    if (Global.scales[field] || defs[field]) {
      def = Util.mix({}, Global.scales[field]);
      // 处理覆盖属性的问题
      Util.each(defs[field], function(v, k) {
        if (Util.isNil(v)) {
          delete def[k];
        } else {
          def[k] = v;
        }
      });
    }
    return def;
  }

  _getDefaultType(field, data) {
    let type = TYPES.LINEAR;
    let value = Util.Array.firstValue(data, field);
    if (Util.isArray(value)) {
      value = value[0];
    }
    if (Util.isString(value)) {
      type = TYPES.CAT;
    }
    return type;
  }

  _getScaleCfg(type, field, data) {
    const cfg = {
      field
    };
    const values = Util.Array.values(data, field);
    cfg.values = values;
    if (!Scale.isCategory(type)) {
      const range = getRange(values);
      cfg.min = range.min;
      cfg.max = range.max;
    }
    return cfg;
  }

  createScale(field, data) {
    const self = this;
    const def = self._getDef(field);
    let scale;
    // 如果数据为空直接返回常量度量
    if (!data || !data.length) {
      if (def && def.type) {
        scale = Scale[def.type](def);
      } else {
        scale = Scale.identity({
          value: field,
          field: field.toString(),
          values: [ field ]
        });
      }
      return scale;
    }
    const firstObj = data[0];
    let firstValue = firstObj[field];
    if (firstValue === null) {
      firstValue = Util.Array.firstValue(data, field);
    }

    if (Util.isNumber(field) || (Util.isNil(firstValue)) && !def) {
      scale = Scale.identity({
        value: field,
        field: field.toString(),
        values: [ field ]
      });
    } else { // 如果已经定义过这个度量
      let type;
      if (def) {
        type = def.type;
      }
      type = type || self._getDefaultType(field, data);
      const cfg = self._getScaleCfg(type, field, data);
      if (def) {
        Util.mix(cfg, def);
      }
      scale = Scale[type](cfg);
    }
    return scale;
  }
}

module.exports = ScaleAssist;
