const Util = require('../util/common');
const ColorUtil = require('./color-util');
const Base = require('@antv/attr/lib/base');

class Color extends Base {

  constructor(cfg) {
    super(cfg);
    this.names = [ 'color' ];
    this.type = 'color';
    this.gradient = null;
    if (Util.isString(this.values)) {
      this.linear = true;
    }
  }

  /**
   * @override
   */
  getLinearValue(percent) {
    let gradient = this.gradient;
    if (!gradient) {
      const values = this.values;
      gradient = ColorUtil.gradient(values);
      this.gradient = gradient;
    }
    return gradient(percent);
  }
}

module.exports = Color;
