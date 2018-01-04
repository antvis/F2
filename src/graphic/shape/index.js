const Shape = {
  Rect: require('./rect'),
  Circle: require('./circle'),
  Line: require('./line'),
  Polygon: require('./polygon'),
  Polyline: require('./polyline'),
  Arc: require('./arc'),
  Sector: require('./sector'),
  Ring: require('./ring'),
  Text: require('./text'),
  Custom: require('./custom')
};

module.exports = Shape;
