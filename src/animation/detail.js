/**
 * 精细动画，包含入场、更新、出场
 * @author sima.zhang
 */
const Util = require('../util/common');
const Element = require('../graphic/element');
const Timeline = require('../graphic/animate/timeline');
const Animator = require('../graphic/animate/animator');
const Animate = require('./animate');
const ShapeAction = require('./shape-action');
const GroupAction = require('./group-action');
const Chart = require('../chart/chart');

let timeline;
Element.prototype.animate = function() {
  const attrs = this.get('attrs');
  return new Animator(this, attrs, timeline);
};

Chart.prototype.animate = function(cfg) {
  this.set('animate', cfg);
  return this;
};

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
    // 分类类型只需要判断 xVal
    id += xScale.isCategory ? '-' + xVal : '-' + xVal + '-' + yVal;
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
function getShapes(geoms, chart, coord) {
  const shapes = [];

  Util.each(geoms, geom => {
    const geomContainer = geom.get('container');
    const geomShapes = geomContainer.get('children'); // 获取几何标记的 shapes
    const type = geom.get('type');
    const animateCfg = Util.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');
    if (animateCfg !== false) {
      Util.each(geomShapes, (shape, index) => {
        if (shape.get('className') === type) {
          shape._id = _getShapeId(geom, shape.get('origin')._origin);
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
      className: shape.get('className'),
      geomType: shape.get('className'),
      index: shape.get('index'),
      coord: shape.get('coord'),
      animateCfg: shape.get('animateCfg')
    };
  }
  return rst;
}

function getAnimate(geomType, coord, animationType, animationName) {
  let result;

  if (Util.isFunction(animationName)) {
    result = animationName;
  } else if (Util.isString(animationName)) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }
  return result;
}

function getAnimateCfg(geomType, animationType, animateCfg) {
  if (animateCfg && (animateCfg[animationType] === false)) {
    return false;
  }

  const defaultCfg = Animate.getAnimateCfg(geomType, animationType);
  if (animateCfg && animateCfg[animationType]) {
    return Util.deepMix({}, defaultCfg, animateCfg[animationType]);
  }
  return defaultCfg;
}

function addAnimate(cache, shapes, canvas) {
  let animate;
  let animateCfg;

  // 动画执行顺序: leave -> update -> enter
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

  // 执行销毁动画
  Util.each(cache, deletedShape => {
    const { className, coord, _id, attrs, index, type } = deletedShape;

    animateCfg = getAnimateCfg(className, 'leave', deletedShape.animateCfg);
    if (animateCfg === false) return true;

    animate = getAnimate(className, coord, 'leave', animateCfg.animation);
    if (Util.isFunction(animate)) {
      const tempShape = canvas.addShape(type, {
        attrs,
        index,
        canvas,
        className
      });
      tempShape._id = _id;
      animate(tempShape, animateCfg, coord);
    }
  });

  // 执行更新动画
  Util.each(updateShapes, updateShape => {
    const className = updateShape.get('className');

    animateCfg = getAnimateCfg(className, 'update', updateShape.get('animateCfg'));
    if (animateCfg === false) return true;
    const coord = updateShape.get('coord');
    const cacheAttrs = updateShape.get('cacheShape').attrs;
    const endState = diff(cacheAttrs, updateShape._attrs.attrs); // 判断如果属性相同的话就不进行变换
    if (Object.keys(endState).length) {
      animate = getAnimate(className, coord, 'update', animateCfg.animation);
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
    const className = newShape.get('className');
    const coord = newShape.get('coord');

    animateCfg = getAnimateCfg(className, 'enter', newShape.get('animateCfg'));
    if (animateCfg === false) return true;

    animate = getAnimate(className, coord, 'enter', animateCfg.animation);
    if (Util.isFunction(animate)) {
      if (className === 'interval' && coord.isPolar && coord.transposed) {
        const index = (newShape.get('index'));
        const lastShape = updateShapes[index - 1];
        animate(newShape, animateCfg, lastShape);
      } else {
        animate(newShape, animateCfg, coord);
      }
    }
  });
}

function _getAnimateCfgByShapeType(type, chart) {
  if (!type) {
    return null;
  }
  const animateCfg = chart.get('animate');

  if (type.indexOf('guide-tag') > -1) {
    type = 'guide-tag'; // 因为 guide.tag 包含多个 shape，但是对外它们是一体的
  }

  if (animateCfg) {
    return animateCfg[type];
  }

  return null;
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

    const cacheShapes = getShapes(geoms, chart, coord);
    const { frontPlot, backPlot } = chart.get('axisController');
    const axisShapes = frontPlot.get('children').concat(backPlot.get('children'));
    let guideShapes = [];
    if (chart.get('guideController')) {
      guideShapes = chart.get('guideController').guideShapes;
    }
    const componentShapes = [];
    axisShapes.concat(guideShapes).forEach(s => {
      const className = s.get('className');
      const animateCfg = _getAnimateCfgByShapeType(className, chart);
      s.set('coord', coord);
      s.set('animateCfg', animateCfg);
      componentShapes.push(s);
      cacheShapes.push(s);
    });
    canvas.set('caches', cache(cacheShapes));

    if (isUpdate) {
      addAnimate(caches, cacheShapes, canvas);
    } else { // 初次入场动画
      let animateCfg;
      let animate;
      Util.each(geoms, geom => {
        const type = geom.get('type');
        const geomCfg = Util.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');
        if (geomCfg !== false) {
          animateCfg = getAnimateCfg(type, 'appear', geomCfg);
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

      // 组件元素的入场动画
      Util.each(componentShapes, shape => {
        const animateCfg = shape.get('animateCfg');
        const className = shape.get('className');
        if (animateCfg && animateCfg.appear) { // 如有配置入场动画
          const defaultCfg = Animate.getAnimateCfg(className, 'appear');
          const appearCfg = Util.deepMix({}, defaultCfg, animateCfg.appear);
          const animate = getAnimate(className, coord, 'appear', appearCfg.animation);
          if (Util.isFunction(animate)) {
            animate(shape, appearCfg, coord);
          }
        }
      });
    }
  },
  afterCanvasDestroyed(/* chart */) {
    timeline.stop();
  }
};
