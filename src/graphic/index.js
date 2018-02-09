const G = {
  Canvas: require('./canvas'),
  Group: require('./group'),
  Shape: require('./shape')
};

require('./shape/rect');
require('./shape/circle');
require('./shape/line');
require('./shape/polygon');
require('./shape/polyline');
require('./shape/arc');
require('./shape/sector');
require('./shape/text');
require('./shape/custom');

module.exports = G;
