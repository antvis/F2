/**
 * 精细动画，包含入场、更新、出场
 * @author sima.zhang
 */
const Util = require('../util/common');
const Shape = require('../graphic/shape');
const Timeline = require('../graphic/animate/timeline');
const Animator = require('../graphic/animate/animator');

let timeline;
Shape.prototype.animate = function() {
  const attrs = this.get('attrs');
  return new Animator(this, attrs, timeline);
};

const Animate = require('./animate');
const ShapeAction = require('./shape-action');
const GroupAction = require('./group-action');

Animate.Action = ShapeAction;
Animate.defaultCfg = {
  interval: {
    enter(coord) {
      if (coord.isPolar && coord.transposed) { // 饼图特殊处理
        return function(shape) {
          shape.set('zIndex', -1);
          const container = shape.get('parent');
          container.sort();
        };
      }
      return ShapeAction.fadeIn;
    }
  },
  area: {
    enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  },
  line: {
    enter(coord) {
      if (coord.isPolar) return null;

      return ShapeAction.fadeIn;
    }
  },
  path: {
    enter(coord) {
      if (coord.isPolar) return null;

      return ShapeAction.fadeIn;
    }
  }
};

const GROUP_ANIMATION = {
  line(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }
    return GroupAction.groupWaveIn;
  },
  area(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }
    return GroupAction.groupWaveIn;
  },
  path(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }
    return GroupAction.groupWaveIn;
  },
  point() {
    return GroupAction.shapesScaleInXY;
  },
  interval(coord) {
    let result;
    if (coord.isPolar) { // 极坐标
      result = GroupAction.groupScaleInXY; // 南丁格尔玫瑰图
      if (coord.transposed) { // 饼图
        result = GroupAction.groupWaveIn;
      }
    } else {
      result = coord.transposed ? GroupAction.groupScaleInX : GroupAction.groupScaleInY;
    }
    return result;
  },
  schema() {
    return GroupAction.groupWaveIn;
  }
};

function diff(fromAttrs, toAttrs) {
  const endState = {};
  for (const k in toAttrs) {
    if (Util.isNumber(fromAttrs[k]) && fromAttrs[k] !== toAttrs[k]) {
      endState[k] = toAttrs[k];
    } else if (Util.isArray(fromAttrs[k]) && JSON.stringify(fromAttrs[k]) !== JSON.stringify(toAttrs[k])) {
      endState[k] = toAttrs[k];
    }
  }
  return endState;
}

// 给每个 shape 加上唯一的 id 标识
function _getShapeId(geom, dataObj) {
  const type = geom.get('type');
  let id = 'geom-' + type;
  const xScale = geom.getXScale();
  const yScale = geom.getYScale();
  const xField = xScale.field || 'x';
  const yField = yScale.field || 'y';
  const yVal = dataObj[yField];
  let xVal;
  if (xScale.isIdentity) {
    xVal = xScale.value;
  } else {
    xVal = dataObj[xField];
  }

  if (type === 'interval' || type === 'schema') {
    id += '-' + xVal;
  } else if (type === 'line' || type === 'area' || type === 'path') {
    id += '-' + type;
  } else {
    id += '-' + xVal + '-' + yVal;
  }

  const groupScales = geom._getGroupScales();
  Util.each(groupScales, groupScale => {
    const field = groupScale.field;
    if (groupScale.type !== 'identity') {
      id += '-' + dataObj[field];
    }
  });

  return id;
}

// 获取图组内所有的shapes
function getShapes(geoms) {
  const shapes = [];

  Util.each(geoms, geom => {
    const geomContainer = geom.get('container');
    const geomShapes = geomContainer.get('children'); // 获取几何标记的 shapes
    const coord = geom.get('coord');
    const type = geom.get('type');
    const animateCfg = geom.get('animateCfg');
    if (animateCfg !== false) {
      Util.each(geomShapes, (shape, index) => {
        if (shape.get('className') === type) {
          shape._id = _getShapeId(geom, shape.get('origin')._origin);
          // shape.geomType = type;
          shape.set('coord', coord);
          shape.set('animateCfg', animateCfg);
          shape.set('index', index);
          shapes.push(shape);
        }
      });
    }
    geom.set('shapes', geomShapes);
  });
  return shapes;
}

function cache(shapes) {
  const rst = {};
  for (let i = 0, len = shapes.length; i < len; i++) {
    const shape = shapes[i];
    if (!shape._id || shape.isClip) continue;
    const id = shape._id;
    rst[id] = {
      _id: id,
      type: shape.get('type'), // 图形形状
      attrs: Util.mix({}, shape._attrs.attrs), // 原始属性
      geomType: shape.get('className'),
      index: shape.get('index'),
      coord: shape.get('coord')
    };
  }
  return rst;
}

function getAnimate(geomType, coord, animationType, animationName) {
  let result;
  if (animationName) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }
  return result;
}

function getAnimateCfg(geomType, animationType, animateCfg) {
  const defaultCfg = Animate.getAnimateCfg(geomType, animationType);
  if (animateCfg && animateCfg[animationType]) {
    return Util.deepMix({}, defaultCfg, animateCfg[animationType]);
  }
  return defaultCfg;
}

