/**
 * @fileOverview The data is replaced with constant
 * @author dxq613@gmail.com
 */
const Base = require('./base');
const Util = require('../util/common');

class Identity extends Base {

  _initDefaultCfg() {
    this.isIdentity = true;
    this.type = 'identity';
    /**
     * 输出的值域
     * @type {Array}
     */
    this.range = [ 0, 1 ];
    /**
     * 常量值
     * @type {*}
     */
    this.value = null;
  }

  /**
   * @override
   */
  getText() {
    return this.value.toString();
  }

  /**
   * @override
   */
  scale(value) {
    if (this.value !== value && Util.isNumber(value)) {
      return value;
    }
    return this.range[0];
  }

  /**
   * @override
   */
  invert() {
    return this.value;
  }
}

Base.Identity = Identity;
module.exports = Identity;
