const Util = require('../../util/common');
const Global = require('../../global');

const Shape = {};

const ShapeBase = {
  _coord: null,
  /**
   * draw the shape
   * @param {Object} cfg options
   * @param {Object} container container to store the shapes
   */
  draw(cfg, container) {
    if (this.drawShape) {
      this.drawShape(cfg, container);
    }
  },
  /**
   * set the coordinate instance
   * @param {Coord} coord coordinate instance
   */
  setCoord(coord) {
    this._coord = coord;
  },
  /**
   * convert the normalized value to the canvas position
   * @param  {point} point the point to convert
   * @return {point} point return the result
   */
  parsePoint(point) {
    const coord = this._coord;
    if (coord.isPolar) {
      if (point.x === 1) point.x = 0.9999999;
      if (point.y === 1) point.y = 0.9999999;
    }
    return coord.convertPoint(point);
  },
  /**
   * convert the normalized value to the canvas position
   * @param  {points} points the array that store the points
   * @return {points} points return the result
   */
  parsePoints(points) {
    if (!points) return false;
    const self = this;
    const rst = [];
    points.forEach(function(point) {
      rst.push(self.parsePoint(point));
    });
    return rst;
  }
};

const ShapeFactoryBase = {
  defaultShapeType: null,
  setCoord(coord) {
    this._coord = coord;
  },
  getShape(type) {
    const self = this;
    if (Util.isArray(type)) {
      type = type[0];
    }
    const shape = self[type] || self[self.defaultShapeType];
    shape._coord = self._coord;
    return shape;
  },
  getShapePoints(type, cfg) {
    const shape = this.getShape(type);
    const fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
    const points = fn(cfg);
    return points;
  },
  getDefaultPoints(/* cfg */) {
    return [];
  },
  drawShape(type, cfg, container) {
    const shape = this.getShape(type);
    if (!cfg.color) {
      cfg.color = Global.colors[0];
    }
    return shape.draw(cfg, container);
  }
};

Shape.registerFactory = function(factoryName, cfg) {
  const className = Util.upperFirst(factoryName);
  const geomObj = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

Shape.registerShape = function(factoryName, shapeType, cfg) {
  const className = Util.upperFirst(factoryName);
  const factory = Shape[className];
  const shapeObj = Util.mix({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

Shape.registShape = Shape.registerShape;

Shape.getShapeFactory = function(factoryName) {
  const self = this;
  factoryName = factoryName || 'point';
  const className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;