function addAnimate(cache, shapes, canvas) {
  let animate;
  let animateCfg;

  // Step: leave -> update -> enter
  const updateShapes = []; // 存储的是 shapes
  const newShapes = []; // 存储的是 shapes
  Util.each(shapes, shape => {
    const result = cache[shape._id];
    if (!result) {
      newShapes.push(shape);
    } else {
      shape.set('cacheShape', result);
      updateShapes.push(shape);
      delete cache[shape._id];
    }
  });

  // 销毁动画
  Util.each(cache, deletedShape => {
    const { geomType, coord, _id, attrs, index, type } = deletedShape;
    animateCfg = getAnimateCfg(geomType, 'leave', deletedShape.animateCfg);
    animate = getAnimate(geomType, coord, 'leave', animateCfg.animation);
    if (Util.isFunction(animate)) { // TODO
      const tempShape = canvas.addShape(type, {
        attrs,
        index,
        canvas
      });
      tempShape._id = _id;
      tempShape.name = name;
      animate(tempShape, animateCfg, coord);
    }
  });

  // 更新动画
  Util.each(updateShapes, updateShape => {
    const geomType = updateShape.get('className');
    const coord = updateShape.get('coord');
    const cacheAttrs = updateShape.get('cacheShape').attrs;
    // 判断如果属性相同的话就不进行变换
    const endState = diff(cacheAttrs, updateShape._attrs.attrs);

    if (Object.keys(endState).length) { // TODO: 需要优化
      animateCfg = getAnimateCfg(geomType, 'update', updateShape.get('animateCfg'));
      animate = getAnimate(geomType, coord, 'update', animateCfg.animation);
      if (Util.isFunction(animate)) {
        animate(updateShape, animateCfg, coord);
      } else {
        updateShape.attr(cacheAttrs);
        updateShape.animate().to({
          attrs: endState,
          duration: animateCfg.duration,
          easing: animateCfg.easing,
          delay: animateCfg.delay
        }).onEnd(function() {
          updateShape.set('cacheShape', null);
        });
      }
    }
  });

  // 新进场 shape 动画
  Util.each(newShapes, newShape => {
    // 新图形元素的进场元素
    const geomType = newShape.get('className');
    const coord = newShape.get('coord');

    animateCfg = getAnimateCfg(geomType, 'enter', newShape.get('animateCfg'));
    animate = getAnimate(geomType, coord, 'enter', animateCfg.animation);
    if (Util.isFunction(animate)) {
      if (geomType === 'interval' && coord.isPolar && coord.transposed) {
        const index = (newShape.get('index'));
        const lastShape = updateShapes[index - 1];
        animate(newShape, animateCfg, lastShape);
      } else {
        animate(newShape, animateCfg, coord);
      }
    }
  });
}

module.exports = {
  afterCanvasInit(/* chart */) {
    timeline = new Timeline();
    timeline.play();
  },
  beforeCanvasDraw(chart) {
    if (chart.get('animate') === false) {
      return;
    }
    let isUpdate = chart.get('isUpdate');
    const canvas = chart.get('canvas');
    const coord = chart.get('coord');
    const geoms = chart.get('geoms');
    const caches = canvas.get('caches') || [];
    if (caches.length === 0) {
      isUpdate = false;
    }

    const shapes = getShapes(geoms); // geom 上的图形

    const { frontPlot, backPlot } = chart.get('axisController');
    const axisShapes = [];

    Util.each(frontPlot.get('children'), frontShape => {
      frontShape.geomType = frontShape.get('className');
      frontShape.set('coord', coord);
      axisShapes.push(frontShape);
    });
    Util.each(backPlot.get('children'), backShape => {
      backShape.geomType = backShape.get('className');
      backShape.set('coord', coord);
      axisShapes.push(backShape);
    });
    const cacheShapes = shapes.concat(axisShapes);
    canvas.set('caches', cache(cacheShapes));

    if (isUpdate) {
      addAnimate(caches, cacheShapes, canvas);
    } else { // 初次入场动画
      let animateCfg;
      let animate;
      Util.each(geoms, geom => {
        const type = geom.get('type');
        if (geom.get('animateCfg') !== false) {
          animateCfg = getAnimateCfg(type, 'appear', geom.get('animateCfg'));
          animate = getAnimate(type, coord, 'appear', animateCfg.animation);
          if (Util.isFunction(animate)) { // 用户指定了动画类型
            const shapes = geom.get('shapes');
            Util.each(shapes, shape => {
              animate(shape, animateCfg, coord);
            });
          } else if (GROUP_ANIMATION[type]) { // 默认进行整体动画
            animate = GroupAction[animateCfg.animation] || GROUP_ANIMATION[type](coord);

            const yScale = geom.getYScale();
            const zeroY = coord.convertPoint({
              x: 0,
              y: yScale.scale(geom.getYMinValue())
            });

            const container = geom.get('container');
            animate && animate(container, animateCfg, coord, zeroY);
          }
        }
      });
    }
  },
  afterCanvasDestroyed(/* chart */) {
    timeline.stop();
  }
};
