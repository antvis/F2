const Util = require('../../util/common');
const Shape = require('../shape');

class Custom extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: 'custom',
      createPath: null,
      canFill: true,
      canStroke: true
    });
  }

  createPath(context) {
    const createPath = this.get('createPath');
    if (createPath) {
      createPath(context);
    }
  }

  // TODO
  calculateBox() {
    return null;
  }
}
Shape.Custom = Custom;
module.exports = Custom;
