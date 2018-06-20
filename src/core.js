const Core = {};

const Global = require('./global');
Core.Global = Global;
Core.version = Global.version;
Core.Chart = require('./chart/chart');
Core.Shape = require('./geom/shape/shape');
Core.G = require('./graphic/index');
Core.Util = require('./util/common');

Core.track = function(enable) {
  Global.trackable = enable;
};
require('./track');

module.exports = Core;
