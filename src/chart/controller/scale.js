const Util = require('../../util/common');
const Global = require('../../global');
const Scale = require('../../scale/');
const SCALE_TYPES_MAP = {
  linear: 'Linear',
  cat: 'Cat',
  timeCat: 'TimeCat',
  identity: 'Identity'
};

class ScaleController {
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

  _getDefaultType(field, data, def) {
    if (def && def.type) {
      return def.type;
    }
    let type = 'linear';
    let value = Util.Array.firstValue(data, field);
    if (Util.isArray(value)) {
      value = value[0];
    }
    if (Util.isString(value)) {
      type = 'cat';
    }
    return type;
  }

  _getScaleCfg(type, field, data, def) {
    let values;
    if (def && def.values) {
      values = def.values;
    } else {
      values = Util.Array.values(data, field);
    }
    const cfg = {
      field,
      values
    };

    if (type !== 'cat' && type !== 'timeCat') {
      if (!def || !(def.min && def.max)) {
        const { min, max } = Util.Array.getRange(values);
        cfg.min = min;
        cfg.max = max;
        cfg.nice = true;
      }
    }

    if (type === 'cat' || type === 'timeCat') {
      cfg.isRounding = false; // used for tickCount calculation
    }

    return cfg;
  }

  createScale(field, data) {
    const self = this;
    const def = self._getDef(field);
    let scale;
    if (!data || !data.length) {
      if (def && def.type) {
        scale = new Scale[SCALE_TYPES_MAP[def.type]](def);
      } else {
        scale = new Scale.Identity({
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
      scale = new Scale.Identity({
        value: field,
        field: field.toString(),
        values: [ field ]
      });
    } else {
      const type = self._getDefaultType(field, data, def);
      const cfg = self._getScaleCfg(type, field, data, def);
      def && Util.mix(cfg, def);
      scale = new Scale[SCALE_TYPES_MAP[type]](cfg);
    }
    return scale;
  }
}

module.exports = ScaleController;
