const Core = {};

Core.version = '____F2_VERSION____';
Core.Global = require('./global');
Core.Chart = require('./chart/chart');
Core.Shape = require('./geom/shape/shape');
Core.G = require('./graphic/index');
Core.Util = require('./util/common');

module.exports = Core;
