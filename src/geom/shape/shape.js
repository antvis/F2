const Util = require('../../util/common');
const Global = require('../../global');

const Shape = {};

const ShapeBase = {
  _coord: null,
  /**
   * 绘制图形
   * @param {Object} cfg 配置项
   * @param {Object} container 容器
   */
  draw(cfg, container) {
    if (this.drawShape) {
      this.drawShape(cfg, container);
    }
  },
  /**
   * 设置坐标系
   * @param {Coord} coord 坐标系
   */
  setCoord(coord) {
    this._coord = coord;
  },
  /**
   * 0～1 point 转 画布 point
   * @param  {point} point 转换的点
   * @return {point} point 转换结果
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
   * 0～1 points 转 画布 points
   * @param  {points} points 转换的多个点
   * @return {points} points 转换结果
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

// 注册 Geometry 获取图形的入口
Shape.registerFactory = function(factoryName, cfg) {
  const className = Util.upperFirst(factoryName);
  const geomObj = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

// 注册图形
Shape.registerShape = function(factoryName, shapeType, cfg) {
  const className = Util.upperFirst(factoryName);
  const factory = Shape[className];
  const shapeObj = Util.mix({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

Shape.registShape = Shape.registerShape;

// 获得Geom 对应的 shapeFactory
Shape.getShapeFactory = function(factoryName) {
  const self = this;
  factoryName = factoryName || 'point';
  const className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;
